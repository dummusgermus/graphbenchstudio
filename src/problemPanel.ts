import type { GraphProblem } from './types';

export function setupProblemPanel(
  containerId: string,
  problems: GraphProblem[],
  onProblemUpdate: (problem: GraphProblem, solve: boolean) => void
) {
  const container = document.getElementById(containerId)!;
  let currentProblemIndex = 0;

  // Create the main container for problem information
  container.innerHTML = `
    <div class="problem-content bg-gray-800 bg-opacity-95 p-4 rounded-lg h-full overflow-y-auto">
      <h1 class="text-2xl mb-6 text-white font-bold">Graph Problem Visualizer</h1>

      <div class="control-panel mb-6 p-4 bg-gray-700 rounded-lg">
        <h3 class="text-xl mb-3 text-white">Graph Generation</h3>
        
        <div class="mb-3">
          <label class="block text-white mb-1">Nodes</label>
          <input type="range" id="node-count" min="5" max="50" step="1" value="20" class="w-full"/>
          <span id="node-count-value" class="text-white">20</span>
        </div>
        
        <div class="mb-3">
          <label class="block text-white mb-1">Edge Probability</label>
          <input type="range" id="edge-probability" min="0.1" max="0.9" step="0.05" value="0.3" class="w-full"/>
          <span id="edge-probability-value" class="text-white">0.3</span>
        </div>
        
        <button id="generate-graph" class="btn btn-primary w-full">Generate New Graph</button>
      </div>

      <div class="problem-navigation mb-4 flex justify-between items-center">
        <button id="prev-problem" class="btn btn-outline">Previous</button>
        <span id="problem-counter" class="text-white">1/${problems.length}</span>
        <button id="next-problem" class="btn btn-outline">Next</button>
      </div>
      
      <h2 id="problem-title" class="problem-title text-xl font-bold mb-3 text-white"></h2>
      <div id="problem-description" class="problem-description mb-4 text-gray-300"></div>
      <button id="solve-problem" class="btn btn-primary w-full">Solve Problem</button>
    </div>
  `;

  // Get DOM elements
  const nodeCountInput = document.getElementById('node-count') as HTMLInputElement;
  const nodeCountValue = document.getElementById('node-count-value')!;
  const edgeProbabilityInput = document.getElementById('edge-probability') as HTMLInputElement;
  const edgeProbabilityValue = document.getElementById('edge-probability-value')!;
  const generateButton = document.getElementById('generate-graph')!;
  
  const prevButton = document.getElementById('prev-problem')!;
  const nextButton = document.getElementById('next-problem')!;
  const problemCounter = document.getElementById('problem-counter')!;
  const problemTitle = document.getElementById('problem-title')!;
  const problemDescription = document.getElementById('problem-description')!;
  const solveButton = document.getElementById('solve-problem')!;

  // Add event listeners for graph controls
  nodeCountInput.addEventListener('input', () => {
    nodeCountValue.textContent = nodeCountInput.value;
  });
  
  edgeProbabilityInput.addEventListener('input', () => {
    edgeProbabilityValue.textContent = edgeProbabilityInput.value;
  });
  
  generateButton.addEventListener('click', () => {
    const problem = problems[currentProblemIndex];
    const nodeCount = parseInt(nodeCountInput.value, 10);
    const edgeProbability = parseFloat(edgeProbabilityInput.value);
    
    const graph = problem.generateGraph(nodeCount, edgeProbability);
    onProblemUpdate(problem, false);
  });

  // Add event listeners for problem navigation
  prevButton.addEventListener('click', () => {
    if (currentProblemIndex > 0) {
      selectProblem(currentProblemIndex - 1);
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentProblemIndex < problems.length - 1) {
      selectProblem(currentProblemIndex + 1);
    }
  });

  solveButton.addEventListener('click', () => {
    onProblemUpdate(problems[currentProblemIndex], true);
  });

  // Function to select a problem
  function selectProblem(index: number) {
    currentProblemIndex = index;
    const problem = problems[index];
    
    // Update UI
    problemCounter.textContent = `${index + 1}/${problems.length}`;
    problemTitle.textContent = problem.name;
    problemDescription.textContent = problem.description;
    
    // Update navigation buttons
    if (prevButton instanceof HTMLButtonElement) {
      prevButton.disabled = index === 0;
    }
    if (nextButton instanceof HTMLButtonElement) {
      nextButton.disabled = index === problems.length - 1;
    }
    
    // Update graph
    onProblemUpdate(problem, false);
  }

  return {
    selectProblem
  };
} 