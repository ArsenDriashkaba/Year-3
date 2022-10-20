let POINTS;
let SECONDS;
let ROWS;
let COLUMNS;
let CARD_WIDTH;
let CARD_HEIGHT;
let OLD_RECORD;

let endGame = true;

const CARD_BACK = "card-back.png";
const CARD_FRONT = "K.png";
const FRONT = "front";

const container = document.getElementById("cards");
const points = document.getElementById("body");
const timer = document.getElementById("timer");
const record = document.getElementById("record");
const start = document.getElementById("startGame");
const scoresUl = document.getElementById("score-list");
const nameInput = document.getElementById("player-name");

const fetchBoardInfo = async () => {
  const response = await fetch("http://localhost:3001/boardInfo", {
    method: "GET",
  });

  const data = await response.json();
  const { points, seconds, rows, columns, card } = { ...data };

  POINTS = points;
  SECONDS = seconds;
  COLUMNS = columns;
  ROWS = rows;
  CARD_WIDTH = card?.width;
  CARD_HEIGHT = card?.height;
};

const generateGameArea = (container, rows, columns) => {
  let content = "";

  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      content += `<div><img class="card-back" src="obrazky/card-back.png" alt="" width="80" height="120" id="c1"></div>`;
    }
  }

  container.innerHTML = content;
};

const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const handleClick = (e) => {
  if (endGame) {
    return;
  }

  if (e.target.classList.value.includes(FRONT)) {
    POINTS += 1;
    points.innerHTML = `Pocet bodov: ${POINTS}`;

    return;
  }

  POINTS -= 1;
  points.innerHTML = `Pocet bodov: ${POINTS}`;
};

const switchCard = (card) => {
  card.src = card.src.replace(CARD_BACK, CARD_FRONT);
  card.classList.add(FRONT);

  setTimeout(() => {
    card.src = card.src.replace(CARD_FRONT, CARD_BACK);
    card.classList.remove(FRONT);
  }, 500);
};

const setNewScore = async (record) => {
  if (!OLD_RECORD || POINTS !== 0) {
    await addScore(record);
    await getPlayerScores();

    record.innerHTML = `Record: ${record}`;
  }
};

const getPlayerScores = async () => {
  const response = await fetch("http://localhost:3001/scores", {
    method: "GET",
  });

  const data = await response.json();

  OLD_RECORD = data[0]?.score;

  scoresUl.innerHTML = "";
  data.forEach((record) => {
    scoresUl.innerHTML += `<li><h2>${record.name}: ${record.score}</h2></li>`;
  });
};

const addScore = async (score) => {
  try {
    const name = nameInput.value;

    await fetch(`http://localhost:3001/scores/${name}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score }),
    });
  } catch (error) {
    console.log(error);
  }
};

const Game = async () => {
  const gameState = async (cardInterval, secondsInterval) => {
    if (SECONDS === 0 || POINTS === 0) {
      endGame = true;

      clearInterval(cardInterval);
      clearInterval(secondsInterval);
      await setNewScore(POINTS);

      await fetchBoardInfo();

      points.innerHTML = `Pocet bodov: ${POINTS}`;
      timer.innerHTML = SECONDS;
    }
  };

  await fetchBoardInfo();
  await getPlayerScores();
  generateGameArea(container, ROWS, COLUMNS);

  record.innerHTML = `Record: ${OLD_RECORD || ""}`;

  const cards = document.querySelectorAll(".card-back");
  cards.forEach((card) => card.addEventListener("click", handleClick));

  const startGame = () => {
    if (!endGame) {
      return;
    }

    endGame = false;

    const cardInterval = setInterval(() => {
      gameState(cardInterval, secondsInterval);

      const randomIndex = generateRandomNumber(0, ROWS * COLUMNS - 1);

      switchCard(cards[randomIndex]);
    }, 800);

    const secondsInterval = setInterval(() => {
      gameState(cardInterval, secondsInterval);

      SECONDS -= 1;
      timer.innerHTML = SECONDS;
    }, 1000);
  };

  start.addEventListener("click", startGame);
};

Game();
