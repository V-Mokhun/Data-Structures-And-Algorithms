export const binarySearch = (arr: number[], value: number) => {
  const helper = (start: number, end: number): number => {
    if (start > end) return -1;

    const mid = Math.floor(start + (end - start) / 2);
    if (arr[mid] === value) return mid;
    else if (arr[mid] < value) return helper(mid + 1, end);
    else return helper(start, mid - 1);
  };

  return helper(0, arr.length - 1);
};

console.log(binarySearch([3, 6, 8, 11, 23, 55, 399, 488], 399));
