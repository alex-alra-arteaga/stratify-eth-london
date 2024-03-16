// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {FunctionsClient} from "@chainlink/functions/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/functions/v1_0_0/libraries/FunctionsRequest.sol";
import {ConfirmedOwner} from "@chainlink/shared/access/ConfirmedOwner.sol";

contract FunctionsConsumer is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    uint32 gasLimit = 300_000; // max one
    bytes32 donID; // arbitrum sepolia: 0x66756e2d617262697472756d2d7365706f6c69612d3100000000000000000000
    uint64 immutable public subscriptionId;
    string source; // holds the strategy, which is immutable

    error UnexpectedRequestID(bytes32 requestId);

    // Arbitrum functions router -> 0x234a5fb5Bd614a7AA2FfAB244D603abFA0Ac5C5C
    constructor(string memory _source, bytes32 _donID, address _router, uint64 _subscriptionId) FunctionsClient(_router) ConfirmedOwner(msg.sender) {
        donID = _donID;
        source = _source;
        subscriptionId = _subscriptionId;
    }

    // contract 0xb83e47c2bc239b3bf370bc41e1459a34b41238d0 is called
    // value is amount of LINK
    // Subscription ID: 0x0000000000000000000000000000000000000000000000000000000000000772 | 1906

    // billing -> overestimated gas price 
    // function _fundLink() external {
    //     // 0x169e633a2d1e6c10dd91238ba11c4a708dfef37c * overhead
    // }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal virtual override _fulfillRequest(requestId, response, err) {
        // Update the contract's state variables with the response and any errors
        s_lastResponse = response;
        s_lastError = err;
    }

    modifier _fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId); // Check if request IDs match
        }
        _;
        // Update the contract's state variables with the response and any errors
        s_lastResponse = response;
        s_lastError = err;
    }

    // temporal hotfix if the source is not correctly set
    function setSource(string memory _source) external {
        source = _source;
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
 
        uint256 temp = value;
        uint256 digits;
 
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
 
        bytes memory buffer = new bytes(digits);
 
        while (value != 0) {
            digits--;
            buffer[digits] = bytes1(uint8(48 + (value % 10)));
            value /= 10;
        }
 
        return string(buffer);
    }

}