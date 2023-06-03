class DynamicArray<T> {
	private capacity: number;

	array: (T|undefined)[];
	fill: number;

	private addSpace() {
		this.capacity *= 2;
		const tempArr = this.array;
		this.array = new Array(this.capacity);
		for(let i = 0; i < this.capacity; i++) {
			this.array[i] = tempArr[i];
		}
	}

	private removeSpace() {
		this.capacity /= 2;
		const tempArr = this.array;
		this.array = new Array(this.capacity);
		for(let i = 0; i < this.capacity; i++) {
			this.array[i] = tempArr[i];
		}
	}

  constructor() {
    this.array = new Array(2);
    this.capacity = 2;
    this.fill = 0;
  }
	
	public insert_last(x: T) {
		if(this.fill >= this.capacity / 2) this.addSpace();

		this.array[this.fill] = x;
		this.fill++;
	}

	public delete_last() {
		this.fill--;
		if(this.fill < this.capacity / 4) this.removeSpace();
		const lastEl = this.array[this.fill];

		return lastEl;
	}

	public insert_at(i: number, x: T) {
		if(i > this.fill) throw new Error("Invalid index!");
		if(this.fill >= this.capacity / 2) this.addSpace();

		const arr = new Array(this.capacity);
		for(let j = 0; j < i; j++) {
			arr[j] = this.array[j];
		}
		arr[i] = x;
		for(let j = i + 1; j <= this.fill; j++) {
			arr[j] = this.array[j - 1];
		}

		this.array = arr;
		this.fill++;
	}

	public delete_at(i: number) {
		if(i >= this.fill) throw new Error("Invalid index!");
		const removedEl = this.array[i];

		this.fill--;
		if(this.fill < this.capacity / 4) this.removeSpace();

		const newArr = new Array(this.capacity);
		for(let j = 0; j < i; j++) {
			newArr[j] = this.array[j];
		}
		for(let j = i; j < this.fill; j++) {
			newArr[j] = this.array[j + 1];
		}

		this.array = newArr;
		return removedEl;
	}

	public insert_first(x: T) {
		this.insert_at(0, x);
	}

	public delete_first() {
		return this.delete_at(0);
	}

	public get size(){
		return this.fill;
	}

	public get elements() {
		const arr = new Array(this.fill);
		for(let i = 0; i < this.fill; i++) {
			arr[i] = this.array[i];
		}
		return arr;
	}
}

const array = new DynamicArray<number>();
array.insert_last(5)
array.insert_last(7)
array.insert_last(2)
array.insert_last(1)
array.insert_last(9)

// console.log(array.elements);

array.delete_last();
array.delete_last();

// console.log(array.elements);

array.insert_at(1, 3);
array.insert_at(4, 1);

// console.log(array.elements);

array.delete_at(3);
array.delete_at(1);

// console.log(array.elements);

array.insert_first(0);
array.insert_first(10);

// console.log(array.elements);

array.delete_first()

console.log(array);

export {}
