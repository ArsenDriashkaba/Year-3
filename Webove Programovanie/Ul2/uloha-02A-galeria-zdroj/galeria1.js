const allImages = document.querySelectorAll("img");
const allFigures = document.querySelectorAll("figure");

const handleClick = (figure) => figure.classList.toggle("figure-visible");

allFigures.forEach((figure) =>
  figure.addEventListener("click", () => handleClick(figure))
);
