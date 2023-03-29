import swap from './swap.js';

export default async function selectionSort(
  arr,
  update,
  updateWithDelay,
  timeoutIds
) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    arr[minIdx].selected2 = true;

    for (let j = i + 1; j < arr.length; j++) {
      arr[j].selected = true;
      await updateWithDelay(arr, timeoutIds);

      if (arr[j].value < arr[minIdx].value) {
        arr[minIdx].selected2 = false;
        arr[j].selected2 = true;
        arr[j].selected = false;
        minIdx = j;
        await updateWithDelay(arr, timeoutIds);
      }
      arr[j].selected = false;
    }
    swap(arr, i, minIdx);
    arr[i].done = true; // fill done color
    await updateWithDelay(arr, timeoutIds);
  }

  arr[arr.length - 1].done = true;
  update(arr);
}
