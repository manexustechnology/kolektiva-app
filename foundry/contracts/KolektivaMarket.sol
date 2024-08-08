// SPDX-License-Identifier: MIT

/**
 * @title KolektivaMarket
 * @dev A marketplace for trading Kolektiva tokens using USDT. This contract handles the placement and fulfillment of buy and sell orders,
 *      as well as the management of fees and initial offerings.
 *
 * @notice The contract uses OpenZeppelin's Ownable and ReentrancyGuard for access control and reentrancy protection.
 *
 * @dev The contract includes several custom errors for more efficient error handling.
 */
pragma solidity 0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract KolektivaMarket is Ownable, ReentrancyGuard {
    error KolektivaMarket__InsufficientBalance(
        uint256 available,
        uint256 required
    );
    error KolektivaMarket__Unauthorized();
    error KolektivaMarket__InvalidOrder();
    error KolektivaMarket__InitialOfferingEnded();
    error KolektivaMarket__InitialOfferingOngoing();
    error KolektivaMarket__InsufficientSupply();
    error KolektivaMarket__TransferFailed();
    error KolektivaMarket__InvalidAmount();
    error KolektivaMarket__NoFundsToWithdraw();

    IERC20 public immutable kolektivaToken;
    IERC20 public immutable usdtToken;
    uint256 public immutable salePrice;
    address public immutable handler;
    address public immutable propertyOwner;

    uint128 public constant FEE_PRECISION = 1e4;

    uint256 public propertyOwnerBalance;
    uint128 public feePercentage = 500; // 500 / 10000 = 5%
    uint256 public initialOfferingSupply;
    uint256 public lastTradedPrice;
    bool public initialOfferingActive = true;

    struct Order {
        address trader;
        uint256 amount;
        uint256 price; // Price in USDT (6 decimals)
    }

    Order[] private buyOrders;
    Order[] private sellOrders;

    event OrderPlaced(
        address indexed trader,
        uint256 amount,
        uint256 price,
        bool isBuyOrder
    );
    event OrderFulfilled(
        address indexed buyer,
        address indexed seller,
        uint256 amount,
        uint256 price
    );
    event OrderCancelled(
        address indexed trader,
        uint256 amount,
        uint256 price,
        bool isBuyOrder
    );
    event InstantTrade(
        address indexed trader,
        uint256 amount,
        uint256 totalPrice,
        bool isBuy
    );
    event InitialOfferingPurchase(
        address indexed buyer,
        uint256 amount,
        uint256 totalCost,
        uint256 fee
    );
    event PropertyOwnerWithdrawal(address indexed owner, uint256 amount);
    event PriceUpdated(uint256 newPrice);

    /**
     * @dev Constructor to initialize the KolektivaMarket contract.
     * @param _kolektivaToken The address of the Kolektiva token contract.
     * @param _usdtToken The address of the USDT token contract.
     * @param _propertyOwner The address of the property owner who will receive funds from the sale.
     * @param _handler The address authorized to handle certain administrative functions.
     * @param _salePrice The initial sale price of the Kolektiva tokens.
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
    }

    /**
     * @dev Modifier to ensure the initial offering is still ongoing.
     */
    modifier initialOfferingStillOngoing() {
        if (!initialOfferingActive)
            revert KolektivaMarket__InitialOfferingEnded();
        _;
    }

    /**
     * @dev Modifier to ensure the initial offering has ended.
     */
    modifier initialOfferingShouldEnded() {
        if (initialOfferingActive)
            revert KolektivaMarket__InitialOfferingOngoing();
        _;
    }

    /**
     * @dev Allows users to buy tokens during the initial offering.
     * @param _amount The amount of tokens to buy.
     *
     * Requirements:
     * - The initial offering must still be ongoing.
     * - The amount must be greater than 0 and less than or equal to the initial offering supply.
     *
     * Emits an {InitialOfferingPurchase} event.
     *
     * Example:
     * ```
     * initialOfferingBuy(100);
     * ```
     */
    function initialOfferingBuy(
        uint256 _amount
    ) external initialOfferingStillOngoing nonReentrant {
        if (_amount == 0) revert KolektivaMarket__InvalidAmount();
        if (_amount > initialOfferingSupply)
            revert KolektivaMarket__InsufficientSupply();

        uint256 totalCost = (_amount * salePrice);
        uint256 fee = (totalCost * feePercentage) / FEE_PRECISION;
        uint256 totalAmount = totalCost + fee;

        if (!usdtToken.transferFrom(msg.sender, address(this), totalAmount)) {
            revert KolektivaMarket__TransferFailed();
        }
        propertyOwnerBalance += totalCost;

        if (!usdtToken.transfer(handler, fee))
            revert KolektivaMarket__TransferFailed();
        if (!kolektivaToken.transferFrom(handler, msg.sender, _amount)) {
            revert KolektivaMarket__TransferFailed();
        }

        unchecked {
            initialOfferingSupply -= _amount;
        }
        if (initialOfferingSupply == 0) {
            initialOfferingActive = false;
        }

        emit InitialOfferingPurchase(msg.sender, _amount, totalCost, fee);
    }

    /**
     * @dev Places a buy order in the market.
     * @param _amount The amount of tokens to buy.
     * @param _price The price per token.
     *
     * Requirements:
     * - The initial offering must have ended.
     *
     * Emits an {OrderPlaced} event.
     *
     * Example:
     * ```
     * placeBuyOrder(100, 10);
     * ```
     */
    function placeBuyOrder(
        uint256 _amount,
        uint256 _price
    ) external initialOfferingShouldEnded nonReentrant {
        uint256 totalCost = (_amount * _price);
        uint256 fee = (totalCost * feePercentage) / FEE_PRECISION;
        if (
            !usdtToken.transferFrom(msg.sender, address(this), totalCost + fee)
        ) {
            revert KolektivaMarket__TransferFailed();
        }
        if (!usdtToken.transfer(handler, fee))
            revert KolektivaMarket__TransferFailed();

        _insertBuyOrder(Order(msg.sender, _amount, _price));
        emit OrderPlaced(msg.sender, _amount, _price, true);
        _matchOrders();
    }

    /**
     * @dev Places a sell order in the market.
     * @param _amount The amount of tokens to sell.
     * @param _price The price per token.
     *
     * Requirements:
     * - The initial offering must have ended.
     *
     * Emits an {OrderPlaced} event.
     *
     * Example:
     * ```
     * placeSellOrder(100, 10);
     * ```
     */
    function placeSellOrder(
        uint256 _amount,
        uint256 _price
    ) external initialOfferingShouldEnded nonReentrant {
        uint256 totalProceeds = (_amount * _price);
        uint256 fee = (totalProceeds * feePercentage) / FEE_PRECISION;

        if (!kolektivaToken.transferFrom(msg.sender, address(this), _amount)) {
            revert KolektivaMarket__TransferFailed();
        }
        if (!usdtToken.transferFrom(msg.sender, handler, fee)) {
            revert KolektivaMarket__TransferFailed();
        }

        _insertSellOrder(Order(msg.sender, _amount, _price));
        emit OrderPlaced(msg.sender, _amount, _price, false);
        _matchOrders();
    }

    /**
     * @dev Instantly buys tokens from the market.
     * @param _amount The amount of tokens to buy.
     *
     * Requirements:
     * - The initial offering must have ended.
     * - The amount must be greater than 0.
     *
     * Emits an {InstantTrade} event.
     *
     * Example:
     * ```
     * instantBuy(100);
     * ```
     */
    function instantBuy(
        uint256 _amount
    ) external initialOfferingShouldEnded nonReentrant {
        if (_amount == 0) revert KolektivaMarket__InvalidAmount();
        uint256 remainingAmount = _amount;
        uint256 totalCost = 0;

        uint256 i = 0;
        uint256 sellOrdersLength = sellOrders.length;
        while (i < sellOrdersLength && remainingAmount > 0) {
            Order storage order = sellOrders[i];
            uint256 availableAmount = remainingAmount < order.amount
                ? remainingAmount
                : order.amount;
            uint256 cost = (availableAmount * order.price);

            totalCost += cost;
            _executeTrade(
                msg.sender,
                order.trader,
                availableAmount,
                order.price
            );
            unchecked {
                remainingAmount -= availableAmount;
                order.amount -= availableAmount;
            }

            if (order.amount == 0) {
                _removeSellOrder(i);
                sellOrdersLength--;
            } else {
                i++;
            }
        }

        if (remainingAmount > 0) revert KolektivaMarket__InsufficientSupply();

        uint256 fee = (totalCost * feePercentage) / FEE_PRECISION;

        if (!usdtToken.transferFrom(msg.sender, handler, fee)) {
            revert KolektivaMarket__TransferFailed();
        }

        emit InstantTrade(msg.sender, _amount, totalCost, true);
    }

    /**
     * @dev Instantly sells tokens to the market.
     * @param _amount The amount of tokens to sell.
     *
     * Requirements:
     * - The initial offering must have ended.
     * - The amount must be greater than 0.
     *
     * Emits an {InstantTrade} event.
     *
     * Example:
     * ```
     * instantSell(100);
     * ```
     */
    function instantSell(
        uint256 _amount
    ) external initialOfferingShouldEnded nonReentrant {
        if (_amount == 0) revert KolektivaMarket__InvalidAmount();
        if (!kolektivaToken.transferFrom(msg.sender, address(this), _amount)) {
            revert KolektivaMarket__TransferFailed();
        }

        uint256 remainingAmount = _amount;
        uint256 totalReceived = 0;

        uint256 i = 0;
        uint256 buyOrdersLength = buyOrders.length;
        while (i < buyOrdersLength && remainingAmount > 0) {
            Order storage order = buyOrders[i];
            uint256 availableAmount = remainingAmount < order.amount
                ? remainingAmount
                : order.amount;
            uint256 received = (availableAmount * order.price);

            _executeTrade(
                msg.sender,
                order.trader,
                availableAmount,
                order.price
            );
            unchecked {
                remainingAmount -= availableAmount;
                totalReceived += received;
                order.amount -= availableAmount;
            }

            if (order.amount == 0) {
                _removeBuyOrder(i);
                buyOrdersLength--;
            } else {
                i++;
            }
        }

        if (remainingAmount > 0) revert KolektivaMarket__InsufficientSupply();

        uint256 fee = (totalReceived * feePercentage) / FEE_PRECISION;
        uint256 amountAfterFee = totalReceived - fee;

        if (!usdtToken.transfer(msg.sender, amountAfterFee)) {
            revert KolektivaMarket__TransferFailed();
        }
        if (!usdtToken.transferFrom(msg.sender, handler, fee)) {
            revert KolektivaMarket__TransferFailed();
        }

        emit InstantTrade(msg.sender, _amount, totalReceived, false);
    }

    /**
     * @dev Cancels a buy order.
     * @param _index The index of the buy order to cancel.
     *
     * Requirements:
     * - The caller must be the trader who placed the order.
     * - The order must exist.
     *
     * Emits an {OrderCancelled} event.
     *
     * Example:
     * ```
     * cancelBuyOrder(0);
     * ```
     */
    function cancelBuyOrder(uint256 _index) external nonReentrant {
        if (_index >= buyOrders.length) revert KolektivaMarket__InvalidOrder();
        Order memory order = buyOrders[_index];
        if (order.trader != msg.sender) revert KolektivaMarket__Unauthorized();
        uint256 refund = (order.amount * order.price);
        _removeBuyOrder(_index);
        if (!usdtToken.transfer(msg.sender, refund))
            revert KolektivaMarket__TransferFailed();
        emit OrderCancelled(msg.sender, order.amount, order.price, true);
    }

    /**
     * @dev Cancels a sell order.
     * @param _index The index of the sell order to cancel.
     *
     * Requirements:
     * - The caller must be the trader who placed the order.
     * - The order must exist.
     *
     * Emits an {OrderCancelled} event.
     *
     * Example:
     * ```
     * cancelSellOrder(0);
     * ```
     */
    function cancelSellOrder(uint256 _index) external nonReentrant {
        if (_index >= sellOrders.length) revert KolektivaMarket__InvalidOrder();
        Order memory order = sellOrders[_index];
        if (order.trader != msg.sender) revert KolektivaMarket__Unauthorized();
        _removeSellOrder(_index);
        if (!kolektivaToken.transfer(msg.sender, order.amount)) {
            revert KolektivaMarket__TransferFailed();
        }
        emit OrderCancelled(msg.sender, order.amount, order.price, false);
    }

    /**
     * @dev Matches buy and sell orders.
     */
    function _matchOrders() internal {
        while (buyOrders.length > 0 && sellOrders.length > 0) {
            Order memory buyOrder = buyOrders[buyOrders.length - 1];
            Order memory sellOrder = sellOrders[0];

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
                        buyOrders[buyOrders.length - 1].amount -= matchedAmount;
                    }
                }

                if (matchedAmount == sellOrder.amount) {
                    _removeSellOrder(0);
                } else {
                    unchecked {
                        sellOrders[0].amount -= matchedAmount;
                    }
                }
            } else {
                break;
            }
        }
    }

    /**
     * @dev Executes a trade between a buyer and a seller.
     * @param _buyer The address of the buyer.
     * @param _seller The address of the seller.
     * @param _amount The amount of tokens to trade.
     * @param _price The price per token.
     *
     * Emits an {OrderFulfilled} event.
     */
    function _executeTrade(
        address _buyer,
        address _seller,
        uint256 _amount,
        uint256 _price
    ) internal {
        uint256 totalPrice = (_amount * _price);

        if (!kolektivaToken.transfer(_buyer, _amount))
            revert KolektivaMarket__TransferFailed();
        if (!usdtToken.transferFrom(_buyer, _seller, totalPrice))
            revert KolektivaMarket__TransferFailed();

        emit OrderFulfilled(_buyer, _seller, _amount, _price);
        updateLastTradedPrice(_price);
    }

    /**
     * @dev Removes a buy order by index.
     * @param _index The index of the buy order to remove.
     */
    function _removeBuyOrder(uint256 _index) internal {
        buyOrders[_index] = buyOrders[buyOrders.length - 1];
        buyOrders.pop();
    }

    /**
     * @dev Removes a sell order by index.
     * @param _index The index of the sell order to remove.
     */
    function _removeSellOrder(uint256 _index) internal {
        sellOrders[_index] = sellOrders[sellOrders.length - 1];
        sellOrders.pop();
    }

    /**
     * @dev Inserts a buy order into the buy orders array.
     * @param _order The buy order to insert.
     */
    function _insertBuyOrder(Order memory _order) internal {
        buyOrders.push(_order);
        uint256 i = buyOrders.length - 1;
        while (i > 0 && buyOrders[i - 1].price < _order.price) {
            buyOrders[i] = buyOrders[i - 1];
            i--;
        }
        buyOrders[i] = _order;
    }

    /**
     * @dev Inserts a sell order into the sell orders array.
     * @param _order The sell order to insert.
     */
    function _insertSellOrder(Order memory _order) internal {
        sellOrders.push(_order);
        uint256 i = sellOrders.length - 1;
        while (i > 0 && sellOrders[i - 1].price > _order.price) {
            sellOrders[i] = sellOrders[i - 1];
            i--;
        }
        sellOrders[i] = _order;
    }

    /**
     * @dev Sets the fee percentage for the market.
     * @param _newFeePercentage The new fee percentage (must be <= 1000).
     *
     * Example:
     * ```
     * setFeePercentage(300);
     * ```
     */
    function setFeePercentage(uint256 _newFeePercentage) external onlyOwner {
        if (_newFeePercentage > 1000) revert KolektivaMarket__InvalidAmount();
        feePercentage = uint128(_newFeePercentage);
    }

    /**
     * @dev Ends the initial offering.
     *
     * Example:
     * ```
     * endInitialOffering();
     * ```
     */
    function endInitialOffering() external onlyOwner {
        initialOfferingActive = false;
    }

    /**
     * @dev Updates the last traded price.
     * @param _newPrice The new price.
     *
     * Emits a {PriceUpdated} event.
     */
    function updateLastTradedPrice(uint256 _newPrice) internal {
        lastTradedPrice = _newPrice;
        emit PriceUpdated(_newPrice);
    }

    /**
     * @dev Withdraws funds for the property owner.
     *
     * Requirements:
     * - The caller must be the property owner.
     * - There must be funds to withdraw.
     *
     * Emits a {PropertyOwnerWithdrawal} event.
     */
    function withdrawPropertyOwnerFunds() external initialOfferingShouldEnded {
        if (msg.sender != propertyOwner) revert KolektivaMarket__Unauthorized();
        uint256 balance = propertyOwnerBalance;
        propertyOwnerBalance = 0;

        if (balance == 0) revert KolektivaMarket__NoFundsToWithdraw();
        if (!usdtToken.transfer(propertyOwner, balance))
            revert KolektivaMarket__TransferFailed();
        emit PropertyOwnerWithdrawal(propertyOwner, balance);
    }

    /**
     * @dev Returns the count of buy orders.
     * @return The count of buy orders.
     */
    function getBuyOrdersCount() external view returns (uint256) {
        return buyOrders.length;
    }

    /**
     * @dev Returns the count of sell orders.
     * @return The count of sell orders.
     */
    function getSellOrdersCount() external view returns (uint256) {
        return sellOrders.length;
    }

    /**
     * @dev Returns a buy order by index.
     * @param index The index of the buy order.
     * @return The buy order.
     */
    function getBuyOrderByIndex(
        uint256 index
    ) external view returns (Order memory) {
        return buyOrders[index];
    }

    /**
     * @dev Returns a sell order by index.
     * @param index The index of the sell order.
     * @return The sell order.
     */
    function getSellOrderByIndex(
        uint256 index
    ) external view returns (Order memory) {
        return sellOrders[index];
    }

    /**
     * @dev Calculates the total cost and fees for buying a given amount of tokens.
     * @param _amount The amount of tokens to buy.
     * @return totalCost The total cost including fees.
     * @return fees The fees for the transaction.
     */
    function calculateBuyCost(
        uint256 _amount
    ) external view returns (uint256 totalCost, uint256 fees) {
        uint256 remainingAmount = _amount;
        totalCost = 0;

        uint256 i = 0;
        uint256 sellOrdersLength = sellOrders.length;
        while (i < sellOrdersLength && remainingAmount > 0) {
            Order memory order = sellOrders[i];
            uint256 availableAmount = remainingAmount < order.amount
                ? remainingAmount
                : order.amount;
            totalCost += (availableAmount * order.price);
            unchecked {
                remainingAmount -= availableAmount;
                i++;
            }
        }

        if (remainingAmount > 0) revert KolektivaMarket__InsufficientSupply();

        fees = (totalCost * feePercentage) / FEE_PRECISION;
        totalCost += fees;
    }

    /**
     * @dev Calculates the total proceeds and fees for selling a given amount of tokens.
     * @param _amount The amount of tokens to sell.
     * @return totalProceeds The total proceeds after fees.
     * @return fees The fees for the transaction.
     */
    function calculateSellProceeds(
        uint256 _amount
    ) external view returns (uint256 totalProceeds, uint256 fees) {
        uint256 remainingAmount = _amount;
        totalProceeds = 0;

        uint256 i = 0;
        uint256 buyOrdersLength = buyOrders.length;
        while (i < buyOrdersLength && remainingAmount > 0) {
            Order memory order = buyOrders[i];
            uint256 availableAmount = remainingAmount < order.amount
                ? remainingAmount
                : order.amount;
            totalProceeds += (availableAmount * order.price);
            unchecked {
                remainingAmount -= availableAmount;
                i++;
            }
        }

        if (remainingAmount > 0) revert KolektivaMarket__InsufficientSupply();

        fees = (totalProceeds * feePercentage) / FEE_PRECISION;
        totalProceeds -= fees;
    }
}
