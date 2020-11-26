const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");

ctx.width = window.innerWidth;
ctx.height = window.innerHeight;
ctx.strokeStyle = "teal";
ctx.lineJoin = "round";
ctx.lineCap = "round";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
// for colour change
let hue = 0;
// for line width
let direction = false;

function draw(e) {
  // exits fn if mouse is not down on canvas
  if (!isDrawing) return;
  // change colours as drawing ContinueStatement
  ctx.strokeStyle = `hsl(${hue}, 100%, 75%)`;
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  // sets lastX and lastY to last mousedown positions
  lastX = e.offsetX;
  lastY = e.offsetY;

  hue++;

  // makes line thicker and narrower as drawing continues
  if (ctx.lineWidth >= 80 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
