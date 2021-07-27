// Initial Data
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;
let currentLineSize = 2;
let minLineSize = 1;
let maxLineSize = 10;

let colorInput = document.querySelector('#color');
let hexInput = document.querySelector('#hex');
let screen = document.querySelector('#tela');
let context = screen.getContext('2d');

// Events
document.querySelectorAll('.colorArea .color').forEach(item => {
  item.addEventListener('click', colorClickEvent);
});

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);
document.querySelector('#btnPlus').addEventListener('click', increaseLine);
document.querySelector('#btnLess').addEventListener('click', decreaseLine);

colorInput.addEventListener('input', () => {
  let color = colorInput.value;
  hexInput.value = color
  document.querySelector('.palette').dataset.color = color;
  document.querySelector('.palette').style.backgroundColor = color;
});

// Functions
function colorClickEvent(e) {
  let color = e.target.getAttribute('data-color');
  currentColor = color;

  document.querySelector('.color.active').classList.remove('active');
  e.target.classList.add('active');
}

function mouseDownEvent(e) {
  canDraw = true;
  mouseX = e.pageX - screen.offsetLeft;
  mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
  if(canDraw) {
     draw(e.pageX, e.pageY)
  }
}

function mouseUpEvent() {
  canDraw = false;
}

function draw(x, y) {
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;

  context.beginPath();
  context.lineWidth = currentLineSize;
  context.lineJoin = "miter"; /* Line format */
  context.moveTo(mouseX, mouseY);
  context.lineTo(pointX, pointY);
  context.closePath();
  context.strokeStyle = currentColor;
  context.stroke();

  mouseX = pointX;
  mouseY = pointY;
}

function clearScreen() {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function increaseLine() {

  if (currentLineSize < maxLineSize) {
      currentLineSize ++;
  } else {
    swal("Limite alcançado!", "Linha está em seu valor máximo de espessura!", "warning");
  }

}

function decreaseLine() {

  if (currentLineSize < minLineSize) {
    swal("Limite alcançado!", "Linha está em seu valor mínimo de espessura!", "warning");
    currentLineSize = 1;
  } else {
    currentLineSize -= 1;
  }

}
