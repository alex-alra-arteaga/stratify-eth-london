// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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

contract MultiAssetVault is ERC4626 {
    AssetDistribution[] private assets;
    uint8 private constant UNDERLYING_DECIMALS = 18;

    constructor(Asset[] memory _assets) ERC4626() {
        for (uint256 i = 0; i < _assets.length; i++) {
            (bool success, uint8 assetDecimals) = _tryGetAssetDecimals(address(_assets[i].token));
            _assets[i].decimals = success ? assetDecimals : 18;
        }
        assets = _assets;
    }

    function decimals(address token) public view override returns (uint8) {
        return UNDERLYING_DECIMALS;
    }

    function asset(uint256 i) public view override returns (address) {
        return address(assets[i].token);
    }

    function totalAssets(address token) public view returns (uint256) {
        for (uint256 i = 0; i < assets.length; i++) {
            if (address(assets[i].token) == token) {
                return assets[i].balanceOf(address(this));
            }
        }
    }

    /** @dev See {IERC4626-maxDeposit}. */
    function maxDeposit(address) public view virtual returns (uint256) {
        return type(uint256).max;
    }

    /** @dev See {IERC4626-maxMint}. */
    function maxMint(address) public view virtual returns (uint256) {
        return type(uint256).max;
    }

    function maxWithdraw(address owner) public view override returns (uint[] memory _assetsAmounts) {
        uint256 assetsLength = assets.length;

        _assetsAmounts = new uint[](assetsLength);
        for (uint256 i = 0; i < assetsLength; i++) {
            address token = address(assets[i].token);
            uint256 shares = balanceOf(owner);

            _assetsAmounts[i] = shares.mulDiv(totalAssets(token) + 1, totalSupply() + 1, Math.Rounding.Floor);
        }

        uint256 fee = _feeOnRaw(assets, _exitFeeBasisPoints());
        return super.previewWithdraw(assets + fee); // TODO: fix
    }

    /** @dev See {IERC4626-maxRedeem}. */
    function maxRedeem(address owner) public view virtual returns (uint256) {
        return balanceOf(owner);
    }

    /**
     * @dev In this case the `shares` are to represent the amount of assets to preview the deposit.
     */
    function previewDeposit(Asset[] memory _assets) public view override returns (uint256 assetsAmount) {
        uint256 assetsLength = _assets.length;

        for (uint256 i = 0; i < assetsLength; i++) {
            address token = address(assets[i].token);
            uint256 amount = assets[i].amount;

            assetsAmount += amount.mulDiv(totalSupply() + 1, totalAssets(token), Math.Rounding.Floor);
        }
    }

    function previewMint(uint256 shares) public view virtual returns (uint[] memory _assetsAmounts) {
        uint256 assetsLength = assets.length;

        _assetsAmounts = new uint[](assetsLength);
        for (uint256 i = 0; i < assetsLength; i++) {
            address token = address(assets[i].token);

            _assetsAmounts[i] = shares.mulDiv(totalAssets(token) + 1, totalSupply() + 1, Math.Rounding.Ceil);
        }
    }

    function previewWithdraw(uint256 _assets) public view virtual override returns (uint256[] _assetsAmounts) {
        uint256 assetsLength = assets.length;

        _assetsAmounts = new uint256[](assetsLength);
        for (uint256 i = 0; i < assetsLength; i++) {
            address token = address(assets[i].token);

            _assetsAmounts[i] = _assets.mulDiv(totalSupply() + 1, totalAssets(token) + 1, Math.Rounding.Ceil);
        }

        uint256 fee = _feeOnRaw(assets, _exitFeeBasisPoints());
        return super.previewWithdraw(assets + fee);
    }

    function previewRedeem(uint256 shares) public view virtual override returns (uint256) {
        uint256 assets = super.previewRedeem(shares);
        return assets - _feeOnTotal(assets, _exitFeeBasisPoints());
    }

    function deposit(uint256 assets, address receiver) public override returns (uint256) {
        require(assets > 0, "Vault: cannot deposit 0");
        _transfer(msg.sender, address(this), assets);
        return assets;
    }

    function mint(uint256 shares, address receiver) public override returns (uint256) {
        require(shares > 0, "Vault: cannot mint 0");
        _mint(receiver, shares);
        return shares;
    }

    /// @dev Send exit fee to {_exitFeeRecipient}. See {IERC4626-_deposit}.
    function _withdraw(
        address caller,
        address receiver,
        address owner,
        uint256 assets,
        uint256 shares
    ) internal virtual override {
        uint256 fee = _feeOnRaw(assets, _exitFeeBasisPoints());

        super._withdraw(caller, receiver, owner, assets, shares);

        if (fee > 0 && recipient != address(this)) {
            SafeERC20.safeTransfer(IERC20(asset()), owner, fee);
        }
    }

    function _exitFeeBasisPoints() internal view virtual returns (uint256) {
        return withdrawFee;
    }

    function setWithdrawFee(uint96 _withdrawFee) external onlyOwner {
        withdrawFee = _withdrawFee;
    }

    function _decimalsAssetOffset(address _asset) internal view returns (uint256) {
        for (uint256 i = 0; i < assets.length; i++) {
            if (address(assets[i].token) == _asset) {
                return assets[i].decimals;
            }
        }
    }
    
    /// @dev Calculates the fees that should be added to an amount `assets` that does not already include fees.
    /// Used in {IERC4626-mint} and {IERC4626-withdraw} operations.
    function _feeOnRaw(uint256 assets, uint256 feeBasisPoints) private pure returns (uint256) {
        return assets.mulDiv(feeBasisPoints, _BASIS_POINT_SCALE, Math.Rounding.Ceil);
    }
}