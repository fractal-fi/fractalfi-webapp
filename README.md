
# FractalFi

**FractalFi** is a decentralized stablecoin platform designed for the **Fractal Bitcoin blockchain**, enabling users to mint fUSD, a Bitcoin-backed stablecoin, by locking BTC as collateral. Inspired by Ethereum’s DAI model, FractalFi brings stability and utility to Bitcoin by leveraging the **BRC20 protocol**. This approach makes FractalFi one of the first stablecoin projects on Bitcoin, uniquely designed for a non-EVM ecosystem.

## Project Overview

With FractalFi, users can lock BTC to mint fUSD, which holds a stable value pegged to the dollar. Our platform is designed to be secure and accessible, allowing users to release their BTC by repaying the minted fUSD. Additionally, FractalFi implements an automated liquidation system to protect the protocol against sharp drops in BTC’s value. This brings DeFi potential to Bitcoin while maintaining Bitcoin’s native simplicity and security.

## Key Features

-   **BRC20 Protocol-Based**: Unlike traditional EVM-based protocols, FractalFi leverages BRC20, providing a new layer of decentralized financial tools on the Bitcoin network.
-   **Stability through Collateralization**: FractalFi’s model is anchored in over-collateralized BTC, ensuring that fUSD is securely backed.
-   **Automated Auctions**: When BTC’s collateral value drops below a threshold, an auction system automatically triggers, selling the BTC collateral to cover the outstanding loan, ensuring protocol stability.

## User Flow

1.  **Collateral Locking**: Users send BTC (BRC20 token) to FractalFi’s vault, locking it as collateral.
2.  **Minting fUSD**: Once collateral is locked, the backend verifies the transaction, and users receive fUSD along with a unique redemption ticket.
3.  **Redemption Process**: To retrieve locked BTC, users send back the fUSD along with the redemption ticket.
4.  **Collateral Liquidation**: If BTC’s value drops below a set threshold, an auction is triggered. This auction allows BTC to be sold at a discount to cover outstanding fUSD, protecting the platform’s stability.

## Achievements

-   **User Interface (UI)**: Built a responsive, user-friendly interface for platform access, enabling seamless interaction with the vault and fUSD minting.
-   **Unisat Wallet Integration**: Integrated Unisat Wallet on the frontend for straightforward BTC transactions, enhancing the user experience.
-   **Backend and Unisat API Integration**: Leveraged Unisat APIs to fetch real-time balance and transaction history, ensuring accurate tracking of users' locked BTC and minted fUSD.
-   **Custom Inscription Service**: Created a service for committing and revealing inscriptions (BTC20 transferblocks), which improves transparency and efficiency for BRC20 transfers on FractalFi.

## What I Didn’t Achieve

-   **Mock Data for Demo**: Due to time constraints, some parts of the demo rely on mock data.
-   **Backend Integration**: I still need to fully integrate the backend with the frontend and implement a few API calls to retrieve all available data, essentially connecting the final dots.
-   **Continued Development**: Despite the unfinished aspects, I plan to continue building FractalFi. It’s both a necessary tool for the Fractal ecosystem and an exciting project that leverages Bitcoin’s potential for stablecoins.
