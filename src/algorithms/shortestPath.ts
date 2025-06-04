import type { GraphData, AlgorithmResult, ShortestPathResult, GraphSettings } from './types';

/**
 * Shortest Path Algorithm using Bellman-Ford algorithm
 * 
 * Finds the shortest path between two randomly selected nodes.
 * Uses Bellman-Ford algorithm which can handle negative weights and detect negative cycles.
 */
export class ShortestPathAlgorithm {
  
  /**
   * Solves the shortest path problem for the given graph
   */
  static solve(graphData: GraphData, settings: GraphSettings): AlgorithmResult<ShortestPathResult> {
    try {
      // Validate input
      if (!graphData.nodes || graphData.nodes.length === 0) {
        return {
          success: false,
          error: 'No graph data available',
          errorType: 'no-data'
        };
      }

      if (graphData.nodes.length < 2) {
        return {
          success: false,
          error: 'Need at least 2 nodes for shortest path',
          errorType: 'invalid-input'
        };
      }

      // Select random start and end nodes
      const { startNode, endNode } = this.selectRandomNodes(graphData.nodes);
      
      // Build adjacency list
      const adjacencyList = this.buildAdjacencyList(graphData, settings);
      
      // Check connectivity first using BFS
      if (!this.hasPath(startNode.id, endNode.id, adjacencyList)) {
        return {
          success: false,
          error: `No path exists: ${startNode.id} and ${endNode.id} are in disconnected components`,
          errorType: 'disconnected'
        };
      }

      // Find shortest path using Bellman-Ford
      const pathResult = this.bellmanFord(
        startNode.id, 
        endNode.id, 
        graphData.nodes, 
        adjacencyList
      );

      if (!pathResult.success) {
        return {
          success: false,
          error: pathResult.error!,
          errorType: pathResult.errorType as any
        };
      }

      return {
        success: true,
        result: {
          path: pathResult.result!.path,
          distance: pathResult.result!.distance,
          startNode: startNode.id,
          endNode: endNode.id
        }
      };

    } catch (error) {
      return {
        success: false,
        error: 'Error solving shortest path problem',
        errorType: 'algorithm-error'
      };
    }
  }

  /**
   * Selects two different random nodes from the graph
   */
  private static selectRandomNodes(nodes: any[]): { startNode: any, endNode: any } {
    const startNode = nodes[Math.floor(Math.random() * nodes.length)];
    let endNode = nodes[Math.floor(Math.random() * nodes.length)];
    
    // Ensure start and end are different
    while (startNode.id === endNode.id && nodes.length > 1) {
      endNode = nodes[Math.floor(Math.random() * nodes.length)];
    }
    
    return { startNode, endNode };
  }

  /**
   * Builds an adjacency list from the graph data
   */
  private static buildAdjacencyList(
    graphData: GraphData, 
    settings: GraphSettings
  ): Map<string, Array<{node: string, weight: number}>> {
    const adjacencyList = new Map<string, Array<{node: string, weight: number}>>();
    
    // Initialize empty arrays for all nodes
    graphData.nodes.forEach(node => {
      adjacencyList.set(node.id, []);
    });
    
    // Add edges
    graphData.links.forEach(link => {
      const sourceId = link.source;
      const targetId = link.target;
      const weight = settings.useWeights ? link.weight : 1;
      
      adjacencyList.get(sourceId)?.push({node: targetId, weight});
      if (!settings.isDirected) {
        adjacencyList.get(targetId)?.push({node: sourceId, weight});
      }
    });
    
    return adjacencyList;
  }

  /**
   * Checks if there's a path between two nodes using BFS
   */
  private static hasPath(
    start: string, 
    end: string, 
    adjacencyList: Map<string, Array<{node: string, weight: number}>>
  ): boolean {
    if (start === end) return true;
    
    const visited = new Set<string>();
    const queue = [start];
    visited.add(start);
    
    let iterations = 0;
    while (queue.length > 0 && iterations < 100) { // Safety limit
      iterations++;
      const current = queue.shift()!;
      const neighbors = adjacencyList.get(current) || [];
      
      for (const neighbor of neighbors) {
        if (neighbor.node === end) {
          return true;
        }
        if (!visited.has(neighbor.node)) {
          visited.add(neighbor.node);
          queue.push(neighbor.node);
        }
      }
    }
    
    return false;
  }

  /**
   * Bellman-Ford algorithm for shortest path
   */
  private static bellmanFord(
    start: string,
    end: string,
    nodes: any[],
    adjacencyList: Map<string, Array<{node: string, weight: number}>>
  ): AlgorithmResult<{ path: string[], distance: number }> {
    
    const distances = new Map<string, number>();
    const predecessors = new Map<string, string | null>();
    
    // Initialize distances
    nodes.forEach(node => {
      const isStart = node.id === start;
      const distance = isStart ? 0 : Infinity;
      distances.set(node.id, distance);
      predecessors.set(node.id, null);
    });
    
    // Relax edges repeatedly
    for (let i = 0; i < nodes.length - 1; i++) {
      let updated = false;
      
      for (const [nodeId, neighbors] of adjacencyList) {
        const currentDist = distances.get(nodeId);
        const actualDist = currentDist !== undefined ? currentDist : Infinity;
        
        if (actualDist === Infinity) continue;
        
        for (const neighbor of neighbors) {
          const newDist = actualDist + neighbor.weight;
          const oldDistValue = distances.get(neighbor.node);
          const oldDist = oldDistValue !== undefined ? oldDistValue : Infinity;
          
          if (newDist < oldDist) {
            distances.set(neighbor.node, newDist);
            predecessors.set(neighbor.node, nodeId);
            updated = true;
          }
        }
      }
      
      if (!updated) break; // Early termination
    }
    
    // Check for negative cycles
    for (const [nodeId, neighbors] of adjacencyList) {
      const currentDist = distances.get(nodeId);
      const actualDist = currentDist !== undefined ? currentDist : Infinity;
      if (actualDist === Infinity) continue;
      
      for (const neighbor of neighbors) {
        const newDist = actualDist + neighbor.weight;
        const oldDistValue = distances.get(neighbor.node);
        const oldDist = oldDistValue !== undefined ? oldDistValue : Infinity;
        
        if (newDist < oldDist) {
          return {
            success: false,
            error: 'Graph contains negative cycle - shortest path undefined',
            errorType: 'negative-cycle'
          };
        }
      }
    }
    
    // Reconstruct path
    const finalDistance = distances.get(end) || Infinity;
    if (finalDistance === Infinity) {
      return {
        success: false,
        error: 'No path found: algorithm failed to reach target node',
        errorType: 'algorithm-error'
      };
    }
    
    const path: string[] = [];
    let current: string | null = end;
    while (current !== null) {
      path.unshift(current);
      current = predecessors.get(current) || null;
    }
    
    return {
      success: true,
      result: {
        path,
        distance: finalDistance
      }
    };
  }
} 