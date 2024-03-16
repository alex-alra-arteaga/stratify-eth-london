export const M_VAULT_ADDRESS =
process.env.MANAGER_VAULT_ADDRESS ||
"0x2244F4ADE1eCE6C216C6B119c54725dEe34801B5";

export const ERC20_ABI = [
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];
  
  export const VAULT_ABI = [
    {
      inputs: [
        {
          internalType: "bytes",
          name: "calldata",
          type: "bytes",
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256",
        },
        {
          internalType: "address[1]",
          name: "tokens",
          type: "address[1]",
        },
        {
          internalType: "uint256",
          name: "amountIn",
          type: "uint256",
        },
      ],
      name: "fulfillRequest",
      outputs: [
        {
          internalType: "uint128",
          name: "",
          type: "uint128",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  
  export const POOL_ABI = [
    {
      inputs: [],
      name: "slot0",
      outputs: [
        {
          internalType: "uint160",
          name: "sqrtPriceX96",
          type: "uint160",
        },
        {
          internalType: "int24",
          name: "tick",
          type: "int24",
        },
        {
          internalType: "uint16",
          name: "observationIndex",
          type: "uint16",
        },
        {
          internalType: "uint16",
          name: "observationCardinality",
          type: "uint16",
        },
        {
          internalType: "uint16",
          name: "observationCardinalityNext",
          type: "uint16",
        },
        {
          internalType: "uint8",
          name: "feeProtocol",
          type: "uint8",
        },
        {
          internalType: "bool",
          name: "unlocked",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "liquidity",
      outputs: [
        {
          internalType: "uint128",
          name: "",
          type: "uint128",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  
