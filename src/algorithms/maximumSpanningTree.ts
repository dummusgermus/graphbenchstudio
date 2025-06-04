import type { GraphData, AlgorithmResult, MaximumSpanningTreeResult, GraphLink } from './types';

/**
 * Maximum Spanning Tree Algorithm using modified Kruskal's algorithm
 * 
 * Finds the spanning tree with maximum total weight in a graph.
 * A spanning tree connects all vertices with exactly n-1 edges and no cycles.
 */
export class MaximumSpanningTreeAlgorithm {
  
  /**
   * Solves the maximum spanning tree problem for the given graph
   */
  static solve(graphData: GraphData): AlgorithmResult<MaximumSpanningTreeResult> {
    try {
      // Validate input
      if (!graphData.nodes || graphData.nodes.length === 0) {
        return {
          success: false,
          error: 'No graph data available for spanning tree analysis',
          errorType: 'no-data'
        };
      }

      if (graphData.nodes.length === 1) {
        return {
          success: true,
          result: {
            edges: [],
            totalWeight: 0,
            isValid: true
          }
        };
      }

      // Convert directed edges to undirected for spanning tree
      const undirectedEdges = this.convertToUndirectedEdges(graphData.links);
      
      if (undirectedEdges.length === 0) {
        return {
          success: false,
          error: 'No edges available for spanning tree construction',
          errorType: 'no-data'
        };
      }

      // Apply Kruskal's algorithm for maximum spanning tree
      const mstEdges = this.kruskalMaximum(graphData.nodes.map(n => n.id), undirectedEdges);
      
      // Check if we have a valid spanning tree (should have n-1 edges for n nodes)
      const expectedEdges = graphData.nodes.length - 1;
      if (mstEdges.length < expectedEdges) {
        return {
          success: false,
          error: 'Graph is disconnected - cannot form spanning tree',
          errorType: 'disconnected'
        };
      }

      // Calculate total weight
      const totalWeight = mstEdges.reduce((sum, edge) => sum + edge.weight, 0);
      
      // Verify the spanning tree is valid
      const isValid = this.validateSpanningTree(graphData.nodes.map(n => n.id), mstEdges);
      
      if (!isValid) {
        return {
          success: false,
          error: 'Algorithm error: invalid spanning tree detected',
          errorType: 'algorithm-error'
        };
      }

      return {
        success: true,
        result: {
          edges: mstEdges,
          totalWeight: Math.round(totalWeight * 100) / 100, // Round to 2 decimal places
          isValid: true
        }
      };

    } catch (error) {
      return {
        success: false,
        error: 'Error solving maximum spanning tree problem',
        errorType: 'algorithm-error'
      };
    }
  }

  /**
   * Converts directed edges to undirected edges for spanning tree analysis
   */
  private static convertToUndirectedEdges(links: GraphLink[]): GraphLink[] {
    const edgeMap = new Map<string, GraphLink>();
    
    links.forEach(link => {
      const sourceId = link.source;
      const targetId = link.target;
      
      // Create a consistent key for undirected edges
      const key = sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
      
      // Keep the edge with higher weight if multiple edges exist between same nodes
      if (!edgeMap.has(key) || edgeMap.get(key)!.weight < link.weight) {
        edgeMap.set(key, {
          source: sourceId < targetId ? sourceId : targetId,
          target: sourceId < targetId ? targetId : sourceId,
          weight: link.weight,
          isDirected: false
        });
      }
    });
    
    return Array.from(edgeMap.values());
  }

  /**
   * Kruskal's algorithm modified for maximum spanning tree
   */
  private static kruskalMaximum(vertices: string[], edges: GraphLink[]): GraphLink[] {
    // Sort edges by weight in descending order (for maximum spanning tree)
    const sortedEdges = [...edges].sort((a, b) => b.weight - a.weight);
    
    // Initialize Union-Find data structure
    const parent = new Map<string, string>();
    const rank = new Map<string, number>();
    
    // Initialize each vertex as its own parent
    vertices.forEach(vertex => {
      parent.set(vertex, vertex);
      rank.set(vertex, 0);
    });
    
    const mstEdges: GraphLink[] = [];
    
    // Process edges in order of decreasing weight
    for (const edge of sortedEdges) {
      const rootSource = this.find(parent, edge.source);
      const rootTarget = this.find(parent, edge.target);
      
      // If vertices are in different components, add edge to MST
      if (rootSource !== rootTarget) {
        mstEdges.push(edge);
        this.union(parent, rank, rootSource, rootTarget);
        
        // Stop when we have n-1 edges (complete spanning tree)
        if (mstEdges.length === vertices.length - 1) {
          break;
        }
      }
    }
    
    return mstEdges;
  }

  /**
   * Find operation for Union-Find with path compression
   */
  private static find(parent: Map<string, string>, vertex: string): string {
    if (parent.get(vertex) !== vertex) {
      parent.set(vertex, this.find(parent, parent.get(vertex)!));
    }
    return parent.get(vertex)!;
  }

  /**
   * Union operation for Union-Find with union by rank
   */
  private static union(
    parent: Map<string, string>, 
    rank: Map<string, number>, 
    root1: string, 
    root2: string
  ): void {
    const rank1 = rank.get(root1) || 0;
    const rank2 = rank.get(root2) || 0;
    
    if (rank1 < rank2) {
      parent.set(root1, root2);
    } else if (rank1 > rank2) {
      parent.set(root2, root1);
    } else {
      parent.set(root2, root1);
      rank.set(root1, rank1 + 1);
    }
  }

  /**
   * Validates that the found edges form a valid spanning tree
   */
  private static validateSpanningTree(vertices: string[], edges: GraphLink[]): boolean {
    // Check if we have exactly n-1 edges
    if (edges.length !== vertices.length - 1) {
      return false;
    }
    
    // Check if all vertices are connected (using Union-Find)
    const parent = new Map<string, string>();
    vertices.forEach(vertex => parent.set(vertex, vertex));
    
    // Union all edges
    edges.forEach(edge => {
      const root1 = this.find(parent, edge.source);
      const root2 = this.find(parent, edge.target);
      if (root1 !== root2) {
        parent.set(root1, root2);
      }
    });
    
    // Check if all vertices have the same root (connected)
    const firstRoot = this.find(parent, vertices[0]);
    return vertices.every(vertex => this.find(parent, vertex) === firstRoot);
  }
} 