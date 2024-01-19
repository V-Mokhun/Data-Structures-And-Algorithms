import { LinkedList } from "./linked-list";

const DEFAULT_CAPACITY = 100;

class HashMap {
  private size = 0;
  private capacity = DEFAULT_CAPACITY;
  private buckets: (LinkedList | undefined)[] = [];

  constructor(capacity = DEFAULT_CAPACITY) {
    this.capacity = capacity;
    this.buckets = new Array(this.capacity);
  }

  private hash(key: string) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue % this.capacity;
  }

  getSize() {
    return this.size;
  }

  set(key: string, value: number) {
    const index = this.hash(key);

    if (this.buckets[index] === undefined)
      this.buckets[index] = new LinkedList();

    this.buckets[index]!.add(value);
    this.size++;
  }

  remove(key: string) {
    const index = this.hash(key);
    if (this.buckets[index] === undefined) return;

    this.size -= this.buckets[index]!.getSize();
    this.buckets[index] = undefined;
  }

  get(key: string) {
    const index = this.hash(key);
    if (this.buckets[index] === undefined) return null;

    return this.buckets[index] as LinkedList;
  }

  has(key: string) {
    const index = this.hash(key);
    if (this.buckets[index] === undefined) return false;

    return true;
  }
}

const hashmap = new HashMap();
hashmap.set("Hello", 3);
hashmap.set("World", 5);
hashmap.set("Hello", 10);
console.log(hashmap.get("Sup"))
console.log(hashmap.getSize());
hashmap.remove("Hello");
console.log(hashmap.get("Hello"))
console.log(hashmap.getSize());

