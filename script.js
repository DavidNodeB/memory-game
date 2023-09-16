const cardContainer = document.querySelector(".card-container");
const result = document.querySelector(".result");
let a = [];
let selectedCardIndex = -1;
let randomCard;

fetch("./data/data.json")
  .then((res) => res.json())
  .then((data) => {
    a.push(...data);
    initializeDeck();
  });

function rotateCard(card) {
  setTimeout(() => {
    card.style.transform = "rotateY(0deg)";
  }, 1500);
}

function initializeDeck() {
  for (let i = 0; i < a.length; i++) {
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

  setTimeout(() => {
    // gets random card then runs an animation
    let cards = document.querySelectorAll(".card");
    let randomIndex = Math.floor(Math.random() * a.length);
    let randomCard = cards[randomIndex];
    randomCard.style.transform = "rotateY(180deg)";
    rotateCard(randomCard);
    shuffleDeck()
    updateDOM();
    setTimeout(() => {
      // sets a timer so that the cards will shuffle and the dom will update after the initial animation
      shuffleDeck();
      updateDOM();
      winner(randomCard)
    }, 2000);
  }, 1500);
}

function shuffleDeck() {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = a[i];
    a[i] = a[j], a[j] = temp;
  }
}

function updateDOM() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, i) => {
    const cardTitle = card.querySelector(".card-title");
    const cardImage = card.querySelector(".card-image");

    cardTitle.textContent = a[i].name;
    cardImage.src = a[i].image;
  });
}

function winner(randCard) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card == randCard) {
        result.textContent = "Winner ✔️";
      } else {
        result.textContent = "Try again ❌";
      }
    })
  })

}

window.addEventListener("load", () => {
  shuffleDeck();
  updateDOM();
  console.clear()
});
