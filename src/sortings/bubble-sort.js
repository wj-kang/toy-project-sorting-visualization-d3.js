import swap from './swap.js';

export default function bubbleSort(arr) {
  // loop through and check every index comparing adjacent index
  for (let i = 0; i < arr.length; i++) {
    let isSwapped = false;
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        isSwapped = true;
      }
    }
    if (!isSwapped) {
      // return right away
      return arr;
    }
  }

  return arr;
}
