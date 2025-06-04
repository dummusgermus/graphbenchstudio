// Graph generation logic

import type { GraphData } from '../algorithms/types';
import { GraphProperties } from '../algorithms';

export const generateGraphFromProperties = (
  activeProperties: Set<string>,
  nodeCount: number,
  edgeProbability: number,
  minWeight: number,
  maxWeight: number,
  componentCount?: number,
  partitionCount?: number,
  partitionRatios?: number[],
  sourceCount?: number,
  sinkCount?: number,
  erdosRenyiConnections?: number
): GraphData => {
  // Get settings from active properties
  const isDirected = activeProperties.has('directed');
  const useWeights = activeProperties.has('weighted');
  
  let generatedGraphData: GraphData;
  
  // Generate graph based on active properties
  if (activeProperties.has('erdos-renyi')) {
    console.log('Taking Erdős-Renyi path');
    generatedGraphData = GraphProperties.generateErdosRenyi(
      nodeCount,
      edgeProbability,
      useWeights,
      minWeight,
      maxWeight,
      isDirected,
      erdosRenyiConnections || 1
    );
  } else if (activeProperties.has('flow-network')) {
    console.log('Taking flow-network path');
    generatedGraphData = GraphProperties.generateFlowNetwork(
      nodeCount, 
      edgeProbability, 
      useWeights, 
      minWeight, 
      maxWeight,
      sourceCount || 1,
      sinkCount || 1
    );
  } else if (activeProperties.has('bipartite')) {
    // Generate multi-partite graph
    const actualPartitionCount = partitionCount || 2; // Default to 2 for bipartite
    const shouldBeStronglyConnected = activeProperties.has('strongly-connected');
    
    console.log('Taking bipartite/multipartite path');
    console.log('Actual partition count:', actualPartitionCount);
    console.log('Partition ratios received:', partitionRatios);
    console.log('Should be strongly connected:', shouldBeStronglyConnected);
    
    generatedGraphData = GraphProperties.generateMultipartiteGraph(
      nodeCount,
      actualPartitionCount,
      edgeProbability,
      useWeights,
      minWeight,
      maxWeight,
      shouldBeStronglyConnected,
      partitionRatios
    );
  } else if (activeProperties.has('strongly-connected')) {
    console.log('Taking strongly-connected path');
    generatedGraphData = GraphProperties.generateStronglyConnected(
      nodeCount, 
      edgeProbability, 
      useWeights, 
      minWeight, 
      maxWeight,
      isDirected
    );
  } else {
    // Generate normal random graph with potential modifications
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: `node${i}`,
      val: 0.7 + Math.random() * 0.6 // Random size variation
    }));
    
    // Handle disconnected graphs with multiple components
    if (activeProperties.has('disconnected') && componentCount) {
      const links = [];
      
      // Divide nodes into componentCount subsets
      const nodeAssignments: number[][] = Array.from({ length: componentCount }, () => []);
      
      // Assign nodes to components in round-robin fashion for even distribution
      for (let i = 0; i < nodeCount; i++) {
        nodeAssignments[i % componentCount].push(i);
      }
      
      // Generate components
      for (let comp = 0; comp < componentCount; comp++) {
        const componentNodes = nodeAssignments[comp];
        console.log(`Component ${comp}: nodes [${componentNodes.join(', ')}] (${componentNodes.length} nodes)`);
        
        if (componentNodes.length === 0) continue;
        
        // Step 1: Ensure connectivity within component
        // Create a path through all nodes in this component to guarantee connectivity
        if (componentNodes.length > 1) {
          for (let i = 0; i < componentNodes.length - 1; i++) {
            const weight = useWeights ? 
              minWeight + Math.random() * (maxWeight - minWeight) : 1;
            
            links.push({
              source: `node${componentNodes[i]}`,
              target: `node${componentNodes[i + 1]}`,
              weight: Math.round(weight * 10) / 10,
              isDirected: isDirected
            });
          }
          
          // For undirected graphs, we might want to close the path or add a few more edges
          // Add one more random edge within the component to make it more interesting
          if (componentNodes.length > 2) {
            const randomIdx1 = Math.floor(Math.random() * componentNodes.length);
            let randomIdx2 = Math.floor(Math.random() * componentNodes.length);
            while (randomIdx2 === randomIdx1) {
              randomIdx2 = Math.floor(Math.random() * componentNodes.length);
            }
            
            const weight = useWeights ? 
              minWeight + Math.random() * (maxWeight - minWeight) : 1;
            
            links.push({
              source: `node${componentNodes[randomIdx1]}`,
              target: `node${componentNodes[randomIdx2]}`,
              weight: Math.round(weight * 10) / 10,
              isDirected: isDirected
            });
          }
        }
        
        // Step 2: Add additional edges based on edge density
        // Generate additional random edges within this component
        for (let i = 0; i < componentNodes.length; i++) {
          for (let j = isDirected ? 0 : i + 1; j < componentNodes.length; j++) {
            if (i !== j) {
              // Skip if we already have this edge from the connectivity step
              const sourceNode = componentNodes[i];
              const targetNode = componentNodes[j];
              const edgeExists = links.some(link => 
                (link.source === `node${sourceNode}` && link.target === `node${targetNode}`) ||
                (!isDirected && link.source === `node${targetNode}` && link.target === `node${sourceNode}`)
              );
              
              if (!edgeExists && Math.random() < edgeProbability) {
                const weight = useWeights ? 
                  minWeight + Math.random() * (maxWeight - minWeight) : 1;
                
                links.push({
                  source: `node${sourceNode}`,
                  target: `node${targetNode}`,
                  weight: Math.round(weight * 10) / 10,
                  isDirected: isDirected
                });
              }
            }
          }
        }
      }
      
      console.log(`Generated exactly ${componentCount} components with ${links.length} total edges`);
      console.log('Node distribution:', nodeAssignments.map((nodes, i) => `Component ${i}: ${nodes.length} nodes`));
      
      generatedGraphData = {
        nodes: nodes.map(n => ({...n})),
        links: links.map(l => ({...l}))
      };
    } else {
      // Standard connected graph generation
      const links = [];
      for (let i = 0; i < nodeCount; i++) {
        for (let j = isDirected ? 0 : i + 1; j < nodeCount; j++) {
          if (i !== j && Math.random() < edgeProbability) {
            const weight = useWeights ? 
              minWeight + Math.random() * (maxWeight - minWeight) : 1;
            
            links.push({
              source: `node${i}`,
              target: `node${j}`,
              weight: Math.round(weight * 10) / 10, // Round to 1 decimal
              isDirected: isDirected
            });
          }
        }
      }
      
      generatedGraphData = {
        nodes: nodes.map(n => ({...n})), // Deep copy
        links: links.map(l => ({...l}))  // Deep copy
      };
    }
    
    // Add special attributes based on active properties
    generatedGraphData.specialAttributes = {
      isFlowNetwork: false,
      isStronglyConnected: activeProperties.has('strongly-connected'),
      isBipartite: activeProperties.has('bipartite'),
      isMultipartite: activeProperties.has('bipartite'), // All bipartite graphs are also multipartite
      isPlanar: activeProperties.has('planar'),
      isTree: activeProperties.has('tree'),
      isDAG: activeProperties.has('dag')
    };
  }
  
  return generatedGraphData;
}; 