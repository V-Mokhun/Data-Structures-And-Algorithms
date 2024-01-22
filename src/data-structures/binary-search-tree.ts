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

    if (node.right) return this.getMin(node);

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

    if (!this.root) return null;

    while (temp !== null) {
      if (temp.left?.value === value || temp.right?.value === value)
        return temp;
      else if (temp.value < value) temp = temp.right;
      else if (temp.value > value) temp = temp.left;
    }

    return temp;
  }

  traverse(root = this.root, output = "") {
    if (!root) return;

    this.traverse(root.left);
    output += `${root.value} -> `;
    this.traverse(root.right);

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
    const node = this.find(value);
    if (!node) return false;

    const hasNoChildren = node.left === null && node.right === null;
    const hasLeftChild = node.left !== null && node.right === null;
    const hasRightChild = node.left === null && node.right !== null;
    const hasOneChild = hasLeftChild || hasRightChild;

    const parent = this.findParent(value);
    if (hasNoChildren) {
      if (!parent) {
        this.root = null;
        this.size--;
        return true;
      }

      if (parent.left?.value === value) parent.left = null;
      else parent.right = null;
      this.size--;
    } else if (hasOneChild) {
      if (!parent) {
        this.root = node.right === null ? node.left : node.right;
        this.size--;
        return true;
      }

      if (parent.left?.value === value) {
        if (hasLeftChild) parent.left = node.left;
        else parent.left = node.right;
      } else {
        if (hasLeftChild) parent.right = node.left;
        else parent.right = node.right;
      }

      this.size--;
    } else {
      const successor = this.successor(value);
      if (!successor) return false;

      let temp = successor.value;
      successor.value = node.value;
      node.value = temp;

      this.remove(successor.value);
    }

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
