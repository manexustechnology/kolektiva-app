//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {ScaffoldETHDeploy} from "./DeployHelpers.s.sol";
import {DeployKolektivaOracle} from "./DeployKolektivaOracle.s.sol";
import {DeployKolektivaHandler} from "./DeployKolektivaHandler.s.sol";
import {DeployMockUSDT} from "./mocks/DeployMockUSDT.s.sol";
import {console} from "forge-std/console.sol";

contract DeployScript is ScaffoldETHDeploy {
    function run() external {
        uint256 gasPrice = tx.gasprice;
        console.log("Using gas price:", gasPrice);

        uint256 deployerPrivateKey = getDeployerKey();
        // vm.startBroadcast(deployerPrivateKey);

        address usdtTokenAddress = getUsdtTokenAddress();

        DeployKolektivaOracle deployKolektivaOracle = new DeployKolektivaOracle();
        vm.allowCheatcodes(address(deployKolektivaOracle));
        deployKolektivaOracle.run(deployerPrivateKey);

        DeployKolektivaHandler deployKolektivaHandler = new DeployKolektivaHandler();
        vm.allowCheatcodes(address(deployKolektivaHandler));
        deployKolektivaHandler.run(deployerPrivateKey, usdtTokenAddress);

        // vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        // exportDeployments();
    }

    function getUsdtTokenAddress() public returns (address) {
        if (block.chainid == 1135) {
            return 0x05D032ac25d322df992303dCa074EE7392C117b9;
        } else if (block.chainid == 4202) {
            return 0x9B4fD469B6236c27190749bFE3227b85c25462D7;
        } else {
            return new DeployMockUSDT().run();
        }
    }

    function test() public {}
}
