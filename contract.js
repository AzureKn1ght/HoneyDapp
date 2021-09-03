
//Dependencies
//const Web3 = require('web3');
//const GoalsContract = require('./HoneyDapp/frontend/GoalsContract.json');  
const web3 = new Web3(window.ethereum);


const ethereumButton = document.querySelector('.enableEthereumButton');

ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
ethereum.request({ method: 'eth_requestAccounts' });
});

let currentAccount = null;
ethereum
  .request({ method: 'eth_accounts' })
  .then(handleAccountsChanged)
  .catch((err) => {
    // Some unexpected error.
    // For backwards compatibility reasons, if no accounts are available,
    // eth_accounts will return an empty array.
    console.error(err);
  });

// Note that this event is emitted on page load.
// If the array of accounts is non-empty, you're already
// connected.
ethereum.on('accountsChanged', handleAccountsChanged);

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    // Do any other work!
  }
}


//Create Contract instance
const init = async (e) => {                               // if using node js need to wrap in async
	
    e.preventDefault(); //to prevent form from submitting and refreshing the page

    //to prevent empty input from submitting
    if (!desc.value || !amt.value) {
      alert("Error: Please check your inputs.");
      return;
    }
  
    //Step 1: Get the input data from the form
    var d = desc.value;
    var a = amt.value;
    console.log(`desc: ${d}, amt: ${a}`);

    //const web3 = new Web3(provider);
	const conAddress = '0xAe790B847C02280Cb182c55E3ec95C418D1429E8'

	const contract = new web3.eth.Contract(
	  abi,
    conAddress
  	);


    //Step 2: Send transaction to smart contract
    
    contract.methods.addGoal(currentAccount,a,d).send({
      from: currentAccount,
    })
        .then(receipt =>{
        console.log(receipt)
      }).catch(error =>{
        console.log(error)
      })
    

    //calls the getAllGoals funtion and prints in the console
    const data = await contract.methods.getAllGoals(currentAccount).call();
    console.log(data);
}


//Add event listener for buttons
b1.addEventListener("click", init);
document.getElementById("b2").onclick = function () {
  location.href = "dashboard.html";
};
