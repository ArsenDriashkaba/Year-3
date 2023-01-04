function f_2018_SK_20(canvas, enabled, homeDir) {
  var ciele = [];

  this.act = new Activity(canvas, enabled);

  this.act.onDragDrop = function (sprite) {
    var ciel = sprite.findOverlapped(ciele);
    let message;
    sprite.placeAt(ciel);
    const answer = this.getResult();

    if (answer === "a") {
      message = "Correct!";
    } else if (answer === "d") {
      message = "Incorrect";
    } else {
      message = "Unfinished";
    }

    document.getElementById("vypis").innerHTML = `Your ansver is ${message}`;
  };

  this.act.getResult = function () {
    // ak nie je nič označené: return "x";
    // správne riešenie: return "a";
    // nesprávne riešenie: return "d";

    let riesenie = "";

    for (i = 0; i < ciele.length; i++) {
      if (ciele[i].item != null) {
        console.log(ciele[i]);
        riesenie += ciele[i].item.name;
      }
    }

    if (riesenie === "") {
      return "x";
    }

    if (riesenie === "ECGE") {
      return "a";
    }

    return "d";
  };

  const bg_x = 400;
  const bg_y = 220;
  const card_x = 60;
  const card_y = 45;
  const numberOfEmpty = 4;

  var cesta = homeDir + "2018-SK-20_";
  var nazvy = ["ciara", "elipsa", "guma"];
  var idcka = ["C", "E", "G"];

  nazvy.forEach((nazov, index) => {
    const posX = card_x + index * (card_x + 10);
    const posY = 110;
    const imgPath = `${cesta}${nazov}.png`;

    [...Array(numberOfEmpty)].forEach(() => {
      const button = new Sprite(this.act, imgPath, posX, posY, dragSprite);

      button.name = idcka[index];
    });
  });

  [...Array(numberOfEmpty)].forEach((_, i) =>
    ciele.push(new Sprite(this.act, `${cesta}prazdna.png`, 80 + i * 190, 170))
  );

  new Sprite(this.act, cesta + "pozadie.png", bg_x, bg_y);
}
