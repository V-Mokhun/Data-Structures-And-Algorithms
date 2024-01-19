class Queue {
  private size = 0;
  private queue: number[] = [];

  constructor(arr: number[] = []) {
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        this.enqueue(arr[i]);
      }
    }
  }

  public toString() {
    return String(this.queue);
  }

  public isEmpty() {
    return this.size === 0;
  }

  public getSize() {
    return this.size;
  }

	// O(1)
  public enqueue(value: number) {
    this.queue.unshift(value);
    this.size++;
  }

	// O(1)
  public dequeue() {
    if (this.isEmpty()) throw new Error("Queue is empty!");

    this.queue.pop();
    this.size--;
  }

	// O(1)
  public peek() {
    return this.queue.at(-1);
  }
}

const queue = new Queue([4, 6, 31, 7]);
console.log(queue.toString());
queue.enqueue(99);
queue.enqueue(31);
queue.dequeue();
queue.dequeue();
queue.dequeue();
console.log(queue.peek());
console.log(queue.toString());
