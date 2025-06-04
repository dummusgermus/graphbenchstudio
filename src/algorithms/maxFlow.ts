import type { GraphData, AlgorithmResult, GraphSettings } from './types';
import { GraphProperties } from './graphProperties';

export interface MaxFlowResult {
  maxFlow: number;
  flowPaths: Array<{
    path: string[];
    flow: number;
  }>;
  sourceNode: string;
  sinkNode: string;
  minCutEdges: Array<{
    source: string;
    target: string;
    capacity: number;
  }>;
  finalFlow: Map<string, Map<string, number>>; // Final flow on each edge
  isValid: boolean;
}

/**
 * Maximum Flow Algorithm using Ford-Fulkerson method with BFS (Edmonds-Karp)
 * 
 * Finds the maximum flow from source to sink in a flow network.
 * Also computes the minimum cut edges.
 * Requires the graph to be a valid flow network with source and sink nodes.
 */
export class MaxFlowAlgorithm {
  
  /**
   * Solves the maximum flow problem for the given flow network
   */
  static solve(graphData: GraphData, settings: GraphSettings): AlgorithmResult<MaxFlowResult> {
    try {
      // Validate that this is a flow network
      if (!GraphProperties.isFlowNetwork(graphData)) {
        return {
          success: false,
          error: 'Graph is not a valid flow network. Please generate a flow network first.',
          errorType: 'invalid-input'
        };
      }

      // Handle both single and multiple source/sink scenarios
      const specialAttrs = graphData.specialAttributes!;
      let sourceNode: string;
      let sinkNode: string;
      let modifiedGraphData = graphData;
      
      if (specialAttrs.sourceCount && specialAttrs.sourceCount > 1 || 
          specialAttrs.sinkCount && specialAttrs.sinkCount > 1) {
        
        // Multi-source/multi-sink case: create super-source and super-sink
        console.log(`Multi-source/sink flow network: ${specialAttrs.sourceCount} sources, ${specialAttrs.sinkCount} sinks`);
        
        const { modifiedGraph, superSource, superSink } = this.createSuperSourceSink(graphData);
        modifiedGraphData = modifiedGraph;
        sourceNode = superSource;
        sinkNode = superSink;
        
      } else {
        // Single source/sink case: use existing logic
        sourceNode = specialAttrs.sourceNode!;
        sinkNode = specialAttrs.sinkNode!;
      }
      
      // Build capacity matrix
      const capacityMatrix = this.buildCapacityMatrix(modifiedGraphData);
      
      // Apply Ford-Fulkerson algorithm with BFS (Edmonds-Karp)
      const result = this.edmondsKarp(capacityMatrix, sourceNode, sinkNode, modifiedGraphData.nodes.map(n => n.id));
      
      // Find min-cut edges
      const minCutEdges = this.findMinCut(result.residualGraph, sourceNode, sinkNode, capacityMatrix, modifiedGraphData.nodes.map(n => n.id));
      
      // Filter out super-source and super-sink from results for display
      const filteredMinCutEdges = minCutEdges.filter(edge => 
        !edge.source.startsWith('super-') && !edge.target.startsWith('super-')
      );
      
      return {
        success: true,
        result: {
          maxFlow: result.maxFlow,
          flowPaths: result.flowPaths,
          sourceNode: specialAttrs.sourceNode || sourceNode,
          sinkNode: specialAttrs.sinkNode || sinkNode,
          minCutEdges: filteredMinCutEdges,
          finalFlow: result.finalFlow,
          isValid: true
        }
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error in max flow algorithm',
        errorType: 'algorithm-error'
      };
    }
  }
  
  /**
   * Creates super-source and super-sink for multi-source/multi-sink flow networks
   */
  private static createSuperSourceSink(graphData: GraphData): {
    modifiedGraph: GraphData,
    superSource: string,
    superSink: string
  } {
    const specialAttrs = graphData.specialAttributes!;
    const sourceNodes = specialAttrs.sourceNodes || [];
    const sinkNodes = specialAttrs.sinkNodes || [];
    
    // Create super-source and super-sink nodes
    const superSource = 'super-source';
    const superSink = 'super-sink';
    
    // Clone the graph data
    const modifiedNodes = [...graphData.nodes];
    const modifiedLinks = [...graphData.links];
    
    // Add super-source node
    modifiedNodes.push({
      id: superSource,
      val: 2.5, // Make it extra large for visibility
      isSource: true,
      isSuperSource: true
    });
    
    // Add super-sink node  
    modifiedNodes.push({
      id: superSink,
      val: 2.5, // Make it extra large for visibility
      isSink: true,
      isSuperSink: true
    });
    
    // Connect super-source to all original sources with infinite capacity
    sourceNodes.forEach(sourceId => {
      modifiedLinks.push({
        source: superSource,
        target: sourceId,
        weight: 999999, // Very high capacity (effectively infinite)
        capacity: 999999,
        isDirected: true,
        isSuperEdge: true
      });
    });
    
    // Connect all original sinks to super-sink with infinite capacity  
    sinkNodes.forEach(sinkId => {
      modifiedLinks.push({
        source: sinkId,
        target: superSink,
        weight: 999999, // Very high capacity (effectively infinite)
        capacity: 999999,
        isDirected: true,
        isSuperEdge: true
      });
    });
    
    const modifiedGraph: GraphData = {
      nodes: modifiedNodes,
      links: modifiedLinks,
      specialAttributes: {
        ...specialAttrs,
        superSource,
        superSink
      }
    };
    
    return { modifiedGraph, superSource, superSink };
  }
  
  /**
   * Edmonds-Karp algorithm implementation (Ford-Fulkerson with BFS)
   * More efficient than DFS version and guarantees polynomial time complexity
   */
  private static edmondsKarp(
    capacityMatrix: Map<string, Map<string, number>>,
    source: string,
    sink: string,
    nodes: string[]
  ): { 
    maxFlow: number; 
    flowPaths: Array<{ path: string[]; flow: number }>; 
    residualGraph: Map<string, Map<string, number>>;
    finalFlow: Map<string, Map<string, number>>;
  } {
    let maxFlow = 0;
    const flowPaths: Array<{ path: string[]; flow: number }> = [];
    
    // Create residual graph (copy of capacity matrix)
    const residualGraph = new Map<string, Map<string, number>>();
    for (const node of nodes) {
      residualGraph.set(node, new Map());
      for (const neighbor of nodes) {
        const capacity = capacityMatrix.get(node)?.get(neighbor) || 0;
        residualGraph.get(node)!.set(neighbor, capacity);
      }
    }
    
    // Track final flow on each edge
    const finalFlow = new Map<string, Map<string, number>>();
    for (const node of nodes) {
      finalFlow.set(node, new Map());
      for (const neighbor of nodes) {
        finalFlow.get(node)!.set(neighbor, 0);
      }
    }
    
    // Find augmenting paths using BFS until no more exist
    let pathResult: { flow: number; path: string[] };
    
    while ((pathResult = this.findAugmentingPathBFS(residualGraph, source, sink)).flow > 0) {
      const { flow: pathFlow, path } = pathResult;
      
      // Update residual graph and track flow
      for (let i = 0; i < path.length - 1; i++) {
        const u = path[i];
        const v = path[i + 1];
        
        // Decrease forward edge capacity in residual graph
        const currentCapacity = residualGraph.get(u)!.get(v)!;
        residualGraph.get(u)!.set(v, currentCapacity - pathFlow);
        
        // Increase backward edge capacity in residual graph
        const currentBackward = residualGraph.get(v)!.get(u)!;
        residualGraph.get(v)!.set(u, currentBackward + pathFlow);
        
        // Update final flow (only for original edges, not backward edges)
        if (capacityMatrix.get(u)?.get(v)! > 0) {
          const currentFlow = finalFlow.get(u)!.get(v)!;
          finalFlow.get(u)!.set(v, currentFlow + pathFlow);
        } else {
          // This is a backward edge, reduce flow in opposite direction
          const currentFlow = finalFlow.get(v)!.get(u)!;
          finalFlow.get(v)!.set(u, Math.max(0, currentFlow - pathFlow));
        }
      }
      
      maxFlow += pathFlow;
      flowPaths.push({ path: [...path], flow: pathFlow });
      
      // Prevent infinite loops
      if (flowPaths.length > 1000) {
        console.warn('Max flow: Too many iterations, stopping');
        break;
      }
    }
    
    return { maxFlow, flowPaths, residualGraph, finalFlow };
  }
  
  /**
   * Find an augmenting path using BFS (more efficient than DFS)
   */
  private static findAugmentingPathBFS(
    residualGraph: Map<string, Map<string, number>>,
    source: string,
    sink: string
  ): { flow: number; path: string[] } {
    const visited = new Set<string>();
    const parent = new Map<string, string>();
    const queue: Array<{ node: string; minFlow: number }> = [{ node: source, minFlow: Infinity }];
    
    visited.add(source);
    
    while (queue.length > 0) {
      const { node: current, minFlow } = queue.shift()!;
      
      if (current === sink) {
        // Reconstruct path
        const path: string[] = [];
        let node = sink;
        while (node !== source) {
          path.unshift(node);
          node = parent.get(node)!;
        }
        path.unshift(source);
        
        return { flow: minFlow, path };
      }
      
      const neighbors = residualGraph.get(current)!;
      for (const [neighbor, capacity] of neighbors) {
        if (!visited.has(neighbor) && capacity > 0) {
          visited.add(neighbor);
          parent.set(neighbor, current);
          queue.push({ 
            node: neighbor, 
            minFlow: Math.min(minFlow, capacity) 
          });
        }
      }
    }
    
    return { flow: 0, path: [] };
  }
  
  /**
   * Find min-cut edges using the final residual graph
   * Min-cut consists of edges from reachable to unreachable nodes from source
   */
  private static findMinCut(
    residualGraph: Map<string, Map<string, number>>,
    source: string,
    sink: string,
    originalCapacities: Map<string, Map<string, number>>,
    nodes: string[]
  ): Array<{ source: string; target: string; capacity: number }> {
    // Find all nodes reachable from source in residual graph
    const reachable = new Set<string>();
    const queue = [source];
    reachable.add(source);
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      const neighbors = residualGraph.get(current)!;
      
      for (const [neighbor, capacity] of neighbors) {
        if (!reachable.has(neighbor) && capacity > 0) {
          reachable.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    
    // Min-cut edges are those from reachable to non-reachable nodes
    const minCutEdges: Array<{ source: string; target: string; capacity: number }> = [];
    
    for (const node of nodes) {
      if (reachable.has(node)) {
        const neighbors = originalCapacities.get(node)!;
        for (const [neighbor, capacity] of neighbors) {
          if (!reachable.has(neighbor) && capacity > 0) {
            minCutEdges.push({
              source: node,
              target: neighbor,
              capacity
            });
          }
        }
      }
    }
    
    return minCutEdges;
  }
  
  /**
   * Build capacity matrix from graph data
   */
  private static buildCapacityMatrix(graphData: GraphData): Map<string, Map<string, number>> {
    const capacityMatrix = new Map<string, Map<string, number>>();
    
    // Initialize matrix
    for (const node of graphData.nodes) {
      capacityMatrix.set(node.id, new Map());
      for (const otherNode of graphData.nodes) {
        capacityMatrix.get(node.id)!.set(otherNode.id, 0);
      }
    }
    
    // Fill in capacities from links
    for (const link of graphData.links) {
      const capacity = link.capacity || link.weight || 1;
      capacityMatrix.get(link.source)!.set(link.target, capacity);
    }
    
    return capacityMatrix;
  }
} 