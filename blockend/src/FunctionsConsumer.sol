// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {FunctionsClient} from "@chainlink/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import {ConfirmedOwner} from "@chainlink/src/v0.8/shared/access/ConfirmedOwner.sol";
import {AggregatorV3Interface } from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract StratifyFunctionsConsumer is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    uint32 gasLimit = 300_000; // max one
    bytes32 donID; // arbitrum sepolia: 0x66756e2d617262697472756d2d7365706f6c69612d3100000000000000000000
    string immutable source; // strategy is immutable

    event Response(bytes32 indexed requestId, string character, bytes response, bytes err);

    // Arbitrum functions router -> 0x234a5fb5Bd614a7AA2FfAB244D603abFA0Ac5C5C
    constructor (string memory _source, bytes32 _donID, address _router) FunctionsClient(_router) ConfirmedOwner(msg.sender) {
        donID = _donID;
        source = _source;
    }

    function sendRequest(
        uint64 subscriptionId,
        string[] calldata args
    ) external returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;

        /// @dev If sender is not the Chainlink Automation, fund the request with LINK
        if (msg.sender != owner()) {
            _fundLink();
        }
        req.initializeRequestForInlineJavaScript(source); // Initialize the request with JS code
        /// @dev Strategy shouldn't accept args
        if (args.length > 0) req.setArgs(args); // Set the arguments for the request

        // Send the request and store the request ID
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );
        
        return s_lastRequestId;
    }
    // contract 0xb83e47c2bc239b3bf370bc41e1459a34b41238d0 is called
    // value is amount of LINK
    // Subscription ID: 0x0000000000000000000000000000000000000000000000000000000000000772 | 1906

    // billing -> overestimated gas price 
    function _fundLink() external {
        // 0x169e633a2d1e6c10dd91238ba11c4a708dfef37c * overhead
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
        character = string(response);
        s_lastError = err;

        // Emit an event to log the response
        emit Response(requestId, character, s_lastResponse, s_lastError);
    }

}