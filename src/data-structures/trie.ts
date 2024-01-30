class TrieNode {
  isWord: boolean;
  children: { [key: string]: TrieNode };

  constructor() {
    this.isWord = false;
    this.children = {};
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isWord = true;
  }

  search(word: string) {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      node = node.children[char];
      if (!node) return false;
    }

    return node.isWord;
  }

  startsWith(prefix: string) {
    let node = this.root;

    for (let i = 0; i < prefix.length; i++) {
      let char = prefix[i];
      node = node.children[char];
      if (!node) return false;
    }

    return true;
  }
}

const trie = new Trie();
trie.insert("apple");
trie.insert("app");
trie.insert("application");
trie.insert("banana");
trie.insert("bandana");

console.log(trie.search("app")); // true
console.log(trie.search("apply")); // false
console.log(trie.search("bandana")); // true

console.log(trie.startsWith("appli")); // true
console.log(trie.startsWith("bani")); // false
