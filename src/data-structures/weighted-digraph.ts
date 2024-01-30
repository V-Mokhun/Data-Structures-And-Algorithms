class WeightedEdge {
  private v: number;
  private w: number;
  private weight: number;

  constructor(v: number, w: number, weight: number) {
    this.v = v;
    this.w = w;
    this.weight = weight;
  }

  from() {
    return this.v;
  }

  to() {
    return this.w;
  }

  getWeight() {
    return this.weight;
  }

  toString() {
    return `${this.v} -> ${this.w} (${this.weight})`;
  }
}

export class WeightedDigraph {
  private V: number;
  private adjList: Array<WeightedEdge[]>;

  constructor(verticesNumber: number) {
    this.V = verticesNumber;
    this.adjList = new Array(this.V);
    for (let i = 0; i < this.V; i++) {
      this.adjList[i] = new Array();
    }
  }

  printEdges() {
    for (let i = 0; i < this.V; i++) {
      const adj = this.getAdjacent(i);
      adj.forEach((e) => {
        console.log(`${e.from()} -> ${e.to()} (${e.getWeight()})`);
      });
    }
  }

  getNumberOfVertices() {
    return this.V;
  }

  addEdge(edge: WeightedEdge) {
    this.adjList[edge.from()].push(edge);
  }

  getAdjacent(vertex: number) {
    return this.adjList[vertex];
  }
}

export const weightedDigraph = new WeightedDigraph(8);
weightedDigraph.addEdge(new WeightedEdge(0, 1, 5));
weightedDigraph.addEdge(new WeightedEdge(0, 7, 8));
weightedDigraph.addEdge(new WeightedEdge(0, 4, 9));
weightedDigraph.addEdge(new WeightedEdge(1, 3, 15));
weightedDigraph.addEdge(new WeightedEdge(1, 7, 4));
weightedDigraph.addEdge(new WeightedEdge(1, 2, 12));
weightedDigraph.addEdge(new WeightedEdge(2, 3, 3));
weightedDigraph.addEdge(new WeightedEdge(2, 6, 11));
weightedDigraph.addEdge(new WeightedEdge(3, 6, 9));
weightedDigraph.addEdge(new WeightedEdge(4, 7, 5));
weightedDigraph.addEdge(new WeightedEdge(4, 5, 4));
weightedDigraph.addEdge(new WeightedEdge(4, 6, 20));
weightedDigraph.addEdge(new WeightedEdge(5, 2, 1));
weightedDigraph.addEdge(new WeightedEdge(5, 6, 13));
weightedDigraph.addEdge(new WeightedEdge(7, 2, 7));
weightedDigraph.addEdge(new WeightedEdge(7, 5, 7));
