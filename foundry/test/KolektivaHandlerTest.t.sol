// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {KolektivaHandler} from "../contracts/KolektivaHandler.sol";
import {KolektivaToken} from "../contracts/KolektivaToken.sol";
import {KolektivaMarket} from "../contracts/KolektivaMarket.sol";
import {MockUSDT} from "../contracts/mocks/MockUSDT.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract KolektivaHandlerTest is Test {
    KolektivaHandler handler;
    MockUSDT usdtToken;
    address public owner = makeAddr("owner");
    address public propertyOwner = makeAddr("propertyOwner");
    string public tokenName = "TestToken";
    string public tokenSymbol = "TT";
    string public propertyType = "Property Type";
    string public country = "Country";
    string public state = "State";
    string public city = "City";
    string public location = "Location";
    uint256 totalSupply = 1000;
    uint256 priceSale = 5 * 1e6; // 5 USDT

    function setUp() public {
        usdtToken = new MockUSDT();
        handler = new KolektivaHandler(owner, address(usdtToken));
    }

    function testCreateTokenSuccess() public {
        vm.startPrank(owner);
        handler.createToken(
            tokenName,
            tokenSymbol,
            propertyType,
            country,
            state,
            city,
            location,
            totalSupply,
            priceSale,
            propertyOwner
        );

        address tokenAddress = handler.tokenAddresses("TestToken");
        address marketAddress = handler.marketAddresses("TestToken");

        assertTrue(tokenAddress != address(0));
        assertTrue(marketAddress != address(0));
        assertEq(IERC20(tokenAddress).totalSupply(), totalSupply);
        vm.stopPrank();
    }

    modifier createToken() {
        vm.startPrank(owner);
        handler.createToken(
            tokenName,
            tokenSymbol,
            propertyType,
            country,
            state,
            city,
            location,
            totalSupply,
            priceSale,
            propertyOwner
        );
        vm.stopPrank();
        _;
    }

    function testCreateTokenFailureTokenAlreadyExists() public createToken {
        vm.startPrank(owner);
        vm.expectRevert(KolektivaHandler.TokenAlreadyExist.selector);
        handler.createToken(
            tokenName,
            tokenSymbol,
            propertyType,
            country,
            state,
            city,
            location,
            totalSupply,
            priceSale,
            propertyOwner
        );
        vm.stopPrank();
    }

    function testMintTokensFailureExceedSupply() public createToken {
        vm.startPrank(owner);
        vm.expectRevert(KolektivaToken.ExceedMaxSupply.selector);
        handler.mintTokens("TestToken", address(this), 100);
        vm.stopPrank();
    }

    function testMintTokensFailureTokenDoesNotExist() public {
        vm.startPrank(owner);

        vm.expectRevert(KolektivaHandler.TokenDoesNotExist.selector);
        handler.mintTokens("NonExistentToken", address(this), 100);

        vm.stopPrank();
    }

    function testBurnTokensSuccess() public createToken {
        uint256 burnAmount = 50;

        vm.startPrank(owner);
        handler.burnTokens(tokenName, address(handler), burnAmount);

        KolektivaToken token = KolektivaToken(
            handler.tokenAddresses(tokenName)
        );
        assertEq(token.balanceOf(address(handler)), totalSupply - burnAmount);
        vm.stopPrank();
    }

    function testBurnTokensFailureTokenDoesNotExist() public {
        vm.startPrank(owner);

        vm.expectRevert(KolektivaHandler.TokenDoesNotExist.selector);
        handler.burnTokens("NonExistentToken", owner, 50);

        vm.stopPrank();
    }

    function testRevokeTokenSuccess() public createToken {
        vm.startPrank(owner);
        handler.revokeToken(tokenName);

        assertEq(handler.tokenAddresses(tokenName), address(0));
        assertEq(handler.marketAddresses(tokenName), address(0));
        vm.stopPrank();
    }

    function testRevokeTokenFailureTokenDoesNotExist() public {
        vm.startPrank(owner);

        vm.expectRevert(KolektivaHandler.TokenDoesNotExist.selector);
        handler.revokeToken("NonExistentToken");

        vm.stopPrank();
    }

    function testWithdrawTokenSuccess() public createToken {
        vm.startPrank(owner);

        KolektivaToken token = KolektivaToken(
            handler.tokenAddresses(tokenName)
        );
        handler.withdrawToken(tokenName, 500);

        assertEq(token.balanceOf(owner), 500);
        vm.stopPrank();
    }

    function testWithdrawTokenFailureTokenDoesNotExist() public {
        vm.startPrank(owner);

        vm.expectRevert(KolektivaHandler.TokenDoesNotExist.selector);
        handler.withdrawToken("NonExistentToken", 500);

        vm.stopPrank();
    }

    function testWithdrawTokenFailureInsufficientBalance() public createToken {
        vm.startPrank(owner);

        vm.expectRevert(KolektivaHandler.InsufficientBalance.selector);
        handler.withdrawToken(tokenName, totalSupply + 1);

        vm.stopPrank();
    }

    function testWithdrawFeeSuccess() public createToken {
        usdtToken.mint(address(handler), 1000 * 1e6);

        vm.startPrank(owner);
        handler.withdrawFee(500 * 1e6);

        assertEq(usdtToken.balanceOf(owner), 500 * 1e6);
        vm.stopPrank();
    }

    function testWithdrawFeeFailureInsufficientBalance() public createToken {
        vm.startPrank(owner);

        vm.expectRevert(KolektivaHandler.InsufficientBalance.selector);
        handler.withdrawFee(500 * 1e6);

        vm.stopPrank();
    }

    function testSetFeePercentageSuccess() public createToken {
        vm.startPrank(owner);

        handler.setFeePercentage(tokenName, 10);

        KolektivaMarket market = KolektivaMarket(
            handler.marketAddresses(tokenName)
        );
        assertEq(market.feePercentage(), 10);
        vm.stopPrank();
    }

    function testSetFeePercentageFailureMarketDoesNotExist() public {
        vm.startPrank(owner);

        vm.expectRevert(KolektivaHandler.MarketDoesNotExist.selector);
        handler.setFeePercentage("NonExistentToken", 10);

        vm.stopPrank();
    }

    function testApproveMarketToTransferTokens() public createToken {
        vm.startPrank(owner);

        address marketAddress = handler.marketAddresses(tokenName);
        handler.approveMarketToTransferTokens(tokenName);

        // Retrieve the KolektivaToken contract instance
        KolektivaToken token = KolektivaToken(
            handler.tokenAddresses(tokenName)
        );

        // Check the allowance
        uint256 allowance = token.allowance(address(handler), marketAddress);

        assertEq(
            allowance,
            totalSupply,
            "Allowance should be equal to the total supply"
        );

        vm.stopPrank();
    }

    function testGetTokenNames() public createToken {
        string[] memory tokenNames = handler.getTokenNames();
        assertEq(tokenNames.length, 1);
        assertEq(tokenNames[0], tokenName);
    }

    function testCheckTokenBalanceSuccess() public createToken {
        vm.startPrank(owner);

        uint256 balance = handler.checkTokenBalance(tokenName);
        assertEq(balance, 1000);

        vm.stopPrank();
    }

    function testCheckTokenBalanceFailureTokenDoesNotExist() public {
        vm.startPrank(owner);

        vm.expectRevert(KolektivaHandler.TokenDoesNotExist.selector);
        handler.checkTokenBalance("NonExistentToken");

        vm.stopPrank();
    }
}
