// Sprite Js solution works for any(random) order of the bottles
const bg_x = 400;
const bg_y = 220;
const card_x = 60;
const card_y = 45;
const numberOfEmpty = 4;

const imgDirPath = "images/";

//Image names should be numbers
const bottleNameToСapacity = {
  0: 1,
  1: 11,
  2: 3,
  3: 5,
  4: 7,
  5: 4,
  6: 9,
  7: 10,
  8: 5,
  9: 11,
};
const imageNames = Object.keys(bottleNameToСapacity);

const getRandomIntFromInterval = (minInt, maxInt) =>
  Math.floor(Math.random() * (maxInt - minInt) + minInt);

const rearrangeImages = (imgNames) => {
  const result = [];
  const imgCount = imgNames.length;

  while (result.length !== imgCount) {
    const randomNumber = `${getRandomIntFromInterval(0, imgCount)}`;

    if (result.findIndex((value) => value === randomNumber) === -1) {
      result.push(randomNumber);
    }
  }

  return result;
};

const findRightSolution = (bottleCapacities, imgNames) =>
  imgNames.reduce((acc, curr, currentIndex) => {
    if (currentIndex === imgNames.length - 1) {
      return acc;
    }

    const next = imgNames[currentIndex + 1];

    if (isLessCapacity(bottleCapacities, curr, next)) {
      return acc.concat(curr);
    }

    return acc;
  }, "");

const isLessCapacity = (bottleCapacities, name1, name2) =>
  bottleCapacities[name1] < bottleCapacities[name2];

const rearrangedImages = rearrangeImages(imageNames);

const bottles = [];
const solution = findRightSolution(bottleNameToСapacity, rearrangedImages);

function juiceSelection(canvas, enabled, homeDir) {
  this.act = new Activity(canvas, enabled);

  this.act.onClick = (sprite) => {
    sprite.highlight = sprite.highlight === null ? "green" : null;
    sprite.checked = !sprite.checked;

    document.getElementById("vypis").innerHTML = this.act.getResult();
  };

  this.act.getResult = function () {
    const result = bottles.reduce((acc, curr) => {
      const name = curr.checked ? curr.name : "";

      return acc + name;
    }, "");

    if (result === "") {
      return "Please have a try :)";
    }

    if (result === solution) {
      return "Congratulations!";
    }

    return "Answer is incorrect or haven't been finished yet";
  };

  const drawImages = (images, path) =>
    images.forEach((name, index) => {
      const posX = card_x + index * (card_x + 45);
      const posY = 150;
      const imgPath = `${path}${name}.png`;

      const bottle = new Sprite(this.act, imgPath, posX, posY, clickSprite);

      bottle.highlight = null;
      bottle.checked = false;
      bottle.name = name;

      bottles.push(bottle);
    });

  drawImages(rearrangedImages, imgDirPath);
}
