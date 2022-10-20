let POINTS = 5;
let SECONDS = 60;
let endGame = true;

const CARD_BACK = "card-back.png";
const CARD_FRONT = "K.png";
const FRONT = "front";

const container = document.getElementById("cards");
const points = document.getElementById("body");
const timer = document.getElementById("timer");
const record = document.getElementById("record");
const start = document.getElementById("startGame");

record.innerHTML = `Record: ${window.localStorage.getItem("record") || ""}`;

const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const generateGameArea = (container, rows, columns) => {
  let content = "";

  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      content += `<div><img class="card-back" src="obrazky/card-back.png" alt="" width="80" height="120" id="c1"></div>`;
    }
  }

  container.innerHTML = content;
};

const handleClick = (e) => {
  if (endGame) {
    return;
  }

  if (e.target.classList.value.includes(FRONT)) {
    POINTS += 1;
    points.innerHTML = `Pocet bodov: ${POINTS}`;

    console.log("Yey");

    return;
  }

  POINTS -= 1;
  points.innerHTML = `Pocet bodov: ${POINTS}`;

  console.log("muss");
};

const switchCard = (card) => {
  card.src = card.src.replace(CARD_BACK, CARD_FRONT);
  card.classList.add(FRONT);

  setTimeout(() => {
    card.src = card.src.replace(CARD_FRONT, CARD_BACK);
    card.classList.remove(FRONT);
  }, 500);
};

const resetGame = () => {
  endGame = false;
};

const setNewRecord = (record) => {
  const oldRecord = window.localStorage.getItem("record");

  if (!oldRecord || record > oldRecord) {
    window.localStorage.setItem("record", record);

    record.innerHTML = `Record: ${record}`;
  }
};

const gameState = (cardInterval, secondsInterval) => {
  if (SECONDS === 0 || POINTS === 0) {
    endGame = true;

    clearInterval(cardInterval);
    clearInterval(secondsInterval);
    setNewRecord(POINTS);

    SECONDS = 60;
    POINTS = 5;

    record.innerHTML = `Record: ${window.localStorage.getItem("record") || ""}`;
    points.innerHTML = `Pocet bodov: ${POINTS}`;
    timer.innerHTML = SECONDS;
  }
};

generateGameArea(container, 3, 4);

const cards = document.querySelectorAll(".card-back");

cards.forEach((card) => card.addEventListener("click", handleClick));

const startGame = () => {
  if (!endGame) {
    return;
  }

  resetGame();

  const cardInterval = setInterval(() => {
    gameState(cardInterval, secondsInterval);

    const randomIndex = generateRandomNumber(0, 11);

    switchCard(cards[randomIndex]);
  }, 800);

  const secondsInterval = setInterval(() => {
    gameState(cardInterval, secondsInterval);

    SECONDS -= 1;
    timer.innerHTML = SECONDS;
  }, 1000);
};

start.addEventListener("click", startGame);
