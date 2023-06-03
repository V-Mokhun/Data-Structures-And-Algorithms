interface TLinkedListNode<T> {
  next: LinkedListNode<T> | null;
  item: T;
  nextNode(i: number): LinkedListNode<T> | null;
}

interface TLinkedList<T> {
  head: LinkedListNode<T> | null;
  size: number;
  get_at: (i: number) => T | null;
  set_at(i: number, x: T): void;
  insert_first(x: T): void;
  delete_first(): T;
  insert_last(x: T): void;
  delete_last(): T;
  insert_at(i: number, x: T): void;
  delete_at(i: number): T;
}

class LinkedListNode<T> implements TLinkedListNode<T> {
  next: LinkedListNode<T> | null;
  item: T;

  constructor(x: T) {
    this.next = null;
    this.item = x;
  }

  public nextNode(i: number): LinkedListNode<T> | null {
    if (i == 0) return this;

    if (!this.next) {
      throw new Error("Index is invalid!");
    }

    return (this.next as LinkedListNode<T>).nextNode(i - 1);
  }
}

class LinkedList<T> implements TLinkedList<T> {
  head: LinkedListNode<T> | null = null;
  size = 0;

  private raiseSizeError() {
    throw new Error("Index must be less than length!");
  }

  constructor(X: T[] = []) {
    for (const item of X.reverse()) {
      this.insert_first(item);
			this.size++;
    }
  }

	public printList() {
		let node = this.head;

		while(node) {
			process.stdout.write(`${node.item} -> `);
			node = node.next;

			if(!node) { 
				console.log();
			}
		}
	}

  public get_at(i: number) {
    if (!this.head) return null;

    const node = this.head.nextNode(i);

    return node?.item || null;
  }

  public set_at(i: number, x: T) {
    if (this.size <= i) this.raiseSizeError();

    const node = this.head!.nextNode(i);

    node!.item = x;
  }

  public insert_first(x: T) {
    const node = new LinkedListNode<T>(x);

    if (!this.head) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.size++;
  }

  public delete_first(): T {
    if (!this.head) throw new Error("No elements to delete");
    const prevHeadValue = this.head.item;
    this.head = this.head.next;

    this.size--;

    return prevHeadValue;
  };

	public insert_at(i: number, x: T) {
		if(i == 0) {
			this.insert_first(x);
			return;
		} 

		if(!this.head) throw new Error("Wrong index");

		const new_node = new LinkedListNode<T>(x);

		if(i == 1) {
			new_node.next = this.head.next;
			this.head.next = new_node;	
			this.size++;
			return;
		}

		const node = this.head.nextNode(i - 1);

		new_node.next = node!.next;
		node!.next = new_node;
		this.size++;
	}

	public delete_at(i: number) {
		if(!this.head) throw new Error("Wrong index");

		if(i == 0) return this.delete_first();
		if(this.size <= i) throw new Error("Invalid index!")

		const prevNode = this.head.nextNode(i - 1) as LinkedListNode<T>;
		
		prevNode.next = prevNode!.next!.next;

		this.size--;

		return this.head.item;
	}

	public insert_last(x: T) {
		this.insert_at(this.size, x);	
	}

	public delete_last(){
		return this.delete_at(this.size - 1);	
	}
}

const list = new LinkedList()
list.insert_first(5);
list.insert_first(3);
list.insert_first(2);

list.printList();

list.insert_at(2, 10);
list.insert_at(1, 8);
list.insert_at(5, 9);

list.printList();

list.delete_at(2);
list.delete_at(0);
list.delete_at(3)

list.printList();

export {}
