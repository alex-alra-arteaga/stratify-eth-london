// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {MultiAssetVault} from "./MultiAssetVault.sol";

contract StratifyVault is MultiAssetVault {
    constructor(Asset[] memory _assets, address _owner) MultiAssetVault(_assets) {}
}