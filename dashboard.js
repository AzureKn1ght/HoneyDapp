// (c) AzureKn1ght
const balance = document.getElementById("balance");
const titleName = document.getElementById("titleName");
const b1 = document.getElementById("b1");
const web3 = new Web3(window.ethereum);
const conAddress = "0xAe790B847C02280Cb182c55E3ec95C418D1429E8";
const contract = new web3.eth.Contract(abi, conAddress);
const tokAddress = "0x53b41b7e15c24a2909880997a3ffa28890214893"; //TO REPLACE WITH TOKEN ADDRESS
const tokContract = new web3.eth.Contract(tokenABI, tokAddress);

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

var total_balance = 6999;
var accountHash = 0;

//Initialize the page on load
function init() {
  //Get user name and id
  accountHash = sessionStorage.getItem("accountId") || "accountid";
  titleName.innerHTML = `${accountHash}`;

  //Get account balance from token contract
  getTokenBal(accountHash);

  //Get the list of goals from smart contract
  retrieveGoals(accountHash);
}

//Function to get token balance
function getTokenBal(id) {
  tokContract.methods
    .balanceOf(id)
    .call()
    .then((result) => {
      let bal = Math.trunc(web3.utils.fromWei(result));
      console.log(bal);

      sessionStorage.setItem("balance", bal);
      total_balance = sessionStorage.getItem("balance");
      balance.innerText = `ṈS$ ${total_balance}`;
    })
    .catch((error) => {
      console.log(error);
    });
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
      let index = 0;

      GoalsData.forEach((goal) => {
        let myGoal = {
          ownerAddress: goal.ownerAddress,
          goalID: index,
          amount: goal.amount,
          description: goal.description,
          status: goal.status,
        };
        index += 1;
        console.log(myGoal);

        if (myGoal.status == 0) activeGoals.push(myGoal);
        else if (myGoal.status == 1) completedGoals.push(myGoal);
      });

      console.log("Active Goals:");
      console.log(activeGoals);
      displayGoals(activeGoals, "activeGoals");

      console.log("Completed Goals: ");
      console.log(completedGoals);
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
    let id = goal.goalID;
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
          onclick="completeGoal(${id}, '${name}', '${percent}', '${type}');"
          title="click to mark as complete"
          >
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
function completeGoal(goalID, goalName, percentage, type) {
  if (percentage != 100 || type === "completedGoals") return;

  if (confirm(`Mark as Complete: "${goalName}"?`)) {
    //Send request to the Smart Contract
    contract.methods
      .completeGoal(currentAccount, goalID)
      .send({
        from: currentAccount,
      })
      .then((receipt) => {
        console.log(receipt);
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });

    //Alert user to wait for transactions
    alert("Processing: sending your request");
    console.log("Mark as complete: processing...");
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
