
//Dependencies
const Web3 = require('web3');
const GoalsContract = require('./HoneyDapp/frontend/GoalsContract.json');  
const provider = new HDWalletProvider(
    privateKey,
    'https://ropsten.infura.io/v3/5880660930f14d27970e5ae5f5b73e26'
)

//Create Contract instance
const init = async () => {                               // if using node js need to wrap in async
	
    e.preventDefault(); //to prevent form from submitting and refreshing the page

    //to prevent empty input from submitting
    if (!desc.value || !amt.value) {
      alert("Error: Please check your inputs.");
      return;
    }
  
    //Step 1: Get the input data from the form
    var d = desc.value;
    var a = amt.value;
    console.log(`desc: ${desc}, amt: ${a}, id: ${userID}`);

    const web3 = new Web3(provider);
	

	const contract = new web3.eth.Contract(
	GoalsContract.abi,
  	);

    //Step 2: Send transaction to smart contract

    await contract.methods.addGoal(addressGoalOwner,a,d).send({
        from: addressGoalOwner
    });

    //calls the getAllGoals funtion and prints in the console
    const data = await contract.methods.getAllGoals().call();
    console.log(data);
}


//Add event listener for buttons
b1.addEventListener("click", init);
document.getElementById("b2").onclick = function () {
  location.href = "dashboard.html";
};
