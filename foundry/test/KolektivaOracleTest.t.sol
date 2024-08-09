// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {KolektivaOracle} from "../contracts/KolektivaOracle.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

contract KolektivaOracleTest is Test {
    KolektivaOracle public oracle;
    address public owner = makeAddr("owner");
    address public user = makeAddr("user");

    uint256 constant PRECISION = 1e6;
    uint256 constant INITIAL_PRICE = 1000 * PRECISION; // $1.000,000_000
    bytes32 public constant CATEGORY_HASH = keccak256("RESIDENTIAL_APARTMENT");

    event CategoryPriceUpdated(
        bytes32 indexed categoryHash,
        uint256 newPrice,
        uint256 updateTime
    );
    event thresholdChanged(uint256 newThreshold);
    event frequencyChanged(uint256 newFrequency);

    function setUp() public {
        oracle = new KolektivaOracle(owner);
    }

    function testInitialState() public view {
        assertEq(oracle.owner(), owner);
        assertEq(oracle.getThreshold(), (10 * oracle.PRICE_PRECISION()) / 100);
        assertEq(oracle.getFrequency(), 1 hours);
    }

    function testUpdateCategoryPrice() public {
        vm.startPrank(owner);
        oracle.updateCategoryPrice(CATEGORY_HASH, INITIAL_PRICE);
        (uint256 price, uint256 timestamp) = oracle.getCategoryPrice(
            CATEGORY_HASH
        );
        assertEq(price, INITIAL_PRICE);
        assertEq(timestamp, block.timestamp);
        vm.stopPrank();
    }

    modifier updateCategoryPrice() {
        vm.startPrank(owner);
        oracle.updateCategoryPrice(CATEGORY_HASH, INITIAL_PRICE);
        vm.stopPrank();
        _;
    }

    function testUpdateCategoryPriceFailFrequencyNotMet()
        public
        updateCategoryPrice
    {
        // Try to update before frequency time has passed
        vm.startPrank(owner);
        vm.expectRevert(
            KolektivaOracle.KolektivaOracle__FrequencyNotMet.selector
        );
        oracle.updateCategoryPrice(CATEGORY_HASH, 1050_000000);
        vm.stopPrank();
    }

    function testUpdateCategoryPriceFailPriceAboveThreshold()
        public
        updateCategoryPrice
    {
        vm.startPrank(owner);
        vm.roll(block.number + 1);
        vm.warp(block.timestamp + 1 hours + 1);

        // Try to update with a price change above threshold (100%)
        uint256 newPrice = 2000 * oracle.PRICE_PRECISION(); // $2.000,000_000
        vm.expectRevert(
            KolektivaOracle.KolektivaOracle__PriceAboveThreshold.selector
        );
        oracle.updateCategoryPrice(CATEGORY_HASH, newPrice); // (100% increase)
        vm.stopPrank();
    }

    function testUpdateCategoryPriceWithNewPrice() public updateCategoryPrice {
        // Try to update with a price change below threshold (10%)
        vm.startPrank(owner);
        vm.roll(block.number + 1);
        vm.warp(block.timestamp + 1 hours + 1);

        uint256 newPrice = 1050 * oracle.PRICE_PRECISION(); // $1.005,000_000
        oracle.updateCategoryPrice(CATEGORY_HASH, newPrice); // $1.050 (5% increase)

        (uint256 price, ) = oracle.getCategoryPrice(CATEGORY_HASH);
        assertEq(price, newPrice);
        vm.stopPrank();
    }

    function testBatchUpdateCategoryPrices() public {
        bytes32[] memory hashes = new bytes32[](2);
        hashes[0] = CATEGORY_HASH;
        hashes[1] = keccak256("COMMERCIAL_OFFICE");

        uint256[] memory prices = new uint256[](2);
        prices[0] = 1000 * PRECISION;
        prices[1] = 1500 * PRECISION;

        vm.startPrank(owner);
        oracle.batchUpdateCategoryPrices(hashes, prices);

        (uint256 price1, ) = oracle.getCategoryPrice(hashes[0]);
        (uint256 price2, ) = oracle.getCategoryPrice(hashes[1]);

        assertEq(price1, 1000 * oracle.PRICE_PRECISION());
        assertEq(price2, 1500 * oracle.PRICE_PRECISION());
        vm.stopPrank();
    }

    function testGetPropertyValue() public {
        vm.startPrank(owner);
        oracle.updateCategoryPrice(CATEGORY_HASH, 1000);
        vm.stopPrank();

        uint256 totalArea = 100; // 100 sqm
        uint256 expectedValue = 1000 * totalArea; // $100,000

        assertEq(
            oracle.getPropertyValue(CATEGORY_HASH, totalArea),
            expectedValue
        );
    }

    function testsetThreshold() public {
        vm.startPrank(owner);
        uint256 newThreshold = (15 * oracle.PRICE_PRECISION()) / 100; // 15%
        oracle.setThreshold(newThreshold);
        assertEq(oracle.getThreshold(), newThreshold);
        vm.stopPrank();
    }

    function testsetFrequency() public {
        vm.startPrank(owner);
        uint256 newFrequency = 2 hours;
        oracle.setFrequency(newFrequency);
        assertEq(oracle.getFrequency(), newFrequency);
        vm.stopPrank();
    }

    function testPauseUnpause() public {
        vm.startPrank(owner);
        oracle.pause();
        assertTrue(oracle.paused());

        vm.expectRevert(Pausable.EnforcedPause.selector);
        oracle.updateCategoryPrice(CATEGORY_HASH, INITIAL_PRICE);

        oracle.unpause();
        assertFalse(oracle.paused());

        oracle.updateCategoryPrice(CATEGORY_HASH, INITIAL_PRICE);
        (uint256 price, ) = oracle.getCategoryPrice(CATEGORY_HASH);
        assertEq(price, INITIAL_PRICE);
        vm.stopPrank();
    }

    function testOnlyOwnerFunctions() public {
        bytes memory revertMsg = abi.encodeWithSelector(
            Ownable.OwnableUnauthorizedAccount.selector,
            address(user)
        );

        vm.startPrank(user);
        vm.expectRevert(revertMsg);
        oracle.updateCategoryPrice(CATEGORY_HASH, 1000 * PRECISION);

        vm.expectRevert(revertMsg);
        oracle.setThreshold((15 * PRECISION) / 100);

        vm.expectRevert(revertMsg);
        oracle.setFrequency(2 hours);

        vm.expectRevert(revertMsg);
        oracle.pause();
        vm.stopPrank();
    }
}
