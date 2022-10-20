const container = document.getElementById("obr");

const handleClick = () => {
  console.log("Hello");
  container.classList.add("animation");
};

container.addEventListener("click", handleClick);
