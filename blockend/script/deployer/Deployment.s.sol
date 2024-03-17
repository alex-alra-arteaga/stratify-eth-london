// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "forge-std/Script.sol";
import {BaseDeployer} from "./BaseDeployer.s.sol";
import {StratifyVault, VaultConf, FunctionsConf, AssetDistribution} from "../../src/StratifyVault.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IUniversalRouter} from "../../src/interfaces/IUniversalRouter.sol";
import {IV3SwapRouter} from "@pancake/router/contracts/interfaces/IV3SwapRouter.sol";
import {IMetaMorpho} from "@metamorpho/interfaces/IMetaMorpho.sol";
import {IMorpho} from "@morpho-blue/interfaces/IMorpho.sol";
import {SOURCE} from "./Constants.sol";

contract StratifyVaultDeploymentScript is Script, BaseDeployer {
    function setUp() public {}

    // RUN with --multi
    function run() public {
        console.log("Starting deployment process");

        // Here we choose to deploy to Mainnet, Testnet or Local
        deployStratifyVaultTestnet();

        console.log("Deployment completed");
    }

    /*
    /// @dev Deploy contracts to mainnet.
    function deployVaultMainnet() external setEnvDeploy(Cycle.Prod) {
        Chains[] memory deployForks = new Chains[](4);

        deployForks[0] = Chains.Etherum;
        deployForks[1] = Chains.Polygon;
        deployForks[3] = Chains.Arbitrum;
        deployForks[4] = Chains.Optimism;

        createDeployMultichain(deployForks);
    }
    */

    function deployStratifyVaultTestnet() public setEnvDeploy(Cycle.Test) {
        Chains[] memory deployForks = new Chains[](6);

        deployForks[0] = Chains.Sepolia;
        deployForks[1] = Chains.ArbitrumSepolia;
        deployForks[2] = Chains.BaseTestnet;
        deployForks[3] = Chains.CeloAlfajores;
        deployForks[4] = Chains.Gnosis;
        deployForks[5] = Chains.Chiliz;

        createDeployMultichain(deployForks);
    }

    /*
    /// @dev Deploy contracts to local.
    function deployStratifyVaultLocal() external setEnvDeploy(Cycle.Dev) {
        Chains[] memory deployForks = new Chains[](3);

        deployForks[0] = Chains.LocalEthereum;
        deployForks[1] = Chains.LocalPolygon;
        deployForks[2] = Chains.LocalArbitrum;

        createDeployMultichain(deployForks);
    }
    */

    /// @dev Deploy contracts to selected chains.
    /// @param deployForks The chains to deploy to.
    /// @param cycle The development cycle to set env variables (dev, test, prod).
    function deployStratifyVaultSelectedChains(
        Chains[] calldata deployForks,
        Cycle cycle
    ) external setEnvDeploy(cycle) {
        createDeployMultichain(deployForks);
    }

    /// @dev Helper to iterate over chains and select fork.
    /// @param deployForks The chains to deploy to.
    function createDeployMultichain(Chains[] memory deployForks) private {
        for (uint256 i; i < deployForks.length;) {
            console2.log(
                "Deploying StratifyVault contracts to chain: ",
                uint(deployForks[i]),
                "\n"
            );

            createSelectFork(deployForks[i]);

            chainDeployStratifyVault(i);

            unchecked {
                ++i;
            }
        }
    }

    /// @dev Function to perform actual deployment.
    function chainDeployStratifyVault(
        uint256 index
    ) private broadcast(deployerPrivateKey) {
        console.log("Starting deployment process in Sepolia network");

        bytes32 donID = index == 0
            ? bytes32(
                0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000 // Eth-sepolia
            )
            : bytes32(
                0x66756e2d617262697472756d2d7365706f6c69612d3100000000000000000000 // Arbitrum-sepolia
            );
        address router = index == 0 // function router
            ? address(0xb83E47C2bC239B3bf370bc41e1459A34b41238D0) // ETH-sepolia
            : address(0x234a5fb5Bd614a7AA2FfAB244D603abFA0Ac5C5C); // rest
        address uniRouter = index == 0 // universal router
            ? 0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD // ETH-sepolia
            : index == 1
            ? 0x4A7b5Da61326A6379179b40d00F57E5bbDC962c2 // Arbitrum-sepolia
            : index == 2
            ? 0x050E797f3625EC8785265e1d9BDd4799b97528A1 // Base-sepolia
            : address(0);
        AssetDistribution[] memory assets;
        if (index == 0 || index == 1) {
            assets = new AssetDistribution[](2);
            assets[0] = AssetDistribution(
                IERC20(0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f), // wBTC
                2e3,
                18
            );
            assets[1] = AssetDistribution(
                IERC20(0xaf88d065e77c8cC2239327C5EDb3A432268e5831), // USDC
                8e3,
                18
            );
        } else if (index == 4) {
            assets = new AssetDistribution[](3);
            assets[0] = AssetDistribution(
                IERC20(0x2F0E755Efe6b58238A67DB420Ff3513Ec1fb31eF), // rETH
                4e3,
                18
            );
            assets[1] = AssetDistribution(
                IERC20(0xaf204776c7245bF4147c2612BF6e5972Ee483701), // sDAI
                3e3,
                18
            );
            assets[2] = AssetDistribution(
                IERC20(0x6C76971f98945AE98dD7d4DFcA8711ebea946eA6), // wsETH
                3e3,
                18
            );
        }
        VaultConf memory vaultConf = VaultConf(
            assets,
            IUniversalRouter(uniRouter), // Arbitrum, Celo, BASE and ETH compatible
            IV3SwapRouter(0x13f4EA83D0bd40E75C8222255bc855a974568Dd4), // Arbitrum, Base and ETH compatible
            IMorpho(0x64c7044050Ba0431252df24fEd4d9635a275CB41), // ETH
            IMetaMorpho(0x75F40875af97710e758330F595A22F8319523A23), // ETH
            "Fidelity Yield Aggregator",
            "FYA"
        );
        FunctionsConf memory functionsConf = FunctionsConf(
            SOURCE,
            donID,
            router,
            40 // subscriptionId
        );
        StratifyVault vault = new StratifyVault(vaultConf, functionsConf);
        console.log("StratifyVault address: ", address(vault));
    }
}
