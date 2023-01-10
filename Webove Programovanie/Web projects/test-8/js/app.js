let error = "";
let saveName = "";
let pointBuffer = [];

const myCanvas = document.getElementById("canvas");
const stepsCanvas = document.getElementById("canvas1");
const fileInput = document.getElementById("upload-file");
const applyBtn = document.getElementById("apply");
const saveBtn = document.getElementById("save");
const saveNameInput = document.getElementById("save-name");
const clearBtn = document.getElementById("clear");
const ctx = myCanvas.getContext("2d");

const imgDirPath = "images";
const meshSize = 7;
const meshStartX = 65;
const meshStartY = 50;
const meshGap = 85;
const dirStartX = meshStartX;
const dirStartY = 40;
const directions = {
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1],
  "UP-LEFT": [-1, -1],
  "DOWN-LEFT": [1, -1],
  "UP-RIGHT": [-1, 1],
  "DOWN-RIGHT": [1, 1],
};

const meshInfo = {
  startPoint: null,
  steps: [],
};
const circles = [];
const lines = [];
const steps = [];

// compare points till one matches the direction. Returns directions
const findDirection = (pointBuffer, directions) =>
  Object.keys(directions).find((direction) => {
    const sprite1 = pointBuffer[0];
    const sprite2 = pointBuffer[1];

    console.log({ sprite1, sprite2 });

    const dirCoords = directions[direction];
    const targetPoint = [sprite2.row, sprite2.column];

    const nextPoint = [
      sprite1.row + dirCoords[0],
      sprite1.column + dirCoords[1],
    ];

    return nextPoint.every((elem, index) => elem === targetPoint[index]);
  });

const handleNextPoint = (pointBuffer, sprite, drawDirection, drawLine) => {
  pointBuffer.push(sprite);

  if (pointBuffer.length === 2) {
    // We are trying to understand the direction of next move
    const newDirection = findDirection(pointBuffer, directions);

    if (!newDirection) {
      pointBuffer.splice(1);
      sprite.highlight = null;
      error = "You cant go there buddy";
      console.log(error);

      return;
    }

    drawDirection(imgDirPath, newDirection);
    drawLine(imgDirPath, newDirection, pointBuffer[0].pos);

    meshInfo.steps.push(newDirection);
    pointBuffer.splice(0, 1);
  }
};

function mainGame(canvas, enabled) {
  this.act = new Activity(myCanvas, enabled);
  this.act1 = new Activity(stepsCanvas, enabled);

  const handleThisActivityClick = (sprite) => {
    circles.forEach((sprite) => (sprite.highlight = null));
    sprite.highlight = "green";

    const pointPos = sprite.pos;

    if (!meshInfo.startPoint) {
      meshInfo.startPoint = pointPos;
      pointBuffer.push(sprite);
    } else {
      handleNextPoint(pointBuffer, sprite, drawDirection, drawLine);
    }
  };

  const clearBoard = () => {
    // Board reseting and clearing all of the arrays

    lines.forEach((sprite) => sprite.erase());
    steps.forEach((sprite) => sprite.erase());
    circles.forEach((sprite) => sprite.erase());

    this.act1 = new Activity(stepsCanvas, enabled);
    this.act = new Activity(myCanvas, enabled);

    this.act.onClick = handleThisActivityClick;

    meshInfo.startPoint = null;
    meshInfo.steps = [];
    pointBuffer = [];

    drawMesh(imgDirPath, meshSize);
  };

  this.act.onClick = handleThisActivityClick;

  clearBtn.addEventListener("click", clearBoard);

  const drawMesh = (imgPath, size) => {
    const circlePath = `${imgPath}/circle.png`;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const posX = meshStartX + i * meshGap;
        const posY = meshStartY + j * meshGap;

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

    const stepSprite = new Sprite(
      this.act1,
      directionImgPath,
      dirStartX + meshInfo.steps.length * 50,
      dirStartY
    );

    steps.push(stepSprite);
  };

  const drawLine = (imgPath, direction, coords) => {
    const lineImgPath = `${imgPath}/${direction}-RED.png`;
    const koeficients = directions[direction];

    const lineSprite = new Sprite(
      this.act,
      lineImgPath,
      coords[0] + koeficients[1] * (meshGap / 2),
      coords[1] + koeficients[0] * (meshGap / 2)
    );

    lines.push(lineSprite);
  };

  const drawComposition = (imgPath, meshConfig) => {
    const { startPoint, steps } = meshConfig;

    let x = startPoint[0];
    let y = startPoint[1];

    Object.keys(steps).map((step) => {
      const direction = steps[step];
      const koeficients = directions[direction];

      drawLine(imgPath, direction, [x, y]);

      x += koeficients[1] * meshGap;
      y += koeficients[0] * meshGap;
    });

    const circleIdx = this.act.sprites.findIndex(
      (circle) => circle.x === x && circle.y === y
    );

    this.act.sprites[circleIdx].highlight = "green";

    pointBuffer.push(circles[circleIdx]);
  };

  applyBtn.addEventListener("click", async () => {
    try {
      const fileName = fileInput.files[0]?.name;

      if (!fileName) {
        return;
      }

      const response = await fetch(`/files/${fileName}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((response) => response.json());

      const { startPoint, steps } = response;

      clearBoard();

      meshInfo.startPoint = startPoint;
      meshInfo.steps = steps;

      console.log(meshInfo);

      drawComposition(imgDirPath, meshInfo);
    } catch (error) {
      console.log(error);
    }
  });

  drawMesh(imgDirPath, meshSize);
}

saveNameInput.addEventListener("change", (e) => {
  saveName = e.target.value;
});

saveBtn.addEventListener("click", async () => {
  try {
    if (!saveName) {
      return;
    }

    const data = { saveName, meshInfo };

    await fetch("/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => console.log(response));

    saveNameInput.value = "";
  } catch (error) {
    console.log(error);
  }
});
