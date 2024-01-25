class MinBinaryHeap {
  private size = 0;
  private heap: number[] = [];

  constructor(arr: number[] = []) {
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        this.insert(arr[i]);
      }
    }
  }

  private getParent(index: number) {
    return Math.ceil(index / 2) - 1;
  }

  private getLeftChild(index: number) {
    return index * 2 + 1;
  }

  private getRightChild(index: number) {
    return index * 2 + 2;
  }

  private swap(index1: number, index2: number) {
    let temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  private heapifyUp(index: number) {
    if (index < 0 || index >= this.size) return;

    const parentIdx = this.getParent(index);
    if (parentIdx < 0) return;
    if (this.heap[index] < this.heap[parentIdx]) {
      this.swap(index, parentIdx);
      this.heapifyUp(parentIdx);
    }
  }

  private heapifyDown(index: number) {
    if (index < 0 || index >= this.size) return;

    const element = this.heap[index];
    const leftChildIdx = this.getLeftChild(index);
    const rightChildIdx = this.getRightChild(index);

    if (leftChildIdx >= this.size) return;
    if (rightChildIdx >= this.size) {
      if (this.heap[leftChildIdx] < this.heap[index]) {
        this.swap(index, leftChildIdx);
        this.heapifyDown(leftChildIdx);
      }
      return;
    }

    const smallerChildIdx =
      this.heap[leftChildIdx] < this.heap[rightChildIdx]
        ? leftChildIdx
        : rightChildIdx;
    const smallerChild = this.heap[smallerChildIdx];

    if (element < smallerChild) return;

    this.swap(index, smallerChildIdx);
    this.heapifyDown(smallerChildIdx);
  }

  getSize() {
    return this.size;
  }

  getMin() {
    if (this.size === 0) return null;

    return this.heap[0];
  }

  toString() {
    return this.heap.toString();
  }

  pop() {
    if (this.size === 0) throw new Error("Heap is empty!");

    this.swap(0, this.size - 1);
    const minValue = this.heap.pop();
    this.size--;
    this.heapifyDown(0);

    return minValue;
  }

  insert(value: number) {
    this.heap.push(value);
    this.size++;
    this.heapifyUp(this.size - 1);
  }
}

const binaryHeap = new MinBinaryHeap([1, 3, 6, 5, 9, 8]);
binaryHeap.insert(4);
binaryHeap.insert(2);
console.log(binaryHeap.toString());
binaryHeap.pop();
binaryHeap.pop();
console.log("MIN: ", binaryHeap.getMin(), "SIZE: ", binaryHeap.getSize());
console.log(binaryHeap.toString());
