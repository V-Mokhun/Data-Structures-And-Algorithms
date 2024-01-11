class Node {
  item;
  next: Node | null;

  constructor(item: number, next = null) {
    this.item = item;
    this.next = next;
  }
}

class LinkedList {
  size: number;
  head: Node | null;

  constructor() {
    this.size = 0;
    this.head = null;
  }

  add(item: number) {
    if (!this.head) {
      this.head = new Node(item);
    } else {
      const temp = this.head;
      this.head = new Node(item);
      this.head.next = temp;
    }

    this.size++;
  }
}
