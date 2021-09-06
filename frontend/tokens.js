// (c) AzureKn1ght
const nsgdBal = document.getElementById("nsgdBal");
const ethBal = document.getElementById("ethBal");
const wbtcBal = document.getElementById("wbtcBal");
const web3 = new Web3(window.ethereum);

//NSGD CONTRACT
const nsgdAddress = "0x53b41b7e15c24a2909880997a3ffa28890214893"; //TO REPLACE WITH TOKEN ADDRESS
const nsgdContract = new web3.eth.Contract(tokenABI, nsgdAddress);

//ETH CONTRACT
const ethAddress = "0x53b41b7e15c24a2909880997a3ffa28890214893"; //TO REPLACE WITH TOKEN ADDRESS
const ethContract = new web3.eth.Contract(tokenABI, ethAddress);

//WBTC CONTRACT
const wbtcAddress = "0x53b41b7e15c24a2909880997a3ffa28890214893"; //TO REPLACE WITH TOKEN ADDRESS
const wbtcContract = new web3.eth.Contract(tokenABI, wbtcAddress);


var nsgd_balance = 0;
var eth_balance = 0;
var wbtc_balance = 0;
var accountHash = 0;

//Initialize the page on load
function init() {
  //Get user name and id
  accountHash = sessionStorage.getItem("accountId") || "accountid";
  titleName.innerHTML = `${accountHash}`;

  //Get account balance from token contract
  //getTokenBal(accountHash);
}

function retrieveGoals(id) {
  let url = `http://localhost:3000/goals/by-id?user_id=${id}`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      GoalsData = data;

      calGoals();
    });
}

function calGoals() {
  let bal = total_balance;
  let elm = "";

  GoalsData.forEach((goal) => {
    //Load goal details
    let name = goal.description;
    let amt = goal.balance;
    let percent = 0;

    //Calc the percentage
    if (bal >= amt) {
      percent = 100;
      bal -= amt;
    } else {
      percent = Math.trunc((bal / amt) * 100);
      bal = 0;
    }

    //Add it to the element
    elm += `
      <span>${name}<span class="amt">$${amt}</span>
          <div class="progress" style="height: 25px"
          onclick="deleteGoal(${goal.goal_id}, '${name}');">
            <div
              class="progress-bar bg-success"
              role="progressbar"
              style="width: ${percent}%"
              aria-valuenow="${percent}"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              ${percent}%
            </div>
          </div>
          <br />
      </span>
      `;
  });

  goalsContainer.innerHTML = elm;
}

function deleteGoal(goalID, goalName) {
  if (confirm(`Delete: ${goalName}?`)) {
    //delete goal
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `http://localhost:3000/goals/delete/by-id?goal_id=${goalID}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        location.reload();
      })
      .catch((error) => console.log("error", error));
  }
}

//PLEASE KEEP THE LOGOUT FUNCTION THANKS
function logout() {
  //Logout and redirect to login page
  sessionStorage.clear();
  window.location.href = "index.html";
}

init();
