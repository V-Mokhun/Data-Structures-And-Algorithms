class Stack {
  private size = 0;
  private stack: number[] = [];

	constructor(arr: number[] = []) {
		if(arr.length > 0) {
			for(let i = 0; i < arr.length; i++) {
				this.push(arr[i]);
			}
		}
	}

  public push(value: number) {
    this.stack.push(value);
    this.size++;
  }

  public pop() {
    if (this.isEmpty()) throw new Error("Stack is Empty!");
    this.size--;
    return this.stack.pop();
  }

  public peek() {
    if (this.isEmpty()) return undefined;

    return this.stack[this.size - 1];
  }

  public isEmpty() {
    return this.size == 0;
  }

  public getSize() {
    return this.size;
  }
}

const stack = new Stack([4,7,9])
console.log(stack.peek())
stack.pop()
stack.pop()
stack.push(99);
stack.pop()
console.log(stack.peek())
stack.pop()
console.log(stack.isEmpty())
console.log(stack.peek())
