let canvas;
let ctx;
let pointWidthSlider;
let pointWidthLabel;
let pointWidth;
let pointColorInput;
let pointColor;
const $ = (selector, all = false) => (
  all ?
    document.querySelectorAll(selector) :
    document.querySelector(selector)
);

const getMousePoisition = (event) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
};

const draw = ({ x, y }) => {
  ctx.lineTo(x, y);
  ctx.stroke();
};

const beginToDraw = ({ x, y }) => {
  ctx.lineWidth = pointWidth;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y);
  draw({ x, y });
};

const setupPaintEvents = () => {
  let mouseIsDown = false;
  canvas.addEventListener('mousedown', (event) => {
    mouseIsDown = true;
    beginToDraw(getMousePoisition(event));
  });
  canvas.addEventListener('mousemove', (event) => {
    if (mouseIsDown) {
      draw(getMousePoisition(event));
    }
  });
  canvas.addEventListener('mouseup', () => {
    mouseIsDown = false;
  });
  canvas.addEventListener('mouseleave', () => {
    mouseIsDown = false;
  });
};

const refreshPointWidth = () => {
  pointWidth = pointWidthSlider.value;
  pointWidthLabel.innerHTML = pointWidth;
};

const setupPointWidthEvents = () => {
  pointWidthSlider.addEventListener('change', refreshPointWidth);
  refreshPointWidth();
};

const refreshPointColor = () => {
  pointColor = pointColorInput.value;
  ctx.strokeStyle = pointColor;
};

const setupPointColorEvents = () => {
  pointColorInput.addEventListener('change', refreshPointColor);
  refreshPointColor();
};

const initApp = () => {
  canvas = $('#canvas');
  ctx = canvas.getContext('2d');
  pointWidthSlider = $('#pointWidth');
  pointWidthLabel = $('#pointWidthLabel');
  pointColorInput = $('#pointColor');
  setupPointWidthEvents();
  setupPaintEvents();
  setupPointColorEvents();
};

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    initApp();
  }
});
