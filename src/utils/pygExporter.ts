import type { GraphData, GraphNode, GraphLink } from '../algorithms/types';
import { generateGraphFromProperties } from '../graph/graphGenerator';

export interface PygExportData {
  pythonCode: string;
  filename: string;
}

export interface DatasetConfig {
  count: number;
  minNodes: number;
  maxNodes: number;
  minDensity: number;
  maxDensity: number;
  useCurrentProperties: boolean;
  properties: Set<string>;
  minWeight: number;
  maxWeight: number;
  componentCount: number;
  partitionCount: number;
  sourceCount: number;
  sinkCount: number;
  erdosRenyiConnections: number;
}

/**
 * Converts graph data to PyTorch Geometric tensors
 */
export const graphToPyGTensors = (graphData: GraphData) => {
  if (!graphData || !graphData.nodes || !graphData.links) {
    throw new Error('Invalid graph data provided');
  }

  const nodes = graphData.nodes;
  const links = graphData.links;
  
  // Create node mapping from string IDs to numeric indices
  const nodeIdToIndex = new Map<string, number>();
  nodes.forEach((node, index) => {
    nodeIdToIndex.set(node.id, index);
  });

  // Convert edges to tensor format
  const edgeList: number[][] = [];
  const edgeWeights: number[] = [];
  
  links.forEach(link => {
    const sourceIdx = nodeIdToIndex.get(link.source);
    const targetIdx = nodeIdToIndex.get(link.target);
    
    if (sourceIdx !== undefined && targetIdx !== undefined) {
      edgeList.push([sourceIdx, targetIdx]);
      edgeWeights.push(link.weight || 1.0);
      
      // For undirected edges, add the reverse edge
      if (!link.isDirected) {
        edgeList.push([targetIdx, sourceIdx]);
        edgeWeights.push(link.weight || 1.0);
      }
    }
  });

  // Generate node features
  const nodeFeatures: number[][] = [];
  nodes.forEach(node => {
    // Only include actual semantic features, not visualization properties
    const features = [
      node.isSource ? 1.0 : 0.0,
      node.isSink ? 1.0 : 0.0,
      node.isTerminal ? 1.0 : 0.0,
      node.partition !== undefined ? node.partition : 0.0
    ];
    nodeFeatures.push(features);
  });

  // Check graph properties
  const hasWeights = links.some(link => link.weight !== undefined && link.weight !== 1);
  const hasSpecialNodes = nodes.some(node => node.isSource || node.isSink || node.isTerminal);
  const hasPartitions = nodes.some(node => node.partition !== undefined);

  return {
    nodeFeatures,
    edgeList,
    edgeWeights,
    hasWeights,
    hasSpecialNodes,
    hasPartitions,
    nodeIdToIndex,
    nodes,
    links
  };
};

/**
 * Converts current graph data to PyTorch Geometric format and generates Python code
 */
export const exportToPyG = (graphData: GraphData): PygExportData => {
  const tensors = graphToPyGTensors(graphData);
  const { nodeFeatures, edgeList, edgeWeights, hasWeights, hasSpecialNodes, hasPartitions, nodes } = tensors;

  // Generate filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filename = `graph_${timestamp}.py`;
  
  const pythonCode = `import torch
from torch_geometric.data import Data

def create_graph():
    x = torch.tensor([
${nodeFeatures.map(features => `        [${features.map(f => f.toFixed(1)).join(', ')}]`).join(',\n')}
    ], dtype=torch.float)
    
    edge_index = torch.tensor([
        [${edgeList.map(edge => edge[0]).join(', ')}],
        [${edgeList.map(edge => edge[1]).join(', ')}]
    ], dtype=torch.long)
    
    ${hasWeights ? `edge_attr = torch.tensor([${edgeWeights.map(w => w.toFixed(3)).join(', ')}], dtype=torch.float)
    
    data = Data(x=x, edge_index=edge_index, edge_attr=edge_attr)` : `data = Data(x=x, edge_index=edge_index)`}
    
    ${hasSpecialNodes ? `data.source_nodes = torch.tensor([${nodes.map((node, idx) => node.isSource ? idx : -1).filter(idx => idx !== -1).join(', ')}], dtype=torch.long)
    data.sink_nodes = torch.tensor([${nodes.map((node, idx) => node.isSink ? idx : -1).filter(idx => idx !== -1).join(', ')}], dtype=torch.long)
    data.terminal_nodes = torch.tensor([${nodes.map((node, idx) => node.isTerminal ? idx : -1).filter(idx => idx !== -1).join(', ')}], dtype=torch.long)
    ` : ''}${hasPartitions ? `data.partition = torch.tensor([${nodes.map(node => node.partition || 0).join(', ')}], dtype=torch.long)
    ` : ''}
    return data

if __name__ == "__main__":
    data = create_graph()
    print(f"Nodes: {data.num_nodes}, Edges: {data.edge_index.size(1)}")
`;

  return {
    pythonCode,
    filename
  };
};

/**
 * Exports current graph as a Python script that creates a .pt file when run
 */
export const exportToPt = (graphData: GraphData): PygExportData => {
  const tensors = graphToPyGTensors(graphData);
  const { nodeFeatures, edgeList, edgeWeights, hasWeights, hasSpecialNodes, hasPartitions, nodes } = tensors;

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filename = `graph_${timestamp}.py`;
  const ptFilename = `graph_${timestamp}.pt`;
  
  const pythonCode = `#!/usr/bin/env python3
"""
GraphBench3000 Export - PyTorch Geometric Data
Generated: ${new Date().toISOString()}
Run this script to create ${ptFilename}
"""

import torch
from torch_geometric.data import Data

def create_and_save_graph():
    # Node features [isSource, isSink, isTerminal, partition]
    x = torch.tensor([
${nodeFeatures.map(features => `        [${features.map(f => f.toFixed(3)).join(', ')}]`).join(',\n')}
    ], dtype=torch.float)
    
    # Edge connectivity
    edge_index = torch.tensor([
        [${edgeList.map(edge => edge[0]).join(', ')}],
        [${edgeList.map(edge => edge[1]).join(', ')}]
    ], dtype=torch.long)
    
    ${hasWeights ? `# Edge weights/capacities
    edge_attr = torch.tensor([${edgeWeights.map(w => w.toFixed(3)).join(', ')}], dtype=torch.float)
    
    # Create PyG Data object
    data = Data(x=x, edge_index=edge_index, edge_attr=edge_attr)` : `# Create PyG Data object  
    data = Data(x=x, edge_index=edge_index)`}
    
    ${hasSpecialNodes ? `# Special node indices
    data.source_nodes = torch.tensor([${nodes.map((node, idx) => node.isSource ? idx : -1).filter(idx => idx !== -1).join(', ')}], dtype=torch.long)
    data.sink_nodes = torch.tensor([${nodes.map((node, idx) => node.isSink ? idx : -1).filter(idx => idx !== -1).join(', ')}], dtype=torch.long)
    data.terminal_nodes = torch.tensor([${nodes.map((node, idx) => node.isTerminal ? idx : -1).filter(idx => idx !== -1).join(', ')}], dtype=torch.long)
    ` : ''}${hasPartitions ? `# Node partitions
    data.partition = torch.tensor([${nodes.map(node => node.partition || 0).join(', ')}], dtype=torch.long)
    ` : ''}
    # Save as .pt file
    torch.save(data, '${ptFilename}')
    
    print(f"✅ Graph saved as {ptFilename}")
    print(f"📊 Nodes: {data.num_nodes}, Edges: {data.edge_index.size(1)}")
    ${hasWeights ? `print(f"⚖️  Weighted edges: Yes")` : `print(f"⚖️  Weighted edges: No")`}
    ${hasSpecialNodes ? `print(f"🎯 Special nodes: {len(data.source_nodes) if hasattr(data, 'source_nodes') else 0} sources, {len(data.sink_nodes) if hasattr(data, 'sink_nodes') else 0} sinks")` : ''}
    
    return data

if __name__ == "__main__":
    create_and_save_graph()
`;

  return {
    pythonCode,
    filename
  };
};

/**
 * Exports raw tensor data that can be directly converted to .pt files
 */
export const exportRawTensorData = (graphData: GraphData): { tensorData: string; filename: string; converterScript: string } => {
  const tensors = graphToPyGTensors(graphData);
  const { nodeFeatures, edgeList, edgeWeights, hasWeights, hasSpecialNodes, hasPartitions, nodes } = tensors;

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const dataFilename = `graph_data_${timestamp}.json`;
  const scriptFilename = `convert_to_pt_${timestamp}.py`;
  
  // Raw tensor data
  const tensorData = {
    node_features: nodeFeatures,
    edge_index: edgeList.length > 0 ? [
      edgeList.map(edge => edge[0]),
      edgeList.map(edge => edge[1])
    ] : [[], []],
    edge_weights: hasWeights ? edgeWeights : null,
    special_nodes: {
      sources: hasSpecialNodes ? nodes.map((node, idx) => node.isSource ? idx : -1).filter(idx => idx !== -1) : [],
      sinks: hasSpecialNodes ? nodes.map((node, idx) => node.isSink ? idx : -1).filter(idx => idx !== -1) : [],
      terminals: hasSpecialNodes ? nodes.map((node, idx) => node.isTerminal ? idx : -1).filter(idx => idx !== -1) : []
    },
    partitions: hasPartitions ? nodes.map(node => node.partition || 0) : null
  };

  // Converter script
  const converterScript = `#!/usr/bin/env python3
"""
Convert GraphBench3000 exported data to PyTorch Geometric .pt file
Usage: python ${scriptFilename}
"""

import torch
import json
from torch_geometric.data import Data

def convert_to_pt():
    # Load raw data
    with open('${dataFilename}', 'r') as f:
        data = json.load(f)
    
    # Create tensors
    x = torch.tensor(data['node_features'], dtype=torch.float)
    edge_index = torch.tensor(data['edge_index'], dtype=torch.long)
    
    # Create base Data object
    if data['edge_weights']:
        edge_attr = torch.tensor(data['edge_weights'], dtype=torch.float)
        pyg_data = Data(x=x, edge_index=edge_index, edge_attr=edge_attr)
    else:
        pyg_data = Data(x=x, edge_index=edge_index)
    
    # Add metadata
    if data['node_metadata']['source_nodes']:
        pyg_data.source_nodes = torch.tensor(data['node_metadata']['source_nodes'], dtype=torch.long)
    if data['node_metadata']['sink_nodes']:
        pyg_data.sink_nodes = torch.tensor(data['node_metadata']['sink_nodes'], dtype=torch.long)
    if data['node_metadata']['terminal_nodes']:
        pyg_data.terminal_nodes = torch.tensor(data['node_metadata']['terminal_nodes'], dtype=torch.long)
    if data['node_metadata']['partition']:
        pyg_data.partition = torch.tensor(data['node_metadata']['partition'], dtype=torch.long)

    # Save as .pt file
    output_filename = '${dataFilename.replace('_data_', '_').replace('.json', '.pt')}'
    torch.save(pyg_data, output_filename)
    
    print(f"✅ Converted {dataFilename} to {output_filename}")
    print(f"📊 Graph: {pyg_data.num_nodes} nodes, {pyg_data.edge_index.size(1)} edges")
    
    return pyg_data

if __name__ == "__main__":
    convert_to_pt()
`;

  return {
    tensorData: JSON.stringify(tensorData, null, 2),
    filename: dataFilename,
    converterScript
  };
};

/**
 * Generates a dataset of multiple graphs
 */
export const generateDataset = (config: DatasetConfig, activeProperties: Set<string>): PygExportData => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filename = `dataset_${config.count}graphs_${timestamp}.py`;

  // Use current properties if selected, otherwise use configured properties
  const datasetProperties = config.useCurrentProperties ? activeProperties : config.properties;
  const isDirected = datasetProperties.has('directed');
  const isWeighted = datasetProperties.has('weighted');
  const isFlowNetwork = datasetProperties.has('flow-network');
  const isBipartite = datasetProperties.has('bipartite');
  const isTree = datasetProperties.has('tree');
  const isDAG = datasetProperties.has('dag');
  const isDisconnected = datasetProperties.has('disconnected');
  const isErdosRenyi = datasetProperties.has('erdos-renyi');

  const pythonCode = `#!/usr/bin/env python3
"""
GraphBench3000 Dataset Generator
Generated: ${new Date().toISOString()}
Creates ${config.count} graphs with specified properties
"""

import torch
import random
import math
from torch_geometric.data import Data

def generate_random_graph(num_nodes, edge_density):
    """Generate a single random graph with the specified properties"""
    
    # Initialize node features [isSource, isSink, isTerminal, partition]
    node_features = []
    special_nodes = {'sources': [], 'sinks': [], 'terminals': []}
    
    # Generate partitions for multi-partite graphs
    ${isBipartite ? `partitions = []
    partition_count = ${config.partitionCount}
    nodes_per_partition = num_nodes // partition_count
    
    for i in range(num_nodes):
        partition = min(i // max(1, nodes_per_partition), partition_count - 1)
        partitions.append(partition)
        
        is_source = False
        is_sink = False
        is_terminal = False
        
        node_features.append([
            1.0 if is_source else 0.0,
            1.0 if is_sink else 0.0,
            1.0 if is_terminal else 0.0,
            float(partition)
        ])` : isFlowNetwork ? `# Flow network: designate sources and sinks
    source_count = min(${config.sourceCount}, num_nodes // 3)
    sink_count = min(${config.sinkCount}, num_nodes // 3)
    
    source_indices = random.sample(range(num_nodes), source_count)
    remaining_nodes = [i for i in range(num_nodes) if i not in source_indices]
    sink_indices = random.sample(remaining_nodes, min(sink_count, len(remaining_nodes)))
    
    special_nodes['sources'] = source_indices
    special_nodes['sinks'] = sink_indices
    
    for i in range(num_nodes):
        is_source = i in source_indices
        is_sink = i in sink_indices
        is_terminal = False
        
        node_features.append([
            1.0 if is_source else 0.0,
            1.0 if is_sink else 0.0,
            1.0 if is_terminal else 0.0,
            0.0
        ])` : `# Regular graph: no special node designations
    for i in range(num_nodes):
        node_features.append([0.0, 0.0, 0.0, 0.0])`}
    
    x = torch.tensor(node_features, dtype=torch.float)
    
    # Generate edges based on graph type and density
    edges = set()
    
    ${isTree ? `# Tree: generate spanning tree (n-1 edges)
    if num_nodes > 1:
        nodes = list(range(num_nodes))
        tree_edges = []
        in_tree = [0]  # Start with node 0
        remaining = list(range(1, num_nodes))
        
        while remaining:
            src = random.choice(in_tree)
            dst = random.choice(remaining)
            tree_edges.append((src, dst))
            in_tree.append(dst)
            remaining.remove(dst)
        
        edges = set(tree_edges)` : isErdosRenyi ? `# Erdős-Renyi: generate ER graph then connect components (like generate_data.py)
    # Step 1: Generate Erdős-Renyi random graph
    for i in range(num_nodes):
        for j in range(i + 1 if not ${isDirected} else 0, num_nodes):
            if i != j and random.random() < edge_density:
                if ${isDirected}:
                    edges.add((i, j))
                else:
                    edges.add((min(i, j), max(i, j)))
    
    # Step 2: Find connected components and connect them
    def find_components(num_nodes, edges):
        visited = [False] * num_nodes
        components = []
        
        def dfs(node, component):
            visited[node] = True
            component.append(node)
            for edge in edges:
                if edge[0] == node and not visited[edge[1]]:
                    dfs(edge[1], component)
                elif not ${isDirected} and edge[1] == node and not visited[edge[0]]:
                    dfs(edge[0], component)
        
        for i in range(num_nodes):
            if not visited[i]:
                component = []
                dfs(i, component)
                components.append(component)
        
        return components
    
    components = find_components(num_nodes, edges)
    if len(components) >= 2:
        # Connect components (like in generate_data.py)
        num_connect = ${config.erdosRenyiConnections}
        for i in range(len(components)):
            for connect_count in range(num_connect):
                other_indices = [j for j in range(len(components)) if j != i]
                j = random.choice(other_indices)
                
                node_a = random.choice(components[i])
                node_b = random.choice(components[j])
                
                if ${isDirected}:
                    edges.add((node_a, node_b))
                else:
                    edges.add((min(node_a, node_b), max(node_a, node_b)))` : isDAG ? `# DAG: generate edges with topological ordering
    max_edges = int(num_nodes * (num_nodes - 1) * edge_density / 2)
    edge_count = 0
    
    for i in range(num_nodes):
        for j in range(i + 1, num_nodes):
            if edge_count < max_edges and random.random() < edge_density:
                edges.add((i, j))
                edge_count += 1` : isBipartite ? `# Multi-partite: only edges between different partitions
    max_edges = int(num_nodes * edge_density)
    edge_count = 0
    
    for i in range(num_nodes):
        for j in range(i + 1, num_nodes):
            if partitions[i] != partitions[j] and edge_count < max_edges and random.random() < edge_density:
                edges.add((min(i, j), max(i, j)))
                edge_count += 1` : `# Regular graph: random edges based on density
    max_edges = int(num_nodes * (num_nodes - 1) * edge_density / (1 if ${isDirected} else 2))
    edge_count = 0
    
    while edge_count < max_edges:
        src = random.randint(0, num_nodes - 1)
        dst = random.randint(0, num_nodes - 1)
        if src != dst:
            edge = (src, dst) if ${isDirected} else (min(src, dst), max(src, dst))
            if edge not in edges:
                edges.add(edge)
                edge_count += 1`}
    
    # Convert edges to edge_index format
    if edges:
        edge_list = list(edges)
        ${!isDirected && !isTree && !isDAG ? `# Add reverse edges for undirected graphs
        if not ${isDirected}:
            edge_list += [(dst, src) for src, dst in edge_list]` : ''}
        
        edge_index = torch.tensor(edge_list).t().contiguous()
    else:
        edge_index = torch.empty((2, 0), dtype=torch.long)
    
    # Generate edge attributes if weighted
    ${isWeighted ? `edge_weights = []
    for _ in range(edge_index.size(1)):
        weight = random.uniform(${config.minWeight}, ${config.maxWeight})
        edge_weights.append(weight)
    edge_attr = torch.tensor(edge_weights, dtype=torch.float)
    
    data = Data(x=x, edge_index=edge_index, edge_attr=edge_attr)` : `data = Data(x=x, edge_index=edge_index)`}
    
    # Add special node information
    ${isFlowNetwork ? `if special_nodes['sources']:
        data.source_nodes = torch.tensor(special_nodes['sources'], dtype=torch.long)
    if special_nodes['sinks']:
        data.sink_nodes = torch.tensor(special_nodes['sinks'], dtype=torch.long)` : ''}
    
    ${isBipartite ? `data.partition = torch.tensor(partitions, dtype=torch.long)` : ''}
    
    return data

def generate_dataset():
    """Generate the complete dataset"""
    data_list = []
    
    for i in range(${config.count}):
        # Random parameters for this graph
        num_nodes = random.randint(${config.minNodes}, ${config.maxNodes})
        edge_density = random.uniform(${config.minDensity}, ${config.maxDensity})
        
        data = generate_random_graph(num_nodes, edge_density)
        data_list.append(data)
        
        if (i + 1) % 100 == 0:
            print(f"Generated {i + 1}/${config.count} graphs")
    
    return data_list

if __name__ == "__main__":
    print("Generating dataset with ${config.count} graphs...")
    print("Properties: ${Array.from(datasetProperties).join(', ')}")
    dataset = generate_dataset()
    
    # Save the dataset
    torch.save(dataset, '${filename.replace('.py', '.pt')}')
    print(f"Dataset saved as ${filename.replace('.py', '.pt')}")
    print(f"Total graphs: {len(dataset)}")
    print(f"Node range: ${config.minNodes}-${config.maxNodes}")
    print(f"Density range: ${config.minDensity}-${config.maxDensity}")
`;

  return {
    pythonCode,
    filename
  };
};

/**
 * Downloads the generated Python file
 */
export const downloadPythonFile = (pythonCode: string, filename: string): void => {
  const blob = new Blob([pythonCode], { type: 'text/python' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

/**
 * Downloads JSON tensor data
 */
export const downloadJsonFile = (jsonData: string, filename: string): void => {
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

/**
 * Downloads multiple files as a ZIP-like bundle (downloads separately)
 */
export const downloadMultipleFiles = (files: Array<{content: string, filename: string, type: string}>): void => {
  files.forEach((file, index) => {
    setTimeout(() => {
      const mimeType = file.type === 'python' ? 'text/python' : 'application/json';
      const blob = new Blob([file.content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = file.filename;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    }, index * 200); // Stagger downloads to avoid browser blocking
  });
}; 