import config from './config.js';

export function update(dataset) {
  d3.select('#chart')
    .selectAll('rect')
    .data(dataset, (d) => d.value)
    .join('rect')
    .transition()
    .duration(config.transitionDuration)
    .attr('width', (d) => d.width - 2)
    .attr('height', (d) => d.height)
    .attr('x', (d, idx) => d.width * idx)
    .attr('y', (d) => config.height - d.height)
    .attr('fill', (d) => {
      if (d.done) {
        return '#00e5a0';
      } else if (d.selected) {
        return 'brown';
      }
      return '#aaa';
    });
}

export function updateWithDelay(dataset, timeoutIds) {
  return new Promise((resolve, _) => {
    timeoutIds.push(
      setTimeout(() => {
        resolve(update(dataset));
      }, config.transitionDelay)
    );
  });
}
