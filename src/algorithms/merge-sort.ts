const merge = (arr: number[], start: number, mid: number, end: number) => {
  const n = mid - start + 1;
  const m = end - mid;

	// const leftArr = arr.slice(start, mid + 1);
	// const rightArr = arr.slice(mid + 1, end + 1);
  const leftArr = new Array(n);
  const rightArr = new Array(m);

  for (let i = start; i < mid + 1; i++) {
    leftArr[i - start] = arr[i];
  }
  for (let i = mid+1; i < end + 1; i++) {
    rightArr[i - (mid + 1)] = arr[i];
  }
 
  let k = start,
    i = 0,
    j = 0;

  while (i < n && j < m) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }

  while (i < n) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }

  while (j < m) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
};

const mergeSort = (arr: number[], start: number, end: number) => {
  if (start < end) {
    const mid = start + Math.floor((end - start) / 2);

    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    merge(arr, start, mid, end);
  }
};

const array = [7, 5, 3, 8, 5, 234, 67, 84, 334, 13, 10];
mergeSort(array, 0, array.length - 1);
console.log(array);
