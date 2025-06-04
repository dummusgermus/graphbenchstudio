import ForceGraph3D from '3d-force-graph';
import type { Graph, GraphProblem } from './types';
import * as THREE from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export function setupGraphVisualizer(containerId: string) {
  const container = document.getElementById(containerId)!;
  
  // Initialize the graph element in the DOM first
  container.innerHTML = '';
  
  // Create the 3D force graph
  // @ts-ignore - ForceGraph3D has TypeScript typing issues
  const graph = ForceGraph3D();
  
  // Set dimensions and append to container
  graph
    .width(container.clientWidth)
    .height(container.clientHeight);
  
  // Add to container (ForceGraph3D manages its own canvas internally)
  container.appendChild(graph.renderer().domElement);
  
  // Configure the graph visualization
  graph
    .backgroundColor('#111827')
    .nodeColor(() => '#3b82f6')
    .nodeRelSize(6)
    .nodeOpacity(0.9)
    .linkColor(() => '#4b5563')
    .linkWidth(1)
    .linkOpacity(0.5)
    .showNavInfo(false)
    .enableNodeDrag(true)
    .enableNavigationControls(true)
    .enablePointerInteraction(true);

  // Add glow effect to the scene
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,  // strength
    0.4,  // radius
    0.85  // threshold
  );
  graph.postProcessingComposer().addPass(bloomPass);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  graph.scene().add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(200, 200, 200);
  graph.scene().add(directionalLight);

  // Handle window resize
  window.addEventListener('resize', () => {
    graph.width(container.clientWidth);
    graph.height(container.clientHeight);
  });

  // Current graph data
  let currentGraph: Graph | null = null;
  let currentProblem: GraphProblem | null = null;

  // Update the graph with a problem
  function updateGraph(problem: GraphProblem, solve: boolean = false) {
    currentProblem = problem;
    
    if (!currentGraph) {
      // Generate a new graph if none exists
      currentGraph = problem.generateGraph(20, 0.3);
    }

    if (solve) {
      // Solve the problem and visualize the solution
      const { highlightedGraph } = problem.solve(currentGraph);
      currentGraph = highlightedGraph;
    }

    // Convert nodes and links to the format expected by ForceGraph3D
    const graphData = {
      nodes: currentGraph.nodes.map(node => ({
        ...node,
        id: node.id,
        color: node.highlighted ? '#00f5ff' : (node.color || '#3b82f6'),
        // Add glow effect to highlighted nodes
        ...(node.highlighted && { 
          __threeObj: new THREE.Mesh(
            new THREE.SphereGeometry(8),
            new THREE.MeshBasicMaterial({ 
              color: 0x00f5ff,
              transparent: true,
              opacity: 0.6
            })
          )
        })
      })),
      links: currentGraph.links.map(link => ({
        ...link,
        source: link.source,
        target: link.target,
        color: link.highlighted ? '#00f5ff' : (link.color || '#4b5563'),
      }))
    };

    // Update the graph visualization
    graph.graphData(graphData);
  }

  // Generate a new random graph
  function generateNewGraph(nodeCount: number = 20, edgeProbability: number = 0.3) {
    if (currentProblem) {
      currentGraph = currentProblem.generateGraph(nodeCount, edgeProbability);
      updateGraph(currentProblem, false);
    }
  }

  return {
    updateGraph,
    generateNewGraph
  };
} 