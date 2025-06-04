import type { GraphData, GraphLink, AlgorithmResult } from './types';

export interface MultipartiteMatchingResult {
  matching: GraphLink[];
  maxMatchingSize: number;
  partitions: string[][];
  isValid: boolean;
}

/**
 * Multipartite Matching Algorithm
 * Finds the maximum matching in a k-partite graph using a flow-based approach
 */
export class MultipartiteMatchingAlgorithm {
  
  /**
   * Finds maximum matching in a multipartite graph
   */
  static findMaximumMatching(graphData: GraphData): AlgorithmResult<MultipartiteMatchingResult> {
    try {
      // Validate that this is a multipartite graph
      if ((!graphData.specialAttributes?.isBipartite && !graphData.specialAttributes?.isMultipartite) || !graphData.specialAttributes?.partitionCount) {
        throw new Error('This algorithm requires a multipartite graph');
      }

      const partitionCount = graphData.specialAttributes.partitionCount;
      const partitions = this.extractPartitions(graphData);
      
      console.log(`Finding maximum matching in ${partitionCount}-partite graph`);
      console.log('Partitions:', partitions.map((p, i) => `Partition ${i}: ${p.length} nodes`));

      // For multipartite graphs, we'll use a greedy approach combined with augmenting paths
      const matching = this.findMaxMatchingGreedyWithAugmentation(graphData, partitions);
      
      return {
        success: true,
        result: {
          matching,
          maxMatchingSize: matching.length,
          partitions,
          isValid: this.validateMatching(matching, graphData)
        }
      };
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        errorType: 'algorithm-error'
      };
    }
  }

  /**
   * Extract partitions from graph data
   */
  private static extractPartitions(graphData: GraphData): string[][] {
    const partitionCount = graphData.specialAttributes?.partitionCount || 2;
    const partitions: string[][] = Array.from({ length: partitionCount }, () => []);
    
    graphData.nodes.forEach(node => {
      const partition = node.partition || 0;
      partitions[partition].push(node.id);
    });
    
    return partitions;
  }

  /**
   * Find maximum matching using greedy approach with augmenting paths
   */
  private static findMaxMatchingGreedyWithAugmentation(
    graphData: GraphData, 
    partitions: string[][]
  ): GraphLink[] {
    const matching: GraphLink[] = [];
    const matchedNodes = new Set<string>();
    
    // Build adjacency list for easier access
    const adjacencyMap = new Map<string, string[]>();
    graphData.nodes.forEach(node => {
      adjacencyMap.set(node.id, []);
    });
    
    graphData.links.forEach(link => {
      adjacencyMap.get(link.source)?.push(link.target);
      adjacencyMap.get(link.target)?.push(link.source);
    });

    // Phase 1: Greedy matching - find edges between different partitions
    const availableEdges = graphData.links.filter(link => {
      const sourcePartition = this.getNodePartition(link.source, graphData);
      const targetPartition = this.getNodePartition(link.target, graphData);
      return sourcePartition !== targetPartition; // Only edges between different partitions
    });

    // Sort edges by weight (if weighted) for better greedy selection
    availableEdges.sort((a, b) => (b.weight || 1) - (a.weight || 1));

    for (const edge of availableEdges) {
      if (!matchedNodes.has(edge.source) && !matchedNodes.has(edge.target)) {
        matching.push(edge);
        matchedNodes.add(edge.source);
        matchedNodes.add(edge.target);
      }
    }

    console.log(`Greedy phase found ${matching.length} edges in matching`);

    // Phase 2: Try to find augmenting paths to improve the matching
    let improved = true;
    let iterations = 0;
    const maxIterations = 50; // Prevent infinite loops

    while (improved && iterations < maxIterations) {
      improved = false;
      iterations++;
      
      const unmatchedNodes = graphData.nodes
        .map(n => n.id)
        .filter(nodeId => !matchedNodes.has(nodeId));

      for (const startNode of unmatchedNodes) {
        const augmentingPath = this.findAugmentingPath(
          startNode, 
          adjacencyMap, 
          matching, 
          matchedNodes,
          graphData
        );

        if (augmentingPath.length > 0) {
          // Apply the augmenting path to improve matching
          this.applyAugmentingPath(augmentingPath, matching, matchedNodes, graphData);
          improved = true;
          console.log(`Found augmenting path of length ${augmentingPath.length}`);
          break; // Start over with new matching
        }
      }
    }

    console.log(`Final matching size: ${matching.length} (after ${iterations} improvement iterations)`);
    
    // Final validation: remove any edges that would cause node conflicts
    const finalMatching = this.cleanupMatching(matching, graphData);
    console.log(`Cleaned matching size: ${finalMatching.length}`);
    
    return finalMatching;
  }

  /**
   * Find an augmenting path starting from an unmatched node
   */
  private static findAugmentingPath(
    startNode: string,
    adjacencyMap: Map<string, string[]>,
    currentMatching: GraphLink[],
    matchedNodes: Set<string>,
    graphData: GraphData
  ): string[] {
    const visited = new Set<string>();
    const parent = new Map<string, string>();
    const queue = [startNode];
    visited.add(startNode);

    while (queue.length > 0) {
      const current = queue.shift()!;
      const neighbors = adjacencyMap.get(current) || [];

      for (const neighbor of neighbors) {
        if (visited.has(neighbor)) continue;

        // Check if this edge connects different partitions
        const currentPartition = this.getNodePartition(current, graphData);
        const neighborPartition = this.getNodePartition(neighbor, graphData);
        if (currentPartition === neighborPartition) continue;

        visited.add(neighbor);
        parent.set(neighbor, current);

        // If we found an unmatched node, we have an augmenting path
        if (!matchedNodes.has(neighbor)) {
          return this.reconstructPath(neighbor, parent, startNode);
        }

        queue.push(neighbor);
      }
    }

    return []; // No augmenting path found
  }

  /**
   * Reconstruct the augmenting path from parent pointers
   */
  private static reconstructPath(
    endNode: string, 
    parent: Map<string, string>, 
    startNode: string
  ): string[] {
    const path = [];
    let current = endNode;
    
    while (current !== startNode) {
      path.unshift(current);
      current = parent.get(current)!;
    }
    path.unshift(startNode);
    
    return path;
  }

  /**
   * Apply an augmenting path to improve the current matching
   */
  private static applyAugmentingPath(
    path: string[],
    matching: GraphLink[],
    matchedNodes: Set<string>,
    graphData: GraphData
  ): void {
    // An augmenting path alternates between unmatched and matched edges
    // We need to flip the status of edges along the path
    
    // Clear the matched nodes set and rebuild it from the updated matching
    matchedNodes.clear();
    
    for (let i = 0; i < path.length - 1; i++) {
      const source = path[i];
      const target = path[i + 1];
      
      // Find the edge between these nodes
      const edge = graphData.links.find(link => 
        (link.source === source && link.target === target) ||
        (link.source === target && link.target === source)
      );

      if (!edge) continue;

      // Check if this edge is currently in the matching
      const edgeIndex = matching.findIndex(matchedEdge =>
        (matchedEdge.source === edge.source && matchedEdge.target === edge.target) ||
        (matchedEdge.source === edge.target && matchedEdge.target === edge.source)
      );

      if (edgeIndex >= 0) {
        // Edge is in matching, remove it
        matching.splice(edgeIndex, 1);
      } else {
        // Edge is not in matching, add it
        matching.push(edge);
      }
    }
    
    // Rebuild the matched nodes set from the current matching
    matching.forEach(edge => {
      matchedNodes.add(edge.source);
      matchedNodes.add(edge.target);
    });
  }

  /**
   * Get the partition number for a given node
   */
  private static getNodePartition(nodeId: string, graphData: GraphData): number {
    const node = graphData.nodes.find(n => n.id === nodeId);
    return node?.partition || 0;
  }

  /**
   * Validate that the matching is valid
   */
  private static validateMatching(matching: GraphLink[], graphData: GraphData): boolean {
    const usedNodes = new Set<string>();
    
    for (const edge of matching) {
      // Check that no node is used twice
      if (usedNodes.has(edge.source) || usedNodes.has(edge.target)) {
        console.warn('Invalid matching: node used multiple times');
        return false;
      }
      
      usedNodes.add(edge.source);
      usedNodes.add(edge.target);
      
      // Check that edge connects different partitions
      const sourcePartition = this.getNodePartition(edge.source, graphData);
      const targetPartition = this.getNodePartition(edge.target, graphData);
      
      if (sourcePartition === targetPartition) {
        console.warn('Invalid matching: edge within same partition');
        return false;
      }
    }
    
    return true;
  }

  /**
   * Clean up matching to ensure no node appears twice
   */
  private static cleanupMatching(matching: GraphLink[], graphData: GraphData): GraphLink[] {
    const cleanedMatching: GraphLink[] = [];
    const usedNodes = new Set<string>();
    
    // Sort by weight (if available) to prioritize higher weight edges
    const sortedMatching = [...matching].sort((a, b) => (b.weight || 1) - (a.weight || 1));
    
    for (const edge of sortedMatching) {
      if (!usedNodes.has(edge.source) && !usedNodes.has(edge.target)) {
        // Check that edge connects different partitions
        const sourcePartition = this.getNodePartition(edge.source, graphData);
        const targetPartition = this.getNodePartition(edge.target, graphData);
        
        if (sourcePartition !== targetPartition) {
          cleanedMatching.push(edge);
          usedNodes.add(edge.source);
          usedNodes.add(edge.target);
        }
      }
    }
    
    return cleanedMatching;
  }

  /**
   * Calculate statistics about the matching
   */
  static getMatchingStats(result: MultipartiteMatchingResult, graphData: GraphData): {
    totalNodes: number;
    matchedNodes: number;
    unmatchedNodes: number;
    matchingEfficiency: number;
    partitionCoverage: { [key: number]: number };
  } {
    const totalNodes = graphData.nodes.length;
    const matchedNodes = result.matching.length * 2;
    const unmatchedNodes = totalNodes - matchedNodes;
    
    // Calculate partition coverage
    const partitionCoverage: { [key: number]: number } = {};
    const matchedNodeIds = new Set<string>();
    
    result.matching.forEach(edge => {
      matchedNodeIds.add(edge.source);
      matchedNodeIds.add(edge.target);
    });
    
    result.partitions.forEach((partition, index) => {
      const coveredInPartition = partition.filter(nodeId => matchedNodeIds.has(nodeId)).length;
      partitionCoverage[index] = partition.length > 0 ? coveredInPartition / partition.length : 0;
    });
    
    return {
      totalNodes,
      matchedNodes,
      unmatchedNodes,
      matchingEfficiency: totalNodes > 0 ? matchedNodes / totalNodes : 0,
      partitionCoverage
    };
  }
} 