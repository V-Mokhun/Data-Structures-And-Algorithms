export function findMax(array: number[]) {
  let max = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) max = array[i];
  }

  return max;
}

function accumSum(array: number[]) {
  for (let i = 1; i < array.length; i++) {
    array[i] += array[i - 1];
  }

  return array;
}

// array from 0 to n
export function countingSort(array: number[], base = 10, place = 1) {
  if (array.length == 0) return array;

  let countArray: number[] = new Array(base).fill(0);

  for (let i = 0; i < array.length; i++) {
    countArray[Math.floor(array[i] / place) % 10] += 1;
  }

  countArray = accumSum(countArray);

  const finalArray = new Array(array.length).fill(0);
  let i = array.length - 1;
  while (i >= 0) {
    const index = Math.floor(array[i] / place) % 10;
    finalArray[countArray[index] - 1] = array[i];
    countArray[index] -= 1;
    i--;
  }

  return finalArray;
}

console.log(countingSort([7, 4, 3, 0, 3, 2, 1, 5, 7, 3, 9, 2, 4]));
