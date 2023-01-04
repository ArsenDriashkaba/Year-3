function f_2018_SP_02(canvas, enabled, homeDir) {
  const x = 230;
  const y = 250;

  var hranySprites = [];

  var cesta = homeDir + "2018-SP-02-";
  var hrany_sur = [
    [125, 50, 3],
    [125, 250, 1],
    [325, 250, 6],
    [325, 450, 9],
  ];

  const hrany_LH_PD = [[125, 150, 2]];

  const hrany_LD_PH = [[325, 350, 5]];

  const hrany_V = [
    [225, 150, 5],
    [225, 350, 1],
    [425, 350, 4],
  ];

  var vrcholy_sur = [
    [25, 50],
    [225, 50],
    [25, 250],
    [225, 250],
    [425, 250],
    [225, 450],
    [425, 450],
  ];

  const getMessage = () => {
    let message;
    const answer = this.act.getResult();

    if (answer === "a") {
      message = "Correct!";
    } else if (answer === "d") {
      message = "Incorrect";
    } else {
      message = "Unfinished";
    }

    document.getElementById("vypis").innerHTML = `Your ansver is ${message}`;
  };

  this.act = new Activity(canvas, enabled);

  this.act.onClick = function (sprite) {
    if (sprite.highlight != null) {
      sprite.highlight = null;
      getMessage();

      return;
    }

    if (sprite.name === "LD-PH") {
      sprite.ix = 1;
      sprite.image = sprite.images[sprite.ix];
      sprite.highlighted = true;
      sprite.name = "LD-PHa";
      getMessage();

      return;
    }

    if (sprite.name === "LD-PHa") {
      sprite.ix = 0;
      sprite.image = sprite.images[sprite.ix];
      sprite.highlighted = false;
      sprite.name = "LD-PH";
      getMessage();

      return;
    }

    if (sprite.name === "LH-PD") {
      sprite.ix = 1;
      sprite.image = sprite.images[sprite.ix];
      sprite.highlighted = true;
      sprite.name = "LH-PDa";
      getMessage();

      return;
    }

    if (sprite.name === "LH-PDa") {
      sprite.ix = 0;
      sprite.image = sprite.images[sprite.ix];
      sprite.highlighted = false;
      sprite.name = "LH-PD";
      getMessage();

      return;
    }

    sprite.highlight = "yellowgreen";

    getMessage();
  };

  this.act.getResult = function () {
    // ak nie je nič označené: return "x";
    // správne riešenie: return "a";
    // nesprávne riešenie: return "d";

    let result = 0;
    let result2 = [];

    hranySprites.forEach((hrana) => {
      if (hrana.highlight != null || hrana.highlighted) {
        result += hrana.value;
        result2.push(hrana.value);
      }
    });

    document.getElementById("vypis2").innerHTML = `${result2.join(
      " + "
    )} = ${result}`;

    if (result === 16) {
      return "a";
    }

    if (result === 0) {
      return "x";
    }

    return "d";
  };

  const paintLines = (img, coords) => {
    coords.forEach((hrana) => {
      const line = new Sprite(
        this.act,
        [`${cesta}${img}.png`, `${cesta}${img}a.png`],
        hrana[0],
        hrana[1],
        clickSprite
      );

      line.name = img;
      line.value = hrana[2];

      hranySprites.push(line);
    });
  };

  new Sprite(this.act, cesta + "pozadie.png", x, y);

  paintLines("vodo", hrany_sur);
  paintLines("LD-PH", hrany_LD_PH);
  paintLines("LH-PD", hrany_LH_PD);
  paintLines("zvisla", hrany_V);

  vrcholy_sur.forEach(
    (vrchol) =>
      new Sprite(this.act, `${cesta}gulicka.png`, vrchol[0], vrchol[1])
  );
}
