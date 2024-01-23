class Node<T> {
  left: Node<T> | null = null;
  right: Node<T> | null = null;
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

class BinarySearchTree<T> {
  root: Node<T> | null = null;
  size = 0;

  constructor(root: Node<T> | null = null) {
    this.root = root;
    if (root) this.size++;
  }

  successor(value: T) {
    const node = this.find(value);
    if (!node) return null;

    if (node.right) return this.getMin(node.right);

    let temp = this.root;
    let succ = null;

    while (temp !== null) {
      if (temp.value < value) temp = temp.right;
      else if (temp.value > value) {
        succ = temp;
        temp = temp.left;
      } else break;
    }

    return succ;
  }

  find(value: T) {
    let temp = this.root;

    while (temp !== null) {
      if (temp.value === value) return temp;
      else if (temp.value < value) temp = temp.right;
      else if (temp.value > value) temp = temp.left;
    }

    return temp;
  }

  findParent(value: T) {
    let temp = this.root;

    if (!this.root || this.root.value === value) return null;

    while (temp !== null) {
      if (temp.left?.value === value || temp.right?.value === value)
        return temp;
      else if (temp.value < value) temp = temp.right;
      else if (temp.value > value) temp = temp.left;
    }

    return temp;
  }

  traverse(root = this.root, output = "") {
    if (!root) return output;

    output += this.traverse(root.left);
    output += `${root.value} -> `;
    output += this.traverse(root.right);

    return output;
  }

  insert(value: T, node = this.root) {
    if (!this.root) {
      this.root = new Node(value);
      this.size++;
      return null;
    }

    if (!node) {
      this.size++;
      return new Node(value);
    }

    if (node.value >= value) node.left = this.insert(value, node.left);
    if (node.value < value) node.right = this.insert(value, node.right);

    return node;
  }

  remove(value: T) {
    const removeNode = (node: Node<T> | null, key: T): Node<T> | null => {
      if (node === null) {
        return null;
      }

      if (key < node.value) {
        node.left = removeNode(node.left, key);
      } else if (key > node.value) {
        node.right = removeNode(node.right, key);
      } else {
        // Node with only one child or no child
        if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        }

        // Node with two children, get the inorder successor
        const succ = this.getMin(node.right);
        if (!succ) return node;

        node.value = succ.value;
        node.right = removeNode(node.right, node.value);
      }

      return node;
    };

    this.root = removeNode(this.root, value);
    return true;
  }

  getMax(node: Node<T> | null = this.root) {
    if (!node) return null;

    let temp = node;
    while (temp.right !== null) {
      temp = temp.right;
    }
    return temp;
  }

  getMin(node: Node<T> | null = this.root) {
    if (!node) return null;

    let temp = node;
    while (temp.left !== null) {
      temp = temp.left;
    }
    return temp;
  }

  getSize() {
    return this.size;
  }
}

const bst = new BinarySearchTree();
bst.insert(4);
bst.insert(9);
bst.insert(2);
bst.insert(1);
bst.insert(7);
// console.log(bst.traverse());
// console.log(bst.findParent(5));
// console.log(bst.getMax())
// console.log(bst.successor(2))

bst.remove(4);
console.log(bst.traverse());
