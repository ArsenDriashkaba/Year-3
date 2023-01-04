const getKytica = (item) => {
  const { id, nazov, cena } = { ...item };

  return `<a href="/flowers/${id}">${id}: <strong>${nazov}</strong> (${cena} &euro;)</a>`;
};

const flowerComponent = (flower) => `<li><article>${flower}</article></li>`;

const zobraz_vsetky = async () => {
  try {
    const kytice = await fetch("js/data.json").then((response) =>
      response.json()
    ); // according to documentation the best way to work with local or server json files

    const kyticeElems = kytice?.map(getKytica);
    const htmlCode = kyticeElems.reduce(
      (acc, curr) => acc + flowerComponent(curr),
      ""
    );

    document.getElementById("zoznam").innerHTML = htmlCode;
  } catch (error) {
    console.log(error);
  }
};

function kontrola() {
  console.log(
    document.getElementById("nova_nazov").value,
    document.getElementById("nova_cena").value
  );
  return (
    document.getElementById("nova_nazov").value != "" &&
    document.getElementById("nova_cena").value != ""
  );
}
