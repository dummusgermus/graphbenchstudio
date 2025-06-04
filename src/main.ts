import './style.css';

// Import all the modular components
import { getAppTemplate } from './templates/appTemplate';
import { 
  initializeDefaultProperties, 
  initializeTags, 
  activeProperties 
} from './ui/uiState';
import { initializeModalManager } from './ui/modalManager';
import { initializeEventHandlers } from './ui/eventHandlers';
import { loadRequiredScripts } from './utils/scriptLoader';
import { initializeGraphVisualizer } from './graph/graphVisualizer';
import { initializeMathAnalysisPanel } from './ui/mathAnalysisPanel';
import { initializeExportModal } from './ui/exportModal';

// Setup the main app structure
const appElement = document.querySelector<HTMLDivElement>('#app');
if (!appElement) {
  throw new Error('App element not found');
}

// Create the app structure using the template
appElement.innerHTML = getAppTemplate();

// Load scripts and initialize
async function initialize() {
  try {
    // Load external scripts
    await loadRequiredScripts();
    
    // Initialize default UI state
    initializeDefaultProperties();
    
    // Initialize graph visualizer
    const graphVisualizer = initializeGraphVisualizer(activeProperties);
    if (!graphVisualizer) {
      throw new Error('Failed to initialize graph visualizer');
    }
    
    // Initialize math analysis panel
    const mathAnalysisPanel = initializeMathAnalysisPanel();
    
    // Initialize export modal
    const exportModal = initializeExportModal();
    
    // Connect math analysis panel to graph data changes
    graphVisualizer.addGraphDataChangeCallback((graphData) => {
      mathAnalysisPanel.updateAnalysis(graphData);
      exportModal.setCurrentGraphData(graphData);
    });
    
    // Initialize UI components
    initializeTags();
    initializeModalManager();
    initializeEventHandlers(
      graphVisualizer.generateGraph,
      graphVisualizer.solveAlgorithm
    );
    
    // Connect math analysis button to panel
    const mathAnalysisBtn = document.getElementById('math-analysis-btn');
    if (mathAnalysisBtn) {
      mathAnalysisBtn.addEventListener('click', () => {
        mathAnalysisPanel.togglePanel();
      });
    }
    
    // Generate initial graph
    graphVisualizer.generateGraph();
    
    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Error initializing application:', error);
  }
}

// Start initialization
initialize();
