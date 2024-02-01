class LRUCache<T> {
  private capacity: number;
  private cache: { key: string; value: T }[];
  private hashmap: { [key: string]: T };

  constructor(n: number) {
    this.capacity = n;
    this.cache = [];
    this.hashmap = {};
  }

  get(key: string) {
    if (!(key in this.hashmap)) return -1;

    const value = this.hashmap[key];
    const idx = this.cache.findIndex((item) => item.key === key);
    this.cache.splice(idx, 1);
    this.cache.unshift({ key, value });

    return value;
  }

  put(key: string, value: T) {
    if (key in this.hashmap) {
      const idx = this.cache.findIndex((item) => item.key === key);
      this.cache.splice(idx, 1);
    } else {
      if (this.cache.length === this.capacity) {
        const popped = this.cache.pop()!;
        delete this.hashmap[popped.key];
      }
    }

    this.cache.unshift({ key, value });
    this.hashmap[key] = value;
  }

  print() {
    console.log(this.cache);
  }
}

const cache = new LRUCache(3);
cache.put("a", 1);
cache.put("b", 2);
cache.put("c", 3);
cache.print();
cache.get("a");
cache.print();
cache.put("d", 4);
cache.get("c");
cache.print();
