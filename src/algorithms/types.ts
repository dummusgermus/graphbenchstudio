// Types for algorithm implementations

export interface GraphNode {
  id: string;
  val: number;
  isSource?: boolean;
  isSink?: boolean;
  isTerminal?: boolean;
  partition?: number; // For multi-partite graphs
  isSuperSource?: boolean; // For multi-source flow networks
  isSuperSink?: boolean; // For multi-sink flow networks
}

export interface GraphLink {
  source: string;
  target: string;
  weight: number;
  isDirected: boolean;
  capacity?: number; // For flow networks
  isSuperEdge?: boolean; // For super-source/super-sink connections
}

export interface GraphSpecialAttributes {
  isFlowNetwork: boolean;
  sourceNode?: string;
  sinkNode?: string;
  sourceNodes?: string[]; // For multi-source flow networks
  sinkNodes?: string[]; // For multi-sink flow networks
  sourceCount?: number; // Number of sources
  sinkCount?: number; // Number of sinks
  superSource?: string; // Virtual super-source node ID  
  superSink?: string; // Virtual super-sink node ID
  isStronglyConnected: boolean;
  isBipartite: boolean;
  isMultipartite: boolean; // For multi-partite graphs (3+ partitions)
  isPlanar: boolean;
  isTree: boolean;
  isDAG: boolean; // Directed Acyclic Graph
  isErdosRenyi?: boolean; // Erdős-Renyi random graph
  partitionCount?: number; // For multi-partite graphs
  partitions?: number[][]; // For multi-partite graphs - array of node indices for each partition
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
  specialAttributes?: GraphSpecialAttributes;
}

export interface AlgorithmResult<T = any> {
  success: boolean;
  result?: T;
  error?: string;
  errorType?: 'no-data' | 'disconnected' | 'negative-cycle' | 'algorithm-error' | 'invalid-input';
}

export interface MaximumCliqueResult {
  clique: string[];
  isValid: boolean;
}

export interface ShortestPathResult {
  path: string[];
  distance: number;
  startNode: string;
  endNode: string;
}

export interface MaximumSpanningTreeResult {
  edges: GraphLink[];
  totalWeight: number;
  isValid: boolean;
}

export interface SteinerTreeResult {
  edges: GraphLink[];
  totalWeight: number;
  terminalNodes: string[];
  steinerNodes: string[];
  isValid: boolean;
}

export interface MaxFlowResult {
  maxFlow: number;
  flowPaths: Array<{
    path: string[];
    flow: number;
  }>;
  sourceNode: string;
  sinkNode: string;
  isValid: boolean;
}

export interface MultipartiteMatchingResult {
  matching: GraphLink[];
  maxMatchingSize: number;
  partitions: string[][];
  isValid: boolean;
}

export interface GraphSettings {
  isDirected: boolean;
  useWeights: boolean;
  minWeight: number;
  maxWeight: number;
} 