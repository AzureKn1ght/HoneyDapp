// (c) AzureKn1ght
const nsgdBal = document.getElementById("nsgdBal");
const ethBal = document.getElementById("ethBal");
const wbtcBal = document.getElementById("wbtcBal");
const web3 = new Web3(window.ethereum);

//NSGD CONTRACT
const nsgdAddress = "0x4939af2ecec8f07387d97513e5830ae3d9152421";
const nsgdContract = new web3.eth.Contract(tokenABI, nsgdAddress);

//WBTC CONTRACT
const wbtcAddress = "0x89c7cf7452c475bd52a7e8f3f0b7fc222940fa84"; //TO REPLACE WITH TOKEN ADDRESS
const wbtcContract = new web3.eth.Contract(tokenABI, wbtcAddress);

//Initialize the page on load
function init() {
  //Get user name and id
  var accountHash = sessionStorage.getItem("accountId") || "accountid";
  titleName.innerHTML = `${accountHash}`;

  //Get account balance from token contracts
  getTokenBal(accountHash, nsgdContract, nsgdBal, 0);
  getTokenBal(accountHash, "eth", ethBal, 5);
  getTokenBal(accountHash, wbtcContract, wbtcBal, 5);
}

//Function to get token balance
function getTokenBal(id, tokContract, elm, dec) {
  if (tokContract === "eth") {
    web3.eth
      .getBalance(id)
      .then((result) => {
        let bal = Number.parseFloat(web3.utils.fromWei(result)).toFixed(dec);
        console.log(bal);
        elm.innerText = `${bal}`;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    tokContract.methods
      .balanceOf(id)
      .call()
      .then((result) => {
        let bal = Number.parseFloat(web3.utils.fromWei(result)).toFixed(dec);
        console.log(bal);
        elm.innerText = `${bal}`;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

//PLEASE KEEP THE LOGOUT FUNCTION THANKS
function logout() {
  //Logout and redirect to login page
  sessionStorage.clear();
  window.location.href = "index.html";
}

init();
