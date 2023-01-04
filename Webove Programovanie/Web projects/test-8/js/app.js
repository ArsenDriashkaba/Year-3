let error = "";

const myCanvas = document.getElementById("canvas");
const stepsCanvas = document.getElementById("canvas1");
const fileInput = document.getElementById("upload-file");
const applyBtn = document.getElementById("apply");
const ctx = myCanvas.getContext("2d");

const imgDirPath = "images";
const meshSize = 7;
const meshStartX = 65;
const meshStartY = 50;
const dirStartX = meshStartX;
const dirStartY = 40;
const directions = {
  UP: [1, 0],
  DOWN: [-1, 0],
  LEFT: [0, 1],
  RIGHT: [0, -1],
  "UP-LEFT": [1, 1],
  "DOWN-LEFT": [-1, 1],
  "UP-RIGHT": [1, -1],
  "DOWN-RIGHT": [-1, -1],
};

const meshInfo = {
  startPoint: null,
  steps: [],
};
const circles = [];
const pointBuffer = [];

// compare points till one matches the direction. Returns directions
const findDirection = (pointBuffer, directions) =>
  Object.keys(directions).find((direction) => {
    const sprite1 = pointBuffer[0];
    const sprite2 = pointBuffer[1];

    const dirCoords = directions[direction];
    const firstPoint = [sprite1.row, sprite1.column];
    const secondPoint = [
      sprite2.row + dirCoords[0],
      sprite2.column + dirCoords[1],
    ];

    return firstPoint.every((elem, index) => elem === secondPoint[index]);
  });

const handleNextPoint = (pointBuffer, sprite, drawDirection) => {
  pointBuffer.push(sprite);

  if (pointBuffer.length === 2) {
    // We are trying to understand the direction of next move
    const newDirection = findDirection(pointBuffer, directions);

    console.log(newDirection);

    if (!newDirection) {
      pointBuffer.splice(1);
      sprite.highlight = null;
      error = "You cant go there buddy";
      console.log(error);

      return;
    }

    drawDirection(imgDirPath, newDirection);

    meshInfo.steps.push(newDirection);
    pointBuffer.splice(0, 1);
  }
};

function mainGame(canvas, enabled) {
  this.act = new Activity(myCanvas, enabled);
  this.act1 = new Activity(stepsCanvas, enabled);

  this.act.onClick = (sprite) => {
    sprite.highlight = sprite.highlight === null ? "green" : null;

    console.log(sprite);

    const pointPos = sprite.pos;

    if (!meshInfo.startPoint) {
      meshInfo.startPoint = pointPos;
      pointBuffer.push(sprite);
    } else {
      handleNextPoint(pointBuffer, sprite, drawDirection);
    }

    // document.getElementById("vypis").innerHTML = this.act.getResult();
  };

  this.act.getResult = function () {
    return "Answer is incorrect or haven't been finished yet";
  };

  const drawMesh = (imgPath, size) => {
    const circlePath = `${imgPath}/circle.png`;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const posX = meshStartX + i * 85;
        const posY = meshStartY + j * 85;

        const circle = new Sprite(
          this.act,
          circlePath,
          posX,
          posY,
          clickSprite
        );

        circle.pos = [posX, posY];
        circle.row = j;
        circle.column = i;

        circles.push(circle);
      }
    }
  };

  const drawDirection = (imgPath, direction) => {
    const directionImgPath = `${imgPath}/${direction}.png`;

    const directionSprite = new Sprite(
      this.act1,
      directionImgPath,
      dirStartX + meshInfo.steps.length * 50,
      dirStartY
    );

    directionSprite.images[0].width = 20;
  };

  drawMesh(imgDirPath, meshSize);
}

applyBtn.addEventListener("click", () => {
  console.log(fileInput.files);
});
