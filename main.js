const slider = document.querySelector("#size-input");
const output = document.querySelector(".size-output");
const colorSelect = document.querySelector("input[type='color']");
const canvas = document.querySelector(".canvas");
const drawMode = document.querySelector(".draw-mode");
const eraseMode = document.querySelector(".erase-mode");
const clear = document.querySelector(".clear");
let draw = true;

function setDrawMode(isDraw) {
  drawMode.classList.toggle("selected", isDraw);
  eraseMode.classList.toggle("selected", !isDraw);
  draw = isDraw;
}

drawMode.addEventListener("click", () => {
  setDrawMode(true);
});

eraseMode.addEventListener("click", () => {
  setDrawMode(false);
});

clear.addEventListener("click", () => {
  canvas.querySelectorAll(".pixel").forEach((pixel) => {
    pixel.style.backgroundColor = "white";
  });
});

output.textContent = `${slider.value} × ${slider.value}`;

function createPixel() {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");
  const sizePercentage = 100 / slider.value;
  pixel.style.width = `${sizePercentage}%`;
  pixel.style.aspectRatio = 1;
  pixel.style.backgroundColor = "white";

  function handlePixelColorChange() {
    pixel.style.backgroundColor = draw ? colorSelect.value : "white";
  }

  pixel.addEventListener("mouseover", (e) => {
    if (e.buttons === 1 || e.buttons === 3) {
      handlePixelColorChange();
    }
  });

  pixel.addEventListener("mousedown", () => {
    handlePixelColorChange();
  });

  return pixel;
}

function createPixels() {
  const numPixels = slider.value ** 2;
  const pixels = Array.from({ length: numPixels }, createPixel);
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
  canvas.append(...pixels);
}

slider.addEventListener("input", () => {
  output.textContent = `${slider.value} × ${slider.value}`;
  createPixels();
});

createPixels();
