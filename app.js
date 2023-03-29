import config from './src/config.js';
import bubbleSort from './src/sortings/bubble-sort.js';
import shuffleArray from './src/sortings/shuffle.js';
import { update, updateWithDelay } from './src/update.js';

let dataset;

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
    };
  });

  return layoutData;
}

dataset = generateData(document.querySelector('.menu__size').value);

// Init
function initCharts() {
  d3.selectAll('#chart-wrapper svg')
    .attr('width', config.width)
    .attr('height', config.height);

  update(dataset);
}

initCharts();

function startSorting(algo) {
  switch (algo) {
    case 'bubble': {
      bubbleSort(dataset, updateWithDelay);
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

/* Input, Btn Handlers */
const algoSelect = document.querySelector('.menu__algo');
algoSelect.addEventListener('change', (e) => {
  console.log(e.target.value);
});

const sizeSelect = document.querySelector('.menu__size');
sizeSelect.addEventListener('change', (e) => {
  dataset = generateData(e.target.value);
  update(dataset);
});

const startBtn = document.querySelector('.menu__btn--start');
startBtn.addEventListener('click', () => {
  startSorting(algoSelect.value);
});

const shuffleBtn = document.querySelector('.menu__btn--shuffle');
shuffleBtn.addEventListener('click', () => {
  shuffleArray(dataset);
  update(dataset);
});
