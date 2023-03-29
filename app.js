import config from './src/config.js';
import bubbleSort from './src/sortings/bubble-sort.js';
import shuffleArray from './src/sortings/shuffle.js';
import { update, updateWithDelay } from './src/update.js';

let dataset;
let timeoutIds = [];

function generateData(size) {
  let data = Array(Number(size))
    .fill(null)
    .map((_, i) => i + 1);

  shuffleArray(data, 'random');

  const cellWidth = config.width / size;
  const layoutData = data.map((el) => {
    return {
      value: el,
      width: cellWidth,
      height: (config.height / size) * el,
      selected: false,
      done: false,
    };
  });

  return layoutData;
}

dataset = generateData(document.querySelector('.menu__size').value);

// Init
function initChart() {
  d3.selectAll('#chart-wrapper svg')
    .attr('width', config.width)
    .attr('height', config.height);

  update(dataset);
}

function startSorting(algo) {
  switch (algo) {
    case 'bubble': {
      bubbleSort(dataset, update, updateWithDelay, timeoutIds);
    }
    case 'selection': {
    }
    case 'insertion': {
    }
    case 'merge': {
    }
    case 'quick': {
    }
  }
}

function clearTimeoutIds() {
  timeoutIds.forEach((id) => clearTimeout(id));
  timeoutIds = [];
}

function removeChart() {
  clearTimeoutIds();
  d3.select('#chart').selectAll('*').remove();
}

/* Input, Btn Handlers */
const algoSelect = document.querySelector('.menu__algo');
algoSelect.addEventListener('change', (e) => {
  console.log(e.target.value);
  enableBtns();
});

const sizeSelect = document.querySelector('.menu__size');
sizeSelect.addEventListener('change', (e) => {
  removeChart();
  dataset = generateData(e.target.value);
  update(dataset);
  enableBtns();
});

const shuffleBtn = document.querySelector('.menu__btn--shuffle');
shuffleBtn.addEventListener('click', () => {
  shuffleArray(dataset);
  update(dataset);
});

const startBtn = document.querySelector('.menu__btn--start');
startBtn.addEventListener('click', () => {
  startSorting(algoSelect.value);
  disableBtns();
});

function disableBtns() {
  startBtn.disabled = true;
  shuffleBtn.disabled = true;
}

function enableBtns() {
  startBtn.disabled = false;
  shuffleBtn.disabled = false;
}

// Init
initChart();
