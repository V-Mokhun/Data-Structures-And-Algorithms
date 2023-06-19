type ItemWithKey = { key: number };

class BinaryHeap<T extends ItemWithKey> {
  items: T[] = [];
  size: number = 0;

  private maxHeapifyDown(i: number) {
    const left = this.leftChild(i);
    const right = this.rightChild(i);
    const largestChild =
      this.items[left].key > this.items[right].key ? left : right;

    if (this.items[i].key < this.items[largestChild].key) {
      let temp = this.items[i];
      this.items[i] = this.items[largestChild];
      this.items[largestChild] = temp;
      this.maxHeapifyDown(largestChild);
    }
  }

  private maxHeapifyUp(i: number) {
    const parent = this.parent(i);
    if (!this.items[parent]) return;

    if (this.items[parent].key < this.items[i].key) {
      let temp = this.items[parent];
      this.items[parent] = this.items[i];
      this.items[i] = temp;
      this.maxHeapifyUp(parent);
    }
  }

  private parent(i: number) {
    if (i < 0) return i;

    return Math.floor((i - 1) / 2);
  }

  private leftChild(i: number) {
    const l = 2 * i + 1;
    return l < this.size ? l : i;
  }

  private rightChild(i: number) {
    const r = 2 * i + 2;
    return r < this.size ? r : i;
  }

  constructor(X: T[] = []) {
    for (const item of X) {
      this.insert(item);
    }
  }

  public insert(x: T) {
    this.items.push(x);
    this.size++;

    if (this.size > 1) this.maxHeapifyUp(this.size - 1);
  }

  public deleteMax() {
    if (this.size == 0) return null;
    if (this.size == 1) return this.items.shift();

    let temp = this.items[0];
    this.items[0] = this.items[this.size - 1];
    this.items[this.size - 1] = temp;
    const deleted = this.items.pop();
    this.size--;
    this.maxHeapifyDown(0);
    return deleted;
  }
}

type Item = ItemWithKey & { item: number };

const binaryHeap = new BinaryHeap<Item>([
  { key: 7, item: 20 },
  { key: 3, item: 1 },
  { key: 5, item: 4 },
  { key: 6, item: 6 },
  { key: 2, item: 9 },
  { key: 0, item: -43 },
  { key: 4, item: 97 },
  { key: 1, item: 0 },
  { key: 9, item: 41 },
  { key: -2, item: 89 },
]);

console.log(binaryHeap.items);

binaryHeap.deleteMax();
binaryHeap.deleteMax();

console.log(binaryHeap.items);

binaryHeap.insert({ key: 100, item: 2 });
binaryHeap.insert({ key: -1, item: 2 });

console.log(binaryHeap.items);
