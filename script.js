const cardContainer = document.querySelector(".card-container");
let a = [];

fetch("./data/data.json")
 .then(res => res.json())
 .then(data => {
    a.push(...data); 
    for (i = 0; i < a.length; i++) {

        const card = document.createElement("div");
        card.classList.add("card");
        cardContainer.append(card);

        const front = document.createElement("div"); 
        front.classList.add("front"); 
        card.append(front); 

        const back = document.createElement("div");
        back.classList.add("back"); 
        card.append(back);

        const cardTitle = document.createElement("h3");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = a[i].name;
        back.append(cardTitle);

        const cardImage = document.createElement("img"); 
        cardImage.classList.add("card-image"); 
        cardImage.src = a[i].image; 
        back.append(cardImage); 
    }
})

function rotateCard(card) {
    setTimeout(() => {
        card.style.transform = "rotateY(0deg)";
    }, 2000);
}
  
window.addEventListener("load", () => {
    setTimeout(() => {
        let cards = document.querySelectorAll(".card"); 
        let randomIndex = Math.floor(Math.random() * a.length);
        let randomCard = cards[randomIndex];
        randomCard.style.transform = "rotateY(180deg)";
        rotateCard(randomCard);
        Shuffle(randomCard); 
 }, 1500);
});

function Shuffle() {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
