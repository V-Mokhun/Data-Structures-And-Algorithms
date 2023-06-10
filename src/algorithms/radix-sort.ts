import { countingSort, findMax } from "./counting-sort";

function radixSort(array: number[], base = 10) {
  let maxValue = findMax(array);

  let place = 1;
  while (Math.floor(maxValue / place) > 0) {
    array = countingSort(array, base, place);
    place *= 10;
  }

  return array;
}

console.log(radixSort([231, 94, 12, 9, 913, 4021, 548, 391, 76]));

