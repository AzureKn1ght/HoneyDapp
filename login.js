// (c) AzureKn1ght
const b1 = document.getElementById("b1");

//Login function
function login() {
  ethereum
    .request({ method: "eth_requestAccounts" })
    .then(() => {
      handleAccountsChanged;
      console.log("connection done");
      window.location.href = "dashboard.html";
    })
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Please connect to MetaMask.");
      } else {
        alert("Error connecting to MetaMask. Please try again.");
        console.error(err);
      }
    });
}

//Add event listener for login btn
b1.addEventListener("click", login);
