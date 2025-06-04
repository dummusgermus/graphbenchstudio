// Algorithm solving functionality

import { 
  MaximumCliqueAlgorithm, 
  ShortestPathAlgorithm, 
  MaximumSpanningTreeAlgorithm,
  SteinerTreeAlgorithm,
  MaxFlowAlgorithm,
  MultipartiteMatchingAlgorithm,
  GraphVisualization,
  GraphProperties,
} from '../algorithms';
import type { GraphData, GraphSettings } from '../algorithms/types';
import { showStatusMessage } from '../ui/statusMessages';

// Graph validation function for algorithms
export const validateGraphForAlgorithm = (algorithmType: string, currentGraphData: GraphData): boolean => {
  if (!currentGraphData) {
    showStatusMessage('No graph data available', 'error');
    return false;
  }
  
  switch (algorithmType) {
    case 'max-flow':
      if (!GraphProperties.isFlowNetwork(currentGraphData)) {
        showStatusMessage('Max flow algorithm requires a flow network. Please generate a flow network first.', 'warning');
        return false;
      }
      break;
      
    case 'strongly-connected-components':
      if (!currentGraphData.specialAttributes?.isStronglyConnected) {
        showStatusMessage('This algorithm works best on strongly connected graphs.', 'warning');
        // Don't return false - just warn
      }
      break;
      
    default:
      // No special validation needed for other algorithms
      break;
  }
  
  return true;
};

export const solveMaximumClique = (currentGraphData: GraphData, graph: any, settings: GraphSettings) => {
  try {
    // Run the algorithm
    const result = MaximumCliqueAlgorithm.solve(currentGraphData);
    
    if (!result.success) {
      showStatusMessage(result.error!, 'error');
      return;
    }

    // Highlight the result in the 3D graph
    GraphVisualization.highlightMaximumClique(graph, result.result!, settings);
    
  } catch (error) {
    console.error('Error solving clique:', error instanceof Error ? error.message : String(error));
    showStatusMessage('Error solving maximum clique problem', 'error');
  }
};

export const solveShortestPath = (currentGraphData: GraphData, graph: any, settings: GraphSettings) => {
  try {
    // Run the algorithm
    const result = ShortestPathAlgorithm.solve(currentGraphData, settings);
    
    if (!result.success) {
      showStatusMessage(result.error!, 'error');
      return;
    }

    // Highlight the result in the 3D graph
    GraphVisualization.highlightShortestPath(graph, result.result!, settings);
    
  } catch (error) {
    console.error('Error solving shortest path:', error instanceof Error ? error.message : String(error));
    showStatusMessage('Error solving shortest path problem', 'error');
  }
};

export const solveMaximumSpanningTree = (currentGraphData: GraphData, graph: any, settings: GraphSettings) => {
  try {
    // Run the algorithm
    const result = MaximumSpanningTreeAlgorithm.solve(currentGraphData);
    
    if (!result.success) {
      showStatusMessage(result.error!, 'error');
      return;
    }

    // Highlight the result in the 3D graph
    GraphVisualization.highlightMaximumSpanningTree(graph, result.result!, settings);
    
  } catch (error) {
    console.error('Error solving maximum spanning tree:', error instanceof Error ? error.message : String(error));
    showStatusMessage('Error solving maximum spanning tree problem', 'error');
  }
};

export const solveSteinerTree = (currentGraphData: GraphData, graph: any, settings: GraphSettings, terminalCount: number) => {
  try {
    // Run the algorithm
    const result = SteinerTreeAlgorithm.solve(currentGraphData, settings, terminalCount);
    
    if (!result.success) {
      showStatusMessage(result.error!, 'error');
      return;
    }

    // Highlight the result in the 3D graph
    GraphVisualization.highlightSteinerTree(graph, result.result!, settings);
    
  } catch (error) {
    console.error('Error solving Steiner tree:', error instanceof Error ? error.message : String(error));
    showStatusMessage('Error solving Steiner tree problem', 'error');
  }
};

export const solveMaxFlow = (currentGraphData: GraphData, graph: any, settings: GraphSettings) => {
  try {
    // Validate that we have a flow network
    if (!validateGraphForAlgorithm('max-flow', currentGraphData)) {
      return;
    }

    // Run the algorithm
    const result = MaxFlowAlgorithm.solve(currentGraphData, settings);
    
    if (!result.success) {
      showStatusMessage(result.error!, 'error');
      return;
    }

    // Show the result with more detailed information
    const maxFlowResult = result.result!;
    const minCutCapacity = maxFlowResult.minCutEdges.reduce((sum, edge) => sum + edge.capacity, 0);
    
    showStatusMessage(
      `Max flow: ${maxFlowResult.maxFlow} | Min-cut: ${maxFlowResult.minCutEdges.length} edges (capacity: ${minCutCapacity})`,
      'success'
    );

    // Apply visualization
    GraphVisualization.highlightMaxFlow(graph, maxFlowResult, settings);

  } catch (error) {
    console.error('Error solving max flow:', error);
    showStatusMessage(
      'Error solving maximum flow: ' + (error instanceof Error ? error.message : String(error)),
      'error'
    );
  }
};

export const solveMultipartiteMatching = (currentGraphData: GraphData, graph: any, settings: GraphSettings) => {
  try {
    // Validate graph type for multipartite matching
    if ((!currentGraphData.specialAttributes?.isBipartite && !currentGraphData.specialAttributes?.isMultipartite) || !currentGraphData.specialAttributes?.partitionCount) {
      showStatusMessage('Multipartite matching requires a multipartite graph. Please generate a multipartite graph first.', 'error');
      return;
    }

    showStatusMessage('Finding maximum matching...', 'warning');

    // Run the algorithm
    const result = MultipartiteMatchingAlgorithm.findMaximumMatching(currentGraphData);
    
    if (!result.success) {
      showStatusMessage(result.error!, 'error');
      return;
    }

    // Show the result
    const matchingResult = result.result!;
    const stats = MultipartiteMatchingAlgorithm.getMatchingStats(matchingResult, currentGraphData);
    
    // Debug logging
    console.log('=== MULTIPARTITE MATCHING DEBUG ===');
    console.log('Matching edges:', matchingResult.matching);
    console.log('Total nodes:', stats.totalNodes);
    console.log('Matched nodes count:', stats.matchedNodes);
    console.log('Matching efficiency:', stats.matchingEfficiency);
    console.log('Matching is valid:', matchingResult.isValid);
    console.log('Partition coverage:', stats.partitionCoverage);
    
    // Test edge coloring
    const testEdge = currentGraphData.links[0];
    if (testEdge) {
      const isTestEdgeInMatching = matchingResult.matching.some(matchedEdge => {
        return (matchedEdge.source === testEdge.source && matchedEdge.target === testEdge.target) ||
               (matchedEdge.source === testEdge.target && matchedEdge.target === testEdge.source);
      });
      console.log(`Test edge ${testEdge.source}-${testEdge.target} in matching:`, isTestEdgeInMatching);
    }
    console.log('===================================');
    
    showStatusMessage(
      `Maximum matching found: ${matchingResult.maxMatchingSize} edges (${(stats.matchingEfficiency * 100).toFixed(1)}% of nodes matched)`,
      'success'
    );

    // Highlight the result in the 3D graph using the GraphVisualization class
    GraphVisualization.highlightMultipartiteMatching(graph, matchingResult, settings);

    // Log detailed results
    console.log('Matching Result:', matchingResult);
    console.log('Matching Statistics:', stats);
    console.log('Partition Coverage:', stats.partitionCoverage);
    
  } catch (error) {
    console.error('Error solving multipartite matching:', error instanceof Error ? error.message : String(error));
    showStatusMessage('Error solving multipartite matching problem', 'error');
  }
}; 