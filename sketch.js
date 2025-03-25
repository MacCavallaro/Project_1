let currentBrush = 1;
let brushSize = 10;
let currentColorSet = 1; // 1 = Purple, 2 = Blue, 3 = White/Beige
let eraserMode = false; // Track if the eraser is active

function setup() {
  createCanvas(800, 600);
  background(20);
  smooth();
}

function draw() {
  if (mouseIsPressed) {
    drawBrush(mouseX, mouseY);
  }
}

function keyPressed() {
  if (key >= '1' && key <= '4') {
    currentBrush = int(key);
    eraserMode = false; // Disable eraser when selecting a brush
  } else if (key === '5') {
    eraserMode = true; // Activate eraser
  } else if (key === 's') {
    brushSize += 10;
  } else if (key === 'd') {
    brushSize = max(2, brushSize - 10);
  } else if (key === 'x') {
    background(20);
  } else if (key === 'q') {
    currentColorSet = 1; // Purple
  } else if (key === 'w') {
    currentColorSet = 2; // Blue
  } else if (key === 'e') {
    currentColorSet = 3; // White/Beige
  }
}

function getColor() {
  if (eraserMode) {
    return color(20); // Eraser uses background color
  }
  if (currentColorSet === 1) {
    return color(random(100, 200), random(0, 100), random(150, 255)); // Purples
  } else if (currentColorSet === 2) {
    return color(random(0, 100), random(100, 200), random(200, 255)); // Blues
  } else {
    return color(random(220, 255), random(200, 240), random(180, 230), random(100, 200)); // White/Beige
  }
}

function drawBrush(x, y) {
  let brushColor = getColor();
  
  if (eraserMode) {
    stroke(brushColor);
    strokeWeight(brushSize);
    line(pmouseX, pmouseY, mouseX, mouseY);
    return;
  }
  
  switch (currentBrush) {
    case 1: // Vertical thin lines
      stroke(brushColor);
      strokeWeight(1);
      line(x, y - brushSize, x, y + brushSize);
      break;
    
    case 2: // Normal freehand drawing
      stroke(brushColor);
      strokeWeight(brushSize / 3);
      line(pmouseX, pmouseY, mouseX, mouseY);
      break;
    
    case 3: // Faded ellipses
      fill(brushColor);
      noStroke();
      ellipse(x, y, brushSize, brushSize);
      break;
    
    case 4: // Faded squares
      fill(brushColor);
      noStroke();
      rectMode(CENTER);
      rect(x, y, brushSize, brushSize);
      break;
  }
}
