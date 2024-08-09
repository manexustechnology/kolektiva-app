// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {KolektivaToken} from "../contracts/KolektivaToken.sol";

contract KolektivaTokenTest is Test {
    KolektivaToken public kolektivaToken;
    address public owner = makeAddr("owner");
    address public user = makeAddr("user");

    string public tokenName = "TestToken";
    string public tokenSymbol = "TT";
    string public propertyType = "Property Type";
    string public province = "Province";
    string public city = "City";
    string public location = "Location";
    uint256 public totalSupply = 1_000_000;

    function setUp() public {
        kolektivaToken = new KolektivaToken(
            tokenName,
            tokenSymbol,
            propertyType,
            province,
            city,
            location,
            totalSupply,
            owner
        );
    }

    function testInitialSupply() public view {
        assertEq(kolektivaToken.totalSupply(), totalSupply);
    }

    function testTransfer() public {
        vm.startPrank(owner);
        bool success = kolektivaToken.transfer(user, 500);
        vm.stopPrank();

        assertEq(success, true);
        assertEq(kolektivaToken.balanceOf(user), 500);
        assertEq(kolektivaToken.balanceOf(owner), totalSupply - 500);
    }

    function testTransferFailCannotBeTransferredYet() public {
        vm.startPrank(owner);
        kolektivaToken.transfer(user, 500);
        vm.stopPrank();

        vm.startPrank(user);
        vm.expectRevert(
            KolektivaToken.KolektivaToken__CannotBeTransferredYet.selector
        );
        kolektivaToken.transfer(owner, 500);
        vm.stopPrank();
    }

    function testApproveAndTransferFrom() public {
        uint256 transferAmount = 300;

        vm.startPrank(owner);
        kolektivaToken.approve(user, transferAmount);
        vm.stopPrank();

        vm.startPrank(user);
        kolektivaToken.transferFrom(owner, user, transferAmount);
        vm.stopPrank();

        assertEq(kolektivaToken.balanceOf(user), transferAmount);
        assertEq(kolektivaToken.balanceOf(owner), totalSupply - transferAmount);
    }

    function testMintFailedExceedMaxSupply() external {
        uint256 mintAmount = 1;

        vm.startPrank(owner);
        vm.expectRevert(
            KolektivaToken.KolektivaToken__ExceedMaxSupply.selector
        );
        kolektivaToken.mint(user, mintAmount);
        vm.stopPrank();
    }

    function testBurnToken() external {
        uint256 burnAmount = 1;

        vm.startPrank(owner);
        kolektivaToken.burn(owner, burnAmount);
        vm.stopPrank();

        assertEq(kolektivaToken.balanceOf(owner), totalSupply - burnAmount);
    }
}
