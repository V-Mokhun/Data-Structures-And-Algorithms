import { mergeSort } from "../../algorithms/merge-sort";

class SortedArray<T extends { key: number }> {
  elements: T[] = [];
  size = 0;

  private raiseLengthError() {
    throw new Error("Index must be less than length!");
  }

  private raiseNegativeIndexError() {
    throw new Error("Index can't be less than 0!");
  }

  private get_at(i: number) {
    if (i < 0) this.raiseNegativeIndexError();

    return this.elements[i] as T;
  }

  private insert_at(i: number, x: T) {
    if (this.size < i) this.raiseLengthError();
    if (i < 0) this.raiseNegativeIndexError();

    const new_array = new Array(this.size + 1);

    for (let j = 0; j < i; j++) {
      new_array[j] = this.get_at(j);
    }
    new_array[i] = x;

    for (let j = i + 1; j < this.size + 1; j++) {
      new_array[j] = this.get_at(j - 1);
    }

    this.elements = new_array;
    this.size += 1;
  }

  private delete_at(i: number) {
    if (this.size <= i) this.raiseLengthError();
    if (i < 0) this.raiseNegativeIndexError();

    const deletedEl = this.get_at(i);
    const new_array = new Array(this.size - 1);

    for (let j = 0; j < i; j++) {
      new_array[j] = this.get_at(j);
    }

    for (let j = i + 1; j < this.size; j++) {
      new_array[j - 1] = this.get_at(j);
    }

    this.elements = new_array;
    this.size -= 1;

    return deletedEl;
  }

  private binarySearch(key: number, start: number, end: number): number {
    if (start >= end) return start;

    const mid = Math.floor((start + end) / 2);
    const element = this.elements[mid];

    if (element.key == key) return mid;
    else if (element.key < key) return this.binarySearch(key, mid + 1, end);
    else return this.binarySearch(key, start, mid - 1);
  }

  constructor(X: T[] = []) {
    mergeSort(X, 0, X.length - 1);
    this.elements = X;
    this.size = X.length;
  }

  public find(key: number) {
    if (this.size == 0) return null;

    const index = this.binarySearch(key, 0, this.size - 1);
    const element = this.elements[index];

    if (element.key == key) return element;

    return null;
  }

  public findPrev(key: number) {
    if (this.size == 0) return null;

    const index = this.binarySearch(key, 0, this.size - 1);
    const element = this.elements[index];

    if (element.key < key) return element;
    if (index > 0) return this.elements[index - 1];

    return null;
  }

  public findNext(key: number) {
    if (this.size == 0) return null;

    const index = this.binarySearch(key, 0, this.size - 1);
    const element = this.elements[index];

    if (element.key > key) return element;
    if (index < this.size - 1) return this.elements[index + 1];

    return null;
  }

  public findMin() {
    if (this.size == 0) return null;

    return this.elements[0];
  }

  public findMax() {
    if (this.size == 0) return null;

    return this.elements[this.size - 1];
  }

  public insert(x: T) {
    if (this.size == 0) {
      this.insert_at(0, x);
    } else {
      const index = this.binarySearch(x.key, 0, this.size - 1);
      const element = this.elements[index];

      if (element.key == x.key) this.elements[index] = x;
      else if (x.key > element.key) this.insert_at(index + 1, x);
      else this.insert_at(index, x);
    }
  }

  public delete(key: number) {
    if (this.size == 0) return null;

    const index = this.binarySearch(key, 0, this.size - 1);
    const element = this.elements[index];

    if (element.key == key) return this.delete_at(index);

    return null;
  }
}

interface Item {
  item: number;
  key: number;
}

const array = new SortedArray<Item>([
  { item: 5, key: 21 },
  { item: 83, key: -2 },
  { item: 92, key: 8 },
  { item: 229, key: 75 },
  { item: 92, key: 50 },
]);

array.insert({ item: 93, key: -6 });
array.insert({ item: 84, key: 54 });
array.insert({ item: 7, key: 230 });

console.log("--- FIND ---");

console.log(array.findMax());
console.log(array.findMin());
console.log(array.find(-2));
console.log(array.find(-3));

array.delete(50);
array.delete(-6);
array.delete(230);
array.delete(91);

console.log("--- FIND PREV ---");

console.log(array.findPrev(10));
console.log(array.findPrev(-5));
console.log(array.findPrev(80));

console.log("--- FIND NEXT ---");

console.log(array.findNext(10));
console.log(array.findNext(-5));
console.log(array.findNext(80));
