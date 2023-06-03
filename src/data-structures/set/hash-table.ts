import { SetArray } from "./array";

/*
- build
- find(k)
- insert(x), delete(k)
- find_min(), find_max()
- find_prev(k), find_next(k)
*/

const BASE_CAPACITY = 16;

class HashTable<T extends { key: number }> {
  private prime = 2 ** 31 - 1;
  private randomNum = Math.floor(Math.random() * (this.prime - 1) + 1);
  private capacity: number;

  fill: number;
  array: Array<SetArray<T, number>>;

  private hash(key: number, max: number) {
    return ((this.randomNum * key) % this.prime) % max;
  }

  private addCapacity() {
    this.capacity *= 2;
    const tempArr = this.array;
    this.array = new Array(this.capacity);

    for (let i = 0; i < this.capacity; i++) {
      this.array[i] = new SetArray();
    }

    for (let i = 0; i < this.capacity / 2; i++) {
      for (let j = 0; j < tempArr[i].size; j++) {
        const item = tempArr[i].elements[j];
        const hashed = this.hash(item.key, this.capacity);
        this.array[hashed].insert(item);
      }
    }
  }

  private shrinkCapacity() {
    if (this.capacity == BASE_CAPACITY) return;

    this.capacity /= 2;
    const tempArr = this.array;
    this.array = new Array(this.capacity);

    for (let i = 0; i < this.capacity; i++) {
      this.array[i] = new SetArray();
    }

    for (let i = 0; i < this.capacity * 2; i++) {
      for (let j = 0; j < tempArr[i].size; j++) {
        const item = tempArr[i].elements[j];
        const hashed = this.hash(item.key, this.capacity);
        this.array[hashed].insert(item);
      }
    }
  }

  constructor(X: T[] = []) {
    this.array = new Array(BASE_CAPACITY);
    this.fill = 0;
    this.capacity = BASE_CAPACITY;

    for (let i = 0; i < this.capacity; i++) {
      this.array[i] = new SetArray();
    }

    for (const item of X) {
      this.insert(item);
    }
  }

  public insert(x: T) {
    this.fill++;
    if (this.fill > this.capacity * 2) {
      this.addCapacity();
    }

    const hashed = this.hash(x.key, this.capacity);

    this.array[hashed].insert(x);
  }

  public delete(key: number) {
    const hashed = this.hash(key, this.capacity);
    const item = this.array[hashed].delete(key);

    if (item) {
      this.fill--;
    }

    if (this.fill < this.capacity / 2 && this.capacity != BASE_CAPACITY) {
      this.shrinkCapacity();
    }

    return item;
  }

  public find(key: number) {
    const hashed = this.hash(key, this.capacity);
    return this.array[hashed].find(key);
  }

  public findMin() {
    let item: T | null = null;

    for (let i = 0; i < this.capacity; i++) {
      for (let j = 0; j < this.array[i].size; j++) {
        if (item == null) {
          item = this.array[i].elements[j];
        } else if (this.array[i].elements[j].key < item.key) {
          item = this.array[i].elements[j];
        }
      }
    }

    return item;
  }

  public findMax() {
    let item: T | null = null;

    for (let i = 0; i < this.capacity; i++) {
      for (let j = 0; j < this.array[i].size; j++) {
        if (item == null) {
          item = this.array[i].elements[j];
        } else if (this.array[i].elements[j].key > item.key) {
          item = this.array[i].elements[j];
        }
      }
    }

    return item;
  }

  public findPrev(key: number) {
    let item: T | null = null;

    for (let i = 0; i < this.capacity; i++) {
      for (let j = 0; j < this.array[i].size; j++) {
        const element = this.array[i].elements[j];
        if (element.key < key) {
          if (item == null) {
            item = element;
          } else if (item.key < element.key) {
            item = element;
          }
        }
      }
    }

    return item;
  }

  public findNext(key: number) {
    let item: T | null = null;

    for (let i = 0; i < this.capacity; i++) {
      for (let j = 0; j < this.array[i].size; j++) {
        const element = this.array[i].elements[j];
        if (element.key > key) {
          if (item == null) {
            item = element;
          } else if (item.key > element.key) {
            item = element;
          }
        }
      }
    }

    return item;
  }
}

interface Item {
  item: number;
  key: number;
}

const hashTable = new HashTable<Item>();

hashTable.insert({ item: 4, key: 93 });
hashTable.insert({ item: 8, key: 76 });
hashTable.insert({ item: 6, key: 12 });
hashTable.insert({ item: 2, key: 2 });
hashTable.insert({ item: 1, key: 60 });

hashTable.delete(76);
hashTable.delete(2);
hashTable.delete(60);

hashTable.insert({ item: 54, key: 49 });
hashTable.insert({ item: 143, key: 7 });
hashTable.insert({ item: 84, key: 69 });

console.log(hashTable);

console.log("Finding 49: ", hashTable.find(49));
console.log("Finding 47: ", hashTable.find(47));
console.log("Finding min: ", hashTable.findMin());
console.log("Finding max: ", hashTable.findMax());

console.log("Finding prev 93: ", hashTable.findPrev(93));
console.log("Finding next 93: ", hashTable.findNext(93));

console.log("Finding prev 7: ", hashTable.findPrev(7));
console.log("Finding next 7: ", hashTable.findNext(7));
