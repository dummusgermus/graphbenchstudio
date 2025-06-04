import type { GraphData, AlgorithmResult, SteinerTreeResult, GraphLink, GraphSettings } from './types';

/**
 * Steiner Tree Algorithm using approximation approach
 * 
 * Finds the minimum weight tree that connects a set of terminal nodes.
 * Uses a 2-approximation algorithm based on minimum spanning tree of terminal distances.
 * Terminal nodes are selected randomly from the graph.
 */
export class SteinerTreeAlgorithm {
  
  /**
   * Solves the Steiner tree problem for the given graph with specified number of terminals
   */
  static solve(graphData: GraphData, settings: GraphSettings, terminalCount: number = 5): AlgorithmResult<SteinerTreeResult> {
    try {
      // Validate input
      if (!graphData.nodes || graphData.nodes.length === 0) {
        return {
          success: false,
          error: 'No graph data available for Steiner tree analysis',
          errorType: 'no-data'
        };
      }

      if (terminalCount < 2) {
        return {
          success: false,
          error: 'Need at least 2 terminal nodes for Steiner tree',
          errorType: 'invalid-input'
        };
      }

      if (terminalCount > graphData.nodes.length) {
        return {
          success: false,
          error: `Cannot select ${terminalCount} terminals from ${graphData.nodes.length} nodes`,
          errorType: 'invalid-input'
        };
      }

      // Select random terminal nodes
      const terminalNodes = this.selectRandomTerminals(graphData.nodes, terminalCount);
      
      // Build adjacency list for shortest path calculations
      const adjacencyList = this.buildAdjacencyList(graphData, settings);
      
      // Check if all terminals are connected
      const connectivityCheck = this.checkTerminalConnectivity(terminalNodes, adjacencyList);
      if (!connectivityCheck.success) {
        return {
          success: false,
          error: connectivityCheck.error!,
          errorType: 'disconnected'
        };
      }

      // Find Steiner tree using approximation algorithm
      const steinerResult = this.findSteinerTree(terminalNodes, graphData, adjacencyList, settings);
      
      if (!steinerResult.success) {
        return {
          success: false,
          error: steinerResult.error!,
          errorType: steinerResult.errorType as any
        };
      }

      return {
        success: true,
        result: steinerResult.result!
      };

    } catch (error) {
      return {
        success: false,
        error: 'Error solving Steiner tree problem',
        errorType: 'algorithm-error'
      };
    }
  }

  /**
   * Selects random terminal nodes from the graph
   */
  private static selectRandomTerminals(nodes: any[], count: number): string[] {
    const shuffled = [...nodes].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(node => node.id);
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
    
    // Add edges (treat as undirected for Steiner tree)
    graphData.links.forEach(link => {
      const sourceId = link.source;
      const targetId = link.target;
      const weight = settings.useWeights ? link.weight : 1;
      
      adjacencyList.get(sourceId)?.push({node: targetId, weight});
      adjacencyList.get(targetId)?.push({node: sourceId, weight}); // Always undirected for Steiner tree
    });
    
    return adjacencyList;
  }

  /**
   * Checks if all terminal nodes are connected
   */
  private static checkTerminalConnectivity(
    terminals: string[], 
    adjacencyList: Map<string, Array<{node: string, weight: number}>>
  ): AlgorithmResult<void> {
    if (terminals.length < 2) return { success: true };
    
    const firstTerminal = terminals[0];
    const reachable = this.getReachableNodes(firstTerminal, adjacencyList);
    
    for (let i = 1; i < terminals.length; i++) {
      if (!reachable.has(terminals[i])) {
        return {
          success: false,
          error: `Terminal nodes are disconnected: ${firstTerminal} cannot reach ${terminals[i]}`,
          errorType: 'disconnected'
        };
      }
    }
    
    return { success: true };
  }

  /**
   * Gets all nodes reachable from a starting node using BFS
   */
  private static getReachableNodes(
    start: string, 
    adjacencyList: Map<string, Array<{node: string, weight: number}>>
  ): Set<string> {
    const visited = new Set<string>();
    const queue = [start];
    visited.add(start);
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      const neighbors = adjacencyList.get(current) || [];
      
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor.node)) {
          visited.add(neighbor.node);
          queue.push(neighbor.node);
        }
      }
    }
    
    return visited;
  }

  /**
   * Finds Steiner tree using 2-approximation algorithm
   */
  private static findSteinerTree(
    terminals: string[],
    graphData: GraphData,
    adjacencyList: Map<string, Array<{node: string, weight: number}>>,
    settings: GraphSettings
  ): AlgorithmResult<SteinerTreeResult> {
    try {
      // Step 1: Compute shortest paths between all terminal pairs
      const terminalDistances = this.computeTerminalDistances(terminals, adjacencyList);
      
      // Step 2: Find MST of complete graph on terminals
      const terminalMST = this.findTerminalMST(terminals, terminalDistances);
      
      // Step 3: Replace each MST edge with its shortest path
      const pathEdges = new Map<string, GraphLink[]>();
      for (const edge of terminalMST) {
        const pathResult = this.robustPathfinding(edge.source, edge.target, adjacencyList);
        if (pathResult.success && pathResult.result) {
          pathEdges.set(`${edge.source}-${edge.target}`, pathResult.result.edges);
        } else {
          // Handle path computation failure (only for disconnected nodes now)
          return {
            success: false,
            error: pathResult.error || 'Failed to compute path between terminals',
            errorType: pathResult.errorType as any || 'algorithm-error'
          };
        }
      }
      
      // Step 4: Combine all path edges and remove cycles (create spanning tree)
      const allEdges = new Map<string, GraphLink>();
      for (const edges of pathEdges.values()) {
        for (const edge of edges) {
          const key = this.getEdgeKey(edge.source, edge.target);
          if (!allEdges.has(key)) {
            allEdges.set(key, edge);
          }
        }
      }
      
      // Step 5: Find minimum spanning tree of the combined edges
      const steinerEdges = this.findMSTFromEdges(Array.from(allEdges.values()), terminals);
      
      // Calculate total weight
      const totalWeight = steinerEdges.reduce((sum, edge) => sum + edge.weight, 0);
      
      // Identify Steiner nodes (non-terminal nodes in the tree)
      const nodesInTree = new Set<string>();
      steinerEdges.forEach(edge => {
        nodesInTree.add(edge.source);
        nodesInTree.add(edge.target);
      });
      
      const steinerNodes = Array.from(nodesInTree).filter(node => !terminals.includes(node));
      
      // Check which terminals are actually connected
      const connectedTerminals = terminals.filter(terminal => nodesInTree.has(terminal));
      
      return {
        success: true,
        result: {
          edges: steinerEdges,
          totalWeight: Math.round(totalWeight * 100) / 100,
          terminalNodes: terminals,
          steinerNodes: steinerNodes,
          isValid: this.validateSteinerTree(steinerEdges, terminals)
        }
      };
      
    } catch (error) {
      return {
        success: false,
        error: 'Error computing Steiner tree',
        errorType: 'algorithm-error'
      };
    }
  }

  /**
   * Computes shortest distances between all terminal pairs
   */
  private static computeTerminalDistances(
    terminals: string[],
    adjacencyList: Map<string, Array<{node: string, weight: number}>>
  ): Map<string, number> {
    const distances = new Map<string, number>();
    
    for (let i = 0; i < terminals.length; i++) {
      for (let j = i + 1; j < terminals.length; j++) {
        const source = terminals[i];
        const target = terminals[j];
        
        const pathResult = this.robustPathfinding(source, target, adjacencyList);
        
        if (pathResult.success && pathResult.result) {
          const key = `${source}-${target}`;
          distances.set(key, pathResult.result.distance);
        }
      }
    }
    
    return distances;
  }

  /**
   * Finds MST of complete graph on terminals using Kruskal's algorithm
   */
  private static findTerminalMST(terminals: string[], distances: Map<string, number>): GraphLink[] {
    // Create edges for complete graph on terminals
    const edges: GraphLink[] = [];
    for (let i = 0; i < terminals.length; i++) {
      for (let j = i + 1; j < terminals.length; j++) {
        const source = terminals[i];
        const target = terminals[j];
        const key = `${source}-${target}`;
        const distance = distances.get(key);
        
        if (distance !== undefined) {
          edges.push({
            source,
            target,
            weight: distance,
            isDirected: false
          });
        }
      }
    }
    
    // Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight);
    
    // Kruskal's algorithm
    const parent = new Map<string, string>();
    terminals.forEach(terminal => parent.set(terminal, terminal));
    
    const mstEdges: GraphLink[] = [];
    
    for (const edge of edges) {
      const rootSource = this.find(parent, edge.source);
      const rootTarget = this.find(parent, edge.target);
      
      if (rootSource !== rootTarget) {
        mstEdges.push(edge);
        parent.set(rootSource, rootTarget);
        
        if (mstEdges.length === terminals.length - 1) {
          break;
        }
      }
    }
    
    return mstEdges;
  }

  /**
   * Robust pathfinding that handles negative weights without getting stuck in cycles
   * Uses BFS with path length limits to avoid infinite negative cycles
   */
  private static robustPathfinding(
    start: string,
    end: string,
    adjacencyList: Map<string, Array<{node: string, weight: number}>>
  ): AlgorithmResult<{ distance: number, edges: GraphLink[] }> {
    // Check if start and end nodes exist
    if (!adjacencyList.has(start) || !adjacencyList.has(end)) {
      return {
        success: false,
        error: `Node not found: ${start} or ${end}`,
        errorType: 'invalid-input'
      };
    }
    
    // Use BFS with limited path length to avoid cycles
    const maxPathLength = adjacencyList.size; // Maximum reasonable path length
    const queue: Array<{
      node: string, 
      path: string[], 
      totalWeight: number,
      visited: Set<string>
    }> = [{
      node: start, 
      path: [start], 
      totalWeight: 0,
      visited: new Set([start])
    }];
    
    let bestPath: {path: string[], weight: number} | null = null;
    let exploredPaths = 0;
    const maxExplorations = 1000; // Prevent infinite exploration
    
    while (queue.length > 0 && exploredPaths < maxExplorations) {
      const current = queue.shift()!;
      exploredPaths++;
      
      if (current.node === end) {
        // Found a path to the target
        if (!bestPath || current.totalWeight < bestPath.weight) {
          bestPath = {
            path: [...current.path],
            weight: current.totalWeight
          };
        }
        continue; // Continue searching for better paths
      }
      
      // Don't explore paths that are too long
      if (current.path.length >= maxPathLength) {
        continue;
      }
      
      const neighbors = adjacencyList.get(current.node) || [];
      for (const neighbor of neighbors) {
        // Avoid revisiting nodes in the same path (prevents cycles)
        if (!current.visited.has(neighbor.node)) {
          const newVisited = new Set(current.visited);
          newVisited.add(neighbor.node);
          
          queue.push({
            node: neighbor.node,
            path: [...current.path, neighbor.node],
            totalWeight: current.totalWeight + neighbor.weight,
            visited: newVisited
          });
        }
      }
    }
    
    if (!bestPath) {
      return {
        success: false,
        error: `No path found from ${start} to ${end}`,
        errorType: 'disconnected'
      };
    }
    
    // Convert path to edges
    const edges: GraphLink[] = [];
    for (let i = 0; i < bestPath.path.length - 1; i++) {
      const source = bestPath.path[i];
      const target = bestPath.path[i + 1];
      const neighbors = adjacencyList.get(source) || [];
      const neighbor = neighbors.find(n => n.node === target);
      
      if (neighbor) {
        edges.push({
          source,
          target,
          weight: neighbor.weight,
          isDirected: false
        });
      }
    }
    
    return {
      success: true,
      result: {
        distance: bestPath.weight,
        edges
      }
    };
  }

  /**
   * Finds MST from a set of edges using Kruskal's algorithm
   */
  private static findMSTFromEdges(edges: GraphLink[], requiredNodes: string[]): GraphLink[] {
    // Get all nodes involved
    const allNodes = new Set<string>();
    edges.forEach(edge => {
      allNodes.add(edge.source);
      allNodes.add(edge.target);
    });
    
    // Sort edges by weight
    const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
    
    // Kruskal's algorithm
    const parent = new Map<string, string>();
    allNodes.forEach(node => parent.set(node, node));
    
    const mstEdges: GraphLink[] = [];
    
    for (const edge of sortedEdges) {
      const rootSource = this.find(parent, edge.source);
      const rootTarget = this.find(parent, edge.target);
      
      if (rootSource !== rootTarget) {
        mstEdges.push(edge);
        parent.set(rootSource, rootTarget);
        
        // Stop when we have a complete spanning tree
        if (mstEdges.length >= allNodes.size - 1) {
          break;
        }
      }
    }
    
    return mstEdges;
  }

  /**
   * Checks if all required nodes are connected by the given edges
   */
  private static areNodesConnected(nodes: string[], edges: GraphLink[]): boolean {
    if (nodes.length <= 1) return true;
    
    // Build adjacency list from edges
    const adjacencyList = new Map<string, string[]>();
    edges.forEach(edge => {
      if (!adjacencyList.has(edge.source)) adjacencyList.set(edge.source, []);
      if (!adjacencyList.has(edge.target)) adjacencyList.set(edge.target, []);
      adjacencyList.get(edge.source)!.push(edge.target);
      adjacencyList.get(edge.target)!.push(edge.source);
    });
    
    // BFS from first node
    const visited = new Set<string>();
    const queue = [nodes[0]];
    visited.add(nodes[0]);
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      const neighbors = adjacencyList.get(current) || [];
      
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    
    // Check if all required nodes are visited
    return nodes.every(node => visited.has(node));
  }

  /**
   * Union-Find helper: Find operation with path compression
   */
  private static find(parent: Map<string, string>, node: string): string {
    if (parent.get(node) !== node) {
      parent.set(node, this.find(parent, parent.get(node)!));
    }
    return parent.get(node)!;
  }

  /**
   * Creates a consistent edge key for undirected edges
   */
  private static getEdgeKey(source: string, target: string): string {
    return source < target ? `${source}-${target}` : `${target}-${source}`;
  }

  /**
   * Validates that the Steiner tree connects all terminal nodes
   */
  private static validateSteinerTree(edges: GraphLink[], terminals: string[]): boolean {
    return this.areNodesConnected(terminals, edges);
  }
} 