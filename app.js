import config from './src/config.js';

function generateData(size) {
  const data = Array(Number(size))
    .fill(null)
    .map((_, i) => i + 1);

  const cellWidth = config.width / size;

  const layoutData = data.map((el, idx) => {
    return {
      value: el,
      width: cellWidth,
      height: (config.height / size) * el,
    };
  });

  return layoutData;
}

function update(dataset) {
  d3.select('#chart')
    .selectAll('rect')
    .data(dataset)
    .join('rect')
    .attr('width', (d) => d.width - 2)
    .attr('height', (d) => d.height)
    .attr('x', (d, idx) => d.width * idx)
    .attr('y', (d) => config.height - d.height)
    .attr('fill', 'blue');
}

const dataset = generateData(document.querySelector('.menu__size').value);
update(dataset);
