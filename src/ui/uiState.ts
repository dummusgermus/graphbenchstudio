// UI State Management for Graph Properties and Tags

// Track active properties
export let activeProperties = new Set<string>();

// Property exclusion rules
export const exclusionRules: Record<string, string[]> = {
  'strongly-connected': ['disconnected'],
  'disconnected': ['strongly-connected'],
  'directed': ['undirected'],
  'undirected': ['directed'],
  'weighted': ['unweighted'],
  'unweighted': ['weighted'],
  'flow-network': ['tree', 'undirected'],
  'tree': ['flow-network', 'cycles'],
  'dag': ['cycles', 'undirected'],
  'cycles': ['tree', 'dag'],
  'bipartite': ['undirected']
};

// Track if event delegation has been set up
let tagsInitialized = false;

// Set default properties (undirected and unweighted)
export const initializeDefaultProperties = () => {
  activeProperties.clear();
  activeProperties.add('undirected');
  activeProperties.add('unweighted');
};

// Update visual state of tags
export const updateTagStates = () => {
  // Define required pairs where switching should always be allowed
  const requiredPairs = [
    ['directed', 'undirected'],
    ['weighted', 'unweighted']
  ];
  
  const tags = document.querySelectorAll('.graph-tag');
  tags.forEach(tag => {
    const button = tag as HTMLButtonElement;
    const property = button.dataset.property!;
    
    // Find which required pair this property belongs to (if any)
    const requiredPair = requiredPairs.find(pair => pair.includes(property));
    
    // Check if this property is excluded by any active property
    let isExcluded = false;
    if (!requiredPair) {
      // For non-required properties, use normal exclusion rules
      isExcluded = Array.from(activeProperties).some(activeProp => 
        exclusionRules[activeProp]?.includes(property)
      );
    }
    // For required pairs, never mark as excluded (always allow switching)
    
    // Update visual state
    if (activeProperties.has(property)) {
      button.classList.add('active');
      button.classList.remove('disabled');
    } else if (isExcluded) {
      button.classList.remove('active');
      button.classList.add('disabled');
    } else {
      button.classList.remove('active', 'disabled');
    }
  });
  
  // Show/hide component controls
  const componentControls = document.getElementById('component-controls');
  if (componentControls) {
    if (activeProperties.has('disconnected')) {
      componentControls.classList.remove('hidden');
      updateComponentCountBounds(); // Update bounds when showing component controls
    } else {
      componentControls.classList.add('hidden');
    }
  }
  
  // Show/hide weight controls
  const weightControls = document.getElementById('weight-controls');
  if (weightControls) {
    if (activeProperties.has('weighted')) {
      weightControls.classList.remove('hidden');
    } else {
      weightControls.classList.add('hidden');
    }
  }
  
  // Show/hide multi-partite controls
  const multipartiteControls = document.getElementById('multipartite-controls');
  if (multipartiteControls) {
    if (activeProperties.has('bipartite')) {
      multipartiteControls.classList.remove('hidden');
      updatePartitionCountBounds(); // Update bounds when showing multipartite controls
      
      // Always regenerate partition ratio inputs to match current partition count
      const partitionCountValue = document.getElementById('partition-count-value') as HTMLInputElement;
      const currentPartitionCount = parseInt(partitionCountValue?.value || '2');
      
      console.log('Bipartite activated - regenerating ratio inputs for count:', currentPartitionCount);
      updatePartitionRatioInputs(currentPartitionCount);
    } else {
      multipartiteControls.classList.add('hidden');
    }
  }
  
  // Show/hide flow network controls
  const flowNetworkControls = document.getElementById('flow-network-controls');
  if (flowNetworkControls) {
    if (activeProperties.has('flow-network')) {
      flowNetworkControls.classList.remove('hidden');
    } else {
      flowNetworkControls.classList.add('hidden');
    }
  }
  
  // Show/hide Erdős-Renyi controls
  const erdosRenyiControls = document.getElementById('erdos-renyi-controls');
  if (erdosRenyiControls) {
    if (activeProperties.has('erdos-renyi')) {
      erdosRenyiControls.classList.remove('hidden');
    } else {
      erdosRenyiControls.classList.add('hidden');
    }
  }
};

export const toggleProperty = (property: string) => {
  // Define required pairs where one must always be selected (only for sidebar controls)
  const requiredPairs = [
    ['directed', 'undirected'],
    ['weighted', 'unweighted']
  ];
  
  // Find which required pair this property belongs to (if any)
  const requiredPair = requiredPairs.find(pair => pair.includes(property));
  
  if (activeProperties.has(property)) {
    // If it's part of a required pair, don't allow deactivation
    if (requiredPair) {
      return; // Don't deactivate required properties
    }
    // Deactivate property (for optional properties)
    activeProperties.delete(property);
  } else {
    // Property is not currently active, so we want to activate it
    // Always allow activation - the exclusion rules are just for visual feedback
    
    // Activate property
    activeProperties.add(property);
    
    // Deactivate conflicting properties
    const excludes = exclusionRules[property] || [];
    excludes.forEach(excludedProp => {
      activeProperties.delete(excludedProp);
      
      // If we just deactivated a required pair member, activate its partner
      const deactivatedPair = requiredPairs.find(pair => pair.includes(excludedProp));
      if (deactivatedPair) {
        const partner = deactivatedPair.find(p => p !== excludedProp);
        if (partner) {
          activeProperties.add(partner);
        }
      }
    });
  }
  
  updateTagStates();
};

// Function to update component count bounds based on node count
export const updateComponentCountBounds = () => {
  const nodeCountInput = document.getElementById('node-count') as HTMLInputElement;
  const componentCountInput = document.getElementById('component-count') as HTMLInputElement;
  const componentCountValue = document.getElementById('component-count-value') as HTMLInputElement;
  
  const nodeCount = parseInt(nodeCountInput?.value || '20', 10);
  const maxComponents = nodeCount; // Maximum should be the node count itself
  
  if (componentCountInput && componentCountValue) {
    // Store current value before changing bounds
    const currentValue = parseInt(componentCountValue.value);
    
    componentCountInput.min = '1';
    componentCountInput.max = maxComponents.toString();
    componentCountValue.min = '1';
    componentCountValue.max = maxComponents.toString();
    
    // Only adjust current value if it's actually invalid
    if (currentValue > maxComponents) {
      const newValue = maxComponents.toString();
      componentCountInput.value = newValue;
      componentCountValue.value = newValue;
      console.log(`Component count adjusted from ${currentValue} to ${newValue} (max: ${maxComponents})`);
    } else if (currentValue < 1 || isNaN(currentValue)) {
      componentCountInput.value = '2';
      componentCountValue.value = '2';
      console.log(`Component count reset to default: 2`);
    }
    // If the current value is valid, leave it unchanged
  }
};

// Function to update partition count bounds based on node count
export const updatePartitionCountBounds = () => {
  const nodeCountInput = document.getElementById('node-count') as HTMLInputElement;
  const partitionCountInput = document.getElementById('partition-count') as HTMLInputElement;
  const partitionCountValue = document.getElementById('partition-count-value') as HTMLInputElement;
  
  const nodeCount = parseInt(nodeCountInput?.value || '20', 10);
  const maxPartitions = Math.min(nodeCount, 10); // Cap at 10 for UI reasons, but never more than node count
  
  if (partitionCountInput && partitionCountValue) {
    // Store current value before changing bounds
    const currentValue = parseInt(partitionCountValue.value);
    
    partitionCountInput.min = '2';
    partitionCountInput.max = maxPartitions.toString();
    partitionCountValue.min = '2';
    partitionCountValue.max = maxPartitions.toString();
    
    // Only adjust current value if it's actually invalid
    if (currentValue > maxPartitions) {
      const newValue = maxPartitions.toString();
      partitionCountInput.value = newValue;
      partitionCountValue.value = newValue;
      console.log(`Partition count adjusted from ${currentValue} to ${newValue} (max: ${maxPartitions})`);
      updatePartitionRatioInputs(parseInt(newValue)); // Update ratio inputs when count changes
    } else if (currentValue < 2 || isNaN(currentValue)) {
      partitionCountInput.value = '2';
      partitionCountValue.value = '2';
      console.log(`Partition count reset to default: 2`);
      updatePartitionRatioInputs(2); // Update ratio inputs when count changes
    } else {
      updatePartitionRatioInputs(currentValue); // Update ratio inputs for current count
    }
  }
};

// Function to update partition ratio inputs based on partition count
export const updatePartitionRatioInputs = (partitionCount: number) => {
  const ratioInputsContainer = document.getElementById('partition-ratio-inputs');
  if (!ratioInputsContainer) return;
  
  // Clear existing inputs
  ratioInputsContainer.innerHTML = '';
  
  // Create equal ratio for each partition
  const equalRatio = Math.floor(100 / partitionCount);
  const remainder = 100 - (equalRatio * partitionCount);
  
  // Generate input for each partition
  for (let i = 0; i < partitionCount; i++) {
    const ratio = i === 0 ? equalRatio + remainder : equalRatio; // Give remainder to first partition
    
    const inputDiv = document.createElement('div');
    inputDiv.className = 'flex items-center space-x-2';
    inputDiv.innerHTML = `
      <label class="text-white text-xs w-12">Part ${i + 1}:</label>
      <input type="number" id="partition-ratio-${i}" value="${ratio}" min="1" max="98" class="flex-1 text-white text-xs bg-gray-800 px-2 py-1 rounded border border-gray-600 text-center focus:outline-none focus:border-blue-400">
      <span class="text-gray-400 text-xs">%</span>
    `;
    
    ratioInputsContainer.appendChild(inputDiv);
    
    // Add event listener for real-time total calculation
    const input = inputDiv.querySelector(`#partition-ratio-${i}`) as HTMLInputElement;
    if (input) {
      input.addEventListener('input', updateRatioTotal);
    }
  }
  
  updateRatioTotal();
};

// Function to calculate and display total ratio percentage
export const updateRatioTotal = () => {
  const ratioInputs = document.querySelectorAll('[id^="partition-ratio-"]') as NodeListOf<HTMLInputElement>;
  const totalSpan = document.getElementById('ratio-total');
  
  let total = 0;
  ratioInputs.forEach(input => {
    const value = parseInt(input.value) || 0;
    total += value;
  });
  
  if (totalSpan) {
    totalSpan.textContent = `Total: ${total}%`;
    
    // Change color based on whether total is 100
    if (total === 100) {
      totalSpan.className = 'text-xs text-green-400';
    } else if (total > 100) {
      totalSpan.className = 'text-xs text-red-400';
    } else {
      totalSpan.className = 'text-xs text-yellow-400';
    }
  }
};

// Function to normalize ratios to sum to 100%
export const normalizeRatios = () => {
  const ratioInputs = document.querySelectorAll('[id^="partition-ratio-"]') as NodeListOf<HTMLInputElement>;
  
  // Get current values
  const currentValues = Array.from(ratioInputs).map(input => parseInt(input.value) || 0);
  const currentTotal = currentValues.reduce((sum, val) => sum + val, 0);
  
  if (currentTotal === 0) return; // Avoid division by zero
  
  // Calculate normalized values
  const normalizedValues = currentValues.map(val => Math.round((val / currentTotal) * 100));
  
  // Handle rounding errors by adjusting the largest value
  const normalizedTotal = normalizedValues.reduce((sum, val) => sum + val, 0);
  if (normalizedTotal !== 100) {
    const maxIndex = normalizedValues.indexOf(Math.max(...normalizedValues));
    normalizedValues[maxIndex] += (100 - normalizedTotal);
  }
  
  // Update input values
  ratioInputs.forEach((input, index) => {
    input.value = normalizedValues[index].toString();
  });
  
  updateRatioTotal();
};

// Function to get current partition ratios as array
export const getPartitionRatios = (): number[] => {
  const partitionCountValue = document.getElementById('partition-count-value') as HTMLInputElement;
  const currentPartitionCount = parseInt(partitionCountValue?.value || '2');
  
  // Only get ratios for the current partition count
  const ratios = [];
  for (let i = 0; i < currentPartitionCount; i++) {
    const input = document.getElementById(`partition-ratio-${i}`) as HTMLInputElement;
    ratios.push(parseInt(input?.value || '0'));
  }
  
  console.log('getPartitionRatios() called');
  console.log('Current partition count:', currentPartitionCount);
  console.log('Total ratio inputs found:', document.querySelectorAll('[id^="partition-ratio-"]').length);
  console.log('Ratio values for current count:', ratios);
  
  return ratios;
};

// Initialize tags and set up event delegation
export const initializeTags = () => {
  if (tagsInitialized) {
    // Just update states if already initialized
    updateTagStates();
    return;
  }
  
  // Use event delegation to handle all graph-tag clicks
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const button = target.closest('.graph-tag') as HTMLButtonElement;
    
    if (button && button.dataset.property) {
      console.log('Tag clicked via delegation:', button.dataset.property);
      e.preventDefault();
      e.stopPropagation();
      toggleProperty(button.dataset.property);
    }
  });
  
  tagsInitialized = true;
  
  // Set initial state
  updateTagStates();
};

// Reset configuration to defaults
export const resetConfiguration = () => {
  initializeDefaultProperties();
  updateTagStates();
};

// Problem description management
export const updateProblemDescription = (problem: string) => {
  const descContainer = document.getElementById('problem-description');
  if (!descContainer) return;

  switch (problem) {
    case 'maximum-clique':
      descContainer.innerHTML = `
        <div class="problem-desc">
          <h3 class="text-base font-semibold text-white mb-2">Maximum Clique</h3>
          <p class="text-gray-300 text-xs leading-relaxed">
            Find the largest set of nodes where every two distinct vertices are adjacent.
          </p>
        </div>
      `;
      break;
    case 'shortest-path':
      descContainer.innerHTML = `
        <div class="problem-desc">
          <h3 class="text-base font-semibold text-white mb-2">Shortest Path</h3>
          <p class="text-gray-300 text-xs leading-relaxed">
            Find the shortest path between two randomly selected nodes using edge weights.
          </p>
        </div>
      `;
      break;
    case 'maximum-spanning-tree':
      descContainer.innerHTML = `
        <div class="problem-desc">
          <h3 class="text-base font-semibold text-white mb-2">Maximum Spanning Tree</h3>
          <p class="text-gray-300 text-xs leading-relaxed">
            Find the spanning tree with maximum total weight that connects all vertices.
          </p>
        </div>
      `;
      break;
    case 'steiner-tree':
      descContainer.innerHTML = `
        <div class="problem-desc">
          <h3 class="text-base font-semibold text-white mb-2">Steiner Tree</h3>
          <p class="text-gray-300 text-xs leading-relaxed">
            Find the minimum weight tree that connects a specified set of terminal nodes.
          </p>
        </div>
      `;
      break;
    case 'max-flow':
      descContainer.innerHTML = `
        <div class="problem-desc">
          <h3 class="text-base font-semibold text-white mb-2">Maximum Flow</h3>
          <p class="text-gray-300 text-xs leading-relaxed">
            Find the maximum flow from source to sink in a flow network. Requires a flow network graph.
          </p>
        </div>
      `;
      break;
    case 'multipartite-matching':
      descContainer.innerHTML = `
        <div class="problem-desc">
          <h3 class="text-base font-semibold text-white mb-2">Multipartite Matching</h3>
          <p class="text-gray-300 text-xs leading-relaxed">
            Find the maximum matching in a multipartite graph where no two edges share a vertex. Requires a multipartite graph.
          </p>
        </div>
      `;
      break;
    default:
      descContainer.innerHTML = `
        <div class="problem-desc">
          <h3 class="text-base font-semibold text-white mb-2">Problem Coming Soon</h3>
          <p class="text-gray-300 text-xs leading-relaxed">
            This problem will be implemented in a future update.
          </p>
        </div>
      `;
  }
  
  // Show/hide Steiner tree controls
  const steinerControls = document.getElementById('steiner-controls');
  if (steinerControls) {
    if (problem === 'steiner-tree') {
      steinerControls.classList.remove('hidden');
    } else {
      steinerControls.classList.add('hidden');
    }
  }
};

export const updateSolveButton = (problem: string) => {
  const solveBtn = document.getElementById('solve-btn') as HTMLButtonElement;
  if (!solveBtn) return;

  switch (problem) {
    case 'maximum-clique':
      solveBtn.textContent = 'Find Maximum Clique';
      solveBtn.disabled = false;
      solveBtn.className = 'w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]';
      break;
    case 'shortest-path':
      solveBtn.textContent = 'Find Shortest Path';
      solveBtn.disabled = false;
      solveBtn.className = 'w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]';
      break;
    case 'maximum-spanning-tree':
      solveBtn.textContent = 'Find Maximum Spanning Tree';
      solveBtn.disabled = false;
      solveBtn.className = 'w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]';
      break;
    case 'steiner-tree':
      solveBtn.textContent = 'Find Steiner Tree';
      solveBtn.disabled = false;
      solveBtn.className = 'w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]';
      break;
    case 'max-flow':
      solveBtn.textContent = 'Find Maximum Flow';
      solveBtn.disabled = false;
      solveBtn.className = 'w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]';
      break;
    case 'multipartite-matching':
      solveBtn.textContent = 'Find Multipartite Matching';
      solveBtn.disabled = false;
      solveBtn.className = 'w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]';
      break;
    default:
      solveBtn.textContent = 'Coming Soon';
      solveBtn.disabled = true;
      solveBtn.className = 'w-full bg-gray-600 text-gray-400 py-2 px-3 rounded-lg cursor-not-allowed text-sm font-medium';
  }
}; 