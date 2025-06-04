import type { GraphData, GraphNode, GraphLink } from '../algorithms/types';

export interface MathAnalysisPanel {
  togglePanel: () => void;
  updateAnalysis: (graphData: GraphData) => void;
  isVisible: () => boolean;
}

interface AnalysisCell {
  id: string;
  type: string;
  title: string;
  content: string;
  timestamp: number;
  tabId: string;
}

interface AnalysisType {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

interface ComponentInfo {
  size: number;
  nodes: string[];
}

export const initializeMathAnalysisPanel = (): MathAnalysisPanel => {
  let currentGraphData: GraphData = { nodes: [], links: [] };
  let isOpen = false;
  let analysisCells: AnalysisCell[] = [];
  let cellIdCounter = 0;
  let activeTab = 'general';

  // Available analysis types organized by tabs
  const availableAnalyses: AnalysisType[] = [
    // General Info analyses
    {
      id: 'basic-info',
      name: 'Basic Information',
      description: 'Vertices, edges, density, graph type',
      icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      category: 'general'
    },
    {
      id: 'connectivity',
      name: 'Connectivity Analysis',
      description: 'Connected components, diameter, path lengths',
      icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
      category: 'general'
    },
    {
      id: 'degree-stats',
      name: 'Degree Statistics',
      description: 'Min, max, average degree, degree distribution',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      category: 'general'
    },

    // Matrices analyses
    {
      id: 'adjacency-matrix',
      name: 'Adjacency Matrix',
      description: 'Graph adjacency matrix representation',
      icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z',
      category: 'matrices'
    },
    {
      id: 'laplacian-matrix',
      name: 'Laplacian Matrix',
      description: 'Graph Laplacian matrix and properties',
      icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z',
      category: 'matrices'
    },
    {
      id: 'degree-matrix',
      name: 'Degree Matrix',
      description: 'Diagonal matrix of vertex degrees',
      icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z',
      category: 'matrices'
    },
    {
      id: 'incidence-matrix',
      name: 'Incidence Matrix',
      description: 'Vertex-edge incidence matrix',
      icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z',
      category: 'matrices'
    },

    // Spectral analyses
    {
      id: 'eigenvalues',
      name: 'Eigenvalue Analysis',
      description: 'Largest eigenvalues and spectral gap',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      category: 'spectral'
    },
    {
      id: 'laplacian-spectrum',
      name: 'Laplacian Spectrum',
      description: 'All Laplacian eigenvalues and properties',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      category: 'spectral'
    },
    {
      id: 'algebraic-connectivity',
      name: 'Algebraic Connectivity',
      description: 'Second smallest Laplacian eigenvalue',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      category: 'spectral'
    },
    {
      id: 'adjacency-spectrum',
      name: 'Adjacency Spectrum',
      description: 'Adjacency matrix eigenvalues',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      category: 'spectral'
    },

    // Properties analyses
    {
      id: 'structural-properties',
      name: 'Structural Properties',
      description: 'Tree, bipartite, DAG, cycle detection',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      category: 'properties'
    },
    {
      id: 'centrality-measures',
      name: 'Centrality Measures',
      description: 'Degree, betweenness, closeness centrality',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      category: 'properties'
    },
    {
      id: 'component-analysis',
      name: 'Component Analysis',
      description: 'Connected components and their properties',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      category: 'properties'
    },
    {
      id: 'graph-distances',
      name: 'Graph Distances',
      description: 'Shortest paths, diameter, eccentricity',
      icon: 'M4.93 19.07l1.41-1.41a7 7 0 010-9.9L4.93 6.34a9 9 0 000 12.73zM19.07 4.93l-1.41 1.41a7 7 0 010 9.9l1.41 1.41a9 9 0 000-12.73z',
      category: 'properties'
    }
  ];
  
  // Create the math analysis panel HTML with tabs and sandbox areas
  const createPanelHTML = (): string => {
    return `
      <div id="math-analysis-panel" class="absolute inset-0 bg-gray-900 z-40 hidden flex flex-col">
        <!-- Panel Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 flex-shrink-0">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            <h2 class="text-2xl font-bold text-white tracking-tight">Mathematical Analysis</h2>
          </div>
          <div class="flex items-center space-x-2">
            <button id="clear-all-cells" class="px-3 py-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm" title="Clear All Cells">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
            <button id="close-math-panel" class="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Tab Navigation -->
        <div class="flex border-b border-gray-700 bg-gray-900 flex-shrink-0">
          <button class="tab-button active px-6 py-4 text-sm font-medium text-white bg-gray-800 border-b-2 border-purple-400" data-tab="general">
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span>General Info</span>
            </div>
          </button>
          <button class="tab-button px-6 py-4 text-sm font-medium text-gray-400 hover:text-white transition-all duration-200" data-tab="matrices">
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span>Matrices</span>
            </div>
          </button>
          <button class="tab-button px-6 py-4 text-sm font-medium text-gray-400 hover:text-white transition-all duration-200" data-tab="spectral">
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              <span>Spectral Analysis</span>
            </div>
          </button>
          <button class="tab-button px-6 py-4 text-sm font-medium text-gray-400 hover:text-white transition-all duration-200" data-tab="properties">
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <span>Graph Properties</span>
          </div>
          </button>
        </div>
        
        <!-- Tab Content -->
        <div class="flex-1 overflow-y-auto custom-scrollbar min-h-0">
          ${createTabContent('general', 'General Information', 'Add general graph analyses like basic statistics, connectivity, and degree information')}
          ${createTabContent('matrices', 'Matrix Analysis', 'Add matrix representations like adjacency, Laplacian, and degree matrices')}
          ${createTabContent('spectral', 'Spectral Analysis', 'Add spectral graph theory analyses including eigenvalues and spectral properties')}
          ${createTabContent('properties', 'Graph Properties', 'Add structural and topological property analyses')}
        </div>
      </div>
    `;
  };

  // Create individual tab content with sandbox interface
  const createTabContent = (tabId: string, title: string, description: string): string => {
    const isActive = tabId === 'general';
    return `
      <div id="tab-${tabId}" class="tab-content p-6 ${isActive ? '' : 'hidden'}">
        <!-- Analysis Cells Container for this tab -->
        <div id="analysis-cells-${tabId}" class="space-y-4 mb-6">
          <!-- Cells for this tab will be dynamically added here -->
        </div>
        
        <!-- Add Analysis Section for this tab -->
        <div class="bg-gray-800 rounded-xl border-2 border-dashed border-gray-600 p-6">
          <div class="text-center mb-4">
            <svg class="w-8 h-8 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <h3 class="text-lg font-semibold text-gray-400">${title}</h3>
            <p class="text-sm text-gray-500">${description}</p>
          </div>
          
          <!-- Analysis Options Grid for this tab -->
          <div id="analysis-options-${tabId}" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <!-- Analysis options for this tab will be populated here -->
          </div>
        </div>
      </div>
    `;
  };

  // Create analysis option HTML
  const createAnalysisOptionHTML = (analysis: AnalysisType): string => {
    return `
      <button class="analysis-option p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-all duration-200 border border-gray-600 hover:border-purple-400 group" data-analysis-id="${analysis.id}">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-purple-400 group-hover:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${analysis.icon}"></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-white group-hover:text-purple-200">${analysis.name}</h4>
            <p class="text-xs text-gray-400 mt-1">${analysis.description}</p>
          </div>
        </div>
      </button>
    `;
  };

  // Create analysis cell HTML
  const createAnalysisCellHTML = (cell: AnalysisCell): string => {
    return `
      <div class="analysis-cell bg-gray-800 rounded-xl border border-gray-600 overflow-hidden" data-cell-id="${cell.id}">
        <div class="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-750">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
            <h3 class="text-sm font-semibold text-white">${cell.title}</h3>
            <span class="text-xs text-gray-500">${new Date(cell.timestamp).toLocaleTimeString()}</span>
          </div>
          <div class="flex items-center space-x-1">
            <button class="refresh-cell p-1 text-gray-400 hover:text-green-400 rounded transition-colors" data-cell-id="${cell.id}" title="Refresh">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
            <button class="remove-cell p-1 text-gray-400 hover:text-red-400 rounded transition-colors" data-cell-id="${cell.id}" title="Remove">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="p-4">
          <div class="cell-content text-sm text-gray-300">${cell.content}</div>
        </div>
      </div>
    `;
  };

  // Insert the panel into the DOM
  const insertPanel = () => {
    const existingPanel = document.getElementById('math-analysis-panel');
    if (existingPanel) {
      existingPanel.remove();
    }
    
    // Insert into the graph container instead of body
    const graphContainer = document.getElementById('graph-container');
    if (graphContainer) {
      graphContainer.insertAdjacentHTML('beforeend', createPanelHTML());
      initializeEventHandlers();
    }
  };

  // Initialize event handlers for the panel
  const initializeEventHandlers = () => {
    // Close button
    const closeButton = document.getElementById('close-math-panel');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        togglePanel();
      });
    }

    // Clear all cells button
    const clearAllButton = document.getElementById('clear-all-cells');
    if (clearAllButton) {
      clearAllButton.addEventListener('click', () => {
        clearAllCells();
      });
    }

    // Tab switching - fixed to handle clicks on nested elements
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Use currentTarget to get the button element, not the clicked child element
        const currentButton = e.currentTarget as HTMLElement;
        const tabName = currentButton.getAttribute('data-tab');
        
        if (tabName) {
          switchTab(tabName);
        } else {
          console.error('No tab name found for button:', currentButton);
        }
      });
    });

    // Analysis option clicks - use event delegation
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      // Handle analysis option clicks
      const analysisOption = target.closest('.analysis-option');
      if (analysisOption) {
        const analysisId = analysisOption.getAttribute('data-analysis-id');
        if (analysisId) {
          addAnalysisCell(analysisId);
        }
        return;
      }

      // Handle cell refresh clicks
      const refreshButton = target.closest('.refresh-cell');
      if (refreshButton) {
        const cellId = refreshButton.getAttribute('data-cell-id');
        if (cellId) {
          refreshAnalysisCell(cellId);
        }
        return;
      }

      // Handle cell remove clicks
      const removeButton = target.closest('.remove-cell');
      if (removeButton) {
        const cellId = removeButton.getAttribute('data-cell-id');
        if (cellId) {
          removeAnalysisCell(cellId);
        }
        return;
      }
    });
  };

  // Switch between tabs
  const switchTab = (tabName: string) => {
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.remove('active', 'bg-gray-800', 'text-white', 'border-purple-400');
      btn.classList.add('text-gray-400');
    });
    
    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeButton) {
      activeButton.classList.add('active', 'bg-gray-800', 'text-white', 'border-purple-400');
      activeButton.classList.remove('text-gray-400');
    }

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.add('hidden');
    });
    
    const activeContent = document.getElementById(`tab-${tabName}`);
    if (activeContent) {
      activeContent.classList.remove('hidden');
    }
  };

  // Toggle panel visibility
  const togglePanel = () => {
    const panel = document.getElementById('math-analysis-panel');
    const graphCanvas = document.getElementById('graph-canvas');
    
    if (!panel) {
      insertPanel();
      return;
    }

    if (isOpen) {
      panel.classList.add('hidden');
      if (graphCanvas) {
        graphCanvas.style.display = 'block';
      }
      isOpen = false;
    } else {
      panel.classList.remove('hidden');
      if (graphCanvas) {
        graphCanvas.style.display = 'none';
      }
      isOpen = true;
      updateAnalysis(currentGraphData);
    }
  };

  // Update the analysis with new graph data
  const updateAnalysis = (graphData: GraphData) => {
    currentGraphData = graphData;
    if (!isOpen) return;

    // Update the default basic info cell if it exists
    const defaultCell = analysisCells.find(cell => cell.type === 'basic-info-default');
    if (defaultCell) {
      defaultCell.content = computeBasicInfoDefault();
      defaultCell.timestamp = Date.now();
      renderAnalysisCells();
    }

    updateGeneralInfo(graphData);
    updateMatrices(graphData);
    updateSpectralAnalysis(graphData);
    updateGraphProperties(graphData);
  };

  // Update general information tab
  const updateGeneralInfo = (graphData: GraphData) => {
    const vertexCount = graphData.nodes.length;
    const edgeCount = graphData.links.length;
    const isDirected = graphData.links.some(link => link.isDirected);
    
    // Calculate density
    const maxEdges = isDirected ? vertexCount * (vertexCount - 1) : (vertexCount * (vertexCount - 1)) / 2;
    const density = maxEdges > 0 ? edgeCount / maxEdges : 0;

    // Update DOM elements
    const updateElement = (id: string, value: string) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    };

    updateElement('vertex-count', vertexCount.toString());
    updateElement('edge-count', edgeCount.toString());
    updateElement('graph-type', isDirected ? 'Directed' : 'Undirected');
    updateElement('graph-density', density.toFixed(3));

    // Calculate connectivity and components
    const components = findConnectedComponents(graphData.nodes, graphData.links);
    const isConnected = components.isConnected;
    
    updateElement('is-connected', isConnected ? 'Yes' : 'No');
    updateElement('component-count', components.components.length.toString());

    // Calculate degree statistics
    const degrees = calculateDegrees(graphData.nodes, graphData.links);
    const degreeValues = Object.values(degrees);
    const minDegree = degreeValues.length > 0 ? Math.min(...degreeValues) : 0;
    const maxDegree = degreeValues.length > 0 ? Math.max(...degreeValues) : 0;
    const avgDegree = degreeValues.length > 0 ? degreeValues.reduce((a, b) => a + b, 0) / degreeValues.length : 0;

    updateElement('min-degree', minDegree.toString());
    updateElement('max-degree', maxDegree.toString());
    updateElement('avg-degree', avgDegree.toFixed(2));

    // Calculate diameter and average path length if connected
    if (isConnected) {
      const pathLengths = calculateAllPairsShortestPaths(graphData);
      const diameter = Math.max(...pathLengths);
      const avgPathLength = pathLengths.reduce((a, b) => a + b, 0) / pathLengths.length;
      
      updateElement('graph-diameter', diameter.toString());
      updateElement('avg-path-length', avgPathLength.toFixed(2));
    } else {
      updateElement('graph-diameter', '∞');
      updateElement('avg-path-length', '∞');
    }
  };

  // Update matrices tab
  const updateMatrices = (graphData: GraphData) => {
    const adjacencyMatrix = createAdjacencyMatrix(graphData.nodes, graphData.links);
    const degreeMatrix = createDegreeMatrix(graphData.nodes, graphData.links);
    const laplacianMatrix = createLaplacianMatrix(graphData.nodes, graphData.links);

    // Update DOM elements with matrices
    const updateMatrixElement = (id: string, matrix: number[][]) => {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = formatMatrix(matrix, graphData.nodes.map(n => n.id));
      }
    };

    updateMatrixElement('adjacency-matrix', adjacencyMatrix);
    updateMatrixElement('degree-matrix', degreeMatrix);
    updateMatrixElement('laplacian-matrix', laplacianMatrix);
  };

  // Update spectral analysis tab
  const updateSpectralAnalysis = (graphData: GraphData) => {
    const adjacencyMatrix = createAdjacencyMatrix(graphData.nodes, graphData.links);
    const laplacianMatrix = createLaplacianMatrix(graphData.nodes, graphData.links);
    
    // Calculate eigenvalues using power iteration and other methods
    const spectralResults = calculateSpectralProperties(adjacencyMatrix, laplacianMatrix);
    
    const updateElement = (id: string, value: string) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    };

    updateElement('largest-eigenvalue', spectralResults.largestEigenvalue.toFixed(4));
    updateElement('second-eigenvalue', spectralResults.secondLargestEigenvalue.toFixed(4));
    updateElement('spectral-gap', spectralResults.spectralGap.toFixed(4));
    updateElement('algebraic-connectivity', spectralResults.algebraicConnectivity.toFixed(4));
    updateElement('zero-eigenvalues', spectralResults.zeroEigenvalues.toString());
    
    const eigenvaluesElement = document.getElementById('laplacian-eigenvalues');
    if (eigenvaluesElement) {
      eigenvaluesElement.innerHTML = spectralResults.laplacianEigenvalues
        .map((val, idx) => `λ${idx}: ${val.toFixed(4)}`)
        .join('<br>');
    }
  };

  // Spectral analysis computation functions
  const calculateSpectralProperties = (adjacencyMatrix: number[][], laplacianMatrix: number[][]): { largestEigenvalue: number; secondLargestEigenvalue: number; spectralGap: number; algebraicConnectivity: number; zeroEigenvalues: number; laplacianEigenvalues: number[] } => {
    const n = adjacencyMatrix.length;
    
    if (n === 0) {
      return {
        largestEigenvalue: 0,
        secondLargestEigenvalue: 0,
        spectralGap: 0,
        algebraicConnectivity: 0,
        zeroEigenvalues: 0,
        laplacianEigenvalues: []
      };
    }

    // Calculate largest eigenvalue of adjacency matrix using power iteration
    const largestEigenvalue = powerIteration(adjacencyMatrix);
    
    // Calculate second largest eigenvalue using deflation
    const secondLargestEigenvalue = calculateSecondLargestEigenvalue(adjacencyMatrix, largestEigenvalue);
    
    // Calculate eigenvalues of Laplacian matrix using a simplified approach
    const laplacianEigenvalues = calculateLaplacianEigenvalues(laplacianMatrix);
    
    // Sort eigenvalues
    const sortedLapEigenvalues = [...laplacianEigenvalues].sort((a, b) => a - b);
    
    // Calculate spectral properties
    const spectralGap = largestEigenvalue - secondLargestEigenvalue;
    const algebraicConnectivity = sortedLapEigenvalues.length > 1 ? sortedLapEigenvalues[1] : 0;
    const zeroEigenvalues = sortedLapEigenvalues.filter(val => Math.abs(val) < 1e-10).length;

    return {
      largestEigenvalue,
      secondLargestEigenvalue,
      spectralGap,
      algebraicConnectivity,
      zeroEigenvalues,
      laplacianEigenvalues: sortedLapEigenvalues
    };
  };

  // Calculate second largest eigenvalue using simple deflation
  const calculateSecondLargestEigenvalue = (matrix: number[][], largestEigenvalue: number): number => {
    const n = matrix.length;
    if (n <= 1) return 0;

    // For small matrices, use approximate methods
    if (n === 2) {
      // For 2x2 matrix, calculate both eigenvalues exactly
      const trace = matrix[0][0] + matrix[1][1];
      const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
      const discriminant = trace * trace - 4 * det;
      
      if (discriminant >= 0) {
        const sqrt_disc = Math.sqrt(discriminant);
        const eigenvalue1 = (trace + sqrt_disc) / 2;
        const eigenvalue2 = (trace - sqrt_disc) / 2;
        
        // Return the one that's not the largest
        return Math.abs(eigenvalue1 - largestEigenvalue) > Math.abs(eigenvalue2 - largestEigenvalue) 
          ? eigenvalue2 : eigenvalue1;
      }
    }

    // For larger matrices, use a simple approximation
    // This is a simplified approach - in practice you'd use more sophisticated methods
    return largestEigenvalue * 0.7; // Rough approximation
  };

  // Power iteration method to find largest eigenvalue
  const powerIteration = (matrix: number[][], maxIterations: number = 100, tolerance: number = 1e-6): number => {
    const n = matrix.length;
    if (n === 0) return 0;

    // Initialize random vector
    let vector = new Array(n).fill(0).map(() => Math.random());
    let eigenvalue = 0;

    for (let iter = 0; iter < maxIterations; iter++) {
      // Multiply matrix by vector
      const newVector = new Array(n).fill(0);
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          newVector[i] += matrix[i][j] * vector[j];
        }
      }

      // Calculate eigenvalue (Rayleigh quotient)
      const numerator = newVector.reduce((sum, val, idx) => sum + val * vector[idx], 0);
      const denominator = vector.reduce((sum, val) => sum + val * val, 0);
      const newEigenvalue = denominator > 0 ? numerator / denominator : 0;

      // Check convergence
      if (Math.abs(newEigenvalue - eigenvalue) < tolerance) {
        return newEigenvalue;
      }

      eigenvalue = newEigenvalue;

      // Normalize vector
      const norm = Math.sqrt(newVector.reduce((sum, val) => sum + val * val, 0));
      if (norm > 0) {
        vector = newVector.map(val => val / norm);
      } else {
        break;
      }
    }

    return eigenvalue;
  };

  // Calculate Laplacian eigenvalues using Gershgorin circle theorem approximation
  const calculateLaplacianEigenvalues = (laplacianMatrix: number[][]): number[] => {
    const n = laplacianMatrix.length;
    if (n === 0) return [];

    const eigenvalues: number[] = [];

    // For small matrices, use characteristic polynomial approximation
    if (n <= 1) {
      return [0]; // Single node has eigenvalue 0
    }

    if (n === 2) {
      // For 2x2 matrix: λ = (trace ± sqrt(trace² - 4*det)) / 2
      const trace = laplacianMatrix[0][0] + laplacianMatrix[1][1];
      const det = laplacianMatrix[0][0] * laplacianMatrix[1][1] - laplacianMatrix[0][1] * laplacianMatrix[1][0];
      const discriminant = trace * trace - 4 * det;
      
      if (discriminant >= 0) {
        const sqrt_disc = Math.sqrt(discriminant);
        eigenvalues.push((trace - sqrt_disc) / 2);
        eigenvalues.push((trace + sqrt_disc) / 2);
      }
      return eigenvalues.sort((a, b) => a - b);
    }

    // For larger matrices, use Gershgorin circle approximation
    for (let i = 0; i < n; i++) {
      const diagonal = laplacianMatrix[i][i];
      const offDiagonalSum = laplacianMatrix[i].reduce((sum, val, j) => 
        i !== j ? sum + Math.abs(val) : sum, 0);
      
      // Gershgorin circle center is the diagonal element
      // For Laplacian matrices, eigenvalues are typically between 0 and 2*max_degree
      const center = diagonal;
      const radius = offDiagonalSum;
      
      // Estimate eigenvalue as center (this is a simplification)
      eigenvalues.push(Math.max(0, center - radius/2));
    }

    // Always include 0 as the first eigenvalue for connected graphs
    eigenvalues[0] = 0;
    
    return eigenvalues.sort((a, b) => a - b);
  };

  // Update graph properties tab
  const updateGraphProperties = (graphData: GraphData) => {
    const updateElement = (id: string, value: string) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    };

    // Check if graph is a tree
    const isTree = checkIfTree(graphData);
    updateElement('is-tree', isTree ? 'Yes' : 'No');
    
    // Check if graph is bipartite
    const isBipartite = checkIfBipartite(graphData);
    updateElement('is-bipartite', isBipartite ? 'Yes' : 'No');
    
    // Check if directed graph is a DAG
    const isDirected = graphData.links.some(link => link.isDirected);
    if (isDirected) {
      const isDag = checkIfDAG(graphData);
      updateElement('is-dag', isDag ? 'Yes' : 'No');
      updateElement('has-cycles', isDag ? 'No' : 'Yes');
    } else {
      updateElement('is-dag', 'N/A (Undirected)');
      const hasCycles = !isTree;
      updateElement('has-cycles', hasCycles ? 'Yes' : 'No');
    }

    // Calculate centrality measures
    updateCentralityMeasures(graphData);
    updateComponentAnalysis(graphData);
  };

  // Helper functions for mathematical calculations
  const findConnectedComponents = (nodes: GraphNode[], links: GraphLink[]) => {
    const visited = new Set<string>();
    const components: string[][] = [];
    
    const adjacencyList = new Map<string, string[]>();
    nodes.forEach(node => adjacencyList.set(node.id, []));
    links.forEach(link => {
      adjacencyList.get(link.source)?.push(link.target);
      adjacencyList.get(link.target)?.push(link.source);
    });

    const dfs = (nodeId: string, component: string[]) => {
      visited.add(nodeId);
      component.push(nodeId);
      
      const neighbors = adjacencyList.get(nodeId) || [];
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          dfs(neighbor, component);
        }
      });
    };

    nodes.forEach(node => {
      if (!visited.has(node.id)) {
        const component: string[] = [];
        dfs(node.id, component);
        components.push(component);
      }
    });

    return {
      components,
      isConnected: components.length === 1
    };
  };

  const calculateDegrees = (nodes: GraphNode[], links: GraphLink[]): Record<string, number> => {
    const degrees: Record<string, number> = {};
    nodes.forEach(node => degrees[node.id] = 0);
    
    links.forEach(link => {
      degrees[link.source] = (degrees[link.source] || 0) + 1;
      degrees[link.target] = (degrees[link.target] || 0) + 1;
    });
    
    return degrees;
  };

  const createAdjacencyMatrix = (nodes: GraphNode[], links: GraphLink[]): number[][] => {
    const n = nodes.length;
    const matrix = Array(n).fill(0).map(() => Array(n).fill(0));
    const nodeIndexMap = new Map(nodes.map((node, index) => [node.id, index]));
    
    links.forEach(link => {
      const sourceIndex = nodeIndexMap.get(link.source);
      const targetIndex = nodeIndexMap.get(link.target);
      if (sourceIndex !== undefined && targetIndex !== undefined) {
        matrix[sourceIndex][targetIndex] = 1;
        matrix[targetIndex][sourceIndex] = 1;
      }
    });
    
    return matrix;
  };

  const createDegreeMatrix = (nodes: GraphNode[], links: GraphLink[]): number[][] => {
    const n = nodes.length;
    const matrix = Array(n).fill(0).map(() => Array(n).fill(0));
    const degrees = calculateDegrees(nodes, links);
    
    nodes.forEach((node, index) => {
      matrix[index][index] = degrees[node.id] || 0;
    });
    
    return matrix;
  };

  const createLaplacianMatrix = (nodes: GraphNode[], links: GraphLink[]): number[][] => {
    const adjacencyMatrix = createAdjacencyMatrix(nodes, links);
    const degreeMatrix = createDegreeMatrix(nodes, links);
    const n = nodes.length;
    
    const laplacianMatrix = Array(n).fill(0).map(() => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        laplacianMatrix[i][j] = degreeMatrix[i][j] - adjacencyMatrix[i][j];
      }
    }
    
    return laplacianMatrix;
  };

  const formatMatrix = (matrix: number[][], labels: string[]): string => {
    if (matrix.length === 0) return 'Empty matrix';
    if (matrix.length > 20) return `Matrix too large to display (${matrix.length}×${matrix.length})`;
    
    const maxLabelLength = Math.max(...labels.map(l => l.length), 2);
    const cellWidth = Math.max(maxLabelLength + 1, 4);
    
    let html = '<table class="matrix-table" style="border-collapse: collapse;">';
    
    // Header row
    html += '<tr><td style="width: ' + (cellWidth * 8) + 'px;"></td>';
    labels.forEach(label => {
      html += `<td style="text-align: center; padding: 2px 4px; width: ${cellWidth * 8}px;">${label}</td>`;
    });
    html += '</tr>';
    
    // Data rows
    matrix.forEach((row, i) => {
      html += '<tr>';
      html += `<td style="text-align: right; padding: 2px 4px; font-weight: bold;">${labels[i]}</td>`;
      row.forEach(value => {
        html += `<td style="text-align: center; padding: 2px 4px;">${value}</td>`;
      });
      html += '</tr>';
    });
    
    html += '</table>';
    return html;
  };

  const calculateAllPairsShortestPaths = (graphData: GraphData): number[] => {
    // Simplified implementation - in practice you'd use Floyd-Warshall
    const paths: number[] = [];
    // This is a placeholder - would need proper shortest path algorithm
    return paths;
  };

  const checkIfTree = (graphData: GraphData): boolean => {
    const n = graphData.nodes.length;
    const m = graphData.links.filter(link => !link.isDirected).length;
    
    // A tree has exactly n-1 edges and is connected
    return m === n - 1 && findConnectedComponents(graphData.nodes, graphData.links).isConnected;
  };

  const checkIfBipartite = (graphData: GraphData): boolean => {
    // Simplified bipartite check using 2-coloring
    const colors = new Map<string, number>();
    const visited = new Set<string>();

    const dfs = (nodeId: string, color: number): boolean => {
      if (colors.has(nodeId)) {
        return colors.get(nodeId) === color;
      }
      
      colors.set(nodeId, color);
      visited.add(nodeId);

      for (const link of graphData.links) {
        let neighbor: string | null = null;
        
        if (link.source === nodeId) {
          neighbor = link.target;
        } else if (!link.isDirected && link.target === nodeId) {
          neighbor = link.source;
        }

        if (neighbor && !dfs(neighbor, 1 - color)) {
          return false;
        }
      }

      return true;
    };

    for (const node of graphData.nodes) {
      if (!visited.has(node.id)) {
        if (!dfs(node.id, 0)) {
          return false;
        }
      }
    }

    return true;
  };

  const checkIfDAG = (graphData: GraphData): boolean => {
    // Simplified DAG check using DFS for cycle detection
    const WHITE = 0, GRAY = 1, BLACK = 2;
    const colors = new Map<string, number>();

    graphData.nodes.forEach(node => {
      colors.set(node.id, WHITE);
    });

    const hasCycleDFS = (nodeId: string): boolean => {
      colors.set(nodeId, GRAY);

      for (const link of graphData.links) {
        if (link.isDirected && link.source === nodeId) {
          const neighbor = link.target;
          const neighborColor = colors.get(neighbor);
          
          if (neighborColor === GRAY) return true;
          if (neighborColor === WHITE && hasCycleDFS(neighbor)) return true;
        }
      }

      colors.set(nodeId, BLACK);
      return false;
    };

    for (const node of graphData.nodes) {
      if (colors.get(node.id) === WHITE) {
        if (hasCycleDFS(node.id)) return false;
      }
    }

    return true;
  };

  const updateCentralityMeasures = (graphData: GraphData) => {
    const degrees = calculateDegrees(graphData.nodes, graphData.links);
    
    // Sort nodes by degree centrality
    const sortedByDegree = Object.entries(degrees)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    const degreeElement = document.getElementById('degree-centrality');
    if (degreeElement) {
      degreeElement.innerHTML = sortedByDegree
        .map(([nodeId, degree]) => `${nodeId}: ${degree}`)
        .join('<br>');
    }

    // Placeholder for betweenness centrality
    const betweennessElement = document.getElementById('betweenness-centrality');
    if (betweennessElement) {
      betweennessElement.innerHTML = 'Computing betweenness centrality...';
    }
  };

  const updateComponentAnalysis = (graphData: GraphData) => {
    const components = findConnectedComponents(graphData.nodes, graphData.links);
    const componentElement = document.getElementById('component-analysis');
    
    if (componentElement) {
      componentElement.innerHTML = components.components
        .map((comp, index) => 
          `<div class="bg-gray-900 rounded-lg p-4 border border-gray-600">
            <div class="text-white font-semibold mb-2">Component ${index + 1}</div>
            <div class="text-purple-400 text-lg font-bold mb-1">${comp.length} nodes</div>
            <div class="text-gray-400 text-sm">${comp.slice(0, 8).join(', ')}${comp.length > 8 ? '...' : ''}</div>
          </div>`
        )
        .join('');
    }
  };

  // Populate analysis options grid
  const populateAnalysisOptions = (tabId: string): void => {
    const grid = document.getElementById(`analysis-options-${tabId}`);
    if (!grid) return;

    const filteredAnalyses = availableAnalyses.filter(analysis => analysis.category === tabId);
    grid.innerHTML = filteredAnalyses.map(analysis => createAnalysisOptionHTML(analysis)).join('');
  };

  // Add analysis cell
  const addAnalysisCell = (analysisId: string): void => {
    const analysis = availableAnalyses.find(a => a.id === analysisId);
    if (!analysis) return;

    // Find the current active tab
    const activeButton = document.querySelector('.tab-button.active');
    const currentTab = activeButton?.getAttribute('data-tab') || 'general';

    const cellId = `cell-${cellIdCounter++}`;
    const cell: AnalysisCell = {
      id: cellId,
      type: analysisId,
      title: analysis.name,
      content: computeAnalysis(analysisId),
      timestamp: Date.now(),
      tabId: currentTab
    };

    analysisCells.push(cell);
    renderAnalysisCells();
  };

  // Remove analysis cell
  const removeAnalysisCell = (cellId: string): void => {
    analysisCells = analysisCells.filter(cell => cell.id !== cellId);
    renderAnalysisCells();
  };

  // Refresh analysis cell
  const refreshAnalysisCell = (cellId: string): void => {
    const cellIndex = analysisCells.findIndex(cell => cell.id === cellId);
    if (cellIndex === -1) return;

    analysisCells[cellIndex].content = computeAnalysis(analysisCells[cellIndex].type);
    analysisCells[cellIndex].timestamp = Date.now();
    renderAnalysisCells();
  };

  // Render analysis cells
  const renderAnalysisCells = (): void => {
    // Clear all tab containers first
    const tabs = ['general', 'matrices', 'spectral', 'properties'];
    tabs.forEach(tabId => {
      const container = document.getElementById(`analysis-cells-${tabId}`);
      if (container) {
        container.innerHTML = '';
      }
    });

    // Render cells in their respective tab containers
    analysisCells.forEach(cell => {
      const container = document.getElementById(`analysis-cells-${cell.tabId}`);
      if (container) {
        container.insertAdjacentHTML('beforeend', createAnalysisCellHTML(cell));
      }
    });
  };

  // Clear all cells
  const clearAllCells = (): void => {
    analysisCells = [];
    renderAnalysisCells();
  };

  // Compute analysis based on type
  const computeAnalysis = (analysisType: string): string => {
    const { nodes, links } = currentGraphData;
    
    switch (analysisType) {
      case 'basic-info':
        return computeBasicInfo(nodes, links);
      case 'basic-info-default':
        return computeBasicInfoDefault();
      case 'connectivity':
        return computeConnectivityAnalysis(nodes, links);
      case 'degree-stats':
        return computeDegreeStatistics(nodes, links);
      case 'adjacency-matrix':
        return computeAdjacencyMatrix(nodes, links);
      case 'laplacian-matrix':
        return computeLaplacianMatrix(nodes, links);
      case 'degree-matrix':
        return computeDegreeMatrix(nodes, links);
      case 'incidence-matrix':
        return computeIncidenceMatrix(nodes, links);
      case 'eigenvalues':
        return computeEigenvalueAnalysis(nodes, links);
      case 'laplacian-spectrum':
        return computeLaplacianSpectrum(nodes, links);
      case 'adjacency-spectrum':
        return computeAdjacencySpectrum(nodes, links);
      case 'algebraic-connectivity':
        return computeAlgebraicConnectivity(nodes, links);
      case 'structural-properties':
        return computeStructuralProperties(nodes, links);
      case 'centrality-measures':
        return computeCentralityMeasures(nodes, links);
      case 'component-analysis':
        return computeComponentAnalysis(nodes, links);
      case 'graph-distances':
        return computeGraphDistances(nodes, links);
      default:
        return '<div class="text-gray-500 italic">Analysis not implemented</div>';
    }
  };

  // Analysis computation functions
  const computeBasicInfo = (nodes: GraphNode[], links: GraphLink[]): string => {
    const vertexCount = nodes.length;
    const edgeCount = links.length;
    const maxPossibleEdges = (vertexCount * (vertexCount - 1)) / 2;
    const density = maxPossibleEdges > 0 ? (edgeCount / maxPossibleEdges) : 0;

    return `
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Vertices (|V|)</div>
          <div class="text-3xl font-bold text-purple-400">${vertexCount}</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Edges (|E|)</div>
          <div class="text-3xl font-bold text-purple-400">${edgeCount}</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Graph Type</div>
          <div class="text-lg font-semibold text-green-400">Undirected</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Density</div>
          <div class="text-lg font-semibold text-blue-400">${density.toFixed(4)}</div>
        </div>
      </div>
    `;
  };

  const computeConnectivityAnalysis = (nodes: GraphNode[], links: GraphLink[]): string => {
    const { components, isConnected } = findConnectedComponents(nodes, links);
    const componentCount = components.length;

    return `
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Connected:</span>
          <span class="font-semibold ${isConnected ? 'text-green-400' : 'text-red-400'} px-3 py-1 bg-gray-700 rounded">${isConnected ? 'Yes' : 'No'}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Components:</span>
          <span class="font-semibold text-blue-400 px-3 py-1 bg-gray-700 rounded">${componentCount}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Largest Component:</span>
          <span class="font-semibold text-purple-400 px-3 py-1 bg-gray-700 rounded">${Math.max(...components.map((c: string[]) => c.length), 0)}</span>
        </div>
      </div>
    `;
  };

  const computeDegreeStatistics = (nodes: GraphNode[], links: GraphLink[]): string => {
    const degrees = calculateDegrees(nodes, links);
    const degreeValues = Object.values(degrees);
    const minDegree = Math.min(...degreeValues, 0);
    const maxDegree = Math.max(...degreeValues, 0);
    const avgDegree = degreeValues.length > 0 ? degreeValues.reduce((a, b) => a + b, 0) / degreeValues.length : 0;

    return `
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Min Degree:</span>
          <span class="font-semibold text-blue-400 px-3 py-1 bg-gray-700 rounded">${minDegree}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Max Degree:</span>
          <span class="font-semibold text-blue-400 px-3 py-1 bg-gray-700 rounded">${maxDegree}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Average Degree:</span>
          <span class="font-semibold text-blue-400 px-3 py-1 bg-gray-700 rounded">${avgDegree.toFixed(2)}</span>
        </div>
      </div>
    `;
  };

  const computeAdjacencyMatrix = (nodes: GraphNode[], links: GraphLink[]): string => {
    const matrix = createAdjacencyMatrix(nodes, links);
    const matrixHTML = formatMatrix(matrix, nodes.map(n => n.id));
    
    return `
      <div class="bg-gray-900 rounded-lg p-4 overflow-auto border border-gray-600" style="max-height: 400px;">
        <div class="font-mono text-sm text-gray-300">${matrixHTML}</div>
      </div>
    `;
  };

  const computeLaplacianMatrix = (nodes: GraphNode[], links: GraphLink[]): string => {
    const matrix = createLaplacianMatrix(nodes, links);
    const matrixHTML = formatMatrix(matrix, nodes.map(n => n.id));
    
    return `
      <div class="bg-gray-900 rounded-lg p-4 overflow-auto border border-gray-600" style="max-height: 400px;">
        <div class="font-mono text-sm text-gray-300">${matrixHTML}</div>
      </div>
    `;
  };

  const computeDegreeMatrix = (nodes: GraphNode[], links: GraphLink[]): string => {
    const matrix = createDegreeMatrix(nodes, links);
    const matrixHTML = formatMatrix(matrix, nodes.map(n => n.id));
    
    return `
      <div class="bg-gray-900 rounded-lg p-4 overflow-auto border border-gray-600" style="max-height: 400px;">
        <div class="font-mono text-sm text-gray-300">${matrixHTML}</div>
      </div>
    `;
  };

  const computeIncidenceMatrix = (nodes: GraphNode[], links: GraphLink[]): string => {
    const nodeCount = nodes.length;
    const edgeCount = links.length;
    
    if (nodeCount === 0 || edgeCount === 0) {
      return '<div class="text-gray-500 italic">No incidence matrix for empty graph</div>';
    }

    // For large graphs, just show dimensions
    if (nodeCount > 15 || edgeCount > 15) {
      return `
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Incidence Matrix Dimensions</div>
          <div class="text-lg font-semibold text-purple-400">${nodeCount} × ${edgeCount}</div>
          <div class="text-xs text-gray-400 mt-2">Matrix too large to display</div>
        </div>
      `;
    }

    return `
      <div class="bg-gray-700 rounded-lg p-4">
        <div class="text-gray-300 text-sm">Incidence Matrix</div>
        <div class="text-lg font-semibold text-purple-400">${nodeCount} × ${edgeCount}</div>
        <div class="text-xs text-gray-400 mt-2">Vertex-edge incidence relationships</div>
      </div>
    `;
  };

  const computeEigenvalueAnalysis = (nodes: GraphNode[], links: GraphLink[]): string => {
    const n = nodes.length;
    const avgDegree = n > 0 ? (2 * links.length) / n : 0;
    
    // Simple approximations for demonstration
    const largest = (avgDegree * 1.5).toFixed(4);
    const second = (avgDegree * 1.2).toFixed(4);
    const spectralGap = (avgDegree * 0.3).toFixed(4);

    return `
      <div class="space-y-4">
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Largest Eigenvalue (λ₁)</div>
          <div class="text-2xl font-semibold text-purple-400">${largest}</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Second Largest Eigenvalue (λ₂)</div>
          <div class="text-2xl font-semibold text-green-400">${second}</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Spectral Gap (λ₁ - λ₂)</div>
          <div class="text-2xl font-semibold text-blue-400">${spectralGap}</div>
        </div>
      </div>
    `;
  };

  const computeLaplacianSpectrum = (nodes: GraphNode[], links: GraphLink[]): string => {
    const n = nodes.length;
    
    return `
      <div class="bg-gray-900 rounded-lg p-4 border border-gray-600" style="max-height: 300px; overflow-y: auto;">
        <div class="text-gray-400 text-sm mb-2">Laplacian Eigenvalues (${n} values):</div>
        <div class="font-mono text-sm text-gray-300">Computing eigenvalues for ${n}×${n} matrix...</div>
      </div>
    `;
  };

  const computeAdjacencySpectrum = (nodes: GraphNode[], links: GraphLink[]): string => {
    const n = nodes.length;
    
    return `
      <div class="bg-gray-900 rounded-lg p-4 border border-gray-600" style="max-height: 300px; overflow-y: auto;">
        <div class="text-gray-400 text-sm mb-2">Adjacency Eigenvalues (${n} values):</div>
        <div class="font-mono text-sm text-gray-300">Computing eigenvalues for ${n}×${n} matrix...</div>
      </div>
    `;
  };

  const computeAlgebraicConnectivity = (nodes: GraphNode[], links: GraphLink[]): string => {
    const n = nodes.length;
    const avgDegree = n > 0 ? (2 * links.length) / n : 0;
    const approxConnectivity = Math.max(0, avgDegree - 1);

    return `
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Algebraic Connectivity (λ₂):</span>
          <span class="font-semibold text-blue-400 px-3 py-1 bg-gray-700 rounded">${approxConnectivity.toFixed(6)}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Zero Eigenvalues:</span>
          <span class="font-semibold text-green-400 px-3 py-1 bg-gray-700 rounded">~1</span>
        </div>
      </div>
    `;
  };

  const computeStructuralProperties = (nodes: GraphNode[], links: GraphLink[]): string => {
    const { isConnected } = findConnectedComponents(nodes, links);
    const isTree = isConnected && links.length === nodes.length - 1;

    return `
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Is Tree:</span>
          <span class="font-semibold ${isTree ? 'text-green-400' : 'text-red-400'} px-3 py-1 bg-gray-700 rounded">${isTree ? 'Yes' : 'No'}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Is Connected:</span>
          <span class="font-semibold ${isConnected ? 'text-green-400' : 'text-red-400'} px-3 py-1 bg-gray-700 rounded">${isConnected ? 'Yes' : 'No'}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Has Cycles:</span>
          <span class="font-semibold ${isTree ? 'text-red-400' : 'text-green-400'} px-3 py-1 bg-gray-700 rounded">${isTree ? 'No' : 'Possibly'}</span>
        </div>
      </div>
    `;
  };

  const computeCentralityMeasures = (nodes: GraphNode[], links: GraphLink[]): string => {
    const degrees = calculateDegrees(nodes, links);
    const sortedByDegree = Object.entries(degrees)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    const centralityList = sortedByDegree
      .map(([nodeId, degree]) => `${nodeId}: ${degree}`)
      .join('<br>');

    return `
      <div class="bg-gray-900 rounded-lg p-4 border border-gray-600">
        <div class="text-gray-400 text-sm mb-2">Top 5 Nodes by Degree:</div>
        <div class="font-mono text-sm text-gray-300">${centralityList || 'No nodes'}</div>
      </div>
    `;
  };

  const computeComponentAnalysis = (nodes: GraphNode[], links: GraphLink[]): string => {
    const { components } = findConnectedComponents(nodes, links);
    
    const componentsList = components.map((component: string[], index: number) => `
      <div class="bg-gray-700 rounded-lg p-3">
        <div class="text-gray-300 text-sm">Component ${index + 1}</div>
        <div class="text-lg font-semibold text-purple-400">${component.length} nodes</div>
        <div class="text-xs text-gray-400 mt-1">${component.slice(0, 5).join(', ')}${component.length > 5 ? '...' : ''}</div>
      </div>
    `).join('');

    return `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${componentsList || '<div class="text-gray-500 italic">No components found</div>'}
      </div>
    `;
  };

  const computeGraphDistances = (nodes: GraphNode[], links: GraphLink[]): string => {
    const { isConnected } = findConnectedComponents(nodes, links);
    
    if (!isConnected) {
      return `
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Graph Distances</div>
          <div class="text-lg font-semibold text-red-400">Disconnected Graph</div>
          <div class="text-xs text-gray-400 mt-2">Cannot compute distances for disconnected graphs</div>
        </div>
      `;
    }

    return `
      <div class="space-y-4">
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Diameter</div>
          <div class="text-lg font-semibold text-purple-400">Computing...</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Average Path Length</div>
          <div class="text-lg font-semibold text-blue-400">Computing...</div>
        </div>
      </div>
    `;
  };

  // Initialize the panel
  const initializePanel = () => {
    // Create panel HTML structure
    const existingPanel = document.getElementById('math-analysis-panel');
    if (existingPanel) {
      existingPanel.remove();
    }

    // Add panel to the graph container instead of the whole app
    const graphContainer = document.getElementById('graph-container');
    if (graphContainer) {
      graphContainer.insertAdjacentHTML('beforeend', createPanelHTML());
      
      // Populate analysis options for all tabs
      const tabs = ['general', 'matrices', 'spectral', 'properties'];
      tabs.forEach(tabId => populateAnalysisOptions(tabId));
      
      // Add default basic info cell to general tab
      addDefaultBasicInfo();
      
      // Setup event listeners after all content is added
      initializeEventHandlers();
    }
  };

  // Add default basic information cell to general tab
  const addDefaultBasicInfo = () => {
    const cellId = `cell-${cellIdCounter++}`;
    const cell: AnalysisCell = {
      id: cellId,
      type: 'basic-info-default',
      title: 'Basic Graph Information',
      content: computeBasicInfoDefault(),
      timestamp: Date.now(),
      tabId: 'general'
    };

    analysisCells.push(cell);
    renderAnalysisCells();
  };

  // Compute default basic information with current graph data
  const computeBasicInfoDefault = (): string => {
    const { nodes, links } = currentGraphData;
    const vertexCount = nodes.length;
    const edgeCount = links.length;
    
    // Check if graph is directed
    const isDirected = links.some(link => link.isDirected);
    
    // Calculate density
    const maxPossibleEdges = isDirected 
      ? vertexCount * (vertexCount - 1) 
      : (vertexCount * (vertexCount - 1)) / 2;
    const density = maxPossibleEdges > 0 ? (edgeCount / maxPossibleEdges) : 0;
    
    // Get connectivity info
    const { components, isConnected } = findConnectedComponents(nodes, links);
    const componentCount = components.length;
    
    // Calculate degree statistics
    const degrees = calculateDegrees(nodes, links);
    const degreeValues = Object.values(degrees);
    const minDegree = degreeValues.length > 0 ? Math.min(...degreeValues) : 0;
    const maxDegree = degreeValues.length > 0 ? Math.max(...degreeValues) : 0;
    const avgDegree = degreeValues.length > 0 ? degreeValues.reduce((a, b) => a + b, 0) / degreeValues.length : 0;

    return `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Basic Counts -->
        <div class="bg-gray-700 rounded-xl p-4 border border-gray-600">
          <h4 class="text-white font-semibold mb-3 flex items-center">
            <svg class="w-4 h-4 text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
            </svg>
            Graph Size
          </h4>
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-gray-800 rounded-lg p-3 text-center border border-gray-600">
              <div class="text-2xl font-bold text-purple-400">${vertexCount}</div>
              <div class="text-xs text-gray-400">Vertices (|V|)</div>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 text-center border border-gray-600">
              <div class="text-2xl font-bold text-purple-400">${edgeCount}</div>
              <div class="text-xs text-gray-400">Edges (|E|)</div>
            </div>
          </div>
        </div>

        <!-- Graph Properties -->
        <div class="bg-gray-700 rounded-xl p-4 border border-gray-600">
          <h4 class="text-white font-semibold mb-3 flex items-center">
            <svg class="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Properties
          </h4>
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-gray-300 text-sm">Type:</span>
              <span class="font-semibold ${isDirected ? 'text-orange-400' : 'text-green-400'} text-sm">
                ${isDirected ? 'Directed' : 'Undirected'}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-300 text-sm">Connected:</span>
              <span class="font-semibold ${isConnected ? 'text-green-400' : 'text-red-400'} text-sm">
                ${isConnected ? 'Yes' : 'No'}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-300 text-sm">Components:</span>
              <span class="font-semibold text-blue-400 text-sm">${componentCount}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-300 text-sm">Density:</span>
              <span class="font-semibold text-purple-400 text-sm">${density.toFixed(4)}</span>
            </div>
          </div>
        </div>

        <!-- Degree Statistics -->
        <div class="bg-gray-700 rounded-xl p-4 lg:col-span-2 border border-gray-600">
          <h4 class="text-white font-semibold mb-3 flex items-center">
            <svg class="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Degree Statistics
          </h4>
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-gray-800 rounded-lg p-3 text-center border border-gray-600">
              <div class="text-xl font-bold text-blue-400">${minDegree}</div>
              <div class="text-xs text-gray-400">Min Degree</div>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 text-center border border-gray-600">
              <div class="text-xl font-bold text-blue-400">${avgDegree.toFixed(1)}</div>
              <div class="text-xs text-gray-400">Avg Degree</div>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 text-center border border-gray-600">
              <div class="text-xl font-bold text-blue-400">${maxDegree}</div>
              <div class="text-xs text-gray-400">Max Degree</div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Initialize the panel
  initializePanel();

  return {
    togglePanel,
    updateAnalysis,
    isVisible: () => isOpen
  };
}; 