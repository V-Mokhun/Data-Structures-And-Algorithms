import { DiGraph, digraph } from "../data-structures/digraph";

export const topologicalSort = (graph: DiGraph) => {
  const visited = new Array(graph.getNumberOfVertices()).fill(false);
  const recursiveStack = new Array(graph.getNumberOfVertices()).fill(false);
  const reverseTopoOrder: number[] = [];

  const dfs = (vertex: number) => {
    if (recursiveStack[vertex]) throw new Error("Graph has a cycle!");

    recursiveStack[vertex] = true;
		visited[vertex] = true;

    const adjacentVertices = graph.getAdjacentVertices(vertex);
    for (let i = 0; i < adjacentVertices.length; i++) {
      if (!visited[adjacentVertices[i]]) {
        dfs(adjacentVertices[i]);
      }
    }
		
    recursiveStack[vertex] = false;
    reverseTopoOrder.push(vertex);
  };

  for (let i = 0; i < graph.getNumberOfVertices(); i++) {
    if (!visited[i]) dfs(i);
  }

  return reverseTopoOrder;
};

const topoOrder = topologicalSort(digraph);
console.log(topoOrder);
