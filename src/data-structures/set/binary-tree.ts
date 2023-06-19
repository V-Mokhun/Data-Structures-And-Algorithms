type ItemWithKey = { key: number };

function getHeight<T extends ItemWithKey>(tree: BinaryTreeNode<T> | null) {
  if (tree) return tree.height;

  return -1;
}

class BinaryTreeNode<T extends ItemWithKey> {
  item: T;
  right: BinaryTreeNode<T> | null;
  left: BinaryTreeNode<T> | null;
  parent: BinaryTreeNode<T> | null;
  height = 0;

  public subtreeUpdate() {
    this.height = 1 + Math.max(getHeight(this.left), getHeight(this.right));
  }

  private skew() {
    return getHeight(this.right) - getHeight(this.left);
  }

  private subtreeRotateRight() {
    if (!this.left) return;

    let B = this.left,
      E = this.right;
    let A = B.left,
      C = B.right;

    let node: BinaryTreeNode<T> = this;
    let tempNode = node;
    node = B;
    B = tempNode;

    let temp = node.item;
    node.item = B.item;
    B.item = temp;

    B.left = A;
    B.right = node;

    node.left = C;
    node.right = E;

    if (A) A.parent = B;
    if (E) E.parent = node;

    B.subtreeUpdate();
    node.subtreeUpdate();
  }

  private subtreeRotateLeft() {
    if (!this.right) return;

    let A = this.left,
      D = this.right;
    let C = D.left,
      E = D.right;

    let node: BinaryTreeNode<T> = this;
    let tempNode = node;
    node = D;
    D = tempNode;

    let temp = node.item;
    node.item = D.item;
    D.item = temp;

    D.left = node;
    D.right = E;

    node.left = A;
    node.right = C;

    if (A) A.parent = node;
    if (E) E.parent = D;

    D.subtreeUpdate();
    node.subtreeUpdate();
  }

  private rebalance() {
    if (this.skew() == 2) {
      if (this.right && this.right.skew() < 0) {
        this.right.subtreeRotateRight();
      }
      this.subtreeRotateLeft();
    } else if (this.skew() == -2) {
      if (this.left && this.left.skew() > 0) {
        this.left.subtreeRotateLeft();
      }
      this.subtreeRotateRight();
    }
  }

  private maintain() {
    this.rebalance();
    this.subtreeUpdate();
    if (this.parent) this.parent.maintain();
  }

  constructor(x: T) {
    this.item = x;
    this.right = null;
    this.left = null;
    this.parent = null;
    this.subtreeUpdate();
  }

  public log() {
    if (this.left) this.left.log();
    console.log(this.item);
    if (this.right) this.right.log();
  }

  public subtreeFirst(): BinaryTreeNode<T> {
    if (this.left) return this.left.subtreeFirst();

    return this;
  }

  public subtreeLast(): BinaryTreeNode<T> {
    if (this.right) return this.right.subtreeLast();

    return this;
  }

  public successor() {
    if (this.right) return this.right.subtreeFirst();

    let node: BinaryTreeNode<T> = this;
    while (node.parent && node.parent.right === node) {
      node = node.parent;
    }
    return node.parent;
  }

  public predecessor() {
    if (this.left) return this.left.subtreeLast();

    let node: BinaryTreeNode<T> = this;
    while (node.parent && node.parent.left === node) {
      node = node.parent;
    }
    return node.parent;
  }

  public subtreeInsertBefore(node: BinaryTreeNode<T>) {
    if (this.left) {
      const leftNode = this.left.subtreeLast();
      leftNode.right = node;
      node.parent = leftNode;
    } else {
      this.left = node;
      node.parent = this;
    }
    this.maintain();
  }

  public subtreeInsertAfter(node: BinaryTreeNode<T>) {
    if (this.right) {
      const rightNode = this.right.subtreeFirst();
      rightNode.left = node;
      node.parent = rightNode;
    } else {
      this.right = node;
      node.parent = this;
    }
    this.maintain();
  }

  public subtreeDelete(): BinaryTreeNode<T> | null {
    if (this.left || this.right) {
      let node: BinaryTreeNode<T> | null;
      if (this.left) node = this.predecessor();
      else node = this.successor();

      if (!node) return null;

      let temp = node.item;
      node.item = this.item;
      this.item = temp;

      return node.subtreeDelete();
    }

    if (this.parent) {
      if (this.parent.right == this) this.parent.right = null;
      else this.parent.left = null;
      this.parent.maintain();
    }

    return this;
  }
}

class BinarySearchTreeNode<T extends ItemWithKey> extends BinaryTreeNode<T> {
  left: BinarySearchTreeNode<T> | null;
  right: BinarySearchTreeNode<T> | null;
  parent: BinarySearchTreeNode<T> | null;

  constructor(x: T) {
    super(x);
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  public subtreeFind(key: number): BinarySearchTreeNode<T> | null {
    if (this.item.key < key) {
      if (this.left) this.left.subtreeFind(key);
    } else if (this.item.key > key) {
      if (this.right) this.right.subtreeFind(key);
    } else return this;

    return null;
  }

  public subtreeFindNext(key: number): BinarySearchTreeNode<T> | null {
    if (this.item.key <= key) {
      if (this.right) return this.right.subtreeFindNext(key);
      return null;
    } else if (this.left) {
      const node = this.left.subtreeFindNext(key);
      if (node) return node;
    }

    return this;
  }

  public subtreeFindPrev(key: number): BinarySearchTreeNode<T> | null {
    if (this.item.key >= key) {
      if (this.left) return this.left.subtreeFindPrev(key);
      return null;
    } else if (this.right) {
      const node = this.right.subtreeFindPrev(key);
      if (node) return node;
    }

    return this;
  }

  public subtreeInsert(node: BinarySearchTreeNode<T>) {
    if (node.item.key < this.item.key) {
      if (this.left) this.left.subtreeInsert(node);
      else this.subtreeInsertBefore(node);
    } else if (node.item.key > this.item.key) {
      if (this.right) this.right.subtreeInsert(node);
      else this.subtreeInsertAfter(node);
    } else {
      this.item = node.item;
    }
  }
}

class SizeNode<T extends ItemWithKey> extends BinaryTreeNode<T> {
  left: SizeNode<T> | null;
  right: SizeNode<T> | null;
  parent: SizeNode<T> | null;
  size: number;

  public subtreeUpdate() {
    this.height = 1 + Math.max(getHeight(this.left), getHeight(this.right));
    this.size = 1;
    if (this.left) this.size += this.left.size;
    if (this.right) this.size += this.right.size;
  }

  constructor(x: T) {
    super(x);
    this.left = null;
    this.right = null;
    this.parent = null;
    this.size = 0;
    this.subtreeUpdate();
  }

  public subtreeAt(i: number): SizeNode<T> | null {
    if (i < 0) return null;
    let leftSize = 0;
    if (this.left) leftSize = this.left.size;

    if (i < leftSize) {
      if (!this.left) return null;

      return this.left.subtreeAt(i);
    } else if (i > leftSize) {
      if (!this.right) return null;

      return this.right.subtreeAt(i - leftSize - 1);
    } else return this;
  }
}

class BinaryTree<T extends ItemWithKey> {
  root: BinaryTreeNode<T> | null;
  size: number;

  constructor() {
    this.root = null;
    this.size = 0;
  }
}

class BinarySearchTree<T extends ItemWithKey> extends BinaryTree<T> {
  root: BinarySearchTreeNode<T> | null;

  constructor() {
    super();
    this.root = null;
  }

  public findMin() {
    if (this.root) return this.root.subtreeFirst().item;

    return null;
  }

  public findMax() {
    if (this.root) return this.root.subtreeLast().item;

    return null;
  }

  public find(key: number) {
    if (this.root) {
      const node = this.root.subtreeFind(key);
      return node?.item ?? null;
    }

    return null;
  }

  public findNext(key: number) {
    if (this.root) {
      const node = this.root.subtreeFindNext(key);
      return node?.item ?? null;
    }

    return null;
  }

  public findPrev(key: number) {
    if (this.root) {
      const node = this.root.subtreeFindPrev(key);
      return node?.item ?? null;
    }

    return null;
  }

  public insert(x: T) {
    const newNode = new BinarySearchTreeNode(x);
    if (this.root) {
      this.root.subtreeInsert(newNode);
      if (newNode.parent == null) return false;
    } else {
      this.root = newNode;
    }

    this.size++;
    return true;
  }

  public delete(key: number) {
    if (this.root) {
      const node = this.root.subtreeFind(key);
      if (!node) return null;

      const deleted = node.subtreeDelete();
      if (!deleted) return null;

      if (deleted.parent == null) this.root = null;
      this.size--;

      return deleted.item;
    }

    return null;
  }
}

class SequenceBinaryTree<T extends ItemWithKey> extends BinaryTree<T> {
  root: SizeNode<T> | null;

  constructor(X: T[] = []) {
    super();
    function buildSubtree(arr: T[], start: number, end: number) {
      let mid = Math.floor((end + start) / 2);
      let root = new SizeNode(arr[mid]);
      if (start < mid) {
        root.left = buildSubtree(arr, start, mid - 1);
        root.left.parent = root;
      }
      if (mid < end) {
        root.right = buildSubtree(arr, mid + 1, end);
        root.right.parent = root;
      }
      root.subtreeUpdate();
      return root;
    }

    if (X.length > 0) {
      this.root = buildSubtree(X, 0, X.length - 1);
      this.size = this.root.size;
    } else {
      this.root = null;
      this.size = 0;
    }
  }

  public getAt(i: number) {
    if (this.root) {
      const node = this.root.subtreeAt(i);
      if (node) return node.item;
      return null;
    }

    return null;
  }

  public setAt(i: number, x: T) {
    if (this.root) {
      const node = this.root.subtreeAt(i);
      if (node) {
        node.item = x;
        return node.item;
      }
      return null;
    }

    return null;
  }

  public insertAt(i: number, x: T) {
    const newNode = new SizeNode(x);

    if (i == 0) {
      if (this.root) {
        const node = this.root.subtreeFirst();
        node.subtreeInsertBefore(node);
      } else {
        this.root = newNode;
      }

      this.size++;
    } else {
      if (!this.root) return;
      const node = this.root.subtreeAt(i - 1);
      if (!node) return;

      node.subtreeInsertAfter(newNode);

      this.size++;
    }
  }

  public deleteAt(i: number) {
    if (this.root) {
      const node = this.root.subtreeAt(i);
      if (!node) return null;

      const deleted = node.subtreeDelete();
      if (!deleted) return null;

      if (deleted.parent == null) this.root = null;
      this.size--;
      return deleted.item;
    }

    return null;
  }

  public insertFirst(x: T) {
    return this.insertAt(0, x);
  }
  public deleteFirst() {
    return this.deleteAt(0);
  }
  public insertLast(x: T) {
    return this.insertAt(this.size - 1, x);
  }
  public deleteLast() {
    return this.deleteAt(this.size - 1);
  }
}

const tree = new SequenceBinaryTree([
  { key: 10, item: 1 },
  { key: 6, item: 3 },
  { key: 8, item: 9 },
  { key: 5, item: 0 },
  { key: 1, item: 23 },
  { key: 3, item: -31 },
]);

tree.setAt(4, { key: -4, item: 391 });
tree.insertAt(4, { key: 18, item: 9 });
tree.insertAt(4, { key: 12, item: 10 });
// tree.deleteAt(2);

console.log("0: ", tree.getAt(0))
console.log("1: ", tree.getAt(1))
console.log("2: ", tree.getAt(2))
console.log("3: ", tree.getAt(3))
console.log("4: ", tree.getAt(4))
console.log("5: ", tree.getAt(5))

export {}
