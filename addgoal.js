// (c) AzureKn1ght
const desc = document.getElementById("desc");
const amt = document.getElementById("amt");
const b1 = document.getElementById("b1");
const web3 = new Web3(window.ethereum);
const conAddress = "0xAe790B847C02280Cb182c55E3ec95C418D1429E8";
const contract = new web3.eth.Contract(abi, conAddress);
  
//Goals (goal_id, description, balance, date_created, user_id);

//Add Goal Function

//Create Contract instance
const goalAdd = async (e) => {
  

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

  //Step 2: Send transaction to smart contract

  contract.methods
    .addGoal(currentAccount, a, d)
    .send({
      from: currentAccount,
    })
    .then((receipt) => {
      console.log(receipt);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.log(error);
    });
   
};

//Add event listener for buttons
b1.addEventListener("click", goalAdd);
document.getElementById("b2").onclick = function () {
  location.href = "dashboard.html";
};
