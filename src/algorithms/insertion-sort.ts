function insertionSort(array: number[]) {
  if (array.length == 0) return [];

	for(let i = 1; i < array.length; i++) {
		let j = i - 1;
		let element = array[i];

		while(j >= 0 && array[j] > element) {
			array[j + 1] = array[j];
			j--;
		}

		array[j + 1] = element;
	}

  return array;
}

const array = [5, 3, 8, 4, -4, 9, 0, -3];
console.log(insertionSort(array));

export { insertionSort };
