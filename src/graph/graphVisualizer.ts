// 3D Graph Visualization Management

import type { GraphData } from '../algorithms/types';
import { generateGraphFromProperties } from './graphGenerator';
import { 
  solveMaximumClique, 
  solveShortestPath, 
  solveMaximumSpanningTree, 
  solveSteinerTree, 
  solveMaxFlow,
  solveMultipartiteMatching
} from './algorithmSolver';
import { initializeInfoPanel, selectedEdge, selectedNode } from '../ui/infoPanel';
import { showStatusMessage } from '../ui/statusMessages';
import { 
  initializeDefaultProperties, 
  initializeTags, 
  activeProperties,
  getPartitionRatios
} from '../ui/uiState';

// Simple verification function
export const verifyGraphData = (graphData: GraphData) => {
  console.log('=== GRAPH DATA VERIFICATION ===');
  console.log('Nodes:', graphData.nodes.length);
  console.log('Links:', graphData.links.length);
  console.log('Sample nodes:', graphData.nodes.slice(0, 3));
  console.log('Sample links:', graphData.links.slice(0, 3));
  
  if (graphData.links.length > 0) {
    const firstLink = graphData.links[0];
    console.log('First link structure:', firstLink);
    console.log('Source type:', typeof firstLink.source, 'Value:', firstLink.source);
    console.log('Target type:', typeof firstLink.target, 'Value:', firstLink.target);
  }
  console.log('=== END VERIFICATION ===');
};

export const initializeGraphVisualizer = (activeProperties: Set<string>) => {
  // Get the graph container
  const graphContainer = document.getElementById('graph-canvas');
  if (!graphContainer) {
    console.error('Graph canvas element not found!');
    return null;
  }
  
  // Clear any existing content
  graphContainer.innerHTML = '';
  
  // Create a graph instance - note: ForceGraph3D is now a global
  // @ts-ignore - ForceGraph3D is loaded from the script
  const ForceGraph3D = window.ForceGraph3D;
  if (!ForceGraph3D) {
    console.error('ForceGraph3D not found in global scope');
    return null;
  }
  
  // Initialize the graph with simple configuration
  const graph = ForceGraph3D()
    .width(graphContainer.clientWidth)
    .height(graphContainer.clientHeight)
    .backgroundColor('#111827')
    .nodeRelSize(5) // Smaller nodes
    .linkColor(() => '#6c63ff')
    .linkWidth(0.2) // Much thinner edges
    .linkOpacity(0.7);
  
  // Attach to DOM
  graph(graphContainer);
  
  // Set initial camera distance for zoom effect
  graph.cameraPosition({ z: 300 });
  
  // Store the current graph data for algorithms
  let currentGraphData: GraphData = {nodes: [], links: []};
  
  // Callback system for graph data changes
  let graphDataChangeCallbacks: Array<(graphData: GraphData) => void> = [];
  
  const addGraphDataChangeCallback = (callback: (graphData: GraphData) => void) => {
    graphDataChangeCallbacks.push(callback);
  };
  
  const notifyGraphDataChange = () => {
    graphDataChangeCallbacks.forEach(callback => {
      try {
        callback(currentGraphData);
      } catch (error) {
        console.error('Error in graph data change callback:', error);
      }
    });
  };

  // Helper function to reset graph visualization to default state
  const resetGraphVisualization = () => {
    // Reset highlighting - restore default node rendering
    graph.nodeThreeObject((node: any) => {
      // @ts-ignore - THREE is available from global scope
      const nodeGeometry = new THREE.SphereGeometry(node.val || 1);
      
      let nodeColor = '#9d4edd'; // Default purple
      let glowColor = '#bf7af0';
      
      // Check if this is a multi-partite graph and apply partition coloring
      if ((currentGraphData.specialAttributes?.isBipartite || currentGraphData.specialAttributes?.isMultipartite) && currentGraphData.specialAttributes?.partitionCount && node.partition !== undefined) {
        const partitionColors = [
          '#ff4444', // Pure red
          '#44ff44', // Pure green  
          '#4444ff', // Pure blue
          '#ffaa00', // Orange
          '#ff44ff', // Magenta
          '#00ffff', // Cyan
          '#ffff00', // Yellow
          '#8844ff', // Purple
          '#00ff88', // Lime green
          '#ff8800'  // Dark orange
        ];
        const partitionIndex = node.partition || 0;
        nodeColor = partitionColors[partitionIndex % partitionColors.length];
        glowColor = nodeColor;
      }
      
      // @ts-ignore - THREE is available from global scope
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: nodeColor,
        transparent: false
      });
      
      // @ts-ignore - THREE is available from global scope
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      
      // Glow effect (larger, transparent sphere)
      // @ts-ignore - THREE is available from global scope
      const glowGeometry = new THREE.SphereGeometry((node.val || 1) * 1.5);
      // @ts-ignore - THREE is available from global scope
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: glowColor,
        transparent: true,
        opacity: 0.3
      });
      
      // @ts-ignore - THREE is available from global scope
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      
      // Group both meshes
      // @ts-ignore - THREE is available from global scope
      const group = new THREE.Group();
      group.add(nodeMesh);
      group.add(glowMesh);
      
      return group;
    });
  };

  // Initialize information panel
  const infoPanelHandlers = initializeInfoPanel(graph, resetGraphVisualization, activeProperties);
  
  if (infoPanelHandlers) {
    // Add click handlers for nodes and edges
    graph
      .onNodeClick((node: any) => {
        infoPanelHandlers.showNodeInfo(node);
        
        // Update node highlighting
        graph.nodeThreeObject((n: any) => {
          // @ts-ignore - THREE is available from global scope
          const nodeGeometry = new THREE.SphereGeometry(n.val || 1);
          
          let nodeColor = '#9d4edd'; // Default purple
          let glowColor = '#bf7af0';
          let nodeSize = n.val || 1;
          
          // Check if this is the selected node
          if (n === selectedNode) {
            nodeColor = '#ff8c00'; // Orange-yellow for selected node
            glowColor = '#ffb347';
            nodeSize = (n.val || 1) * 1.3; // Make selected node larger
          } else {
            // Check for multi-partite coloring first
            if ((currentGraphData.specialAttributes?.isBipartite || currentGraphData.specialAttributes?.isMultipartite) && currentGraphData.specialAttributes?.partitionCount && n.partition !== undefined) {
              const partitionColors = [
                '#ff4444', // Pure red
                '#44ff44', // Pure green  
                '#4444ff', // Pure blue
                '#ffaa00', // Orange
                '#ff44ff', // Magenta
                '#00ffff', // Cyan
                '#ffff00', // Yellow
                '#8844ff', // Purple
                '#00ff88', // Lime green
                '#ff8800'  // Dark orange
              ];
              const partitionIndex = n.partition || 0;
              nodeColor = partitionColors[partitionIndex % partitionColors.length];
              glowColor = nodeColor;
            } else {
              // Special colors for flow network nodes
              const isSource = n.isSource;
              const isSink = n.isSink;
              
              if (isSource) {
                nodeColor = '#10b981'; // Green for source
                glowColor = '#34d399';
              } else if (isSink) {
                nodeColor = '#ef4444'; // Red for sink
                glowColor = '#f87171';
              }
            }
          }
          
          // @ts-ignore - THREE is available from global scope
          const nodeMaterial = new THREE.MeshBasicMaterial({
            color: nodeColor,
            transparent: false
          });
          
          // @ts-ignore - THREE is available from global scope
          const nodeMesh = new THREE.Mesh(new THREE.SphereGeometry(nodeSize), nodeMaterial);
          
          // Glow effect
          // @ts-ignore - THREE is available from global scope
          const glowGeometry = new THREE.SphereGeometry(nodeSize * 1.5);
          // @ts-ignore - THREE is available from global scope
          const glowMaterial = new THREE.MeshBasicMaterial({
            color: glowColor,
            transparent: true,
            opacity: 0.3
          });
          
          // @ts-ignore - THREE is available from global scope
          const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
          
          // Group both meshes
          // @ts-ignore - THREE is available from global scope
          const group = new THREE.Group();
          group.add(nodeMesh);
          group.add(glowMesh);
          
          return group;
        });
      })
      .onLinkClick((link: any) => {
        infoPanelHandlers.showEdgeInfo(link, currentGraphData);
        
        // Update graph styling to highlight the selected edge
        graph.linkColor((l: any) => {
          if (l === selectedEdge) {
            return '#ff8c00'; // Orange-yellow color for selected edge
          }
          
          // Default colors based on edge type
          if (activeProperties.has('weighted') && l.weight < 0) {
            return '#ef4444'; // Red for negative weights
          }
          if (currentGraphData.specialAttributes?.isFlowNetwork) {
            return '#10b981'; // Green for flow network edges
          }
          return '#6c63ff'; // Default purple
        });
        
        // Update graph link width to make selected edge thicker
        graph.linkWidth((l: any) => {
          const minWeightInput = document.getElementById('min-weight') as HTMLInputElement;
          const maxWeightInput = document.getElementById('max-weight') as HTMLInputElement;
          
          if (l === selectedEdge) {
            // Make selected edge thicker
            const baseWidth = activeProperties.has('weighted') || currentGraphData.specialAttributes?.isFlowNetwork 
              ? 0.1 + ((Math.abs(l.weight || l.capacity || 1) / Math.max(Math.abs(parseFloat(minWeightInput?.value || '1')), Math.abs(parseFloat(maxWeightInput?.value || '5')))) * 0.7)
              : 0.2;
            return baseWidth * 2.5; // Make it 2.5x thicker
          }
          
          // Default width calculation
          if (activeProperties.has('weighted') || currentGraphData.specialAttributes?.isFlowNetwork) {
            const normalizedWeight = Math.abs(l.weight || l.capacity || 1);
            const maxInputWeight = Math.max(Math.abs(parseFloat(minWeightInput?.value || '1')), Math.abs(parseFloat(maxWeightInput?.value || '5')));
            const weightRatio = normalizedWeight / maxInputWeight;
            return 0.1 + (weightRatio * 0.7);
          }
          return 0.2;
        });
      })
      .linkHoverPrecision(300); // Increase edge hitbox significantly to make them easier to click
  }
  
  // Add custom node rendering for glow effect
  graph.nodeThreeObject((node: any) => {
    // @ts-ignore - THREE is available from global scope
    const nodeGeometry = new THREE.SphereGeometry(node.val || 1);
    
    // Main node material (solid purple)
    // @ts-ignore - THREE is available from global scope
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: '#9d4edd',
      transparent: false
    });
    
    // @ts-ignore - THREE is available from global scope
    const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
    
    // Glow effect (larger, transparent sphere)
    // @ts-ignore - THREE is available from global scope
    const glowGeometry = new THREE.SphereGeometry((node.val || 1) * 1.5);
    // @ts-ignore - THREE is available from global scope
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: '#bf7af0',
      transparent: true,
      opacity: 0.3
    });
    
    // @ts-ignore - THREE is available from global scope
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    
    // Group both meshes
    // @ts-ignore - THREE is available from global scope
    const group = new THREE.Group();
    group.add(nodeMesh);
    group.add(glowMesh);
    
    return group;
  });

  // Generate and solve functions
  const generateGraph = () => {
    try {
      // Get generation parameters
      const nodeCountInput = document.getElementById('node-count') as HTMLInputElement;
      const edgeProbabilityInput = document.getElementById('edge-probability') as HTMLInputElement;
      const minWeightInput = document.getElementById('min-weight') as HTMLInputElement;
      const maxWeightInput = document.getElementById('max-weight') as HTMLInputElement;
      const componentCountValue = document.getElementById('component-count-value') as HTMLInputElement;
      const partitionCountValue = document.getElementById('partition-count-value') as HTMLInputElement;
      const sourceCountInput = document.getElementById('source-count') as HTMLInputElement;
      const sinkCountInput = document.getElementById('sink-count') as HTMLInputElement;
      const erdosRenyiConnectionsInput = document.getElementById('erdos-renyi-connections') as HTMLInputElement;
      
      const nodeCount = parseInt(nodeCountInput?.value || '20', 10);
      const edgeProbability = parseFloat(edgeProbabilityInput?.value || '0.3');
      const minWeight = parseFloat(minWeightInput?.value || '1');
      const maxWeight = parseFloat(maxWeightInput?.value || '5');
      const componentCount = parseInt(componentCountValue?.value || '2');
      const partitionCount = parseInt(partitionCountValue?.value || '2');
      const sourceCount = parseInt(sourceCountInput?.value || '1');
      const sinkCount = parseInt(sinkCountInput?.value || '1');
      const erdosRenyiConnections = parseInt(erdosRenyiConnectionsInput?.value || '1');
      const partitionRatios = getPartitionRatios(); // Get current partition ratios
      
      console.log('=== GRAPH GENERATION DEBUG ===');
      console.log('Active properties:', Array.from(activeProperties));
      console.log('Partition count from UI:', partitionCount);
      console.log('Partition ratios from UI:', partitionRatios);
      console.log('============================');
      
      // Generate graph based on active properties
      const generatedGraphData = generateGraphFromProperties(
        activeProperties,
        nodeCount,
        edgeProbability,
        minWeight,
        maxWeight,
        componentCount,
        partitionCount,
        partitionRatios,
        sourceCount,
        sinkCount,
        erdosRenyiConnections
      );
      
      // Store the graph data
      currentGraphData = generatedGraphData;
      
      // Notify callbacks about graph data change
      notifyGraphDataChange();
      
      console.log(`Generated graph: ${generatedGraphData.nodes.length} nodes, ${generatedGraphData.links.length} links`);
      console.log('Special attributes:', generatedGraphData.specialAttributes);
      console.log('Sample links:', generatedGraphData.links.slice(0, 3));
      console.log('Sample nodes with partitions:', generatedGraphData.nodes.slice(0, 5).map(n => ({ id: n.id, partition: n.partition })));
      
      // Prepare data for 3D visualization (make copies to avoid mutation)
      const visualizationNodes = generatedGraphData.nodes.map(n => ({...n}));
      const visualizationLinks = generatedGraphData.links.map(l => ({...l}));
      
      // Update the graph (this will modify the visualization arrays)
      graph.graphData({ nodes: visualizationNodes, links: visualizationLinks });
      
      // Special positioning for multi-partite graphs
      if ((generatedGraphData.specialAttributes?.isBipartite || generatedGraphData.specialAttributes?.isMultipartite) && generatedGraphData.specialAttributes?.partitionCount) {
        const partitionCount = generatedGraphData.specialAttributes.partitionCount;
        const radius = 100; // Base radius for positioning
        
        // Position nodes in circular arrangement by partition
        visualizationNodes.forEach((node: any, index: number) => {
          const partition = node.partition || 0;
          const nodesInPartition = visualizationNodes.filter((n: any) => (n.partition || 0) === partition);
          const nodeIndexInPartition = nodesInPartition.findIndex((n: any) => n.id === node.id);
          
          // Calculate angle for this partition
          const partitionAngle = (partition * 2 * Math.PI) / partitionCount;
          
          // Calculate position within partition (spread nodes in a small arc)
          const angleSpread = Math.PI / (partitionCount * 2); // Spread within partition
          const nodeAngle = partitionAngle + (nodeIndexInPartition - (nodesInPartition.length - 1) / 2) * angleSpread / Math.max(1, nodesInPartition.length - 1);
          
          // Set position
          node.x = radius * Math.cos(nodeAngle);
          node.y = radius * Math.sin(nodeAngle);
          node.z = 0; // Keep in 2D plane for clarity
        });
        
        // Update graph with positioned nodes
        graph.graphData({ nodes: visualizationNodes, links: visualizationLinks });
      }
      
      // Special positioning for flow networks
      if (generatedGraphData.specialAttributes?.isFlowNetwork) {
        const sourceNodes = visualizationNodes.filter((n: any) => n.isSource);
        const sinkNodes = visualizationNodes.filter((n: any) => n.isSink);
        const intermediateNodes = visualizationNodes.filter((n: any) => !n.isSource && !n.isSink);
        
        const canvasWidth = 400; // Increased layout width
        const canvasHeight = 300; // Increased layout height
        const canvasDepth = 200; // Add depth for 3D positioning
        
        if (sourceNodes.length > 0 && sinkNodes.length > 0) {
          // Position sources on the left side
          if (sourceNodes.length === 1) {
            // Single source: center it
            (sourceNodes[0] as any).x = -canvasWidth / 2;
            (sourceNodes[0] as any).y = 0;
            (sourceNodes[0] as any).z = 0;
            (sourceNodes[0] as any).val = 2.0; // Make source significantly larger
          } else {
            // Multiple sources: arrange in a vertical column
            sourceNodes.forEach((sourceNode: any, index: number) => {
              sourceNode.x = -canvasWidth / 2;
              sourceNode.y = -canvasHeight / 2 + (index / Math.max(1, sourceNodes.length - 1)) * canvasHeight;
              sourceNode.z = 0;
              sourceNode.val = 2.0; // Make sources significantly larger
            });
          }
          
          // Position sinks on the right side
          if (sinkNodes.length === 1) {
            // Single sink: center it
            (sinkNodes[0] as any).x = canvasWidth / 2;
            (sinkNodes[0] as any).y = 0;
            (sinkNodes[0] as any).z = 0;
            (sinkNodes[0] as any).val = 2.0; // Make sink significantly larger
          } else {
            // Multiple sinks: arrange in a vertical column
            sinkNodes.forEach((sinkNode: any, index: number) => {
              sinkNode.x = canvasWidth / 2;
              sinkNode.y = -canvasHeight / 2 + (index / Math.max(1, sinkNodes.length - 1)) * canvasHeight;
              sinkNode.z = 0;
              sinkNode.val = 2.0; // Make sinks significantly larger
            });
          }
          
          // Position intermediate nodes in layers between source and sink
          if (intermediateNodes.length > 0) {
            // Calculate optimal number of layers based on network structure
            const maxLayerCount = Math.min(4, Math.max(1, Math.ceil(intermediateNodes.length / 3)));
            
            // Try to assign nodes to layers based on their connectivity patterns
            const nodeDistanceFromSource = new Map<string, number>();
            
            // BFS to calculate distance from source
            const queue = [{id: sourceNodes[0].id, distance: 0}];
            const visited = new Set<string>();
            visited.add(sourceNodes[0].id);
            nodeDistanceFromSource.set(sourceNodes[0].id, 0);
            
            while (queue.length > 0) {
              const {id: currentId, distance} = queue.shift()!;
              
              // Find outgoing edges from current node
              visualizationLinks.forEach((link: any) => {
                const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
                const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                
                if (sourceId === currentId && !visited.has(targetId)) {
                  visited.add(targetId);
                  nodeDistanceFromSource.set(targetId, distance + 1);
                  queue.push({id: targetId, distance: distance + 1});
                }
              });
            }
            
            // Group intermediate nodes by their distance from source
            const layerAssignments = new Map<number, any[]>();
            
            intermediateNodes.forEach((node: any) => {
              const distance = nodeDistanceFromSource.get(node.id) || 1;
              // Normalize distance to layer index (0 to maxLayerCount-1)
              const layerIndex = Math.min(maxLayerCount - 1, Math.max(0, distance - 1));
              
              if (!layerAssignments.has(layerIndex)) {
                layerAssignments.set(layerIndex, []);
              }
              layerAssignments.get(layerIndex)!.push(node);
            });
            
            // Position nodes in their assigned layers with 3D distribution
            for (let layer = 0; layer < maxLayerCount; layer++) {
              const nodesInLayer = layerAssignments.get(layer) || [];
              
              if (nodesInLayer.length > 0) {
                // X position: evenly distributed between source and sink
                const layerX = -canvasWidth / 2 + ((layer + 1) * canvasWidth) / (maxLayerCount + 1);
                
                // Distribute nodes in this layer in a 3D grid pattern
                nodesInLayer.forEach((node: any, index: number) => {
                  node.x = layerX;
                  
                  if (nodesInLayer.length === 1) {
                    node.y = 0;
                    node.z = 0;
                  } else if (nodesInLayer.length <= 4) {
                    // Small groups: arrange in a square pattern
                    const angle = (index * 2 * Math.PI) / nodesInLayer.length;
                    const radius = Math.min(canvasHeight / 4, 80);
                    node.y = radius * Math.cos(angle);
                    node.z = radius * Math.sin(angle);
                  } else {
                    // Larger groups: arrange in a grid in Y-Z plane
                    const gridSize = Math.ceil(Math.sqrt(nodesInLayer.length));
                    const row = Math.floor(index / gridSize);
                    const col = index % gridSize;
                    
                    const ySpacing = canvasHeight / (gridSize + 1);
                    const zSpacing = canvasDepth / (gridSize + 1);
                    
                    node.y = -canvasHeight / 2 + (row + 1) * ySpacing;
                    node.z = -canvasDepth / 2 + (col + 1) * zSpacing;
                  }
                  
                  // Slightly increase intermediate node sizes too
                  node.val = (node.val || 1) * 1.2;
                });
              }
            }
            
            // Handle any nodes that weren't assigned (fallback positioning)
            intermediateNodes.forEach((node: any) => {
              if (node.x === undefined || node.y === undefined) {
                // Fallback: distribute evenly with 3D spread
                const index = intermediateNodes.indexOf(node);
                node.x = -canvasWidth / 4 + (index / Math.max(1, intermediateNodes.length - 1)) * canvasWidth / 2;
                node.y = (Math.random() - 0.5) * canvasHeight;
                node.z = (Math.random() - 0.5) * canvasDepth;
                node.val = (node.val || 1) * 1.2;
              }
            });
          }
          
          // Update graph with positioned nodes
          graph.graphData({ nodes: visualizationNodes, links: visualizationLinks });
        }
      }
      
      // Configure graph for weights and directions
      const finalIsDirected = generatedGraphData.specialAttributes?.isFlowNetwork || 
                             activeProperties.has('directed');
      
      graph
        .linkDirectionalArrowLength(finalIsDirected ? 4 : 0)
        .linkDirectionalArrowRelPos(1)
        .linkWidth((link: any) => {
          const useWeights = activeProperties.has('weighted');
          if (useWeights || generatedGraphData.specialAttributes?.isFlowNetwork) {
            // Map weight to thickness with much smaller range (0.1-0.8)
            const normalizedWeight = Math.abs(link.weight || link.capacity || 1);
            const maxInputWeight = Math.max(Math.abs(minWeight), Math.abs(maxWeight));
            const weightRatio = normalizedWeight / maxInputWeight;
            return 0.1 + (weightRatio * 0.7); // Range: 0.1 to 0.8
          }
          return 0.2;
        })
        .linkColor((link: any) => {
          const useWeights = activeProperties.has('weighted');
          
          // For flow networks, use distinct colors
          if (generatedGraphData.specialAttributes?.isFlowNetwork) {
            return '#00d4aa'; // Teal/cyan for flow network edges - distinct from nodes
          }
          
          // For weighted graphs, use red/default colors
          if (useWeights && link.weight < 0) {
            return '#ef4444'; // Red for negative weights
          }
          
          return '#6c63ff'; // Default purple
        })
        .linkLabel((link: any) => {
          if (generatedGraphData.specialAttributes?.isFlowNetwork) {
            return `Capacity: ${link.capacity || link.weight}`;
          }
          const useWeights = activeProperties.has('weighted');
          if (useWeights) {
            return `Weight: ${link.weight}`;
          }
          return '';
        });
      
      // Special node coloring for flow networks with enhanced visibility
      if (generatedGraphData.specialAttributes?.isFlowNetwork) {
        graph.nodeThreeObject((node: any) => {
          const isSource = node.isSource;
          const isSink = node.isSink;
          const isSuperSource = node.isSuperSource;
          const isSuperSink = node.isSuperSink;
          
          // Use the node's size (which we may have modified above)
          const nodeSize = node.val || 1;
          
          // @ts-ignore - THREE is available from global scope
          const nodeGeometry = new THREE.SphereGeometry(nodeSize);
          
          // Enhanced colors for better visibility
          let nodeColor = '#8b5cf6'; // Default purple - lighter than before
          let glowColor = '#a78bfa';
          let glowIntensity = 0.3;
          let labelText = '';
          
          if (isSuperSource) {
            nodeColor = '#059669'; // Strong emerald green for super-source
            glowColor = '#10b981';
            glowIntensity = 0.7; // Stronger glow for super-source
            labelText = 'SUPER-SOURCE';
          } else if (isSuperSink) {
            nodeColor = '#dc2626'; // Strong red for super-sink
            glowColor = '#ef4444';
            glowIntensity = 0.7; // Stronger glow for super-sink
            labelText = 'SUPER-SINK';
          } else if (isSource) {
            nodeColor = '#059669'; // Emerald green (darker than edges)
            glowColor = '#10b981';
            glowIntensity = 0.5; // Stronger glow for source
            labelText = 'SOURCE';
          } else if (isSink) {
            nodeColor = '#dc2626'; // Strong red (distinct from negative edge red)
            glowColor = '#ef4444';
            glowIntensity = 0.5; // Stronger glow for sink
            labelText = 'SINK';
          }
          
          // @ts-ignore - THREE is available from global scope
          const nodeMaterial = new THREE.MeshBasicMaterial({
            color: nodeColor,
            transparent: false
          });
          
          // @ts-ignore - THREE is available from global scope
          const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
          
          // Enhanced glow effect
          // @ts-ignore - THREE is available from global scope
          const glowGeometry = new THREE.SphereGeometry(nodeSize * 1.8); // Larger glow
          // @ts-ignore - THREE is available from global scope
          const glowMaterial = new THREE.MeshBasicMaterial({
            color: glowColor,
            transparent: true,
            opacity: glowIntensity
          });
          
          // @ts-ignore - THREE is available from global scope
          const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
          
          // Add text label for source/sink/super nodes for extra clarity
          if (labelText) {
            // @ts-ignore - THREE is available from global scope
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d')!;
            canvas.width = 128;
            canvas.height = 64;
            
            context.fillStyle = '#ffffff';
            context.font = 'bold 18px Arial';
            context.textAlign = 'center';
            context.fillText(labelText, 64, 40);
            
            // @ts-ignore - THREE is available from global scope
            const texture = new THREE.CanvasTexture(canvas);
            // @ts-ignore - THREE is available from global scope
            const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
            // @ts-ignore - THREE is available from global scope
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(nodeSize * 4, nodeSize * 2, 1);
            sprite.position.set(0, nodeSize * 2.5, 0); // Position above the node
            
            // Group all meshes
            // @ts-ignore - THREE is available from global scope
            const group = new THREE.Group();
            group.add(nodeMesh);
            group.add(glowMesh);
            group.add(sprite);
            
            return group;
          }
          
          // Group both meshes for regular nodes
          // @ts-ignore - THREE is available from global scope
          const group = new THREE.Group();
          group.add(nodeMesh);
          group.add(glowMesh);
          
          return group;
        });
      } else if ((generatedGraphData.specialAttributes?.isBipartite || generatedGraphData.specialAttributes?.isMultipartite) && generatedGraphData.specialAttributes?.partitionCount) {
        // Special node coloring for multi-partite graphs will be applied after graph data is set
        console.log('Multipartite graph detected - will apply coloring after graph data is set');
      } else {
        // Reset to default node rendering
        resetGraphVisualization();
      }
      
      // Apply multipartite coloring as final step (after all graph configuration)
      if ((generatedGraphData.specialAttributes?.isBipartite || generatedGraphData.specialAttributes?.isMultipartite) && generatedGraphData.specialAttributes?.partitionCount) {
        console.log('=== APPLYING MULTIPARTITE COLORING ===');
        console.log('Partition count:', generatedGraphData.specialAttributes.partitionCount);
        
        const partitionColors = [
          '#ff4444', // Pure red
          '#44ff44', // Pure green  
          '#4444ff', // Pure blue
          '#ffaa00', // Orange
          '#ff44ff', // Magenta
          '#00ffff', // Cyan
          '#ffff00', // Yellow
          '#8844ff', // Purple
          '#00ff88', // Lime green
          '#ff8800'  // Dark orange
        ];
        
        // Set the node coloring function
        graph.nodeThreeObject((node: any) => {
          console.log(`Final coloring: Node ${node.id} has partition: ${node.partition}`);
          
          // @ts-ignore - THREE is available from global scope
          const nodeGeometry = new THREE.SphereGeometry(node.val || 1);
          
          // Get partition color based on node's partition
          const partitionIndex = node.partition || 0;
          const nodeColor = partitionColors[partitionIndex % partitionColors.length];
          
          console.log(`Final coloring: Node ${node.id} partition ${partitionIndex} -> color ${nodeColor}`);
          
          // @ts-ignore - THREE is available from global scope
          const nodeMaterial = new THREE.MeshBasicMaterial({
            color: nodeColor,
            transparent: false
          });
          
          // @ts-ignore - THREE is available from global scope
          const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
          
          // Glow effect
          // @ts-ignore - THREE is available from global scope
          const glowGeometry = new THREE.SphereGeometry((node.val || 1) * 1.5);
          // @ts-ignore - THREE is available from global scope
          const glowMaterial = new THREE.MeshBasicMaterial({
            color: nodeColor,
            transparent: true,
            opacity: 0.3
          });
          
          // @ts-ignore - THREE is available from global scope
          const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
          
          // Group both meshes
          // @ts-ignore - THREE is available from global scope
          const group = new THREE.Group();
          group.add(nodeMesh);
          group.add(glowMesh);
          
          return group;
        });
        
        console.log('Multipartite node coloring applied as final step');
      }
      
    } catch (error) {
      console.error('Error generating graph:', error instanceof Error ? error.message : String(error));
      showStatusMessage('Error generating graph: ' + (error instanceof Error ? error.message : String(error)), 'error');
    }
  };

  const solveAlgorithm = (problemType: string) => {
    // Get current graph settings from tag-based system
    const minWeightInput = document.getElementById('min-weight') as HTMLInputElement;
    const maxWeightInput = document.getElementById('max-weight') as HTMLInputElement;
    const terminalCountInput = document.getElementById('terminal-count') as HTMLInputElement;
    
    const settings = {
      isDirected: activeProperties.has('directed'),
      useWeights: activeProperties.has('weighted'),
      minWeight: parseFloat(minWeightInput?.value || '1'),
      maxWeight: parseFloat(maxWeightInput?.value || '5')
    };

    switch (problemType) {
      case 'maximum-clique':
        solveMaximumClique(currentGraphData, graph, settings);
        break;
      case 'shortest-path':
        solveShortestPath(currentGraphData, graph, settings);
        break;
      case 'maximum-spanning-tree':
        solveMaximumSpanningTree(currentGraphData, graph, settings);
        break;
      case 'steiner-tree':
        const terminalCount = parseInt(terminalCountInput?.value || '5', 10);
        solveSteinerTree(currentGraphData, graph, settings, terminalCount);
        break;
      case 'max-flow':
        solveMaxFlow(currentGraphData, graph, settings);
        break;
      case 'multipartite-matching':
        solveMultipartiteMatching(currentGraphData, graph, settings);
        break;
    }
  };

  // Handle window resize
  window.addEventListener('resize', () => {
    graph.width(graphContainer.clientWidth);
    graph.height(graphContainer.clientHeight);
  });

  // Return the API object with all functions
  return {
    generateGraph,
    solveAlgorithm,
    addGraphDataChangeCallback,
    getCurrentGraphData: () => currentGraphData
  };
}; 