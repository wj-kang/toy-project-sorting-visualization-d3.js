import swap from './swap.js';

export default async function bubbleSort(arr, updateCallback) {
  // loop through and check every index comparing adjacent index
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j].value > arr[j + 1].value) {
        swap(arr, j, j + 1);
      }
      await updateCallback(arr);
    }
  }
}
