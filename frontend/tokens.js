// (c) AzureKn1ght
const balance = document.getElementById("balance");
const titleName = document.getElementById("titleName");
const b1 = document.getElementById("b1");
const goalsContainer = document.getElementById("goalsContainer");

var GoalsData = [
  {
    goal_id: 1,
    description: "Books",
    balance: 3886,
    date_created: "2021-01-17",
    user_id: 206,
  },
  {
    goal_id: 2,
    description: "Music",
    balance: 4244,
    date_created: "2021-05-25",
    user_id: 351,
  },
  {
    goal_id: 3,
    description: "Books",
    balance: 7341,
    date_created: "2020-09-29",
    user_id: 380,
  },
];

var total_balance = 0;
var username = "";
var userID = null;

//Initialize the page on load
function init() {
  //Get user name and id
  username = sessionStorage.getItem("name");
  userID = sessionStorage.getItem("user_id");
  titleName.innerHTML = `Hello, test`;

  //Get the user account balance by user ID
  total_balance = sessionStorage.getItem("balance") || 6999;
  balance.innerText = `$${total_balance}`;

  //Get the list of goals from server
  //Calculate the percentage for each goal
  retrieveGoals(userID);
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
b1.addEventListener("click", function (e) {
  e.preventDefault();
  location.href = "addgoal.html";
});
