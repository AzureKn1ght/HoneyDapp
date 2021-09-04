var abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_goalID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_des",
        type: "string",
      },
    ],
    name: "Add",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_goalID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_des",
        type: "string",
      },
      {
        indexed: false,
        internalType: "enum GoalsContract.Status",
        name: "_status",
        type: "uint8",
      },
    ],
    name: "Complete",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "__ownedGoals",
    outputs: [
      {
        internalType: "address",
        name: "ownerAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "goalID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "enum GoalsContract.Status",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "goalOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amt",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "des",
        type: "string",
      },
    ],
    name: "addGoal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "goalOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "goalID",
        type: "uint256",
      },
    ],
    name: "completeGoal",
    outputs: [
      {
        internalType: "enum GoalsContract.Status",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "goalOwner",
        type: "address",
      },
    ],
    name: "getAllGoals",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "ownerAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "goalID",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "enum GoalsContract.Status",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct GoalsContract.Goal[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "goalOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "goalID",
        type: "uint256",
      },
    ],
    name: "getGoal",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "ownerAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "goalID",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "enum GoalsContract.Status",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct GoalsContract.Goal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "goalOwner",
        type: "address",
      },
    ],
    name: "getNoOfGoals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalGoalsCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
