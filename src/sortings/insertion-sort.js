import swap from './swap.js';

export default async function insertionSort(
  arr,
  update,
  updateWithDelay,
  timeoutIds
) {
  for (let i = 1; i < arr.length; i++) {
    let curr = i;

    arr[curr].selected2 = true;
    arr[curr - 1].selected = true;
    await updateWithDelay(arr, timeoutIds);

    while (curr > 0 && arr[curr - 1].value > arr[curr].value) {
      arr[curr - 1].selected = true;
      await updateWithDelay(arr, timeoutIds);

      swap(arr, curr - 1, curr);
      await updateWithDelay(arr, timeoutIds);

      arr[curr].selected = false;
      arr[curr - 1].selected2 = true;
      curr--;
    }

    if (curr > 0) {
      arr[curr - 1].selected = false;
      arr[curr - 1].selected2 = false;
    }

    arr[curr].selected = false;
    arr[curr].selected2 = false;
  }

  arr.forEach((el) => (el.done = true));
  update(arr);
}
