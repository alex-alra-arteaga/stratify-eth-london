// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {ERC20, IERC20, IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC4626} from "@openzeppelin/contracts/interfaces/IERC4626.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

struct AssetDistribution {
    IERC20 token;
    uint256 share; // In basis points, 1e4 -> 100%
    uint256 decimals;
}

struct Asset {
    IERC20 token;
    uint256 amount;
    uint256 decimals;
}

contract MultiAssetVault is ERC20 {
    using Math for uint256;

    AssetDistribution[] internal assets;
    uint8 private constant UNDERLYING_DECIMALS = 18;
    uint96 private constant _BASIS_POINT_SCALE = 1e4;
    uint96 public withdrawFee = 50; // 0.5%

    /**
     * @dev Attempted to deposit more assets than the max amount for `receiver`.
     */
    error ERC4626ExceededMaxDeposit(address receiver, uint256 assets, uint256 max);

    /**
     * @dev Attempted to mint more shares than the max amount for `receiver`.
     */
    error ERC4626ExceededMaxMint(address receiver, uint256 shares, uint256 max);

    /**
     * @dev Attempted to withdraw more assets than the max amount for `receiver`.
     */
    error ERC4626ExceededMaxWithdraw(address owner, uint256 assets, uint256[] max);

    /**
     * @dev Attempted to redeem more shares than the max amount for `receiver`.
     */
    error ERC4626ExceededMaxRedeem(address owner, uint256 shares, uint256 max);

    error InvalidShares(uint256 sumatory);

    error InvalidCallType(uint8 callType);


    constructor(AssetDistribution[] memory _assets, string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        for (uint256 i = 0; i < _assets.length; i++) {
            //(bool success, uint8 assetDecimals) = _tryGetAssetDecimals(_assets[i].token);
            bool success = false;
            uint8 assetDecimals = 18;
            _assets[i].decimals = success ? assetDecimals : 18;
            assets.push(_assets[i]);
        }
    }

    /**
     * @dev Attempts to fetch the asset decimals. A return value of false indicates that the attempt failed in some way.
     */
    function _tryGetAssetDecimals(IERC20 asset_) private view returns (bool, uint8) {
        (bool success, bytes memory encodedDecimals) = address(asset_).staticcall(
            abi.encodeCall(IERC20Metadata.decimals, ())
        );
        if (success && encodedDecimals.length >= 32) {
            uint256 returnedDecimals = abi.decode(encodedDecimals, (uint256));
            if (returnedDecimals <= type(uint8).max) {
                return (true, uint8(returnedDecimals));
            }
        }
        return (false, 0);
    }

    function decimals(address) public pure returns (uint8) {
        return UNDERLYING_DECIMALS;
    }

    function asset(uint256 i) public view returns (address) {
        return address(assets[i].token);
    }

    function totalAssets(address token) public view returns (uint256) {
        for (uint256 i = 0; i < assets.length; i++) {
            if (address(assets[i].token) == token) {
                return assets[i].token.balanceOf(address(this));
            }
        }
        return 0;
    }

    function convertToShares(uint256 _assets, address token) public view returns (uint256) {
        return _convertToShares(_assets, Math.Rounding.Floor, token);
    }

    function convertToAssets(uint256 shares, address token) public view returns (uint256) {
        return _convertToAssets(shares, Math.Rounding.Floor, token);
    }

    /** @dev See {IERC4626-maxDeposit}. */
    function maxDeposit(address) public pure returns (uint256) {
        return type(uint256).max;
    }

    /** @dev See {IERC4626-maxMint}. */
    function maxMint(address) public pure returns (uint256) {
        return type(uint256).max;
    }

    function maxWithdraw(address owner) public view returns (uint[] memory _assetsAmounts) {
        uint256 assetsLength = assets.length;

        _assetsAmounts = new uint[](assetsLength);
        for (uint256 i = 0; i < assetsLength; i++) {
            address token = address(assets[i].token);
            uint256 shares = balanceOf(owner);

            _assetsAmounts[i] = _convertToAssets(shares, Math.Rounding.Floor, token);
        }

        // uint256 fee = _feeOnRaw(assets, _exitFeeBasisPoints());
        // return super.previewWithdraw(assets + fee);
    }

    /** @dev See {IERC4626-maxRedeem}. */
    function maxRedeem(address owner) public view returns (uint256) {
        return balanceOf(owner);
    }

    /**
     * @dev See {IERC4626-previewDeposit}.
     */
    function previewDeposit(uint256[] memory _assets) public view returns (uint256 shares) {
        uint256 assetsLength = _assets.length;

        for (uint256 i = 0; i < assetsLength; i++) {
            address token = address(assets[i].token);
            uint256 amount = _assets[i];

            shares += _convertToShares(amount, Math.Rounding.Floor, token);
        }
    }

    function previewMint(uint256 shares) public view returns (uint256[] memory _assetsAmounts) {
        uint256 assetsLength = assets.length;

        _assetsAmounts = new uint256[](assetsLength);
        for (uint256 i = 0; i < assetsLength; i++) {
            address token = address(assets[i].token);

            _assetsAmounts[i] = _convertToAssets(shares, Math.Rounding.Ceil, token);
        }
    }

    function previewWithdraw(uint256[] memory _assets) public view returns (uint256 shares) {
        uint256 assetsLength = assets.length;

        for (uint256 i = 0; i < assetsLength; i++) {
            address token = address(assets[i].token);
            uint256 amount = _assets[i];

            shares += _convertToShares(amount, Math.Rounding.Ceil, token);
        }

        // uint256 fee = _feeOnRaw(assets, _exitFeeBasisPoints());
        // return super.previewWithdraw(assets + fee);
    }

    function previewRedeem(uint256 shares) public view returns (uint256[] memory _assetsAmounts) {
        uint256 assetsLength = assets.length;

        _assetsAmounts = new uint256[](assetsLength);
        for (uint256 i = 0; i < assetsLength; i++) {
            address token = address(assets[i].token);

            _assetsAmounts[i] = _convertToAssets(shares, Math.Rounding.Floor, token);
        }
    }

    function deposit(uint256[] memory _assets, address receiver) public returns (uint256) {
        uint256 maxAssets = maxDeposit(receiver);
        for (uint256 i = 0; i < _assets.length; i++) {
            if (_assets[i] > maxAssets) {
                revert ERC4626ExceededMaxDeposit(receiver, _assets[i], maxAssets);
            }
        }

        uint256 shares = previewDeposit(_assets);
        _deposit(_msgSender(), receiver, _assets, shares);

        return shares;
    }

    function mint(uint256 shares, address receiver) public returns (uint256[] memory) {
        uint256 maxShares = maxMint(receiver);
        if (shares > maxShares) {
            revert ERC4626ExceededMaxMint(receiver, shares, maxShares);
        }

        uint256[] memory _assets = previewMint(shares);
        _deposit(_msgSender(), receiver, _assets, shares);

        return _assets;
    }

    function withdraw(uint256[] memory _assets, address receiver, address owner) public returns (uint256) {
        uint256[] memory maxAssets = maxWithdraw(receiver);
        for (uint256 i = 0; i < _assets.length; i++) {
            if (_assets[i] > maxAssets[i]) {
                revert ERC4626ExceededMaxWithdraw(owner, _assets[i], maxAssets);
            }
        }

        uint256 shares = previewWithdraw(_assets);
        _withdraw(_msgSender(), receiver, owner, _assets, shares);

        return shares;
    }

    function redeem(uint256 shares, address receiver, address owner) public returns (uint256[] memory) {
        uint256 maxShares = maxRedeem(owner);
        if (shares > maxShares) {
            revert ERC4626ExceededMaxRedeem(owner, shares, maxShares);
        }

        uint256[] memory _assets = previewRedeem(shares);
        _withdraw(_msgSender(), receiver, owner, _assets, shares);

        return _assets;
    }

    function _convertToShares(uint256 _assets, Math.Rounding rounding, address token) internal view returns (uint256) {
        return _assets.mulDiv(totalSupply() + 1, totalAssets(token) + 1, rounding);
    }

    function _convertToAssets(uint256 shares, Math.Rounding rounding, address token) internal view returns (uint256) {
        return shares.mulDiv(totalAssets(token) + 1, totalSupply() + 1, rounding);
    }

    function _deposit(address caller, address receiver, uint256[] memory _assets, uint256 shares) internal {
        // If _asset is ERC-777, `transferFrom` can trigger a reentrancy BEFORE the transfer happens through the
        // `tokensToSend` hook. On the other hand, the `tokenReceived` hook, that is triggered after the transfer,
        // calls the vault, which is assumed not malicious.
        //
        // Conclusion: we need to do the transfer before we mint so that any reentrancy would happen before the
        // assets are transferred and before the shares are minted, which is a valid state.
        // slither-disable-next-line reentrancy-no-eth
        for (uint256 i; i < _assets.length; ++i) {
            SafeERC20.safeTransferFrom(assets[i].token, caller, address(this), _assets[i]);
        }
        _mint(receiver, shares);
    }

    /// @dev Send exit fee to {_exitFeeRecipient}. See {IERC4626-_deposit}.
    function _withdraw(
        address caller,
        address receiver,
        address owner,
        uint256[] memory _assets,
        uint256 shares
    ) internal {
        if (caller != owner) {
            _spendAllowance(owner, caller, shares);
        }

        // If _asset is ERC-777, `transfer` can trigger a reentrancy AFTER the transfer happens through the
        // `tokensReceived` hook. On the other hand, the `tokensToSend` hook, that is triggered before the transfer,
        // calls the vault, which is assumed not malicious.
        //
        // Conclusion: we need to do the transfer after the burn so that any reentrancy would happen after the
        // shares are burned and after the assets are transferred, which is a valid state.
        _burn(owner, shares);
        for (uint256 i; i < _assets.length; ++i) {
            SafeERC20.safeTransfer(assets[i].token, receiver, _assets[i]);
        }

        // if (fee > 0 && recipient != address(this)) {
        //     SafeERC20.safeTransfer(IERC20(asset()), owner, fee);
        // }
    }

    function _exitFeeBasisPoints() internal view  returns (uint256) {
        return withdrawFee;
    }

    function _decimalsAssetOffset(address _asset) internal view returns (uint256) {
        for (uint256 i = 0; i < assets.length; i++) {
            if (address(assets[i].token) == _asset) {
                return assets[i].decimals;
            }
        }
        return 0;
    }
    
    /// @dev Calculates the fees that should be added to an amount `assets` that does not already include fees.
    /// Used in {IERC4626-mint} and {IERC4626-withdraw} operations.
    function _feeOnRaw(uint256 _assets, uint256 feeBasisPoints) private pure returns (uint256) {
        return _assets.mulDiv(feeBasisPoints, _BASIS_POINT_SCALE, Math.Rounding.Ceil);
    }
}