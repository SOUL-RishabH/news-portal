const cards = document.querySelector(".cards");
const cetagory = document.querySelector(".category");
const cetogorySpan = document.querySelectorAll(".category span");

const baseUrl = "https://newsapi.org/v2";
const apiKey = "&apiKey=dc08f8c82e754457ba5b8386b9077d3f";
const backupImage = "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


async function getAllData(url) {
    try {
        const response = await fetch(baseUrl + url + apiKey);
        const json = response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

function requestUrl(url){
    getAllData(url)
    .then(data => {
        data.articles.forEach((item) => {            
            cards.innerHTML += `
            <div class="card">
                            <div class="image">
                            <img src="${ item.urlToImage ? item.urlToImage : backupImage }" alt="Default News Image">
                            </div>
                            <div class="information">
                                <div>
                                    <p class="title">${item.title}</p>
                                    <p class="description">${item.description}</p>
                                    <p class="time">
                                        <span>${item.publishedAt.replace("Z", "").split("T")[1]}</span>
                                        <span>${item.publishedAt.replace("Z", "").split("T")[0]}</span>
                                    </p>
                                </div>
                                <div class="other">
                                    <span class="source">${item.source.name}</span>
                                    <a href="${item.url}" class="url" target="_blank"> Read Article <i class="bi-arrow-right"></i></a>
                                </div>                            
                            </div>                            
                        </div>`;
        });
    });
}


cetagory.addEventListener("click", (event) => {
    event.preventDefault();
    if(event.target.tagName === "SPAN"){
        cards.innerHTML = " ";
        requestUrl(event.target.dataset.id);
        cetogorySpan.forEach(item => item.classList.remove("active"));
        event.target.classList.add("active");
    }
});
requestUrl("/top-headlines?country=us&category=business");