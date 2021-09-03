const Web3 = require('web3');
const GoalsContract = require('./HoneyDapp/frontend/GoalsContract.json');  
const provider = new HDWalletProvider(
    privateKey,
    'https://ropsten.infura.io/v3/5880660930f14d27970e5ae5f5b73e26'
)
const init = async () => {                               // if using npm node
	const web3 = new Web3(provider);
	

	const contract = new web3.eth.Contract(
	GoalsContract.abi,
  	);
}

init();
