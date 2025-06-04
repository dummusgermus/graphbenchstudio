import type { GraphData, GraphNode, GraphLink, GraphSpecialAttributes } from './types';

/**
 * Utilities for generating and validating special graph properties
 */
export class GraphProperties {
  
  /**
   * Validates if a graph is a flow network (has source and sink)
   */
  static isFlowNetwork(graphData: GraphData): boolean {
    if (!graphData.specialAttributes?.isFlowNetwork) return false;
    
    const sourceNode = graphData.specialAttributes.sourceNode;
    const sinkNode = graphData.specialAttributes.sinkNode;
    
    if (!sourceNode || !sinkNode || sourceNode === sinkNode) return false;
    
    // Check if source and sink nodes exist
    const nodeIds = new Set(graphData.nodes.map(n => n.id));
    return nodeIds.has(sourceNode) && nodeIds.has(sinkNode);
  }
  
  /**
   * Validates if a graph is strongly connected
   */
  static isStronglyConnected(graphData: GraphData): boolean {
    if (graphData.nodes.length <= 1) return true;
    
    // For undirected graphs, check if connected
    const hasDirectedEdges = graphData.links.some(link => link.isDirected);
    if (!hasDirectedEdges) {
      return this.isConnected(graphData);
    }
    
    // For directed graphs, use Kosaraju's algorithm
    return this.isStronglyConnectedDirected(graphData);
  }
  
  /**
   * Validates if a graph is connected (for undirected graphs)
   */
  static isConnected(graphData: GraphData): boolean {
    if (graphData.nodes.length <= 1) return true;
    
    const adjacencyList = this.buildAdjacencyList(graphData);
    const visited = new Set<string>();
    const startNode = graphData.nodes[0].id;
    
    // DFS from first node
    this.dfs(startNode, adjacencyList, visited);
    
    return visited.size === graphData.nodes.length;
  }
  
  /**
   * Validates if a graph is bipartite
   */
  static isBipartite(graphData: GraphData): boolean {
    const adjacencyList = this.buildAdjacencyList(graphData);
    const colors = new Map<string, number>();
    
    // Try to 2-color the graph
    for (const node of graphData.nodes) {
      if (!colors.has(node.id)) {
        if (!this.bipartiteColorDFS(node.id, 0, adjacencyList, colors)) {
          return false;
        }
      }
    }
    
    return true;
  }
  
  /**
   * Validates if a graph is a tree
   */
  static isTree(graphData: GraphData): boolean {
    const n = graphData.nodes.length;
    const m = graphData.links.length;
    
    // A tree has exactly n-1 edges and is connected
    return m === n - 1 && this.isConnected(graphData);
  }
  
  /**
   * Validates if a directed graph is acyclic (DAG)
   */
  static isDAG(graphData: GraphData): boolean {
    const adjacencyList = this.buildDirectedAdjacencyList(graphData);
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    
    // Check for cycles using DFS
    for (const node of graphData.nodes) {
      if (!visited.has(node.id)) {
        if (this.hasCycleDFS(node.id, adjacencyList, visited, recursionStack)) {
          return false;
        }
      }
    }
    
    return true;
  }
  
  /**
   * Generates a flow network with source and sink
   */
  static generateFlowNetwork(
    nodeCount: number, 
    edgeProbability: number, 
    useWeights: boolean,
    minWeight: number,
    maxWeight: number,
    sourceCount: number = 1,
    sinkCount: number = 1
  ): GraphData {
    if (nodeCount < sourceCount + sinkCount) {
      throw new Error(`Flow network needs at least ${sourceCount + sinkCount} nodes (${sourceCount} sources + ${sinkCount} sinks)`);
    }
    
    // Create all nodes first
    const nodes: GraphNode[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: `node${i}`,
      val: 0.7 + Math.random() * 0.6
    }));
    
    // Assign source and sink roles
    const sourceNodes: string[] = [];
    const sinkNodes: string[] = [];
    
    // First nodes are sources
    for (let i = 0; i < sourceCount; i++) {
      nodes[i].isSource = true;
      sourceNodes.push(`node${i}`);
    }
    
    // Last nodes are sinks  
    for (let i = nodeCount - sinkCount; i < nodeCount; i++) {
      nodes[i].isSink = true;
      sinkNodes.push(`node${i}`);
    }
    
    const links: GraphLink[] = [];
    
    // Helper function to generate capacity
    const generateCapacity = () => {
      const capacity = useWeights ? 
        minWeight + Math.random() * (maxWeight - minWeight) : 1;
      return Math.round(capacity * 10) / 10;
    };
    
    // Special case: if we only have sources and sinks (no intermediate nodes)
    const intermediateCount = nodeCount - sourceCount - sinkCount;
    if (intermediateCount === 0) {
      // Direct connections from each source to each sink
      sourceNodes.forEach(sourceId => {
        sinkNodes.forEach(sinkId => {
          const capacity = generateCapacity();
          links.push({
            source: sourceId,
            target: sinkId,
            weight: capacity,
            capacity: capacity,
            isDirected: true
          });
        });
      });
    } else {
      // We have intermediate nodes - create a proper flow network structure
      const intermediateNodes: number[] = [];
      for (let i = sourceCount; i < nodeCount - sinkCount; i++) {
        intermediateNodes.push(i);
      }
      
      // Step 1: Create guaranteed connectivity
      // Ensure each source can reach at least one intermediate node
      sourceNodes.forEach((sourceId, index) => {
        const targetIntermediate = intermediateNodes[index % intermediateNodes.length];
        const capacity = generateCapacity();
        links.push({
          source: sourceId,
          target: `node${targetIntermediate}`,
          weight: capacity,
          capacity: capacity,
          isDirected: true
        });
      });
      
      // Ensure each sink can be reached from at least one intermediate node
      sinkNodes.forEach((sinkId, index) => {
        const sourceIntermediate = intermediateNodes[index % intermediateNodes.length];
        const capacity = generateCapacity();
        links.push({
          source: `node${sourceIntermediate}`,
          target: sinkId,
          weight: capacity,
          capacity: capacity,
          isDirected: true
        });
      });
      
      // Step 2: Create a path through intermediate nodes to ensure connectivity
      if (intermediateNodes.length > 1) {
        for (let i = 0; i < intermediateNodes.length - 1; i++) {
          const capacity = generateCapacity();
          links.push({
            source: `node${intermediateNodes[i]}`,
            target: `node${intermediateNodes[i + 1]}`,
            weight: capacity,
            capacity: capacity,
            isDirected: true
          });
        }
      }
      
      // Step 3: Add additional random connections
      
      // More connections from sources to intermediate nodes
      sourceNodes.forEach(sourceId => {
        intermediateNodes.forEach(nodeIndex => {
          if (Math.random() < edgeProbability * 0.6) {
            // Check if connection already exists
            const alreadyExists = links.some(link => 
              link.source === sourceId && link.target === `node${nodeIndex}`
            );
            if (!alreadyExists) {
              const capacity = generateCapacity();
              links.push({
                source: sourceId,
                target: `node${nodeIndex}`,
                weight: capacity,
                capacity: capacity,
                isDirected: true
              });
            }
          }
        });
      });
      
      // More connections from intermediate nodes to sinks
      sinkNodes.forEach(sinkId => {
        intermediateNodes.forEach(nodeIndex => {
          if (Math.random() < edgeProbability * 0.6) {
            // Check if connection already exists
            const alreadyExists = links.some(link => 
              link.source === `node${nodeIndex}` && link.target === sinkId
            );
            if (!alreadyExists) {
              const capacity = generateCapacity();
              links.push({
                source: `node${nodeIndex}`,
                target: sinkId,
                weight: capacity,
                capacity: capacity,
                isDirected: true
              });
            }
          }
        });
      });
      
      // Connections between intermediate nodes
      for (let i = 0; i < intermediateNodes.length; i++) {
        for (let j = i + 1; j < intermediateNodes.length; j++) {
          if (Math.random() < edgeProbability * 0.4) {
            const capacity = generateCapacity();
            links.push({
              source: `node${intermediateNodes[i]}`,
              target: `node${intermediateNodes[j]}`,
              weight: capacity,
              capacity: capacity,
              isDirected: true
            });
          }
        }
      }
      
      // Step 4: Validation - ensure all intermediate nodes have both incoming and outgoing edges
      const incomingCount = new Map<string, number>();
      const outgoingCount = new Map<string, number>();
      
      // Initialize counters
      nodes.forEach(node => {
        incomingCount.set(node.id, 0);
        outgoingCount.set(node.id, 0);
      });
      
      // Count edges
      links.forEach(link => {
        outgoingCount.set(link.source, (outgoingCount.get(link.source) || 0) + 1);
        incomingCount.set(link.target, (incomingCount.get(link.target) || 0) + 1);
      });
      
      // Fix intermediate nodes with missing edges
      intermediateNodes.forEach(nodeIndex => {
        const nodeId = `node${nodeIndex}`;
        const incoming = incomingCount.get(nodeId) || 0;
        const outgoing = outgoingCount.get(nodeId) || 0;
        
        // If no incoming edges, connect from a random source
        if (incoming === 0) {
          const randomSource = sourceNodes[Math.floor(Math.random() * sourceNodes.length)];
          const capacity = generateCapacity();
          links.push({
            source: randomSource,
            target: nodeId,
            weight: capacity,
            capacity: capacity,
            isDirected: true
          });
        }
        
        // If no outgoing edges, connect to a random sink
        if (outgoing === 0) {
          const randomSink = sinkNodes[Math.floor(Math.random() * sinkNodes.length)];
          const capacity = generateCapacity();
          links.push({
            source: nodeId,
            target: randomSink,
            weight: capacity,
            capacity: capacity,
            isDirected: true
          });
        }
      });
    }
    
    // For compatibility, set the primary source and sink
    const primarySource = sourceNodes[0];
    const primarySink = sinkNodes[0];
    
    return {
      nodes,
      links,
      specialAttributes: {
        isFlowNetwork: true,
        sourceNode: primarySource, // Primary source for backward compatibility
        sinkNode: primarySink, // Primary sink for backward compatibility
        sourceNodes,
        sinkNodes,
        sourceCount,
        sinkCount,
        isStronglyConnected: false,
        isBipartite: false,
        isMultipartite: false,
        isPlanar: false,
        isTree: false,
        isDAG: true
      }
    };
  }
  
  /**
   * Verifies that there is a path from source to sink in the given links
   */
  private static verifySourceToSinkConnectivity(
    links: GraphLink[], 
    sourceId: string, 
    sinkId: string, 
    nodeCount: number
  ): boolean {
    // Build adjacency list
    const adjacency = new Map<string, string[]>();
    for (let i = 0; i < nodeCount; i++) {
      adjacency.set(`node${i}`, []);
    }
    
    links.forEach(link => {
      const sourceList = adjacency.get(link.source) || [];
      sourceList.push(link.target);
      adjacency.set(link.source, sourceList);
    });
    
    // BFS to check if sink is reachable from source
    const visited = new Set<string>();
    const queue = [sourceId];
    visited.add(sourceId);
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (current === sinkId) {
        return true;
      }
      
      const neighbors = adjacency.get(current) || [];
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    
    return false;
  }
  
  /**
   * Generates a strongly connected graph
   */
  static generateStronglyConnected(
    nodeCount: number,
    edgeProbability: number,
    useWeights: boolean,
    minWeight: number,
    maxWeight: number,
    isDirected: boolean = true
  ): GraphData {
    if (nodeCount < 2) {
      throw new Error('Strongly connected graph needs at least 2 nodes');
    }
    
    const nodes: GraphNode[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: `node${i}`,
      val: 0.7 + Math.random() * 0.6
    }));

    // Create a strongly connected graph by creating a cycle through all nodes
    const links: GraphLink[] = [];
    
    // Create a cycle to ensure strong connectivity
    for (let i = 0; i < nodeCount; i++) {
      const weight = useWeights ? 
        minWeight + Math.random() * (maxWeight - minWeight) : 1;
      
      links.push({
        source: `node${i}`,
        target: `node${(i + 1) % nodeCount}`,
        weight: Math.round(weight * 10) / 10,
        isDirected: isDirected
      });
    }
    
    // Add additional random edges
    for (let i = 0; i < nodeCount; i++) {
      for (let j = isDirected ? 0 : i + 1; j < nodeCount; j++) {
        if (i !== j && (i + 1) % nodeCount !== j && Math.random() < edgeProbability) {
          const weight = useWeights ? 
            minWeight + Math.random() * (maxWeight - minWeight) : 1;
          
          links.push({
            source: `node${i}`,
            target: `node${j}`,
            weight: Math.round(weight * 10) / 10,
            isDirected: isDirected
          });
        }
      }
    }
    
    return {
      nodes,
      links,
      specialAttributes: {
        isFlowNetwork: false,
        isStronglyConnected: true,
        isBipartite: false,
        isMultipartite: false,
        isPlanar: false,
        isTree: false,
        isDAG: !isDirected || this.isDAG({ nodes, links })
      }
    };
  }
  
  /**
   * Generates a multi-partite graph with the specified number of partitions
   */
  static generateMultipartiteGraph(
    nodeCount: number,
    partitionCount: number,
    edgeProbability: number,
    useWeights: boolean,
    minWeight: number,
    maxWeight: number,
    makeStronglyConnected: boolean = false,
    partitionRatios?: number[]
  ): GraphData {
    if (nodeCount < partitionCount) {
      throw new Error('Multi-partite graph needs at least one node per partition');
    }
    
    if (partitionCount < 2) {
      throw new Error('Multi-partite graph needs at least 2 partitions');
    }
    
    console.log('=== MULTIPARTITE GRAPH GENERATION ===');
    console.log('Node count:', nodeCount);
    console.log('Partition count:', partitionCount);
    console.log('Partition ratios received:', partitionRatios);
    
    // Distribute nodes across partitions as evenly as possible
    const partitions: number[][] = Array.from({ length: partitionCount }, () => []);
    
    if (partitionRatios && partitionRatios.length === partitionCount) {
      // Distribute nodes according to provided ratios
      console.log('Using custom partition ratios:', partitionRatios);
      const normalizedRatios = partitionRatios.map(ratio => ratio / 100); // Convert percentages to decimals
      const ratioSum = normalizedRatios.reduce((sum, ratio) => sum + ratio, 0);
      
      console.log('Normalized ratios:', normalizedRatios);
      console.log('Ratio sum:', ratioSum);
      
      if (Math.abs(ratioSum - 1.0) > 0.01) {
        // Normalize ratios if they don't sum to 1 (with small tolerance for floating point)
        normalizedRatios.forEach((ratio, i) => {
          normalizedRatios[i] = ratio / ratioSum;
        });
        console.log('Re-normalized ratios:', normalizedRatios);
      }
      
      // Calculate node counts for each partition
      let assignedNodes = 0;
      const targetCounts = normalizedRatios.map((ratio, index) => {
        if (index === partitionCount - 1) {
          // Last partition gets remaining nodes
          return nodeCount - assignedNodes;
        } else {
          const count = Math.round(nodeCount * ratio);
          assignedNodes += count;
          return count;
        }
      });
      
      console.log('Target counts for each partition:', targetCounts);
      
      // Assign nodes to partitions based on calculated counts
      let nodeIndex = 0;
      for (let partitionIndex = 0; partitionIndex < partitionCount; partitionIndex++) {
        const targetCount = targetCounts[partitionIndex];
        for (let i = 0; i < targetCount && nodeIndex < nodeCount; i++) {
          partitions[partitionIndex].push(nodeIndex);
          nodeIndex++;
        }
      }
      
      console.log(`Distributed nodes by ratios: ${partitionRatios.join(':')} -> ${partitions.map(p => p.length).join(':')}`);
    } else {
      // Distribute nodes in round-robin fashion for even distribution (default behavior)
      console.log('Using default round-robin distribution - no custom ratios provided or invalid ratios');
      for (let i = 0; i < nodeCount; i++) {
        partitions[i % partitionCount].push(i);
      }
      console.log(`Default distribution result: ${partitions.map(p => p.length).join(':')}`);
    }
    
    // Create nodes with partition information
    const nodes: GraphNode[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: `node${i}`,
      val: 0.7 + Math.random() * 0.6,
      partition: 0 // Will be set correctly below
    }));
    
    // Assign correct partition numbers based on actual distribution
    for (let partitionIndex = 0; partitionIndex < partitionCount; partitionIndex++) {
      for (const nodeIndex of partitions[partitionIndex]) {
        nodes[nodeIndex].partition = partitionIndex;
      }
    }
    
    const links: GraphLink[] = [];
    
    // In a multi-partite graph, edges only exist between different partitions
    for (let partition1 = 0; partition1 < partitionCount; partition1++) {
      for (let partition2 = partition1 + 1; partition2 < partitionCount; partition2++) {
        // Generate edges between these two partitions
        for (const node1 of partitions[partition1]) {
          for (const node2 of partitions[partition2]) {
            if (Math.random() < edgeProbability) {
              const weight = useWeights ? 
                minWeight + Math.random() * (maxWeight - minWeight) : 1;
              
              links.push({
                source: `node${node1}`,
                target: `node${node2}`,
                weight: Math.round(weight * 10) / 10,
                isDirected: false // Multi-partite graphs are typically undirected
              });
            }
          }
        }
      }
    }
    
    // Ensure connectivity by adding at least one edge between each pair of partitions
    for (let partition1 = 0; partition1 < partitionCount; partition1++) {
      for (let partition2 = partition1 + 1; partition2 < partitionCount; partition2++) {
        if (partitions[partition1].length > 0 && partitions[partition2].length > 0) {
          // Check if there's already an edge between these partitions
          const hasEdge = links.some(link => {
            const sourcePartition = parseInt(link.source.replace('node', '')) % partitionCount;
            const targetPartition = parseInt(link.target.replace('node', '')) % partitionCount;
            return (sourcePartition === partition1 && targetPartition === partition2) ||
                   (sourcePartition === partition2 && targetPartition === partition1);
          });
          
          if (!hasEdge) {
            // Add one guaranteed edge between these partitions
            const node1 = partitions[partition1][Math.floor(Math.random() * partitions[partition1].length)];
            const node2 = partitions[partition2][Math.floor(Math.random() * partitions[partition2].length)];
            
            const weight = useWeights ? 
              minWeight + Math.random() * (maxWeight - minWeight) : 1;
            
            links.push({
              source: `node${node1}`,
              target: `node${node2}`,
              weight: Math.round(weight * 10) / 10,
              isDirected: false
            });
          }
        }
      }
    }
    
    console.log(`Generated ${partitionCount}-partite graph with partitions:`, 
                partitions.map((nodes, i) => `Part ${i}: ${nodes.length} nodes`));
    
    // Validation: Ensure no intra-partition edges exist
    const intraPartitionEdges = links.filter(link => {
      const sourceNodeIndex = parseInt(link.source.replace('node', ''));
      const targetNodeIndex = parseInt(link.target.replace('node', ''));
      
      // Find which partitions these nodes belong to
      let sourcePartition = -1;
      let targetPartition = -1;
      
      for (let p = 0; p < partitionCount; p++) {
        if (partitions[p].includes(sourceNodeIndex)) sourcePartition = p;
        if (partitions[p].includes(targetNodeIndex)) targetPartition = p;
      }
      
      return sourcePartition === targetPartition;
    });
    
    if (intraPartitionEdges.length > 0) {
      console.error('ERROR: Found intra-partition edges in multipartite graph!', intraPartitionEdges);
      throw new Error(`Multipartite graph contains ${intraPartitionEdges.length} invalid intra-partition edges`);
    } else {
      console.log('✓ Multipartite graph validation passed - no intra-partition edges found');
    }
    
    // If strongly connected is requested, add additional connectivity
    if (makeStronglyConnected) {
      console.log('Adding strong connectivity while respecting multipartite constraints...');
      
      // For a multipartite graph to be strongly connected, we need to ensure
      // that every node can reach every other node through inter-partition edges only
      
      // Strategy: Create a "hub" structure where nodes in smaller partitions
      // are connected to many nodes in larger partitions, ensuring connectivity
      
      // Find the partition sizes
      const partitionSizes = partitions.map(p => p.length);
      const maxPartitionSize = Math.max(...partitionSizes);
      const minPartitionSize = Math.min(...partitionSizes);
      
      console.log('Partition sizes for strong connectivity:', partitionSizes);
      
      // For each partition pair, ensure strong connectivity
      for (let p1 = 0; p1 < partitionCount; p1++) {
        for (let p2 = p1 + 1; p2 < partitionCount; p2++) {
          const partition1Nodes = partitions[p1];
          const partition2Nodes = partitions[p2];
          
          if (partition1Nodes.length === 0 || partition2Nodes.length === 0) continue;
          
          // Determine which partition is smaller
          const smallerPartition = partition1Nodes.length <= partition2Nodes.length ? partition1Nodes : partition2Nodes;
          const largerPartition = partition1Nodes.length > partition2Nodes.length ? partition1Nodes : partition2Nodes;
          
          // Strategy: Connect each node in the smaller partition to multiple nodes in the larger partition
          // and ensure each node in the larger partition connects to at least one node in smaller partition
          
          // First, ensure every node in smaller partition connects to at least 2 nodes in larger partition (if possible)
          smallerPartition.forEach((smallNode, index) => {
            const connectionsNeeded = Math.min(2, largerPartition.length);
            for (let i = 0; i < connectionsNeeded; i++) {
              const targetNodeIndex = (index * connectionsNeeded + i) % largerPartition.length;
              const largeNode = largerPartition[targetNodeIndex];
              
              // Check if edge already exists
              const edgeExists = links.some(link => 
                (link.source === `node${smallNode}` && link.target === `node${largeNode}`) ||
                (link.source === `node${largeNode}` && link.target === `node${smallNode}`)
              );
              
              if (!edgeExists) {
                const weight = useWeights ? minWeight + Math.random() * (maxWeight - minWeight) : 1;
                links.push({
                  source: `node${smallNode}`,
                  target: `node${largeNode}`,
                  weight: Math.round(weight * 10) / 10,
                  isDirected: true
                });
              }
            }
          });
          
          // Then, ensure every node in larger partition connects back to at least one node in smaller partition
          largerPartition.forEach((largeNode, index) => {
            const targetSmallNodeIndex = index % smallerPartition.length;
            const smallNode = smallerPartition[targetSmallNodeIndex];
            
            // Check if reverse edge already exists
            const reverseEdgeExists = links.some(link => 
              (link.source === `node${largeNode}` && link.target === `node${smallNode}`) ||
              (link.source === `node${smallNode}` && link.target === `node${largeNode}`)
            );
            
            if (!reverseEdgeExists) {
              const weight = useWeights ? minWeight + Math.random() * (maxWeight - minWeight) : 1;
              links.push({
                source: `node${largeNode}`,
                target: `node${smallNode}`,
                weight: Math.round(weight * 10) / 10,
                isDirected: true
              });
            }
          });
        }
      }
      
      console.log(`Added strongly connected edges to multipartite graph (${links.length} total edges)`);
      console.log('All edges respect multipartite constraints - no intra-partition connections');
    }
    
    return {
      nodes,
      links,
      specialAttributes: {
        isFlowNetwork: false,
        isStronglyConnected: makeStronglyConnected,
        isBipartite: partitionCount === 2,
        isMultipartite: true,
        isPlanar: false,
        isTree: false,
        isDAG: false,
        partitionCount,
        partitions
      }
    };
  }
  
  /**
   * Generates an Erdős-Renyi random graph
   * Matches the logic from generate_data.py: creates ER graph then connects components
   */
  static generateErdosRenyi(
    nodeCount: number,
    edgeProbability: number,
    useWeights: boolean,
    minWeight: number,
    maxWeight: number,
    isDirected: boolean = false,
    numConnect: number = 1
  ): GraphData {
    if (nodeCount < 1) {
      throw new Error('Erdős-Renyi graph needs at least 1 node');
    }
    
    const nodes: GraphNode[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: `node${i}`,
      val: 0.7 + Math.random() * 0.6
    }));

    const links: GraphLink[] = [];
    
    // Step 1: Generate Erdős-Renyi random graph
    for (let i = 0; i < nodeCount; i++) {
      for (let j = isDirected ? 0 : i + 1; j < nodeCount; j++) {
        if (i !== j && Math.random() < edgeProbability) {
          const weight = useWeights ? 
            minWeight + Math.random() * (maxWeight - minWeight) : 1;
          
          links.push({
            source: `node${i}`,
            target: `node${j}`,
            weight: Math.round(weight * 10) / 10,
            isDirected: isDirected
          });
        }
      }
    }
    
    // Step 2: Find connected components (using simple BFS/DFS approach)
    const visited = new Set<string>();
    const components: string[][] = [];
    
    const findComponent = (startNode: string): string[] => {
      const component: string[] = [];
      const queue: string[] = [startNode];
      visited.add(startNode);
      
      while (queue.length > 0) {
        const currentNode = queue.shift()!;
        component.push(currentNode);
        
        // Find all neighbors
        const neighbors = new Set<string>();
        links.forEach(link => {
          if (link.source === currentNode) {
            neighbors.add(link.target);
          }
          if (!isDirected && link.target === currentNode) {
            neighbors.add(link.source);
          }
        });
        
        neighbors.forEach(neighbor => {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        });
      }
      
      return component;
    };
    
    // Find all connected components
    for (const node of nodes) {
      if (!visited.has(node.id)) {
        const component = findComponent(node.id);
        components.push(component);
      }
    }
    
    console.log(`Erdős-Renyi: Found ${components.length} connected components`);
    
    // Step 3: Connect components (like in generate_data.py)
    if (components.length >= 2) {
      for (let i = 0; i < components.length; i++) {
        for (let connectCount = 0; connectCount < numConnect; connectCount++) {
          // Choose a different component
          const otherComponentIndices = Array.from({ length: components.length }, (_, idx) => idx).filter(idx => idx !== i);
          const j = otherComponentIndices[Math.floor(Math.random() * otherComponentIndices.length)];
          
          // Choose random nodes from each component
          const nodeA = components[i][Math.floor(Math.random() * components[i].length)];
          const nodeB = components[j][Math.floor(Math.random() * components[j].length)];
          
          const weight = useWeights ? 
            minWeight + Math.random() * (maxWeight - minWeight) : 1;
          
          links.push({
            source: nodeA,
            target: nodeB,
            weight: Math.round(weight * 10) / 10,
            isDirected: isDirected
          });
        }
      }
      
      console.log(`Erdős-Renyi: Added ${components.length * numConnect} inter-component connections`);
    }
    
    return {
      nodes,
      links,
      specialAttributes: {
        isFlowNetwork: false,
        isStronglyConnected: false,
        isBipartite: false,
        isMultipartite: false,
        isPlanar: false,
        isTree: false,
        isDAG: isDirected && this.isDAG({ nodes, links }),
        isErdosRenyi: true
      }
    };
  }
  
  // Private helper methods
  
  private static buildAdjacencyList(graphData: GraphData): Map<string, string[]> {
    const adjacencyList = new Map<string, string[]>();
    
    graphData.nodes.forEach(node => {
      adjacencyList.set(node.id, []);
    });
    
    graphData.links.forEach(link => {
      adjacencyList.get(link.source)?.push(link.target);
      if (!link.isDirected) {
        adjacencyList.get(link.target)?.push(link.source);
      }
    });
    
    return adjacencyList;
  }
  
  private static buildDirectedAdjacencyList(graphData: GraphData): Map<string, string[]> {
    const adjacencyList = new Map<string, string[]>();
    
    graphData.nodes.forEach(node => {
      adjacencyList.set(node.id, []);
    });
    
    graphData.links.forEach(link => {
      if (link.isDirected) {
        adjacencyList.get(link.source)?.push(link.target);
      } else {
        adjacencyList.get(link.source)?.push(link.target);
        adjacencyList.get(link.target)?.push(link.source);
      }
    });
    
    return adjacencyList;
  }
  
  private static dfs(
    node: string, 
    adjacencyList: Map<string, string[]>, 
    visited: Set<string>
  ): void {
    visited.add(node);
    const neighbors = adjacencyList.get(node) || [];
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        this.dfs(neighbor, adjacencyList, visited);
      }
    }
  }
  
  private static isStronglyConnectedDirected(graphData: GraphData): boolean {
    const adjacencyList = this.buildDirectedAdjacencyList(graphData);
    
    // First DFS from any node
    const visited1 = new Set<string>();
    const startNode = graphData.nodes[0].id;
    this.dfs(startNode, adjacencyList, visited1);
    
    if (visited1.size !== graphData.nodes.length) {
      return false;
    }
    
    // Create reverse graph
    const reverseAdjacencyList = new Map<string, string[]>();
    graphData.nodes.forEach(node => {
      reverseAdjacencyList.set(node.id, []);
    });
    
    graphData.links.forEach(link => {
      if (link.isDirected) {
        reverseAdjacencyList.get(link.target)?.push(link.source);
      } else {
        reverseAdjacencyList.get(link.target)?.push(link.source);
        reverseAdjacencyList.get(link.source)?.push(link.target);
      }
    });
    
    // Second DFS on reverse graph
    const visited2 = new Set<string>();
    this.dfs(startNode, reverseAdjacencyList, visited2);
    
    return visited2.size === graphData.nodes.length;
  }
  
  private static bipartiteColorDFS(
    node: string,
    color: number,
    adjacencyList: Map<string, string[]>,
    colors: Map<string, number>
  ): boolean {
    colors.set(node, color);
    const neighbors = adjacencyList.get(node) || [];
    
    for (const neighbor of neighbors) {
      if (!colors.has(neighbor)) {
        if (!this.bipartiteColorDFS(neighbor, 1 - color, adjacencyList, colors)) {
          return false;
        }
      } else if (colors.get(neighbor) === color) {
        return false;
      }
    }
    
    return true;
  }
  
  private static hasCycleDFS(
    node: string,
    adjacencyList: Map<string, string[]>,
    visited: Set<string>,
    recursionStack: Set<string>
  ): boolean {
    visited.add(node);
    recursionStack.add(node);
    
    const neighbors = adjacencyList.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (this.hasCycleDFS(neighbor, adjacencyList, visited, recursionStack)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        return true;
      }
    }
    
    recursionStack.delete(node);
    return false;
  }
} 