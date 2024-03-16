// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {AutomationCompatible} from "@chainlink/automation/AutomationCompatible.sol";
import {AutomationCompatibleInterface} from "@chainlink/automation/interfaces/AutomationCompatibleInterface.sol";

contract AutomationConsumer is AutomationCompatibleInterface {
    /**
     * Use an interval in seconds and a timestamp to slow execution of Upkeep
     */
    uint256 public immutable interval;
    uint256 public lastTimeStamp;

    constructor(uint256 updateInterval) {
        interval = updateInterval;
        lastTimeStamp = block.timestamp;
    }

    function checkUpkeep(bytes calldata /* checkData */ )
        external
        view
        virtual
        override
        returns (bool upkeepNeeded, bytes memory)
    {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
        // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
    }

    function performUpkeep(bytes calldata) external override {
        if ((block.timestamp - lastTimeStamp) > interval) {
            lastTimeStamp = block.timestamp;
        }
        sendRequest(0, new string[](0));
    }

    // To be overriden by StratifyVault
    function sendRequest(
        uint64,
        string[] memory
    ) internal virtual returns (bytes32 requestId) {
        return requestId;
    }
}
