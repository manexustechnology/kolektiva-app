// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {KolektivaToken} from "../contracts/KolektivaToken.sol";
import {KolektivaMarket} from "../contracts/KolektivaMarket.sol";
import {MockUSDT} from "../contracts/mocks/MockUSDT.sol";

contract KolektivaMarketTest is Test {
    KolektivaMarket public market;
    KolektivaToken public kolektivaToken;
    MockUSDT public usdtToken;

    address public handler = makeAddr("handler");
    address public propertyOwner = makeAddr("propertyOwner");
    address public buyer = makeAddr("buyer");
    address public seller = makeAddr("seller");

    string public tokenName = "TestToken";
    string public tokenSymbol = "TT";
    string public propertyType = "Property Type";
    string public province = "Province";
    string public city = "City";
    string public location = "Location";

    uint256 private constant SALE_PRICE = 1e6; // Example price, adjust as needed
    uint128 private constant FEE_PERCENTAGE = 500; // 5%
    uint128 private constant FEE_PRECISION = 1e4; // 5%
    uint256 private constant INITIAL_SUPPLY = 1000; // 1000 tokens

    function setUp() public {
        vm.startPrank(handler);
        // Deploy mock tokens
        kolektivaToken = new KolektivaToken(
            tokenName,
            tokenSymbol,
            propertyType,
            province,
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
        assertEq(usdtToken.balanceOf(address(market)), totalCost); // Fee received by the market
        assertEq(usdtToken.balanceOf(handler), fee); // Handler received total cost plus fee
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
        vm.expectRevert(
            KolektivaMarket.KolektivaMarket__InsufficientSupply.selector
        );
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
        vm.expectRevert(
            KolektivaMarket.KolektivaMarket__InitialOfferingOngoing.selector
        );
        market.placeBuyOrder(amount, price);
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
        vm.expectRevert(
            KolektivaMarket.KolektivaMarket__InitialOfferingOngoing.selector
        );
        market.placeSellOrder(amount, price);
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

        // console.log("before");
        // console.log(usdtToken.balanceOf(buyer));
        // console.log(usdtToken.balanceOf(handler));
        // console.log(usdtToken.balanceOf(address(market)));

        // Execute the buy order
        vm.startPrank(buyer);
        usdtToken.approve(address(market), totalCost + fee);
        market.placeBuyOrder(amount, price);
        vm.stopPrank();

        KolektivaMarket.Order memory order = market.getBuyOrderByIndex(0);
        assertEq(order.trader, buyer);
        assertEq(order.amount, amount);
        assertEq(order.price, price);

        // console.log("after");
        // console.log(usdtToken.balanceOf(buyer));
        // console.log(usdtToken.balanceOf(handler));
        // console.log(usdtToken.balanceOf(address(market)));

        assertEq(usdtToken.balanceOf(handler), fee);
        assertEq(usdtToken.balanceOf(address(market)), totalCost);

        assertEq(market.getBuyOrdersCount(), 1);
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

        // console.log("before");
        // console.log(usdtToken.balanceOf(seller));
        // console.log(usdtToken.balanceOf(handler));
        // console.log(kolektivaToken.balanceOf(address(market)));

        vm.startPrank(seller);
        kolektivaToken.approve(address(market), amount);
        usdtToken.approve(address(market), fee);
        market.placeSellOrder(amount, price);
        vm.stopPrank();

        KolektivaMarket.Order memory order = market.getSellOrderByIndex(0);
        assertEq(order.trader, seller);
        assertEq(order.amount, amount);
        assertEq(order.price, price);

        // console.log("after");
        // console.log(usdtToken.balanceOf(seller));
        // console.log(usdtToken.balanceOf(handler));
        // console.log(kolektivaToken.balanceOf(address(market)));

        assertEq(usdtToken.balanceOf(handler), fee);
        assertEq(kolektivaToken.balanceOf(address(market)), amount);

        assertEq(market.getSellOrdersCount(), 1);
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
        market.placeSellOrder(sellAmount, sellPrice);
        vm.stopPrank();

        vm.startPrank(buyer);
        usdtToken.approve(address(market), buyCost + buyFee);
        market.instantBuy(buyAmount);
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
        vm.expectRevert(
            KolektivaMarket.KolektivaMarket__InsufficientSupply.selector
        );
        market.instantBuy(buyAmount);
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
        market.placeBuyOrder(amount, price);
        market.cancelBuyOrder(0); // Assuming it's the first order
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
        market.placeSellOrder(amount, price);
        market.cancelSellOrder(0); // Assuming it's the first order
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
        market.placeBuyOrder(amount, price);
        vm.stopPrank();

        vm.prank(address(0x789)); // Different address
        vm.expectRevert(KolektivaMarket.KolektivaMarket__Unauthorized.selector);
        market.cancelBuyOrder(0);
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
        market.placeSellOrder(amount, price);
        vm.stopPrank();

        vm.prank(address(0x789)); // Different address
        vm.expectRevert(KolektivaMarket.KolektivaMarket__Unauthorized.selector);
        market.cancelSellOrder(0);
    }

    function testSetFeePercentage() public {
        uint256 newFeePercentage = 200; // 2%

        vm.prank(handler);
        market.setFeePercentage(newFeePercentage);

        assertEq(market.feePercentage(), newFeePercentage);
    }

    function testSetFeePercentageInvalidAmount() public {
        uint256 newFeePercentage = 2000; // Greater than 1000

        vm.prank(handler);
        vm.expectRevert(
            KolektivaMarket.KolektivaMarket__InvalidAmount.selector
        );
        market.setFeePercentage(newFeePercentage);
    }

    function testWithdrawPropertyOwnerFunds() public {
        uint256 amount = 100; // Example amount
        uint256 totalCost = (amount * SALE_PRICE);
        uint256 fee = (totalCost * FEE_PERCENTAGE) / FEE_PRECISION;

        // Mint USDT to buyer
        vm.startPrank(handler);
        usdtToken.mint(buyer, totalCost + fee);
        vm.stopPrank();

        // Execute the buy
        vm.startPrank(buyer);
        usdtToken.approve(address(market), totalCost + fee);
        market.initialOfferingBuy(amount);
        vm.stopPrank();

        assertEq(totalCost, market.propertyOwnerBalance());

        vm.startPrank(handler);
        market.endInitialOffering();
        vm.stopPrank();

        // Now perform the withdraw
        vm.startPrank(propertyOwner);
        market.withdrawPropertyOwnerFunds();
        vm.stopPrank();

        // Assertions
        assertEq(usdtToken.balanceOf(propertyOwner), totalCost);
        assertEq(market.propertyOwnerBalance(), 0); // Should be reset to 0 after withdrawal
    }

    function testWithdrawPropertyOwnerFundsNoFunds() public endInitialOffering {
        vm.prank(propertyOwner);
        vm.expectRevert(
            KolektivaMarket.KolektivaMarket__NoFundsToWithdraw.selector
        );
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
        market.placeSellOrder(amount, price);
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
        market.placeBuyOrder(amount, price);
        vm.stopPrank();

        (uint256 totalCost, uint256 fees) = market.calculateSellProceeds(
            amount
        );

        assertEq(totalCost, expectedCost - expectedFee);
        assertEq(fees, expectedFee);
    }
}
