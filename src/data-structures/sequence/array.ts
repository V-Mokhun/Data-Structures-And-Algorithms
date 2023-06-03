interface TArray<T> {
  elements: (T|null)[];
  length: number;
  get_at: (i: number) => T;
  set_at(i: number, x: T): void;
  insert_first(x: T): void;
  delete_first(): T;
  insert_last(x: T): void;
  delete_last(): T;
  insert_at(i: number, x: T): void;
  delete_at(i: number): T;
}

export class SequenceArray<T> implements TArray<T> {
  elements: (T|null)[] = [];
  length: number;

  private raiseLengthError() {
    throw new Error("Index must be less than length!");
  }

  private raiseNegativeIndexError() {
    throw new Error("Index can't be less than 0!");
  }

  constructor(X: T[] = [], length = 0) {
    for(const el of X) {
      this.insert_last(el);
    }
    this.length = length;
  }

  public get_at(i: number) {
    if (i < 0) this.raiseNegativeIndexError();

    return this.elements[i] as T;
  }

  public set_at(i: number, x: T) {
    if (this.length <= i) this.raiseLengthError();
    if (i < 0) this.raiseNegativeIndexError();

    this.elements[i] = x;
  }

  public insert_at(i: number, x: T) {
    if (this.length < i) this.raiseLengthError();
    if (i < 0) this.raiseNegativeIndexError();

    const new_array = new SequenceArray<T>([], this.length + 1);

    for (let j = 0; j < i; j++) {
      new_array.set_at(j, this.get_at(j));
    }
    new_array.set_at(i, x);
    for (let j = i + 1; j < this.length + 1; j++) {
      new_array.set_at(j, this.get_at(j - 1));
    }

    this.elements = new_array.elements;
    this.length += 1;
  }

  public delete_at(i: number) {
    if (this.length <= i) this.raiseLengthError();
    if (i < 0) this.raiseNegativeIndexError();

    const deletedEl = this.get_at(i);
    const new_array = new SequenceArray<T>([], this.length - 1);

    for (let j = 0; j < i; j++) {
      new_array.set_at(j, this.get_at(j));
    }

    for (let j = i + 1; j < this.length; j++) {
      new_array.set_at(j - 1, this.get_at(j));
    }

    this.elements = new_array.elements;
    this.length -= 1;

    return deletedEl;
  }

  public insert_first(x: T) {
    this.insert_at(0, x);
  }

  public delete_first(){
    return this.delete_at(0);
  }

  public insert_last(x: T) {
    this.insert_at(this.length, x);
  }

  public delete_last() {
    return this.delete_at(this.length - 1);
  }
}

const arr = new SequenceArray<number>();
arr.insert_first(4);
arr.insert_first(2);
arr.insert_first(9);
arr.insert_last(7);
arr.insert_last(5);
arr.insert_last(0);

// console.log(arr.elements);

arr.delete_first();
arr.delete_last();

// console.log(arr.elements);

arr.insert_at(3, 12);
arr.insert_at(1, 8);

// console.log(arr.elements);

arr.delete_at(3);
arr.delete_at(2);

// console.log(arr.elements);

export {}
