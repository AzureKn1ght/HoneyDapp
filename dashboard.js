// (c) AzureKn1ght
const balance = document.getElementById("balance");
const titleName = document.getElementById("titleName");
const b1 = document.getElementById("b1");
const web3 = new Web3(window.ethereum);
const conAddress = "0xAe790B847C02280Cb182c55E3ec95C418D1429E8";
const contract = new web3.eth.Contract(abi, conAddress);

//Goal array with sample data for example
var GoalsData = [
  {
    ownerAddress: "0x769c4342baC4559cd32C9d5B0F9109131C934a0F",
    goalID: "1",
    amount: "25",
    description: "Buy Books",
    status: "0",
  },
];

var total_balance;
var accountHash;

//Initialize the page on load
function init() {
  //Get user name and id
  accountHash = sessionStorage.getItem("accountId") || "accountid";
  titleName.innerHTML = `${accountHash}`;

  //TODO: GET THE BALANCE FROM METAMASK WALLET
  //Remember to use Math.trunc to remove the decimals
  total_balance = sessionStorage.getItem("balance") || 6999;
  balance.innerText = `ṈS$ ${total_balance}`;

  //Get the list of goals from server
  retrieveGoals(accountHash);
}

//Function to fetch the goals from the Smart Contract
function retrieveGoals(id) {
  contract.methods
    .getAllGoals(id)
    .call()
    .then((result) => {
      console.log(result);
      return result;
    })
    .then((data) => {
      GoalsData = data;
      console.log(GoalsData);
      let activeGoals = [];
      let completedGoals = [];

      GoalsData.forEach((goal) => {
        if (goal.status == 0) activeGoals.push(goal);
        else if (goal.status == 1) completedGoals.push(goal);

        //Load goal details
        let name = goal.description;
        let amt = goal.balance;
        let percent = 0;
      });

      displayGoals(activeGoals, "activeGoals");
      displayGoals(completedGoals, "completedGoals");
    })
    .catch((error) => {
      console.log(error);
    });
}

//Function to display the Goals in HTML
function displayGoals(goalArr, type) {
  let bal = total_balance;
  let elm = "";
  let goalsContainer = document.getElementById(type);
  let style = type === "activeGoals" ? "bg-success" : "bg-secondary";
  if (goalArr.length === 0) elm = "N/A";

  goalArr.forEach((goal) => {
    //Load goal details
    let name = goal.description;
    let amt = goal.amount;
    let percent = 0;

    if (type === "completedGoals") {
      percent = 100;
    } else {
      if (bal >= amt) {
        //Calc the percentage
        percent = 100;
        bal -= amt;
      } else {
        percent = Math.trunc((bal / amt) * 100);
        bal = 0;
      }
    }

    //Add it to the element
    elm += `
      <span>${name}<span class="amt">ṈS$${amt}</span>
          <div class="progress" style="height: 25px"
          onclick="completeGoal(${goal.goalID}, '${name}', '${percent}');">
            <div
              class="progress-bar ${style}"
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

//TODO: CHANGE THIS TO COMPLETE GOAL INSTEAD
function completeGoal(goalID, goalName, percentage) {
  if (percentage != 100) return;

  if (confirm(`Mark as Complete: "${goalName}"?`)) {
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

function logout() {
  //Logout and redirect to login page
  sessionStorage.clear();
  window.location.href = "index.html";
}

init();
b1.addEventListener("click", function (e) {
  e.preventDefault();
  location.href = "addgoal.html";
});
