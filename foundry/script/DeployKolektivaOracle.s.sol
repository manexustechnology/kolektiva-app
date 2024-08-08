//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {KolektivaOracle} from "../contracts/KolektivaOracle.sol";
import {ScaffoldETHDeploy} from "./DeployHelpers.s.sol";
import {console} from "forge-std/console.sol";

contract DeployKolektivaOracle is ScaffoldETHDeploy {
    function run(
        uint256 deployerPrivateKey
    ) public returns (KolektivaOracle kolektivaOracle) {
        // uint256 deployerPrivateKey = getDeployerKey();
        vm.startBroadcast(deployerPrivateKey);
        kolektivaOracle = new KolektivaOracle(vm.addr(deployerPrivateKey));

        console.logString(
            string.concat(
                "Oracle deployed at: ",
                vm.toString(address(kolektivaOracle))
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
