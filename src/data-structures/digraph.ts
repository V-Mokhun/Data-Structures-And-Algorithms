import { LinkedList } from "./linked-list";

export class DiGraph {
  private V: number;
  private adjList: LinkedList[];

  constructor(verticesNumber: number) {
    this.V = verticesNumber;
    this.adjList = new Array(this.V);
    for (let i = 0; i < this.V; i++) {
      this.adjList[i] = new LinkedList();
    }
  }

  printEdges() {
    for(let i = 0; i < this.V; i++) {
      const adjVertices = this.getAdjacentVertices(i);
      adjVertices.forEach(v => {
        console.log(`${i} -> ${v}`);
      })
    } 
  }

  getNumberOfVertices() {
    return this.V;
  }

  addEdge(dest: number, source: number) {
    if (this.adjList[dest].find(source) === null) {
      this.adjList[dest].add(source);
    }
  }

  getEdges(vertex: number) {
    return this.adjList[vertex];
  }

  getAdjacentVertices(vertex: number) {
    const arr: number[] = [];

    let node = this.getEdges(vertex).getHead();

    while (node) {
      arr.push(node.item);
      node = node.next;
    }
    return arr;
  }
}

export const digraph = new DiGraph(7);
digraph.addEdge(0, 1);
digraph.addEdge(0, 2);
digraph.addEdge(0, 5);
digraph.addEdge(1, 4);
digraph.addEdge(3, 2);
digraph.addEdge(3, 4);
digraph.addEdge(3, 5);
digraph.addEdge(3, 6);
digraph.addEdge(5, 2);
digraph.addEdge(6, 4);
digraph.addEdge(6, 0);
