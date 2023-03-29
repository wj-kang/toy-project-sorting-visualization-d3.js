export default function shuffleArray(arr, option = 'random') {
  if (option === 'random') {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
}
