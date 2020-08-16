let canvas;
let ctx;
const $ = (selector, all = true) => (
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
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'green';
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

const initApp = () => {
  canvas = $('#canvas', false);
  ctx = canvas.getContext('2d');
  setupPaintEvents();
};

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    initApp();
  }
});
