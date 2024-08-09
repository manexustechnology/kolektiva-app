//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {MockUSDT} from "../../contracts/mocks/MockUSDT.sol";
import {ScaffoldETHDeploy} from "../DeployHelpers.s.sol";
import {console} from "forge-std/console.sol";

contract DeployMockUSDT is ScaffoldETHDeploy {
    function run() public returns (address mockUSDTAddr) {
        uint256 deployerPrivateKey = getDeployerKey();
        vm.startBroadcast(deployerPrivateKey);
        MockUSDT mockUSDT = new MockUSDT();

        console.logString(
            string.concat(
                "Handler deployed at: ",
                vm.toString(address(mockUSDT))
            )
        );
        mockUSDTAddr = address(mockUSDT);
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
