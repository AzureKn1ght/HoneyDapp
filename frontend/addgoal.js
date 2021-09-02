// (c) AzureKn1ght
const desc = document.getElementById("desc");
const amt = document.getElementById("amt");
const b1 = document.getElementById("b1");
var username = sessionStorage.getItem("name");
var userID = sessionStorage.getItem("user_id");
  
//Goals (goal_id, description, balance, date_created, user_id);

//Add Goal Function
function addGoal(e) {
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

  //Step 2: Post the data to server to create
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    description: d, 
    balance: a, 
    user_id: userID,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/goals/add", requestOptions)
    .then((response) => {
      if (response.ok) {
        location.href = "dashboard.html";
      } else {
        alert("Failed: " + response.text());
      }
    })
    .catch((error) => alert("Error: " + error));
}

//Add event listener for buttons
b1.addEventListener("click", addGoal);
document.getElementById("b2").onclick = function () {
  location.href = "dashboard.html";
};
