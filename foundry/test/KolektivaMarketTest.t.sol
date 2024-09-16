// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from 'forge-std/Test.sol';
import {KolektivaToken} from '../contracts/KolektivaToken.sol';
import {KolektivaMarket} from '../contracts/KolektivaMarket.sol';
import {MockUSDT} from '../contracts/mocks/MockUSDT.sol';
import {OrderLib} from '../contracts/OrderLib.sol';

contract KolektivaMarketTest is Test {
    KolektivaMarket public market;
    KolektivaToken public kolektivaToken;
    MockUSDT public usdtToken;

    address public handler = makeAddr('handler');
    address public propertyOwner = makeAddr('propertyOwner');
    address public buyer = makeAddr('buyer');
    address public seller = makeAddr('seller');

    string public tokenName = 'TestToken';
    string public tokenSymbol = 'TT';
    string public propertyType = 'Property Type';
    string public country = 'Country';
    string public state = 'State';
    string public city = 'City';
    string public location = 'Location';

    uint256 private constant SALE_PRICE = 1e6; // Example price, adjust as needed
    uint128 private constant FEE_PERCENTAGE = 50; // 0.5%
    uint128 private constant FEE_PRECISION = 1e4; // 5%
    uint256 private constant INITIAL_SUPPLY = 1000; // 1000 tokens
    uint128 private constant INITIAL_OFFERING_PERCENTAGE = 500; // 500 / 10000 = 5%

    struct HelperOrder {
        uint256 amount;
        uint256 price; // Price in USDT (6 decimals)
        uint256 cost;
        uint256 fee;
    }
    mapping(address => HelperOrder) public HelperMappingOrder;

    function setUp() public {
        vm.startPrank(handler);
        // Deploy mock tokens
        kolektivaToken = new KolektivaToken(
            tokenName,
            tokenSymbol,
            propertyType,
            country,
            state,
            city,
            location,
            INITIAL_SUPPLY,
            handler
        );
        usdtToken = new MockUSDT();

        market = new KolektivaMarket(
            address(kolektivaToken),
            address(usdtToken),
            propertyOwner,
            handler,
            SALE_PRICE
        );

        // Transfer initial supply to the market
        kolektivaToken.approve(address(market), INITIAL_SUPPLY);
        vm.stopPrank();
    }

    function testInitialOfferingBuySuccess() public {
        uint256 amount = 100; // Example amount
        uint256 totalCost = (amount * SALE_PRICE);
        uint256 fee = (totalCost * FEE_PERCENTAGE) / FEE_PRECISION;
        uint256 initialOfferingFee = (totalCost * INITIAL_OFFERING_PERCENTAGE) /
            FEE_PRECISION;
        uint256 expectedMarketBalance = totalCost - initialOfferingFee;
        uint256 expectedHandlerBalance = fee + initialOfferingFee;

        // Mint USDT to buyer
        vm.startPrank(handler);
        usdtToken.mint(buyer, totalCost + fee);
        vm.stopPrank();

        // Execute the buy
        vm.startPrank(buyer);
        usdtToken.approve(address(market), totalCost + fee);
        market.initialOfferingBuy(amount);
        vm.stopPrank();

        // Verify the result
        assertEq(kolektivaToken.balanceOf(buyer), amount);
        assertEq(kolektivaToken.balanceOf(handler), INITIAL_SUPPLY - amount);
        assertEq(usdtToken.balanceOf(address(market)), expectedMarketBalance); // Fee received by the market
        assertEq(usdtToken.balanceOf(handler), expectedHandlerBalance); // Handler received total cost plus fee
    }

    function testInitialOfferingBuyInsufficientSupply() public {
        uint256 amount = INITIAL_SUPPLY + 1; // More than the available supply
        uint256 totalCost = (amount * SALE_PRICE);
        uint256 fee = (totalCost * FEE_PERCENTAGE) / FEE_PRECISION;

        // Mint USDT to buyer
        vm.startPrank(handler);
        usdtToken.mint(buyer, totalCost + fee);
        vm.stopPrank();

        // Execute the buy
        vm.startPrank(buyer);
        usdtToken.approve(address(market), totalCost + fee);
        vm.expectRevert(KolektivaMarket.InsufficientSupply.selector);
        market.initialOfferingBuy(amount);
        vm.stopPrank();
    }

    function testPlaceBuyOrderInitialOfferingStillOngoing() public {
        uint256 amount = 100; // Example amount
        uint256 price = 1e6; // Example price
        uint256 totalCost = (amount * price);
        uint256 fee = (totalCost * FEE_PERCENTAGE) / FEE_PRECISION;

        // Mint USDT to buyer
        vm.startPrank(handler);
        usdtToken.mint(buyer, totalCost + fee);
        vm.stopPrank();

        // Execute the buy order
        vm.startPrank(buyer);
        usdtToken.approve(address(market), totalCost + fee);
        vm.expectRevert(KolektivaMarket.InitialOfferingOngoing.selector);
        market.placeOrder(amount, price, true);
        vm.stopPrank();
    }

    function testPlaceSellOrderInitialOfferingStillOngoing() public {
        uint256 amount = 100; // Example amount
        uint256 price = SALE_PRICE; // Example price
        // uint256 totalProceeds = (amount * price);

        vm.startPrank(handler);
        kolektivaToken.transfer(seller, amount);
        kolektivaToken.approve(address(market), amount);
        vm.stopPrank();

        vm.startPrank(seller);
        vm.expectRevert(KolektivaMarket.InitialOfferingOngoing.selector);
        market.placeOrder(amount, price, false);
        vm.stopPrank();
    }

    modifier endInitialOffering() {
        vm.startPrank(handler);
        market.endInitialOffering(); // End initial offering for this test
        vm.stopPrank();
        _;
    }

    function testPlaceBuyOrderSuccess() public endInitialOffering {
        uint256 amount = 100; // Example amount
        uint256 price = 1e6; // Example price
        uint256 totalCost = (amount * price);
        uint256 fee = (totalCost * FEE_PERCENTAGE) / FEE_PRECISION;

        // Mint USDT to buyer
        vm.startPrank(handler);
        usdtToken.mint(buyer, totalCost + fee);
        vm.stopPrank();

        // Execute the buy order
        vm.startPrank(buyer);
        usdtToken.approve(address(market), totalCost + fee);
        market.placeOrder(amount, price, true);
        vm.stopPrank();

        OrderLib.Order memory order = market.getBuyOrderByIndex(0);
        assertEq(order.trader, buyer);
        assertEq(order.amount, amount);
        assertEq(order.price, price);

        assertEq(usdtToken.balanceOf(handler), fee);
        assertEq(usdtToken.balanceOf(address(market)), totalCost);

        assertEq(market.getBuyOrdersCount(), 1);
    }

    function helperCreateOrder(
        address trader,
        uint256 amount,
        uint256 price,
        bool isBuyOrder
    ) public {
        vm.startPrank(trader);
        HelperOrder storage tradeOrder = HelperMappingOrder[trader];

        tradeOrder.amount = amount;
        tradeOrder.price = price;
        tradeOrder.cost = tradeOrder.amount * tradeOrder.price;
        tradeOrder.fee = (tradeOrder.cost * FEE_PERCENTAGE) / FEE_PRECISION;

        if (isBuyOrder) {
            usdtToken.approve(
                address(market),
                tradeOrder.cost + tradeOrder.fee
            );
            market.placeOrder(tradeOrder.amount, tradeOrder.price, true);
        } else {
            kolektivaToken.approve(address(market), amount);
            usdtToken.approve(address(market), tradeOrder.fee);
            market.placeOrder(tradeOrder.amount, tradeOrder.price, false);
        }
        vm.stopPrank();
    }

    function testPlaceBuyOrderMoreThanOneSuccess() public endInitialOffering {
        address[3] memory buyers = [
            buyer,
            makeAddr('buyer2'),
            makeAddr('buyer3')
        ];
        uint256 amount = 100; // Example amount
        uint256 price = 1e6; // Example price
        uint256 usdtMint = amount * price;

        // Mint USDT to buyers
        vm.startPrank(handler);
        usdtToken.mint(buyers[0], usdtMint);
        usdtToken.mint(buyers[1], usdtMint);
        usdtToken.mint(buyers[2], usdtMint);
        vm.stopPrank();

        // Execute the buy orders
        helperCreateOrder(buyers[1], 15, 2 * price, true);
        helperCreateOrder(buyers[0], 10, 1 * price, true);
        helperCreateOrder(buyers[2], 20, 3 * price, true);

        uint256 count = market.getBuyOrdersCount();
        assertEq(count, 3);

        for (uint256 i = 0; i < count; i++) {
            OrderLib.Order memory order = market.getBuyOrderByIndex(i);
            address trader = buyers[i];
            HelperOrder storage tradeOrder = HelperMappingOrder[trader];

            assertEq(order.trader, trader);
            assertEq(order.amount, tradeOrder.amount);
            assertEq(order.price, tradeOrder.price);

            console.log('User: ', i);

            uint256 kTokenBalance = kolektivaToken.balanceOf(trader);
            console.log('kTokenBalance', kTokenBalance);
            assertEq(kTokenBalance, 0);

            uint256 usdtBalance = usdtToken.balanceOf(trader);
            uint256 usdtInMarket = tradeOrder.cost + tradeOrder.fee;
            uint256 expecteUsdtBalance = usdtMint - usdtInMarket;
            console.log('expecteUsdtBalance', expecteUsdtBalance);

            assertEq(usdtBalance, expecteUsdtBalance);
        }
    }

    function testInstantSellOnMoreThanOneBuyOrdersSuccess()
        public
        endInitialOffering
    {
        address[3] memory buyers = [
            buyer,
            makeAddr('buyer2'),
            makeAddr('buyer3')
        ];
        uint256 amount = 100; // Example amount
        uint256 price = 1e6; // Example price
        uint256 usdtMint = amount * price;

        // Mint USDT to buyer
        vm.startPrank(handler);
        usdtToken.mint(buyers[0], usdtMint);
        usdtToken.mint(buyers[1], usdtMint);
        usdtToken.mint(buyers[2], usdtMint);
        vm.stopPrank();

        // Execute the buy order
        helperCreateOrder(buyers[1], 15, 2 * price, true);
        helperCreateOrder(buyers[0], 10, 1 * price, true);
        helperCreateOrder(buyers[2], 20, 3 * price, true);

        uint256 prevCount = market.getBuyOrdersCount();
        assertEq(prevCount, 3);

        vm.startPrank(handler);
        usdtToken.mint(seller, usdtMint);
        kolektivaToken.transfer(seller, amount);
        // Emptied the handler balance just like initialOffering ended
        kolektivaToken.transfer(
            propertyOwner,
            kolektivaToken.balanceOf(handler)
        );
        vm.stopPrank();

        vm.startPrank(seller);
        uint256 sellAmount = 30;
        (uint256 totalProceeds, uint256 fee) = market.calculateSellProceeds(
            sellAmount
        );
        // console.log("totalProceeds", totalProceeds, "fee", fee);
        kolektivaToken.approve(address(market), sellAmount);
        usdtToken.approve(address(market), fee);
        market.instantTrade(sellAmount, false);

        // uint256 kTokenSellerBalance = kolektivaToken.balanceOf(seller);
        uint256 expectedKTokenSellerBalance = amount - sellAmount;
        assertEq(kolektivaToken.balanceOf(seller), expectedKTokenSellerBalance);

        // uint256 usdtSellerBalance = usdtToken.balanceOf(seller);
        uint256 expectedUsdtSellerBalance = usdtMint + totalProceeds;
        assertEq(usdtToken.balanceOf(seller), expectedUsdtSellerBalance);
        vm.stopPrank();

        // uint256 currCount = market.getBuyOrdersCount();
        assertEq(market.getBuyOrdersCount(), 2);

        // Buyer 1
        HelperOrder memory buyOrder0 = HelperMappingOrder[buyers[0]];
        // Kolektiva Token balance
        assertEq(kolektivaToken.balanceOf(buyers[0]), 0);
        // USDT Balance
        assertEq(
            usdtToken.balanceOf(buyers[0]),
            usdtMint - buyOrder0.fee - buyOrder0.cost
        );

        // Buyer 2
        HelperOrder memory buyOrder1 = HelperMappingOrder[buyers[1]];
        // Kolektiva Token balance
        assertEq(kolektivaToken.balanceOf(buyers[1]), 10);
        // USDT Balance
        assertEq(
            usdtToken.balanceOf(buyers[1]),
            usdtMint - buyOrder1.fee - buyOrder1.cost
        );

        // Buyer 3
        HelperOrder memory buyOrder2 = HelperMappingOrder[buyers[2]];
        // Kolektiva Token balance
        assertEq(kolektivaToken.balanceOf(buyers[2]), 20);
        // USDT Balance
        assertEq(
            usdtToken.balanceOf(buyers[2]),
            usdtMint - buyOrder2.fee - buyOrder2.cost
        );
    }

    function testPlaceSellOrderSuccess() public endInitialOffering {
        uint256 amount = 100; // Example amount
        uint256 price = 1e6; // Example price
        uint256 totalCost = (amount * price);
        uint256 fee = (totalCost * FEE_PERCENTAGE) / FEE_PRECISION;

        vm.startPrank(handler);
        usdtToken.mint(seller, fee);
        kolektivaToken.transfer(seller, amount);
        vm.stopPrank();

        vm.startPrank(seller);
        kolektivaToken.approve(address(market), amount);
        usdtToken.approve(address(market), fee);
        market.placeOrder(amount, price, false);
        vm.stopPrank();

        OrderLib.Order memory order = market.getSellOrderByIndex(0);
        assertEq(order.trader, seller);
        assertEq(order.amount, amount);
        assertEq(order.price, price);

        assertEq(usdtToken.balanceOf(handler), fee);
        assertEq(kolektivaToken.balanceOf(address(market)), amount);

        assertEq(market.getSellOrdersCount(), 1);
    }

    function testPlaceSellOrderMoreThanOneSuccess() public endInitialOffering {
        address[3] memory sellers = [
            seller,
            makeAddr('seller2'),
            makeAddr('seller3')
        ];
        uint256 tokenAmount = 100; // Example amount
        uint256 price = 1e6; // Example price
        uint256 usdtMint = tokenAmount * price;

        // Mint USDT and transfer Kolektiva Token to sellers
        vm.startPrank(handler);
        usdtToken.mint(sellers[0], usdtMint);
        kolektivaToken.transfer(sellers[0], tokenAmount);
        usdtToken.mint(sellers[1], usdtMint);
        kolektivaToken.transfer(sellers[1], tokenAmount);
        usdtToken.mint(sellers[2], usdtMint);
        kolektivaToken.transfer(sellers[2], tokenAmount);
        vm.stopPrank();

        // Execute the sell orders
        helperCreateOrder(sellers[2], 30, 3 * price, false);
        helperCreateOrder(sellers[0], 10, 1 * price, false);
        helperCreateOrder(sellers[1], 15, 2 * price, false);

        uint256 count = market.getSellOrdersCount();
        assertEq(count, 3);

        for (uint256 i = 0; i < count; i++) {
            OrderLib.Order memory order = market.getSellOrderByIndex(i);
            address trader = sellers[count - i - 1];
            HelperOrder storage tradeOrder = HelperMappingOrder[trader];

            assertEq(order.trader, trader);
            assertEq(order.amount, tradeOrder.amount);
            assertEq(order.price, tradeOrder.price);

            console.log('User: ', i);

            uint256 kTokenBalance = kolektivaToken.balanceOf(trader);
            console.log('kTokenBalance', kTokenBalance);
            assertEq(kTokenBalance, tokenAmount - tradeOrder.amount);

            uint256 usdtBalance = usdtToken.balanceOf(trader);
            uint256 expecteUsdtBalance = usdtMint - tradeOrder.fee;
            console.log('expecteUsdtBalance', expecteUsdtBalance);
            assertEq(usdtBalance, expecteUsdtBalance);
        }
    }

    function testInstantBuyOnMoreThanOneSellOrdersSuccess()
        public
        endInitialOffering
    {
        address[3] memory sellers = [
            seller,
            makeAddr('seller2'),
            makeAddr('seller3')
        ];
        uint256 tokenAmount = 100; // Example amount
        uint256 price = 1e6; // Example price
        uint256 usdtMint = tokenAmount * price;

        // Mint USDT and transfer Kolektiva Token to sellers
        vm.startPrank(handler);
        usdtToken.mint(sellers[0], usdtMint);
        kolektivaToken.transfer(sellers[0], tokenAmount);
        usdtToken.mint(sellers[1], usdtMint);
        kolektivaToken.transfer(sellers[1], tokenAmount);
        usdtToken.mint(sellers[2], usdtMint);
        kolektivaToken.transfer(sellers[2], tokenAmount);
        vm.stopPrank();

        // Execute the sell orders
        helperCreateOrder(sellers[2], 20, 3 * price, false);
        helperCreateOrder(sellers[0], 10, 1 * price, false);
        helperCreateOrder(sellers[1], 15, 2 * price, false);

        uint256 count = market.getSellOrdersCount();
        assertEq(count, 3);

        vm.startPrank(handler);
        usdtToken.mint(buyer, usdtMint);
        // Emptied the handler balance just like initialOffering ended
        kolektivaToken.transfer(
            propertyOwner,
            kolektivaToken.balanceOf(handler)
        );
        vm.stopPrank();

        for (uint256 i = 0; i < count; i++) {
            OrderLib.Order memory order = market.getSellOrderByIndex(i);
            console.log('User: ', i);
            console.log('order.trader', order.trader);
            console.log('order.amount', order.amount);
            console.log('order.price', order.price);
        }

        console.log('========/=======/=======');

        vm.startPrank(buyer);
        uint256 buyAmount = 30;
        (uint256 totalCost, ) = market.calculateBuyCost(buyAmount);
        usdtToken.approve(address(market), totalCost);
        market.instantTrade(buyAmount, true);

        assertEq(kolektivaToken.balanceOf(buyer), buyAmount);

        uint256 expectedUsdtBuyerBalance = usdtMint - totalCost;
        assertEq(usdtToken.balanceOf(buyer), expectedUsdtBuyerBalance);
        vm.stopPrank();

        uint256 currCount = market.getSellOrdersCount();
        assertEq(market.getSellOrdersCount(), 2);

        for (uint256 i = 0; i < currCount; i++) {
            OrderLib.Order memory order = market.getSellOrderByIndex(i);
            console.log('User: ', i);
            console.log('order.trader', order.trader);
            console.log('order.amount', order.amount);
            console.log('order.price', order.price);
        }

        console.log('========/=======/=======');

        // Seller 1
        HelperOrder memory sellOrder0 = HelperMappingOrder[sellers[0]];
        // Kolektiva Token balance
        assertEq(kolektivaToken.balanceOf(sellers[0]), tokenAmount - 10);
        // USDT Balance
        assertEq(
            usdtToken.balanceOf(sellers[0]),
            usdtMint - sellOrder0.fee + (0 * sellOrder0.price)
        );

        // Seller 2
        HelperOrder memory sellOrder1 = HelperMappingOrder[sellers[1]];
        // Kolektiva Token balance
        assertEq(kolektivaToken.balanceOf(sellers[1]), tokenAmount - 15);
        // USDT Balance
        assertEq(
            usdtToken.balanceOf(sellers[1]),
            usdtMint - sellOrder1.fee + (10 * sellOrder1.price)
        );

        // Seller 3
        HelperOrder memory sellOrder2 = HelperMappingOrder[sellers[2]];
        // Kolektiva Token balance
        assertEq(kolektivaToken.balanceOf(sellers[2]), tokenAmount - 20);
        // USDT Balance
        assertEq(
            usdtToken.balanceOf(sellers[2]),
            usdtMint - sellOrder2.fee + (20 * sellOrder2.price)
        );
    }

    function testInstantBuySuccess() public endInitialOffering {
        // Prepare sell order
        uint256 sellAmount = 100;
        uint256 sellPrice = 1e6;
        uint256 totalSellCost = (sellAmount * sellPrice);
        uint256 sellFee = (totalSellCost * FEE_PERCENTAGE) / FEE_PRECISION;

        // Prepare buy
        uint256 buyAmount = 50;
        uint256 buyCost = (buyAmount * sellPrice);
        uint256 buyFee = (buyCost * FEE_PERCENTAGE) / FEE_PRECISION;

        vm.startPrank(handler);
        usdtToken.mint(buyer, buyCost + buyFee);
        usdtToken.mint(seller, sellFee);
        kolektivaToken.transfer(seller, sellAmount);
        // Emptied the handler balance just like initialOffering ended
        kolektivaToken.transfer(
            propertyOwner,
            kolektivaToken.balanceOf(handler)
        );
        vm.stopPrank();

        vm.startPrank(seller);
        usdtToken.approve(address(market), sellFee);
        kolektivaToken.approve(address(market), sellAmount);

        market.placeOrder(sellAmount, sellPrice, false);
        vm.stopPrank();

        (uint256 totalCost, uint256 fee) = market.calculateBuyCost(buyAmount);
        console.log('totalCost', totalCost);
        console.log('fee', fee);

        vm.startPrank(buyer);
        usdtToken.approve(address(market), buyCost + buyFee);
        market.instantTrade(buyAmount, true);
        vm.stopPrank();

        assertEq(kolektivaToken.balanceOf(buyer), buyAmount);
        assertEq(
            kolektivaToken.balanceOf(address(market)),
            sellAmount - buyAmount
        );

        assertEq(usdtToken.balanceOf(handler), sellFee + buyFee);
        assertEq(usdtToken.balanceOf(seller), buyCost);
    }

    function testInstantBuyInsufficientSupply() public {
        vm.startPrank(handler);
        market.endInitialOffering(); // End initial offering for this test
        vm.stopPrank();

        uint256 buyAmount = 100; // More than available in the market

        vm.startPrank(handler);
        vm.expectRevert(KolektivaMarket.InsufficientSupply.selector);
        market.instantTrade(buyAmount, true);
        vm.stopPrank();
    }

    function testCancelBuyOrderSuccess() public endInitialOffering {
        // When cancel, the fee will not be refunded
        // Define the buy order parameters
        uint256 amount = 100;
        uint256 price = 1e6;
        uint256 totalCost = (amount * price);
        uint256 fee = (totalCost * FEE_PERCENTAGE) / FEE_PRECISION;

        // Mint USDT to the buyer and approve the market contract to spend it
        vm.startPrank(handler);
        usdtToken.mint(buyer, totalCost + fee);
        vm.stopPrank();

        vm.startPrank(buyer);
        usdtToken.approve(address(market), totalCost + fee);
        market.placeOrder(amount, price, true);
        market.cancelOrder(0, true); // Assuming it's the first order
        vm.stopPrank();

        // Assert that no Kolektiva tokens were received by the buyer
        assertEq(kolektivaToken.balanceOf(buyer), 0);

        // Assert that the buyer's USDT balance is refunded correctly
        assertEq(usdtToken.balanceOf(buyer), totalCost);
    }

    function testCancelSellOrderSuccess() public endInitialOffering {
        // Define the sell order parameters
        uint256 amount = 100;
        uint256 price = 1e6;
        uint256 totalCost = (amount * price);
        uint256 fee = (totalCost * FEE_PERCENTAGE) / FEE_PRECISION;

        // Transfer Kolektiva tokens to the seller and approve the market contract to spend them
        vm.startPrank(handler);
        usdtToken.mint(seller, fee);
        kolektivaToken.transfer(seller, amount);
        // Emptied the handler balance just like initialOffering ended
        kolektivaToken.transfer(
            propertyOwner,
            kolektivaToken.balanceOf(handler)
        );
        vm.stopPrank();

        vm.startPrank(seller);
        usdtToken.approve(address(market), fee);
        kolektivaToken.approve(address(market), amount);
        market.placeOrder(amount, price, false);
        market.cancelOrder(0, false); // Assuming it's the first ord, falseer
        vm.stopPrank();

        // Assert that the seller's Kolektiva tokens are returned correctly
        assertEq(kolektivaToken.balanceOf(seller), amount);

        // Assert that the seller's USDT balance is refunded correctly
        assertEq(usdtToken.balanceOf(seller), 0);
    }

    function testCancelBuyOrderUnauthorized() public endInitialOffering {
        uint256 amount = 100;
        uint256 price = 1e6;
        uint256 totalCost = (amount * price);
        uint256 fee = (totalCost * FEE_PERCENTAGE) / FEE_PRECISION;

        vm.startPrank(handler);
        usdtToken.mint(buyer, totalCost + fee);
        vm.stopPrank();

        vm.startPrank(buyer);
        usdtToken.approve(address(market), totalCost + fee);
        market.placeOrder(amount, price, true);
        vm.stopPrank();

        vm.prank(address(0x789)); // Different address
        vm.expectRevert(KolektivaMarket.Unauthorized.selector);
        market.cancelOrder(0, true);
    }

    function testCancelSellOrderUnauthorized() public endInitialOffering {
        uint256 amount = 100;
        uint256 price = 1e6;
        uint256 totalCost = (amount * price);
        uint256 fee = (totalCost * FEE_PERCENTAGE) / FEE_PRECISION;

        vm.startPrank(handler);
        usdtToken.mint(seller, fee);
        kolektivaToken.transfer(seller, amount);
        vm.stopPrank();

        vm.startPrank(seller);
        usdtToken.approve(address(market), fee);
        kolektivaToken.approve(address(market), amount);
        market.placeOrder(amount, price, false);
        vm.stopPrank();

        vm.prank(address(0x789)); // Different address
        vm.expectRevert(KolektivaMarket.Unauthorized.selector);
        market.cancelOrder(0, false);
    }

    function testWithdrawPropertyOwnerFunds() public {
        uint256 amount = 100; // Example amount
        uint256 totalCost = (amount * SALE_PRICE);
        uint256 fee = (totalCost * FEE_PERCENTAGE) / FEE_PRECISION;
        uint256 initialOfferingFee = (totalCost * INITIAL_OFFERING_PERCENTAGE) /
            FEE_PRECISION;
        uint256 expectedMarketBalance = totalCost - initialOfferingFee;

        // Mint USDT to buyer
        vm.startPrank(handler);
        usdtToken.mint(buyer, totalCost + fee);
        vm.stopPrank();

        // Execute the buy
        vm.startPrank(buyer);
        usdtToken.approve(address(market), totalCost + fee);
        market.initialOfferingBuy(amount);
        vm.stopPrank();

        assertEq(market.propertyOwnerBalance(), expectedMarketBalance);

        vm.startPrank(handler);
        market.endInitialOffering();
        vm.stopPrank();

        // Now perform the withdraw
        vm.startPrank(propertyOwner);
        market.withdrawPropertyOwnerFunds();
        vm.stopPrank();

        // Assertions
        assertEq(usdtToken.balanceOf(propertyOwner), expectedMarketBalance);
        assertEq(market.propertyOwnerBalance(), 0); // Should be reset to 0 after withdrawal
    }

    function testWithdrawPropertyOwnerFundsNoFunds() public endInitialOffering {
        vm.prank(propertyOwner);
        vm.expectRevert(KolektivaMarket.NoFundsToWithdraw.selector);
        market.withdrawPropertyOwnerFunds();
    }

    function testCalculateBuyCost() public endInitialOffering {
        uint256 amount = 100; // Example amount
        uint256 price = 1e6; // Example price
        uint256 expectedCost = (amount * price);
        uint256 expectedFee = (expectedCost * FEE_PERCENTAGE) / FEE_PRECISION;

        vm.startPrank(handler);
        usdtToken.mint(seller, expectedFee);
        kolektivaToken.transfer(seller, amount);
        vm.stopPrank();

        vm.startPrank(seller);
        kolektivaToken.approve(address(market), amount);
        usdtToken.approve(address(market), expectedFee);
        market.placeOrder(amount, price, false);
        vm.stopPrank();

        (uint256 totalProceeds, uint256 fees) = market.calculateBuyCost(amount);
        assertEq(totalProceeds, expectedCost + expectedFee);
        assertEq(fees, expectedFee);
    }

    function testCalculateSellProceeds() public endInitialOffering {
        // Define the buy order parameters
        uint256 amount = 100;
        uint256 price = 1e6;
        uint256 expectedCost = (amount * price);
        uint256 expectedFee = (expectedCost * FEE_PERCENTAGE) / FEE_PRECISION;

        // Mint USDT to the buyer and approve the market contract to spend it
        vm.startPrank(handler);
        usdtToken.mint(buyer, expectedCost + expectedFee);
        vm.stopPrank();

        vm.startPrank(buyer);
        usdtToken.approve(address(market), expectedCost + expectedFee);
        market.placeOrder(amount, price, true);
        vm.stopPrank();

        (uint256 totalCost, uint256 fees) = market.calculateSellProceeds(
            amount
        );

        assertEq(totalCost, expectedCost - expectedFee);
        assertEq(fees, expectedFee);
    }
}
