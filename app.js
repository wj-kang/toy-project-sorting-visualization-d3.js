import config from './src/config.js';

import bubbleSort from './src/sortings/bubble-sort.js';
import selectionSort from './src/sortings/selection-sort.js';
import insertionSort from './src/sortings/insertion-sort.js';

import shuffleArray from './src/sortings/shuffle.js';
import { update, updateWithDelay } from './src/update.js';

let dataset;
let timeoutIds = [];

function generateData(_size) {
  const size = Number(_size);
  let data = Array(size)
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
      selected2: false,
      done: false,
    };
  });

  return layoutData;
}

/* Init/Reset */
function clearTimeoutIds() {
  timeoutIds.forEach((id) => clearTimeout(id));
  timeoutIds = [];
}

function removeChart() {
  d3.select('#chart').selectAll('*').remove();
}

function initChart() {
  d3.selectAll('#chart-wrapper svg')
    .attr('width', config.width)
    .attr('height', config.height);

  dataset = generateData(document.querySelector('.menu__size').value);
  update(dataset);
}

function resetChart() {
  clearTimeoutIds();
  removeChart();
  initChart();
  enableBtns();
}

function startSorting(algo) {
  switch (algo) {
    case 'bubble': {
      return bubbleSort(dataset, update, updateWithDelay, timeoutIds);
    }
    case 'selection': {
      return selectionSort(dataset, update, updateWithDelay, timeoutIds);
    }
    case 'insertion': {
      return insertionSort(dataset, update, updateWithDelay, timeoutIds);
    }
  }
}

/* Input Handlers */
const algoSelect = document.querySelector('.menu__algo');
// algoSelect.addEventListener('change', (e) => {
//   resetChart();
// });

const sizeSelect = document.querySelector('.menu__size');
sizeSelect.addEventListener('change', (e) => {
  resetChart();
});

/* Btn Handlers */
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

const resetBtn = document.querySelector('.menu__btn--reset');
resetBtn.addEventListener('click', () => {
  resetChart();
});

function disableBtns() {
  algoSelect.disabled = true;
  sizeSelect.disabled = true;
  startBtn.disabled = true;
  shuffleBtn.disabled = true;
  document.querySelector('.menu__btn--reset').classList.add('on');
}

function enableBtns() {
  algoSelect.disabled = false;
  sizeSelect.disabled = false;
  startBtn.disabled = false;
  shuffleBtn.disabled = false;
  document.querySelector('.menu__btn--reset').classList.remove('on');
}

// Init
initChart();
