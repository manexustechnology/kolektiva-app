// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';
import {ReentrancyGuard} from '@openzeppelin/contracts/utils/ReentrancyGuard.sol';
import {OrderLib} from './OrderLib.sol';

/**
 * @title KolektivaMarket
 * @dev A decentralized market for trading Kolektiva tokens using USDT.
 */
contract KolektivaMarket is Ownable, ReentrancyGuard {
    using OrderLib for OrderLib.Order[];

    // Custom errors for better gas efficiency
    error InsufficientBalance(uint256 available, uint256 required);
    error Unauthorized();
    error InvalidOrder();
    error InitialOfferingEnded();
    error InitialOfferingOngoing();
    error InsufficientSupply();
    error TransferFailed();
    error InvalidAmount();
    error NoFundsToWithdraw();
    error IndexOutOfBounds();

    // State variables
    IERC20 public immutable kolektivaToken;
    IERC20 public immutable usdtToken;
    uint256 public immutable salePrice;
    address public immutable handler;
    address public immutable propertyOwner;

    uint128 private constant FEE_PRECISION = 1e4;
    uint128 private constant FEE_PERCENTAGE = 50; // 50 / 10000 = 0.5%
    uint128 private constant INITIAL_OFFERING_PERCENTAGE = 500; // 500 / 10000 = 5%

    uint256 public propertyOwnerBalance;
    uint256 public initialOfferingSupply;
    uint256 public lastTradedPrice;
    uint256 private nextOrderId = 0;
    bool public initialOfferingActive = true;

    OrderLib.Order[] private buyOrders;
    OrderLib.Order[] private sellOrders;

    struct TradeDetails {
        int256 start;
        int256 end;
        int256 step;
        uint256 remainingAmount;
        uint256 totalValue;
        uint256 processedCount;
    }

    // Events
    event OrderPlaced(
        address indexed trader,
        uint256 amount,
        uint256 price,
        bool isBuyOrder,
        uint256 timestamp
    );
    event OrderFulfilled(
        address indexed buyer,
        address indexed seller,
        uint256 amount,
        uint256 price,
        uint256 timestamp
    );
    event OrderCancelled(
        address indexed trader,
        uint256 amount,
        uint256 price,
        bool isBuyOrder,
        uint256 timestamp
    );
    event InstantTrade(
        address indexed trader,
        uint256 amount,
        uint256 totalPrice,
        bool isBuy,
        uint256 timestamp
    );
    event InitialOfferingPurchase(
        address indexed buyer,
        uint256 amount,
        uint256 totalCost,
        uint256 fee,
        uint256 timestamp
    );
    event PropertyOwnerWithdrawal(address indexed owner, uint256 amount);
    event PriceUpdated(uint256 newPrice);

    /**
     * @dev Constructor to initialize the contract.
     * @param _kolektivaToken Address of the Kolektiva token contract.
     * @param _usdtToken Address of the USDT token contract.
     * @param _propertyOwner Address of the property owner.
     * @param _handler Address of the handler.
     * @param _salePrice Sale price of the Kolektiva token during the initial offering.
     */
    constructor(
        address _kolektivaToken,
        address _usdtToken,
        address _propertyOwner,
        address _handler,
        uint256 _salePrice
    ) Ownable(_handler) {
        kolektivaToken = IERC20(_kolektivaToken);
        usdtToken = IERC20(_usdtToken);
        handler = _handler;
        propertyOwner = _propertyOwner;
        initialOfferingSupply = kolektivaToken.totalSupply();
        salePrice = _salePrice;
        lastTradedPrice = _salePrice;
    }

    /**
     * @dev Modifier to check if the initial offering is ongoing.
     * @param shouldBeActive Boolean indicating if the initial offering should be active.
     */
    modifier initialOfferingOngoing(bool shouldBeActive) {
        if (initialOfferingActive != shouldBeActive) {
            if (shouldBeActive) {
                revert InitialOfferingEnded();
            } else {
                revert InitialOfferingOngoing();
            }
        }
        _;
    }

    /**
     * @dev Modifier to check if the order index is valid.
     * @param index Index of the order.
     * @param isBuyOrder Boolean indicating if it is a buy order.
     */
    modifier validOrderIndex(uint256 index, bool isBuyOrder) {
        if (index >= (isBuyOrder ? buyOrders.length : sellOrders.length)) {
            revert IndexOutOfBounds();
        }
        _;
    }

    /**
     * @dev Function to buy tokens during the initial offering.
     * @param _amount Amount of tokens to buy.
     * @notice This function can only be called while the initial offering is active.
     */
    function initialOfferingBuy(
        uint256 _amount
    ) external initialOfferingOngoing(true) nonReentrant {
        if (_amount == 0) revert InvalidAmount();
        if (_amount > initialOfferingSupply) {
            revert InsufficientSupply();
        }

        uint256 totalCost = (_amount * salePrice);
        uint256 fee = (totalCost * FEE_PERCENTAGE) / FEE_PRECISION;
        uint256 initialOfferingFee = (totalCost * INITIAL_OFFERING_PERCENTAGE) /
            FEE_PRECISION;
        uint256 totalAmount = totalCost + fee;

        if (!usdtToken.transferFrom(msg.sender, address(this), totalAmount)) {
            revert TransferFailed();
        }

        propertyOwnerBalance += (totalCost - initialOfferingFee);

        if (!usdtToken.transfer(handler, fee + initialOfferingFee)) {
            revert TransferFailed();
        }
        if (!kolektivaToken.transferFrom(handler, msg.sender, _amount)) {
            revert TransferFailed();
        }

        unchecked {
            initialOfferingSupply -= _amount;
        }
        if (initialOfferingSupply == 0) {
            initialOfferingActive = false;
        }

        emit InitialOfferingPurchase(
            msg.sender,
            _amount,
            totalCost,
            fee,
            block.timestamp
        );
    }

    /**
     * @dev Internal function to remove an order from the order list.
     * @param _index Index of the order to remove.
     * @param isBuyOrder Boolean indicating if it is a buy order.
     */
    function _removeOrder(
        uint256 _index,
        bool isBuyOrder
    ) internal validOrderIndex(_index, isBuyOrder) {
        OrderLib.Order[] storage orders = isBuyOrder ? buyOrders : sellOrders;

        for (uint256 i = _index; i < orders.length - 1; i++) {
            orders[i] = orders[i + 1];
        }

        orders.pop();
    }

    /**
     * @dev Function to place an order.
     * @param _amount Amount of tokens to trade.
     * @param _price Price per token.
     * @param isBuyOrder Indicates if the order is a buy order.
     * @notice This function can only be called after the initial offering has ended.
     */
    function placeOrder(
        uint256 _amount,
        uint256 _price,
        bool isBuyOrder
    ) external initialOfferingOngoing(false) nonReentrant {
        uint256 totalValue = _amount * _price;
        uint256 fee = (totalValue * FEE_PERCENTAGE) / FEE_PRECISION;

        // Transfer assets and fee based on order type
        _transferAssetsAndFee(_amount, totalValue, fee, isBuyOrder);

        // Create and insert the new order
        OrderLib.Order memory newOrder = OrderLib.Order({
            trader: msg.sender,
            amount: _amount,
            price: _price,
            orderId: nextOrderId++
        });

        _insertOrder(newOrder, isBuyOrder);

        emit OrderPlaced(
            msg.sender,
            _amount,
            _price,
            isBuyOrder,
            block.timestamp
        );
        _matchOrders();
    }

    /**
     * @dev Internal function to transfer assets and fee based on order type.
     * @param _amount Amount of tokens to trade.
     * @param totalValue Total value of the trade.
     * @param fee Fee for the trade.
     * @param isBuyOrder Indicates if the order is a buy order.
     */
    function _transferAssetsAndFee(
        uint256 _amount,
        uint256 totalValue,
        uint256 fee,
        bool isBuyOrder
    ) internal {
        if (isBuyOrder) {
            if (
                !usdtToken.transferFrom(
                    msg.sender,
                    address(this),
                    totalValue + fee
                )
            ) {
                revert TransferFailed();
            }

            // Transfer the fee to the handler
            if (!usdtToken.transfer(handler, fee)) {
                revert TransferFailed();
            }
        } else {
            if (
                !kolektivaToken.transferFrom(msg.sender, address(this), _amount)
            ) {
                revert TransferFailed();
            }

            // Transfer the fee to the handler
            if (!usdtToken.transferFrom(msg.sender, handler, fee)) {
                revert TransferFailed();
            }
        }
    }

    /**
     * @dev Internal function to insert a new order into the appropriate list.
     * @param newOrder The new order to insert.
     * @param isBuyOrder Indicates if the order is a buy order.
     */
    function _insertOrder(
        OrderLib.Order memory newOrder,
        bool isBuyOrder
    ) internal {
        if (isBuyOrder) {
            buyOrders.push(newOrder);
            buyOrders.addOrderToSortedList(newOrder, true);
        } else {
            sellOrders.push(newOrder);
            sellOrders.addOrderToSortedList(newOrder, false);
        }
    }

    /**
     * @dev Function to instantly trade tokens with the market orders.
     * @param _amount Amount of tokens to trade.
     * @param isBuy Indicates if the trade is a buy operation.
     * @notice This function consolidates the logic for both buying and selling operations to adhere to DRY principles.
     */
    function instantTrade(
        uint256 _amount,
        bool isBuy
    ) external initialOfferingOngoing(false) nonReentrant {
        if (_amount == 0) revert InvalidAmount();

        uint256 remainingAmount = _amount;
        uint256 totalValue = 0;
        uint256 processedCount = 0;
        OrderLib.Order[] storage orders = isBuy ? sellOrders : buyOrders;

        // Determine loop direction based on trade type
        int256 start = isBuy ? int256(0) : int256(orders.length - 1);
        int256 end = isBuy ? int256(orders.length) : -1;
        int256 step = isBuy ? int256(1) : int256(-1);

        // Refactor to reduce stack depth
        TradeDetails memory tradeDetails = TradeDetails({
            start: start,
            end: end,
            step: step,
            remainingAmount: remainingAmount,
            totalValue: totalValue,
            processedCount: processedCount
        });

        _processTrade(orders, tradeDetails, isBuy);

        if (tradeDetails.remainingAmount > 0) revert InsufficientSupply();

        // Adjust the orders array to remove processed orders
        _adjustOrdersArray(orders, tradeDetails.processedCount);

        // Fee calculation and transfer
        _calculateAndTransferFee(tradeDetails.totalValue);

        emit InstantTrade(
            msg.sender,
            _amount,
            tradeDetails.totalValue,
            isBuy,
            block.timestamp
        );
    }

    function _processTrade(
        OrderLib.Order[] storage orders,
        TradeDetails memory tradeDetails,
        bool isBuy
    ) internal {
        for (
            int256 i = tradeDetails.start;
            i != tradeDetails.end && tradeDetails.remainingAmount > 0;
            i += tradeDetails.step
        ) {
            uint256 idx = uint256(i);
            OrderLib.Order memory order = orders[idx];
            uint256 tradeAmount = _calculateTradeAmount(
                order.amount,
                tradeDetails.remainingAmount
            );
            uint256 value = tradeAmount * order.price;

            (address buyer, address seller) = _transferFundsOrTokens(
                isBuy,
                value,
                tradeAmount,
                order.trader
            );

            tradeDetails.totalValue += value;
            _executeTrade(buyer, seller, tradeAmount, order.price);

            tradeDetails.remainingAmount -= tradeAmount;
            orders[idx].amount -= tradeAmount;

            if (orders[idx].amount == 0) tradeDetails.processedCount++;
        }
    }

    function _calculateTradeAmount(
        uint256 orderAmount,
        uint256 remainingAmount
    ) internal pure returns (uint256 tradeAmount) {
        return (orderAmount < remainingAmount) ? orderAmount : remainingAmount;
    }

    function _transferFundsOrTokens(
        bool isBuy,
        uint256 value,
        uint256 tradeAmount,
        address orderTrader
    ) internal returns (address buyer, address seller) {
        if (isBuy) {
            if (!usdtToken.transferFrom(msg.sender, address(this), value))
                revert TransferFailed();
            buyer = msg.sender;
            seller = orderTrader;
        } else {
            if (
                !kolektivaToken.transferFrom(
                    msg.sender,
                    address(this),
                    tradeAmount
                )
            ) revert TransferFailed();
            buyer = orderTrader;
            seller = msg.sender;
        }
        return (buyer, seller);
    }

    function _calculateAndTransferFee(uint256 totalValue) internal {
        uint256 fee = (totalValue * FEE_PERCENTAGE) / FEE_PRECISION;
        if (!usdtToken.transferFrom(msg.sender, handler, fee))
            revert TransferFailed();
    }

    /**
     * @dev Helper function to adjust the orders array by removing processed orders.
     * @param orders Array of orders.
     * @param processedCount Number of orders that were fully processed.
     */
    function _adjustOrdersArray(
        OrderLib.Order[] storage orders,
        uint256 processedCount /* bool isBuy */
    ) internal {
        uint256 ordersLength = orders.length;

        if (processedCount > 0)
            for (uint256 i = 0; i < ordersLength; i++) {
                if (i < ordersLength - processedCount) {
                    orders[i] = orders[i + processedCount];
                } else {
                    orders.pop();
                }
            }
    }

    /**
     * @dev Function to cancel an order.
     * @param _index Index of the order to cancel.
     * @param isBuyOrder Boolean indicating if it is a buy order.
     */
    function cancelOrder(
        uint256 _index,
        bool isBuyOrder
    ) external nonReentrant {
        OrderLib.Order memory order = isBuyOrder
            ? buyOrders[_index]
            : sellOrders[_index];

        if (order.trader != msg.sender) revert Unauthorized();

        if (isBuyOrder) {
            if (_index >= buyOrders.length) revert InvalidOrder();
            uint256 refund = (order.amount * order.price);
            _removeOrder(_index, true);
            if (!usdtToken.transfer(msg.sender, refund)) {
                revert TransferFailed();
            }
        } else {
            if (_index >= sellOrders.length) revert InvalidOrder();
            _removeOrder(_index, false);
            if (!kolektivaToken.transfer(msg.sender, order.amount)) {
                revert TransferFailed();
            }
        }

        emit OrderCancelled(
            msg.sender,
            order.amount,
            order.price,
            isBuyOrder,
            block.timestamp
        );
    }

    /**
     * @dev Internal function to match buy and sell orders.
     */
    function _matchOrders() internal {
        while (buyOrders.length > 0 && sellOrders.length > 0) {
            OrderLib.Order memory buyOrder = buyOrders[buyOrders.length - 1];
            OrderLib.Order memory sellOrder = sellOrders[0];

            if (buyOrder.price >= sellOrder.price) {
                uint256 matchedAmount = buyOrder.amount < sellOrder.amount
                    ? buyOrder.amount
                    : sellOrder.amount;
                uint256 matchedPrice = sellOrder.price;

                _executeTrade(
                    buyOrder.trader,
                    sellOrder.trader,
                    matchedAmount,
                    matchedPrice
                );

                if (matchedAmount == buyOrder.amount) {
                    buyOrders.pop();
                } else {
                    unchecked {
                        buyOrder.amount -= matchedAmount; // Reduce the amount in the buy order
                    }
                }

                if (matchedAmount == sellOrder.amount) {
                    _removeOrder(0, false);
                } else {
                    unchecked {
                        sellOrder.amount -= matchedAmount; // Reduce the amount in the sell order
                    }
                }
            } else {
                break;
            }
        }
    }

    /**
     * @dev Internal function to execute a trade between a buyer and a seller.
     * @param _buyer Address of the buyer.
     * @param _seller Address of the seller.
     * @param _amount Amount of tokens to trade.
     * @param _price Price per token.
     */
    function _executeTrade(
        address _buyer,
        address _seller,
        uint256 _amount,
        uint256 _price
    ) internal {
        uint256 totalPrice = (_amount * _price);

        if (!kolektivaToken.transfer(_buyer, _amount)) {
            revert TransferFailed();
        }
        if (!usdtToken.transfer(_seller, totalPrice)) {
            revert TransferFailed();
        }

        emit OrderFulfilled(_buyer, _seller, _amount, _price, block.timestamp);
        updateLastTradedPrice(_price);
    }

    /**
     * @dev Function to end the initial offering.
     * @notice Only the owner can call this function.
     */
    function endInitialOffering() external onlyOwner {
        initialOfferingActive = false;
    }

    /**
     * @dev Internal function to update the last traded price.
     * @param _newPrice New price.
     */
    function updateLastTradedPrice(uint256 _newPrice) internal {
        lastTradedPrice = _newPrice;
        emit PriceUpdated(_newPrice);
    }

    /**
     * @dev Function to withdraw funds for the property owner.
     * @notice This function can only be called after the initial offering has ended.
     */
    function withdrawPropertyOwnerFunds()
        external
        initialOfferingOngoing(false)
    {
        if (msg.sender != propertyOwner) revert Unauthorized();
        uint256 balance = propertyOwnerBalance;
        propertyOwnerBalance = 0;

        if (balance == 0) revert NoFundsToWithdraw();
        if (!usdtToken.transfer(propertyOwner, balance)) {
            revert TransferFailed();
        }
        emit PropertyOwnerWithdrawal(propertyOwner, balance);
    }

    /**
     * @dev Retrieves a buy order from the array of buy orders by its index.
     * @param index The index in the buy orders array.
     * @notice The index must be a valid index within the range of the buy orders array.
     * @return order The buy order at the specified index.
     */
    function getBuyOrderByIndex(
        uint256 index
    )
        public
        view
        validOrderIndex(index, true)
        returns (OrderLib.Order memory order)
    {
        order = buyOrders[index];
    }

    /**
     * @dev Retrieves a sell order from the array of sell orders by its index.
     * @param index The index in the sell orders array.
     * @notice The index must be a valid index within the range of the sell orders array.
     * @return order The sell order at the specified index.
     */
    function getSellOrderByIndex(
        uint256 index
    )
        public
        view
        validOrderIndex(index, false)
        returns (OrderLib.Order memory order)
    {
        order = sellOrders[index];
    }

    /**
     * @dev Calculates the total cost and fees for buying a given amount of tokens.
     * @param _amount The amount of tokens to calculate the buy cost for.
     * @notice This function assumes a perfect match of sell orders to fulfill the buy amount.
     * @return totalCost The total cost in USDT for the amount of tokens to buy.
     * @return fees The total fees in USDT for the amount of tokens to buy.
     */
    function calculateBuyCost(
        uint256 _amount
    ) external view returns (uint256 totalCost, uint256 fees) {
        uint256 remainingAmount = _amount;
        totalCost = 0;

        for (uint256 i = 0; i < sellOrders.length && remainingAmount > 0; i++) {
            OrderLib.Order memory order = sellOrders[i];
            uint256 availableAmount = remainingAmount < order.amount
                ? remainingAmount
                : order.amount;
            totalCost += (availableAmount * order.price);
            remainingAmount -= availableAmount;
        }

        if (remainingAmount > 0) revert InsufficientSupply();

        fees = (totalCost * FEE_PERCENTAGE) / FEE_PRECISION;
        totalCost += fees;
    }

    /**
     * @dev Calculates the total proceeds and fees for selling a given amount of tokens.
     * @param _amount The amount of tokens to calculate the sell proceeds for.
     * @notice This function assumes a perfect match of buy orders to fulfill the sell amount.
     * @return totalProceeds The total proceeds in USDT for the amount of tokens to sell.
     * @return fees The total fees in USDT for the amount of tokens to sell.
     */
    function calculateSellProceeds(
        uint256 _amount
    ) external view returns (uint256 totalProceeds, uint256 fees) {
        uint256 remainingAmount = _amount;
        totalProceeds = 0;

        for (uint256 i = buyOrders.length; i > 0 && remainingAmount > 0; i--) {
            OrderLib.Order memory order = buyOrders[i - 1];
            uint256 availableAmount = remainingAmount < order.amount
                ? remainingAmount
                : order.amount;
            totalProceeds += (availableAmount * order.price);
            remainingAmount -= availableAmount;
        }

        if (remainingAmount > 0) revert InsufficientSupply();

        fees = (totalProceeds * FEE_PERCENTAGE) / FEE_PRECISION;
        totalProceeds -= fees;
    }

    /**
     * @dev Function to get the count of buy orders.
     * @return The count of buy orders.
     */
    function getBuyOrdersCount() external view returns (uint256) {
        return buyOrders.length;
    }

    /**
     * @dev Retrieves the number of sell orders currently in the market.
     * @return The count of active sell orders.
     */
    function getSellOrdersCount() external view returns (uint256) {
        return sellOrders.length;
    }

    /**
     * @dev Provides the precision used for fee calculations.
     * This is the factor that fee percentages are divided by to calculate actual fee amounts.
     * @return The precision factor for fee calculations.
     */
    function getFeePrecision() external pure returns (uint128) {
        return FEE_PRECISION;
    }

    /**
     * @dev Retrieves the fee percentage charged on trades.
     * The fee is a percentage of the trade amount, represented as a value out of FEE_PRECISION.
     * @return The fee percentage for trades.
     */
    function getFeePercentage() external pure returns (uint128) {
        return FEE_PERCENTAGE;
    }

    /**
     * @dev Provides the percentage of the total supply allocated for the initial offering.
     * This value is represented as a percentage out of FEE_PRECISION.
     * @return The initial offering percentage of the total supply.
     */
    function getInitialOfferingPercentage() external pure returns (uint128) {
        return INITIAL_OFFERING_PERCENTAGE;
    }
}
