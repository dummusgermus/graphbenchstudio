var Xe=Object.defineProperty;var Ze=(m,e,n)=>e in m?Xe(m,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):m[e]=n;var ie=(m,e,n)=>Ze(m,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const Je=()=>`
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
`;let q=new Set;const Oe={"strongly-connected":["disconnected"],disconnected:["strongly-connected"],directed:["undirected"],undirected:["directed"],weighted:["unweighted"],unweighted:["weighted"],"flow-network":["tree","undirected"],tree:["flow-network","cycles"],dag:["cycles","undirected"],cycles:["tree","dag"],bipartite:["undirected"]};let Re=!1;const We=()=>{q.clear(),q.add("undirected"),q.add("unweighted")},Be=()=>{const m=[["directed","undirected"],["weighted","unweighted"]];document.querySelectorAll(".graph-tag").forEach(a=>{const i=a,l=i.dataset.property,p=m.find(g=>g.includes(l));let c=!1;p||(c=Array.from(q).some(g=>{var d;return(d=Oe[g])==null?void 0:d.includes(l)})),q.has(l)?(i.classList.add("active"),i.classList.remove("disabled")):c?(i.classList.remove("active"),i.classList.add("disabled")):i.classList.remove("active","disabled")});const n=document.getElementById("component-controls");n&&(q.has("disconnected")?(n.classList.remove("hidden"),ze()):n.classList.add("hidden"));const t=document.getElementById("weight-controls");t&&(q.has("weighted")?t.classList.remove("hidden"):t.classList.add("hidden"));const s=document.getElementById("multipartite-controls");if(s)if(q.has("bipartite")){s.classList.remove("hidden"),Fe();const a=document.getElementById("partition-count-value"),i=parseInt((a==null?void 0:a.value)||"2");console.log("Bipartite activated - regenerating ratio inputs for count:",i),pe(i)}else s.classList.add("hidden");const o=document.getElementById("flow-network-controls");o&&(q.has("flow-network")?o.classList.remove("hidden"):o.classList.add("hidden"));const r=document.getElementById("erdos-renyi-controls");r&&(q.has("erdos-renyi")?r.classList.remove("hidden"):r.classList.add("hidden"))},Qe=m=>{const e=[["directed","undirected"],["weighted","unweighted"]],n=e.find(t=>t.includes(m));if(q.has(m)){if(n)return;q.delete(m)}else q.add(m),(Oe[m]||[]).forEach(s=>{q.delete(s);const o=e.find(r=>r.includes(s));if(o){const r=o.find(a=>a!==s);r&&q.add(r)}});Be()},ze=()=>{const m=document.getElementById("node-count"),e=document.getElementById("component-count"),n=document.getElementById("component-count-value"),s=parseInt((m==null?void 0:m.value)||"20",10);if(e&&n){const o=parseInt(n.value);if(e.min="1",e.max=s.toString(),n.min="1",n.max=s.toString(),o>s){const r=s.toString();e.value=r,n.value=r,console.log(`Component count adjusted from ${o} to ${r} (max: ${s})`)}else(o<1||isNaN(o))&&(e.value="2",n.value="2",console.log("Component count reset to default: 2"))}},Fe=()=>{const m=document.getElementById("node-count"),e=document.getElementById("partition-count"),n=document.getElementById("partition-count-value"),t=parseInt((m==null?void 0:m.value)||"20",10),s=Math.min(t,10);if(e&&n){const o=parseInt(n.value);if(e.min="2",e.max=s.toString(),n.min="2",n.max=s.toString(),o>s){const r=s.toString();e.value=r,n.value=r,console.log(`Partition count adjusted from ${o} to ${r} (max: ${s})`),pe(parseInt(r))}else o<2||isNaN(o)?(e.value="2",n.value="2",console.log("Partition count reset to default: 2"),pe(2)):pe(o)}},pe=m=>{const e=document.getElementById("partition-ratio-inputs");if(!e)return;e.innerHTML="";const n=Math.floor(100/m),t=100-n*m;for(let s=0;s<m;s++){const o=s===0?n+t:n,r=document.createElement("div");r.className="flex items-center space-x-2",r.innerHTML=`
      <label class="text-white text-xs w-12">Part ${s+1}:</label>
      <input type="number" id="partition-ratio-${s}" value="${o}" min="1" max="98" class="flex-1 text-white text-xs bg-gray-800 px-2 py-1 rounded border border-gray-600 text-center focus:outline-none focus:border-blue-400">
      <span class="text-gray-400 text-xs">%</span>
    `,e.appendChild(r);const a=r.querySelector(`#partition-ratio-${s}`);a&&a.addEventListener("input",He)}He()},He=()=>{const m=document.querySelectorAll('[id^="partition-ratio-"]'),e=document.getElementById("ratio-total");let n=0;m.forEach(t=>{const s=parseInt(t.value)||0;n+=s}),e&&(e.textContent=`Total: ${n}%`,n===100?e.className="text-xs text-green-400":n>100?e.className="text-xs text-red-400":e.className="text-xs text-yellow-400")},et=()=>{const m=document.querySelectorAll('[id^="partition-ratio-"]'),e=Array.from(m).map(o=>parseInt(o.value)||0),n=e.reduce((o,r)=>o+r,0);if(n===0)return;const t=e.map(o=>Math.round(o/n*100)),s=t.reduce((o,r)=>o+r,0);if(s!==100){const o=t.indexOf(Math.max(...t));t[o]+=100-s}m.forEach((o,r)=>{o.value=t[r].toString()}),He()},tt=()=>{const m=document.getElementById("partition-count-value"),e=parseInt((m==null?void 0:m.value)||"2"),n=[];for(let t=0;t<e;t++){const s=document.getElementById(`partition-ratio-${t}`);n.push(parseInt((s==null?void 0:s.value)||"0"))}return console.log("getPartitionRatios() called"),console.log("Current partition count:",e),console.log("Total ratio inputs found:",document.querySelectorAll('[id^="partition-ratio-"]').length),console.log("Ratio values for current count:",n),n},st=()=>{if(Re){Be();return}document.addEventListener("click",m=>{const n=m.target.closest(".graph-tag");n&&n.dataset.property&&(console.log("Tag clicked via delegation:",n.dataset.property),m.preventDefault(),m.stopPropagation(),Qe(n.dataset.property))}),Re=!0,Be()},nt=()=>{We(),Be()},ot=m=>{const e=document.getElementById("problem-description");if(!e)return;switch(m){case"maximum-clique":e.innerHTML=`
        <div class="problem-desc">
          <h3 class="text-base font-semibold text-white mb-2">Maximum Clique</h3>
          <p class="text-gray-300 text-xs leading-relaxed">
            Find the largest set of nodes where every two distinct vertices are adjacent.
          </p>
        </div>
      `;break;case"shortest-path":e.innerHTML=`
        <div class="problem-desc">
          <h3 class="text-base font-semibold text-white mb-2">Shortest Path</h3>
          <p class="text-gray-300 text-xs leading-relaxed">
            Find the shortest path between two randomly selected nodes using edge weights.
          </p>
        </div>
      `;break;case"maximum-spanning-tree":e.innerHTML=`
        <div class="problem-desc">
          <h3 class="text-base font-semibold text-white mb-2">Maximum Spanning Tree</h3>
          <p class="text-gray-300 text-xs leading-relaxed">
            Find the spanning tree with maximum total weight that connects all vertices.
          </p>
        </div>
      `;break;case"steiner-tree":e.innerHTML=`
        <div class="problem-desc">
          <h3 class="text-base font-semibold text-white mb-2">Steiner Tree</h3>
          <p class="text-gray-300 text-xs leading-relaxed">
            Find the minimum weight tree that connects a specified set of terminal nodes.
          </p>
        </div>
      `;break;case"max-flow":e.innerHTML=`
        <div class="problem-desc">
          <h3 class="text-base font-semibold text-white mb-2">Maximum Flow</h3>
          <p class="text-gray-300 text-xs leading-relaxed">
            Find the maximum flow from source to sink in a flow network. Requires a flow network graph.
          </p>
        </div>
      `;break;case"multipartite-matching":e.innerHTML=`
        <div class="problem-desc">
          <h3 class="text-base font-semibold text-white mb-2">Multipartite Matching</h3>
          <p class="text-gray-300 text-xs leading-relaxed">
            Find the maximum matching in a multipartite graph where no two edges share a vertex. Requires a multipartite graph.
          </p>
        </div>
      `;break;default:e.innerHTML=`
        <div class="problem-desc">
          <h3 class="text-base font-semibold text-white mb-2">Problem Coming Soon</h3>
          <p class="text-gray-300 text-xs leading-relaxed">
            This problem will be implemented in a future update.
          </p>
        </div>
      `}const n=document.getElementById("steiner-controls");n&&(m==="steiner-tree"?n.classList.remove("hidden"):n.classList.add("hidden"))},rt=m=>{const e=document.getElementById("solve-btn");if(e)switch(m){case"maximum-clique":e.textContent="Find Maximum Clique",e.disabled=!1,e.className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]";break;case"shortest-path":e.textContent="Find Shortest Path",e.disabled=!1,e.className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]";break;case"maximum-spanning-tree":e.textContent="Find Maximum Spanning Tree",e.disabled=!1,e.className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]";break;case"steiner-tree":e.textContent="Find Steiner Tree",e.disabled=!1,e.className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]";break;case"max-flow":e.textContent="Find Maximum Flow",e.disabled=!1,e.className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]";break;case"multipartite-matching":e.textContent="Find Multipartite Matching",e.disabled=!1,e.className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]";break;default:e.textContent="Coming Soon",e.disabled=!0,e.className="w-full bg-gray-600 text-gray-400 py-2 px-3 rounded-lg cursor-not-allowed text-sm font-medium"}};let Ce=!1,Ie={x:0,y:0};const at=()=>{const m=document.getElementById("advanced-config-btn"),e=document.getElementById("advanced-config-window"),n=document.getElementById("close-advanced-config"),t=document.getElementById("cancel-advanced-config"),s=document.getElementById("apply-advanced-config"),o=document.getElementById("window-header");m&&e&&m.addEventListener("click",()=>{const r=m.getBoundingClientRect(),a=320,i=400;let l=r.right+10,p=r.top-80;l+a>window.innerWidth&&(l=r.left-a-10),p+i>window.innerHeight&&(p=window.innerHeight-i-10),l=Math.max(10,l),p=Math.max(10,p),e.style.left=`${l}px`,e.style.top=`${p}px`,e.style.right="auto",e.classList.remove("hidden")}),n&&e&&n.addEventListener("click",()=>{e.classList.add("hidden")}),t&&e&&t.addEventListener("click",()=>{e.classList.add("hidden")}),s&&e&&s.addEventListener("click",()=>{e.classList.add("hidden")}),o&&e&&(o.addEventListener("mousedown",r=>{Ce=!0;const a=e.getBoundingClientRect();Ie.x=r.clientX-a.left,Ie.y=r.clientY-a.top,r.preventDefault(),document.body.style.userSelect="none"}),document.addEventListener("mousemove",r=>{if(!Ce||!e)return;const a=r.clientX-Ie.x,i=r.clientY-Ie.y,l=window.innerWidth-e.offsetWidth,p=window.innerHeight-e.offsetHeight,c=Math.max(0,Math.min(a,l)),g=Math.max(0,Math.min(i,p));e.style.left=`${c}px`,e.style.top=`${g}px`,e.style.right="auto"}),document.addEventListener("mouseup",()=>{Ce&&(Ce=!1,document.body.style.userSelect="")}))},it=(m,e)=>{const n=document.getElementById("problem-select"),t=document.getElementById("node-count"),s=document.getElementById("node-count-value"),o=document.getElementById("edge-probability"),r=document.getElementById("edge-probability-value"),a=document.getElementById("generate-btn"),i=document.getElementById("solve-btn"),l=document.getElementById("reset-config"),p=document.getElementById("component-count"),c=document.getElementById("component-count-value"),g=document.getElementById("partition-count"),d=document.getElementById("partition-count-value");t&&s&&(t.addEventListener("input",()=>{s.value=t.value,ze(),Fe()}),s.addEventListener("input",()=>{let x=parseInt(s.value);const y=parseInt(t.min),S=parseInt(t.max);isNaN(x)&&(x=y),x<y&&(x=y),x>S&&(x=S),s.value=x.toString(),t.value=x.toString(),ze(),Fe()})),o&&r&&(o.addEventListener("input",()=>{r.value=o.value}),r.addEventListener("input",()=>{let x=parseFloat(r.value);const y=parseFloat(o.min),S=parseFloat(o.max);isNaN(x)&&(x=y),x<y&&(x=y),x>S&&(x=S),x=Math.round(x*100)/100,r.value=x.toString(),o.value=x.toString()})),n&&n.addEventListener("change",()=>{const x=n.value;ot(x),rt(x)}),p&&c&&(p.addEventListener("input",()=>{c.value=p.value}),c.addEventListener("input",()=>{let x=parseInt(c.value);const y=parseInt(p.min),S=parseInt(p.max);isNaN(x)&&(x=y),x<y&&(x=y),x>S&&(x=S),c.value=x.toString(),p.value=x.toString()})),g&&d&&(g.addEventListener("input",()=>{d.value=g.value,pe(parseInt(g.value))}),d.addEventListener("input",()=>{let x=parseInt(d.value);const y=parseInt(g.min),S=parseInt(g.max);isNaN(x)&&(x=y),x<y&&(x=y),x>S&&(x=S),d.value=x.toString(),g.value=x.toString(),pe(x)})),l&&l.addEventListener("click",()=>{nt()}),a&&a.addEventListener("click",m),i&&i.addEventListener("click",()=>{const x=n.value;e(x)});const f=document.getElementById("normalize-ratios");f&&f.addEventListener("click",et)};function De(m){return new Promise((e,n)=>{const t=document.createElement("script");t.src=m,t.onload=()=>e(),t.onerror=()=>n(new Error(`Failed to load script: ${m}`)),document.head.appendChild(t)})}async function ct(){try{await De("https://unpkg.com/three@0.158.0/build/three.min.js"),await De("https://unpkg.com/3d-force-graph@1.77.0/dist/3d-force-graph.min.js")}catch(m){throw console.error("Error loading scripts:",m),m}}class Ae{static solve(e){try{if(!e.nodes||e.nodes.length===0)return{success:!1,error:"No graph data available for clique analysis",errorType:"no-data"};const n=this.buildAdjacencyMatrix(e);this.startTime=Date.now(),this.bestCliqueSize=0;const t=this.orderVerticesByDegree(e.nodes.map(i=>i.id),n),s=this.pruneVerticesByDegree(t,n),o=this.bronKerboschOptimized(new Set,new Set(s),new Set,n),r=Array.from(o);return this.validateClique(r,n)?{success:!0,result:{clique:r,isValid:!0}}:{success:!1,error:"Algorithm error: invalid clique detected",errorType:"algorithm-error"}}catch(n){return n instanceof Error&&n.message==="TIMEOUT"?{success:!1,error:"Algorithm timeout - graph too complex for solution within time limit. Try reducing graph size or edge density.",errorType:"algorithm-error"}:{success:!1,error:"Error solving maximum clique problem",errorType:"algorithm-error"}}}static pruneVerticesByDegree(e,n){return e.length===0?e:e.filter(t=>{var o;return(((o=n.get(t))==null?void 0:o.size)||0)+1>=this.bestCliqueSize})}static orderVerticesByDegree(e,n){return e.sort((t,s)=>{var a,i;const o=((a=n.get(t))==null?void 0:a.size)||0;return(((i=n.get(s))==null?void 0:i.size)||0)-o})}static buildAdjacencyMatrix(e){const n=new Map;return e.nodes.forEach(t=>{n.set(t.id,new Set)}),e.links.forEach(t=>{var r,a;const s=t.source,o=t.target;(r=n.get(s))==null||r.add(o),(a=n.get(o))==null||a.add(s)}),n}static bronKerboschOptimized(e,n,t,s){if(Date.now()-this.startTime>this.MAX_RUNTIME_MS)throw new Error("TIMEOUT");if(n.size===0&&t.size===0)return e.size>this.bestCliqueSize&&(this.bestCliqueSize=e.size),new Set(e);let o=new Set(e);if(e.size+n.size<=this.bestCliqueSize)return o;const r=this.choosePivot(n,t,s),a=s.get(r)||new Set,i=Array.from(n).filter(l=>!a.has(l));i.sort((l,p)=>{var d,f;const c=((d=s.get(l))==null?void 0:d.size)||0;return(((f=s.get(p))==null?void 0:f.size)||0)-c});for(const l of i){const p=s.get(l)||new Set,c=e.size+1,g=this.intersectSets(n,p);if(c+g.size<=this.bestCliqueSize){n.delete(l),t.add(l);continue}const d=new Set(e);d.add(l);const f=this.intersectSets(t,p),x=this.bronKerboschOptimized(d,g,f,s);x.size>o.size&&(o=x,this.bestCliqueSize=Math.max(this.bestCliqueSize,x.size)),n.delete(l),t.add(l)}return o}static choosePivot(e,n,t){const s=new Set([...e,...n]);let o="",r=-1;for(const a of s){const i=t.get(a)||new Set,l=Array.from(e).filter(p=>i.has(p)).length;l>r&&(r=l,o=a)}return o||(e.size>0?Array.from(e)[0]:Array.from(n)[0])}static intersectSets(e,n){const t=new Set,s=e.size<=n.size?e:n,o=e.size<=n.size?n:e;for(const r of s)o.has(r)&&t.add(r);return t}static validateClique(e,n){for(let t=0;t<e.length;t++)for(let s=t+1;s<e.length;s++)if(!(n.get(e[t])||new Set).has(e[s]))return!1;return!0}}ie(Ae,"MAX_RUNTIME_MS",3e4),ie(Ae,"startTime",0),ie(Ae,"bestCliqueSize",0);class dt{static solve(e,n){try{if(!e.nodes||e.nodes.length===0)return{success:!1,error:"No graph data available",errorType:"no-data"};if(e.nodes.length<2)return{success:!1,error:"Need at least 2 nodes for shortest path",errorType:"invalid-input"};const{startNode:t,endNode:s}=this.selectRandomNodes(e.nodes),o=this.buildAdjacencyList(e,n);if(!this.hasPath(t.id,s.id,o))return{success:!1,error:`No path exists: ${t.id} and ${s.id} are in disconnected components`,errorType:"disconnected"};const r=this.bellmanFord(t.id,s.id,e.nodes,o);return r.success?{success:!0,result:{path:r.result.path,distance:r.result.distance,startNode:t.id,endNode:s.id}}:{success:!1,error:r.error,errorType:r.errorType}}catch{return{success:!1,error:"Error solving shortest path problem",errorType:"algorithm-error"}}}static selectRandomNodes(e){const n=e[Math.floor(Math.random()*e.length)];let t=e[Math.floor(Math.random()*e.length)];for(;n.id===t.id&&e.length>1;)t=e[Math.floor(Math.random()*e.length)];return{startNode:n,endNode:t}}static buildAdjacencyList(e,n){const t=new Map;return e.nodes.forEach(s=>{t.set(s.id,[])}),e.links.forEach(s=>{var i,l;const o=s.source,r=s.target,a=n.useWeights?s.weight:1;(i=t.get(o))==null||i.push({node:r,weight:a}),n.isDirected||(l=t.get(r))==null||l.push({node:o,weight:a})}),t}static hasPath(e,n,t){if(e===n)return!0;const s=new Set,o=[e];s.add(e);let r=0;for(;o.length>0&&r<100;){r++;const a=o.shift(),i=t.get(a)||[];for(const l of i){if(l.node===n)return!0;s.has(l.node)||(s.add(l.node),o.push(l.node))}}return!1}static bellmanFord(e,n,t,s){const o=new Map,r=new Map;t.forEach(p=>{const g=p.id===e?0:1/0;o.set(p.id,g),r.set(p.id,null)});for(let p=0;p<t.length-1;p++){let c=!1;for(const[g,d]of s){const f=o.get(g),x=f!==void 0?f:1/0;if(x!==1/0)for(const y of d){const S=x+y.weight,E=o.get(y.node);S<(E!==void 0?E:1/0)&&(o.set(y.node,S),r.set(y.node,g),c=!0)}}if(!c)break}for(const[p,c]of s){const g=o.get(p),d=g!==void 0?g:1/0;if(d!==1/0)for(const f of c){const x=d+f.weight,y=o.get(f.node);if(x<(y!==void 0?y:1/0))return{success:!1,error:"Graph contains negative cycle - shortest path undefined",errorType:"negative-cycle"}}}const a=o.get(n)||1/0;if(a===1/0)return{success:!1,error:"No path found: algorithm failed to reach target node",errorType:"algorithm-error"};const i=[];let l=n;for(;l!==null;)i.unshift(l),l=r.get(l)||null;return{success:!0,result:{path:i,distance:a}}}}class lt{static solve(e){try{if(!e.nodes||e.nodes.length===0)return{success:!1,error:"No graph data available for spanning tree analysis",errorType:"no-data"};if(e.nodes.length===1)return{success:!0,result:{edges:[],totalWeight:0,isValid:!0}};const n=this.convertToUndirectedEdges(e.links);if(n.length===0)return{success:!1,error:"No edges available for spanning tree construction",errorType:"no-data"};const t=this.kruskalMaximum(e.nodes.map(a=>a.id),n),s=e.nodes.length-1;if(t.length<s)return{success:!1,error:"Graph is disconnected - cannot form spanning tree",errorType:"disconnected"};const o=t.reduce((a,i)=>a+i.weight,0);return this.validateSpanningTree(e.nodes.map(a=>a.id),t)?{success:!0,result:{edges:t,totalWeight:Math.round(o*100)/100,isValid:!0}}:{success:!1,error:"Algorithm error: invalid spanning tree detected",errorType:"algorithm-error"}}catch{return{success:!1,error:"Error solving maximum spanning tree problem",errorType:"algorithm-error"}}}static convertToUndirectedEdges(e){const n=new Map;return e.forEach(t=>{const s=t.source,o=t.target,r=s<o?`${s}-${o}`:`${o}-${s}`;(!n.has(r)||n.get(r).weight<t.weight)&&n.set(r,{source:s<o?s:o,target:s<o?o:s,weight:t.weight,isDirected:!1})}),Array.from(n.values())}static kruskalMaximum(e,n){const t=[...n].sort((a,i)=>i.weight-a.weight),s=new Map,o=new Map;e.forEach(a=>{s.set(a,a),o.set(a,0)});const r=[];for(const a of t){const i=this.find(s,a.source),l=this.find(s,a.target);if(i!==l&&(r.push(a),this.union(s,o,i,l),r.length===e.length-1))break}return r}static find(e,n){return e.get(n)!==n&&e.set(n,this.find(e,e.get(n))),e.get(n)}static union(e,n,t,s){const o=n.get(t)||0,r=n.get(s)||0;o<r?e.set(t,s):o>r?e.set(s,t):(e.set(s,t),n.set(t,o+1))}static validateSpanningTree(e,n){if(n.length!==e.length-1)return!1;const t=new Map;e.forEach(o=>t.set(o,o)),n.forEach(o=>{const r=this.find(t,o.source),a=this.find(t,o.target);r!==a&&t.set(r,a)});const s=this.find(t,e[0]);return e.every(o=>this.find(t,o)===s)}}class ut{static solve(e,n,t=5){try{if(!e.nodes||e.nodes.length===0)return{success:!1,error:"No graph data available for Steiner tree analysis",errorType:"no-data"};if(t<2)return{success:!1,error:"Need at least 2 terminal nodes for Steiner tree",errorType:"invalid-input"};if(t>e.nodes.length)return{success:!1,error:`Cannot select ${t} terminals from ${e.nodes.length} nodes`,errorType:"invalid-input"};const s=this.selectRandomTerminals(e.nodes,t),o=this.buildAdjacencyList(e,n),r=this.checkTerminalConnectivity(s,o);if(!r.success)return{success:!1,error:r.error,errorType:"disconnected"};const a=this.findSteinerTree(s,e,o,n);return a.success?{success:!0,result:a.result}:{success:!1,error:a.error,errorType:a.errorType}}catch{return{success:!1,error:"Error solving Steiner tree problem",errorType:"algorithm-error"}}}static selectRandomTerminals(e,n){return[...e].sort(()=>Math.random()-.5).slice(0,n).map(s=>s.id)}static buildAdjacencyList(e,n){const t=new Map;return e.nodes.forEach(s=>{t.set(s.id,[])}),e.links.forEach(s=>{var i,l;const o=s.source,r=s.target,a=n.useWeights?s.weight:1;(i=t.get(o))==null||i.push({node:r,weight:a}),(l=t.get(r))==null||l.push({node:o,weight:a})}),t}static checkTerminalConnectivity(e,n){if(e.length<2)return{success:!0};const t=e[0],s=this.getReachableNodes(t,n);for(let o=1;o<e.length;o++)if(!s.has(e[o]))return{success:!1,error:`Terminal nodes are disconnected: ${t} cannot reach ${e[o]}`,errorType:"disconnected"};return{success:!0}}static getReachableNodes(e,n){const t=new Set,s=[e];for(t.add(e);s.length>0;){const o=s.shift(),r=n.get(o)||[];for(const a of r)t.has(a.node)||(t.add(a.node),s.push(a.node))}return t}static findSteinerTree(e,n,t,s){try{const o=this.computeTerminalDistances(e,t),r=this.findTerminalMST(e,o),a=new Map;for(const d of r){const f=this.robustPathfinding(d.source,d.target,t);if(f.success&&f.result)a.set(`${d.source}-${d.target}`,f.result.edges);else return{success:!1,error:f.error||"Failed to compute path between terminals",errorType:f.errorType||"algorithm-error"}}const i=new Map;for(const d of a.values())for(const f of d){const x=this.getEdgeKey(f.source,f.target);i.has(x)||i.set(x,f)}const l=this.findMSTFromEdges(Array.from(i.values()),e),p=l.reduce((d,f)=>d+f.weight,0),c=new Set;l.forEach(d=>{c.add(d.source),c.add(d.target)});const g=Array.from(c).filter(d=>!e.includes(d));return{success:!0,result:{edges:l,totalWeight:Math.round(p*100)/100,terminalNodes:e,steinerNodes:g,isValid:this.validateSteinerTree(l,e)}}}catch{return{success:!1,error:"Error computing Steiner tree",errorType:"algorithm-error"}}}static computeTerminalDistances(e,n){const t=new Map;for(let s=0;s<e.length;s++)for(let o=s+1;o<e.length;o++){const r=e[s],a=e[o],i=this.robustPathfinding(r,a,n);if(i.success&&i.result){const l=`${r}-${a}`;t.set(l,i.result.distance)}}return t}static findTerminalMST(e,n){const t=[];for(let r=0;r<e.length;r++)for(let a=r+1;a<e.length;a++){const i=e[r],l=e[a],p=`${i}-${l}`,c=n.get(p);c!==void 0&&t.push({source:i,target:l,weight:c,isDirected:!1})}t.sort((r,a)=>r.weight-a.weight);const s=new Map;e.forEach(r=>s.set(r,r));const o=[];for(const r of t){const a=this.find(s,r.source),i=this.find(s,r.target);if(a!==i&&(o.push(r),s.set(a,i),o.length===e.length-1))break}return o}static robustPathfinding(e,n,t){if(!t.has(e)||!t.has(n))return{success:!1,error:`Node not found: ${e} or ${n}`,errorType:"invalid-input"};const s=t.size,o=[{node:e,path:[e],totalWeight:0,visited:new Set([e])}];let r=null,a=0;const i=1e3;for(;o.length>0&&a<i;){const p=o.shift();if(a++,p.node===n){(!r||p.totalWeight<r.weight)&&(r={path:[...p.path],weight:p.totalWeight});continue}if(p.path.length>=s)continue;const c=t.get(p.node)||[];for(const g of c)if(!p.visited.has(g.node)){const d=new Set(p.visited);d.add(g.node),o.push({node:g.node,path:[...p.path,g.node],totalWeight:p.totalWeight+g.weight,visited:d})}}if(!r)return{success:!1,error:`No path found from ${e} to ${n}`,errorType:"disconnected"};const l=[];for(let p=0;p<r.path.length-1;p++){const c=r.path[p],g=r.path[p+1],f=(t.get(c)||[]).find(x=>x.node===g);f&&l.push({source:c,target:g,weight:f.weight,isDirected:!1})}return{success:!0,result:{distance:r.weight,edges:l}}}static findMSTFromEdges(e,n){const t=new Set;e.forEach(a=>{t.add(a.source),t.add(a.target)});const s=[...e].sort((a,i)=>a.weight-i.weight),o=new Map;t.forEach(a=>o.set(a,a));const r=[];for(const a of s){const i=this.find(o,a.source),l=this.find(o,a.target);if(i!==l&&(r.push(a),o.set(i,l),r.length>=t.size-1))break}return r}static areNodesConnected(e,n){if(e.length<=1)return!0;const t=new Map;n.forEach(r=>{t.has(r.source)||t.set(r.source,[]),t.has(r.target)||t.set(r.target,[]),t.get(r.source).push(r.target),t.get(r.target).push(r.source)});const s=new Set,o=[e[0]];for(s.add(e[0]);o.length>0;){const r=o.shift(),a=t.get(r)||[];for(const i of a)s.has(i)||(s.add(i),o.push(i))}return e.every(r=>s.has(r))}static find(e,n){return e.get(n)!==n&&e.set(n,this.find(e,e.get(n))),e.get(n)}static getEdgeKey(e,n){return e<n?`${e}-${n}`:`${n}-${e}`}static validateSteinerTree(e,n){return this.areNodesConnected(n,e)}}class ue{static isFlowNetwork(e){var o;if(!((o=e.specialAttributes)!=null&&o.isFlowNetwork))return!1;const n=e.specialAttributes.sourceNode,t=e.specialAttributes.sinkNode;if(!n||!t||n===t)return!1;const s=new Set(e.nodes.map(r=>r.id));return s.has(n)&&s.has(t)}static isStronglyConnected(e){return e.nodes.length<=1?!0:e.links.some(t=>t.isDirected)?this.isStronglyConnectedDirected(e):this.isConnected(e)}static isConnected(e){if(e.nodes.length<=1)return!0;const n=this.buildAdjacencyList(e),t=new Set,s=e.nodes[0].id;return this.dfs(s,n,t),t.size===e.nodes.length}static isBipartite(e){const n=this.buildAdjacencyList(e),t=new Map;for(const s of e.nodes)if(!t.has(s.id)&&!this.bipartiteColorDFS(s.id,0,n,t))return!1;return!0}static isTree(e){const n=e.nodes.length;return e.links.length===n-1&&this.isConnected(e)}static isDAG(e){const n=this.buildDirectedAdjacencyList(e),t=new Set,s=new Set;for(const o of e.nodes)if(!t.has(o.id)&&this.hasCycleDFS(o.id,n,t,s))return!1;return!0}static generateFlowNetwork(e,n,t,s,o,r=1,a=1){if(e<r+a)throw new Error(`Flow network needs at least ${r+a} nodes (${r} sources + ${a} sinks)`);const i=Array.from({length:e},(y,S)=>({id:`node${S}`,val:.7+Math.random()*.6})),l=[],p=[];for(let y=0;y<r;y++)i[y].isSource=!0,l.push(`node${y}`);for(let y=e-a;y<e;y++)i[y].isSink=!0,p.push(`node${y}`);const c=[],g=()=>{const y=t?s+Math.random()*(o-s):1;return Math.round(y*10)/10};if(e-r-a===0)l.forEach(y=>{p.forEach(S=>{const E=g();c.push({source:y,target:S,weight:E,capacity:E,isDirected:!0})})});else{const y=[];for(let $=r;$<e-a;$++)y.push($);if(l.forEach(($,I)=>{const A=y[I%y.length],T=g();c.push({source:$,target:`node${A}`,weight:T,capacity:T,isDirected:!0})}),p.forEach(($,I)=>{const A=y[I%y.length],T=g();c.push({source:`node${A}`,target:$,weight:T,capacity:T,isDirected:!0})}),y.length>1)for(let $=0;$<y.length-1;$++){const I=g();c.push({source:`node${y[$]}`,target:`node${y[$+1]}`,weight:I,capacity:I,isDirected:!0})}l.forEach($=>{y.forEach(I=>{if(Math.random()<n*.6&&!c.some(T=>T.source===$&&T.target===`node${I}`)){const T=g();c.push({source:$,target:`node${I}`,weight:T,capacity:T,isDirected:!0})}})}),p.forEach($=>{y.forEach(I=>{if(Math.random()<n*.6&&!c.some(T=>T.source===`node${I}`&&T.target===$)){const T=g();c.push({source:`node${I}`,target:$,weight:T,capacity:T,isDirected:!0})}})});for(let $=0;$<y.length;$++)for(let I=$+1;I<y.length;I++)if(Math.random()<n*.4){const A=g();c.push({source:`node${y[$]}`,target:`node${y[I]}`,weight:A,capacity:A,isDirected:!0})}const S=new Map,E=new Map;i.forEach($=>{S.set($.id,0),E.set($.id,0)}),c.forEach($=>{E.set($.source,(E.get($.source)||0)+1),S.set($.target,(S.get($.target)||0)+1)}),y.forEach($=>{const I=`node${$}`,A=S.get(I)||0,T=E.get(I)||0;if(A===0){const L=l[Math.floor(Math.random()*l.length)],N=g();c.push({source:L,target:I,weight:N,capacity:N,isDirected:!0})}if(T===0){const L=p[Math.floor(Math.random()*p.length)],N=g();c.push({source:I,target:L,weight:N,capacity:N,isDirected:!0})}})}const f=l[0],x=p[0];return{nodes:i,links:c,specialAttributes:{isFlowNetwork:!0,sourceNode:f,sinkNode:x,sourceNodes:l,sinkNodes:p,sourceCount:r,sinkCount:a,isStronglyConnected:!1,isBipartite:!1,isMultipartite:!1,isPlanar:!1,isTree:!1,isDAG:!0}}}static generateStronglyConnected(e,n,t,s,o,r=!0){if(e<2)throw new Error("Strongly connected graph needs at least 2 nodes");const a=Array.from({length:e},(l,p)=>({id:`node${p}`,val:.7+Math.random()*.6})),i=[];for(let l=0;l<e;l++){const p=t?s+Math.random()*(o-s):1;i.push({source:`node${l}`,target:`node${(l+1)%e}`,weight:Math.round(p*10)/10,isDirected:r})}for(let l=0;l<e;l++)for(let p=r?0:l+1;p<e;p++)if(l!==p&&(l+1)%e!==p&&Math.random()<n){const c=t?s+Math.random()*(o-s):1;i.push({source:`node${l}`,target:`node${p}`,weight:Math.round(c*10)/10,isDirected:r})}return{nodes:a,links:i,specialAttributes:{isFlowNetwork:!1,isStronglyConnected:!0,isBipartite:!1,isMultipartite:!1,isPlanar:!1,isTree:!1,isDAG:!r||this.isDAG({nodes:a,links:i})}}}static generateMultipartiteGraph(e,n,t,s,o,r,a=!1,i){if(e<n)throw new Error("Multi-partite graph needs at least one node per partition");if(n<2)throw new Error("Multi-partite graph needs at least 2 partitions");console.log("=== MULTIPARTITE GRAPH GENERATION ==="),console.log("Node count:",e),console.log("Partition count:",n),console.log("Partition ratios received:",i);const l=Array.from({length:n},()=>[]);if(i&&i.length===n){console.log("Using custom partition ratios:",i);const d=i.map(E=>E/100),f=d.reduce((E,$)=>E+$,0);console.log("Normalized ratios:",d),console.log("Ratio sum:",f),Math.abs(f-1)>.01&&(d.forEach((E,$)=>{d[$]=E/f}),console.log("Re-normalized ratios:",d));let x=0;const y=d.map((E,$)=>{if($===n-1)return e-x;{const I=Math.round(e*E);return x+=I,I}});console.log("Target counts for each partition:",y);let S=0;for(let E=0;E<n;E++){const $=y[E];for(let I=0;I<$&&S<e;I++)l[E].push(S),S++}console.log(`Distributed nodes by ratios: ${i.join(":")} -> ${l.map(E=>E.length).join(":")}`)}else{console.log("Using default round-robin distribution - no custom ratios provided or invalid ratios");for(let d=0;d<e;d++)l[d%n].push(d);console.log(`Default distribution result: ${l.map(d=>d.length).join(":")}`)}const p=Array.from({length:e},(d,f)=>({id:`node${f}`,val:.7+Math.random()*.6,partition:0}));for(let d=0;d<n;d++)for(const f of l[d])p[f].partition=d;const c=[];for(let d=0;d<n;d++)for(let f=d+1;f<n;f++)for(const x of l[d])for(const y of l[f])if(Math.random()<t){const S=s?o+Math.random()*(r-o):1;c.push({source:`node${x}`,target:`node${y}`,weight:Math.round(S*10)/10,isDirected:!1})}for(let d=0;d<n;d++)for(let f=d+1;f<n;f++)if(l[d].length>0&&l[f].length>0&&!c.some(y=>{const S=parseInt(y.source.replace("node",""))%n,E=parseInt(y.target.replace("node",""))%n;return S===d&&E===f||S===f&&E===d})){const y=l[d][Math.floor(Math.random()*l[d].length)],S=l[f][Math.floor(Math.random()*l[f].length)],E=s?o+Math.random()*(r-o):1;c.push({source:`node${y}`,target:`node${S}`,weight:Math.round(E*10)/10,isDirected:!1})}console.log(`Generated ${n}-partite graph with partitions:`,l.map((d,f)=>`Part ${f}: ${d.length} nodes`));const g=c.filter(d=>{const f=parseInt(d.source.replace("node","")),x=parseInt(d.target.replace("node",""));let y=-1,S=-1;for(let E=0;E<n;E++)l[E].includes(f)&&(y=E),l[E].includes(x)&&(S=E);return y===S});if(g.length>0)throw console.error("ERROR: Found intra-partition edges in multipartite graph!",g),new Error(`Multipartite graph contains ${g.length} invalid intra-partition edges`);if(console.log("✓ Multipartite graph validation passed - no intra-partition edges found"),a){console.log("Adding strong connectivity while respecting multipartite constraints...");const d=l.map(f=>f.length);console.log("Partition sizes for strong connectivity:",d);for(let f=0;f<n;f++)for(let x=f+1;x<n;x++){const y=l[f],S=l[x];if(y.length===0||S.length===0)continue;const E=y.length<=S.length?y:S,$=y.length>S.length?y:S;E.forEach((I,A)=>{const T=Math.min(2,$.length);for(let L=0;L<T;L++){const N=(A*T+L)%$.length,F=$[N];if(!c.some(U=>U.source===`node${I}`&&U.target===`node${F}`||U.source===`node${F}`&&U.target===`node${I}`)){const U=s?o+Math.random()*(r-o):1;c.push({source:`node${I}`,target:`node${F}`,weight:Math.round(U*10)/10,isDirected:!0})}}}),$.forEach((I,A)=>{const T=A%E.length,L=E[T];if(!c.some(F=>F.source===`node${I}`&&F.target===`node${L}`||F.source===`node${L}`&&F.target===`node${I}`)){const F=s?o+Math.random()*(r-o):1;c.push({source:`node${I}`,target:`node${L}`,weight:Math.round(F*10)/10,isDirected:!0})}})}console.log(`Added strongly connected edges to multipartite graph (${c.length} total edges)`),console.log("All edges respect multipartite constraints - no intra-partition connections")}return{nodes:p,links:c,specialAttributes:{isFlowNetwork:!1,isStronglyConnected:a,isBipartite:n===2,isMultipartite:!0,isPlanar:!1,isTree:!1,isDAG:!1,partitionCount:n,partitions:l}}}static generateErdosRenyi(e,n,t,s,o,r=!1,a=1){if(e<1)throw new Error("Erdős-Renyi graph needs at least 1 node");const i=Array.from({length:e},(d,f)=>({id:`node${f}`,val:.7+Math.random()*.6})),l=[];for(let d=0;d<e;d++)for(let f=r?0:d+1;f<e;f++)if(d!==f&&Math.random()<n){const x=t?s+Math.random()*(o-s):1;l.push({source:`node${d}`,target:`node${f}`,weight:Math.round(x*10)/10,isDirected:r})}const p=new Set,c=[],g=d=>{const f=[],x=[d];for(p.add(d);x.length>0;){const y=x.shift();f.push(y);const S=new Set;l.forEach(E=>{E.source===y&&S.add(E.target),!r&&E.target===y&&S.add(E.source)}),S.forEach(E=>{p.has(E)||(p.add(E),x.push(E))})}return f};for(const d of i)if(!p.has(d.id)){const f=g(d.id);c.push(f)}if(console.log(`Erdős-Renyi: Found ${c.length} connected components`),c.length>=2){for(let d=0;d<c.length;d++)for(let f=0;f<a;f++){const x=Array.from({length:c.length},(I,A)=>A).filter(I=>I!==d),y=x[Math.floor(Math.random()*x.length)],S=c[d][Math.floor(Math.random()*c[d].length)],E=c[y][Math.floor(Math.random()*c[y].length)],$=t?s+Math.random()*(o-s):1;l.push({source:S,target:E,weight:Math.round($*10)/10,isDirected:r})}console.log(`Erdős-Renyi: Added ${c.length*a} inter-component connections`)}return{nodes:i,links:l,specialAttributes:{isFlowNetwork:!1,isStronglyConnected:!1,isBipartite:!1,isMultipartite:!1,isPlanar:!1,isTree:!1,isDAG:r&&this.isDAG({nodes:i,links:l}),isErdosRenyi:!0}}}static buildAdjacencyList(e){const n=new Map;return e.nodes.forEach(t=>{n.set(t.id,[])}),e.links.forEach(t=>{var s,o;(s=n.get(t.source))==null||s.push(t.target),t.isDirected||(o=n.get(t.target))==null||o.push(t.source)}),n}static buildDirectedAdjacencyList(e){const n=new Map;return e.nodes.forEach(t=>{n.set(t.id,[])}),e.links.forEach(t=>{var s,o,r;t.isDirected?(s=n.get(t.source))==null||s.push(t.target):((o=n.get(t.source))==null||o.push(t.target),(r=n.get(t.target))==null||r.push(t.source))}),n}static dfs(e,n,t){t.add(e);const s=n.get(e)||[];for(const o of s)t.has(o)||this.dfs(o,n,t)}static isStronglyConnectedDirected(e){const n=this.buildDirectedAdjacencyList(e),t=new Set,s=e.nodes[0].id;if(this.dfs(s,n,t),t.size!==e.nodes.length)return!1;const o=new Map;e.nodes.forEach(a=>{o.set(a.id,[])}),e.links.forEach(a=>{var i,l,p;a.isDirected?(i=o.get(a.target))==null||i.push(a.source):((l=o.get(a.target))==null||l.push(a.source),(p=o.get(a.source))==null||p.push(a.target))});const r=new Set;return this.dfs(s,o,r),r.size===e.nodes.length}static bipartiteColorDFS(e,n,t,s){s.set(e,n);const o=t.get(e)||[];for(const r of o)if(s.has(r)){if(s.get(r)===n)return!1}else if(!this.bipartiteColorDFS(r,1-n,t,s))return!1;return!0}static hasCycleDFS(e,n,t,s){t.add(e),s.add(e);const o=n.get(e)||[];for(const r of o)if(t.has(r)){if(s.has(r))return!0}else if(this.hasCycleDFS(r,n,t,s))return!0;return s.delete(e),!1}}class gt{static solve(e,n){try{if(!ue.isFlowNetwork(e))return{success:!1,error:"Graph is not a valid flow network. Please generate a flow network first.",errorType:"invalid-input"};const t=e.specialAttributes;let s,o,r=e;if(t.sourceCount&&t.sourceCount>1||t.sinkCount&&t.sinkCount>1){console.log(`Multi-source/sink flow network: ${t.sourceCount} sources, ${t.sinkCount} sinks`);const{modifiedGraph:c,superSource:g,superSink:d}=this.createSuperSourceSink(e);r=c,s=g,o=d}else s=t.sourceNode,o=t.sinkNode;const a=this.buildCapacityMatrix(r),i=this.edmondsKarp(a,s,o,r.nodes.map(c=>c.id)),p=this.findMinCut(i.residualGraph,s,o,a,r.nodes.map(c=>c.id)).filter(c=>!c.source.startsWith("super-")&&!c.target.startsWith("super-"));return{success:!0,result:{maxFlow:i.maxFlow,flowPaths:i.flowPaths,sourceNode:t.sourceNode||s,sinkNode:t.sinkNode||o,minCutEdges:p,finalFlow:i.finalFlow,isValid:!0}}}catch(t){return{success:!1,error:t instanceof Error?t.message:"Unknown error in max flow algorithm",errorType:"algorithm-error"}}}static createSuperSourceSink(e){const n=e.specialAttributes,t=n.sourceNodes||[],s=n.sinkNodes||[],o="super-source",r="super-sink",a=[...e.nodes],i=[...e.links];return a.push({id:o,val:2.5,isSource:!0,isSuperSource:!0}),a.push({id:r,val:2.5,isSink:!0,isSuperSink:!0}),t.forEach(p=>{i.push({source:o,target:p,weight:999999,capacity:999999,isDirected:!0,isSuperEdge:!0})}),s.forEach(p=>{i.push({source:p,target:r,weight:999999,capacity:999999,isDirected:!0,isSuperEdge:!0})}),{modifiedGraph:{nodes:a,links:i,specialAttributes:{...n,superSource:o,superSink:r}},superSource:o,superSink:r}}static edmondsKarp(e,n,t,s){var p,c;let o=0;const r=[],a=new Map;for(const g of s){a.set(g,new Map);for(const d of s){const f=((p=e.get(g))==null?void 0:p.get(d))||0;a.get(g).set(d,f)}}const i=new Map;for(const g of s){i.set(g,new Map);for(const d of s)i.get(g).set(d,0)}let l;for(;(l=this.findAugmentingPathBFS(a,n,t)).flow>0;){const{flow:g,path:d}=l;for(let f=0;f<d.length-1;f++){const x=d[f],y=d[f+1],S=a.get(x).get(y);a.get(x).set(y,S-g);const E=a.get(y).get(x);if(a.get(y).set(x,E+g),((c=e.get(x))==null?void 0:c.get(y))>0){const $=i.get(x).get(y);i.get(x).set(y,$+g)}else{const $=i.get(y).get(x);i.get(y).set(x,Math.max(0,$-g))}}if(o+=g,r.push({path:[...d],flow:g}),r.length>1e3){console.warn("Max flow: Too many iterations, stopping");break}}return{maxFlow:o,flowPaths:r,residualGraph:a,finalFlow:i}}static findAugmentingPathBFS(e,n,t){const s=new Set,o=new Map,r=[{node:n,minFlow:1/0}];for(s.add(n);r.length>0;){const{node:a,minFlow:i}=r.shift();if(a===t){const p=[];let c=t;for(;c!==n;)p.unshift(c),c=o.get(c);return p.unshift(n),{flow:i,path:p}}const l=e.get(a);for(const[p,c]of l)!s.has(p)&&c>0&&(s.add(p),o.set(p,a),r.push({node:p,minFlow:Math.min(i,c)}))}return{flow:0,path:[]}}static findMinCut(e,n,t,s,o){const r=new Set,a=[n];for(r.add(n);a.length>0;){const l=a.shift(),p=e.get(l);for(const[c,g]of p)!r.has(c)&&g>0&&(r.add(c),a.push(c))}const i=[];for(const l of o)if(r.has(l)){const p=s.get(l);for(const[c,g]of p)!r.has(c)&&g>0&&i.push({source:l,target:c,capacity:g})}return i}static buildCapacityMatrix(e){const n=new Map;for(const t of e.nodes){n.set(t.id,new Map);for(const s of e.nodes)n.get(t.id).set(s.id,0)}for(const t of e.links){const s=t.capacity||t.weight||1;n.get(t.source).set(t.target,s)}return n}}class he{static highlightMaximumClique(e,n,t){const{clique:s}=n;e.linkColor(o=>{const r=typeof o.source=="object"?o.source.id:o.source,a=typeof o.target=="object"?o.target.id:o.target;return s.includes(r)&&s.includes(a)?"#00f5ff":t.useWeights&&o.weight<0?"#ef4444":"#6c63ff"}).linkWidth(o=>{const r=typeof o.source=="object"?o.source.id:o.source,a=typeof o.target=="object"?o.target.id:o.target;return s.includes(r)&&s.includes(a)?.8:t.useWeights?this.getWeightBasedWidth(o.weight,t):.2}),e.nodeThreeObject(o=>{const r=s.includes(o.id);return this.createNodeWithGlow(o,{color:r?"#00f5ff":"#9d4edd",glowColor:r?"#80ffff":"#bf7af0",glowSize:r?2:1.5,glowOpacity:r?.6:.3})})}static highlightShortestPath(e,n,t){const{path:s,startNode:o,endNode:r}=n;e.linkColor(a=>{const i=typeof a.source=="object"?a.source.id:a.source,l=typeof a.target=="object"?a.target.id:a.target;return s.some((c,g)=>{if(g===s.length-1)return!1;const d=s[g+1];return i===c&&l===d||!t.isDirected&&i===d&&l===c})?"#fbbf24":t.useWeights&&a.weight<0?"#ef4444":"#6c63ff"}).linkWidth(a=>{const i=typeof a.source=="object"?a.source.id:a.source,l=typeof a.target=="object"?a.target.id:a.target;return s.some((c,g)=>{if(g===s.length-1)return!1;const d=s[g+1];return i===c&&l===d||!t.isDirected&&i===d&&l===c})?.8:t.useWeights?this.getWeightBasedWidth(a.weight,t):.2}),e.nodeThreeObject(a=>{const i=a.id===o,l=a.id===r,p=s.includes(a.id);let c={color:"#9d4edd",glowColor:"#bf7af0",glowOpacity:.3,glowSize:1.5};return i?c={color:"#10b981",glowColor:"#6ee7b7",glowOpacity:.6,glowSize:2}:l?c={color:"#ef4444",glowColor:"#fca5a5",glowOpacity:.6,glowSize:2}:p&&(c={color:"#fbbf24",glowColor:"#fde68a",glowOpacity:.5,glowSize:1.8}),this.createNodeWithGlow(a,c)})}static highlightMaximumSpanningTree(e,n,t){const{edges:s}=n,o=new Set;s.forEach(a=>{const i=a.source,l=a.target;o.add(`${i}-${l}`),o.add(`${l}-${i}`)}),e.linkColor(a=>{const i=typeof a.source=="object"?a.source.id:a.source,l=typeof a.target=="object"?a.target.id:a.target,p=`${i}-${l}`,c=`${l}-${i}`;return o.has(p)||o.has(c)?"#10b981":t.useWeights&&a.weight<0?"#ef4444":"#6c63ff"}).linkWidth(a=>{const i=typeof a.source=="object"?a.source.id:a.source,l=typeof a.target=="object"?a.target.id:a.target,p=`${i}-${l}`,c=`${l}-${i}`;return o.has(p)||o.has(c)?1:t.useWeights?this.getWeightBasedWidth(a.weight,t):.2});const r=new Set;s.forEach(a=>{r.add(a.source),r.add(a.target)}),e.nodeThreeObject(a=>{const i=r.has(a.id);return this.createNodeWithGlow(a,{color:i?"#10b981":"#9d4edd",glowColor:i?"#6ee7b7":"#bf7af0",glowSize:i?2:1.5,glowOpacity:i?.6:.3})})}static highlightSteinerTree(e,n,t){const{edges:s,terminalNodes:o,steinerNodes:r}=n,a=new Set;s.forEach(i=>{const l=i.source,p=i.target;a.add(`${l}-${p}`),a.add(`${p}-${l}`)}),e.linkColor(i=>{const l=typeof i.source=="object"?i.source.id:i.source,p=typeof i.target=="object"?i.target.id:i.target,c=`${l}-${p}`,g=`${p}-${l}`;return a.has(c)||a.has(g)?"#f59e0b":t.useWeights&&i.weight<0?"#ef4444":"#6c63ff"}).linkWidth(i=>{const l=typeof i.source=="object"?i.source.id:i.source,p=typeof i.target=="object"?i.target.id:i.target,c=`${l}-${p}`,g=`${p}-${l}`;return a.has(c)||a.has(g)?1:t.useWeights?this.getWeightBasedWidth(i.weight,t):.2}),e.nodeThreeObject(i=>{const l=o.includes(i.id),p=r.includes(i.id);let c={color:"#9d4edd",glowColor:"#bf7af0",glowOpacity:.3,glowSize:1.5};return l?c={color:"#dc2626",glowColor:"#fca5a5",glowOpacity:.7,glowSize:2.2}:p&&(c={color:"#f59e0b",glowColor:"#fde68a",glowOpacity:.6,glowSize:1.8}),this.createNodeWithGlow(i,c)})}static highlightMultipartiteMatching(e,n,t){const{matching:s}=n,o=new Set;s.forEach(r=>{const a=r.source,i=r.target;o.add(`${a}-${i}`),o.add(`${i}-${a}`)}),console.log("GraphVisualization.highlightMultipartiteMatching called"),console.log("Matching edges:",s),console.log("Matching edge keys:",o),e.linkColor(r=>{const a=typeof r.source=="object"?r.source.id:r.source,i=typeof r.target=="object"?r.target.id:r.target,l=`${a}-${i}`,p=`${i}-${a}`;return o.has(l)||o.has(p)?(console.log(`✓ Highlighting matching edge ${a}-${i}`),"#ff6b35"):t.useWeights&&r.weight<0?"#ef4444":"#6c63ff40"}).linkWidth(r=>{const a=typeof r.source=="object"?r.source.id:r.source,i=typeof r.target=="object"?r.target.id:r.target,l=`${a}-${i}`,p=`${i}-${a}`;return o.has(l)||o.has(p)?1.5:t.useWeights?this.getWeightBasedWidth(r.weight,t)*.3:.08})}static highlightMaxFlow(e,n,t){const{flowPaths:s,minCutEdges:o,finalFlow:r,sourceNode:a,sinkNode:i}=n;console.log("GraphVisualization.highlightMaxFlow called"),console.log("Flow paths:",s),console.log("Min-cut edges:",o),console.log("Final flow:",r);const l=new Set,p=new Set;o.forEach(c=>{l.add(`${c.source}-${c.target}`)});for(const[c,g]of r)for(const[d,f]of g)if(f>0){const x=`${c}-${d}`;p.add(x)}console.log("Flow edge keys:",p),console.log("Min-cut edge keys:",l),e.linkColor(c=>{var I;const g=typeof c.source=="object"?c.source.id:c.source,d=typeof c.target=="object"?c.target.id:c.target,f=`${g}-${d}`,x=l.has(f),y=p.has(f),S=((I=r.get(g))==null?void 0:I.get(d))||0,E=c.capacity||c.weight||1,$=y&&Math.abs(S-E)<.001;return x?(console.log(`✓ Highlighting min-cut edge ${g}-${d} (capacity: ${E})`),"#ff1744"):$?(console.log(`✓ Highlighting saturated edge ${g}-${d} (${S}/${E})`),"#ff9800"):y?(console.log(`✓ Highlighting flow edge ${g}-${d} (${S}/${E})`),"#4caf50"):"#666666"}).linkWidth(c=>{var I;const g=typeof c.source=="object"?c.source.id:c.source,d=typeof c.target=="object"?c.target.id:c.target,f=`${g}-${d}`,x=l.has(f),y=p.has(f),S=((I=r.get(g))==null?void 0:I.get(d))||0,E=c.capacity||c.weight||1,$=y&&Math.abs(S-E)<.001;return x?2:$?1.5:y&&S>0?.4+S/E*.8:.15}).linkLabel(c=>{var E;const g=typeof c.source=="object"?c.source.id:c.source,d=typeof c.target=="object"?c.target.id:c.target,f=((E=r.get(g))==null?void 0:E.get(d))||0,x=c.capacity||c.weight||1,y=`${g}-${d}`,S=f>0&&Math.abs(f-x)<.001;return l.has(y)?`🚫 MIN-CUT
Bottleneck: ${f}/${x}`:S?`🔥 SATURATED
Flow: ${f}/${x}`:f>0?`➡️ Flow: ${f}/${x}`:`Capacity: ${x}`}),e.nodeThreeObject(c=>{const g=c.id===a||c.isSource,d=c.id===i||c.isSink,f=c.isSuperSource,x=c.isSuperSink;let y=!1,S=!1;for(const $ of o){if($.source===c.id){y=!0;break}if($.target===c.id){S=!0;break}}let E={color:"#9e9e9e",glowColor:"#bdbdbd",glowOpacity:.2,glowSize:1.3};return f?E={color:"#1b5e20",glowColor:"#4caf50",glowOpacity:.8,glowSize:2.5}:x?E={color:"#b71c1c",glowColor:"#f44336",glowOpacity:.8,glowSize:2.5}:g?E={color:"#2e7d32",glowColor:"#66bb6a",glowOpacity:.7,glowSize:2.2}:d?E={color:"#c62828",glowColor:"#ef5350",glowOpacity:.7,glowSize:2.2}:y?E={color:"#1976d2",glowColor:"#42a5f5",glowOpacity:.5,glowSize:1.8}:S&&(E={color:"#7b1fa2",glowColor:"#ba68c8",glowOpacity:.5,glowSize:1.8}),this.createNodeWithGlow(c,E)})}static getWeightBasedWidth(e,n){const t=Math.abs(e||1),s=Math.max(Math.abs(n.minWeight),Math.abs(n.maxWeight));return .1+t/s*.7}static createNodeWithGlow(e,n){const t=new THREE.SphereGeometry(e.val||1),s=new THREE.MeshBasicMaterial({color:n.color,transparent:!1}),o=new THREE.Mesh(t,s),r=new THREE.SphereGeometry((e.val||1)*n.glowSize),a=new THREE.MeshBasicMaterial({color:n.glowColor,transparent:!0,opacity:n.glowOpacity}),i=new THREE.Mesh(r,a),l=new THREE.Group;return l.add(o),l.add(i),l}}class Ve{static findMaximumMatching(e){var n,t,s;try{if(!((n=e.specialAttributes)!=null&&n.isBipartite)&&!((t=e.specialAttributes)!=null&&t.isMultipartite)||!((s=e.specialAttributes)!=null&&s.partitionCount))throw new Error("This algorithm requires a multipartite graph");const o=e.specialAttributes.partitionCount,r=this.extractPartitions(e);console.log(`Finding maximum matching in ${o}-partite graph`),console.log("Partitions:",r.map((i,l)=>`Partition ${l}: ${i.length} nodes`));const a=this.findMaxMatchingGreedyWithAugmentation(e,r);return{success:!0,result:{matching:a,maxMatchingSize:a.length,partitions:r,isValid:this.validateMatching(a,e)}}}catch(o){return{success:!1,error:o instanceof Error?o.message:"Unknown error occurred",errorType:"algorithm-error"}}}static extractPartitions(e){var s;const n=((s=e.specialAttributes)==null?void 0:s.partitionCount)||2,t=Array.from({length:n},()=>[]);return e.nodes.forEach(o=>{const r=o.partition||0;t[r].push(o.id)}),t}static findMaxMatchingGreedyWithAugmentation(e,n){const t=[],s=new Set,o=new Map;e.nodes.forEach(c=>{o.set(c.id,[])}),e.links.forEach(c=>{var g,d;(g=o.get(c.source))==null||g.push(c.target),(d=o.get(c.target))==null||d.push(c.source)});const r=e.links.filter(c=>{const g=this.getNodePartition(c.source,e),d=this.getNodePartition(c.target,e);return g!==d});r.sort((c,g)=>(g.weight||1)-(c.weight||1));for(const c of r)!s.has(c.source)&&!s.has(c.target)&&(t.push(c),s.add(c.source),s.add(c.target));console.log(`Greedy phase found ${t.length} edges in matching`);let a=!0,i=0;const l=50;for(;a&&i<l;){a=!1,i++;const c=e.nodes.map(g=>g.id).filter(g=>!s.has(g));for(const g of c){const d=this.findAugmentingPath(g,o,t,s,e);if(d.length>0){this.applyAugmentingPath(d,t,s,e),a=!0,console.log(`Found augmenting path of length ${d.length}`);break}}}console.log(`Final matching size: ${t.length} (after ${i} improvement iterations)`);const p=this.cleanupMatching(t,e);return console.log(`Cleaned matching size: ${p.length}`),p}static findAugmentingPath(e,n,t,s,o){const r=new Set,a=new Map,i=[e];for(r.add(e);i.length>0;){const l=i.shift(),p=n.get(l)||[];for(const c of p){if(r.has(c))continue;const g=this.getNodePartition(l,o),d=this.getNodePartition(c,o);if(g!==d){if(r.add(c),a.set(c,l),!s.has(c))return this.reconstructPath(c,a,e);i.push(c)}}}return[]}static reconstructPath(e,n,t){const s=[];let o=e;for(;o!==t;)s.unshift(o),o=n.get(o);return s.unshift(t),s}static applyAugmentingPath(e,n,t,s){t.clear();for(let o=0;o<e.length-1;o++){const r=e[o],a=e[o+1],i=s.links.find(p=>p.source===r&&p.target===a||p.source===a&&p.target===r);if(!i)continue;const l=n.findIndex(p=>p.source===i.source&&p.target===i.target||p.source===i.target&&p.target===i.source);l>=0?n.splice(l,1):n.push(i)}n.forEach(o=>{t.add(o.source),t.add(o.target)})}static getNodePartition(e,n){const t=n.nodes.find(s=>s.id===e);return(t==null?void 0:t.partition)||0}static validateMatching(e,n){const t=new Set;for(const s of e){if(t.has(s.source)||t.has(s.target))return console.warn("Invalid matching: node used multiple times"),!1;t.add(s.source),t.add(s.target);const o=this.getNodePartition(s.source,n),r=this.getNodePartition(s.target,n);if(o===r)return console.warn("Invalid matching: edge within same partition"),!1}return!0}static cleanupMatching(e,n){const t=[],s=new Set,o=[...e].sort((r,a)=>(a.weight||1)-(r.weight||1));for(const r of o)if(!s.has(r.source)&&!s.has(r.target)){const a=this.getNodePartition(r.source,n),i=this.getNodePartition(r.target,n);a!==i&&(t.push(r),s.add(r.source),s.add(r.target))}return t}static getMatchingStats(e,n){const t=n.nodes.length,s=e.matching.length*2,o=t-s,r={},a=new Set;return e.matching.forEach(i=>{a.add(i.source),a.add(i.target)}),e.partitions.forEach((i,l)=>{const p=i.filter(c=>a.has(c)).length;r[l]=i.length>0?p/i.length:0}),{totalNodes:t,matchedNodes:s,unmatchedNodes:o,matchingEfficiency:t>0?s/t:0,partitionCoverage:r}}}const pt=(m,e,n,t,s,o,r,a,i,l,p)=>{const c=m.has("directed"),g=m.has("weighted");let d;if(m.has("erdos-renyi"))console.log("Taking Erdős-Renyi path"),d=ue.generateErdosRenyi(e,n,g,t,s,c,p||1);else if(m.has("flow-network"))console.log("Taking flow-network path"),d=ue.generateFlowNetwork(e,n,g,t,s,i||1,l||1);else if(m.has("bipartite")){const f=r||2,x=m.has("strongly-connected");console.log("Taking bipartite/multipartite path"),console.log("Actual partition count:",f),console.log("Partition ratios received:",a),console.log("Should be strongly connected:",x),d=ue.generateMultipartiteGraph(e,f,n,g,t,s,x,a)}else if(m.has("strongly-connected"))console.log("Taking strongly-connected path"),d=ue.generateStronglyConnected(e,n,g,t,s,c);else{const f=Array.from({length:e},(x,y)=>({id:`node${y}`,val:.7+Math.random()*.6}));if(m.has("disconnected")&&o){const x=[],y=Array.from({length:o},()=>[]);for(let S=0;S<e;S++)y[S%o].push(S);for(let S=0;S<o;S++){const E=y[S];if(console.log(`Component ${S}: nodes [${E.join(", ")}] (${E.length} nodes)`),E.length!==0){if(E.length>1){for(let $=0;$<E.length-1;$++){const I=g?t+Math.random()*(s-t):1;x.push({source:`node${E[$]}`,target:`node${E[$+1]}`,weight:Math.round(I*10)/10,isDirected:c})}if(E.length>2){const $=Math.floor(Math.random()*E.length);let I=Math.floor(Math.random()*E.length);for(;I===$;)I=Math.floor(Math.random()*E.length);const A=g?t+Math.random()*(s-t):1;x.push({source:`node${E[$]}`,target:`node${E[I]}`,weight:Math.round(A*10)/10,isDirected:c})}}for(let $=0;$<E.length;$++)for(let I=c?0:$+1;I<E.length;I++)if($!==I){const A=E[$],T=E[I];if(!x.some(N=>N.source===`node${A}`&&N.target===`node${T}`||!c&&N.source===`node${T}`&&N.target===`node${A}`)&&Math.random()<n){const N=g?t+Math.random()*(s-t):1;x.push({source:`node${A}`,target:`node${T}`,weight:Math.round(N*10)/10,isDirected:c})}}}}console.log(`Generated exactly ${o} components with ${x.length} total edges`),console.log("Node distribution:",y.map((S,E)=>`Component ${E}: ${S.length} nodes`)),d={nodes:f.map(S=>({...S})),links:x.map(S=>({...S}))}}else{const x=[];for(let y=0;y<e;y++)for(let S=c?0:y+1;S<e;S++)if(y!==S&&Math.random()<n){const E=g?t+Math.random()*(s-t):1;x.push({source:`node${y}`,target:`node${S}`,weight:Math.round(E*10)/10,isDirected:c})}d={nodes:f.map(y=>({...y})),links:x.map(y=>({...y}))}}d.specialAttributes={isFlowNetwork:!1,isStronglyConnected:m.has("strongly-connected"),isBipartite:m.has("bipartite"),isMultipartite:m.has("bipartite"),isPlanar:m.has("planar"),isTree:m.has("tree"),isDAG:m.has("dag")}}return d},W=(m,e)=>{const n=document.getElementById("status-message");n&&(n.textContent=m,n.className=`mt-3 p-2 rounded-lg text-xs ${e==="success"?"bg-green-900/50 text-green-300 border border-green-700":e==="error"?"bg-red-900/50 text-red-300 border border-red-700":"bg-yellow-900/50 text-yellow-300 border border-yellow-700"}`,n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},5e3))},ht=(m,e)=>{var n;if(!e)return W("No graph data available","error"),!1;switch(m){case"max-flow":if(!ue.isFlowNetwork(e))return W("Max flow algorithm requires a flow network. Please generate a flow network first.","warning"),!1;break;case"strongly-connected-components":(n=e.specialAttributes)!=null&&n.isStronglyConnected||W("This algorithm works best on strongly connected graphs.","warning");break}return!0},mt=(m,e,n)=>{try{const t=Ae.solve(m);if(!t.success){W(t.error,"error");return}he.highlightMaximumClique(e,t.result,n)}catch(t){console.error("Error solving clique:",t instanceof Error?t.message:String(t)),W("Error solving maximum clique problem","error")}},ft=(m,e,n)=>{try{const t=dt.solve(m,n);if(!t.success){W(t.error,"error");return}he.highlightShortestPath(e,t.result,n)}catch(t){console.error("Error solving shortest path:",t instanceof Error?t.message:String(t)),W("Error solving shortest path problem","error")}},xt=(m,e,n)=>{try{const t=lt.solve(m);if(!t.success){W(t.error,"error");return}he.highlightMaximumSpanningTree(e,t.result,n)}catch(t){console.error("Error solving maximum spanning tree:",t instanceof Error?t.message:String(t)),W("Error solving maximum spanning tree problem","error")}},yt=(m,e,n,t)=>{try{const s=ut.solve(m,n,t);if(!s.success){W(s.error,"error");return}he.highlightSteinerTree(e,s.result,n)}catch(s){console.error("Error solving Steiner tree:",s instanceof Error?s.message:String(s)),W("Error solving Steiner tree problem","error")}},vt=(m,e,n)=>{try{if(!ht("max-flow",m))return;const t=gt.solve(m,n);if(!t.success){W(t.error,"error");return}const s=t.result,o=s.minCutEdges.reduce((r,a)=>r+a.capacity,0);W(`Max flow: ${s.maxFlow} | Min-cut: ${s.minCutEdges.length} edges (capacity: ${o})`,"success"),he.highlightMaxFlow(e,s,n)}catch(t){console.error("Error solving max flow:",t),W("Error solving maximum flow: "+(t instanceof Error?t.message:String(t)),"error")}},bt=(m,e,n)=>{var t,s,o;try{if(!((t=m.specialAttributes)!=null&&t.isBipartite)&&!((s=m.specialAttributes)!=null&&s.isMultipartite)||!((o=m.specialAttributes)!=null&&o.partitionCount)){W("Multipartite matching requires a multipartite graph. Please generate a multipartite graph first.","error");return}W("Finding maximum matching...","warning");const r=Ve.findMaximumMatching(m);if(!r.success){W(r.error,"error");return}const a=r.result,i=Ve.getMatchingStats(a,m);console.log("=== MULTIPARTITE MATCHING DEBUG ==="),console.log("Matching edges:",a.matching),console.log("Total nodes:",i.totalNodes),console.log("Matched nodes count:",i.matchedNodes),console.log("Matching efficiency:",i.matchingEfficiency),console.log("Matching is valid:",a.isValid),console.log("Partition coverage:",i.partitionCoverage);const l=m.links[0];if(l){const p=a.matching.some(c=>c.source===l.source&&c.target===l.target||c.source===l.target&&c.target===l.source);console.log(`Test edge ${l.source}-${l.target} in matching:`,p)}console.log("==================================="),W(`Maximum matching found: ${a.maxMatchingSize} edges (${(i.matchingEfficiency*100).toFixed(1)}% of nodes matched)`,"success"),he.highlightMultipartiteMatching(e,a,n),console.log("Matching Result:",a),console.log("Matching Statistics:",i),console.log("Partition Coverage:",i.partitionCoverage)}catch(r){console.error("Error solving multipartite matching:",r instanceof Error?r.message:String(r)),W("Error solving multipartite matching problem","error")}};let ge=null,we=null,be=!1,ke={x:0,y:0},Te=!1;const wt=(m,e,n)=>{const t=document.getElementById("info-panel"),s=document.getElementById("info-title"),o=document.getElementById("info-content"),r=document.getElementById("info-icon"),a=document.getElementById("close-info-panel");if(!t||!s||!o||!r)return;const i=g=>{if(g.x!==void 0&&g.y!==void 0&&g.z!==void 0){const d=m.graph2ScreenCoords(g.x,g.y,g.z);if(d){let f=d.x+20,x=d.y-100;const y=320,S=200;f+y>window.innerWidth&&(f=d.x-y-20),x<10&&(x=d.y+20),x+S>window.innerHeight&&(x=window.innerHeight-S-10),t.style.left=`${Math.max(10,f)}px`,t.style.top=`${Math.max(10,x)}px`}else t.style.left="50px",t.style.top="50px"}else t.style.left="50px",t.style.top="50px";t.style.right="auto"},l=g=>{ge=null,we=g,e(),r.innerHTML=`
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="3"></circle>
    `,s.textContent="Node Information",o.innerHTML=`
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-gray-400 text-sm">Node ID:</span>
          <span class="text-white font-mono text-sm">${g.id}</span>
        </div>
        ${g.isSource?'<div class="text-green-400 text-sm font-medium">Source Node</div>':""}
        ${g.isSink?'<div class="text-red-400 text-sm font-medium">Sink Node</div>':""}
        ${g.isTerminal?'<div class="text-yellow-400 text-sm font-medium">Terminal Node</div>':""}
      </div>
    `,i(g),t.classList.remove("hidden")},p=(g,d)=>{var $;ge=g,we=null,r.innerHTML=`
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
    `,s.textContent="Edge Information";const f=typeof g.source=="object"?g.source.id:g.source,x=typeof g.target=="object"?g.target.id:g.target,y=g.isDirected||n.has("directed")||(($=d.specialAttributes)==null?void 0:$.isFlowNetwork),S=y?"→":"—",E="Connection:";o.innerHTML=`
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-gray-400 text-sm">${E}</span>
          <span class="text-white font-mono text-sm">${f} ${S} ${x}</span>
        </div>
        ${y?`
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Source:</span>
            <span class="text-white font-mono text-sm">${f}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Target:</span>
            <span class="text-white font-mono text-sm">${x}</span>
          </div>
        `:""}
        ${g.weight!==void 0?`
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Weight:</span>
            <span class="text-white font-mono text-sm">${g.weight}</span>
          </div>
        `:""}
        ${g.capacity!==void 0?`
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Capacity:</span>
            <span class="text-white font-mono text-sm">${g.capacity}</span>
          </div>
        `:""}
        ${y?'<div class="text-blue-400 text-sm font-medium">Directed Edge</div>':'<div class="text-purple-400 text-sm font-medium">Undirected Edge</div>'}
      </div>
    `,i(g),t.classList.remove("hidden")};a&&a.addEventListener("click",()=>{ge=null,we=null,e(),t.classList.add("hidden")}),document.addEventListener("click",g=>{if(be)return;const d=g.target;!t.contains(d)&&!t.classList.contains("hidden")&&(ge=null,we=null,e(),t.classList.add("hidden"))});const c=t==null?void 0:t.querySelector(".flex.items-center.justify-between");return c&&(c.style.cursor="move",c.addEventListener("mousedown",g=>{Te=!0;const d=parseInt(t.style.left)||0,f=parseInt(t.style.top)||0;ke.x=g.clientX-d,ke.y=g.clientY-f,g.preventDefault(),document.body.style.userSelect="none"}),document.addEventListener("mousemove",g=>{if(!Te)return;be||(be=!0);const d=g.clientX-ke.x,f=g.clientY-ke.y,x=window.innerWidth-t.offsetWidth,y=window.innerHeight-t.offsetHeight,S=Math.max(0,Math.min(d,x)),E=Math.max(0,Math.min(f,y));t.style.left=`${S}px`,t.style.top=`${E}px`,t.style.right="auto"}),document.addEventListener("mouseup",()=>{Te&&(Te=!1,document.body.style.userSelect="",be&&setTimeout(()=>{be=!1},50))})),{showNodeInfo:l,showEdgeInfo:p}},Et=m=>{const e=document.getElementById("graph-canvas");if(!e)return console.error("Graph canvas element not found!"),null;e.innerHTML="";const n=window.ForceGraph3D;if(!n)return console.error("ForceGraph3D not found in global scope"),null;const t=n().width(e.clientWidth).height(e.clientHeight).backgroundColor("#111827").nodeRelSize(5).linkColor(()=>"#6c63ff").linkWidth(.2).linkOpacity(.7);t(e),t.cameraPosition({z:300});let s={nodes:[],links:[]},o=[];const r=g=>{o.push(g)},a=()=>{o.forEach(g=>{try{g(s)}catch(d){console.error("Error in graph data change callback:",d)}})},i=()=>{t.nodeThreeObject(g=>{var T,L,N;const d=new THREE.SphereGeometry(g.val||1);let f="#9d4edd",x="#bf7af0";if(((T=s.specialAttributes)!=null&&T.isBipartite||(L=s.specialAttributes)!=null&&L.isMultipartite)&&((N=s.specialAttributes)!=null&&N.partitionCount)&&g.partition!==void 0){const F=["#ff4444","#44ff44","#4444ff","#ffaa00","#ff44ff","#00ffff","#ffff00","#8844ff","#00ff88","#ff8800"],ee=g.partition||0;f=F[ee%F.length],x=f}const y=new THREE.MeshBasicMaterial({color:f,transparent:!1}),S=new THREE.Mesh(d,y),E=new THREE.SphereGeometry((g.val||1)*1.5),$=new THREE.MeshBasicMaterial({color:x,transparent:!0,opacity:.3}),I=new THREE.Mesh(E,$),A=new THREE.Group;return A.add(S),A.add(I),A})},l=wt(t,i,m);l&&t.onNodeClick(g=>{l.showNodeInfo(g),t.nodeThreeObject(d=>{var L,N,F;new THREE.SphereGeometry(d.val||1);let f="#9d4edd",x="#bf7af0",y=d.val||1;if(d===we)f="#ff8c00",x="#ffb347",y=(d.val||1)*1.3;else if(((L=s.specialAttributes)!=null&&L.isBipartite||(N=s.specialAttributes)!=null&&N.isMultipartite)&&((F=s.specialAttributes)!=null&&F.partitionCount)&&d.partition!==void 0){const ee=["#ff4444","#44ff44","#4444ff","#ffaa00","#ff44ff","#00ffff","#ffff00","#8844ff","#00ff88","#ff8800"],U=d.partition||0;f=ee[U%ee.length],x=f}else{const ee=d.isSource,U=d.isSink;ee?(f="#10b981",x="#34d399"):U&&(f="#ef4444",x="#f87171")}const S=new THREE.MeshBasicMaterial({color:f,transparent:!1}),E=new THREE.Mesh(new THREE.SphereGeometry(y),S),$=new THREE.SphereGeometry(y*1.5),I=new THREE.MeshBasicMaterial({color:x,transparent:!0,opacity:.3}),A=new THREE.Mesh($,I),T=new THREE.Group;return T.add(E),T.add(A),T})}).onLinkClick(g=>{l.showEdgeInfo(g,s),t.linkColor(d=>{var f;return d===ge?"#ff8c00":m.has("weighted")&&d.weight<0?"#ef4444":(f=s.specialAttributes)!=null&&f.isFlowNetwork?"#10b981":"#6c63ff"}),t.linkWidth(d=>{var y,S;const f=document.getElementById("min-weight"),x=document.getElementById("max-weight");if(d===ge)return(m.has("weighted")||(y=s.specialAttributes)!=null&&y.isFlowNetwork?.1+Math.abs(d.weight||d.capacity||1)/Math.max(Math.abs(parseFloat((f==null?void 0:f.value)||"1")),Math.abs(parseFloat((x==null?void 0:x.value)||"5")))*.7:.2)*2.5;if(m.has("weighted")||(S=s.specialAttributes)!=null&&S.isFlowNetwork){const E=Math.abs(d.weight||d.capacity||1),$=Math.max(Math.abs(parseFloat((f==null?void 0:f.value)||"1")),Math.abs(parseFloat((x==null?void 0:x.value)||"5")));return .1+E/$*.7}return .2})}).linkHoverPrecision(300),t.nodeThreeObject(g=>{const d=new THREE.SphereGeometry(g.val||1),f=new THREE.MeshBasicMaterial({color:"#9d4edd",transparent:!1}),x=new THREE.Mesh(d,f),y=new THREE.SphereGeometry((g.val||1)*1.5),S=new THREE.MeshBasicMaterial({color:"#bf7af0",transparent:!0,opacity:.3}),E=new THREE.Mesh(y,S),$=new THREE.Group;return $.add(x),$.add(E),$});const p=()=>{var g,d,f,x,y,S,E,$,I,A,T,L;try{const N=document.getElementById("node-count"),F=document.getElementById("edge-probability"),ee=document.getElementById("min-weight"),U=document.getElementById("max-weight"),me=document.getElementById("component-count-value"),fe=document.getElementById("partition-count-value"),xe=document.getElementById("source-count"),ye=document.getElementById("sink-count"),ve=document.getElementById("erdos-renyi-connections"),_e=parseInt((N==null?void 0:N.value)||"20",10),Ne=parseFloat((F==null?void 0:F.value)||"0.3"),Ee=parseFloat((ee==null?void 0:ee.value)||"1"),Me=parseFloat((U==null?void 0:U.value)||"5"),Le=parseInt((me==null?void 0:me.value)||"2"),re=parseInt((fe==null?void 0:fe.value)||"2"),Pe=parseInt((xe==null?void 0:xe.value)||"1"),Se=parseInt((ye==null?void 0:ye.value)||"1"),je=parseInt((ve==null?void 0:ve.value)||"1"),$e=tt();console.log("=== GRAPH GENERATION DEBUG ==="),console.log("Active properties:",Array.from(m)),console.log("Partition count from UI:",re),console.log("Partition ratios from UI:",$e),console.log("============================");const j=pt(m,_e,Ne,Ee,Me,Le,re,$e,Pe,Se,je);s=j,a(),console.log(`Generated graph: ${j.nodes.length} nodes, ${j.links.length} links`),console.log("Special attributes:",j.specialAttributes),console.log("Sample links:",j.links.slice(0,3)),console.log("Sample nodes with partitions:",j.nodes.slice(0,5).map(_=>({id:_.id,partition:_.partition})));const oe=j.nodes.map(_=>({..._})),de=j.links.map(_=>({..._}));if(t.graphData({nodes:oe,links:de}),((g=j.specialAttributes)!=null&&g.isBipartite||(d=j.specialAttributes)!=null&&d.isMultipartite)&&((f=j.specialAttributes)!=null&&f.partitionCount)){const _=j.specialAttributes.partitionCount,z=100;oe.forEach((G,Y)=>{const D=G.partition||0,X=oe.filter(V=>(V.partition||0)===D),P=X.findIndex(V=>V.id===G.id),K=D*2*Math.PI/_,te=Math.PI/(_*2),Z=K+(P-(X.length-1)/2)*te/Math.max(1,X.length-1);G.x=z*Math.cos(Z),G.y=z*Math.sin(Z),G.z=0}),t.graphData({nodes:oe,links:de})}if((x=j.specialAttributes)!=null&&x.isFlowNetwork){const _=oe.filter(P=>P.isSource),z=oe.filter(P=>P.isSink),G=oe.filter(P=>!P.isSource&&!P.isSink),Y=400,D=300,X=200;if(_.length>0&&z.length>0){if(_.length===1?(_[0].x=-Y/2,_[0].y=0,_[0].z=0,_[0].val=2):_.forEach((P,K)=>{P.x=-Y/2,P.y=-D/2+K/Math.max(1,_.length-1)*D,P.z=0,P.val=2}),z.length===1?(z[0].x=Y/2,z[0].y=0,z[0].z=0,z[0].val=2):z.forEach((P,K)=>{P.x=Y/2,P.y=-D/2+K/Math.max(1,z.length-1)*D,P.z=0,P.val=2}),G.length>0){const P=Math.min(4,Math.max(1,Math.ceil(G.length/3))),K=new Map,te=[{id:_[0].id,distance:0}],Z=new Set;for(Z.add(_[0].id),K.set(_[0].id,0);te.length>0;){const{id:H,distance:u}=te.shift();de.forEach(h=>{const v=typeof h.source=="object"?h.source.id:h.source,b=typeof h.target=="object"?h.target.id:h.target;v===H&&!Z.has(b)&&(Z.add(b),K.set(b,u+1),te.push({id:b,distance:u+1}))})}const V=new Map;G.forEach(H=>{const u=K.get(H.id)||1,h=Math.min(P-1,Math.max(0,u-1));V.has(h)||V.set(h,[]),V.get(h).push(H)});for(let H=0;H<P;H++){const u=V.get(H)||[];if(u.length>0){const h=-Y/2+(H+1)*Y/(P+1);u.forEach((v,b)=>{if(v.x=h,u.length===1)v.y=0,v.z=0;else if(u.length<=4){const w=b*2*Math.PI/u.length,C=Math.min(D/4,80);v.y=C*Math.cos(w),v.z=C*Math.sin(w)}else{const w=Math.ceil(Math.sqrt(u.length)),C=Math.floor(b/w),M=b%w,k=D/(w+1),B=X/(w+1);v.y=-D/2+(C+1)*k,v.z=-X/2+(M+1)*B}v.val=(v.val||1)*1.2})}}G.forEach(H=>{if(H.x===void 0||H.y===void 0){const u=G.indexOf(H);H.x=-Y/4+u/Math.max(1,G.length-1)*Y/2,H.y=(Math.random()-.5)*D,H.z=(Math.random()-.5)*X,H.val=(H.val||1)*1.2}})}t.graphData({nodes:oe,links:de})}}const Ge=((y=j.specialAttributes)==null?void 0:y.isFlowNetwork)||m.has("directed");if(t.linkDirectionalArrowLength(Ge?4:0).linkDirectionalArrowRelPos(1).linkWidth(_=>{var G;if(m.has("weighted")||(G=j.specialAttributes)!=null&&G.isFlowNetwork){const Y=Math.abs(_.weight||_.capacity||1),D=Math.max(Math.abs(Ee),Math.abs(Me));return .1+Y/D*.7}return .2}).linkColor(_=>{var G;const z=m.has("weighted");return(G=j.specialAttributes)!=null&&G.isFlowNetwork?"#00d4aa":z&&_.weight<0?"#ef4444":"#6c63ff"}).linkLabel(_=>{var G;return(G=j.specialAttributes)!=null&&G.isFlowNetwork?`Capacity: ${_.capacity||_.weight}`:m.has("weighted")?`Weight: ${_.weight}`:""}),(S=j.specialAttributes)!=null&&S.isFlowNetwork?t.nodeThreeObject(_=>{const z=_.isSource,G=_.isSink,Y=_.isSuperSource,D=_.isSuperSink,X=_.val||1,P=new THREE.SphereGeometry(X);let K="#8b5cf6",te="#a78bfa",Z=.3,V="";Y?(K="#059669",te="#10b981",Z=.7,V="SUPER-SOURCE"):D?(K="#dc2626",te="#ef4444",Z=.7,V="SUPER-SINK"):z?(K="#059669",te="#10b981",Z=.5,V="SOURCE"):G&&(K="#dc2626",te="#ef4444",Z=.5,V="SINK");const H=new THREE.MeshBasicMaterial({color:K,transparent:!1}),u=new THREE.Mesh(P,H),h=new THREE.SphereGeometry(X*1.8),v=new THREE.MeshBasicMaterial({color:te,transparent:!0,opacity:Z}),b=new THREE.Mesh(h,v);if(V){const C=document.createElement("canvas"),M=C.getContext("2d");C.width=128,C.height=64,M.fillStyle="#ffffff",M.font="bold 18px Arial",M.textAlign="center",M.fillText(V,64,40);const k=new THREE.CanvasTexture(C),B=new THREE.SpriteMaterial({map:k}),O=new THREE.Sprite(B);O.scale.set(X*4,X*2,1),O.position.set(0,X*2.5,0);const R=new THREE.Group;return R.add(u),R.add(b),R.add(O),R}const w=new THREE.Group;return w.add(u),w.add(b),w}):((E=j.specialAttributes)!=null&&E.isBipartite||($=j.specialAttributes)!=null&&$.isMultipartite)&&((I=j.specialAttributes)!=null&&I.partitionCount)?console.log("Multipartite graph detected - will apply coloring after graph data is set"):i(),((A=j.specialAttributes)!=null&&A.isBipartite||(T=j.specialAttributes)!=null&&T.isMultipartite)&&((L=j.specialAttributes)!=null&&L.partitionCount)){console.log("=== APPLYING MULTIPARTITE COLORING ==="),console.log("Partition count:",j.specialAttributes.partitionCount);const _=["#ff4444","#44ff44","#4444ff","#ffaa00","#ff44ff","#00ffff","#ffff00","#8844ff","#00ff88","#ff8800"];t.nodeThreeObject(z=>{console.log(`Final coloring: Node ${z.id} has partition: ${z.partition}`);const G=new THREE.SphereGeometry(z.val||1),Y=z.partition||0,D=_[Y%_.length];console.log(`Final coloring: Node ${z.id} partition ${Y} -> color ${D}`);const X=new THREE.MeshBasicMaterial({color:D,transparent:!1}),P=new THREE.Mesh(G,X),K=new THREE.SphereGeometry((z.val||1)*1.5),te=new THREE.MeshBasicMaterial({color:D,transparent:!0,opacity:.3}),Z=new THREE.Mesh(K,te),V=new THREE.Group;return V.add(P),V.add(Z),V}),console.log("Multipartite node coloring applied as final step")}}catch(N){console.error("Error generating graph:",N instanceof Error?N.message:String(N)),W("Error generating graph: "+(N instanceof Error?N.message:String(N)),"error")}},c=g=>{const d=document.getElementById("min-weight"),f=document.getElementById("max-weight"),x=document.getElementById("terminal-count"),y={isDirected:m.has("directed"),useWeights:m.has("weighted"),minWeight:parseFloat((d==null?void 0:d.value)||"1"),maxWeight:parseFloat((f==null?void 0:f.value)||"5")};switch(g){case"maximum-clique":mt(s,t,y);break;case"shortest-path":ft(s,t,y);break;case"maximum-spanning-tree":xt(s,t,y);break;case"steiner-tree":const S=parseInt((x==null?void 0:x.value)||"5",10);yt(s,t,y,S);break;case"max-flow":vt(s,t,y);break;case"multipartite-matching":bt(s,t,y);break}};return window.addEventListener("resize",()=>{t.width(e.clientWidth),t.height(e.clientHeight)}),{generateGraph:p,solveAlgorithm:c,addGraphDataChangeCallback:r,getCurrentGraphData:()=>s}},Mt=()=>{let m={nodes:[],links:[]},e=!1,n=[],t=0;const s=[{id:"basic-info",name:"Basic Information",description:"Vertices, edges, density, graph type",icon:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",category:"general"},{id:"connectivity",name:"Connectivity Analysis",description:"Connected components, diameter, path lengths",icon:"M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",category:"general"},{id:"degree-stats",name:"Degree Statistics",description:"Min, max, average degree, degree distribution",icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",category:"general"},{id:"adjacency-matrix",name:"Adjacency Matrix",description:"Graph adjacency matrix representation",icon:"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z",category:"matrices"},{id:"laplacian-matrix",name:"Laplacian Matrix",description:"Graph Laplacian matrix and properties",icon:"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z",category:"matrices"},{id:"degree-matrix",name:"Degree Matrix",description:"Diagonal matrix of vertex degrees",icon:"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z",category:"matrices"},{id:"incidence-matrix",name:"Incidence Matrix",description:"Vertex-edge incidence matrix",icon:"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z",category:"matrices"},{id:"eigenvalues",name:"Eigenvalue Analysis",description:"Largest eigenvalues and spectral gap",icon:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",category:"spectral"},{id:"laplacian-spectrum",name:"Laplacian Spectrum",description:"All Laplacian eigenvalues and properties",icon:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",category:"spectral"},{id:"algebraic-connectivity",name:"Algebraic Connectivity",description:"Second smallest Laplacian eigenvalue",icon:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",category:"spectral"},{id:"adjacency-spectrum",name:"Adjacency Spectrum",description:"Adjacency matrix eigenvalues",icon:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",category:"spectral"},{id:"structural-properties",name:"Structural Properties",description:"Tree, bipartite, DAG, cycle detection",icon:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",category:"properties"},{id:"centrality-measures",name:"Centrality Measures",description:"Degree, betweenness, closeness centrality",icon:"M13 10V3L4 14h7v7l9-11h-7z",category:"properties"},{id:"component-analysis",name:"Component Analysis",description:"Connected components and their properties",icon:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",category:"properties"},{id:"graph-distances",name:"Graph Distances",description:"Shortest paths, diameter, eccentricity",icon:"M4.93 19.07l1.41-1.41a7 7 0 010-9.9L4.93 6.34a9 9 0 000 12.73zM19.07 4.93l-1.41 1.41a7 7 0 010 9.9l1.41 1.41a9 9 0 000-12.73z",category:"properties"}],o=()=>`
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
          ${r("general","General Information","Add general graph analyses like basic statistics, connectivity, and degree information")}
          ${r("matrices","Matrix Analysis","Add matrix representations like adjacency, Laplacian, and degree matrices")}
          ${r("spectral","Spectral Analysis","Add spectral graph theory analyses including eigenvalues and spectral properties")}
          ${r("properties","Graph Properties","Add structural and topological property analyses")}
        </div>
      </div>
    `,r=(u,h,v)=>`
      <div id="tab-${u}" class="tab-content p-6 ${u==="general"?"":"hidden"}">
        <!-- Analysis Cells Container for this tab -->
        <div id="analysis-cells-${u}" class="space-y-4 mb-6">
          <!-- Cells for this tab will be dynamically added here -->
        </div>
        
        <!-- Add Analysis Section for this tab -->
        <div class="bg-gray-800 rounded-xl border-2 border-dashed border-gray-600 p-6">
          <div class="text-center mb-4">
            <svg class="w-8 h-8 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <h3 class="text-lg font-semibold text-gray-400">${h}</h3>
            <p class="text-sm text-gray-500">${v}</p>
          </div>
          
          <!-- Analysis Options Grid for this tab -->
          <div id="analysis-options-${u}" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <!-- Analysis options for this tab will be populated here -->
          </div>
        </div>
      </div>
    `,a=u=>`
      <button class="analysis-option p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-all duration-200 border border-gray-600 hover:border-purple-400 group" data-analysis-id="${u.id}">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-purple-400 group-hover:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${u.icon}"></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-white group-hover:text-purple-200">${u.name}</h4>
            <p class="text-xs text-gray-400 mt-1">${u.description}</p>
          </div>
        </div>
      </button>
    `,i=u=>`
      <div class="analysis-cell bg-gray-800 rounded-xl border border-gray-600 overflow-hidden" data-cell-id="${u.id}">
        <div class="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-750">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
            <h3 class="text-sm font-semibold text-white">${u.title}</h3>
            <span class="text-xs text-gray-500">${new Date(u.timestamp).toLocaleTimeString()}</span>
          </div>
          <div class="flex items-center space-x-1">
            <button class="refresh-cell p-1 text-gray-400 hover:text-green-400 rounded transition-colors" data-cell-id="${u.id}" title="Refresh">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
            <button class="remove-cell p-1 text-gray-400 hover:text-red-400 rounded transition-colors" data-cell-id="${u.id}" title="Remove">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="p-4">
          <div class="cell-content text-sm text-gray-300">${u.content}</div>
        </div>
      </div>
    `,l=()=>{const u=document.getElementById("math-analysis-panel");u&&u.remove();const h=document.getElementById("graph-container");h&&(h.insertAdjacentHTML("beforeend",o()),p())},p=()=>{const u=document.getElementById("close-math-panel");u&&u.addEventListener("click",()=>{g()});const h=document.getElementById("clear-all-cells");h&&h.addEventListener("click",()=>{Pe()}),document.querySelectorAll(".tab-button").forEach(b=>{b.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();const C=w.currentTarget,M=C.getAttribute("data-tab");M?c(M):console.error("No tab name found for button:",C)})}),document.addEventListener("click",b=>{const w=b.target,C=w.closest(".analysis-option");if(C){const B=C.getAttribute("data-analysis-id");B&&Ee(B);return}const M=w.closest(".refresh-cell");if(M){const B=M.getAttribute("data-cell-id");B&&Le(B);return}const k=w.closest(".remove-cell");if(k){const B=k.getAttribute("data-cell-id");B&&Me(B);return}})},c=u=>{document.querySelectorAll(".tab-button").forEach(b=>{b.classList.remove("active","bg-gray-800","text-white","border-purple-400"),b.classList.add("text-gray-400")});const h=document.querySelector(`[data-tab="${u}"]`);h&&(h.classList.add("active","bg-gray-800","text-white","border-purple-400"),h.classList.remove("text-gray-400")),document.querySelectorAll(".tab-content").forEach(b=>{b.classList.add("hidden")});const v=document.getElementById(`tab-${u}`);v&&v.classList.remove("hidden")},g=()=>{const u=document.getElementById("math-analysis-panel"),h=document.getElementById("graph-canvas");if(!u){l();return}e?(u.classList.add("hidden"),h&&(h.style.display="block"),e=!1):(u.classList.remove("hidden"),h&&(h.style.display="none"),e=!0,d(m))},d=u=>{if(m=u,!e)return;const h=n.find(v=>v.type==="basic-info-default");h&&(h.content=H(),h.timestamp=Date.now(),re()),f(u),x(u),y(u),A(u)},f=u=>{const h=u.nodes.length,v=u.links.length,b=u.links.some(ne=>ne.isDirected),w=b?h*(h-1):h*(h-1)/2,C=w>0?v/w:0,M=(ne,ae)=>{const le=document.getElementById(ne);le&&(le.textContent=ae)};M("vertex-count",h.toString()),M("edge-count",v.toString()),M("graph-type",b?"Directed":"Undirected"),M("graph-density",C.toFixed(3));const k=T(u.nodes,u.links),B=k.isConnected;M("is-connected",B?"Yes":"No"),M("component-count",k.components.length.toString());const O=L(u.nodes,u.links),R=Object.values(O),se=R.length>0?Math.min(...R):0,J=R.length>0?Math.max(...R):0,Q=R.length>0?R.reduce((ne,ae)=>ne+ae,0)/R.length:0;if(M("min-degree",se.toString()),M("max-degree",J.toString()),M("avg-degree",Q.toFixed(2)),B){const ne=me(),ae=Math.max(...ne),le=ne.reduce((Ke,Ye)=>Ke+Ye,0)/ne.length;M("graph-diameter",ae.toString()),M("avg-path-length",le.toFixed(2))}else M("graph-diameter","∞"),M("avg-path-length","∞")},x=u=>{const h=N(u.nodes,u.links),v=F(u.nodes,u.links),b=ee(u.nodes,u.links),w=(C,M)=>{const k=document.getElementById(C);k&&(k.innerHTML=U(M,u.nodes.map(B=>B.id)))};w("adjacency-matrix",h),w("degree-matrix",v),w("laplacian-matrix",b)},y=u=>{const h=N(u.nodes,u.links),v=ee(u.nodes,u.links),b=S(h,v),w=(M,k)=>{const B=document.getElementById(M);B&&(B.textContent=k)};w("largest-eigenvalue",b.largestEigenvalue.toFixed(4)),w("second-eigenvalue",b.secondLargestEigenvalue.toFixed(4)),w("spectral-gap",b.spectralGap.toFixed(4)),w("algebraic-connectivity",b.algebraicConnectivity.toFixed(4)),w("zero-eigenvalues",b.zeroEigenvalues.toString());const C=document.getElementById("laplacian-eigenvalues");C&&(C.innerHTML=b.laplacianEigenvalues.map((M,k)=>`λ${k}: ${M.toFixed(4)}`).join("<br>"))},S=(u,h)=>{if(u.length===0)return{largestEigenvalue:0,secondLargestEigenvalue:0,spectralGap:0,algebraicConnectivity:0,zeroEigenvalues:0,laplacianEigenvalues:[]};const b=$(u),w=E(u,b),M=[...I(h)].sort((R,se)=>R-se),k=b-w,B=M.length>1?M[1]:0,O=M.filter(R=>Math.abs(R)<1e-10).length;return{largestEigenvalue:b,secondLargestEigenvalue:w,spectralGap:k,algebraicConnectivity:B,zeroEigenvalues:O,laplacianEigenvalues:M}},E=(u,h)=>{const v=u.length;if(v<=1)return 0;if(v===2){const b=u[0][0]+u[1][1],w=u[0][0]*u[1][1]-u[0][1]*u[1][0],C=b*b-4*w;if(C>=0){const M=Math.sqrt(C),k=(b+M)/2,B=(b-M)/2;return Math.abs(k-h)>Math.abs(B-h)?B:k}}return h*.7},$=(u,h=100,v=1e-6)=>{const b=u.length;if(b===0)return 0;let w=new Array(b).fill(0).map(()=>Math.random()),C=0;for(let M=0;M<h;M++){const k=new Array(b).fill(0);for(let J=0;J<b;J++)for(let Q=0;Q<b;Q++)k[J]+=u[J][Q]*w[Q];const B=k.reduce((J,Q,ne)=>J+Q*w[ne],0),O=w.reduce((J,Q)=>J+Q*Q,0),R=O>0?B/O:0;if(Math.abs(R-C)<v)return R;C=R;const se=Math.sqrt(k.reduce((J,Q)=>J+Q*Q,0));if(se>0)w=k.map(J=>J/se);else break}return C},I=u=>{const h=u.length;if(h===0)return[];const v=[];if(h<=1)return[0];if(h===2){const b=u[0][0]+u[1][1],w=u[0][0]*u[1][1]-u[0][1]*u[1][0],C=b*b-4*w;if(C>=0){const M=Math.sqrt(C);v.push((b-M)/2),v.push((b+M)/2)}return v.sort((M,k)=>M-k)}for(let b=0;b<h;b++){const w=u[b][b],C=u[b].reduce((B,O,R)=>b!==R?B+Math.abs(O):B,0),M=w,k=C;v.push(Math.max(0,M-k/2))}return v[0]=0,v.sort((b,w)=>b-w)},A=u=>{const h=(C,M)=>{const k=document.getElementById(C);k&&(k.textContent=M)},v=fe(u);h("is-tree",v?"Yes":"No");const b=xe(u);if(h("is-bipartite",b?"Yes":"No"),u.links.some(C=>C.isDirected)){const C=ye(u);h("is-dag",C?"Yes":"No"),h("has-cycles",C?"No":"Yes")}else h("is-dag","N/A (Undirected)"),h("has-cycles",!v?"Yes":"No");ve(u),_e(u)},T=(u,h)=>{const v=new Set,b=[],w=new Map;u.forEach(M=>w.set(M.id,[])),h.forEach(M=>{var k,B;(k=w.get(M.source))==null||k.push(M.target),(B=w.get(M.target))==null||B.push(M.source)});const C=(M,k)=>{v.add(M),k.push(M),(w.get(M)||[]).forEach(O=>{v.has(O)||C(O,k)})};return u.forEach(M=>{if(!v.has(M.id)){const k=[];C(M.id,k),b.push(k)}}),{components:b,isConnected:b.length===1}},L=(u,h)=>{const v={};return u.forEach(b=>v[b.id]=0),h.forEach(b=>{v[b.source]=(v[b.source]||0)+1,v[b.target]=(v[b.target]||0)+1}),v},N=(u,h)=>{const v=u.length,b=Array(v).fill(0).map(()=>Array(v).fill(0)),w=new Map(u.map((C,M)=>[C.id,M]));return h.forEach(C=>{const M=w.get(C.source),k=w.get(C.target);M!==void 0&&k!==void 0&&(b[M][k]=1,b[k][M]=1)}),b},F=(u,h)=>{const v=u.length,b=Array(v).fill(0).map(()=>Array(v).fill(0)),w=L(u,h);return u.forEach((C,M)=>{b[M][M]=w[C.id]||0}),b},ee=(u,h)=>{const v=N(u,h),b=F(u,h),w=u.length,C=Array(w).fill(0).map(()=>Array(w).fill(0));for(let M=0;M<w;M++)for(let k=0;k<w;k++)C[M][k]=b[M][k]-v[M][k];return C},U=(u,h)=>{if(u.length===0)return"Empty matrix";if(u.length>20)return`Matrix too large to display (${u.length}×${u.length})`;const v=Math.max(...h.map(C=>C.length),2),b=Math.max(v+1,4);let w='<table class="matrix-table" style="border-collapse: collapse;">';return w+='<tr><td style="width: '+b*8+'px;"></td>',h.forEach(C=>{w+=`<td style="text-align: center; padding: 2px 4px; width: ${b*8}px;">${C}</td>`}),w+="</tr>",u.forEach((C,M)=>{w+="<tr>",w+=`<td style="text-align: right; padding: 2px 4px; font-weight: bold;">${h[M]}</td>`,C.forEach(k=>{w+=`<td style="text-align: center; padding: 2px 4px;">${k}</td>`}),w+="</tr>"}),w+="</table>",w},me=u=>[],fe=u=>{const h=u.nodes.length;return u.links.filter(b=>!b.isDirected).length===h-1&&T(u.nodes,u.links).isConnected},xe=u=>{const h=new Map,v=new Set,b=(w,C)=>{if(h.has(w))return h.get(w)===C;h.set(w,C),v.add(w);for(const M of u.links){let k=null;if(M.source===w?k=M.target:!M.isDirected&&M.target===w&&(k=M.source),k&&!b(k,1-C))return!1}return!0};for(const w of u.nodes)if(!v.has(w.id)&&!b(w.id,0))return!1;return!0},ye=u=>{const w=new Map;u.nodes.forEach(M=>{w.set(M.id,0)});const C=M=>{w.set(M,1);for(const k of u.links)if(k.isDirected&&k.source===M){const B=k.target,O=w.get(B);if(O===1||O===0&&C(B))return!0}return w.set(M,2),!1};for(const M of u.nodes)if(w.get(M.id)===0&&C(M.id))return!1;return!0},ve=u=>{const h=L(u.nodes,u.links),v=Object.entries(h).sort(([,C],[,M])=>M-C).slice(0,5),b=document.getElementById("degree-centrality");b&&(b.innerHTML=v.map(([C,M])=>`${C}: ${M}`).join("<br>"));const w=document.getElementById("betweenness-centrality");w&&(w.innerHTML="Computing betweenness centrality...")},_e=u=>{const h=T(u.nodes,u.links),v=document.getElementById("component-analysis");v&&(v.innerHTML=h.components.map((b,w)=>`<div class="bg-gray-900 rounded-lg p-4 border border-gray-600">
            <div class="text-white font-semibold mb-2">Component ${w+1}</div>
            <div class="text-purple-400 text-lg font-bold mb-1">${b.length} nodes</div>
            <div class="text-gray-400 text-sm">${b.slice(0,8).join(", ")}${b.length>8?"...":""}</div>
          </div>`).join(""))},Ne=u=>{const h=document.getElementById(`analysis-options-${u}`);if(!h)return;const v=s.filter(b=>b.category===u);h.innerHTML=v.map(b=>a(b)).join("")},Ee=u=>{const h=s.find(M=>M.id===u);if(!h)return;const v=document.querySelector(".tab-button.active"),b=(v==null?void 0:v.getAttribute("data-tab"))||"general",C={id:`cell-${t++}`,type:u,title:h.name,content:Se(u),timestamp:Date.now(),tabId:b};n.push(C),re()},Me=u=>{n=n.filter(h=>h.id!==u),re()},Le=u=>{const h=n.findIndex(v=>v.id===u);h!==-1&&(n[h].content=Se(n[h].type),n[h].timestamp=Date.now(),re())},re=()=>{["general","matrices","spectral","properties"].forEach(h=>{const v=document.getElementById(`analysis-cells-${h}`);v&&(v.innerHTML="")}),n.forEach(h=>{const v=document.getElementById(`analysis-cells-${h.tabId}`);v&&v.insertAdjacentHTML("beforeend",i(h))})},Pe=()=>{n=[],re()},Se=u=>{const{nodes:h,links:v}=m;switch(u){case"basic-info":return je(h,v);case"basic-info-default":return H();case"connectivity":return $e(h,v);case"degree-stats":return j(h,v);case"adjacency-matrix":return oe(h,v);case"laplacian-matrix":return de(h,v);case"degree-matrix":return Ge(h,v);case"incidence-matrix":return _(h,v);case"eigenvalues":return z(h,v);case"laplacian-spectrum":return G(h);case"adjacency-spectrum":return Y(h);case"algebraic-connectivity":return D(h,v);case"structural-properties":return X(h,v);case"centrality-measures":return P(h,v);case"component-analysis":return K(h,v);case"graph-distances":return te(h,v);default:return'<div class="text-gray-500 italic">Analysis not implemented</div>'}},je=(u,h)=>{const v=u.length,b=h.length,w=v*(v-1)/2,C=w>0?b/w:0;return`
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Vertices (|V|)</div>
          <div class="text-3xl font-bold text-purple-400">${v}</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Edges (|E|)</div>
          <div class="text-3xl font-bold text-purple-400">${b}</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Graph Type</div>
          <div class="text-lg font-semibold text-green-400">Undirected</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Density</div>
          <div class="text-lg font-semibold text-blue-400">${C.toFixed(4)}</div>
        </div>
      </div>
    `},$e=(u,h)=>{const{components:v,isConnected:b}=T(u,h),w=v.length;return`
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Connected:</span>
          <span class="font-semibold ${b?"text-green-400":"text-red-400"} px-3 py-1 bg-gray-700 rounded">${b?"Yes":"No"}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Components:</span>
          <span class="font-semibold text-blue-400 px-3 py-1 bg-gray-700 rounded">${w}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Largest Component:</span>
          <span class="font-semibold text-purple-400 px-3 py-1 bg-gray-700 rounded">${Math.max(...v.map(C=>C.length),0)}</span>
        </div>
      </div>
    `},j=(u,h)=>{const v=L(u,h),b=Object.values(v),w=Math.min(...b,0),C=Math.max(...b,0),M=b.length>0?b.reduce((k,B)=>k+B,0)/b.length:0;return`
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Min Degree:</span>
          <span class="font-semibold text-blue-400 px-3 py-1 bg-gray-700 rounded">${w}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Max Degree:</span>
          <span class="font-semibold text-blue-400 px-3 py-1 bg-gray-700 rounded">${C}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Average Degree:</span>
          <span class="font-semibold text-blue-400 px-3 py-1 bg-gray-700 rounded">${M.toFixed(2)}</span>
        </div>
      </div>
    `},oe=(u,h)=>{const v=N(u,h);return`
      <div class="bg-gray-900 rounded-lg p-4 overflow-auto border border-gray-600" style="max-height: 400px;">
        <div class="font-mono text-sm text-gray-300">${U(v,u.map(w=>w.id))}</div>
      </div>
    `},de=(u,h)=>{const v=ee(u,h);return`
      <div class="bg-gray-900 rounded-lg p-4 overflow-auto border border-gray-600" style="max-height: 400px;">
        <div class="font-mono text-sm text-gray-300">${U(v,u.map(w=>w.id))}</div>
      </div>
    `},Ge=(u,h)=>{const v=F(u,h);return`
      <div class="bg-gray-900 rounded-lg p-4 overflow-auto border border-gray-600" style="max-height: 400px;">
        <div class="font-mono text-sm text-gray-300">${U(v,u.map(w=>w.id))}</div>
      </div>
    `},_=(u,h)=>{const v=u.length,b=h.length;return v===0||b===0?'<div class="text-gray-500 italic">No incidence matrix for empty graph</div>':v>15||b>15?`
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Incidence Matrix Dimensions</div>
          <div class="text-lg font-semibold text-purple-400">${v} × ${b}</div>
          <div class="text-xs text-gray-400 mt-2">Matrix too large to display</div>
        </div>
      `:`
      <div class="bg-gray-700 rounded-lg p-4">
        <div class="text-gray-300 text-sm">Incidence Matrix</div>
        <div class="text-lg font-semibold text-purple-400">${v} × ${b}</div>
        <div class="text-xs text-gray-400 mt-2">Vertex-edge incidence relationships</div>
      </div>
    `},z=(u,h)=>{const v=u.length,b=v>0?2*h.length/v:0,w=(b*1.5).toFixed(4),C=(b*1.2).toFixed(4),M=(b*.3).toFixed(4);return`
      <div class="space-y-4">
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Largest Eigenvalue (λ₁)</div>
          <div class="text-2xl font-semibold text-purple-400">${w}</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Second Largest Eigenvalue (λ₂)</div>
          <div class="text-2xl font-semibold text-green-400">${C}</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Spectral Gap (λ₁ - λ₂)</div>
          <div class="text-2xl font-semibold text-blue-400">${M}</div>
        </div>
      </div>
    `},G=(u,h)=>{const v=u.length;return`
      <div class="bg-gray-900 rounded-lg p-4 border border-gray-600" style="max-height: 300px; overflow-y: auto;">
        <div class="text-gray-400 text-sm mb-2">Laplacian Eigenvalues (${v} values):</div>
        <div class="font-mono text-sm text-gray-300">Computing eigenvalues for ${v}×${v} matrix...</div>
      </div>
    `},Y=(u,h)=>{const v=u.length;return`
      <div class="bg-gray-900 rounded-lg p-4 border border-gray-600" style="max-height: 300px; overflow-y: auto;">
        <div class="text-gray-400 text-sm mb-2">Adjacency Eigenvalues (${v} values):</div>
        <div class="font-mono text-sm text-gray-300">Computing eigenvalues for ${v}×${v} matrix...</div>
      </div>
    `},D=(u,h)=>{const v=u.length,b=v>0?2*h.length/v:0;return`
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Algebraic Connectivity (λ₂):</span>
          <span class="font-semibold text-blue-400 px-3 py-1 bg-gray-700 rounded">${Math.max(0,b-1).toFixed(6)}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Zero Eigenvalues:</span>
          <span class="font-semibold text-green-400 px-3 py-1 bg-gray-700 rounded">~1</span>
        </div>
      </div>
    `},X=(u,h)=>{const{isConnected:v}=T(u,h),b=v&&h.length===u.length-1;return`
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Is Tree:</span>
          <span class="font-semibold ${b?"text-green-400":"text-red-400"} px-3 py-1 bg-gray-700 rounded">${b?"Yes":"No"}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Is Connected:</span>
          <span class="font-semibold ${v?"text-green-400":"text-red-400"} px-3 py-1 bg-gray-700 rounded">${v?"Yes":"No"}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Has Cycles:</span>
          <span class="font-semibold ${b?"text-red-400":"text-green-400"} px-3 py-1 bg-gray-700 rounded">${b?"No":"Possibly"}</span>
        </div>
      </div>
    `},P=(u,h)=>{const v=L(u,h);return`
      <div class="bg-gray-900 rounded-lg p-4 border border-gray-600">
        <div class="text-gray-400 text-sm mb-2">Top 5 Nodes by Degree:</div>
        <div class="font-mono text-sm text-gray-300">${Object.entries(v).sort(([,C],[,M])=>M-C).slice(0,5).map(([C,M])=>`${C}: ${M}`).join("<br>")||"No nodes"}</div>
      </div>
    `},K=(u,h)=>{const{components:v}=T(u,h);return`
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${v.map((w,C)=>`
      <div class="bg-gray-700 rounded-lg p-3">
        <div class="text-gray-300 text-sm">Component ${C+1}</div>
        <div class="text-lg font-semibold text-purple-400">${w.length} nodes</div>
        <div class="text-xs text-gray-400 mt-1">${w.slice(0,5).join(", ")}${w.length>5?"...":""}</div>
      </div>
    `).join("")||'<div class="text-gray-500 italic">No components found</div>'}
      </div>
    `},te=(u,h)=>{const{isConnected:v}=T(u,h);return v?`
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
    `:`
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Graph Distances</div>
          <div class="text-lg font-semibold text-red-400">Disconnected Graph</div>
          <div class="text-xs text-gray-400 mt-2">Cannot compute distances for disconnected graphs</div>
        </div>
      `},Z=()=>{const u=document.getElementById("math-analysis-panel");u&&u.remove();const h=document.getElementById("graph-container");h&&(h.insertAdjacentHTML("beforeend",o()),["general","matrices","spectral","properties"].forEach(b=>Ne(b)),V(),p())},V=()=>{const h={id:`cell-${t++}`,type:"basic-info-default",title:"Basic Graph Information",content:H(),timestamp:Date.now(),tabId:"general"};n.push(h),re()},H=()=>{const{nodes:u,links:h}=m,v=u.length,b=h.length,w=h.some(ae=>ae.isDirected),C=w?v*(v-1):v*(v-1)/2,M=C>0?b/C:0,{components:k,isConnected:B}=T(u,h),O=k.length,R=L(u,h),se=Object.values(R),J=se.length>0?Math.min(...se):0,Q=se.length>0?Math.max(...se):0,ne=se.length>0?se.reduce((ae,le)=>ae+le,0)/se.length:0;return`
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
              <div class="text-2xl font-bold text-purple-400">${v}</div>
              <div class="text-xs text-gray-400">Vertices (|V|)</div>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 text-center border border-gray-600">
              <div class="text-2xl font-bold text-purple-400">${b}</div>
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
              <span class="font-semibold ${w?"text-orange-400":"text-green-400"} text-sm">
                ${w?"Directed":"Undirected"}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-300 text-sm">Connected:</span>
              <span class="font-semibold ${B?"text-green-400":"text-red-400"} text-sm">
                ${B?"Yes":"No"}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-300 text-sm">Components:</span>
              <span class="font-semibold text-blue-400 text-sm">${O}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-300 text-sm">Density:</span>
              <span class="font-semibold text-purple-400 text-sm">${M.toFixed(4)}</span>
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
              <div class="text-xl font-bold text-blue-400">${J}</div>
              <div class="text-xs text-gray-400">Min Degree</div>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 text-center border border-gray-600">
              <div class="text-xl font-bold text-blue-400">${ne.toFixed(1)}</div>
              <div class="text-xs text-gray-400">Avg Degree</div>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 text-center border border-gray-600">
              <div class="text-xl font-bold text-blue-400">${Q}</div>
              <div class="text-xs text-gray-400">Max Degree</div>
            </div>
          </div>
        </div>
      </div>
    `};return Z(),{togglePanel:g,updateAnalysis:d,isVisible:()=>e}},ce=m=>m?"True":"False",St=m=>{if(!m||!m.nodes||!m.links)throw new Error("Invalid graph data provided");const e=m.nodes,n=m.links,t=new Map;e.forEach((p,c)=>{t.set(p.id,c)});const s=[],o=[];n.forEach(p=>{const c=t.get(p.source),g=t.get(p.target);c!==void 0&&g!==void 0&&(s.push([c,g]),o.push(p.weight||1),p.isDirected||(s.push([g,c]),o.push(p.weight||1)))});const r=[];e.forEach(p=>{const c=[p.isSource?1:0,p.isSink?1:0,p.isTerminal?1:0,p.partition!==void 0?p.partition:0];r.push(c)});const a=n.some(p=>p.weight!==void 0&&p.weight!==1),i=e.some(p=>p.isSource||p.isSink||p.isTerminal),l=e.some(p=>p.partition!==void 0);return{nodeFeatures:r,edgeList:s,edgeWeights:o,hasWeights:a,hasSpecialNodes:i,hasPartitions:l,nodeIdToIndex:t,nodes:e,links:n}},$t=m=>{const e=St(m),{nodeFeatures:n,edgeList:t,edgeWeights:s,hasWeights:o,hasSpecialNodes:r,hasPartitions:a,nodes:i}=e,l=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19),p=`graph_${l}.py`,c=`graph_${l}.pt`;return{pythonCode:`#!/usr/bin/env python3
"""
GraphBench3000 Export - PyTorch Geometric Data
Generated: ${new Date().toISOString()}
Run this script to create ${c}
"""

import torch
from torch_geometric.data import Data

def create_and_save_graph():
    # Node features [isSource, isSink, isTerminal, partition]
    x = torch.tensor([
${n.map(d=>`        [${d.map(f=>f.toFixed(3)).join(", ")}]`).join(`,
`)}
    ], dtype=torch.float)
    
    # Edge connectivity
    edge_index = torch.tensor([
        [${t.map(d=>d[0]).join(", ")}],
        [${t.map(d=>d[1]).join(", ")}]
    ], dtype=torch.long)
    
    ${o?`# Edge weights/capacities
    edge_attr = torch.tensor([${s.map(d=>d.toFixed(3)).join(", ")}], dtype=torch.float)
    
    # Create PyG Data object
    data = Data(x=x, edge_index=edge_index, edge_attr=edge_attr)`:`# Create PyG Data object  
    data = Data(x=x, edge_index=edge_index)`}
    
    ${r?`# Special node indices
    data.source_nodes = torch.tensor([${i.map((d,f)=>d.isSource?f:-1).filter(d=>d!==-1).join(", ")}], dtype=torch.long)
    data.sink_nodes = torch.tensor([${i.map((d,f)=>d.isSink?f:-1).filter(d=>d!==-1).join(", ")}], dtype=torch.long)
    data.terminal_nodes = torch.tensor([${i.map((d,f)=>d.isTerminal?f:-1).filter(d=>d!==-1).join(", ")}], dtype=torch.long)
    `:""}${a?`# Node partitions
    data.partition = torch.tensor([${i.map(d=>d.partition||0).join(", ")}], dtype=torch.long)
    `:""}
    # Save as .pt file
    torch.save(data, '${c}')
    
    print(f"✅ Graph saved as {ptFilename}")
    print(f"📊 Nodes: {data.num_nodes}, Edges: {data.edge_index.size(1)}")
    ${o?'print(f"⚖️  Weighted edges: Yes")':'print(f"⚖️  Weighted edges: No")'}
    ${r?`print(f"🎯 Special nodes: {len(data.source_nodes) if hasattr(data, 'source_nodes') else 0} sources, {len(data.sink_nodes) if hasattr(data, 'sink_nodes') else 0} sinks")`:""}
    
    return data

if __name__ == "__main__":
    create_and_save_graph()
`,filename:p}},Ct=(m,e)=>{const n=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19),t=`dataset_${m.count}graphs_${n}.py`,s=m.useCurrentProperties?e:m.properties,o=s.has("directed"),r=s.has("weighted"),a=s.has("flow-network"),i=s.has("bipartite"),l=s.has("tree"),p=s.has("dag"),c=s.has("erdos-renyi");return{pythonCode:`#!/usr/bin/env python3
"""
GraphBench3000 Dataset Generator
Generated: ${new Date().toISOString()}
Creates ${m.count} graphs with specified properties
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
    ${i?`partitions = []
    partition_count = ${m.partitionCount}
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
        ])`:a?`# Flow network: designate sources and sinks
    source_count = min(${m.sourceCount}, num_nodes // 3)
    sink_count = min(${m.sinkCount}, num_nodes // 3)
    
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
        ])`:`# Regular graph: no special node designations
    for i in range(num_nodes):
        node_features.append([0.0, 0.0, 0.0, 0.0])`}
    
    x = torch.tensor(node_features, dtype=torch.float)
    
    # Generate edges based on graph type and density
    edges = set()
    
    ${l?`# Tree: generate spanning tree (n-1 edges)
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
        
        edges = set(tree_edges)`:c?`# Erdős-Renyi: generate ER graph then connect components (like generate_data.py)
    # Step 1: Generate Erdős-Renyi random graph
    for i in range(num_nodes):
        for j in range(i + 1 if not ${ce(o)} else 0, num_nodes):
            if i != j and random.random() < edge_density:
                if ${ce(o)}:
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
                elif not ${ce(o)} and edge[1] == node and not visited[edge[0]]:
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
        num_connect = ${m.erdosRenyiConnections}
        for i in range(len(components)):
            for connect_count in range(num_connect):
                other_indices = [j for j in range(len(components)) if j != i]
                j = random.choice(other_indices)
                
                node_a = random.choice(components[i])
                node_b = random.choice(components[j])
                
                if ${ce(o)}:
                    edges.add((node_a, node_b))
                else:
                    edges.add((min(node_a, node_b), max(node_a, node_b)))`:p?`# DAG: generate edges with topological ordering
    max_edges = int(num_nodes * (num_nodes - 1) * edge_density / 2)
    edge_count = 0
    
    for i in range(num_nodes):
        for j in range(i + 1, num_nodes):
            if edge_count < max_edges and random.random() < edge_density:
                edges.add((i, j))
                edge_count += 1`:i?`# Multi-partite: only edges between different partitions
    max_edges = int(num_nodes * edge_density)
    edge_count = 0
    
    for i in range(num_nodes):
        for j in range(i + 1, num_nodes):
            if partitions[i] != partitions[j] and edge_count < max_edges and random.random() < edge_density:
                edges.add((min(i, j), max(i, j)))
                edge_count += 1`:`# Regular graph: random edges based on density
    max_edges = int(num_nodes * (num_nodes - 1) * edge_density / (1 if ${ce(o)} else 2))
    edge_count = 0
    
    while edge_count < max_edges:
        src = random.randint(0, num_nodes - 1)
        dst = random.randint(0, num_nodes - 1)
        if src != dst:
            edge = (src, dst) if ${ce(o)} else (min(src, dst), max(src, dst))
            if edge not in edges:
                edges.add(edge)
                edge_count += 1`}
    
    # Convert edges to edge_index format
    if edges:
        edge_list = list(edges)
        ${!o&&!l&&!p?`# Add reverse edges for undirected graphs
        if not ${ce(o)}:
            edge_list += [(dst, src) for src, dst in edge_list]`:""}
        
        edge_index = torch.tensor(edge_list).t().contiguous()
    else:
        edge_index = torch.empty((2, 0), dtype=torch.long)
    
    # Generate edge attributes if weighted
    ${r?`edge_weights = []
    for _ in range(edge_index.size(1)):
        weight = random.uniform(${m.minWeight}, ${m.maxWeight})
        edge_weights.append(weight)
    edge_attr = torch.tensor(edge_weights, dtype=torch.float)
    
    data = Data(x=x, edge_index=edge_index, edge_attr=edge_attr)`:"data = Data(x=x, edge_index=edge_index)"}
    
    # Add special node information
    ${a?`if special_nodes['sources']:
        data.source_nodes = torch.tensor(special_nodes['sources'], dtype=torch.long)
    if special_nodes['sinks']:
        data.sink_nodes = torch.tensor(special_nodes['sinks'], dtype=torch.long)`:""}
    
    ${i?"data.partition = torch.tensor(partitions, dtype=torch.long)":""}
    
    return data

def generate_dataset():
    """Generate the complete dataset"""
    data_list = []
    
    for i in range(${m.count}):
        # Random parameters for this graph
        num_nodes = random.randint(${m.minNodes}, ${m.maxNodes})
        edge_density = random.uniform(${m.minDensity}, ${m.maxDensity})
        
        data = generate_random_graph(num_nodes, edge_density)
        data_list.append(data)
        
        if (i + 1) % 100 == 0:
            print(f"Generated {i + 1}/${m.count} graphs")
    
    return data_list

if __name__ == "__main__":
    print("Generating dataset with ${m.count} graphs...")
    print("Properties: ${Array.from(s).join(", ")}")
    dataset = generate_dataset()
    
    # Save the dataset
    torch.save(dataset, '${t.replace(".py",".pt")}')
    print(f"Dataset saved as ${t.replace(".py",".pt")}")
    print(f"Total graphs: {len(dataset)}")
    print(f"Node range: ${m.minNodes}-${m.maxNodes}")
    print(f"Density range: ${m.minDensity}-${m.maxDensity}")
`,filename:t}},qe=(m,e)=>{const n=new Blob([m],{type:"text/python"}),t=URL.createObjectURL(n),s=document.createElement("a");s.href=t,s.download=e,s.style.display="none",document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(t)};class It{constructor(){ie(this,"modal");ie(this,"currentGraphData",null);ie(this,"datasetProperties",new Set);this.modal=document.getElementById("export-modal"),this.initializeEventHandlers(),this.setupDatasetPropertyInteractions()}initializeEventHandlers(){const e=document.getElementById("export-btn"),n=document.getElementById("close-export-modal");e&&e.addEventListener("click",()=>this.openModal()),n&&n.addEventListener("click",()=>this.closeModal()),this.modal.addEventListener("click",o=>{o.target===this.modal&&this.closeModal()});const t=document.getElementById("export-current-graph"),s=document.getElementById("export-dataset");t&&t.addEventListener("click",()=>this.exportCurrentGraph()),s&&s.addEventListener("click",()=>this.exportDataset()),document.addEventListener("keydown",o=>{o.key==="Escape"&&!this.modal.classList.contains("hidden")&&this.closeModal()})}setupDatasetPropertyInteractions(){this.modal.querySelectorAll(".dataset-property-tag").forEach(t=>{t.addEventListener("click",()=>{var o;if(t.classList.contains("disabled"))return;const s=t.getAttribute("data-property");s&&(this.datasetProperties.has(s)?this.datasetProperties.delete(s):(this.datasetProperties.add(s),(((o=t.getAttribute("data-excludes"))==null?void 0:o.split(","))||[]).forEach(a=>{this.datasetProperties.delete(a.trim())})),this.updateDatasetPropertyTags())})});const n=document.getElementById("dataset-use-current");n&&n.addEventListener("change",()=>{n.checked&&(this.datasetProperties=new Set(q),this.updateDatasetPropertyTags(),this.syncWithCurrentSettings())})}syncWithCurrentSettings(){const e=document.getElementById("node-count"),n=document.getElementById("dataset-min-nodes"),t=document.getElementById("dataset-max-nodes");if(e&&n&&t){const A=parseInt(e.value);n.value=A.toString(),t.value=A.toString()}const s=document.getElementById("edge-probability"),o=document.getElementById("dataset-min-density"),r=document.getElementById("dataset-max-density");if(s&&o&&r){const A=parseFloat(s.value);o.value=A.toFixed(2),r.value=A.toFixed(2)}const a=document.getElementById("min-weight"),i=document.getElementById("max-weight"),l=document.getElementById("dataset-min-weight"),p=document.getElementById("dataset-max-weight");a&&i&&l&&p&&(l.value=a.value,p.value=i.value);const c=document.getElementById("component-count-value"),g=document.getElementById("dataset-component-count-value"),d=document.getElementById("dataset-component-count");if(c&&g&&d){const A=c.value;g.value=A,d.value=A}const f=document.getElementById("partition-count-value"),x=document.getElementById("dataset-partition-count-value"),y=document.getElementById("dataset-partition-count");if(f&&x&&y){const A=f.value;x.value=A,y.value=A}const S=document.getElementById("source-count"),E=document.getElementById("sink-count"),$=document.getElementById("dataset-source-count"),I=document.getElementById("dataset-sink-count");S&&$&&($.value=S.value),E&&I&&(I.value=E.value),console.log("Synced settings with current properties:",Array.from(q))}openModal(){this.modal.classList.remove("hidden"),document.body.style.overflow="hidden",this.datasetProperties=new Set(q),this.updateDatasetPropertyTags(),this.syncWithCurrentSettings()}closeModal(){this.modal.classList.add("hidden"),document.body.style.overflow=""}setCurrentGraphData(e){this.currentGraphData=e}exportCurrentGraph(){if(!this.currentGraphData){alert("No graph data available to export.");return}try{const e=$t(this.currentGraphData);qe(e.pythonCode,e.filename),this.showSuccessMessage(`Python script exported: ${e.filename}. Run it to create the .pt file!`)}catch(e){console.error("Export error:",e),alert(`Export failed: ${e instanceof Error?e.message:"Unknown error"}`)}}exportDataset(){try{const e=this.getDatasetConfig();if(e.count<=0||e.count>1e5){alert("Number of graphs must be between 1 and 100,000");return}if(e.minNodes<=0||e.maxNodes<=0||e.minNodes>e.maxNodes){alert("Invalid node count range");return}if(e.minDensity<0||e.maxDensity>1||e.minDensity>e.maxDensity){alert("Invalid density range (must be between 0 and 1)");return}const n=Ct(e,q);qe(n.pythonCode,n.filename),this.showSuccessMessage(`Dataset generation script created: ${n.filename}`)}catch(e){console.error("Dataset export error:",e),alert(`Dataset export failed: ${e instanceof Error?e.message:"Unknown error"}`)}}getDatasetConfig(){const e=document.getElementById("dataset-count"),n=document.getElementById("dataset-use-current"),t=document.getElementById("dataset-min-nodes"),s=document.getElementById("dataset-max-nodes"),o=document.getElementById("dataset-min-density"),r=document.getElementById("dataset-max-density"),a=document.getElementById("dataset-min-weight"),i=document.getElementById("dataset-max-weight"),l=document.getElementById("dataset-component-count-value"),p=document.getElementById("dataset-partition-count-value"),c=document.getElementById("dataset-source-count"),g=document.getElementById("dataset-sink-count");return{count:parseInt(e==null?void 0:e.value)||1e3,minNodes:parseInt(t==null?void 0:t.value)||20,maxNodes:parseInt(s==null?void 0:s.value)||20,minDensity:parseFloat(o==null?void 0:o.value)||.3,maxDensity:parseFloat(r==null?void 0:r.value)||.3,useCurrentProperties:(n==null?void 0:n.checked)||!1,properties:this.datasetProperties,minWeight:parseFloat(a==null?void 0:a.value)||1,maxWeight:parseFloat(i==null?void 0:i.value)||5,componentCount:parseInt(l==null?void 0:l.value)||2,partitionCount:parseInt(p==null?void 0:p.value)||2,sourceCount:parseInt(c==null?void 0:c.value)||1,sinkCount:parseInt(g==null?void 0:g.value)||1,erdosRenyiConnections:1}}showSuccessMessage(e){const n=document.createElement("div");n.className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[60] transform translate-x-0 transition-transform duration-300",n.textContent=e,document.body.appendChild(n),setTimeout(()=>{n.style.transform="translateX(100%)",setTimeout(()=>{document.body.removeChild(n)},300)},3e3)}updateDatasetPropertyTags(){const e=this.modal.querySelectorAll(".dataset-property-tag");console.log("Current active properties:",Array.from(q)),console.log("Dataset properties:",Array.from(this.datasetProperties)),e.forEach(n=>{var s;const t=n.getAttribute("data-property");t&&(console.log(`Checking property: ${t}, active: ${this.datasetProperties.has(t)}`),this.datasetProperties.has(t)?n.classList.add("active"):n.classList.remove("active"),(((s=n.getAttribute("data-excludes"))==null?void 0:s.split(","))||[]).some(a=>this.datasetProperties.has(a.trim()))?n.classList.add("disabled"):n.classList.remove("disabled"))}),this.updateDatasetConditionalControls()}updateDatasetConditionalControls(){const e=document.getElementById("dataset-weight-controls");e&&(this.datasetProperties.has("weighted")?e.classList.remove("hidden"):e.classList.add("hidden"));const n=document.getElementById("dataset-component-controls");n&&(this.datasetProperties.has("disconnected")?n.classList.remove("hidden"):n.classList.add("hidden"));const t=document.getElementById("dataset-multipartite-controls");t&&(this.datasetProperties.has("bipartite")?t.classList.remove("hidden"):t.classList.add("hidden"));const s=document.getElementById("dataset-flow-network-controls");s&&(this.datasetProperties.has("flow-network")?s.classList.remove("hidden"):s.classList.add("hidden"))}}const kt=()=>new It,Ue=document.querySelector("#app");if(!Ue)throw new Error("App element not found");Ue.innerHTML=Je();async function Tt(){try{await ct(),We();const m=Et(q);if(!m)throw new Error("Failed to initialize graph visualizer");const e=Mt(),n=kt();m.addGraphDataChangeCallback(s=>{e.updateAnalysis(s),n.setCurrentGraphData(s)}),st(),at(),it(m.generateGraph,m.solveAlgorithm);const t=document.getElementById("math-analysis-btn");t&&t.addEventListener("click",()=>{e.togglePanel()}),m.generateGraph(),console.log("Application initialized successfully")}catch(m){console.error("Error initializing application:",m)}}Tt();
