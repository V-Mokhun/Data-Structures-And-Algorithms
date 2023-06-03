function getMax<T extends { key: number }>(X: T[]) {
  if (X.length == 0) return null;

  let max = X[0];
  for (const item of X) {
    if (item.key > max.key) max = item;
  }

  return max.key;
}

class DirectAccessArray<T extends { key: number }> {
  elements: (T | undefined)[];
  size = 0;

  private isGreater(key1: number, key2: number) {
    return key1 > key2;
  }

  private reconstruct(k: number) {
    const newArr = new Array(k + 1);
    for (let i = 0; i <= k; i++) {
      if (this.elements[i]) {
        newArr[i] = this.elements[i];
      }
    }

    this.elements = newArr;
    this.size = k + 1;
  }

  constructor(X: T[] = []) {
    this.elements = X;
    this.size = getMax<T>(X) ?? 0;
  }

  public insert(x: T) {
    if (this.size < x.key) {
      this.reconstruct(x.key);
    }

    this.elements[x.key] = x;
  }

  public delete(k: number) {
    if (this.size < k) return null;

    const deletedEl = this.elements[k];
    this.elements[k] = undefined;

    return deletedEl;
  }

  public find(k: number) {
    return this.elements[k];
  }

  public findMin() {
    if (this.size == 0) return null;

    let min = undefined;

    for (let i = 0; i < this.size; i++) {
      if (this.elements[i] != undefined) {
        if (min == undefined) min = this.elements[i];
        else if (this.isGreater(min.key, this.elements[i]!.key))
          min = this.elements[i];
      }
    }

    return min;
  }

  public findMax() {
    if (this.size == 0) return null;

    let max = undefined;

    for (let i = 0; i < this.size; i++) {
      if (this.elements[i] != undefined) {
        if (max == undefined) max = this.elements[i];
        else if (this.isGreater(this.elements[i]!.key, max.key))
          max = this.elements[i];
      }
    }

    return max;
  }

  public findPrev(k: number) {
    if (this.size == 0) return null;
    let item: T | undefined = undefined;

    for (let i = 0; i < this.size; i++) {
      if (this.elements[i]) {
        if (this.isGreater(k, this.elements[i]!.key)) {
          if (item == null) {
            item = this.elements[i];
          } else if (this.isGreater(this.elements[i]!.key, item.key)) {
            item = this.elements[i];
          }
        }
      }
    }

    return item;
  }

  public findNext(k: number) {
    if (this.size == 0) return null;
    let item: T | undefined = undefined;

    for (let i = 0; i < this.size; i++) {
      if (this.elements[i]) {
        if (this.isGreater(this.elements[i]!.key, k)) {
          if (item == null) {
            item = this.elements[i];
          } else if (this.isGreater(item.key, this.elements[i]!.key)) {
            item = this.elements[i];
          }
        }
      }
    }

    return item;
  }
}

const arr = new DirectAccessArray<{ item: number; key: number }>();

arr.insert({ item: 4, key: 23 });
arr.insert({ item: 9, key: 1 });
arr.insert({ item: 31, key: 93 });
arr.insert({ item: -21, key: 6 });

console.log(arr);

console.log(arr.find(93));
console.log("MAX: ", arr.findMax());
console.log("MIN: ", arr.findMin());
console.log("NEXT 6: ", arr.findNext(6));
console.log("PREV 6: ", arr.findPrev(6));

arr.delete(23);
console.log(arr);

export {}
