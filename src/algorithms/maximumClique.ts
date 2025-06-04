import type { GraphData, AlgorithmResult, MaximumCliqueResult } from './types';

/**
 * Optimized Maximum Clique Algorithm using enhanced Bron-Kerbosch with pivoting
 * 
 * Finds the EXACT maximum clique in an undirected graph with optimizations:
 * - Degree-based vertex ordering
 * - Optimal pivot selection
 * - Upper bound pruning
 * - Efficient set operations
 * - Timeout handling for extremely large graphs
 * 
 * GUARANTEES: Always finds the optimal solution (if one exists within timeout)
 */
export class MaximumCliqueAlgorithm {
  
  private static readonly MAX_RUNTIME_MS = 30000; // 30 second timeout (increased for exact solutions)
  private static startTime: number = 0;
  private static bestCliqueSize: number = 0;
  
  /**
   * Solves the maximum clique problem for the given graph
   * GUARANTEES: Returns the exact maximum clique or timeout error
   */
  static solve(graphData: GraphData): AlgorithmResult<MaximumCliqueResult> {
    try {
      // Validate input
      if (!graphData.nodes || graphData.nodes.length === 0) {
        return {
          success: false,
          error: 'No graph data available for clique analysis',
          errorType: 'no-data'
        };
      }

      // Build adjacency matrix (treat all edges as undirected for clique)
      const adjacencyMatrix = this.buildAdjacencyMatrix(graphData);
      
      // Start timing and reset best clique size
      this.startTime = Date.now();
      this.bestCliqueSize = 0;
      
      // Order vertices by degree (descending) for better performance
      const verticesByDegree = this.orderVerticesByDegree(graphData.nodes.map(n => n.id), adjacencyMatrix);
      
      // Additional optimization: remove vertices that can't possibly be in a large clique
      const prunedVertices = this.pruneVerticesByDegree(verticesByDegree, adjacencyMatrix);
      
      // Find maximum clique using optimized Bron-Kerbosch algorithm
      const maxClique = this.bronKerboschOptimized(
        new Set<string>(), 
        new Set<string>(prunedVertices), 
        new Set<string>(), 
        adjacencyMatrix
      );
      
      // Verify the clique is valid
      const cliqueArray = Array.from(maxClique);
      const isValid = this.validateClique(cliqueArray, adjacencyMatrix);
      
      if (!isValid) {
        return {
          success: false,
          error: 'Algorithm error: invalid clique detected',
          errorType: 'algorithm-error'
        };
      }

      return {
        success: true,
        result: {
          clique: cliqueArray,
          isValid: true
        }
      };

    } catch (error) {
      if (error instanceof Error && error.message === 'TIMEOUT') {
        return {
          success: false,
          error: 'Algorithm timeout - graph too complex for solution within time limit. Try reducing graph size or edge density.',
          errorType: 'algorithm-error'
        };
      }
      
      return {
        success: false,
        error: 'Error solving maximum clique problem',
        errorType: 'algorithm-error'
      };
    }
  }

  /**
   * Prune vertices that cannot possibly be in a maximum clique
   * This is an exact optimization - doesn't affect optimality
   */
  private static pruneVerticesByDegree(vertices: string[], adjacencyMatrix: Map<string, Set<string>>): string[] {
    if (vertices.length === 0) return vertices;
    
    // Remove vertices whose degree + 1 is less than the current best clique size
    // (they can't possibly be in a larger clique)
    return vertices.filter(vertex => {
      const degree = adjacencyMatrix.get(vertex)?.size || 0;
      return degree + 1 >= this.bestCliqueSize;
    });
  }

  /**
   * Orders vertices by degree in descending order
   */
  private static orderVerticesByDegree(vertices: string[], adjacencyMatrix: Map<string, Set<string>>): string[] {
    return vertices.sort((a, b) => {
      const degreeA = adjacencyMatrix.get(a)?.size || 0;
      const degreeB = adjacencyMatrix.get(b)?.size || 0;
      return degreeB - degreeA; // Descending order
    });
  }

  /**
   * Builds an adjacency matrix from the graph data
   */
  private static buildAdjacencyMatrix(graphData: GraphData): Map<string, Set<string>> {
    const adjacencyMatrix = new Map<string, Set<string>>();
    
    // Initialize empty sets for all nodes
    graphData.nodes.forEach(node => {
      adjacencyMatrix.set(node.id, new Set<string>());
    });
    
    // Add edges (treat as undirected for clique analysis)
    graphData.links.forEach(link => {
      const sourceId = link.source;
      const targetId = link.target;
      adjacencyMatrix.get(sourceId)?.add(targetId);
      adjacencyMatrix.get(targetId)?.add(sourceId);
    });
    
    return adjacencyMatrix;
  }

  /**
   * Optimized Bron-Kerbosch algorithm with pivoting and pruning
   * GUARANTEES: Finds the exact maximum clique
   */
  private static bronKerboschOptimized(
    currentClique: Set<string>,
    candidates: Set<string>,
    excluded: Set<string>,
    adjacencyMatrix: Map<string, Set<string>>
  ): Set<string> {
    // Check timeout
    if (Date.now() - this.startTime > this.MAX_RUNTIME_MS) {
      throw new Error('TIMEOUT');
    }
    
    if (candidates.size === 0 && excluded.size === 0) {
      // Update best clique size for pruning
      if (currentClique.size > this.bestCliqueSize) {
        this.bestCliqueSize = currentClique.size;
      }
      return new Set(currentClique);
    }
    
    let maxClique = new Set(currentClique);
    
    // Upper bound pruning: if current + candidates can't beat best, skip
    if (currentClique.size + candidates.size <= this.bestCliqueSize) {
      return maxClique;
    }
    
    // Choose optimal pivot (vertex with maximum neighbors in candidates ∪ excluded)
    const pivot = this.choosePivot(candidates, excluded, adjacencyMatrix);
    const pivotNeighbors = adjacencyMatrix.get(pivot) || new Set<string>();
    
    // Process vertices not connected to pivot (this reduces branching significantly)
    const candidatesToProcess = Array.from(candidates).filter(v => !pivotNeighbors.has(v));
    
    // Sort candidates by degree (descending) for better early termination
    candidatesToProcess.sort((a, b) => {
      const degreeA = adjacencyMatrix.get(a)?.size || 0;
      const degreeB = adjacencyMatrix.get(b)?.size || 0;
      return degreeB - degreeA;
    });
    
    for (const vertex of candidatesToProcess) {
      const neighbors = adjacencyMatrix.get(vertex) || new Set<string>();
      
      // Additional pruning: skip if this vertex can't lead to a better solution
      const newCurrentSize = currentClique.size + 1;
      const newCandidates = this.intersectSets(candidates, neighbors);
      if (newCurrentSize + newCandidates.size <= this.bestCliqueSize) {
        candidates.delete(vertex);
        excluded.add(vertex);
        continue;
      }
      
      // Create new sets efficiently using intersection
      const newCurrentClique = new Set(currentClique);
      newCurrentClique.add(vertex);
      
      const newExcluded = this.intersectSets(excluded, neighbors);
      
      const foundClique = this.bronKerboschOptimized(
        newCurrentClique, 
        newCandidates, 
        newExcluded, 
        adjacencyMatrix
      );
      
      if (foundClique.size > maxClique.size) {
        maxClique = foundClique;
        this.bestCliqueSize = Math.max(this.bestCliqueSize, foundClique.size);
      }
      
      // Move vertex from candidates to excluded
      candidates.delete(vertex);
      excluded.add(vertex);
    }
    
    return maxClique;
  }

  /**
   * Choose optimal pivot to minimize branching
   */
  private static choosePivot(
    candidates: Set<string>, 
    excluded: Set<string>, 
    adjacencyMatrix: Map<string, Set<string>>
  ): string {
    const union = new Set([...candidates, ...excluded]);
    let bestPivot = '';
    let maxNeighbors = -1;
    
    for (const vertex of union) {
      const neighbors = adjacencyMatrix.get(vertex) || new Set<string>();
      const neighborsInCandidates = Array.from(candidates).filter(c => neighbors.has(c)).length;
      
      if (neighborsInCandidates > maxNeighbors) {
        maxNeighbors = neighborsInCandidates;
        bestPivot = vertex;
      }
    }
    
    return bestPivot || (candidates.size > 0 ? Array.from(candidates)[0] : Array.from(excluded)[0]);
  }

  /**
   * Efficient set intersection
   */
  private static intersectSets(setA: Set<string>, setB: Set<string>): Set<string> {
    const result = new Set<string>();
    const smaller = setA.size <= setB.size ? setA : setB;
    const larger = setA.size <= setB.size ? setB : setA;
    
    for (const item of smaller) {
      if (larger.has(item)) {
        result.add(item);
      }
    }
    
    return result;
  }

  /**
   * Validates that the found clique is actually a clique
   */
  private static validateClique(
    clique: string[], 
    adjacencyMatrix: Map<string, Set<string>>
  ): boolean {
    for (let i = 0; i < clique.length; i++) {
      for (let j = i + 1; j < clique.length; j++) {
        const neighbors = adjacencyMatrix.get(clique[i]) || new Set<string>();
        if (!neighbors.has(clique[j])) {
          return false;
        }
      }
    }
    return true;
  }
} 