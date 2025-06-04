export interface GraphNode {
  id: string;
  label?: string;
  color?: string;
  highlighted?: boolean;
}

export interface GraphLink {
  source: string;
  target: string;
  color?: string;
  highlighted?: boolean;
}

export interface Graph {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface GraphProblem {
  id: string;
  name: string;
  description: string;
  generateGraph: (nodeCount: number, edgeProbability: number) => Graph;
  solve: (graph: Graph) => {
    solution: any;
    highlightedGraph: Graph;
  };
} 