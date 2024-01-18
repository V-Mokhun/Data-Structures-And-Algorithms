const DEFAULT_CAPACITY = 4;

class DynamicArray {
  private capacity: number = DEFAULT_CAPACITY;
  private size: number = 0;
  private array: (number | undefined)[] = [];

  constructor(array: number[] = []) {
    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        this.insertAtEnd(array[i]);
      }
    }
  }

  private grow() {
    this.capacity *= 2;
    const newArr = new Array(this.capacity);
    for (let i = 0; i < this.array.length; i++) {
      newArr[i] = this.array[i];
    }
    this.array = newArr;
  }

  private shrink() {
    this.capacity = Math.max(this.capacity / 2, DEFAULT_CAPACITY);
    const newArr = new Array(this.capacity);
    for (let i = 0; i < this.size; i++) {
      newArr[i] = this.array[i];
    }
    this.array = newArr;
  }

  public getSize() {
    return this.size;
  }

	public getCapacity() {
		return this.capacity;
	}

  public toString() {
    return String(this.array.slice(0, this.size));
  }

  public insertAt(index: number, value: number) {
    if (index < 0 || index > this.size)
      throw new Error("Index must be in bounds!");

    const newArr = new Array(this.capacity);
    for (let i = 0; i < index; i++) {
      newArr[i] = this.array[i];
    }
    newArr[index] = value;
    for (let i = index + 1; i <= this.size; i++) {
      newArr[i] = this.array[i - 1];
    }

    this.size++;
    this.array = newArr;

    if (this.size === this.capacity) this.grow();
  }

  public insertAtBeginning(value: number) {
    this.insertAt(0, value);
  }

  public insertAtEnd(value: number) {
    this.insertAt(this.size, value);
  }

  public deleteAt(index: number) {
    if (index < 0 || index >= this.size)
      throw new Error("Index must be in bounds!");

    for (let i = index; i < this.size; i++) {
      this.array[i] = this.array[i + 1];
    }
    this.array[this.size - 1] = undefined;

    this.size--;

    if (this.size <= Math.floor(this.capacity / 4)) this.shrink();
  }

  public deleteFromBeginning() {
    this.deleteAt(0);
  }

  public deleteFromEnd() {
    this.deleteAt(this.size - 1);
  }

  public find(value: number) {
    for (let i = 0; i < this.size; i++) {
      if (this.array[i] === value) return i;
    }

    return -1;
  }
}

const dynamicArray = new DynamicArray([77,64,43,23,56]);
dynamicArray.insertAtBeginning(4);
dynamicArray.insertAtBeginning(2);
dynamicArray.insertAtBeginning(1);
dynamicArray.insertAtEnd(10);
dynamicArray.insertAtEnd(8);
dynamicArray.insertAt(3, 55);
console.log(dynamicArray.toString());
dynamicArray.deleteFromEnd();
dynamicArray.deleteFromBeginning();
dynamicArray.deleteAt(1);
dynamicArray.deleteAt(1);
dynamicArray.insertAtBeginning(31);
console.log(dynamicArray.toString());
