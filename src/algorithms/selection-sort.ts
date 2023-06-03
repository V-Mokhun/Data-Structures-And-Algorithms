function selectionSort(array: number[]) {
  if (array.length == 0) return [];

	for(let i = 0; i < array.length; i++) {
		let min = array[i];
		let element = array[i];
		let swappedIndex = i;

		for(let j = i + 1; j < array.length; j++) {
			if(array[j] < min) {
				min = array[j];
				swappedIndex = j;
			}
		}

		array[i] = min;
		array[swappedIndex] = element;
	}

	return array;
}

const array = [5, 3, 8, 4, -4, 9, 0, -3];
console.log(selectionSort(array));

export { selectionSort };
