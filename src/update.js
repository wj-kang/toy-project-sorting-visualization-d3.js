import config from './config.js';

export function update(dataset) {
  d3.select('#chart')
    .selectAll('rect')
    .data(dataset, (d) => d.value)
    .join('rect')
    .attr('width', (d) => d.width - 2)
    .attr('height', (d) => d.height)
    .attr('x', (d, idx) => d.width * idx)
    .attr('y', (d) => config.height - d.height)
    .attr('fill', 'blue');
}

export function updateWithDelay(dataset) {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(update(dataset)), config.transitionDelay);
  });
}
