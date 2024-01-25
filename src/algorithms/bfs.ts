import { Graph, graph } from "../data-structures/graph";
import { Queue } from "../data-structures/queue";

export const bfs = (graph: Graph, start: number) => {
  const queue = new Queue();
  const visited = new Array(graph.getNumberOfVertices()).fill(false);

  let outputStr = "";
  queue.enqueue(start);
  visited[start] = true;

  while (!queue.isEmpty()) {
    const popped = queue.dequeue() as number;

    outputStr += `${popped} -> `;

    const adjacentVertices = graph.getAdjacentVertices(popped);
    for (let i = 0; i < adjacentVertices.length; i++) {
      if (!visited[adjacentVertices[i]]) {
        queue.enqueue(adjacentVertices[i]);
        visited[popped] = true;
      }
    }
  }

  return outputStr;
};

console.log(bfs(graph, 0));
