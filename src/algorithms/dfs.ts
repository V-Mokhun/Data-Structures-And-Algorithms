import { Graph, graph } from "../data-structures/graph";
import { Stack } from "../data-structures/stack";

export const dfs = (graph: Graph, start: number) => {
  const visited = new Array(graph.getNumberOfVertices()).fill(false);
  const stack = new Stack();

  let outputStr = "";
  stack.push(start);

  while (!stack.isEmpty()) {
    const popped = stack.pop();

    if (popped === undefined || visited[popped] === true) continue;

    visited[popped] = true;
    outputStr += `${popped} -> `;

    const adjacentVertices = graph.getAdjacentVertices(popped);

    for (let i = 0; i < adjacentVertices.length; i++) {
      if (!visited[adjacentVertices[i]]) stack.push(adjacentVertices[i]);
    }
  }
  return outputStr;
};

export const dfsRecursive = (
  graph: Graph,
  start: number,
  visited?: boolean[]
) => {
  if (!visited) {
    visited = new Array(graph.getNumberOfVertices()).fill(false);
  }

  console.log(start);
  visited[start] = true;

  const adjacentVertices = graph.getAdjacentVertices(start);
	
  for (let i = 0; i < adjacentVertices.length; i++) {
    if (!visited[adjacentVertices[i]])
      dfsRecursive(graph, adjacentVertices[i], visited);
  }
};

// console.log(dfs(graph, 0));
dfsRecursive(graph, 0);
