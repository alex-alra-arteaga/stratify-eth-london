# Stratify - Passive Asset Management

Our product is about 2 main innovations:
- The possibility of democratizing investment vehicles.
- These investment vehicles are not the simple vehicles that we are all used to, but rather one that has no counterparty risk, is fully automatable with freedom of indicators and with very low operational costs.

The vehicle consists of a `StratifyVault` which rebalances its portfolio based on an automatic and immutable strategy.
Anyone can create their own 'StratifyVault' with the assets and strategy they like.

All of these primitives and innovations are possible thanks to the latest advances in blockchain networks, tokenization of real assets and decentralized oracles.

An example of a strategy would be an initial portfolio of 40% in dollars, 30% in T-Bills, 20% in gold and 10% in Bitcoin.
For each movement in global M2 liquidity, interest rates, employment data and even technical analysis indicators such as the 200 EMAs, you can decide to have greater exposure to any of the named assets.

The user can decide when to invest and disinvest at any time, they will only have to pay a percentage of exit or profits stipulated by the creator of the strategy. Which can be created by Blackrock itself, or yourself.

The main problem it addresses is the lack of immutable on-chain asset management products; More than 99% of AUM is held in custody of certain private keys that are manually rebalanced.

We also plan to be friendly to all types of users. Directly on our marketplace, also with an SDK to help quants create their own strategies and technical support for CEX to integrate this financial product.

## Table of Contents

- [Repository Structure](#repository-structure)
- [Bounties](#bounties)
  - [Worldcoin](#worldcoin)
  - [Dynamic Integration: Simplifying DeFi/Web3 Interactions](#dynamic-integration-simplifying-defiweb3-interactions)
  - [Chainlink: Functions & Automation](#chainlink-functions--automation)
  - [Arbitrum: Scaling DeFi](#arbitrum-scaling-defi)
  - [Base](#base)
  - [Circle](#circle)
  - [Gnosis](#gnosis)
  - [UniSwap](#uniswap)
  - [Morpho](#morpho)
- [Address Deployment](#address-deployment)
- [Usage](#usage)
  - [Installation](#installation)
  - [Build](#build)
  - [Deploy & Verification](#deploy--verification)
  - [Help](#help)

## Repository Structure

# Bounties

## WORLDCOIN

- Track: [World ID](https://worldcoin.org/world-id)

### Overview

Our platform leverages **Worldcoin's World ID** technology to ensure a human-centric and bot-resistant decentralized asset management environment. By integrating World ID, we aim to mitigate the risks of sybil attacks and ensure that every participant in our permissionless market is a verified human. This approach not only enhances the security of our platform but also aligns with our vision for the future of DeFi—where decentralized identities empower human-to-human interaction without governmental oversight.

### Why World ID?

- **Sybil Attack Prevention**: Central to maintaining the integrity of our permissionless market.
- **Human-Centric**: Guarantees real human interaction within our platform, enhancing trust and security.
- **Decentralized Identity**: Offers a non-governmental solution to identity verification, preserving user privacy and autonomy.

### Requirement for Strategy Creation

To participate in strategy creation on our platform, users are required to have a verified **World ID**. This ensures that each strategy is contributed by a unique individual, fostering a diverse and equitable trading environment.

### Concluding Thoughts

Integrating World ID is a crucial step towards our goal of creating a safer, more inclusive, and bot-resistant decentralized asset management platform. We believe that the future of DeFi must include robust solutions for identity verification, and World ID is poised to play a pivotal role in this evolution.

---------------------------------------------------------------------------------------------------------------------------------------------------------------

## Dynamic Integration: Simplifying DeFi/Web3 Interactions

- **Tracks**: Best crypto enabled app,  Integration magic  &&  Best onboarding UX

At Stratify, we believe the future of DeFi and Web3 lies in seamlessly abstracted interactions, where users can engage with digital assets and contracts without needing to understand the underlying complexities. To this end, we've integrated Dynamic's embedded wallets, setting a new standard for user-friendly crypto interactions.

### Driving Web3 Like a Car

Imagine driving a car. You don't need to know the intricacies of how the engine works, the specifics of the transmission, or the details of the suspension system to get from point A to point B. You simply get in, start the car, and drive. This is the level of simplicity and abstraction we aim for in the world of DeFi and Web3.

With Dynamic's embedded wallets, users can interact with our platform as easily as driving a car, without needing to understand the "mechanical" aspects of blockchain technology. This abstraction is crucial for bringing DeFi to the mainstream, aligning perfectly with Dynamic's value proposition of making crypto-native tools accessible to all.

### Integration Highlights

- **Embedded Wallets**: Seamlessly integrated within Stratify, offering a frictionless user experience.
- **Account Abstraction**: Users manage their digital assets without needing to grasp the technicalities of wallet management.
- **Access Control**: Enhanced security and user access management, ensuring a safe and trustable environment.
- **Simplified Onboarding**: Quick and intuitive user onboarding, bridging the gap for those new to the crypto space.

### Reference Implementation

To see how we've implemented Dynamic's features within our platform, visit our GitHub:

- [Embedded Wallet Integration]("")

We're committed to enhancing our platform's usability and accessibility, making DeFi and Web3 as easy as driving a car. For more details on our integration and future updates, stay tuned!

---------------------------------------------------------------------------------------------------------------------------------------------------------------

## Chainlink: Functions && Automation

- **Tracks**:  Connect the world with Chainlink

Chainlink is without a doubt the most decentralized and secure oracle network and it seems it will be for the medium term without a doubt.
Even that it's fees are high, we are using it for the most critical parts of our platform, such as the rebalancing of the strategies and the on-chain indicators and security is worth the cost.
We have been already in talks with Serg

---------------------------------------------------------------------------------------------------------------------------------------------------------------

## Arbitrum: Scaling DeFi

- **Tracks**: Most Original && Qualifying Arbitrum Submissions

### Centralized fair sequencing

- Arbitrum is the most growing ETH Rollup, and in our opinion is a must for DeFi protocols due to its deep liquidity pockets and low fees (now even more with EIP-4844).

- The fact that the Arbitrum sequencer is centralized and fair in a way where the first transaction that comes in is the first transaction that gets processed it's crucial for the Stratify platform. In Stratify being onchaih asset managers with public strategies, avoiding frontrunning is a must. We really really on the core desing of Arbitrum and we thing that along with the Dencun upgrade, with that lower fees fully decentralized defi can multiply by several times the TAUM of the industry.

Once Arbitrum turns to a decentralized sequencer we'll pivot to MEV resistant protocols.
We are here to stay and we are also looking for grant funding, which would suit us perfectly since it's compatible in the short and long term.

---------------------------------------------------------------------------------------------------------------------------------------------------------------

## Base

- **Tracks**: Build an Onchain Product

Base Protocol is supported abstracted via our embedded wallets integration, users don't have to know the specifics of the Base Protocol to interact with it. They can simply use our platform to access the Base Protocol and its features, making it easier for users to engage with the protocol and its assets.


---------------------------------------------------------------------------------------------------------------------------------------------------------------

## Circle

- **Tracks**:  Best Application for Crypto Capital Markets, Best Application for Dollar Access && Best Applications for Emerging Use Cases with Circle Products

Our platform accepts USDC by default, since its the most adopted stablecoin in Europe and Northern America.
Through our payment abstraction users funds are distributed from the USDC to the underlying assets in the strategy.
Also at the moment of the exit, the funds are distributed back to the USDC through a DeFi aggregators, which looks for the most slippage efficient path.

---------------------------------------------------------------------------------------------------------------------------------------------------------------

## Gnosis

- **Track**: Yield Bearing Tokens Integration with Gnosis Pay

## Optimize Your Yield with Our Strategy/Vault on Gnosis

Forget holding pseudo fiat like EURe or GBPe. We've developed a strategy/vault that embraces the three highest-yield tokens available on Gnosis, providing you with an innovative approach to maximize your assets' growth:

- **Rocket Pool (rETH):** Access high yields with Rocket Pool's rETH on Gnosis at `0x2F0E755Efe6b58238A67DB420Ff3513Ec1fb31eF`.
- **Savings DAI (sDAI):** Benefit from Savings DAI's consistent returns on Gnosis at `0xaf204776c7245bF4147c2612BF6e5972Ee483701`.
- **Wrapped Liquid Staked Ether (wsETH):** Leverage the potential of wsETH on Gnosis at `0x6C76971f98945AE98dD7d4DFcA8711ebea946eA6`.

### Insta-Swap and Maximize Yield

Our platform not only allows you to hold the market's best yield tokens but also offers the flexibility to instantly swap them for any preferred token when using Gnosis Pay. The only catch? A delay module requires swap requests to be made 3 minutes before payment. This slight delay is a minor inconvenience when considering the ease of liquidity management—it's as simple as sending money via CashApp or Venmo. Now, you can have liquidity just in time for your transactions while maximizing the yield on your assets.

We have pending an integration that withdraws the yield bearing tokens in advance when a default threshold is reached, and then swaps them for the preferred token.

---------------------------------------------------------------------------------------------------------------------------------------------------------------

## UniSwap

- **Tracks**: Open Track - Pool Operators, Public Goods, Research

A core of our platform is the usage of the univeral rotuer in order to orchestrate swaps in a efficinet way. We are using the UniversalRouter for that, with integrations on chain for the final call [On-Chain fnc]("https://github.com/alex-alra-arteaga/stratify-eth-london/blob/7a4ac807a7d118fa39876c5dfd8e82edecdacf34/blockend/src/StratifyVault.sol#L122").

---------------------------------------------------------------------------------------------------------------------------------------------------------------

## Morpho

- **Tracks**: Best Morpho Blue or MetaMorpho integration

Morpho Blue along with the Metamorpho periphery gives us the certainty of having integrated the most secure lending codebase in DeFi. It enables strategy creators to [control their leverage and benefit from other forms of riskless yield](https://github.com/alex-alra-arteaga/stratify-eth-london/blob/5496a5c04d5b8004da1581e960665269d58a64bc/blockend/src/StratifyVault.sol#L146C2-L200C6).

## Chiliz

- **Tracks**: Pool Prize

Our protocol is deployed on Chiliz testnet, Spicy, and its use is abstracted through users embedded wallets.

### Address Deployment

| Chain             | StratifyVault Address |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Ethereum Sepolia           | [0x4d6d9ccc4117bf3cc292b3b632ac5c7c34bb70ca](https://sepolia.etherscan.io/address/0x4d6d9ccc4117bf3cc292b3b632ac5c7c34bb70ca) |
| Arbitrum Sepolia            | [0x5f9b644939a1c49286abd233c459bf233f03bdd2](https://sepolia.arbiscan.io/address/0x5f9b644939a1c49286abd233c459bf233f03bdd2) |
| Base Sepolia  | [0x4d6D9CCc4117bF3cC292b3B632AC5c7c34Bb70ca](https://sepolia.basescan.org/address/0x4d6D9CCc4117bF3cC292b3B632AC5c7c34Bb70ca) |
| Celo Alfajores  | [0x4d6d9ccc4117bf3cc292b3b632ac5c7c34bb70ca](https://explorer.celo.org/alfajores/address/0x4d6D9CCc4117bF3cC292b3B632AC5c7c34Bb70ca) |
| Gnosis | [0x4d6D9CCc4117bF3cC292b3B632AC5c7c34Bb70ca](https://gnosisscan.io/address/0x4d6D9CCc4117bF3cC292b3B632AC5c7c34Bb70ca) |
| Chiliz | [0x4d6d9ccc4117bf3cc292b3b632ac5c7c34bb70ca](https://spicy-explorer.chiliz.com/address/0x4d6d9ccc4117bf3cc292b3b632ac5c7c34bb70ca) |g

## Usage

### Installation

### Build

### Deploy & Verification

### Help

```shell
forge --help
anvil --help
cast --help
```
