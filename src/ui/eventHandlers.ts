// Event handlers for UI interactions

import { 
  updateComponentCountBounds, 
  updateProblemDescription, 
  updateSolveButton,
  resetConfiguration,
  updatePartitionCountBounds,
  updatePartitionRatioInputs,
  normalizeRatios
} from './uiState';

export const initializeEventHandlers = (
  generateGraph: () => void,
  solveAlgorithm: (problemType: string) => void
) => {
  // Get UI elements
  const problemSelect = document.getElementById('problem-select') as HTMLSelectElement;
  const nodeCountInput = document.getElementById('node-count') as HTMLInputElement;
  const nodeCountValue = document.getElementById('node-count-value') as HTMLInputElement;
  const edgeProbabilityInput = document.getElementById('edge-probability') as HTMLInputElement;
  const edgeProbabilityValue = document.getElementById('edge-probability-value') as HTMLInputElement;
  const generateBtn = document.getElementById('generate-btn');
  const solveBtn = document.getElementById('solve-btn') as HTMLButtonElement;
  const resetConfig = document.getElementById('reset-config') as HTMLButtonElement;
  const componentCountInput = document.getElementById('component-count') as HTMLInputElement;
  const componentCountValue = document.getElementById('component-count-value') as HTMLInputElement;
  const partitionCountInput = document.getElementById('partition-count') as HTMLInputElement;
  const partitionCountValue = document.getElementById('partition-count-value') as HTMLInputElement;

  // Sync slider and input field for node count
  if (nodeCountInput && nodeCountValue) {
    // Slider changes input field
    nodeCountInput.addEventListener('input', () => {
      nodeCountValue.value = nodeCountInput.value;
      updateComponentCountBounds(); // Update component bounds when node count changes
      updatePartitionCountBounds(); // Update partition bounds when node count changes
    });
    
    // Input field changes slider (with validation)
    nodeCountValue.addEventListener('input', () => {
      let value = parseInt(nodeCountValue.value);
      const min = parseInt(nodeCountInput.min);
      const max = parseInt(nodeCountInput.max);
      
      // Clamp value to valid range
      if (isNaN(value)) value = min;
      if (value < min) value = min;
      if (value > max) value = max;
      
      nodeCountValue.value = value.toString();
      nodeCountInput.value = value.toString();
      updateComponentCountBounds(); // Update component bounds when node count changes
      updatePartitionCountBounds(); // Update partition bounds when node count changes
    });
  }

  // Sync slider and input field for edge probability
  if (edgeProbabilityInput && edgeProbabilityValue) {
    // Slider changes input field
    edgeProbabilityInput.addEventListener('input', () => {
      edgeProbabilityValue.value = edgeProbabilityInput.value;
    });
    
    // Input field changes slider (with validation)
    edgeProbabilityValue.addEventListener('input', () => {
      let value = parseFloat(edgeProbabilityValue.value);
      const min = parseFloat(edgeProbabilityInput.min);
      const max = parseFloat(edgeProbabilityInput.max);
      
      // Clamp value to valid range
      if (isNaN(value)) value = min;
      if (value < min) value = min;
      if (value > max) value = max;
      
      // Round to 2 decimal places
      value = Math.round(value * 100) / 100;
      
      edgeProbabilityValue.value = value.toString();
      edgeProbabilityInput.value = value.toString();
    });
  }

  // Handle problem selection
  if (problemSelect) {
    problemSelect.addEventListener('change', () => {
      const selectedProblem = problemSelect.value;
      updateProblemDescription(selectedProblem);
      updateSolveButton(selectedProblem);
    });
  }

  // Initialize component count sync
  if (componentCountInput && componentCountValue) {
    componentCountInput.addEventListener('input', () => {
      componentCountValue.value = componentCountInput.value;
    });
    
    componentCountValue.addEventListener('input', () => {
      let value = parseInt(componentCountValue.value);
      const min = parseInt(componentCountInput.min);
      const max = parseInt(componentCountInput.max);
      
      if (isNaN(value)) value = min;
      if (value < min) value = min;
      if (value > max) value = max;
      
      componentCountValue.value = value.toString();
      componentCountInput.value = value.toString();
    });
  }

  // Initialize partition count sync
  if (partitionCountInput && partitionCountValue) {
    partitionCountInput.addEventListener('input', () => {
      partitionCountValue.value = partitionCountInput.value;
      updatePartitionRatioInputs(parseInt(partitionCountInput.value)); // Update ratio inputs when count changes
    });
    
    partitionCountValue.addEventListener('input', () => {
      let value = parseInt(partitionCountValue.value);
      const min = parseInt(partitionCountInput.min);
      const max = parseInt(partitionCountInput.max);
      
      if (isNaN(value)) value = min;
      if (value < min) value = min;
      if (value > max) value = max;
      
      partitionCountValue.value = value.toString();
      partitionCountInput.value = value.toString();
      updatePartitionRatioInputs(value); // Update ratio inputs when count changes
    });
  }

  // Reset configuration
  if (resetConfig) {
    resetConfig.addEventListener('click', () => {
      resetConfiguration();
    });
  }

  // Add event listeners for generate and solve buttons
  if (generateBtn) {
    generateBtn.addEventListener('click', generateGraph);
  }
  
  if (solveBtn) {
    solveBtn.addEventListener('click', () => {
      const selectedProblem = problemSelect.value;
      solveAlgorithm(selectedProblem);
    });
  }

  // Initialize normalize ratios button
  const normalizeButton = document.getElementById('normalize-ratios');
  if (normalizeButton) {
    normalizeButton.addEventListener('click', normalizeRatios);
  }
}; 