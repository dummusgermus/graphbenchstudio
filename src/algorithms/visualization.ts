import type { MaximumCliqueResult, ShortestPathResult, MaximumSpanningTreeResult, SteinerTreeResult, GraphSettings } from './types';

/**
 * Visualization helpers for highlighting algorithm results in the 3D graph
 */
export class GraphVisualization {
  
  /**
   * Highlights the maximum clique in the 3D graph
   */
  static highlightMaximumClique(
    graph: any, 
    result: MaximumCliqueResult,
    settings: GraphSettings
  ): void {
    const { clique } = result;
    
    // Update link colors and widths
    graph
      .linkColor((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        const isCliqueEdge = clique.includes(sourceId) && clique.includes(targetId);
        
        if (isCliqueEdge) {
          return '#00f5ff'; // Cyan for clique edges
        } else if (settings.useWeights && link.weight < 0) {
          return '#ef4444'; // Red for negative weights
        } else {
          return '#6c63ff'; // Default purple
        }
      })
      .linkWidth((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        const isCliqueEdge = clique.includes(sourceId) && clique.includes(targetId);
        
        if (isCliqueEdge) {
          return 0.8; // Slightly thicker for clique edges
        } else if (settings.useWeights) {
          return this.getWeightBasedWidth(link.weight, settings);
        } else {
          return 0.2; // Default thin edges
        }
      });
    
    // Update node rendering to highlight clique nodes
    graph.nodeThreeObject((node: any) => {
      const isHighlighted = clique.includes(node.id);
      return this.createNodeWithGlow(node, {
        color: isHighlighted ? '#00f5ff' : '#9d4edd',
        glowColor: isHighlighted ? '#80ffff' : '#bf7af0',
        glowSize: isHighlighted ? 2.0 : 1.5,
        glowOpacity: isHighlighted ? 0.6 : 0.3
      });
    });
  }
  
  /**
   * Highlights the shortest path in the 3D graph
   */
  static highlightShortestPath(
    graph: any,
    result: ShortestPathResult,
    settings: GraphSettings
  ): void {
    const { path, startNode, endNode } = result;
    
    // Update link colors and widths
    graph
      .linkColor((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        
        // Check if this edge is part of the shortest path
        const isPathEdge = path.some((nodeId, index) => {
          if (index === path.length - 1) return false;
          const nextNodeId = path[index + 1];
          return (sourceId === nodeId && targetId === nextNodeId) ||
                 (!settings.isDirected && sourceId === nextNodeId && targetId === nodeId);
        });
        
        if (isPathEdge) {
          return '#fbbf24'; // Yellow for path edges
        } else if (settings.useWeights && link.weight < 0) {
          return '#ef4444'; // Red for negative weights
        } else {
          return '#6c63ff'; // Default purple
        }
      })
      .linkWidth((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        
        // Check if this edge is part of the shortest path
        const isPathEdge = path.some((nodeId, index) => {
          if (index === path.length - 1) return false;
          const nextNodeId = path[index + 1];
          return (sourceId === nodeId && targetId === nextNodeId) ||
                 (!settings.isDirected && sourceId === nextNodeId && targetId === nodeId);
        });
        
        if (isPathEdge) {
          return 0.8; // Thicker for path edges
        } else if (settings.useWeights) {
          return this.getWeightBasedWidth(link.weight, settings);
        } else {
          return 0.2;
        }
      });
    
    // Update node rendering to highlight start, end, and path nodes
    graph.nodeThreeObject((node: any) => {
      const isStart = node.id === startNode;
      const isEnd = node.id === endNode;
      const isInPath = path.includes(node.id);
      
      let nodeStyle = {
        color: '#9d4edd', // Default purple
        glowColor: '#bf7af0',
        glowOpacity: 0.3,
        glowSize: 1.5
      };
      
      if (isStart) {
        nodeStyle = {
          color: '#10b981', // Green for start
          glowColor: '#6ee7b7',
          glowOpacity: 0.6,
          glowSize: 2.0
        };
      } else if (isEnd) {
        nodeStyle = {
          color: '#ef4444', // Red for end
          glowColor: '#fca5a5',
          glowOpacity: 0.6,
          glowSize: 2.0
        };
      } else if (isInPath) {
        nodeStyle = {
          color: '#fbbf24', // Yellow for path nodes
          glowColor: '#fde68a',
          glowOpacity: 0.5,
          glowSize: 1.8
        };
      }
      
      return this.createNodeWithGlow(node, nodeStyle);
    });
  }
  
  /**
   * Highlights the maximum spanning tree in the 3D graph
   */
  static highlightMaximumSpanningTree(
    graph: any,
    result: MaximumSpanningTreeResult,
    settings: GraphSettings
  ): void {
    const { edges } = result;
    
    // Create a set of MST edge keys for quick lookup
    const mstEdgeKeys = new Set<string>();
    edges.forEach(edge => {
      const sourceId = edge.source;
      const targetId = edge.target;
      // Create both possible keys since spanning tree edges are undirected
      mstEdgeKeys.add(`${sourceId}-${targetId}`);
      mstEdgeKeys.add(`${targetId}-${sourceId}`);
    });
    
    // Update link colors and widths
    graph
      .linkColor((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        const edgeKey1 = `${sourceId}-${targetId}`;
        const edgeKey2 = `${targetId}-${sourceId}`;
        const isMSTEdge = mstEdgeKeys.has(edgeKey1) || mstEdgeKeys.has(edgeKey2);
        
        if (isMSTEdge) {
          return '#10b981'; // Green for MST edges
        } else if (settings.useWeights && link.weight < 0) {
          return '#ef4444'; // Red for negative weights
        } else {
          return '#6c63ff'; // Default purple
        }
      })
      .linkWidth((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        const edgeKey1 = `${sourceId}-${targetId}`;
        const edgeKey2 = `${targetId}-${sourceId}`;
        const isMSTEdge = mstEdgeKeys.has(edgeKey1) || mstEdgeKeys.has(edgeKey2);
        
        if (isMSTEdge) {
          return 1.0; // Thicker for MST edges
        } else if (settings.useWeights) {
          return this.getWeightBasedWidth(link.weight, settings);
        } else {
          return 0.2;
        }
      });
    
    // Get all nodes that are part of the spanning tree
    const mstNodes = new Set<string>();
    edges.forEach(edge => {
      mstNodes.add(edge.source);
      mstNodes.add(edge.target);
    });
    
    // Update node rendering to highlight MST nodes
    graph.nodeThreeObject((node: any) => {
      const isInMST = mstNodes.has(node.id);
      return this.createNodeWithGlow(node, {
        color: isInMST ? '#10b981' : '#9d4edd',
        glowColor: isInMST ? '#6ee7b7' : '#bf7af0',
        glowSize: isInMST ? 2.0 : 1.5,
        glowOpacity: isInMST ? 0.6 : 0.3
      });
    });
  }
  
  /**
   * Highlights the Steiner tree in the 3D graph
   */
  static highlightSteinerTree(
    graph: any,
    result: SteinerTreeResult,
    settings: GraphSettings
  ): void {
    const { edges, terminalNodes, steinerNodes } = result;
    
    // Create a set of Steiner tree edge keys for quick lookup
    const steinerEdgeKeys = new Set<string>();
    edges.forEach(edge => {
      const sourceId = edge.source;
      const targetId = edge.target;
      // Create both possible keys since Steiner tree edges are undirected
      steinerEdgeKeys.add(`${sourceId}-${targetId}`);
      steinerEdgeKeys.add(`${targetId}-${sourceId}`);
    });
    
    // Update link colors and widths
    graph
      .linkColor((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        const edgeKey1 = `${sourceId}-${targetId}`;
        const edgeKey2 = `${targetId}-${sourceId}`;
        const isSteinerEdge = steinerEdgeKeys.has(edgeKey1) || steinerEdgeKeys.has(edgeKey2);
        
        // PRIORITY: Steiner tree edges override all other coloring
        if (isSteinerEdge) {
          return '#f59e0b'; // Orange for Steiner tree edges
        } else if (settings.useWeights && link.weight < 0) {
          return '#ef4444'; // Red for negative weights
        } else {
          return '#6c63ff'; // Default purple
        }
      })
      .linkWidth((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        const edgeKey1 = `${sourceId}-${targetId}`;
        const edgeKey2 = `${targetId}-${sourceId}`;
        const isSteinerEdge = steinerEdgeKeys.has(edgeKey1) || steinerEdgeKeys.has(edgeKey2);
        
        if (isSteinerEdge) {
          return 1.0; // Thicker for Steiner tree edges
        } else if (settings.useWeights) {
          return this.getWeightBasedWidth(link.weight, settings);
        } else {
          return 0.2;
        }
      });
    
    // Update node rendering to highlight terminal and Steiner nodes differently
    graph.nodeThreeObject((node: any) => {
      const isTerminal = terminalNodes.includes(node.id);
      const isSteiner = steinerNodes.includes(node.id);
      
      let nodeStyle = {
        color: '#9d4edd', // Default purple
        glowColor: '#bf7af0',
        glowOpacity: 0.3,
        glowSize: 1.5
      };
      
      if (isTerminal) {
        nodeStyle = {
          color: '#dc2626', // Red for terminal nodes
          glowColor: '#fca5a5',
          glowOpacity: 0.7,
          glowSize: 2.2
        };
      } else if (isSteiner) {
        nodeStyle = {
          color: '#f59e0b', // Orange for Steiner nodes
          glowColor: '#fde68a',
          glowOpacity: 0.6,
          glowSize: 1.8
        };
      }
      
      return this.createNodeWithGlow(node, nodeStyle);
    });
  }
  
  /**
   * Highlights the multipartite matching in the 3D graph
   */
  static highlightMultipartiteMatching(
    graph: any,
    result: any, // MultipartiteMatchingResult
    settings: GraphSettings
  ): void {
    const { matching } = result;
    
    // Create a set of matching edge keys for quick lookup
    const matchingEdgeKeys = new Set<string>();
    matching.forEach((edge: any) => {
      const sourceId = edge.source;
      const targetId = edge.target;
      // Create both possible keys since matching edges are undirected
      matchingEdgeKeys.add(`${sourceId}-${targetId}`);
      matchingEdgeKeys.add(`${targetId}-${sourceId}`);
    });
    
    console.log('GraphVisualization.highlightMultipartiteMatching called');
    console.log('Matching edges:', matching);
    console.log('Matching edge keys:', matchingEdgeKeys);
    
    // Update link colors and widths
    graph
      .linkColor((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        const edgeKey1 = `${sourceId}-${targetId}`;
        const edgeKey2 = `${targetId}-${sourceId}`;
        const isMatchingEdge = matchingEdgeKeys.has(edgeKey1) || matchingEdgeKeys.has(edgeKey2);
        
        if (isMatchingEdge) {
          console.log(`✓ Highlighting matching edge ${sourceId}-${targetId}`);
          return '#ff6b35'; // Orange for matching edges
        } else if (settings.useWeights && link.weight < 0) {
          return '#ef4444'; // Red for negative weights
        } else {
          return '#6c63ff40'; // Dimmed purple for non-matching edges
        }
      })
      .linkWidth((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        const edgeKey1 = `${sourceId}-${targetId}`;
        const edgeKey2 = `${targetId}-${sourceId}`;
        const isMatchingEdge = matchingEdgeKeys.has(edgeKey1) || matchingEdgeKeys.has(edgeKey2);
        
        if (isMatchingEdge) {
          return 1.5; // Thicker for matching edges
        } else if (settings.useWeights) {
          return this.getWeightBasedWidth(link.weight, settings) * 0.3; // Much thinner for non-matching
        } else {
          return 0.08; // Very thin for non-matching edges
        }
      });
    
    // Keep the existing node coloring (partition colors should remain)
    // The multipartite graph nodes should already be colored by partition
  }
  
  /**
   * Highlights the maximum flow result in the 3D graph
   */
  static highlightMaxFlow(
    graph: any,
    result: any, // MaxFlowResult  
    settings: GraphSettings
  ): void {
    const { flowPaths, minCutEdges, finalFlow, sourceNode, sinkNode } = result;
    
    console.log('GraphVisualization.highlightMaxFlow called');
    console.log('Flow paths:', flowPaths);
    console.log('Min-cut edges:', minCutEdges);
    console.log('Final flow:', finalFlow);
    
    // Create sets for quick lookup
    const minCutEdgeKeys = new Set<string>();
    const flowEdgeKeys = new Set<string>();
    const saturatedEdgeKeys = new Set<string>(); // Edges that are at full capacity
    
    // Add min-cut edges (these are the bottleneck!)
    minCutEdges.forEach((edge: any) => {
      minCutEdgeKeys.add(`${edge.source}-${edge.target}`);
    });
    
    // Add flow edges and identify saturated ones
    for (const [sourceId, neighbors] of finalFlow) {
      for (const [targetId, flow] of neighbors) {
        if (flow > 0) {
          const edgeKey = `${sourceId}-${targetId}`;
          flowEdgeKeys.add(edgeKey);
          
          // Check if this edge is saturated (flow equals capacity)
          // We need to find the original edge to get its capacity
          // This will be checked in the link styling functions
        }
      }
    }
    
    console.log('Flow edge keys:', flowEdgeKeys);
    console.log('Min-cut edge keys:', minCutEdgeKeys);
    
    // Update link colors and widths with much clearer meaning
    graph
      .linkColor((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        const edgeKey = `${sourceId}-${targetId}`;
        
        const isMinCutEdge = minCutEdgeKeys.has(edgeKey);
        const hasFlow = flowEdgeKeys.has(edgeKey);
        const flowAmount = finalFlow.get(sourceId)?.get(targetId) || 0;
        const capacity = link.capacity || link.weight || 1;
        const isSaturated = hasFlow && Math.abs(flowAmount - capacity) < 0.001; // Nearly equal (floating point safe)
        
        if (isMinCutEdge) {
          // MIN-CUT EDGES: These are the bottleneck that limits the max flow!
          console.log(`✓ Highlighting min-cut edge ${sourceId}-${targetId} (capacity: ${capacity})`);
          return '#ff1744'; // Bright red for min-cut - the bottleneck!
        } else if (isSaturated) {
          // SATURATED EDGES: These are at full capacity (part of the flow)
          console.log(`✓ Highlighting saturated edge ${sourceId}-${targetId} (${flowAmount}/${capacity})`);
          return '#ff9800'; // Orange for saturated edges
        } else if (hasFlow) {
          // FLOW EDGES: These carry flow but aren't saturated
          console.log(`✓ Highlighting flow edge ${sourceId}-${targetId} (${flowAmount}/${capacity})`);
          return '#4caf50'; // Green for edges with flow
        } else {
          // UNUSED EDGES: No flow
          return '#666666'; // Gray for unused edges (more subdued)
        }
      })
      .linkWidth((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        const edgeKey = `${sourceId}-${targetId}`;
        
        const isMinCutEdge = minCutEdgeKeys.has(edgeKey);
        const hasFlow = flowEdgeKeys.has(edgeKey);
        const flowAmount = finalFlow.get(sourceId)?.get(targetId) || 0;
        const capacity = link.capacity || link.weight || 1;
        const isSaturated = hasFlow && Math.abs(flowAmount - capacity) < 0.001;
        
        if (isMinCutEdge) {
          return 2.0; // Very thick for min-cut edges - these are important!
        } else if (isSaturated) {
          return 1.5; // Thick for saturated edges
        } else if (hasFlow && flowAmount > 0) {
          // Scale width based on flow amount
          const flowRatio = flowAmount / capacity;
          return 0.4 + (flowRatio * 0.8); // Range: 0.4 to 1.2 based on flow
        } else {
          return 0.15; // Very thin for unused edges
        }
      })
      .linkLabel((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        const flowAmount = finalFlow.get(sourceId)?.get(targetId) || 0;
        const capacity = link.capacity || link.weight || 1;
        const edgeKey = `${sourceId}-${targetId}`;
        const isSaturated = flowAmount > 0 && Math.abs(flowAmount - capacity) < 0.001;
        
        if (minCutEdgeKeys.has(edgeKey)) {
          return `🚫 MIN-CUT\nBottleneck: ${flowAmount}/${capacity}`;
        } else if (isSaturated) {
          return `🔥 SATURATED\nFlow: ${flowAmount}/${capacity}`;
        } else if (flowAmount > 0) {
          return `➡️ Flow: ${flowAmount}/${capacity}`;
        }
        return `Capacity: ${capacity}`;
      });
    
    // Update node rendering with clearer meaning
    graph.nodeThreeObject((node: any) => {
      const isSource = node.id === sourceNode || node.isSource;
      const isSink = node.id === sinkNode || node.isSink;
      const isSuperSource = node.isSuperSource;
      const isSuperSink = node.isSuperSink;
      
      // Check if this node is part of the min-cut set
      // A node is in the min-cut source side if there's a min-cut edge going OUT from it
      let isMinCutSourceSide = false;
      let isMinCutSinkSide = false;
      
      for (const edge of minCutEdges) {
        if (edge.source === node.id) {
          isMinCutSourceSide = true;
          break;
        }
        if (edge.target === node.id) {
          isMinCutSinkSide = true;
          break;
        }
      }
      
      let nodeStyle = {
        color: '#9e9e9e', // Default gray for regular nodes
        glowColor: '#bdbdbd',
        glowOpacity: 0.2,
        glowSize: 1.3
      };
      
      if (isSuperSource) {
        nodeStyle = {
          color: '#1b5e20', // Dark green for super-source
          glowColor: '#4caf50',
          glowOpacity: 0.8,
          glowSize: 2.5
        };
      } else if (isSuperSink) {
        nodeStyle = {
          color: '#b71c1c', // Dark red for super-sink
          glowColor: '#f44336',
          glowOpacity: 0.8,
          glowSize: 2.5
        };
      } else if (isSource) {
        nodeStyle = {
          color: '#2e7d32', // Green for source
          glowColor: '#66bb6a',
          glowOpacity: 0.7,
          glowSize: 2.2
        };
      } else if (isSink) {
        nodeStyle = {
          color: '#c62828', // Red for sink
          glowColor: '#ef5350',
          glowOpacity: 0.7,
          glowSize: 2.2
        };
      } else if (isMinCutSourceSide) {
        nodeStyle = {
          color: '#1976d2', // Blue for nodes on source side of min-cut
          glowColor: '#42a5f5',
          glowOpacity: 0.5,
          glowSize: 1.8
        };
      } else if (isMinCutSinkSide) {
        nodeStyle = {
          color: '#7b1fa2', // Purple for nodes on sink side of min-cut
          glowColor: '#ba68c8',
          glowOpacity: 0.5,
          glowSize: 1.8
        };
      }
      
      return this.createNodeWithGlow(node, nodeStyle);
    });
  }
  
  /**
   * Calculates edge width based on weight
   */
  private static getWeightBasedWidth(weight: number, settings: GraphSettings): number {
    const normalizedWeight = Math.abs(weight || 1);
    const maxInputWeight = Math.max(Math.abs(settings.minWeight), Math.abs(settings.maxWeight));
    const weightRatio = normalizedWeight / maxInputWeight;
    return 0.1 + (weightRatio * 0.7); // Range: 0.1 to 0.8
  }
  
  /**
   * Creates a node with glow effect for 3D visualization
   */
  private static createNodeWithGlow(node: any, style: {
    color: string,
    glowColor: string,
    glowOpacity: number,
    glowSize: number
  }): any {
    // @ts-ignore - THREE is available from global scope
    const nodeGeometry = new THREE.SphereGeometry(node.val || 1);
    
    // Main node material
    // @ts-ignore - THREE is available from global scope
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: style.color,
      transparent: false
    });
    
    // @ts-ignore - THREE is available from global scope
    const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
    
    // Glow effect
    // @ts-ignore - THREE is available from global scope
    const glowGeometry = new THREE.SphereGeometry((node.val || 1) * style.glowSize);
    // @ts-ignore - THREE is available from global scope
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: style.glowColor,
      transparent: true,
      opacity: style.glowOpacity
    });
    
    // @ts-ignore - THREE is available from global scope
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    
    // Group both meshes
    // @ts-ignore - THREE is available from global scope
    const group = new THREE.Group();
    group.add(nodeMesh);
    group.add(glowMesh);
    
    return group;
  }
} 