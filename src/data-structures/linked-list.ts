class Node {
  item;
  next: Node | null;

  constructor(item: number, next = null) {
    this.item = item;
    this.next = next;
  }
}

// Implementation without tail, with tail I'd also add addToEnd, deleteFromEnd and it would take O(1) time

export class LinkedList {
  private size: number;
  private head: Node | null;

  constructor() {
    this.size = 0;
    this.head = null;
  }

  public getHead() {
    return this.head;
  }

  public getSize() {
    return this.size;
  }

  public toString() {
    let str = "",
      temp = this.head;

    while (temp !== null) {
      if (temp.next === null) {
        str += `${temp.item}`;
      } else {
        str += `${temp.item} -> `;
      }

      temp = temp.next;
    }

    return str;
  }

  // O(n)
  find(item: number): Node | null {
    if (!this.head) throw new Error("List is empty!");

    let temp: Node | null = this.head;
    while (temp != null && temp.item !== item) {
      temp = temp.next;
    }

    return temp;
  }

  // O(n)
  findPrev(item: number): Node | null {
    if (!this.head) throw new Error("List is empty!");

    let temp: Node | null = this.head;
    while (temp != null && temp.next?.item !== item) {
      temp = temp.next;
    }

    return temp;
  }

  // O(n)
  findNext(item: number): Node | null {
    if (!this.head) throw new Error("List is empty!");

    let temp: Node | null = this.head;
    while (temp != null && temp.item !== item) {
      temp = temp.next;
    }

    if (temp === null) throw new Error("Node does not exist!");

    return temp.next;
  }

  // O(1)
  add(item: number) {
    if (this.head === null) {
      this.head = new Node(item);
    } else {
      const temp = this.head;
      this.head = new Node(item);
      this.head.next = temp;
    }

    this.size++;
  }

  // O(1)
  deleteFromBeginning() {
    if (this.head === null) throw new Error("List is empty!");
    this.head = this.head.next;
    this.size--;
  }

  // O(n)
  remove(item: number) {
    if (this.head === null) throw new Error("List is empty!");

    if (this.head.item === item) {
      this.head = this.head.next;
      this.size--;
    } else {
      const prevNodeToRemove = this.findPrev(item);
      if (prevNodeToRemove === null) throw new Error("Node does not exist!");
      prevNodeToRemove.next = prevNodeToRemove.next?.next ?? null;
      this.size--;
    }
  }

  // O(n)
  insertAfter(searchedItem: number, node: Node) {
    if (this.head === null) throw new Error("List is empty!");

    const searchedNode = this.find(searchedItem);
    if (!searchedNode) throw new Error("Node does not exist!");

    node.next = searchedNode.next;
    searchedNode.next = node;
    this.size++;
  }

  // O(n)
  insertBefore(searchedItem: number, node: Node) {
    if (this.head === null) throw new Error("List is empty!");

    if (this.head.item === searchedItem) {
      node.next = this.head;
      this.head = node;
      this.size++;
    } else {
      const prevSearchedNode = this.findPrev(searchedItem);
      if (prevSearchedNode === null) throw new Error("Node does not exist!");
      node.next = prevSearchedNode.next;
      prevSearchedNode.next = node;
      this.size++;
    }
  }
}

const linkedList = new LinkedList();
linkedList.add(4);
linkedList.insertAfter(4, new Node(9));
linkedList.insertBefore(9, new Node(2));
linkedList.insertBefore(4, new Node(3));
console.log(linkedList.toString());
linkedList.add(10);
linkedList.remove(4);
console.log(linkedList.toString());
console.log(linkedList.getSize());
