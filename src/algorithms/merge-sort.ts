function merge<T extends { key: number }>(
  array: T[] | number[],
  start: number,
  endFirst: number,
  endSecond: number
) {
  const firstArrayLength = endFirst - start + 1;
  const secondArrayLength = endSecond - endFirst;

  const firstArray: T[] | number[] = new Array(firstArrayLength);
  const secondArray: T[] | number[] = new Array(secondArrayLength);

  for (let i = 0; i < firstArrayLength; i++) {
    firstArray[i] = array[i + start];
  }

  for (let i = 0; i < secondArrayLength; i++) {
    secondArray[i] = array[i + endFirst + 1];
  }

  let i = 0,
    j = 0,
    k = start;

  while (i < firstArrayLength && j < secondArrayLength) {
    if (typeof firstArray[i] == "number" && typeof secondArray[i] == "number") {
      if (firstArray[i] < secondArray[j]) {
        array[k] = firstArray[i];
        i++;
      } else {
        array[k] = secondArray[j];
        j++;
      }
    } else {
      if ((firstArray[i] as T).key < (secondArray[j] as T).key) {
        array[k] = firstArray[i];
        i++;
      } else {
        array[k] = secondArray[j];
        j++;
      }
    }

    k++;
  }

  while (i < firstArrayLength) {
    array[k] = firstArray[i];
    i++;
    k++;
  }

  while (j < secondArrayLength) {
    array[k] = secondArray[j];
    j++;
    k++;
  }
}

function mergeSort<T extends { key: number }>(
  array: T[] | number[],
  start: number,
  end: number
) {
  if (start >= end) return;

  const mid = Math.floor((end + start) / 2);
  mergeSort(array, start, mid);
  mergeSort(array, mid + 1, end);
  merge(array, start, mid, end);
}

const array = [5, 3, 8, 4, -4, 9, 0, -3];
mergeSort(array, 0, array.length - 1);
// console.log(array)

export { mergeSort };
