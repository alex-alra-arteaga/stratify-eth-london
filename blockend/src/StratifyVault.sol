// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {MultiAssetVault, AssetDistribution, Asset, ERC20} from "./MultiAssetVault.sol";
import {FunctionsConsumer, FunctionsRequest} from "./consumers/Functions.sol";
import {AutomationConsumer} from "./consumers/Automation.sol";
import {IUniversalRouter} from "./interfaces/IUniversalRouter.sol";
import {IV3SwapRouter} from "@pancake/router/contracts/interfaces/IV3SwapRouter.sol";
import {IMetaMorpho} from "@metamorpho/interfaces/IMetaMorpho.sol";
import {IMorpho, MarketParams} from "@morpho-blue/interfaces/IMorpho.sol";

struct VaultConf {
    AssetDistribution[] assets;
    IUniversalRouter uniRouter;
    IV3SwapRouter pancakeRouter;
    IMorpho morpho;
    IMetaMorpho metamorpho;
    string name;
    string symbol;
}

struct FunctionsConf {
    string source;
    bytes32 donID;
    address router;
    uint64 subscriptionId;
}

enum CallType {
    UniRouter, // Uniswap
    MorphoBorrow,
    MorphoRepay,
    Pancake // Pancake
}

contract StratifyVault is
    MultiAssetVault,
    FunctionsConsumer,
    AutomationConsumer
{
    using FunctionsRequest for FunctionsRequest.Request;

    IUniversalRouter private uniRouter;
    IV3SwapRouter pancakeRouter;
    IMorpho morpho;
    IMetaMorpho metamorpho;

    constructor(
        VaultConf memory _vault,
        FunctionsConf memory _functions
    )
        MultiAssetVault(_vault.assets, _vault.name, _vault.symbol)
        FunctionsConsumer(
            _functions.source,
            _functions.donID,
            _functions.router,
            _functions.subscriptionId
        )
        AutomationConsumer(5 minutes)
    {
        uniRouter = _vault.uniRouter;
        pancakeRouter = _vault.pancakeRouter;
        morpho = _vault.morpho;
        metamorpho = _vault.metamorpho;
    }

    function sendRequest(
        uint64,
        string[] memory
    ) internal override returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        string[] memory args;

        /// @dev If sender is not the Chainlink Automation, fund the request with LINK
        // if (msg.sender != owner()) {
        //     _fundLink();
        // }
        req.initializeRequestForInlineJavaScript(source); // Initialize the request with JS code

        args = _shareToStrings();

        req.setArgs(args); // Set the arguments for the request

        // Send the request and store the request ID
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        return s_lastRequestId;
    }

    /// @dev Important, there is a modifier abstraction
    /// @dev No balances should be kept in this contract
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override _fulfillRequest(requestId, response, err) {
        _errorHandling();

        (CallType call, uint256[] memory newTokenShares) = abi.decode(response, (CallType, uint256[]));

        if (call == CallType.UniRouter) {
            _execUniswap(response);
        } else if (call == CallType.MorphoBorrow) {
            _execMorphoBorrow(response);
        } else if (call == CallType.MorphoRepay) {
            _execMorphoRepay(response);
        } else if (call == CallType.Pancake) {
            _execPancake(response);
        } else {
            revert InvalidCallType(uint8(call));
        }

        _setTokensShare(newTokenShares);
    }

    function _execUniswap(bytes memory response) private {
        (
            ,
            ,
            bytes memory commands,
            bytes[] memory inputs,
            uint256 deadline,
        ) = abi.decode(
                response,
                (CallType, uint256[], bytes, bytes[], uint256, uint256[])
            );

        uniRouter.execute(commands, inputs, deadline);
    }

    function _execPancake(bytes memory response) private {
        (,,IV3SwapRouter.ExactOutputSingleParams memory params) = abi.decode(
            response,
            (CallType, uint256[], IV3SwapRouter.ExactOutputSingleParams)
        );

        pancakeRouter.exactOutputSingle(params);
    }

    function _execMorphoBorrow(bytes memory response) private {
        (
            ,
            ,
            MarketParams memory marketParams,
            uint256 assets,
            uint256 shares,
            address onBehalf,
            address receiver,
            bytes memory data
        ) = abi.decode(
                response,
                (
                    CallType,
                    uint256[],
                    MarketParams,
                    uint256,
                    uint256,
                    address,
                    address,
                    bytes
                )
            );

        morpho.supplyCollateral(marketParams, assets, onBehalf, data);
        morpho.borrow(marketParams, assets, shares, onBehalf, receiver);
    }

    function _execMorphoRepay(bytes memory response) private {
        (
            ,
            ,
            MarketParams memory marketParams,
            uint256 assets,
            uint256 shares,
            address onBehalf,
            address receiver,
            bytes memory data
        ) = abi.decode(
                response,
                (
                    CallType,
                    uint256[],
                    MarketParams,
                    uint256,
                    uint256,
                    address,
                    address,
                    bytes
                )
            );

        morpho.repay(marketParams, assets, shares, onBehalf, data);
        morpho.withdrawCollateral(marketParams, assets, onBehalf, receiver);
    }

    function _shareToStrings() private view returns (string[] memory) {
        string[] memory shares = new string[](assets.length);

        for (uint256 i = 0; i < assets.length; i++) {
            shares[i] = _toString(assets[i].share);
        }

        return shares;
    }

    function _setTokensShare(uint256[] memory newTokenShares) private {
        uint256 sum;
        uint256 assetsLength = assets.length;

        for (uint256 i = 0; i < assetsLength; i++) {
            assets[i].share = newTokenShares[i];
            sum += newTokenShares[i];
        }

        if (sum != 1e4) revert InvalidShares(sum);
    }

    function _errorHandling() internal {}
}
