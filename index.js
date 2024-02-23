let canvas;
let ctx;
let empty = true;
let scaleFactor;
let predictionLabel;

window.addEventListener("load", () => {
  canvas = document.getElementById("input-canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 28;
  canvas.height = 28;
  canvas.style.width = "280px"; // Upscale by 10x horizontally
  canvas.style.height = "280px"; // Upscale by 10x vertically
  scaleFactor = parseFloat(canvas.style.width) / canvas.width;
  document.addEventListener("mousedown", startPainting);
  document.addEventListener("mouseup", stopPainting);
  document.addEventListener("mousemove", sketch);

  let clearButton = document.getElementById("clear-button");
  clearButton.addEventListener("click", clearCanvas);

  predictionLabel = document.getElementById("prediction-label");
});

// Stores the initial position of the cursor
let coord = { x: 0, y: 0 };

// This is the flag that we are going to use to
// trigger drawing
let paint = false;

// Updates the coordianates of the cursor when
// an event e is triggered to the coordinates where
// the said event is triggered.
function getPosition(event) {
  const rect = canvas.getBoundingClientRect();
  coord.x = (event.clientX - rect.left) / scaleFactor;
  coord.y = (event.clientY - rect.top) / scaleFactor;
}

// The following functions toggle the flag to start
// and stop drawing
function startPainting(event) {
  paint = true;
  getPosition(event);
}
function stopPainting() {
  paint = false;
  empty = false;
}

function sketch(event) {
  if (!paint) return;
  ctx.beginPath();

  ctx.lineWidth = 1;

  // Sets the end of the lines drawn
  // to a round shape.
  ctx.lineCap = "round";

  ctx.strokeStyle = "white";

  // The cursor to start drawing
  // moves to this coordinate
  ctx.moveTo(coord.x, coord.y);

  // The position of the cursor
  // gets updated as we move the
  // mouse around.
  getPosition(event);

  // A line is traced from start
  // coordinate to this coordinate
  ctx.lineTo(coord.x, coord.y);

  // Draws the line.
  ctx.stroke();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  predictionLabel.textContent = "Prediction: -";
  empty = true;
}

//Model logic
const MODEL_URL = "TensorflowJS_Model/model.json";
const model = await tf.loadLayersModel(MODEL_URL);

setInterval(predictDigit, 1000);

async function predictDigit() {
  if (empty) return;

  // Convert the pixel data into a TensorFlow tensor
  let img = tf.browser.fromPixels(ctx.getImageData(0, 0, 28, 28), 1);
  img = img.reshape([1, 28, 28, 1]);

  const prediction = await tf.tidy(() => {
    // Perform prediction using the model
    const output = model.predict(img);

    // Return the prediction
    return output.dataSync();
  });

  let predictedDigitIndex = prediction.indexOf(Math.max(...prediction));

  predictionLabel.textContent = "Prediction: " + predictedDigitIndex;
}
