const swap = (arr: number[], index1: number, index2: number) => {
	let temp = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = temp;
}

const partition = (arr: number[], low: number, high: number) => {
	let i = low;
	let pivot = arr[high];
	for(let j = low; j < high; j++) {
		if(arr[j] <= pivot) {
			swap(arr, i, j);
			i++;
		}
	}	
	swap(arr, i, high);
	return i;
}

const randomizedPartition = (arr: number[], low: number, high: number) => {
	// random number between low and high inclusive
	const randomNum = Math.floor(Math.random() * (high - low + 1)) + low;
	swap(arr, randomNum, high)	
	return partition(arr, low, high)
}

const quickSort = (arr: number[], low: number, high: number) => {
	if(low < high) {
		const pivot = randomizedPartition(arr, low, high);
		quickSort(arr, low, pivot - 1);
		quickSort(arr, pivot + 1, high);
	}
}

const arr = [7, 5, 3, 8, 5, 234, 67, 84, 334, 13, 10];
quickSort(arr, 0, arr.length - 1)
console.log(arr);
