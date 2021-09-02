// (c) AzureKn1ght
const input = document.getElementById("input");
const newsList = document.getElementById("newsContainer");
const latestNews = document.getElementById("latestNews");
const b1 = document.getElementById("b1");

const apiKey = "53e7dae0b696466a8bac8de6ed9cc29e";
b1.addEventListener("click", search);

function search(e) {
  e.preventDefault();

  let topic = input.value;
  let url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;
  let elm = "";

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      data.articles.forEach((article) => {
        //Add it to the element
        elm += `
          <a class="card mb-3" href="${article.url}" target="_blank">
            <img src="${article.urlToImage}" class="card-img-top"/>
            <div class="card-body">
              <h5 class="card-title"></h5>
              <p class="card-text">
                ${article.title}
              </p>
              <p class="card-text>
                <small class="text-muted">
                ${article.publishedAt.substring(0, 10)}
                </small>
              </p>
            </div>
          </a>
        `;
      });

      newsList.innerHTML = elm;
    });
}

//Initialize the page on load
function init() {
  let url = `https://newsapi.org/v2/top-headlines?country=sg&apiKey=${apiKey}`;
  let elm = "";

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      data.articles.forEach((article) => {
        //Add it to the element
        elm += `
          <a class="card mb-3" href="${article.url}" target="_blank">
            <img src="${article.urlToImage}" class="card-img-top"/>
            <div class="card-body">
              <h5 class="card-title"></h5>
              <p class="card-text">
                ${article.title}
              </p>
              <p class="card-text>
                <small class="text-muted">
                ${article.publishedAt.substring(0, 10)}
                </small>
              </p>
            </div>
          </a>
        `;
      });

      latestNews.innerHTML = elm;
    });
}

function logout() {
  //Logout and redirect to login page
  sessionStorage.clear();
  window.location.href = "index.html";
}

init();
