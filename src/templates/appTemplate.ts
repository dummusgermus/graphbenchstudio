export const getAppTemplate = (): string => {
  return `
  <div class="h-screen grid grid-cols-1 md:grid-cols-4 bg-gray-900">
    <div id="problem-panel" class="md:col-span-1 bg-gray-900 p-4 overflow-y-auto border-r border-gray-700 custom-scrollbar">
      <h1 class="text-2xl font-bold text-white mb-6 tracking-tight">Graph Problems</h1>
      
      <!-- Problem Selection -->
      <div class="mb-6">
        <h2 class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Problem</h2>
        <select id="problem-select" class="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 transition-all duration-200 appearance-none cursor-pointer">
          <option value="maximum-clique">Maximum Clique</option>
          <option value="shortest-path">Shortest Path</option>
          <option value="maximum-spanning-tree">Maximum Spanning Tree</option>
          <option value="steiner-tree">Steiner Tree</option>
          <option value="max-flow">Maximum Flow</option>
          <option value="multipartite-matching">Multipartite Matching</option>
        </select>
      </div>

      <!-- Problem Description -->
      <div id="problem-description" class="mb-6">
        <div id="maximum-clique-desc" class="problem-desc">
          <h3 class="text-base font-semibold text-white mb-2">Maximum Clique</h3>
          <p class="text-gray-300 text-xs leading-relaxed">
            Find the largest set of nodes where every two distinct vertices are adjacent.
          </p>
        </div>
      </div>

      <!-- Problem Actions -->
      <div class="mb-6">
        <button id="solve-btn" class="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]">
          Find Maximum Clique
        </button>
        
        <!-- Steiner Tree Terminal Count -->
        <div id="steiner-controls" class="mt-3 hidden">
          <label class="block text-white text-xs font-medium mb-2">Terminal Nodes</label>
          <input type="number" id="terminal-count" value="5" min="2" max="20" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
        </div>
        
        <div id="status-message" class="mt-3 p-2 rounded-lg text-xs hidden"></div>
      </div>

      <!-- Graph Controls -->
      <div class="border-t border-gray-700 pt-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xs font-medium text-gray-400 uppercase tracking-wider">Graph Generation</h3>
          <button id="advanced-config-btn" class="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-all duration-200 group" title="Advanced Configuration">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>
        </div>
        <div class="space-y-3">
          <div class="space-y-2">
            <label class="block text-white text-xs font-medium">Nodes</label>
            <input type="range" id="node-count" min="1" max="100" value="20" class="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer slider">
            <div class="flex justify-between text-xs text-gray-500">
              <span>1</span>
              <input type="number" id="node-count-value" value="20" min="1" max="100" class="text-white text-xs bg-gray-800 px-1.5 py-0.5 rounded border border-gray-600 w-12 text-center focus:outline-none focus:border-blue-400">
              <span>100</span>
            </div>
          </div>
          <div class="space-y-2">
            <label class="block text-white text-xs font-medium">Edge Density</label>
            <input type="range" id="edge-probability" min="0" max="1" step="0.01" value="0.3" class="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer slider">
            <div class="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <input type="number" id="edge-probability-value" value="0.3" min="0" max="1" step="0.01" class="text-white text-xs bg-gray-800 px-1.5 py-0.5 rounded border border-gray-600 w-12 text-center focus:outline-none focus:border-blue-400">
              <span>1</span>
            </div>
          </div>
          
          <!-- Graph Type -->
          <div class="space-y-2">
            <div class="flex flex-wrap gap-2">
              <button class="graph-tag" data-property="directed" data-excludes="undirected">
                <span class="tag-text">Directed</span>
              </button>
              <button class="graph-tag" data-property="undirected" data-excludes="directed">
                <span class="tag-text">Undirected</span>
              </button>
            </div>
          </div>
          
          <!-- Edge Weights -->
          <div class="space-y-2">
            <div class="flex flex-wrap gap-2 mb-3">
              <button class="graph-tag" data-property="weighted" data-excludes="unweighted">
                <span class="tag-text">Weighted</span>
              </button>
              <button class="graph-tag" data-property="unweighted" data-excludes="weighted">
                <span class="tag-text">Unweighted</span>
              </button>
            </div>
            <div id="weight-controls" class="space-y-2 hidden">
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-gray-400 text-xs">Min Weight</label>
                  <input type="number" id="min-weight" value="1" min="-10" max="10" step="0.1" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
                </div>
                <div>
                  <label class="block text-gray-400 text-xs">Max Weight</label>
                  <input type="number" id="max-weight" value="5" min="-10" max="10" step="0.1" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <button id="generate-btn" class="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]">
              Generate Graph
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Advanced Configuration Window -->
    <div id="advanced-config-window" class="fixed top-20 right-6 w-80 bg-gray-800 rounded-xl border border-gray-600 shadow-2xl z-40 hidden">
      <div id="window-header" class="flex items-center justify-between p-3 border-b border-gray-700 cursor-move bg-gray-750 rounded-t-xl">
        <div class="flex items-center space-x-2">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <h2 class="text-sm font-semibold text-white">Advanced Configuration</h2>
        </div>
        <button id="close-advanced-config" class="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-4 space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        <div>
          <label class="block text-white text-sm font-medium mb-3">Graph Properties</label>
          <div class="text-xs text-gray-400 mb-3">Click tags to activate properties. Some properties exclude others.</div>
          
          <!-- Connectivity Properties -->
          <div class="mb-4">
            <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Connectivity</div>
            <div class="flex flex-wrap gap-2">
              <button class="graph-tag" data-property="strongly-connected" data-excludes="disconnected,multiple-components">
                <span class="tag-text">Strongly Connected</span>
                <span class="tag-description">All nodes reachable</span>
              </button>
              <button class="graph-tag" data-property="disconnected" data-excludes="strongly-connected">
                <span class="tag-text">Disconnected</span>
                <span class="tag-description">Multiple components</span>
              </button>
            </div>
            
            <!-- Component Count (only when disconnected is active) -->
            <div id="component-controls" class="mt-3 hidden">
              <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Components</div>
              <div class="flex items-center space-x-3">
                <label class="text-white text-xs">Count:</label>
                <input type="range" id="component-count" min="1" max="20" value="2" class="flex-1 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer slider">
                <input type="number" id="component-count-value" value="2" min="1" max="20" class="text-white text-xs bg-gray-800 px-2 py-1 rounded border border-gray-600 w-12 text-center focus:outline-none focus:border-blue-400">
              </div>
            </div>
          </div>
          
          <!-- Special Graph Types -->
          <div class="mb-4">
            <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Special Types</div>
            <div class="flex flex-wrap gap-2">
              <button class="graph-tag" data-property="erdos-renyi">
                <span class="tag-text">Erdős-Renyi</span>
                <span class="tag-description">Random graph model</span>
              </button>
              <button class="graph-tag" data-property="flow-network" data-excludes="undirected,tree">
                <span class="tag-text">Flow Network</span>
                <span class="tag-description">Source & sink nodes</span>
              </button>
              <button class="graph-tag" data-property="bipartite">
                <span class="tag-text">Multi-partite</span>
                <span class="tag-description">Multiple node sets</span>
              </button>
              <button class="graph-tag" data-property="tree" data-excludes="flow-network,cycles">
                <span class="tag-text">Tree</span>
                <span class="tag-description">Acyclic connected</span>
              </button>
              <button class="graph-tag" data-property="dag" data-excludes="undirected,cycles">
                <span class="tag-text">DAG</span>
                <span class="tag-description">Directed acyclic</span>
              </button>
            </div>
            
            <!-- Erdős-Renyi Controls (when erdos-renyi is active) -->
            <div id="erdos-renyi-controls" class="mt-3 hidden">
              <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Erdős-Renyi Options</div>
              <div class="flex items-center space-x-3 mb-3">
                <label class="text-white text-xs">Connect components:</label>
                <input type="number" id="erdos-renyi-connections" value="1" min="1" max="10" class="text-white text-xs bg-gray-800 px-2 py-1 rounded border border-gray-600 w-16 text-center focus:outline-none focus:border-blue-400">
                <span class="text-gray-400 text-xs">edges between components</span>
              </div>
            </div>
            
            <!-- Multi-partite Controls (only when bipartite is active) -->
            <div id="multipartite-controls" class="mt-3 hidden">
              <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Partitions</div>
              <div class="flex items-center space-x-3 mb-3">
                <label class="text-white text-xs">Parts:</label>
                <input type="range" id="partition-count" min="2" max="10" value="2" class="flex-1 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer slider">
                <input type="number" id="partition-count-value" value="2" min="2" max="10" class="text-white text-xs bg-gray-800 px-2 py-1 rounded border border-gray-600 w-12 text-center focus:outline-none focus:border-blue-400">
              </div>
              
              <!-- Partition Ratios -->
              <div id="partition-ratios" class="space-y-2">
                <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Partition Ratios (%)</div>
                <div id="partition-ratio-inputs" class="space-y-2">
                  <!-- Dynamic ratio inputs will be generated here -->
                  <div class="flex items-center space-x-2">
                    <label class="text-white text-xs w-12">Part 1:</label>
                    <input type="number" id="partition-ratio-0" value="50" min="1" max="99" class="flex-1 text-white text-xs bg-gray-800 px-2 py-1 rounded border border-gray-600 text-center focus:outline-none focus:border-blue-400">
                    <span class="text-gray-400 text-xs">%</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <label class="text-white text-xs w-12">Part 2:</label>
                    <input type="number" id="partition-ratio-1" value="50" min="1" max="99" class="flex-1 text-white text-xs bg-gray-800 px-2 py-1 rounded border border-gray-600 text-center focus:outline-none focus:border-blue-400">
                    <span class="text-gray-400 text-xs">%</span>
                  </div>
                </div>
                <div class="flex justify-between items-center mt-2">
                  <button id="normalize-ratios" class="text-xs text-purple-400 hover:text-purple-300 underline cursor-pointer">
                    Normalize
                  </button>
                  <span id="ratio-total" class="text-xs text-gray-400">Total: 100%</span>
                </div>
              </div>
            </div>
            
            <!-- Flow Network Controls (only when flow-network is active) -->
            <div id="flow-network-controls" class="mt-3 hidden">
              <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Sources & Sinks</div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-white text-xs block mb-1">Sources:</label>
                  <input type="number" id="source-count" value="1" min="1" max="10" class="w-full text-white text-xs bg-gray-800 px-2 py-1 rounded border border-gray-600 text-center focus:outline-none focus:border-blue-400">
                </div>
                <div>
                  <label class="text-white text-xs block mb-1">Sinks:</label>
                  <input type="number" id="sink-count" value="1" min="1" max="10" class="w-full text-white text-xs bg-gray-800 px-2 py-1 rounded border border-gray-600 text-center focus:outline-none focus:border-blue-400">
                </div>
              </div>
              <div class="text-xs text-gray-400 mt-2">
                Multiple sources/sinks are connected via super-source/super-sink for max flow calculation.
              </div>
            </div>
          </div>
          
          <!-- Structure Properties -->
          <div class="mb-4">
            <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Structure</div>
            <div class="flex flex-wrap gap-2">
              <button class="graph-tag" data-property="planar">
                <span class="tag-text">Planar</span>
                <span class="tag-description">No edge crossings</span>
              </button>
              <button class="graph-tag" data-property="cycles" data-excludes="tree,dag">
                <span class="tag-text">Has Cycles</span>
                <span class="tag-description">Contains loops</span>
              </button>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end space-x-2 pt-2 border-t border-gray-700">
          <button id="reset-config" class="px-3 py-1.5 text-gray-400 hover:text-white transition-colors text-sm">
            Reset
          </button>
          <button id="cancel-advanced-config" class="px-3 py-1.5 text-gray-400 hover:text-white transition-colors text-sm">
            Cancel
          </button>
          <button id="apply-advanced-config" class="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm">
            Apply
          </button>
        </div>
      </div>
    </div>
    
    <div id="graph-container" class="md:col-span-3 bg-gray-900 relative" style="height: 100vh;">
      <div id="graph-canvas" style="width: 100%; height: 100%;"></div>
      
      <!-- Export Button -->
      <div class="absolute top-4 right-4 z-30">
        <button id="export-btn" class="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full hover:from-purple-700 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 transform hover:scale-110 animate-slide-in-right flex items-center justify-center group" title="Export Graph">
          <svg class="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </button>
      </div>
      
      <!-- Mathematical Analysis Button -->
      <div class="absolute bottom-4 right-4 z-30">
        <button id="math-analysis-btn" class="w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full hover:from-purple-700 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 transform hover:scale-110 translate-x-0 animate-slide-in-right flex items-center justify-center group" title="Mathematical Analysis">
          <svg class="w-6 h-6 transition-transform duration-200 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        </button>
      </div>
      
      <!-- Information Panel -->
      <div id="info-panel" class="absolute top-4 right-4 w-80 bg-gray-800 rounded-xl border border-gray-600 shadow-2xl z-30 hidden">
        <div class="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-750 rounded-t-xl">
          <div class="flex items-center space-x-2">
            <svg id="info-icon" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <h3 id="info-title" class="text-sm font-semibold text-white">Node Information</h3>
          </div>
          <button id="close-info-panel" class="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div id="info-content" class="p-4 space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
          <!-- Dynamic content will be inserted here -->
        </div>
      </div>
      
      <!-- Export Modal -->
      <div id="export-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center">
        <div class="bg-gray-800 rounded-xl border border-gray-600 shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-4 border-b border-gray-700">
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h2 class="text-xl font-bold text-white">Export Graph Data</h2>
            </div>
            <button id="close-export-modal" class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div class="p-6 space-y-6">
            <!-- Export Options -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-white">Export Options</h3>
              
              <!-- Single Graph Export -->
              <div class="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <h4 class="text-md font-medium text-white mb-3 flex items-center">
                  <svg class="w-4 h-4 text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Current Graph
                </h4>
                <p class="text-gray-300 text-sm mb-4">Export the currently displayed graph to PyTorch Geometric format.</p>
                <button id="export-current-graph" class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium">
                  Export Graph
                </button>
                <div class="mt-2 text-xs text-gray-400">
                  Downloads a Python script that creates a .pt file when executed
                </div>
              </div>
              
              <!-- Dataset Generation -->
              <div class="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <h4 class="text-md font-medium text-white mb-3 flex items-center">
                  <svg class="w-4 h-4 text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  Generate Dataset
                </h4>
                <p class="text-gray-300 text-sm mb-4">Generate multiple graphs with configurable parameters.</p>
                
                <!-- Basic Dataset Settings -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-white text-sm font-medium mb-2">Number of Graphs</label>
                    <input type="number" id="dataset-count" value="1000" min="1" max="100000" class="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400">
                  </div>
                  <div>
                    <label class="block text-white text-sm font-medium mb-2">Use Current Settings</label>
                    <label class="flex items-center mt-2">
                      <input type="checkbox" id="dataset-use-current" checked class="mr-2 rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500">
                      <span class="text-white text-sm">Apply current graph properties</span>
                    </label>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-white text-sm font-medium mb-2">Node Count Range</label>
                    <div class="flex space-x-2">
                      <input type="number" id="dataset-min-nodes" value="20" min="1" max="1000" placeholder="Min" class="flex-1 bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400">
                      <input type="number" id="dataset-max-nodes" value="20" min="1" max="1000" placeholder="Max" class="flex-1 bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400">
                    </div>
                  </div>
                  <div>
                    <label class="block text-white text-sm font-medium mb-2">Edge Density Range</label>
                    <div class="flex space-x-2">
                      <input type="number" id="dataset-min-density" value="0.30" min="0" max="1" step="0.01" placeholder="Min" class="flex-1 bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400">
                      <input type="number" id="dataset-max-density" value="0.30" min="0" max="1" step="0.01" placeholder="Max" class="flex-1 bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400">
                    </div>
                  </div>
                </div>

                <!-- Advanced Dataset Properties -->
                <div id="dataset-advanced-properties" class="space-y-4 mb-4">
                  <h5 class="text-sm font-medium text-white border-b border-gray-600 pb-2">Graph Properties</h5>
                  
                  <!-- Graph Type -->
                  <div>
                    <label class="block text-white text-xs font-medium mb-2">Graph Type</label>
                    <div class="flex flex-wrap gap-2">
                      <button class="dataset-property-tag" data-property="directed" data-excludes="undirected">
                        <span class="tag-text">Directed</span>
                      </button>
                      <button class="dataset-property-tag" data-property="undirected" data-excludes="directed">
                        <span class="tag-text">Undirected</span>
                      </button>
                    </div>
                  </div>
                  
                  <!-- Edge Weights -->
                  <div>
                    <label class="block text-white text-xs font-medium mb-2">Edge Weights</label>
                    <div class="flex flex-wrap gap-2 mb-3">
                      <button class="dataset-property-tag" data-property="weighted" data-excludes="unweighted">
                        <span class="tag-text">Weighted</span>
                      </button>
                      <button class="dataset-property-tag" data-property="unweighted" data-excludes="weighted">
                        <span class="tag-text">Unweighted</span>
                      </button>
                    </div>
                    <div id="dataset-weight-controls" class="space-y-2 hidden">
                      <div class="grid grid-cols-2 gap-2">
                        <div>
                          <label class="block text-gray-400 text-xs">Min Weight</label>
                          <input type="number" id="dataset-min-weight" value="1" min="-10" max="10" step="0.1" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-purple-400">
                        </div>
                        <div>
                          <label class="block text-gray-400 text-xs">Max Weight</label>
                          <input type="number" id="dataset-max-weight" value="5" min="-10" max="10" step="0.1" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-purple-400">
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Connectivity Properties -->
                  <div>
                    <label class="block text-white text-xs font-medium mb-2">Connectivity</label>
                    <div class="flex flex-wrap gap-2">
                      <button class="dataset-property-tag" data-property="strongly-connected" data-excludes="disconnected">
                        <span class="tag-text">Strongly Connected</span>
                      </button>
                      <button class="dataset-property-tag" data-property="disconnected" data-excludes="strongly-connected">
                        <span class="tag-text">Disconnected</span>
                      </button>
                    </div>
                    <div id="dataset-component-controls" class="mt-3 hidden">
                      <div class="flex items-center space-x-3">
                        <label class="text-white text-xs">Components:</label>
                        <input type="range" id="dataset-component-count" min="1" max="20" value="2" class="flex-1 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer slider">
                        <input type="number" id="dataset-component-count-value" value="2" min="1" max="20" class="text-white text-xs bg-gray-800 px-2 py-1 rounded border border-gray-600 w-12 text-center focus:outline-none focus:border-purple-400">
                      </div>
                    </div>
                  </div>
                  
                  <!-- Special Graph Types -->
                  <div>
                    <label class="block text-white text-xs font-medium mb-2">Special Types</label>
                    <div class="flex flex-wrap gap-2">
                      <button class="dataset-property-tag" data-property="erdos-renyi">
                        <span class="tag-text">Erdős-Renyi</span>
                      </button>
                      <button class="dataset-property-tag" data-property="flow-network" data-excludes="undirected,tree">
                        <span class="tag-text">Flow Network</span>
                      </button>
                      <button class="dataset-property-tag" data-property="bipartite">
                        <span class="tag-text">Multi-partite</span>
                      </button>
                      <button class="dataset-property-tag" data-property="tree" data-excludes="flow-network,cycles">
                        <span class="tag-text">Tree</span>
                      </button>
                      <button class="dataset-property-tag" data-property="dag" data-excludes="undirected,cycles">
                        <span class="tag-text">DAG</span>
                      </button>
                    </div>
                    
                    <!-- Multi-partite Controls -->
                    <div id="dataset-multipartite-controls" class="mt-3 hidden">
                      <div class="flex items-center space-x-3 mb-3">
                        <label class="text-white text-xs">Parts:</label>
                        <input type="range" id="dataset-partition-count" min="2" max="10" value="2" class="flex-1 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer slider">
                        <input type="number" id="dataset-partition-count-value" value="2" min="2" max="10" class="text-white text-xs bg-gray-800 px-2 py-1 rounded border border-gray-600 w-12 text-center focus:outline-none focus:border-purple-400">
                      </div>
                    </div>
                    
                    <!-- Flow Network Controls -->
                    <div id="dataset-flow-network-controls" class="mt-3 hidden">
                      <div class="grid grid-cols-2 gap-3">
                        <div>
                          <label class="text-white text-xs block mb-1">Sources:</label>
                          <input type="number" id="dataset-source-count" value="1" min="1" max="10" class="w-full text-white text-xs bg-gray-800 px-2 py-1 rounded border border-gray-600 text-center focus:outline-none focus:border-purple-400">
                        </div>
                        <div>
                          <label class="text-white text-xs block mb-1">Sinks:</label>
                          <input type="number" id="dataset-sink-count" value="1" min="1" max="10" class="w-full text-white text-xs bg-gray-800 px-2 py-1 rounded border border-gray-600 text-center focus:outline-none focus:border-purple-400">
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Structure Properties -->
                  <div>
                    <label class="block text-white text-xs font-medium mb-2">Structure</label>
                    <div class="flex flex-wrap gap-2">
                      <button class="dataset-property-tag" data-property="planar">
                        <span class="tag-text">Planar</span>
                      </button>
                      <button class="dataset-property-tag" data-property="cycles" data-excludes="tree,dag">
                        <span class="tag-text">Has Cycles</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <button id="export-dataset" class="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium">
                  Generate & Export Dataset (.pt)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
}; 