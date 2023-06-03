export class SetArray<T extends { key: F }, F> {
  elements: T[];
  size = 0;

  private isGreater(key1: F, key2: F) {
    return key1 > key2;
  }

  constructor(X: T[] = []) {
    this.elements = X;
    this.size = X.length;
  }

  public insert(x: T) {
    const newArr = new Array(this.size + 1);
    for (let i = 0; i < this.size; i++) {
      newArr[i] = this.elements[i];
    }
    newArr[this.size] = x;

    this.elements = newArr;
    this.size++;
  }

  public delete(k: F) {
    const newArr = new Array(this.size - 1);

    let isFound = false;
    let deletedEl: T | null = null;

    for (let i = 0; i < this.size; i++) {
      if (this.elements[i].key == k) {
        isFound = true;
        deletedEl = this.elements[i];
        continue;
      }
      newArr[isFound ? i - 1 : i] = this.elements[i];
    }

    if (deletedEl) {
      this.elements = newArr;
      this.size--;
    }

    return deletedEl;
  }

  public find(k: F) {
    for (const element of this.elements) {
      if (element.key == k) return element;
    }

    return null;
  }

  public findMin() {
    if (this.size == 0) return null;

    let min = this.elements[0];

    for (let i = 1; i < this.size; i++) {
      if (this.isGreater(min.key, this.elements[i].key)) min = this.elements[i];
    }

    return min;
  }

  public findMax() {
    if (this.size == 0) return null;

    let max = this.elements[0];

    for (let i = 1; i < this.size; i++) {
      if (this.isGreater(this.elements[i].key, max.key)) max = this.elements[i];
    }

    return max;
  }

  public findPrev(k: F) {
    if (this.size == 0) return null;
    let item: T | null = null;

    for (let i = 0; i < this.size; i++) {
      if (this.isGreater(k, this.elements[i].key)) {
        if (item == null) {
          item = this.elements[i];
        } else if (this.isGreater(this.elements[i].key, item.key)) {
          item = this.elements[i];
        }
      }
    }

    return item;
  }

  public findNext(k: F) {
    if (this.size == 0) return null;
    let item: T | null = null;

    for (let i = 0; i < this.size; i++) {
      if (this.isGreater(this.elements[i].key, k)) {
        if (item == null) {
          item = this.elements[i];
        } else if (this.isGreater(item.key, this.elements[i].key)) {
          item = this.elements[i];
        }
      }
    }

    return item;
  }
}

/*
interface Item {
  item: number;
  key: number;
}

const arr = new SetArray<Item, Item["key"]>();

arr.insert({ item: 4, key: 23 });
arr.insert({ item: 9, key: 1 });
arr.insert({ item: 31, key: 93 });
arr.insert({ item: -21, key: 6 });

console.log(arr);

console.log(arr.find(93))
console.log("MAX: ", arr.findMax())
console.log("MIN: ", arr.findMin())
console.log("NEXT 6: ", arr.findNext(6))
console.log("PREV 6: ", arr.findPrev(6))

arr.delete(23);
console.log(arr);
*/
