// (c) AzureKn1ght
const custname = document.getElementById("custname");
const password = document.getElementById("password");
const b1 = document.getElementById("b1");

//User: (1, 'Stillman', 'sspier0@go.com', '7483190162', 'Uui2gbKamvx');

//Login function
function login(e) {
  e.preventDefault(); //to prevent form from submitting and refreshing the page

  //to prevent empty input from submitting
  if (!custname.value || !password.value) {
    alert("Login Error: Please check your Username and Password.");
    return;
  }

  //Step 1: Get the input data from the form
  var u = custname.value;
  var p = password.value;

  //Step 2: Send the U/P to server to check login
  //alert("Submit: " + u + " " + p);
  //do the fetch here

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: u, //"rjiruca2@jalbum.net",
    password: p, //"8gVDuI",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/users/login", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      //Step 3a: If login ok then redirect to dashboard
      console.log(result);
      result = JSON.parse(result);

      if (result[0].name) {
        sessionStorage.setItem("name", result[0].name); 
        sessionStorage.setItem("user_id", result[0].user_id); 
        sessionStorage.setItem("balance", result[0].balance); 

        console.log(sessionStorage.getItem("name"));
        console.log(sessionStorage.getItem("user_id"));
        console.log(sessionStorage.getItem("balance"));

        window.location.href = "dashboard.html";
      } else {
        alert("Login Error: Please check your Username and Password.");
      }
    })
    .catch((error) => console.log("error", error));
}

//Add event listener for login btn
b1.addEventListener("click", login);
