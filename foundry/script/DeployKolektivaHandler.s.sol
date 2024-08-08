//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {KolektivaHandler} from "../contracts/KolektivaHandler.sol";
import {ScaffoldETHDeploy} from "./DeployHelpers.s.sol";
import {console} from "forge-std/console.sol";

contract DeployKolektivaHandler is ScaffoldETHDeploy {
    function run(
        uint256 deployerPrivateKey,
        address usdtTokenAddress
    ) public returns (KolektivaHandler kolektivaHandler) {
        // uint256 deployerPrivateKey = getDeployerKey();
        vm.startBroadcast(deployerPrivateKey);
        kolektivaHandler = new KolektivaHandler(
            vm.addr(deployerPrivateKey),
            usdtTokenAddress
        );

        console.logString(
            string.concat(
                "Handler deployed at: ",
                vm.toString(address(kolektivaHandler))
            )
        );
        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}
