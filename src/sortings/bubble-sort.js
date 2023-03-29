import swap from './swap.js';

export default async function bubbleSort(
  arr,
  update,
  updateWithDelay,
  timeoutIds
) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      arr[j].selected = true; // fill selected color
      arr[j + 1].selected = true; // fill selected color

      if (arr[j].value > arr[j + 1].value) {
        swap(arr, j, j + 1);
      }

      await updateWithDelay(arr, timeoutIds);
      arr[j].selected = false; // remove selected color
      arr[j + 1].selected = false; // remove selected color
    }

    arr[arr.length - i - 1].done = true; // fill done color
    update(arr);
  }
}
