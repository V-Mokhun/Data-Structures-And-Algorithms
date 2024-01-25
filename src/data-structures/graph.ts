import { LinkedList } from "./linked-list";

export class Graph {
  private V: number;
  private adjList: LinkedList[];

  constructor(verticesNumber: number) {
    this.V = verticesNumber;
    this.adjList = new Array(this.V);
    for (let i = 0; i < this.V; i++) {
      this.adjList[i] = new LinkedList();
    }
  }

  getNumberOfVertices() {
    return this.V;
  }

  addEdge(dest: number, source: number) {
    if (this.adjList[dest].find(source) === null) {
      this.adjList[dest].add(source);
    }

    if (this.adjList[source].find(dest) === null) {
      this.adjList[source].add(dest);
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

export const graph = new Graph(7);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(0, 5);
graph.addEdge(0, 6);
graph.addEdge(3, 4);
graph.addEdge(3, 5);
graph.addEdge(4, 5);
graph.addEdge(4, 6);
