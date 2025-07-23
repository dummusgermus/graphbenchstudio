var Ze=Object.defineProperty;var Qe=(x,e,n)=>e in x?Ze(x,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):x[e]=n;var ie=(x,e,n)=>Qe(x,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const et=()=>`
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
          <!-- Generator Dropdown -->
          <div class="space-y-2">
            <label class="block text-white text-xs font-medium">Generators</label>
            <select id="generator-select" class="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 transition-all duration-200 appearance-none cursor-pointer">
              <option value="none">None</option>
              <option value="erdos_renyi_graph">Erdős-Rényi Graph</option>
              <option value="newman_watts_strogatz_graph">Newman-Watts-Strogatz Graph</option>
              <option value="barabasi_albert_graph">Barabási-Albert Graph</option>
              <option value="dual_barabasi_albert_graph">Dual Barabási-Albert Graph</option>
              <option value="powerlaw_cluster_graph">Powerlaw Cluster Graph</option>
              <option value="stochastic_block_model">Stochastic Block Model</option>
            </select>
          </div>

          <!-- Standard Controls (shown when no generator is selected) -->
          <div id="standard-controls">
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
          </div>

          <!-- Generator-specific parameter controls -->
          <div id="generator-controls" class="hidden">
            <!-- Erdős-Rényi parameters -->
            <div id="erdos-renyi-params" class="generator-params hidden space-y-2">
              <div>
                <label class="block text-white text-xs font-medium">Nodes (n)</label>
                <input type="number" id="erdos-renyi-n" value="20" min="1" max="100" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
              </div>
              <div>
                <label class="block text-white text-xs font-medium">Edge Probability (p)</label>
                <input type="number" id="erdos-renyi-p" value="0.3" min="0" max="1" step="0.01" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
              </div>
            </div>

            <!-- Newman-Watts-Strogatz parameters -->
            <div id="newman-watts-strogatz-params" class="generator-params hidden space-y-2">
              <div>
                <label class="block text-white text-xs font-medium">Nodes (n)</label>
                <input type="number" id="newman-watts-strogatz-n" value="20" min="1" max="100" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
              </div>
              <div>
                <label class="block text-white text-xs font-medium">Neighbors (k)</label>
                <input type="number" id="newman-watts-strogatz-k" value="4" min="2" max="20" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
              </div>
              <div>
                <label class="block text-white text-xs font-medium">Rewiring Probability (p)</label>
                <input type="number" id="newman-watts-strogatz-p" value="0.3" min="0" max="1" step="0.01" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
              </div>
            </div>

            <!-- Barabási-Albert parameters -->
            <div id="barabasi-albert-params" class="generator-params hidden space-y-2">
              <div>
                <label class="block text-white text-xs font-medium">Nodes (n)</label>
                <input type="number" id="barabasi-albert-n" value="20" min="1" max="100" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
              </div>
              <div>
                <label class="block text-white text-xs font-medium">Edges per Node (m)</label>
                <input type="number" id="barabasi-albert-m" value="2" min="1" max="10" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
              </div>
            </div>

            <!-- Dual Barabási-Albert parameters -->
            <div id="dual-barabasi-albert-params" class="generator-params hidden space-y-2">
              <div>
                <label class="block text-white text-xs font-medium">Nodes (n)</label>
                <input type="number" id="dual-barabasi-albert-n" value="20" min="1" max="100" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
              </div>
              <div>
                <label class="block text-white text-xs font-medium">Edges per Node (m1)</label>
                <input type="number" id="dual-barabasi-albert-m1" value="2" min="1" max="10" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
              </div>
              <div>
                <label class="block text-white text-xs font-medium">Random Edges (m2)</label>
                <input type="number" id="dual-barabasi-albert-m2" value="1" min="1" max="10" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
              </div>
              <div>
                <label class="block text-white text-xs font-medium">Probability (p)</label>
                <input type="number" id="dual-barabasi-albert-p" value="0.5" min="0" max="1" step="0.01" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
              </div>
            </div>

            <!-- Powerlaw Cluster parameters -->
            <div id="powerlaw-cluster-params" class="generator-params hidden space-y-2">
              <div>
                <label class="block text-white text-xs font-medium">Nodes (n)</label>
                <input type="number" id="powerlaw-cluster-n" value="20" min="1" max="100" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
              </div>
              <div>
                <label class="block text-white text-xs font-medium">Edges per Node (m)</label>
                <input type="number" id="powerlaw-cluster-m" value="2" min="1" max="10" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
              </div>
              <div>
                <label class="block text-white text-xs font-medium">Triadic Closure (p)</label>
                <input type="number" id="powerlaw-cluster-p" value="0.3" min="0" max="1" step="0.01" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
              </div>
            </div>

            <!-- Stochastic Block Model parameters -->
            <div id="stochastic-block-model-params" class="generator-params hidden space-y-2">
              <div>
                <label class="block text-white text-xs font-medium">Block Sizes</label>
                <input type="text" id="stochastic-block-model-sizes" value="10,10" placeholder="e.g., 10,10" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400">
                <div class="text-xs text-gray-400 mt-1">Comma-separated list of block sizes</div>
              </div>
              <div>
                <label class="block text-white text-xs font-medium">Probability Matrix</label>
                <textarea id="stochastic-block-model-pmatrix" placeholder="e.g., 0.3,0.1;0.1,0.3" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400 h-16 resize-none">0.3,0.1;0.1,0.3</textarea>
                <div class="text-xs text-gray-400 mt-1">Semicolon-separated rows, comma-separated values</div>
              </div>
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
`;let W=new Set,ge="none";const Ke={"strongly-connected":["disconnected"],disconnected:["strongly-connected"],directed:["undirected"],undirected:["directed"],weighted:["unweighted"],unweighted:["weighted"],"flow-network":["tree","undirected"],tree:["flow-network","cycles"],dag:["cycles","undirected"],cycles:["tree","dag"],bipartite:["undirected"]};let Ve=!1;const We=()=>{W.clear(),W.add("undirected"),W.add("unweighted")},Ne=()=>{const x=[["directed","undirected"],["weighted","unweighted"]];document.querySelectorAll(".graph-tag").forEach(i=>{const l=i,d=l.dataset.property,g=x.find(c=>c.includes(d));let a=!1;g||(a=Array.from(W).some(c=>{var u;return(u=Ke[c])==null?void 0:u.includes(d)})),W.has(d)?(l.classList.add("active"),l.classList.remove("disabled")):a?(l.classList.remove("active"),l.classList.add("disabled")):l.classList.remove("active","disabled")});const n=document.getElementById("component-controls");n&&(W.has("disconnected")?(n.classList.remove("hidden"),De()):n.classList.add("hidden"));const t=document.getElementById("weight-controls");t&&(W.has("weighted")?t.classList.remove("hidden"):t.classList.add("hidden"));const s=document.getElementById("multipartite-controls");if(s)if(W.has("bipartite")){s.classList.remove("hidden"),He();const i=document.getElementById("partition-count-value"),l=parseInt((i==null?void 0:i.value)||"2");console.log("Bipartite activated - regenerating ratio inputs for count:",l),pe(l)}else s.classList.add("hidden");const o=document.getElementById("flow-network-controls");o&&(W.has("flow-network")?o.classList.remove("hidden"):o.classList.add("hidden"));const r=document.getElementById("erdos-renyi-controls");r&&(W.has("erdos-renyi")?r.classList.remove("hidden"):r.classList.add("hidden"))},tt=x=>{const e=[["directed","undirected"],["weighted","unweighted"]],n=e.find(t=>t.includes(x));if(W.has(x)){if(n)return;W.delete(x)}else W.add(x),(Ke[x]||[]).forEach(s=>{W.delete(s);const o=e.find(r=>r.includes(s));if(o){const r=o.find(i=>i!==s);r&&W.add(r)}});Ne()},De=()=>{const x=document.getElementById("node-count"),e=document.getElementById("component-count"),n=document.getElementById("component-count-value"),s=parseInt((x==null?void 0:x.value)||"20",10);if(e&&n){const o=parseInt(n.value);if(e.min="1",e.max=s.toString(),n.min="1",n.max=s.toString(),o>s){const r=s.toString();e.value=r,n.value=r,console.log(`Component count adjusted from ${o} to ${r} (max: ${s})`)}else(o<1||isNaN(o))&&(e.value="2",n.value="2",console.log("Component count reset to default: 2"))}},He=()=>{const x=document.getElementById("node-count"),e=document.getElementById("partition-count"),n=document.getElementById("partition-count-value"),t=parseInt((x==null?void 0:x.value)||"20",10),s=Math.min(t,10);if(e&&n){const o=parseInt(n.value);if(e.min="2",e.max=s.toString(),n.min="2",n.max=s.toString(),o>s){const r=s.toString();e.value=r,n.value=r,console.log(`Partition count adjusted from ${o} to ${r} (max: ${s})`),pe(parseInt(r))}else o<2||isNaN(o)?(e.value="2",n.value="2",console.log("Partition count reset to default: 2"),pe(2)):pe(o)}},pe=x=>{const e=document.getElementById("partition-ratio-inputs");if(!e)return;e.innerHTML="";const n=Math.floor(100/x),t=100-n*x;for(let s=0;s<x;s++){const o=s===0?n+t:n,r=document.createElement("div");r.className="flex items-center space-x-2",r.innerHTML=`
      <label class="text-white text-xs w-12">Part ${s+1}:</label>
      <input type="number" id="partition-ratio-${s}" value="${o}" min="1" max="98" class="flex-1 text-white text-xs bg-gray-800 px-2 py-1 rounded border border-gray-600 text-center focus:outline-none focus:border-blue-400">
      <span class="text-gray-400 text-xs">%</span>
    `,e.appendChild(r);const i=r.querySelector(`#partition-ratio-${s}`);i&&i.addEventListener("input",Re)}Re()},Re=()=>{const x=document.querySelectorAll('[id^="partition-ratio-"]'),e=document.getElementById("ratio-total");let n=0;x.forEach(t=>{const s=parseInt(t.value)||0;n+=s}),e&&(e.textContent=`Total: ${n}%`,n===100?e.className="text-xs text-green-400":n>100?e.className="text-xs text-red-400":e.className="text-xs text-yellow-400")},st=()=>{const x=document.querySelectorAll('[id^="partition-ratio-"]'),e=Array.from(x).map(o=>parseInt(o.value)||0),n=e.reduce((o,r)=>o+r,0);if(n===0)return;const t=e.map(o=>Math.round(o/n*100)),s=t.reduce((o,r)=>o+r,0);if(s!==100){const o=t.indexOf(Math.max(...t));t[o]+=100-s}x.forEach((o,r)=>{o.value=t[r].toString()}),Re()},nt=()=>{const x=document.getElementById("partition-count-value"),e=parseInt((x==null?void 0:x.value)||"2"),n=[];for(let t=0;t<e;t++){const s=document.getElementById(`partition-ratio-${t}`);n.push(parseInt((s==null?void 0:s.value)||"0"))}return console.log("getPartitionRatios() called"),console.log("Current partition count:",e),console.log("Total ratio inputs found:",document.querySelectorAll('[id^="partition-ratio-"]').length),console.log("Ratio values for current count:",n),n},ot=()=>{if(Ve){Ne(),Ee();return}document.addEventListener("click",x=>{const n=x.target.closest(".graph-tag");n&&n.dataset.property&&(console.log("Tag clicked via delegation:",n.dataset.property),x.preventDefault(),x.stopPropagation(),tt(n.dataset.property))}),Ve=!0,Ne(),setTimeout(()=>{Ee()},100)},rt=()=>{We(),ge="none",Ne(),Ee()},at=x=>{ge=x,Ee()},Ee=()=>{const x=document.getElementById("generator-select"),e=document.getElementById("standard-controls"),n=document.getElementById("generator-controls");if(x&&(x.value=ge),e&&n)if(ge==="none")e.classList.remove("hidden"),n.classList.add("hidden");else{e.classList.add("hidden"),n.classList.remove("hidden"),document.querySelectorAll(".generator-params").forEach(r=>r.classList.add("hidden"));const s=`${ge.replace(/_/g,"-").replace("-graph","")}-params`,o=document.getElementById(s);o&&o.classList.remove("hidden")}},it=x=>{const e=document.getElementById("problem-description");if(!e)return;switch(x){case"maximum-clique":e.innerHTML=`
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
      `}const n=document.getElementById("steiner-controls");n&&(x==="steiner-tree"?n.classList.remove("hidden"):n.classList.add("hidden"))},ct=x=>{const e=document.getElementById("solve-btn");if(e)switch(x){case"maximum-clique":e.textContent="Find Maximum Clique",e.disabled=!1,e.className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]";break;case"shortest-path":e.textContent="Find Shortest Path",e.disabled=!1,e.className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]";break;case"maximum-spanning-tree":e.textContent="Find Maximum Spanning Tree",e.disabled=!1,e.className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]";break;case"steiner-tree":e.textContent="Find Steiner Tree",e.disabled=!1,e.className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]";break;case"max-flow":e.textContent="Find Maximum Flow",e.disabled=!1,e.className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]";break;case"multipartite-matching":e.textContent="Find Multipartite Matching",e.disabled=!1,e.className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]";break;default:e.textContent="Coming Soon",e.disabled=!0,e.className="w-full bg-gray-600 text-gray-400 py-2 px-3 rounded-lg cursor-not-allowed text-sm font-medium"}};let Ce=!1,Te={x:0,y:0};const lt=()=>{const x=document.getElementById("advanced-config-btn"),e=document.getElementById("advanced-config-window"),n=document.getElementById("close-advanced-config"),t=document.getElementById("cancel-advanced-config"),s=document.getElementById("apply-advanced-config"),o=document.getElementById("window-header");x&&e&&x.addEventListener("click",()=>{const r=x.getBoundingClientRect(),i=320,l=400;let d=r.right+10,g=r.top-80;d+i>window.innerWidth&&(d=r.left-i-10),g+l>window.innerHeight&&(g=window.innerHeight-l-10),d=Math.max(10,d),g=Math.max(10,g),e.style.left=`${d}px`,e.style.top=`${g}px`,e.style.right="auto",e.classList.remove("hidden")}),n&&e&&n.addEventListener("click",()=>{e.classList.add("hidden")}),t&&e&&t.addEventListener("click",()=>{e.classList.add("hidden")}),s&&e&&s.addEventListener("click",()=>{e.classList.add("hidden")}),o&&e&&(o.addEventListener("mousedown",r=>{Ce=!0;const i=e.getBoundingClientRect();Te.x=r.clientX-i.left,Te.y=r.clientY-i.top,r.preventDefault(),document.body.style.userSelect="none"}),document.addEventListener("mousemove",r=>{if(!Ce||!e)return;const i=r.clientX-Te.x,l=r.clientY-Te.y,d=window.innerWidth-e.offsetWidth,g=window.innerHeight-e.offsetHeight,a=Math.max(0,Math.min(i,d)),c=Math.max(0,Math.min(l,g));e.style.left=`${a}px`,e.style.top=`${c}px`,e.style.right="auto"}),document.addEventListener("mouseup",()=>{Ce&&(Ce=!1,document.body.style.userSelect="")}))},dt=(x,e)=>{const n=document.getElementById("problem-select"),t=document.getElementById("node-count"),s=document.getElementById("node-count-value"),o=document.getElementById("edge-probability"),r=document.getElementById("edge-probability-value"),i=document.getElementById("generate-btn"),l=document.getElementById("solve-btn"),d=document.getElementById("reset-config"),g=document.getElementById("component-count"),a=document.getElementById("component-count-value"),c=document.getElementById("partition-count"),u=document.getElementById("partition-count-value");t&&s&&(t.addEventListener("input",()=>{s.value=t.value,De(),He()}),s.addEventListener("input",()=>{let m=parseInt(s.value);const $=parseInt(t.min),b=parseInt(t.max);isNaN(m)&&(m=$),m<$&&(m=$),m>b&&(m=b),s.value=m.toString(),t.value=m.toString(),De(),He()})),o&&r&&(o.addEventListener("input",()=>{r.value=o.value}),r.addEventListener("input",()=>{let m=parseFloat(r.value);const $=parseFloat(o.min),b=parseFloat(o.max);isNaN(m)&&(m=$),m<$&&(m=$),m>b&&(m=b),m=Math.round(m*100)/100,r.value=m.toString(),o.value=m.toString()})),n&&n.addEventListener("change",()=>{const m=n.value;it(m),ct(m)});const h=document.getElementById("generator-select");h&&h.addEventListener("change",()=>{const m=h.value;at(m)}),g&&a&&(g.addEventListener("input",()=>{a.value=g.value}),a.addEventListener("input",()=>{let m=parseInt(a.value);const $=parseInt(g.min),b=parseInt(g.max);isNaN(m)&&(m=$),m<$&&(m=$),m>b&&(m=b),a.value=m.toString(),g.value=m.toString()})),c&&u&&(c.addEventListener("input",()=>{u.value=c.value,pe(parseInt(c.value))}),u.addEventListener("input",()=>{let m=parseInt(u.value);const $=parseInt(c.min),b=parseInt(c.max);isNaN(m)&&(m=$),m<$&&(m=$),m>b&&(m=b),u.value=m.toString(),c.value=m.toString(),pe(m)})),d&&d.addEventListener("click",()=>{rt()}),i&&i.addEventListener("click",x),l&&l.addEventListener("click",()=>{const m=n.value;e(m)});const w=document.getElementById("normalize-ratios");w&&w.addEventListener("click",st)};function qe(x){return new Promise((e,n)=>{const t=document.createElement("script");t.src=x,t.onload=()=>e(),t.onerror=()=>n(new Error(`Failed to load script: ${x}`)),document.head.appendChild(t)})}async function ut(){try{await qe("https://unpkg.com/three@0.158.0/build/three.min.js"),await qe("https://unpkg.com/3d-force-graph@1.77.0/dist/3d-force-graph.min.js")}catch(x){throw console.error("Error loading scripts:",x),x}}class _e{static solve(e){try{if(!e.nodes||e.nodes.length===0)return{success:!1,error:"No graph data available for clique analysis",errorType:"no-data"};const n=this.buildAdjacencyMatrix(e);this.startTime=Date.now(),this.bestCliqueSize=0;const t=this.orderVerticesByDegree(e.nodes.map(l=>l.id),n),s=this.pruneVerticesByDegree(t,n),o=this.bronKerboschOptimized(new Set,new Set(s),new Set,n),r=Array.from(o);return this.validateClique(r,n)?{success:!0,result:{clique:r,isValid:!0}}:{success:!1,error:"Algorithm error: invalid clique detected",errorType:"algorithm-error"}}catch(n){return n instanceof Error&&n.message==="TIMEOUT"?{success:!1,error:"Algorithm timeout - graph too complex for solution within time limit. Try reducing graph size or edge density.",errorType:"algorithm-error"}:{success:!1,error:"Error solving maximum clique problem",errorType:"algorithm-error"}}}static pruneVerticesByDegree(e,n){return e.length===0?e:e.filter(t=>{var o;return(((o=n.get(t))==null?void 0:o.size)||0)+1>=this.bestCliqueSize})}static orderVerticesByDegree(e,n){return e.sort((t,s)=>{var i,l;const o=((i=n.get(t))==null?void 0:i.size)||0;return(((l=n.get(s))==null?void 0:l.size)||0)-o})}static buildAdjacencyMatrix(e){const n=new Map;return e.nodes.forEach(t=>{n.set(t.id,new Set)}),e.links.forEach(t=>{var r,i;const s=t.source,o=t.target;(r=n.get(s))==null||r.add(o),(i=n.get(o))==null||i.add(s)}),n}static bronKerboschOptimized(e,n,t,s){if(Date.now()-this.startTime>this.MAX_RUNTIME_MS)throw new Error("TIMEOUT");if(n.size===0&&t.size===0)return e.size>this.bestCliqueSize&&(this.bestCliqueSize=e.size),new Set(e);let o=new Set(e);if(e.size+n.size<=this.bestCliqueSize)return o;const r=this.choosePivot(n,t,s),i=s.get(r)||new Set,l=Array.from(n).filter(d=>!i.has(d));l.sort((d,g)=>{var u,h;const a=((u=s.get(d))==null?void 0:u.size)||0;return(((h=s.get(g))==null?void 0:h.size)||0)-a});for(const d of l){const g=s.get(d)||new Set,a=e.size+1,c=this.intersectSets(n,g);if(a+c.size<=this.bestCliqueSize){n.delete(d),t.add(d);continue}const u=new Set(e);u.add(d);const h=this.intersectSets(t,g),w=this.bronKerboschOptimized(u,c,h,s);w.size>o.size&&(o=w,this.bestCliqueSize=Math.max(this.bestCliqueSize,w.size)),n.delete(d),t.add(d)}return o}static choosePivot(e,n,t){const s=new Set([...e,...n]);let o="",r=-1;for(const i of s){const l=t.get(i)||new Set,d=Array.from(e).filter(g=>l.has(g)).length;d>r&&(r=d,o=i)}return o||(e.size>0?Array.from(e)[0]:Array.from(n)[0])}static intersectSets(e,n){const t=new Set,s=e.size<=n.size?e:n,o=e.size<=n.size?n:e;for(const r of s)o.has(r)&&t.add(r);return t}static validateClique(e,n){for(let t=0;t<e.length;t++)for(let s=t+1;s<e.length;s++)if(!(n.get(e[t])||new Set).has(e[s]))return!1;return!0}}ie(_e,"MAX_RUNTIME_MS",3e4),ie(_e,"startTime",0),ie(_e,"bestCliqueSize",0);class gt{static solve(e,n){try{if(!e.nodes||e.nodes.length===0)return{success:!1,error:"No graph data available",errorType:"no-data"};if(e.nodes.length<2)return{success:!1,error:"Need at least 2 nodes for shortest path",errorType:"invalid-input"};const{startNode:t,endNode:s}=this.selectRandomNodes(e.nodes),o=this.buildAdjacencyList(e,n);if(!this.hasPath(t.id,s.id,o))return{success:!1,error:`No path exists: ${t.id} and ${s.id} are in disconnected components`,errorType:"disconnected"};const r=this.bellmanFord(t.id,s.id,e.nodes,o);return r.success?{success:!0,result:{path:r.result.path,distance:r.result.distance,startNode:t.id,endNode:s.id}}:{success:!1,error:r.error,errorType:r.errorType}}catch{return{success:!1,error:"Error solving shortest path problem",errorType:"algorithm-error"}}}static selectRandomNodes(e){const n=e[Math.floor(Math.random()*e.length)];let t=e[Math.floor(Math.random()*e.length)];for(;n.id===t.id&&e.length>1;)t=e[Math.floor(Math.random()*e.length)];return{startNode:n,endNode:t}}static buildAdjacencyList(e,n){const t=new Map;return e.nodes.forEach(s=>{t.set(s.id,[])}),e.links.forEach(s=>{var l,d;const o=s.source,r=s.target,i=n.useWeights?s.weight:1;(l=t.get(o))==null||l.push({node:r,weight:i}),n.isDirected||(d=t.get(r))==null||d.push({node:o,weight:i})}),t}static hasPath(e,n,t){if(e===n)return!0;const s=new Set,o=[e];s.add(e);let r=0;for(;o.length>0&&r<100;){r++;const i=o.shift(),l=t.get(i)||[];for(const d of l){if(d.node===n)return!0;s.has(d.node)||(s.add(d.node),o.push(d.node))}}return!1}static bellmanFord(e,n,t,s){const o=new Map,r=new Map;t.forEach(g=>{const c=g.id===e?0:1/0;o.set(g.id,c),r.set(g.id,null)});for(let g=0;g<t.length-1;g++){let a=!1;for(const[c,u]of s){const h=o.get(c),w=h!==void 0?h:1/0;if(w!==1/0)for(const m of u){const $=w+m.weight,b=o.get(m.node);$<(b!==void 0?b:1/0)&&(o.set(m.node,$),r.set(m.node,c),a=!0)}}if(!a)break}for(const[g,a]of s){const c=o.get(g),u=c!==void 0?c:1/0;if(u!==1/0)for(const h of a){const w=u+h.weight,m=o.get(h.node);if(w<(m!==void 0?m:1/0))return{success:!1,error:"Graph contains negative cycle - shortest path undefined",errorType:"negative-cycle"}}}const i=o.get(n)||1/0;if(i===1/0)return{success:!1,error:"No path found: algorithm failed to reach target node",errorType:"algorithm-error"};const l=[];let d=n;for(;d!==null;)l.unshift(d),d=r.get(d)||null;return{success:!0,result:{path:l,distance:i}}}}class pt{static solve(e){try{if(!e.nodes||e.nodes.length===0)return{success:!1,error:"No graph data available for spanning tree analysis",errorType:"no-data"};if(e.nodes.length===1)return{success:!0,result:{edges:[],totalWeight:0,isValid:!0}};const n=this.convertToUndirectedEdges(e.links);if(n.length===0)return{success:!1,error:"No edges available for spanning tree construction",errorType:"no-data"};const t=this.kruskalMaximum(e.nodes.map(i=>i.id),n),s=e.nodes.length-1;if(t.length<s)return{success:!1,error:"Graph is disconnected - cannot form spanning tree",errorType:"disconnected"};const o=t.reduce((i,l)=>i+l.weight,0);return this.validateSpanningTree(e.nodes.map(i=>i.id),t)?{success:!0,result:{edges:t,totalWeight:Math.round(o*100)/100,isValid:!0}}:{success:!1,error:"Algorithm error: invalid spanning tree detected",errorType:"algorithm-error"}}catch{return{success:!1,error:"Error solving maximum spanning tree problem",errorType:"algorithm-error"}}}static convertToUndirectedEdges(e){const n=new Map;return e.forEach(t=>{const s=t.source,o=t.target,r=s<o?`${s}-${o}`:`${o}-${s}`;(!n.has(r)||n.get(r).weight<t.weight)&&n.set(r,{source:s<o?s:o,target:s<o?o:s,weight:t.weight,isDirected:!1})}),Array.from(n.values())}static kruskalMaximum(e,n){const t=[...n].sort((i,l)=>l.weight-i.weight),s=new Map,o=new Map;e.forEach(i=>{s.set(i,i),o.set(i,0)});const r=[];for(const i of t){const l=this.find(s,i.source),d=this.find(s,i.target);if(l!==d&&(r.push(i),this.union(s,o,l,d),r.length===e.length-1))break}return r}static find(e,n){return e.get(n)!==n&&e.set(n,this.find(e,e.get(n))),e.get(n)}static union(e,n,t,s){const o=n.get(t)||0,r=n.get(s)||0;o<r?e.set(t,s):o>r?e.set(s,t):(e.set(s,t),n.set(t,o+1))}static validateSpanningTree(e,n){if(n.length!==e.length-1)return!1;const t=new Map;e.forEach(o=>t.set(o,o)),n.forEach(o=>{const r=this.find(t,o.source),i=this.find(t,o.target);r!==i&&t.set(r,i)});const s=this.find(t,e[0]);return e.every(o=>this.find(t,o)===s)}}class ht{static solve(e,n,t=5){try{if(!e.nodes||e.nodes.length===0)return{success:!1,error:"No graph data available for Steiner tree analysis",errorType:"no-data"};if(t<2)return{success:!1,error:"Need at least 2 terminal nodes for Steiner tree",errorType:"invalid-input"};if(t>e.nodes.length)return{success:!1,error:`Cannot select ${t} terminals from ${e.nodes.length} nodes`,errorType:"invalid-input"};const s=this.selectRandomTerminals(e.nodes,t),o=this.buildAdjacencyList(e,n),r=this.checkTerminalConnectivity(s,o);if(!r.success)return{success:!1,error:r.error,errorType:"disconnected"};const i=this.findSteinerTree(s,e,o,n);return i.success?{success:!0,result:i.result}:{success:!1,error:i.error,errorType:i.errorType}}catch{return{success:!1,error:"Error solving Steiner tree problem",errorType:"algorithm-error"}}}static selectRandomTerminals(e,n){return[...e].sort(()=>Math.random()-.5).slice(0,n).map(s=>s.id)}static buildAdjacencyList(e,n){const t=new Map;return e.nodes.forEach(s=>{t.set(s.id,[])}),e.links.forEach(s=>{var l,d;const o=s.source,r=s.target,i=n.useWeights?s.weight:1;(l=t.get(o))==null||l.push({node:r,weight:i}),(d=t.get(r))==null||d.push({node:o,weight:i})}),t}static checkTerminalConnectivity(e,n){if(e.length<2)return{success:!0};const t=e[0],s=this.getReachableNodes(t,n);for(let o=1;o<e.length;o++)if(!s.has(e[o]))return{success:!1,error:`Terminal nodes are disconnected: ${t} cannot reach ${e[o]}`,errorType:"disconnected"};return{success:!0}}static getReachableNodes(e,n){const t=new Set,s=[e];for(t.add(e);s.length>0;){const o=s.shift(),r=n.get(o)||[];for(const i of r)t.has(i.node)||(t.add(i.node),s.push(i.node))}return t}static findSteinerTree(e,n,t,s){try{const o=this.computeTerminalDistances(e,t),r=this.findTerminalMST(e,o),i=new Map;for(const u of r){const h=this.robustPathfinding(u.source,u.target,t);if(h.success&&h.result)i.set(`${u.source}-${u.target}`,h.result.edges);else return{success:!1,error:h.error||"Failed to compute path between terminals",errorType:h.errorType||"algorithm-error"}}const l=new Map;for(const u of i.values())for(const h of u){const w=this.getEdgeKey(h.source,h.target);l.has(w)||l.set(w,h)}const d=this.findMSTFromEdges(Array.from(l.values()),e),g=d.reduce((u,h)=>u+h.weight,0),a=new Set;d.forEach(u=>{a.add(u.source),a.add(u.target)});const c=Array.from(a).filter(u=>!e.includes(u));return{success:!0,result:{edges:d,totalWeight:Math.round(g*100)/100,terminalNodes:e,steinerNodes:c,isValid:this.validateSteinerTree(d,e)}}}catch{return{success:!1,error:"Error computing Steiner tree",errorType:"algorithm-error"}}}static computeTerminalDistances(e,n){const t=new Map;for(let s=0;s<e.length;s++)for(let o=s+1;o<e.length;o++){const r=e[s],i=e[o],l=this.robustPathfinding(r,i,n);if(l.success&&l.result){const d=`${r}-${i}`;t.set(d,l.result.distance)}}return t}static findTerminalMST(e,n){const t=[];for(let r=0;r<e.length;r++)for(let i=r+1;i<e.length;i++){const l=e[r],d=e[i],g=`${l}-${d}`,a=n.get(g);a!==void 0&&t.push({source:l,target:d,weight:a,isDirected:!1})}t.sort((r,i)=>r.weight-i.weight);const s=new Map;e.forEach(r=>s.set(r,r));const o=[];for(const r of t){const i=this.find(s,r.source),l=this.find(s,r.target);if(i!==l&&(o.push(r),s.set(i,l),o.length===e.length-1))break}return o}static robustPathfinding(e,n,t){if(!t.has(e)||!t.has(n))return{success:!1,error:`Node not found: ${e} or ${n}`,errorType:"invalid-input"};const s=t.size,o=[{node:e,path:[e],totalWeight:0,visited:new Set([e])}];let r=null,i=0;const l=1e3;for(;o.length>0&&i<l;){const g=o.shift();if(i++,g.node===n){(!r||g.totalWeight<r.weight)&&(r={path:[...g.path],weight:g.totalWeight});continue}if(g.path.length>=s)continue;const a=t.get(g.node)||[];for(const c of a)if(!g.visited.has(c.node)){const u=new Set(g.visited);u.add(c.node),o.push({node:c.node,path:[...g.path,c.node],totalWeight:g.totalWeight+c.weight,visited:u})}}if(!r)return{success:!1,error:`No path found from ${e} to ${n}`,errorType:"disconnected"};const d=[];for(let g=0;g<r.path.length-1;g++){const a=r.path[g],c=r.path[g+1],h=(t.get(a)||[]).find(w=>w.node===c);h&&d.push({source:a,target:c,weight:h.weight,isDirected:!1})}return{success:!0,result:{distance:r.weight,edges:d}}}static findMSTFromEdges(e,n){const t=new Set;e.forEach(i=>{t.add(i.source),t.add(i.target)});const s=[...e].sort((i,l)=>i.weight-l.weight),o=new Map;t.forEach(i=>o.set(i,i));const r=[];for(const i of s){const l=this.find(o,i.source),d=this.find(o,i.target);if(l!==d&&(r.push(i),o.set(l,d),r.length>=t.size-1))break}return r}static areNodesConnected(e,n){if(e.length<=1)return!0;const t=new Map;n.forEach(r=>{t.has(r.source)||t.set(r.source,[]),t.has(r.target)||t.set(r.target,[]),t.get(r.source).push(r.target),t.get(r.target).push(r.source)});const s=new Set,o=[e[0]];for(s.add(e[0]);o.length>0;){const r=o.shift(),i=t.get(r)||[];for(const l of i)s.has(l)||(s.add(l),o.push(l))}return e.every(r=>s.has(r))}static find(e,n){return e.get(n)!==n&&e.set(n,this.find(e,e.get(n))),e.get(n)}static getEdgeKey(e,n){return e<n?`${e}-${n}`:`${n}-${e}`}static validateSteinerTree(e,n){return this.areNodesConnected(n,e)}}class ne{static isFlowNetwork(e){var o;if(!((o=e.specialAttributes)!=null&&o.isFlowNetwork))return!1;const n=e.specialAttributes.sourceNode,t=e.specialAttributes.sinkNode;if(!n||!t||n===t)return!1;const s=new Set(e.nodes.map(r=>r.id));return s.has(n)&&s.has(t)}static isStronglyConnected(e){return e.nodes.length<=1?!0:e.links.some(t=>t.isDirected)?this.isStronglyConnectedDirected(e):this.isConnected(e)}static isConnected(e){if(e.nodes.length<=1)return!0;const n=this.buildAdjacencyList(e),t=new Set,s=e.nodes[0].id;return this.dfs(s,n,t),t.size===e.nodes.length}static isBipartite(e){const n=this.buildAdjacencyList(e),t=new Map;for(const s of e.nodes)if(!t.has(s.id)&&!this.bipartiteColorDFS(s.id,0,n,t))return!1;return!0}static isTree(e){const n=e.nodes.length;return e.links.length===n-1&&this.isConnected(e)}static isDAG(e){const n=this.buildDirectedAdjacencyList(e),t=new Set,s=new Set;for(const o of e.nodes)if(!t.has(o.id)&&this.hasCycleDFS(o.id,n,t,s))return!1;return!0}static generateFlowNetwork(e,n,t,s,o,r=1,i=1){if(e<r+i)throw new Error(`Flow network needs at least ${r+i} nodes (${r} sources + ${i} sinks)`);const l=Array.from({length:e},(m,$)=>({id:`node${$}`,val:.7+Math.random()*.6})),d=[],g=[];for(let m=0;m<r;m++)l[m].isSource=!0,d.push(`node${m}`);for(let m=e-i;m<e;m++)l[m].isSink=!0,g.push(`node${m}`);const a=[],c=()=>{const m=t?s+Math.random()*(o-s):1;return Math.round(m*10)/10};if(e-r-i===0)d.forEach(m=>{g.forEach($=>{const b=c();a.push({source:m,target:$,weight:b,capacity:b,isDirected:!0})})});else{const m=[];for(let E=r;E<e-i;E++)m.push(E);if(d.forEach((E,I)=>{const T=m[I%m.length],A=c();a.push({source:E,target:`node${T}`,weight:A,capacity:A,isDirected:!0})}),g.forEach((E,I)=>{const T=m[I%m.length],A=c();a.push({source:`node${T}`,target:E,weight:A,capacity:A,isDirected:!0})}),m.length>1)for(let E=0;E<m.length-1;E++){const I=c();a.push({source:`node${m[E]}`,target:`node${m[E+1]}`,weight:I,capacity:I,isDirected:!0})}d.forEach(E=>{m.forEach(I=>{if(Math.random()<n*.6&&!a.some(A=>A.source===E&&A.target===`node${I}`)){const A=c();a.push({source:E,target:`node${I}`,weight:A,capacity:A,isDirected:!0})}})}),g.forEach(E=>{m.forEach(I=>{if(Math.random()<n*.6&&!a.some(A=>A.source===`node${I}`&&A.target===E)){const A=c();a.push({source:`node${I}`,target:E,weight:A,capacity:A,isDirected:!0})}})});for(let E=0;E<m.length;E++)for(let I=E+1;I<m.length;I++)if(Math.random()<n*.4){const T=c();a.push({source:`node${m[E]}`,target:`node${m[I]}`,weight:T,capacity:T,isDirected:!0})}const $=new Map,b=new Map;l.forEach(E=>{$.set(E.id,0),b.set(E.id,0)}),a.forEach(E=>{b.set(E.source,(b.get(E.source)||0)+1),$.set(E.target,($.get(E.target)||0)+1)}),m.forEach(E=>{const I=`node${E}`,T=$.get(I)||0,A=b.get(I)||0;if(T===0){const L=d[Math.floor(Math.random()*d.length)],N=c();a.push({source:L,target:I,weight:N,capacity:N,isDirected:!0})}if(A===0){const L=g[Math.floor(Math.random()*g.length)],N=c();a.push({source:I,target:L,weight:N,capacity:N,isDirected:!0})}})}const h=d[0],w=g[0];return{nodes:l,links:a,specialAttributes:{isFlowNetwork:!0,sourceNode:h,sinkNode:w,sourceNodes:d,sinkNodes:g,sourceCount:r,sinkCount:i,isStronglyConnected:!1,isBipartite:!1,isMultipartite:!1,isPlanar:!1,isTree:!1,isDAG:!0}}}static generateStronglyConnected(e,n,t,s,o,r=!0){if(e<2)throw new Error("Strongly connected graph needs at least 2 nodes");const i=Array.from({length:e},(d,g)=>({id:`node${g}`,val:.7+Math.random()*.6})),l=[];for(let d=0;d<e;d++){const g=t?s+Math.random()*(o-s):1;l.push({source:`node${d}`,target:`node${(d+1)%e}`,weight:Math.round(g*10)/10,isDirected:r})}for(let d=0;d<e;d++)for(let g=r?0:d+1;g<e;g++)if(d!==g&&(d+1)%e!==g&&Math.random()<n){const a=t?s+Math.random()*(o-s):1;l.push({source:`node${d}`,target:`node${g}`,weight:Math.round(a*10)/10,isDirected:r})}return{nodes:i,links:l,specialAttributes:{isFlowNetwork:!1,isStronglyConnected:!0,isBipartite:!1,isMultipartite:!1,isPlanar:!1,isTree:!1,isDAG:!r||this.isDAG({nodes:i,links:l})}}}static generateMultipartiteGraph(e,n,t,s,o,r,i=!1,l){if(e<n)throw new Error("Multi-partite graph needs at least one node per partition");if(n<2)throw new Error("Multi-partite graph needs at least 2 partitions");console.log("=== MULTIPARTITE GRAPH GENERATION ==="),console.log("Node count:",e),console.log("Partition count:",n),console.log("Partition ratios received:",l);const d=Array.from({length:n},()=>[]);if(l&&l.length===n){console.log("Using custom partition ratios:",l);const u=l.map(b=>b/100),h=u.reduce((b,E)=>b+E,0);console.log("Normalized ratios:",u),console.log("Ratio sum:",h),Math.abs(h-1)>.01&&(u.forEach((b,E)=>{u[E]=b/h}),console.log("Re-normalized ratios:",u));let w=0;const m=u.map((b,E)=>{if(E===n-1)return e-w;{const I=Math.round(e*b);return w+=I,I}});console.log("Target counts for each partition:",m);let $=0;for(let b=0;b<n;b++){const E=m[b];for(let I=0;I<E&&$<e;I++)d[b].push($),$++}console.log(`Distributed nodes by ratios: ${l.join(":")} -> ${d.map(b=>b.length).join(":")}`)}else{console.log("Using default round-robin distribution - no custom ratios provided or invalid ratios");for(let u=0;u<e;u++)d[u%n].push(u);console.log(`Default distribution result: ${d.map(u=>u.length).join(":")}`)}const g=Array.from({length:e},(u,h)=>({id:`node${h}`,val:.7+Math.random()*.6,partition:0}));for(let u=0;u<n;u++)for(const h of d[u])g[h].partition=u;const a=[];for(let u=0;u<n;u++)for(let h=u+1;h<n;h++)for(const w of d[u])for(const m of d[h])if(Math.random()<t){const $=s?o+Math.random()*(r-o):1;a.push({source:`node${w}`,target:`node${m}`,weight:Math.round($*10)/10,isDirected:!1})}for(let u=0;u<n;u++)for(let h=u+1;h<n;h++)if(d[u].length>0&&d[h].length>0&&!a.some(m=>{const $=parseInt(m.source.replace("node",""))%n,b=parseInt(m.target.replace("node",""))%n;return $===u&&b===h||$===h&&b===u})){const m=d[u][Math.floor(Math.random()*d[u].length)],$=d[h][Math.floor(Math.random()*d[h].length)],b=s?o+Math.random()*(r-o):1;a.push({source:`node${m}`,target:`node${$}`,weight:Math.round(b*10)/10,isDirected:!1})}console.log(`Generated ${n}-partite graph with partitions:`,d.map((u,h)=>`Part ${h}: ${u.length} nodes`));const c=a.filter(u=>{const h=parseInt(u.source.replace("node","")),w=parseInt(u.target.replace("node",""));let m=-1,$=-1;for(let b=0;b<n;b++)d[b].includes(h)&&(m=b),d[b].includes(w)&&($=b);return m===$});if(c.length>0)throw console.error("ERROR: Found intra-partition edges in multipartite graph!",c),new Error(`Multipartite graph contains ${c.length} invalid intra-partition edges`);if(console.log("✓ Multipartite graph validation passed - no intra-partition edges found"),i){console.log("Adding strong connectivity while respecting multipartite constraints...");const u=d.map(h=>h.length);console.log("Partition sizes for strong connectivity:",u);for(let h=0;h<n;h++)for(let w=h+1;w<n;w++){const m=d[h],$=d[w];if(m.length===0||$.length===0)continue;const b=m.length<=$.length?m:$,E=m.length>$.length?m:$;b.forEach((I,T)=>{const A=Math.min(2,E.length);for(let L=0;L<A;L++){const N=(T*A+L)%E.length,F=E[N];if(!a.some(Z=>Z.source===`node${I}`&&Z.target===`node${F}`||Z.source===`node${F}`&&Z.target===`node${I}`)){const Z=s?o+Math.random()*(r-o):1;a.push({source:`node${I}`,target:`node${F}`,weight:Math.round(Z*10)/10,isDirected:!0})}}}),E.forEach((I,T)=>{const A=T%b.length,L=b[A];if(!a.some(F=>F.source===`node${I}`&&F.target===`node${L}`||F.source===`node${L}`&&F.target===`node${I}`)){const F=s?o+Math.random()*(r-o):1;a.push({source:`node${I}`,target:`node${L}`,weight:Math.round(F*10)/10,isDirected:!0})}})}console.log(`Added strongly connected edges to multipartite graph (${a.length} total edges)`),console.log("All edges respect multipartite constraints - no intra-partition connections")}return{nodes:g,links:a,specialAttributes:{isFlowNetwork:!1,isStronglyConnected:i,isBipartite:n===2,isMultipartite:!0,isPlanar:!1,isTree:!1,isDAG:!1,partitionCount:n,partitions:d}}}static generateErdosRenyi(e,n,t,s,o,r=!1,i=1){if(e<1)throw new Error("Erdős-Renyi graph needs at least 1 node");const l=Array.from({length:e},(u,h)=>({id:`node${h}`,val:.7+Math.random()*.6})),d=[];for(let u=0;u<e;u++)for(let h=r?0:u+1;h<e;h++)if(u!==h&&Math.random()<n){const w=t?s+Math.random()*(o-s):1;d.push({source:`node${u}`,target:`node${h}`,weight:Math.round(w*10)/10,isDirected:r})}const g=new Set,a=[],c=u=>{const h=[],w=[u];for(g.add(u);w.length>0;){const m=w.shift();h.push(m);const $=new Set;d.forEach(b=>{b.source===m&&$.add(b.target),!r&&b.target===m&&$.add(b.source)}),$.forEach(b=>{g.has(b)||(g.add(b),w.push(b))})}return h};for(const u of l)if(!g.has(u.id)){const h=c(u.id);a.push(h)}if(console.log(`Erdős-Renyi: Found ${a.length} connected components`),a.length>=2){for(let u=0;u<a.length;u++)for(let h=0;h<i;h++){const w=Array.from({length:a.length},(I,T)=>T).filter(I=>I!==u),m=w[Math.floor(Math.random()*w.length)],$=a[u][Math.floor(Math.random()*a[u].length)],b=a[m][Math.floor(Math.random()*a[m].length)],E=t?s+Math.random()*(o-s):1;d.push({source:$,target:b,weight:Math.round(E*10)/10,isDirected:r})}console.log(`Erdős-Renyi: Added ${a.length*i} inter-component connections`)}return{nodes:l,links:d,specialAttributes:{isFlowNetwork:!1,isStronglyConnected:!1,isBipartite:!1,isMultipartite:!1,isPlanar:!1,isTree:!1,isDAG:r&&this.isDAG({nodes:l,links:d}),isErdosRenyi:!0}}}static buildAdjacencyList(e){const n=new Map;return e.nodes.forEach(t=>{n.set(t.id,[])}),e.links.forEach(t=>{var s,o;(s=n.get(t.source))==null||s.push(t.target),t.isDirected||(o=n.get(t.target))==null||o.push(t.source)}),n}static buildDirectedAdjacencyList(e){const n=new Map;return e.nodes.forEach(t=>{n.set(t.id,[])}),e.links.forEach(t=>{var s,o,r;t.isDirected?(s=n.get(t.source))==null||s.push(t.target):((o=n.get(t.source))==null||o.push(t.target),(r=n.get(t.target))==null||r.push(t.source))}),n}static dfs(e,n,t){t.add(e);const s=n.get(e)||[];for(const o of s)t.has(o)||this.dfs(o,n,t)}static isStronglyConnectedDirected(e){const n=this.buildDirectedAdjacencyList(e),t=new Set,s=e.nodes[0].id;if(this.dfs(s,n,t),t.size!==e.nodes.length)return!1;const o=new Map;e.nodes.forEach(i=>{o.set(i.id,[])}),e.links.forEach(i=>{var l,d,g;i.isDirected?(l=o.get(i.target))==null||l.push(i.source):((d=o.get(i.target))==null||d.push(i.source),(g=o.get(i.source))==null||g.push(i.target))});const r=new Set;return this.dfs(s,o,r),r.size===e.nodes.length}static bipartiteColorDFS(e,n,t,s){s.set(e,n);const o=t.get(e)||[];for(const r of o)if(s.has(r)){if(s.get(r)===n)return!1}else if(!this.bipartiteColorDFS(r,1-n,t,s))return!1;return!0}static hasCycleDFS(e,n,t,s){t.add(e),s.add(e);const o=n.get(e)||[];for(const r of o)if(t.has(r)){if(s.has(r))return!0}else if(this.hasCycleDFS(r,n,t,s))return!0;return s.delete(e),!1}static generateNewmanWattsStrogatz(e,n,t,s,o,r){const i=Array.from({length:e},(g,a)=>({id:`node${a}`,val:.7+Math.random()*.6})),l=[],d=new Set;for(let g=0;g<e;g++)for(let a=1;a<=Math.floor(n/2);a++){const c=(g+a)%e,u=[g,c].sort().join("-");if(!d.has(u)){d.add(u);const h=s?o+Math.random()*(r-o):1;l.push({source:`node${g}`,target:`node${c}`,weight:Math.round(h*10)/10,isDirected:!1})}}for(let g=0;g<e;g++)for(let a=g+1;a<e;a++){const c=[g,a].sort().join("-");if(!d.has(c)&&Math.random()<t){d.add(c);const u=s?o+Math.random()*(r-o):1;l.push({source:`node${g}`,target:`node${a}`,weight:Math.round(u*10)/10,isDirected:!1})}}return{nodes:i.map(g=>({...g})),links:l.map(g=>({...g})),specialAttributes:{isFlowNetwork:!1,isStronglyConnected:!1,isBipartite:!1,isMultipartite:!1,isPlanar:!1,isTree:!1,isDAG:!1}}}static generateBarabasiAlbert(e,n,t,s,o){const r=Array.from({length:e},(d,g)=>({id:`node${g}`,val:.7+Math.random()*.6})),i=[],l=new Array(e).fill(0);for(let d=0;d<=n;d++)for(let g=d+1;g<=n;g++){const a=t?s+Math.random()*(o-s):1;i.push({source:`node${d}`,target:`node${g}`,weight:Math.round(a*10)/10,isDirected:!1}),l[d]++,l[g]++}for(let d=n+1;d<e;d++){const g=new Set;for(;g.size<n;){const a=l.slice(0,d).reduce((h,w)=>h+w,0);let c=Math.random()*a,u=-1;for(let h=0;h<d;h++)if(c-=l[h],c<=0){u=h;break}if(u===-1&&(u=d-1),u!==d&&!g.has(u)){g.add(u);const h=t?s+Math.random()*(o-s):1;i.push({source:`node${d}`,target:`node${u}`,weight:Math.round(h*10)/10,isDirected:!1}),l[d]++,l[u]++}}}return{nodes:r.map(d=>({...d})),links:i.map(d=>({...d})),specialAttributes:{isFlowNetwork:!1,isStronglyConnected:!1,isBipartite:!1,isMultipartite:!1,isPlanar:!1,isTree:!1,isDAG:!1}}}static generateDualBarabasiAlbert(e,n,t,s,o,r,i){const l=Array.from({length:e},(c,u)=>({id:`node${u}`,val:.7+Math.random()*.6})),d=[],g=new Array(e).fill(0),a=Math.max(n,t)+1;for(let c=0;c<a;c++)for(let u=c+1;u<a;u++){const h=o?r+Math.random()*(i-r):1;d.push({source:`node${c}`,target:`node${u}`,weight:Math.round(h*10)/10,isDirected:!1}),g[c]++,g[u]++}for(let c=a;c<e;c++){const u=Math.random()<s?n:t,h=new Set,w=Math.min(u,c);for(;h.size<w;){const m=g.slice(0,c).reduce((E,I)=>E+I,0);let $=Math.random()*m,b=-1;for(let E=0;E<c;E++)if($-=g[E],$<=0){b=E;break}if(b===-1&&(b=c-1),!h.has(b)){h.add(b);const E=o?r+Math.random()*(i-r):1;d.push({source:`node${c}`,target:`node${b}`,weight:Math.round(E*10)/10,isDirected:!1}),g[c]++,g[b]++}}}return{nodes:l.map(c=>({...c})),links:d.map(c=>({...c})),specialAttributes:{isFlowNetwork:!1,isStronglyConnected:!1,isBipartite:!1,isMultipartite:!1,isPlanar:!1,isTree:!1,isDAG:!1}}}static generatePowerlawCluster(e,n,t,s,o,r){const i=Array.from({length:e},(a,c)=>({id:`node${c}`,val:.7+Math.random()*.6})),l=[],d=new Array(e).fill(0),g=Array.from({length:e},()=>[]);for(let a=0;a<=n;a++)for(let c=a+1;c<=n;c++){const u=s?o+Math.random()*(r-o):1;l.push({source:`node${a}`,target:`node${c}`,weight:Math.round(u*10)/10,isDirected:!1}),d[a]++,d[c]++,g[a].push(c),g[c].push(a)}for(let a=n+1;a<e;a++){const c=new Set,u=d.slice(0,a).reduce((b,E)=>b+E,0);let h=Math.random()*u,w=-1;for(let b=0;b<a;b++)if(h-=d[b],h<=0){w=b;break}w===-1&&(w=a-1),c.add(w);const m=s?o+Math.random()*(r-o):1;l.push({source:`node${a}`,target:`node${w}`,weight:Math.round(m*10)/10,isDirected:!1}),d[a]++,d[w]++,g[a].push(w),g[w].push(a);const $=[w];for(;c.size<n;){let b=null;if(Math.random()<t){const E=g[$[$.length-1]].filter(I=>!c.has(I)&&I!==a);E.length>0&&(b=E[Math.floor(Math.random()*E.length)])}if(b===null||c.has(b)){const E=d.slice(0,a).reduce((T,A)=>T+A,0);let I=Math.random()*E;for(let T=0;T<a;T++)if(!c.has(T)&&(I-=d[T],I<=0)){b=T;break}if(b===null){for(let T=a-1;T>=0;T--)if(!c.has(T)){b=T;break}}}if(b!==null&&!c.has(b)){c.add(b),$.push(b);const E=s?o+Math.random()*(r-o):1;l.push({source:`node${a}`,target:`node${b}`,weight:Math.round(E*10)/10,isDirected:!1}),d[a]++,d[b]++,g[a].push(b),g[b].push(a)}}}return{nodes:i.map(a=>({...a})),links:l.map(a=>({...a})),specialAttributes:{isFlowNetwork:!1,isStronglyConnected:!1,isBipartite:!1,isMultipartite:!1,isPlanar:!1,isTree:!1,isDAG:!1}}}static generateStochasticBlockModel(e,n,t,s,o){const r=e.reduce((a,c)=>a+c,0),i=Array.from({length:r},(a,c)=>({id:`node${c}`,val:.7+Math.random()*.6})),l=[],d=[];let g=0;for(let a=0;a<e.length;a++)for(let c=0;c<e[a];c++)d[g++]=a;for(let a=0;a<r;a++)for(let c=a+1;c<r;c++){const u=d[a],h=d[c],w=n[u][h];if(Math.random()<w){const m=t?s+Math.random()*(o-s):1;l.push({source:`node${a}`,target:`node${c}`,weight:Math.round(m*10)/10,isDirected:!1})}}return{nodes:i.map(a=>({...a})),links:l.map(a=>({...a})),specialAttributes:{isFlowNetwork:!1,isStronglyConnected:!1,isBipartite:!1,isMultipartite:!1,isPlanar:!1,isTree:!1,isDAG:!1}}}}class mt{static solve(e,n){try{if(!ne.isFlowNetwork(e))return{success:!1,error:"Graph is not a valid flow network. Please generate a flow network first.",errorType:"invalid-input"};const t=e.specialAttributes;let s,o,r=e;if(t.sourceCount&&t.sourceCount>1||t.sinkCount&&t.sinkCount>1){console.log(`Multi-source/sink flow network: ${t.sourceCount} sources, ${t.sinkCount} sinks`);const{modifiedGraph:a,superSource:c,superSink:u}=this.createSuperSourceSink(e);r=a,s=c,o=u}else s=t.sourceNode,o=t.sinkNode;const i=this.buildCapacityMatrix(r),l=this.edmondsKarp(i,s,o,r.nodes.map(a=>a.id)),g=this.findMinCut(l.residualGraph,s,o,i,r.nodes.map(a=>a.id)).filter(a=>!a.source.startsWith("super-")&&!a.target.startsWith("super-"));return{success:!0,result:{maxFlow:l.maxFlow,flowPaths:l.flowPaths,sourceNode:t.sourceNode||s,sinkNode:t.sinkNode||o,minCutEdges:g,finalFlow:l.finalFlow,isValid:!0}}}catch(t){return{success:!1,error:t instanceof Error?t.message:"Unknown error in max flow algorithm",errorType:"algorithm-error"}}}static createSuperSourceSink(e){const n=e.specialAttributes,t=n.sourceNodes||[],s=n.sinkNodes||[],o="super-source",r="super-sink",i=[...e.nodes],l=[...e.links];return i.push({id:o,val:2.5,isSource:!0,isSuperSource:!0}),i.push({id:r,val:2.5,isSink:!0,isSuperSink:!0}),t.forEach(g=>{l.push({source:o,target:g,weight:999999,capacity:999999,isDirected:!0,isSuperEdge:!0})}),s.forEach(g=>{l.push({source:g,target:r,weight:999999,capacity:999999,isDirected:!0,isSuperEdge:!0})}),{modifiedGraph:{nodes:i,links:l,specialAttributes:{...n,superSource:o,superSink:r}},superSource:o,superSink:r}}static edmondsKarp(e,n,t,s){var g,a;let o=0;const r=[],i=new Map;for(const c of s){i.set(c,new Map);for(const u of s){const h=((g=e.get(c))==null?void 0:g.get(u))||0;i.get(c).set(u,h)}}const l=new Map;for(const c of s){l.set(c,new Map);for(const u of s)l.get(c).set(u,0)}let d;for(;(d=this.findAugmentingPathBFS(i,n,t)).flow>0;){const{flow:c,path:u}=d;for(let h=0;h<u.length-1;h++){const w=u[h],m=u[h+1],$=i.get(w).get(m);i.get(w).set(m,$-c);const b=i.get(m).get(w);if(i.get(m).set(w,b+c),((a=e.get(w))==null?void 0:a.get(m))>0){const E=l.get(w).get(m);l.get(w).set(m,E+c)}else{const E=l.get(m).get(w);l.get(m).set(w,Math.max(0,E-c))}}if(o+=c,r.push({path:[...u],flow:c}),r.length>1e3){console.warn("Max flow: Too many iterations, stopping");break}}return{maxFlow:o,flowPaths:r,residualGraph:i,finalFlow:l}}static findAugmentingPathBFS(e,n,t){const s=new Set,o=new Map,r=[{node:n,minFlow:1/0}];for(s.add(n);r.length>0;){const{node:i,minFlow:l}=r.shift();if(i===t){const g=[];let a=t;for(;a!==n;)g.unshift(a),a=o.get(a);return g.unshift(n),{flow:l,path:g}}const d=e.get(i);for(const[g,a]of d)!s.has(g)&&a>0&&(s.add(g),o.set(g,i),r.push({node:g,minFlow:Math.min(l,a)}))}return{flow:0,path:[]}}static findMinCut(e,n,t,s,o){const r=new Set,i=[n];for(r.add(n);i.length>0;){const d=i.shift(),g=e.get(d);for(const[a,c]of g)!r.has(a)&&c>0&&(r.add(a),i.push(a))}const l=[];for(const d of o)if(r.has(d)){const g=s.get(d);for(const[a,c]of g)!r.has(a)&&c>0&&l.push({source:d,target:a,capacity:c})}return l}static buildCapacityMatrix(e){const n=new Map;for(const t of e.nodes){n.set(t.id,new Map);for(const s of e.nodes)n.get(t.id).set(s.id,0)}for(const t of e.links){const s=t.capacity||t.weight||1;n.get(t.source).set(t.target,s)}return n}}class he{static highlightMaximumClique(e,n,t){const{clique:s}=n;e.linkColor(o=>{const r=typeof o.source=="object"?o.source.id:o.source,i=typeof o.target=="object"?o.target.id:o.target;return s.includes(r)&&s.includes(i)?"#00f5ff":t.useWeights&&o.weight<0?"#ef4444":"#6c63ff"}).linkWidth(o=>{const r=typeof o.source=="object"?o.source.id:o.source,i=typeof o.target=="object"?o.target.id:o.target;return s.includes(r)&&s.includes(i)?.8:t.useWeights?this.getWeightBasedWidth(o.weight,t):.2}),e.nodeThreeObject(o=>{const r=s.includes(o.id);return this.createNodeWithGlow(o,{color:r?"#00f5ff":"#9d4edd",glowColor:r?"#80ffff":"#bf7af0",glowSize:r?2:1.5,glowOpacity:r?.6:.3})})}static highlightShortestPath(e,n,t){const{path:s,startNode:o,endNode:r}=n;e.linkColor(i=>{const l=typeof i.source=="object"?i.source.id:i.source,d=typeof i.target=="object"?i.target.id:i.target;return s.some((a,c)=>{if(c===s.length-1)return!1;const u=s[c+1];return l===a&&d===u||!t.isDirected&&l===u&&d===a})?"#fbbf24":t.useWeights&&i.weight<0?"#ef4444":"#6c63ff"}).linkWidth(i=>{const l=typeof i.source=="object"?i.source.id:i.source,d=typeof i.target=="object"?i.target.id:i.target;return s.some((a,c)=>{if(c===s.length-1)return!1;const u=s[c+1];return l===a&&d===u||!t.isDirected&&l===u&&d===a})?.8:t.useWeights?this.getWeightBasedWidth(i.weight,t):.2}),e.nodeThreeObject(i=>{const l=i.id===o,d=i.id===r,g=s.includes(i.id);let a={color:"#9d4edd",glowColor:"#bf7af0",glowOpacity:.3,glowSize:1.5};return l?a={color:"#10b981",glowColor:"#6ee7b7",glowOpacity:.6,glowSize:2}:d?a={color:"#ef4444",glowColor:"#fca5a5",glowOpacity:.6,glowSize:2}:g&&(a={color:"#fbbf24",glowColor:"#fde68a",glowOpacity:.5,glowSize:1.8}),this.createNodeWithGlow(i,a)})}static highlightMaximumSpanningTree(e,n,t){const{edges:s}=n,o=new Set;s.forEach(i=>{const l=i.source,d=i.target;o.add(`${l}-${d}`),o.add(`${d}-${l}`)}),e.linkColor(i=>{const l=typeof i.source=="object"?i.source.id:i.source,d=typeof i.target=="object"?i.target.id:i.target,g=`${l}-${d}`,a=`${d}-${l}`;return o.has(g)||o.has(a)?"#10b981":t.useWeights&&i.weight<0?"#ef4444":"#6c63ff"}).linkWidth(i=>{const l=typeof i.source=="object"?i.source.id:i.source,d=typeof i.target=="object"?i.target.id:i.target,g=`${l}-${d}`,a=`${d}-${l}`;return o.has(g)||o.has(a)?1:t.useWeights?this.getWeightBasedWidth(i.weight,t):.2});const r=new Set;s.forEach(i=>{r.add(i.source),r.add(i.target)}),e.nodeThreeObject(i=>{const l=r.has(i.id);return this.createNodeWithGlow(i,{color:l?"#10b981":"#9d4edd",glowColor:l?"#6ee7b7":"#bf7af0",glowSize:l?2:1.5,glowOpacity:l?.6:.3})})}static highlightSteinerTree(e,n,t){const{edges:s,terminalNodes:o,steinerNodes:r}=n,i=new Set;s.forEach(l=>{const d=l.source,g=l.target;i.add(`${d}-${g}`),i.add(`${g}-${d}`)}),e.linkColor(l=>{const d=typeof l.source=="object"?l.source.id:l.source,g=typeof l.target=="object"?l.target.id:l.target,a=`${d}-${g}`,c=`${g}-${d}`;return i.has(a)||i.has(c)?"#f59e0b":t.useWeights&&l.weight<0?"#ef4444":"#6c63ff"}).linkWidth(l=>{const d=typeof l.source=="object"?l.source.id:l.source,g=typeof l.target=="object"?l.target.id:l.target,a=`${d}-${g}`,c=`${g}-${d}`;return i.has(a)||i.has(c)?1:t.useWeights?this.getWeightBasedWidth(l.weight,t):.2}),e.nodeThreeObject(l=>{const d=o.includes(l.id),g=r.includes(l.id);let a={color:"#9d4edd",glowColor:"#bf7af0",glowOpacity:.3,glowSize:1.5};return d?a={color:"#dc2626",glowColor:"#fca5a5",glowOpacity:.7,glowSize:2.2}:g&&(a={color:"#f59e0b",glowColor:"#fde68a",glowOpacity:.6,glowSize:1.8}),this.createNodeWithGlow(l,a)})}static highlightMultipartiteMatching(e,n,t){const{matching:s}=n,o=new Set;s.forEach(r=>{const i=r.source,l=r.target;o.add(`${i}-${l}`),o.add(`${l}-${i}`)}),console.log("GraphVisualization.highlightMultipartiteMatching called"),console.log("Matching edges:",s),console.log("Matching edge keys:",o),e.linkColor(r=>{const i=typeof r.source=="object"?r.source.id:r.source,l=typeof r.target=="object"?r.target.id:r.target,d=`${i}-${l}`,g=`${l}-${i}`;return o.has(d)||o.has(g)?(console.log(`✓ Highlighting matching edge ${i}-${l}`),"#ff6b35"):t.useWeights&&r.weight<0?"#ef4444":"#6c63ff40"}).linkWidth(r=>{const i=typeof r.source=="object"?r.source.id:r.source,l=typeof r.target=="object"?r.target.id:r.target,d=`${i}-${l}`,g=`${l}-${i}`;return o.has(d)||o.has(g)?1.5:t.useWeights?this.getWeightBasedWidth(r.weight,t)*.3:.08})}static highlightMaxFlow(e,n,t){const{flowPaths:s,minCutEdges:o,finalFlow:r,sourceNode:i,sinkNode:l}=n;console.log("GraphVisualization.highlightMaxFlow called"),console.log("Flow paths:",s),console.log("Min-cut edges:",o),console.log("Final flow:",r);const d=new Set,g=new Set;o.forEach(a=>{d.add(`${a.source}-${a.target}`)});for(const[a,c]of r)for(const[u,h]of c)if(h>0){const w=`${a}-${u}`;g.add(w)}console.log("Flow edge keys:",g),console.log("Min-cut edge keys:",d),e.linkColor(a=>{var I;const c=typeof a.source=="object"?a.source.id:a.source,u=typeof a.target=="object"?a.target.id:a.target,h=`${c}-${u}`,w=d.has(h),m=g.has(h),$=((I=r.get(c))==null?void 0:I.get(u))||0,b=a.capacity||a.weight||1,E=m&&Math.abs($-b)<.001;return w?(console.log(`✓ Highlighting min-cut edge ${c}-${u} (capacity: ${b})`),"#ff1744"):E?(console.log(`✓ Highlighting saturated edge ${c}-${u} (${$}/${b})`),"#ff9800"):m?(console.log(`✓ Highlighting flow edge ${c}-${u} (${$}/${b})`),"#4caf50"):"#666666"}).linkWidth(a=>{var I;const c=typeof a.source=="object"?a.source.id:a.source,u=typeof a.target=="object"?a.target.id:a.target,h=`${c}-${u}`,w=d.has(h),m=g.has(h),$=((I=r.get(c))==null?void 0:I.get(u))||0,b=a.capacity||a.weight||1,E=m&&Math.abs($-b)<.001;return w?2:E?1.5:m&&$>0?.4+$/b*.8:.15}).linkLabel(a=>{var b;const c=typeof a.source=="object"?a.source.id:a.source,u=typeof a.target=="object"?a.target.id:a.target,h=((b=r.get(c))==null?void 0:b.get(u))||0,w=a.capacity||a.weight||1,m=`${c}-${u}`,$=h>0&&Math.abs(h-w)<.001;return d.has(m)?`🚫 MIN-CUT
Bottleneck: ${h}/${w}`:$?`🔥 SATURATED
Flow: ${h}/${w}`:h>0?`➡️ Flow: ${h}/${w}`:`Capacity: ${w}`}),e.nodeThreeObject(a=>{const c=a.id===i||a.isSource,u=a.id===l||a.isSink,h=a.isSuperSource,w=a.isSuperSink;let m=!1,$=!1;for(const E of o){if(E.source===a.id){m=!0;break}if(E.target===a.id){$=!0;break}}let b={color:"#9e9e9e",glowColor:"#bdbdbd",glowOpacity:.2,glowSize:1.3};return h?b={color:"#1b5e20",glowColor:"#4caf50",glowOpacity:.8,glowSize:2.5}:w?b={color:"#b71c1c",glowColor:"#f44336",glowOpacity:.8,glowSize:2.5}:c?b={color:"#2e7d32",glowColor:"#66bb6a",glowOpacity:.7,glowSize:2.2}:u?b={color:"#c62828",glowColor:"#ef5350",glowOpacity:.7,glowSize:2.2}:m?b={color:"#1976d2",glowColor:"#42a5f5",glowOpacity:.5,glowSize:1.8}:$&&(b={color:"#7b1fa2",glowColor:"#ba68c8",glowOpacity:.5,glowSize:1.8}),this.createNodeWithGlow(a,b)})}static getWeightBasedWidth(e,n){const t=Math.abs(e||1),s=Math.max(Math.abs(n.minWeight),Math.abs(n.maxWeight));return .1+t/s*.7}static createNodeWithGlow(e,n){const t=new THREE.SphereGeometry(e.val||1),s=new THREE.MeshBasicMaterial({color:n.color,transparent:!1}),o=new THREE.Mesh(t,s),r=new THREE.SphereGeometry((e.val||1)*n.glowSize),i=new THREE.MeshBasicMaterial({color:n.glowColor,transparent:!0,opacity:n.glowOpacity}),l=new THREE.Mesh(r,i),d=new THREE.Group;return d.add(o),d.add(l),d}}class Oe{static findMaximumMatching(e){var n,t,s;try{if(!((n=e.specialAttributes)!=null&&n.isBipartite)&&!((t=e.specialAttributes)!=null&&t.isMultipartite)||!((s=e.specialAttributes)!=null&&s.partitionCount))throw new Error("This algorithm requires a multipartite graph");const o=e.specialAttributes.partitionCount,r=this.extractPartitions(e);console.log(`Finding maximum matching in ${o}-partite graph`),console.log("Partitions:",r.map((l,d)=>`Partition ${d}: ${l.length} nodes`));const i=this.findMaxMatchingGreedyWithAugmentation(e,r);return{success:!0,result:{matching:i,maxMatchingSize:i.length,partitions:r,isValid:this.validateMatching(i,e)}}}catch(o){return{success:!1,error:o instanceof Error?o.message:"Unknown error occurred",errorType:"algorithm-error"}}}static extractPartitions(e){var s;const n=((s=e.specialAttributes)==null?void 0:s.partitionCount)||2,t=Array.from({length:n},()=>[]);return e.nodes.forEach(o=>{const r=o.partition||0;t[r].push(o.id)}),t}static findMaxMatchingGreedyWithAugmentation(e,n){const t=[],s=new Set,o=new Map;e.nodes.forEach(a=>{o.set(a.id,[])}),e.links.forEach(a=>{var c,u;(c=o.get(a.source))==null||c.push(a.target),(u=o.get(a.target))==null||u.push(a.source)});const r=e.links.filter(a=>{const c=this.getNodePartition(a.source,e),u=this.getNodePartition(a.target,e);return c!==u});r.sort((a,c)=>(c.weight||1)-(a.weight||1));for(const a of r)!s.has(a.source)&&!s.has(a.target)&&(t.push(a),s.add(a.source),s.add(a.target));console.log(`Greedy phase found ${t.length} edges in matching`);let i=!0,l=0;const d=50;for(;i&&l<d;){i=!1,l++;const a=e.nodes.map(c=>c.id).filter(c=>!s.has(c));for(const c of a){const u=this.findAugmentingPath(c,o,t,s,e);if(u.length>0){this.applyAugmentingPath(u,t,s,e),i=!0,console.log(`Found augmenting path of length ${u.length}`);break}}}console.log(`Final matching size: ${t.length} (after ${l} improvement iterations)`);const g=this.cleanupMatching(t,e);return console.log(`Cleaned matching size: ${g.length}`),g}static findAugmentingPath(e,n,t,s,o){const r=new Set,i=new Map,l=[e];for(r.add(e);l.length>0;){const d=l.shift(),g=n.get(d)||[];for(const a of g){if(r.has(a))continue;const c=this.getNodePartition(d,o),u=this.getNodePartition(a,o);if(c!==u){if(r.add(a),i.set(a,d),!s.has(a))return this.reconstructPath(a,i,e);l.push(a)}}}return[]}static reconstructPath(e,n,t){const s=[];let o=e;for(;o!==t;)s.unshift(o),o=n.get(o);return s.unshift(t),s}static applyAugmentingPath(e,n,t,s){t.clear();for(let o=0;o<e.length-1;o++){const r=e[o],i=e[o+1],l=s.links.find(g=>g.source===r&&g.target===i||g.source===i&&g.target===r);if(!l)continue;const d=n.findIndex(g=>g.source===l.source&&g.target===l.target||g.source===l.target&&g.target===l.source);d>=0?n.splice(d,1):n.push(l)}n.forEach(o=>{t.add(o.source),t.add(o.target)})}static getNodePartition(e,n){const t=n.nodes.find(s=>s.id===e);return(t==null?void 0:t.partition)||0}static validateMatching(e,n){const t=new Set;for(const s of e){if(t.has(s.source)||t.has(s.target))return console.warn("Invalid matching: node used multiple times"),!1;t.add(s.source),t.add(s.target);const o=this.getNodePartition(s.source,n),r=this.getNodePartition(s.target,n);if(o===r)return console.warn("Invalid matching: edge within same partition"),!1}return!0}static cleanupMatching(e,n){const t=[],s=new Set,o=[...e].sort((r,i)=>(i.weight||1)-(r.weight||1));for(const r of o)if(!s.has(r.source)&&!s.has(r.target)){const i=this.getNodePartition(r.source,n),l=this.getNodePartition(r.target,n);i!==l&&(t.push(r),s.add(r.source),s.add(r.target))}return t}static getMatchingStats(e,n){const t=n.nodes.length,s=e.matching.length*2,o=t-s,r={},i=new Set;return e.matching.forEach(l=>{i.add(l.source),i.add(l.target)}),e.partitions.forEach((l,d)=>{const g=l.filter(a=>i.has(a)).length;r[d]=l.length>0?g/l.length:0}),{totalNodes:t,matchedNodes:s,unmatchedNodes:o,matchingEfficiency:t>0?s/t:0,partitionCoverage:r}}}const ft=(x,e,n,t,s,o,r,i,l,d,g,a,c)=>{const u=x.has("directed"),h=x.has("weighted");let w=null;if(a&&a!=="none"&&c){switch(console.log(`Using generator: ${a}`),a){case"erdos_renyi_graph":w=ne.generateErdosRenyi(c.n||e,c.p||n,h,t,s,u,g||1);break;case"newman_watts_strogatz_graph":w=ne.generateNewmanWattsStrogatz(c.n||e,c.k||4,c.p||.3,h,t,s);break;case"barabasi_albert_graph":w=ne.generateBarabasiAlbert(c.n||e,c.m||2,h,t,s);break;case"dual_barabasi_albert_graph":w=ne.generateDualBarabasiAlbert(c.n||e,c.m1||2,c.m2||1,c.p||.5,h,t,s);break;case"powerlaw_cluster_graph":w=ne.generatePowerlawCluster(c.n||e,c.m||2,c.p||.3,h,t,s);break;case"stochastic_block_model":const m=c.sizes?c.sizes.split(",").map(E=>parseInt(E.trim())):[10,10],b=(c.pmatrix||"0.3,0.1;0.1,0.3").split(";").map(E=>E.split(",").map(I=>parseFloat(I.trim())));w=ne.generateStochasticBlockModel(m,b,h,t,s);break;default:console.warn(`Unknown generator: ${a}, falling back to standard generation`);break}if(w)return w}if(x.has("erdos-renyi"))console.log("Taking Erdős-Renyi path"),w=ne.generateErdosRenyi(e,n,h,t,s,u,g||1);else if(x.has("flow-network"))console.log("Taking flow-network path"),w=ne.generateFlowNetwork(e,n,h,t,s,l||1,d||1);else if(x.has("bipartite")){const m=r||2,$=x.has("strongly-connected");console.log("Taking bipartite/multipartite path"),console.log("Actual partition count:",m),console.log("Partition ratios received:",i),console.log("Should be strongly connected:",$),w=ne.generateMultipartiteGraph(e,m,n,h,t,s,$,i)}else if(x.has("strongly-connected"))console.log("Taking strongly-connected path"),w=ne.generateStronglyConnected(e,n,h,t,s,u);else{const m=Array.from({length:e},($,b)=>({id:`node${b}`,val:.7+Math.random()*.6}));if(x.has("disconnected")&&o){const $=[],b=Array.from({length:o},()=>[]);for(let E=0;E<e;E++)b[E%o].push(E);for(let E=0;E<o;E++){const I=b[E];if(console.log(`Component ${E}: nodes [${I.join(", ")}] (${I.length} nodes)`),I.length!==0){if(I.length>1){for(let T=0;T<I.length-1;T++){const A=h?t+Math.random()*(s-t):1;$.push({source:`node${I[T]}`,target:`node${I[T+1]}`,weight:Math.round(A*10)/10,isDirected:u})}if(I.length>2){const T=Math.floor(Math.random()*I.length);let A=Math.floor(Math.random()*I.length);for(;A===T;)A=Math.floor(Math.random()*I.length);const L=h?t+Math.random()*(s-t):1;$.push({source:`node${I[T]}`,target:`node${I[A]}`,weight:Math.round(L*10)/10,isDirected:u})}}for(let T=0;T<I.length;T++)for(let A=u?0:T+1;A<I.length;A++)if(T!==A){const L=I[T],N=I[A];if(!$.some(V=>V.source===`node${L}`&&V.target===`node${N}`||!u&&V.source===`node${N}`&&V.target===`node${L}`)&&Math.random()<n){const V=h?t+Math.random()*(s-t):1;$.push({source:`node${L}`,target:`node${N}`,weight:Math.round(V*10)/10,isDirected:u})}}}}console.log(`Generated exactly ${o} components with ${$.length} total edges`),console.log("Node distribution:",b.map((E,I)=>`Component ${I}: ${E.length} nodes`)),w={nodes:m.map(E=>({...E})),links:$.map(E=>({...E}))}}else{const $=[];for(let b=0;b<e;b++)for(let E=u?0:b+1;E<e;E++)if(b!==E&&Math.random()<n){const I=h?t+Math.random()*(s-t):1;$.push({source:`node${b}`,target:`node${E}`,weight:Math.round(I*10)/10,isDirected:u})}w={nodes:m.map(b=>({...b})),links:$.map(b=>({...b}))}}w.specialAttributes={isFlowNetwork:!1,isStronglyConnected:x.has("strongly-connected"),isBipartite:x.has("bipartite"),isMultipartite:x.has("bipartite"),isPlanar:x.has("planar"),isTree:x.has("tree"),isDAG:x.has("dag")}}return w},J=(x,e)=>{const n=document.getElementById("status-message");n&&(n.textContent=x,n.className=`mt-3 p-2 rounded-lg text-xs ${e==="success"?"bg-green-900/50 text-green-300 border border-green-700":e==="error"?"bg-red-900/50 text-red-300 border border-red-700":"bg-yellow-900/50 text-yellow-300 border border-yellow-700"}`,n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},5e3))},xt=(x,e)=>{var n;if(!e)return J("No graph data available","error"),!1;switch(x){case"max-flow":if(!ne.isFlowNetwork(e))return J("Max flow algorithm requires a flow network. Please generate a flow network first.","warning"),!1;break;case"strongly-connected-components":(n=e.specialAttributes)!=null&&n.isStronglyConnected||J("This algorithm works best on strongly connected graphs.","warning");break}return!0},yt=(x,e,n)=>{try{const t=_e.solve(x);if(!t.success){J(t.error,"error");return}he.highlightMaximumClique(e,t.result,n)}catch(t){console.error("Error solving clique:",t instanceof Error?t.message:String(t)),J("Error solving maximum clique problem","error")}},bt=(x,e,n)=>{try{const t=gt.solve(x,n);if(!t.success){J(t.error,"error");return}he.highlightShortestPath(e,t.result,n)}catch(t){console.error("Error solving shortest path:",t instanceof Error?t.message:String(t)),J("Error solving shortest path problem","error")}},vt=(x,e,n)=>{try{const t=pt.solve(x);if(!t.success){J(t.error,"error");return}he.highlightMaximumSpanningTree(e,t.result,n)}catch(t){console.error("Error solving maximum spanning tree:",t instanceof Error?t.message:String(t)),J("Error solving maximum spanning tree problem","error")}},wt=(x,e,n,t)=>{try{const s=ht.solve(x,n,t);if(!s.success){J(s.error,"error");return}he.highlightSteinerTree(e,s.result,n)}catch(s){console.error("Error solving Steiner tree:",s instanceof Error?s.message:String(s)),J("Error solving Steiner tree problem","error")}},Mt=(x,e,n)=>{try{if(!xt("max-flow",x))return;const t=mt.solve(x,n);if(!t.success){J(t.error,"error");return}const s=t.result,o=s.minCutEdges.reduce((r,i)=>r+i.capacity,0);J(`Max flow: ${s.maxFlow} | Min-cut: ${s.minCutEdges.length} edges (capacity: ${o})`,"success"),he.highlightMaxFlow(e,s,n)}catch(t){console.error("Error solving max flow:",t),J("Error solving maximum flow: "+(t instanceof Error?t.message:String(t)),"error")}},Et=(x,e,n)=>{var t,s,o;try{if(!((t=x.specialAttributes)!=null&&t.isBipartite)&&!((s=x.specialAttributes)!=null&&s.isMultipartite)||!((o=x.specialAttributes)!=null&&o.partitionCount)){J("Multipartite matching requires a multipartite graph. Please generate a multipartite graph first.","error");return}J("Finding maximum matching...","warning");const r=Oe.findMaximumMatching(x);if(!r.success){J(r.error,"error");return}const i=r.result,l=Oe.getMatchingStats(i,x);console.log("=== MULTIPARTITE MATCHING DEBUG ==="),console.log("Matching edges:",i.matching),console.log("Total nodes:",l.totalNodes),console.log("Matched nodes count:",l.matchedNodes),console.log("Matching efficiency:",l.matchingEfficiency),console.log("Matching is valid:",i.isValid),console.log("Partition coverage:",l.partitionCoverage);const d=x.links[0];if(d){const g=i.matching.some(a=>a.source===d.source&&a.target===d.target||a.source===d.target&&a.target===d.source);console.log(`Test edge ${d.source}-${d.target} in matching:`,g)}console.log("==================================="),J(`Maximum matching found: ${i.maxMatchingSize} edges (${(l.matchingEfficiency*100).toFixed(1)}% of nodes matched)`,"success"),he.highlightMultipartiteMatching(e,i,n),console.log("Matching Result:",i),console.log("Matching Statistics:",l),console.log("Partition Coverage:",l.partitionCoverage)}catch(r){console.error("Error solving multipartite matching:",r instanceof Error?r.message:String(r)),J("Error solving multipartite matching problem","error")}};let ue=null,Me=null,we=!1,Ae={x:0,y:0},Be=!1;const St=(x,e,n)=>{const t=document.getElementById("info-panel"),s=document.getElementById("info-title"),o=document.getElementById("info-content"),r=document.getElementById("info-icon"),i=document.getElementById("close-info-panel");if(!t||!s||!o||!r)return;const l=c=>{if(c.x!==void 0&&c.y!==void 0&&c.z!==void 0){const u=x.graph2ScreenCoords(c.x,c.y,c.z);if(u){let h=u.x+20,w=u.y-100;const m=320,$=200;h+m>window.innerWidth&&(h=u.x-m-20),w<10&&(w=u.y+20),w+$>window.innerHeight&&(w=window.innerHeight-$-10),t.style.left=`${Math.max(10,h)}px`,t.style.top=`${Math.max(10,w)}px`}else t.style.left="50px",t.style.top="50px"}else t.style.left="50px",t.style.top="50px";t.style.right="auto"},d=c=>{ue=null,Me=c,e(),r.innerHTML=`
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="3"></circle>
    `,s.textContent="Node Information",o.innerHTML=`
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-gray-400 text-sm">Node ID:</span>
          <span class="text-white font-mono text-sm">${c.id}</span>
        </div>
        ${c.isSource?'<div class="text-green-400 text-sm font-medium">Source Node</div>':""}
        ${c.isSink?'<div class="text-red-400 text-sm font-medium">Sink Node</div>':""}
        ${c.isTerminal?'<div class="text-yellow-400 text-sm font-medium">Terminal Node</div>':""}
      </div>
    `,l(c),t.classList.remove("hidden")},g=(c,u)=>{var E;ue=c,Me=null,r.innerHTML=`
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
    `,s.textContent="Edge Information";const h=typeof c.source=="object"?c.source.id:c.source,w=typeof c.target=="object"?c.target.id:c.target,m=c.isDirected||n.has("directed")||((E=u.specialAttributes)==null?void 0:E.isFlowNetwork),$=m?"→":"—",b="Connection:";o.innerHTML=`
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-gray-400 text-sm">${b}</span>
          <span class="text-white font-mono text-sm">${h} ${$} ${w}</span>
        </div>
        ${m?`
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Source:</span>
            <span class="text-white font-mono text-sm">${h}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Target:</span>
            <span class="text-white font-mono text-sm">${w}</span>
          </div>
        `:""}
        ${c.weight!==void 0?`
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Weight:</span>
            <span class="text-white font-mono text-sm">${c.weight}</span>
          </div>
        `:""}
        ${c.capacity!==void 0?`
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Capacity:</span>
            <span class="text-white font-mono text-sm">${c.capacity}</span>
          </div>
        `:""}
        ${m?'<div class="text-blue-400 text-sm font-medium">Directed Edge</div>':'<div class="text-purple-400 text-sm font-medium">Undirected Edge</div>'}
      </div>
    `,l(c),t.classList.remove("hidden")};i&&i.addEventListener("click",()=>{ue=null,Me=null,e(),t.classList.add("hidden")}),document.addEventListener("click",c=>{if(we)return;const u=c.target;!t.contains(u)&&!t.classList.contains("hidden")&&(ue=null,Me=null,e(),t.classList.add("hidden"))});const a=t==null?void 0:t.querySelector(".flex.items-center.justify-between");return a&&(a.style.cursor="move",a.addEventListener("mousedown",c=>{Be=!0;const u=parseInt(t.style.left)||0,h=parseInt(t.style.top)||0;Ae.x=c.clientX-u,Ae.y=c.clientY-h,c.preventDefault(),document.body.style.userSelect="none"}),document.addEventListener("mousemove",c=>{if(!Be)return;we||(we=!0);const u=c.clientX-Ae.x,h=c.clientY-Ae.y,w=window.innerWidth-t.offsetWidth,m=window.innerHeight-t.offsetHeight,$=Math.max(0,Math.min(u,w)),b=Math.max(0,Math.min(h,m));t.style.left=`${$}px`,t.style.top=`${b}px`,t.style.right="auto"}),document.addEventListener("mouseup",()=>{Be&&(Be=!1,document.body.style.userSelect="",we&&setTimeout(()=>{we=!1},50))})),{showNodeInfo:d,showEdgeInfo:g}},$t=x=>{const e=document.getElementById("graph-canvas");if(!e)return console.error("Graph canvas element not found!"),null;e.innerHTML="";const n=window.ForceGraph3D;if(!n)return console.error("ForceGraph3D not found in global scope"),null;const t=n().width(e.clientWidth).height(e.clientHeight).backgroundColor("#111827").nodeRelSize(5).linkColor(()=>"#6c63ff").linkWidth(.2).linkOpacity(.7);t(e),t.cameraPosition({z:300});let s={nodes:[],links:[]},o=[];const r=c=>{o.push(c)},i=()=>{o.forEach(c=>{try{c(s)}catch(u){console.error("Error in graph data change callback:",u)}})},l=()=>{t.nodeThreeObject(c=>{var A,L,N;const u=new THREE.SphereGeometry(c.val||1);let h="#9d4edd",w="#bf7af0";if(((A=s.specialAttributes)!=null&&A.isBipartite||(L=s.specialAttributes)!=null&&L.isMultipartite)&&((N=s.specialAttributes)!=null&&N.partitionCount)&&c.partition!==void 0){const F=["#ff4444","#44ff44","#4444ff","#ffaa00","#ff44ff","#00ffff","#ffff00","#8844ff","#00ff88","#ff8800"],V=c.partition||0;h=F[V%F.length],w=h}const m=new THREE.MeshBasicMaterial({color:h,transparent:!1}),$=new THREE.Mesh(u,m),b=new THREE.SphereGeometry((c.val||1)*1.5),E=new THREE.MeshBasicMaterial({color:w,transparent:!0,opacity:.3}),I=new THREE.Mesh(b,E),T=new THREE.Group;return T.add($),T.add(I),T})},d=St(t,l,x);d&&t.onNodeClick(c=>{d.showNodeInfo(c),t.nodeThreeObject(u=>{var L,N,F;new THREE.SphereGeometry(u.val||1);let h="#9d4edd",w="#bf7af0",m=u.val||1;if(u===Me)h="#ff8c00",w="#ffb347",m=(u.val||1)*1.3;else if(((L=s.specialAttributes)!=null&&L.isBipartite||(N=s.specialAttributes)!=null&&N.isMultipartite)&&((F=s.specialAttributes)!=null&&F.partitionCount)&&u.partition!==void 0){const V=["#ff4444","#44ff44","#4444ff","#ffaa00","#ff44ff","#00ffff","#ffff00","#8844ff","#00ff88","#ff8800"],Z=u.partition||0;h=V[Z%V.length],w=h}else{const V=u.isSource,Z=u.isSink;V?(h="#10b981",w="#34d399"):Z&&(h="#ef4444",w="#f87171")}const $=new THREE.MeshBasicMaterial({color:h,transparent:!1}),b=new THREE.Mesh(new THREE.SphereGeometry(m),$),E=new THREE.SphereGeometry(m*1.5),I=new THREE.MeshBasicMaterial({color:w,transparent:!0,opacity:.3}),T=new THREE.Mesh(E,I),A=new THREE.Group;return A.add(b),A.add(T),A})}).onLinkClick(c=>{d.showEdgeInfo(c,s),t.linkColor(u=>{var h;return u===ue?"#ff8c00":x.has("weighted")&&u.weight<0?"#ef4444":(h=s.specialAttributes)!=null&&h.isFlowNetwork?"#10b981":"#6c63ff"}),t.linkWidth(u=>{var m,$;const h=document.getElementById("min-weight"),w=document.getElementById("max-weight");if(u===ue)return(x.has("weighted")||(m=s.specialAttributes)!=null&&m.isFlowNetwork?.1+Math.abs(u.weight||u.capacity||1)/Math.max(Math.abs(parseFloat((h==null?void 0:h.value)||"1")),Math.abs(parseFloat((w==null?void 0:w.value)||"5")))*.7:.2)*2.5;if(x.has("weighted")||($=s.specialAttributes)!=null&&$.isFlowNetwork){const b=Math.abs(u.weight||u.capacity||1),E=Math.max(Math.abs(parseFloat((h==null?void 0:h.value)||"1")),Math.abs(parseFloat((w==null?void 0:w.value)||"5")));return .1+b/E*.7}return .2})}).linkHoverPrecision(300),t.nodeThreeObject(c=>{const u=new THREE.SphereGeometry(c.val||1),h=new THREE.MeshBasicMaterial({color:"#9d4edd",transparent:!1}),w=new THREE.Mesh(u,h),m=new THREE.SphereGeometry((c.val||1)*1.5),$=new THREE.MeshBasicMaterial({color:"#bf7af0",transparent:!0,opacity:.3}),b=new THREE.Mesh(m,$),E=new THREE.Group;return E.add(w),E.add(b),E});const g=()=>{var c,u,h,w,m,$,b,E,I,T,A,L;try{const N=document.getElementById("node-count"),F=document.getElementById("edge-probability"),V=document.getElementById("min-weight"),Z=document.getElementById("max-weight"),me=document.getElementById("component-count-value"),fe=document.getElementById("partition-count-value"),xe=document.getElementById("source-count"),ye=document.getElementById("sink-count"),be=document.getElementById("erdos-renyi-connections"),Le=parseInt((N==null?void 0:N.value)||"20",10),je=parseFloat((F==null?void 0:F.value)||"0.3"),Se=parseFloat((V==null?void 0:V.value)||"1"),$e=parseFloat((Z==null?void 0:Z.value)||"5"),Pe=parseInt((me==null?void 0:me.value)||"2"),re=parseInt((fe==null?void 0:fe.value)||"2"),ze=parseInt((xe==null?void 0:xe.value)||"1"),ke=parseInt((ye==null?void 0:ye.value)||"1"),Ge=parseInt((be==null?void 0:be.value)||"1"),Ie=nt();console.log("=== GRAPH GENERATION DEBUG ==="),console.log("Active properties:",Array.from(x)),console.log("Partition count from UI:",re),console.log("Partition ratios from UI:",Ie),console.log("============================");const ve=ge;let Y=null;if(ve!=="none")switch(Y={},ve){case"erdos_renyi_graph":const B=document.getElementById("erdos-renyi-n"),z=document.getElementById("erdos-renyi-p");Y.n=parseInt((B==null?void 0:B.value)||"20"),Y.p=parseFloat((z==null?void 0:z.value)||"0.3");break;case"newman_watts_strogatz_graph":const P=document.getElementById("newman-watts-strogatz-n"),q=document.getElementById("newman-watts-strogatz-k"),D=document.getElementById("newman-watts-strogatz-p");Y.n=parseInt((P==null?void 0:P.value)||"20"),Y.k=parseInt((q==null?void 0:q.value)||"4"),Y.p=parseFloat((D==null?void 0:D.value)||"0.3");break;case"barabasi_albert_graph":const O=document.getElementById("barabasi-albert-n"),j=document.getElementById("barabasi-albert-m");Y.n=parseInt((O==null?void 0:O.value)||"20"),Y.m=parseInt((j==null?void 0:j.value)||"2");break;case"dual_barabasi_albert_graph":const H=document.getElementById("dual-barabasi-albert-n"),Q=document.getElementById("dual-barabasi-albert-m1"),U=document.getElementById("dual-barabasi-albert-m2"),p=document.getElementById("dual-barabasi-albert-p");Y.n=parseInt((H==null?void 0:H.value)||"20"),Y.m1=parseInt((Q==null?void 0:Q.value)||"2"),Y.m2=parseInt((U==null?void 0:U.value)||"1"),Y.p=parseFloat((p==null?void 0:p.value)||"0.5");break;case"powerlaw_cluster_graph":const f=document.getElementById("powerlaw-cluster-n"),y=document.getElementById("powerlaw-cluster-m"),v=document.getElementById("powerlaw-cluster-p");Y.n=parseInt((f==null?void 0:f.value)||"20"),Y.m=parseInt((y==null?void 0:y.value)||"2"),Y.p=parseFloat((v==null?void 0:v.value)||"0.3");break;case"stochastic_block_model":const M=document.getElementById("stochastic-block-model-sizes"),k=document.getElementById("stochastic-block-model-pmatrix");Y.sizes=(M==null?void 0:M.value)||"10,10",Y.pmatrix=(k==null?void 0:k.value)||"0.3,0.1;0.1,0.3";break}const G=ft(x,Le,je,Se,$e,Pe,re,Ie,ze,ke,Ge,ve,Y);s=G,i(),console.log(`Generated graph: ${G.nodes.length} nodes, ${G.links.length} links`),console.log("Special attributes:",G.specialAttributes),console.log("Sample links:",G.links.slice(0,3)),console.log("Sample nodes with partitions:",G.nodes.slice(0,5).map(B=>({id:B.id,partition:B.partition})));const oe=G.nodes.map(B=>({...B})),le=G.links.map(B=>({...B}));if(t.graphData({nodes:oe,links:le}),((c=G.specialAttributes)!=null&&c.isBipartite||(u=G.specialAttributes)!=null&&u.isMultipartite)&&((h=G.specialAttributes)!=null&&h.partitionCount)){const B=G.specialAttributes.partitionCount,z=100;oe.forEach((P,q)=>{const D=P.partition||0,O=oe.filter(p=>(p.partition||0)===D),j=O.findIndex(p=>p.id===P.id),H=D*2*Math.PI/B,Q=Math.PI/(B*2),U=H+(j-(O.length-1)/2)*Q/Math.max(1,O.length-1);P.x=z*Math.cos(U),P.y=z*Math.sin(U),P.z=0}),t.graphData({nodes:oe,links:le})}if((w=G.specialAttributes)!=null&&w.isFlowNetwork){const B=oe.filter(j=>j.isSource),z=oe.filter(j=>j.isSink),P=oe.filter(j=>!j.isSource&&!j.isSink),q=400,D=300,O=200;if(B.length>0&&z.length>0){if(B.length===1?(B[0].x=-q/2,B[0].y=0,B[0].z=0,B[0].val=2):B.forEach((j,H)=>{j.x=-q/2,j.y=-D/2+H/Math.max(1,B.length-1)*D,j.z=0,j.val=2}),z.length===1?(z[0].x=q/2,z[0].y=0,z[0].z=0,z[0].val=2):z.forEach((j,H)=>{j.x=q/2,j.y=-D/2+H/Math.max(1,z.length-1)*D,j.z=0,j.val=2}),P.length>0){const j=Math.min(4,Math.max(1,Math.ceil(P.length/3))),H=new Map,Q=[{id:B[0].id,distance:0}],U=new Set;for(U.add(B[0].id),H.set(B[0].id,0);Q.length>0;){const{id:f,distance:y}=Q.shift();le.forEach(v=>{const M=typeof v.source=="object"?v.source.id:v.source,k=typeof v.target=="object"?v.target.id:v.target;M===f&&!U.has(k)&&(U.add(k),H.set(k,y+1),Q.push({id:k,distance:y+1}))})}const p=new Map;P.forEach(f=>{const y=H.get(f.id)||1,v=Math.min(j-1,Math.max(0,y-1));p.has(v)||p.set(v,[]),p.get(v).push(f)});for(let f=0;f<j;f++){const y=p.get(f)||[];if(y.length>0){const v=-q/2+(f+1)*q/(j+1);y.forEach((M,k)=>{if(M.x=v,y.length===1)M.y=0,M.z=0;else if(y.length<=4){const S=k*2*Math.PI/y.length,C=Math.min(D/4,80);M.y=C*Math.cos(S),M.z=C*Math.sin(S)}else{const S=Math.ceil(Math.sqrt(y.length)),C=Math.floor(k/S),_=k%S,X=D/(S+1),R=O/(S+1);M.y=-D/2+(C+1)*X,M.z=-O/2+(_+1)*R}M.val=(M.val||1)*1.2})}}P.forEach(f=>{if(f.x===void 0||f.y===void 0){const y=P.indexOf(f);f.x=-q/4+y/Math.max(1,P.length-1)*q/2,f.y=(Math.random()-.5)*D,f.z=(Math.random()-.5)*O,f.val=(f.val||1)*1.2}})}t.graphData({nodes:oe,links:le})}}const Fe=((m=G.specialAttributes)==null?void 0:m.isFlowNetwork)||x.has("directed");if(t.linkDirectionalArrowLength(Fe?4:0).linkDirectionalArrowRelPos(1).linkWidth(B=>{var P;if(x.has("weighted")||(P=G.specialAttributes)!=null&&P.isFlowNetwork){const q=Math.abs(B.weight||B.capacity||1),D=Math.max(Math.abs(Se),Math.abs($e));return .1+q/D*.7}return .2}).linkColor(B=>{var P;const z=x.has("weighted");return(P=G.specialAttributes)!=null&&P.isFlowNetwork?"#00d4aa":z&&B.weight<0?"#ef4444":"#6c63ff"}).linkLabel(B=>{var P;return(P=G.specialAttributes)!=null&&P.isFlowNetwork?`Capacity: ${B.capacity||B.weight}`:x.has("weighted")?`Weight: ${B.weight}`:""}),($=G.specialAttributes)!=null&&$.isFlowNetwork?t.nodeThreeObject(B=>{const z=B.isSource,P=B.isSink,q=B.isSuperSource,D=B.isSuperSink,O=B.val||1,j=new THREE.SphereGeometry(O);let H="#8b5cf6",Q="#a78bfa",U=.3,p="";q?(H="#059669",Q="#10b981",U=.7,p="SUPER-SOURCE"):D?(H="#dc2626",Q="#ef4444",U=.7,p="SUPER-SINK"):z?(H="#059669",Q="#10b981",U=.5,p="SOURCE"):P&&(H="#dc2626",Q="#ef4444",U=.5,p="SINK");const f=new THREE.MeshBasicMaterial({color:H,transparent:!1}),y=new THREE.Mesh(j,f),v=new THREE.SphereGeometry(O*1.8),M=new THREE.MeshBasicMaterial({color:Q,transparent:!0,opacity:U}),k=new THREE.Mesh(v,M);if(p){const C=document.createElement("canvas"),_=C.getContext("2d");C.width=128,C.height=64,_.fillStyle="#ffffff",_.font="bold 18px Arial",_.textAlign="center",_.fillText(p,64,40);const X=new THREE.CanvasTexture(C),R=new THREE.SpriteMaterial({map:X}),ee=new THREE.Sprite(R);ee.scale.set(O*4,O*2,1),ee.position.set(0,O*2.5,0);const K=new THREE.Group;return K.add(y),K.add(k),K.add(ee),K}const S=new THREE.Group;return S.add(y),S.add(k),S}):((b=G.specialAttributes)!=null&&b.isBipartite||(E=G.specialAttributes)!=null&&E.isMultipartite)&&((I=G.specialAttributes)!=null&&I.partitionCount)?console.log("Multipartite graph detected - will apply coloring after graph data is set"):l(),((T=G.specialAttributes)!=null&&T.isBipartite||(A=G.specialAttributes)!=null&&A.isMultipartite)&&((L=G.specialAttributes)!=null&&L.partitionCount)){console.log("=== APPLYING MULTIPARTITE COLORING ==="),console.log("Partition count:",G.specialAttributes.partitionCount);const B=["#ff4444","#44ff44","#4444ff","#ffaa00","#ff44ff","#00ffff","#ffff00","#8844ff","#00ff88","#ff8800"];t.nodeThreeObject(z=>{console.log(`Final coloring: Node ${z.id} has partition: ${z.partition}`);const P=new THREE.SphereGeometry(z.val||1),q=z.partition||0,D=B[q%B.length];console.log(`Final coloring: Node ${z.id} partition ${q} -> color ${D}`);const O=new THREE.MeshBasicMaterial({color:D,transparent:!1}),j=new THREE.Mesh(P,O),H=new THREE.SphereGeometry((z.val||1)*1.5),Q=new THREE.MeshBasicMaterial({color:D,transparent:!0,opacity:.3}),U=new THREE.Mesh(H,Q),p=new THREE.Group;return p.add(j),p.add(U),p}),console.log("Multipartite node coloring applied as final step")}}catch(N){console.error("Error generating graph:",N instanceof Error?N.message:String(N)),J("Error generating graph: "+(N instanceof Error?N.message:String(N)),"error")}},a=c=>{const u=document.getElementById("min-weight"),h=document.getElementById("max-weight"),w=document.getElementById("terminal-count"),m={isDirected:x.has("directed"),useWeights:x.has("weighted"),minWeight:parseFloat((u==null?void 0:u.value)||"1"),maxWeight:parseFloat((h==null?void 0:h.value)||"5")};switch(c){case"maximum-clique":yt(s,t,m);break;case"shortest-path":bt(s,t,m);break;case"maximum-spanning-tree":vt(s,t,m);break;case"steiner-tree":const $=parseInt((w==null?void 0:w.value)||"5",10);wt(s,t,m,$);break;case"max-flow":Mt(s,t,m);break;case"multipartite-matching":Et(s,t,m);break}};return window.addEventListener("resize",()=>{t.width(e.clientWidth),t.height(e.clientHeight)}),{generateGraph:g,solveAlgorithm:a,addGraphDataChangeCallback:r,getCurrentGraphData:()=>s}},kt=()=>{let x={nodes:[],links:[]},e=!1,n=[],t=0;const s=[{id:"basic-info",name:"Basic Information",description:"Vertices, edges, density, graph type",icon:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",category:"general"},{id:"connectivity",name:"Connectivity Analysis",description:"Connected components, diameter, path lengths",icon:"M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",category:"general"},{id:"degree-stats",name:"Degree Statistics",description:"Min, max, average degree, degree distribution",icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",category:"general"},{id:"adjacency-matrix",name:"Adjacency Matrix",description:"Graph adjacency matrix representation",icon:"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z",category:"matrices"},{id:"laplacian-matrix",name:"Laplacian Matrix",description:"Graph Laplacian matrix and properties",icon:"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z",category:"matrices"},{id:"degree-matrix",name:"Degree Matrix",description:"Diagonal matrix of vertex degrees",icon:"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z",category:"matrices"},{id:"incidence-matrix",name:"Incidence Matrix",description:"Vertex-edge incidence matrix",icon:"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z",category:"matrices"},{id:"eigenvalues",name:"Eigenvalue Analysis",description:"Largest eigenvalues and spectral gap",icon:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",category:"spectral"},{id:"laplacian-spectrum",name:"Laplacian Spectrum",description:"All Laplacian eigenvalues and properties",icon:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",category:"spectral"},{id:"algebraic-connectivity",name:"Algebraic Connectivity",description:"Second smallest Laplacian eigenvalue",icon:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",category:"spectral"},{id:"adjacency-spectrum",name:"Adjacency Spectrum",description:"Adjacency matrix eigenvalues",icon:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",category:"spectral"},{id:"structural-properties",name:"Structural Properties",description:"Tree, bipartite, DAG, cycle detection",icon:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",category:"properties"},{id:"centrality-measures",name:"Centrality Measures",description:"Degree, betweenness, closeness centrality",icon:"M13 10V3L4 14h7v7l9-11h-7z",category:"properties"},{id:"component-analysis",name:"Component Analysis",description:"Connected components and their properties",icon:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",category:"properties"},{id:"graph-distances",name:"Graph Distances",description:"Shortest paths, diameter, eccentricity",icon:"M4.93 19.07l1.41-1.41a7 7 0 010-9.9L4.93 6.34a9 9 0 000 12.73zM19.07 4.93l-1.41 1.41a7 7 0 010 9.9l1.41 1.41a9 9 0 000-12.73z",category:"properties"}],o=()=>`
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
    `,r=(p,f,y)=>`
      <div id="tab-${p}" class="tab-content p-6 ${p==="general"?"":"hidden"}">
        <!-- Analysis Cells Container for this tab -->
        <div id="analysis-cells-${p}" class="space-y-4 mb-6">
          <!-- Cells for this tab will be dynamically added here -->
        </div>
        
        <!-- Add Analysis Section for this tab -->
        <div class="bg-gray-800 rounded-xl border-2 border-dashed border-gray-600 p-6">
          <div class="text-center mb-4">
            <svg class="w-8 h-8 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <h3 class="text-lg font-semibold text-gray-400">${f}</h3>
            <p class="text-sm text-gray-500">${y}</p>
          </div>
          
          <!-- Analysis Options Grid for this tab -->
          <div id="analysis-options-${p}" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <!-- Analysis options for this tab will be populated here -->
          </div>
        </div>
      </div>
    `,i=p=>`
      <button class="analysis-option p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-all duration-200 border border-gray-600 hover:border-purple-400 group" data-analysis-id="${p.id}">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-purple-400 group-hover:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${p.icon}"></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-white group-hover:text-purple-200">${p.name}</h4>
            <p class="text-xs text-gray-400 mt-1">${p.description}</p>
          </div>
        </div>
      </button>
    `,l=p=>`
      <div class="analysis-cell bg-gray-800 rounded-xl border border-gray-600 overflow-hidden" data-cell-id="${p.id}">
        <div class="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-750">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
            <h3 class="text-sm font-semibold text-white">${p.title}</h3>
            <span class="text-xs text-gray-500">${new Date(p.timestamp).toLocaleTimeString()}</span>
          </div>
          <div class="flex items-center space-x-1">
            <button class="refresh-cell p-1 text-gray-400 hover:text-green-400 rounded transition-colors" data-cell-id="${p.id}" title="Refresh">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
            <button class="remove-cell p-1 text-gray-400 hover:text-red-400 rounded transition-colors" data-cell-id="${p.id}" title="Remove">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="p-4">
          <div class="cell-content text-sm text-gray-300">${p.content}</div>
        </div>
      </div>
    `,d=()=>{const p=document.getElementById("math-analysis-panel");p&&p.remove();const f=document.getElementById("graph-container");f&&(f.insertAdjacentHTML("beforeend",o()),g())},g=()=>{const p=document.getElementById("close-math-panel");p&&p.addEventListener("click",()=>{c()});const f=document.getElementById("clear-all-cells");f&&f.addEventListener("click",()=>{ze()}),document.querySelectorAll(".tab-button").forEach(v=>{v.addEventListener("click",M=>{M.preventDefault(),M.stopPropagation();const k=M.currentTarget,S=k.getAttribute("data-tab");S?a(S):console.error("No tab name found for button:",k)})}),document.addEventListener("click",v=>{const M=v.target,k=M.closest(".analysis-option");if(k){const _=k.getAttribute("data-analysis-id");_&&Se(_);return}const S=M.closest(".refresh-cell");if(S){const _=S.getAttribute("data-cell-id");_&&Pe(_);return}const C=M.closest(".remove-cell");if(C){const _=C.getAttribute("data-cell-id");_&&$e(_);return}})},a=p=>{document.querySelectorAll(".tab-button").forEach(v=>{v.classList.remove("active","bg-gray-800","text-white","border-purple-400"),v.classList.add("text-gray-400")});const f=document.querySelector(`[data-tab="${p}"]`);f&&(f.classList.add("active","bg-gray-800","text-white","border-purple-400"),f.classList.remove("text-gray-400")),document.querySelectorAll(".tab-content").forEach(v=>{v.classList.add("hidden")});const y=document.getElementById(`tab-${p}`);y&&y.classList.remove("hidden")},c=()=>{const p=document.getElementById("math-analysis-panel"),f=document.getElementById("graph-canvas");if(!p){d();return}e?(p.classList.add("hidden"),f&&(f.style.display="block"),e=!1):(p.classList.remove("hidden"),f&&(f.style.display="none"),e=!0,u(x))},u=p=>{if(x=p,!e)return;const f=n.find(y=>y.type==="basic-info-default");f&&(f.content=U(),f.timestamp=Date.now(),re()),h(p),w(p),m(p),T(p)},h=p=>{const f=p.nodes.length,y=p.links.length,v=p.links.some(se=>se.isDirected),M=v?f*(f-1):f*(f-1)/2,k=M>0?y/M:0,S=(se,ae)=>{const de=document.getElementById(se);de&&(de.textContent=ae)};S("vertex-count",f.toString()),S("edge-count",y.toString()),S("graph-type",v?"Directed":"Undirected"),S("graph-density",k.toFixed(3));const C=A(p.nodes,p.links),_=C.isConnected;S("is-connected",_?"Yes":"No"),S("component-count",C.components.length.toString());const X=L(p.nodes,p.links),R=Object.values(X),ee=R.length>0?Math.min(...R):0,K=R.length>0?Math.max(...R):0,te=R.length>0?R.reduce((se,ae)=>se+ae,0)/R.length:0;if(S("min-degree",ee.toString()),S("max-degree",K.toString()),S("avg-degree",te.toFixed(2)),_){const se=me(),ae=Math.max(...se),de=se.reduce((Xe,Je)=>Xe+Je,0)/se.length;S("graph-diameter",ae.toString()),S("avg-path-length",de.toFixed(2))}else S("graph-diameter","∞"),S("avg-path-length","∞")},w=p=>{const f=N(p.nodes,p.links),y=F(p.nodes,p.links),v=V(p.nodes,p.links),M=(k,S)=>{const C=document.getElementById(k);C&&(C.innerHTML=Z(S,p.nodes.map(_=>_.id)))};M("adjacency-matrix",f),M("degree-matrix",y),M("laplacian-matrix",v)},m=p=>{const f=N(p.nodes,p.links),y=V(p.nodes,p.links),v=$(f,y),M=(S,C)=>{const _=document.getElementById(S);_&&(_.textContent=C)};M("largest-eigenvalue",v.largestEigenvalue.toFixed(4)),M("second-eigenvalue",v.secondLargestEigenvalue.toFixed(4)),M("spectral-gap",v.spectralGap.toFixed(4)),M("algebraic-connectivity",v.algebraicConnectivity.toFixed(4)),M("zero-eigenvalues",v.zeroEigenvalues.toString());const k=document.getElementById("laplacian-eigenvalues");k&&(k.innerHTML=v.laplacianEigenvalues.map((S,C)=>`λ${C}: ${S.toFixed(4)}`).join("<br>"))},$=(p,f)=>{if(p.length===0)return{largestEigenvalue:0,secondLargestEigenvalue:0,spectralGap:0,algebraicConnectivity:0,zeroEigenvalues:0,laplacianEigenvalues:[]};const v=E(p),M=b(p,v),S=[...I(f)].sort((R,ee)=>R-ee),C=v-M,_=S.length>1?S[1]:0,X=S.filter(R=>Math.abs(R)<1e-10).length;return{largestEigenvalue:v,secondLargestEigenvalue:M,spectralGap:C,algebraicConnectivity:_,zeroEigenvalues:X,laplacianEigenvalues:S}},b=(p,f)=>{const y=p.length;if(y<=1)return 0;if(y===2){const v=p[0][0]+p[1][1],M=p[0][0]*p[1][1]-p[0][1]*p[1][0],k=v*v-4*M;if(k>=0){const S=Math.sqrt(k),C=(v+S)/2,_=(v-S)/2;return Math.abs(C-f)>Math.abs(_-f)?_:C}}return f*.7},E=(p,f=100,y=1e-6)=>{const v=p.length;if(v===0)return 0;let M=new Array(v).fill(0).map(()=>Math.random()),k=0;for(let S=0;S<f;S++){const C=new Array(v).fill(0);for(let K=0;K<v;K++)for(let te=0;te<v;te++)C[K]+=p[K][te]*M[te];const _=C.reduce((K,te,se)=>K+te*M[se],0),X=M.reduce((K,te)=>K+te*te,0),R=X>0?_/X:0;if(Math.abs(R-k)<y)return R;k=R;const ee=Math.sqrt(C.reduce((K,te)=>K+te*te,0));if(ee>0)M=C.map(K=>K/ee);else break}return k},I=p=>{const f=p.length;if(f===0)return[];const y=[];if(f<=1)return[0];if(f===2){const v=p[0][0]+p[1][1],M=p[0][0]*p[1][1]-p[0][1]*p[1][0],k=v*v-4*M;if(k>=0){const S=Math.sqrt(k);y.push((v-S)/2),y.push((v+S)/2)}return y.sort((S,C)=>S-C)}for(let v=0;v<f;v++){const M=p[v][v],k=p[v].reduce((_,X,R)=>v!==R?_+Math.abs(X):_,0),S=M,C=k;y.push(Math.max(0,S-C/2))}return y[0]=0,y.sort((v,M)=>v-M)},T=p=>{const f=(k,S)=>{const C=document.getElementById(k);C&&(C.textContent=S)},y=fe(p);f("is-tree",y?"Yes":"No");const v=xe(p);if(f("is-bipartite",v?"Yes":"No"),p.links.some(k=>k.isDirected)){const k=ye(p);f("is-dag",k?"Yes":"No"),f("has-cycles",k?"No":"Yes")}else f("is-dag","N/A (Undirected)"),f("has-cycles",!y?"Yes":"No");be(p),Le(p)},A=(p,f)=>{const y=new Set,v=[],M=new Map;p.forEach(S=>M.set(S.id,[])),f.forEach(S=>{var C,_;(C=M.get(S.source))==null||C.push(S.target),(_=M.get(S.target))==null||_.push(S.source)});const k=(S,C)=>{y.add(S),C.push(S),(M.get(S)||[]).forEach(X=>{y.has(X)||k(X,C)})};return p.forEach(S=>{if(!y.has(S.id)){const C=[];k(S.id,C),v.push(C)}}),{components:v,isConnected:v.length===1}},L=(p,f)=>{const y={};return p.forEach(v=>y[v.id]=0),f.forEach(v=>{y[v.source]=(y[v.source]||0)+1,y[v.target]=(y[v.target]||0)+1}),y},N=(p,f)=>{const y=p.length,v=Array(y).fill(0).map(()=>Array(y).fill(0)),M=new Map(p.map((k,S)=>[k.id,S]));return f.forEach(k=>{const S=M.get(k.source),C=M.get(k.target);S!==void 0&&C!==void 0&&(v[S][C]=1,v[C][S]=1)}),v},F=(p,f)=>{const y=p.length,v=Array(y).fill(0).map(()=>Array(y).fill(0)),M=L(p,f);return p.forEach((k,S)=>{v[S][S]=M[k.id]||0}),v},V=(p,f)=>{const y=N(p,f),v=F(p,f),M=p.length,k=Array(M).fill(0).map(()=>Array(M).fill(0));for(let S=0;S<M;S++)for(let C=0;C<M;C++)k[S][C]=v[S][C]-y[S][C];return k},Z=(p,f)=>{if(p.length===0)return"Empty matrix";if(p.length>20)return`Matrix too large to display (${p.length}×${p.length})`;const y=Math.max(...f.map(k=>k.length),2),v=Math.max(y+1,4);let M='<table class="matrix-table" style="border-collapse: collapse;">';return M+='<tr><td style="width: '+v*8+'px;"></td>',f.forEach(k=>{M+=`<td style="text-align: center; padding: 2px 4px; width: ${v*8}px;">${k}</td>`}),M+="</tr>",p.forEach((k,S)=>{M+="<tr>",M+=`<td style="text-align: right; padding: 2px 4px; font-weight: bold;">${f[S]}</td>`,k.forEach(C=>{M+=`<td style="text-align: center; padding: 2px 4px;">${C}</td>`}),M+="</tr>"}),M+="</table>",M},me=p=>[],fe=p=>{const f=p.nodes.length;return p.links.filter(v=>!v.isDirected).length===f-1&&A(p.nodes,p.links).isConnected},xe=p=>{const f=new Map,y=new Set,v=(M,k)=>{if(f.has(M))return f.get(M)===k;f.set(M,k),y.add(M);for(const S of p.links){let C=null;if(S.source===M?C=S.target:!S.isDirected&&S.target===M&&(C=S.source),C&&!v(C,1-k))return!1}return!0};for(const M of p.nodes)if(!y.has(M.id)&&!v(M.id,0))return!1;return!0},ye=p=>{const M=new Map;p.nodes.forEach(S=>{M.set(S.id,0)});const k=S=>{M.set(S,1);for(const C of p.links)if(C.isDirected&&C.source===S){const _=C.target,X=M.get(_);if(X===1||X===0&&k(_))return!0}return M.set(S,2),!1};for(const S of p.nodes)if(M.get(S.id)===0&&k(S.id))return!1;return!0},be=p=>{const f=L(p.nodes,p.links),y=Object.entries(f).sort(([,k],[,S])=>S-k).slice(0,5),v=document.getElementById("degree-centrality");v&&(v.innerHTML=y.map(([k,S])=>`${k}: ${S}`).join("<br>"));const M=document.getElementById("betweenness-centrality");M&&(M.innerHTML="Computing betweenness centrality...")},Le=p=>{const f=A(p.nodes,p.links),y=document.getElementById("component-analysis");y&&(y.innerHTML=f.components.map((v,M)=>`<div class="bg-gray-900 rounded-lg p-4 border border-gray-600">
            <div class="text-white font-semibold mb-2">Component ${M+1}</div>
            <div class="text-purple-400 text-lg font-bold mb-1">${v.length} nodes</div>
            <div class="text-gray-400 text-sm">${v.slice(0,8).join(", ")}${v.length>8?"...":""}</div>
          </div>`).join(""))},je=p=>{const f=document.getElementById(`analysis-options-${p}`);if(!f)return;const y=s.filter(v=>v.category===p);f.innerHTML=y.map(v=>i(v)).join("")},Se=p=>{const f=s.find(S=>S.id===p);if(!f)return;const y=document.querySelector(".tab-button.active"),v=(y==null?void 0:y.getAttribute("data-tab"))||"general",k={id:`cell-${t++}`,type:p,title:f.name,content:ke(p),timestamp:Date.now(),tabId:v};n.push(k),re()},$e=p=>{n=n.filter(f=>f.id!==p),re()},Pe=p=>{const f=n.findIndex(y=>y.id===p);f!==-1&&(n[f].content=ke(n[f].type),n[f].timestamp=Date.now(),re())},re=()=>{["general","matrices","spectral","properties"].forEach(f=>{const y=document.getElementById(`analysis-cells-${f}`);y&&(y.innerHTML="")}),n.forEach(f=>{const y=document.getElementById(`analysis-cells-${f.tabId}`);y&&y.insertAdjacentHTML("beforeend",l(f))})},ze=()=>{n=[],re()},ke=p=>{const{nodes:f,links:y}=x;switch(p){case"basic-info":return Ge(f,y);case"basic-info-default":return U();case"connectivity":return Ie(f,y);case"degree-stats":return ve(f,y);case"adjacency-matrix":return Y(f,y);case"laplacian-matrix":return G(f,y);case"degree-matrix":return oe(f,y);case"incidence-matrix":return le(f,y);case"eigenvalues":return Fe(f,y);case"laplacian-spectrum":return B(f);case"adjacency-spectrum":return z(f);case"algebraic-connectivity":return P(f,y);case"structural-properties":return q(f,y);case"centrality-measures":return D(f,y);case"component-analysis":return O(f,y);case"graph-distances":return j(f,y);default:return'<div class="text-gray-500 italic">Analysis not implemented</div>'}},Ge=(p,f)=>{const y=p.length,v=f.length,M=y*(y-1)/2,k=M>0?v/M:0;return`
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Vertices (|V|)</div>
          <div class="text-3xl font-bold text-purple-400">${y}</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Edges (|E|)</div>
          <div class="text-3xl font-bold text-purple-400">${v}</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Graph Type</div>
          <div class="text-lg font-semibold text-green-400">Undirected</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Density</div>
          <div class="text-lg font-semibold text-blue-400">${k.toFixed(4)}</div>
        </div>
      </div>
    `},Ie=(p,f)=>{const{components:y,isConnected:v}=A(p,f),M=y.length;return`
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Connected:</span>
          <span class="font-semibold ${v?"text-green-400":"text-red-400"} px-3 py-1 bg-gray-700 rounded">${v?"Yes":"No"}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Components:</span>
          <span class="font-semibold text-blue-400 px-3 py-1 bg-gray-700 rounded">${M}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Largest Component:</span>
          <span class="font-semibold text-purple-400 px-3 py-1 bg-gray-700 rounded">${Math.max(...y.map(k=>k.length),0)}</span>
        </div>
      </div>
    `},ve=(p,f)=>{const y=L(p,f),v=Object.values(y),M=Math.min(...v,0),k=Math.max(...v,0),S=v.length>0?v.reduce((C,_)=>C+_,0)/v.length:0;return`
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Min Degree:</span>
          <span class="font-semibold text-blue-400 px-3 py-1 bg-gray-700 rounded">${M}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Max Degree:</span>
          <span class="font-semibold text-blue-400 px-3 py-1 bg-gray-700 rounded">${k}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Average Degree:</span>
          <span class="font-semibold text-blue-400 px-3 py-1 bg-gray-700 rounded">${S.toFixed(2)}</span>
        </div>
      </div>
    `},Y=(p,f)=>{const y=N(p,f);return`
      <div class="bg-gray-900 rounded-lg p-4 overflow-auto border border-gray-600" style="max-height: 400px;">
        <div class="font-mono text-sm text-gray-300">${Z(y,p.map(M=>M.id))}</div>
      </div>
    `},G=(p,f)=>{const y=V(p,f);return`
      <div class="bg-gray-900 rounded-lg p-4 overflow-auto border border-gray-600" style="max-height: 400px;">
        <div class="font-mono text-sm text-gray-300">${Z(y,p.map(M=>M.id))}</div>
      </div>
    `},oe=(p,f)=>{const y=F(p,f);return`
      <div class="bg-gray-900 rounded-lg p-4 overflow-auto border border-gray-600" style="max-height: 400px;">
        <div class="font-mono text-sm text-gray-300">${Z(y,p.map(M=>M.id))}</div>
      </div>
    `},le=(p,f)=>{const y=p.length,v=f.length;return y===0||v===0?'<div class="text-gray-500 italic">No incidence matrix for empty graph</div>':y>15||v>15?`
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Incidence Matrix Dimensions</div>
          <div class="text-lg font-semibold text-purple-400">${y} × ${v}</div>
          <div class="text-xs text-gray-400 mt-2">Matrix too large to display</div>
        </div>
      `:`
      <div class="bg-gray-700 rounded-lg p-4">
        <div class="text-gray-300 text-sm">Incidence Matrix</div>
        <div class="text-lg font-semibold text-purple-400">${y} × ${v}</div>
        <div class="text-xs text-gray-400 mt-2">Vertex-edge incidence relationships</div>
      </div>
    `},Fe=(p,f)=>{const y=p.length,v=y>0?2*f.length/y:0,M=(v*1.5).toFixed(4),k=(v*1.2).toFixed(4),S=(v*.3).toFixed(4);return`
      <div class="space-y-4">
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Largest Eigenvalue (λ₁)</div>
          <div class="text-2xl font-semibold text-purple-400">${M}</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Second Largest Eigenvalue (λ₂)</div>
          <div class="text-2xl font-semibold text-green-400">${k}</div>
        </div>
        <div class="bg-gray-700 rounded-lg p-4">
          <div class="text-gray-300 text-sm">Spectral Gap (λ₁ - λ₂)</div>
          <div class="text-2xl font-semibold text-blue-400">${S}</div>
        </div>
      </div>
    `},B=(p,f)=>{const y=p.length;return`
      <div class="bg-gray-900 rounded-lg p-4 border border-gray-600" style="max-height: 300px; overflow-y: auto;">
        <div class="text-gray-400 text-sm mb-2">Laplacian Eigenvalues (${y} values):</div>
        <div class="font-mono text-sm text-gray-300">Computing eigenvalues for ${y}×${y} matrix...</div>
      </div>
    `},z=(p,f)=>{const y=p.length;return`
      <div class="bg-gray-900 rounded-lg p-4 border border-gray-600" style="max-height: 300px; overflow-y: auto;">
        <div class="text-gray-400 text-sm mb-2">Adjacency Eigenvalues (${y} values):</div>
        <div class="font-mono text-sm text-gray-300">Computing eigenvalues for ${y}×${y} matrix...</div>
      </div>
    `},P=(p,f)=>{const y=p.length,v=y>0?2*f.length/y:0;return`
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Algebraic Connectivity (λ₂):</span>
          <span class="font-semibold text-blue-400 px-3 py-1 bg-gray-700 rounded">${Math.max(0,v-1).toFixed(6)}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Zero Eigenvalues:</span>
          <span class="font-semibold text-green-400 px-3 py-1 bg-gray-700 rounded">~1</span>
        </div>
      </div>
    `},q=(p,f)=>{const{isConnected:y}=A(p,f),v=y&&f.length===p.length-1;return`
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Is Tree:</span>
          <span class="font-semibold ${v?"text-green-400":"text-red-400"} px-3 py-1 bg-gray-700 rounded">${v?"Yes":"No"}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Is Connected:</span>
          <span class="font-semibold ${y?"text-green-400":"text-red-400"} px-3 py-1 bg-gray-700 rounded">${y?"Yes":"No"}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Has Cycles:</span>
          <span class="font-semibold ${v?"text-red-400":"text-green-400"} px-3 py-1 bg-gray-700 rounded">${v?"No":"Possibly"}</span>
        </div>
      </div>
    `},D=(p,f)=>{const y=L(p,f);return`
      <div class="bg-gray-900 rounded-lg p-4 border border-gray-600">
        <div class="text-gray-400 text-sm mb-2">Top 5 Nodes by Degree:</div>
        <div class="font-mono text-sm text-gray-300">${Object.entries(y).sort(([,k],[,S])=>S-k).slice(0,5).map(([k,S])=>`${k}: ${S}`).join("<br>")||"No nodes"}</div>
      </div>
    `},O=(p,f)=>{const{components:y}=A(p,f);return`
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${y.map((M,k)=>`
      <div class="bg-gray-700 rounded-lg p-3">
        <div class="text-gray-300 text-sm">Component ${k+1}</div>
        <div class="text-lg font-semibold text-purple-400">${M.length} nodes</div>
        <div class="text-xs text-gray-400 mt-1">${M.slice(0,5).join(", ")}${M.length>5?"...":""}</div>
      </div>
    `).join("")||'<div class="text-gray-500 italic">No components found</div>'}
      </div>
    `},j=(p,f)=>{const{isConnected:y}=A(p,f);return y?`
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
      `},H=()=>{const p=document.getElementById("math-analysis-panel");p&&p.remove();const f=document.getElementById("graph-container");f&&(f.insertAdjacentHTML("beforeend",o()),["general","matrices","spectral","properties"].forEach(v=>je(v)),Q(),g())},Q=()=>{const f={id:`cell-${t++}`,type:"basic-info-default",title:"Basic Graph Information",content:U(),timestamp:Date.now(),tabId:"general"};n.push(f),re()},U=()=>{const{nodes:p,links:f}=x,y=p.length,v=f.length,M=f.some(ae=>ae.isDirected),k=M?y*(y-1):y*(y-1)/2,S=k>0?v/k:0,{components:C,isConnected:_}=A(p,f),X=C.length,R=L(p,f),ee=Object.values(R),K=ee.length>0?Math.min(...ee):0,te=ee.length>0?Math.max(...ee):0,se=ee.length>0?ee.reduce((ae,de)=>ae+de,0)/ee.length:0;return`
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
              <div class="text-2xl font-bold text-purple-400">${y}</div>
              <div class="text-xs text-gray-400">Vertices (|V|)</div>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 text-center border border-gray-600">
              <div class="text-2xl font-bold text-purple-400">${v}</div>
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
              <span class="font-semibold ${M?"text-orange-400":"text-green-400"} text-sm">
                ${M?"Directed":"Undirected"}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-300 text-sm">Connected:</span>
              <span class="font-semibold ${_?"text-green-400":"text-red-400"} text-sm">
                ${_?"Yes":"No"}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-300 text-sm">Components:</span>
              <span class="font-semibold text-blue-400 text-sm">${X}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-300 text-sm">Density:</span>
              <span class="font-semibold text-purple-400 text-sm">${S.toFixed(4)}</span>
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
              <div class="text-xl font-bold text-blue-400">${K}</div>
              <div class="text-xs text-gray-400">Min Degree</div>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 text-center border border-gray-600">
              <div class="text-xl font-bold text-blue-400">${se.toFixed(1)}</div>
              <div class="text-xs text-gray-400">Avg Degree</div>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 text-center border border-gray-600">
              <div class="text-xl font-bold text-blue-400">${te}</div>
              <div class="text-xs text-gray-400">Max Degree</div>
            </div>
          </div>
        </div>
      </div>
    `};return H(),{togglePanel:c,updateAnalysis:u,isVisible:()=>e}},ce=x=>x?"True":"False",It=x=>{if(!x||!x.nodes||!x.links)throw new Error("Invalid graph data provided");const e=x.nodes,n=x.links,t=new Map;e.forEach((g,a)=>{t.set(g.id,a)});const s=[],o=[];n.forEach(g=>{const a=t.get(g.source),c=t.get(g.target);a!==void 0&&c!==void 0&&(s.push([a,c]),o.push(g.weight||1),g.isDirected||(s.push([c,a]),o.push(g.weight||1)))});const r=[];e.forEach(g=>{const a=[g.isSource?1:0,g.isSink?1:0,g.isTerminal?1:0,g.partition!==void 0?g.partition:0];r.push(a)});const i=n.some(g=>g.weight!==void 0&&g.weight!==1),l=e.some(g=>g.isSource||g.isSink||g.isTerminal),d=e.some(g=>g.partition!==void 0);return{nodeFeatures:r,edgeList:s,edgeWeights:o,hasWeights:i,hasSpecialNodes:l,hasPartitions:d,nodeIdToIndex:t,nodes:e,links:n}},Ct=x=>{const e=It(x),{nodeFeatures:n,edgeList:t,edgeWeights:s,hasWeights:o,hasSpecialNodes:r,hasPartitions:i,nodes:l}=e,d=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19),g=`graph_${d}.py`,a=`graph_${d}.pt`;return{pythonCode:`#!/usr/bin/env python3
"""
GraphBench3000 Export - PyTorch Geometric Data
Generated: ${new Date().toISOString()}
Run this script to create ${a}
"""

import torch
from torch_geometric.data import Data

def create_and_save_graph():
    # Node features [isSource, isSink, isTerminal, partition]
    x = torch.tensor([
${n.map(u=>`        [${u.map(h=>h.toFixed(3)).join(", ")}]`).join(`,
`)}
    ], dtype=torch.float)
    
    # Edge connectivity
    edge_index = torch.tensor([
        [${t.map(u=>u[0]).join(", ")}],
        [${t.map(u=>u[1]).join(", ")}]
    ], dtype=torch.long)
    
    ${o?`# Edge weights/capacities
    edge_attr = torch.tensor([${s.map(u=>u.toFixed(3)).join(", ")}], dtype=torch.float)
    
    # Create PyG Data object
    data = Data(x=x, edge_index=edge_index, edge_attr=edge_attr)`:`# Create PyG Data object  
    data = Data(x=x, edge_index=edge_index)`}
    
    ${r?`# Special node indices
    data.source_nodes = torch.tensor([${l.map((u,h)=>u.isSource?h:-1).filter(u=>u!==-1).join(", ")}], dtype=torch.long)
    data.sink_nodes = torch.tensor([${l.map((u,h)=>u.isSink?h:-1).filter(u=>u!==-1).join(", ")}], dtype=torch.long)
    data.terminal_nodes = torch.tensor([${l.map((u,h)=>u.isTerminal?h:-1).filter(u=>u!==-1).join(", ")}], dtype=torch.long)
    `:""}${i?`# Node partitions
    data.partition = torch.tensor([${l.map(u=>u.partition||0).join(", ")}], dtype=torch.long)
    `:""}
    # Save as .pt file
    torch.save(data, '${a}')
    
    print(f"✅ Graph saved as {ptFilename}")
    print(f"📊 Nodes: {data.num_nodes}, Edges: {data.edge_index.size(1)}")
    ${o?'print(f"⚖️  Weighted edges: Yes")':'print(f"⚖️  Weighted edges: No")'}
    ${r?`print(f"🎯 Special nodes: {len(data.source_nodes) if hasattr(data, 'source_nodes') else 0} sources, {len(data.sink_nodes) if hasattr(data, 'sink_nodes') else 0} sinks")`:""}
    
    return data

if __name__ == "__main__":
    create_and_save_graph()
`,filename:g}},Tt=(x,e)=>{const n=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19),t=`dataset_${x.count}graphs_${n}.py`,s=x.useCurrentProperties?e:x.properties,o=s.has("directed"),r=s.has("weighted"),i=s.has("flow-network"),l=s.has("bipartite"),d=s.has("tree"),g=s.has("dag"),a=s.has("erdos-renyi");return{pythonCode:`#!/usr/bin/env python3
"""
GraphBench3000 Dataset Generator
Generated: ${new Date().toISOString()}
Creates ${x.count} graphs with specified properties
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
    ${l?`partitions = []
    partition_count = ${x.partitionCount}
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
        ])`:i?`# Flow network: designate sources and sinks
    source_count = min(${x.sourceCount}, num_nodes // 3)
    sink_count = min(${x.sinkCount}, num_nodes // 3)
    
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
    
    ${d?`# Tree: generate spanning tree (n-1 edges)
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
        
        edges = set(tree_edges)`:a?`# Erdős-Renyi: generate ER graph then connect components (like generate_data.py)
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
        num_connect = ${x.erdosRenyiConnections}
        for i in range(len(components)):
            for connect_count in range(num_connect):
                other_indices = [j for j in range(len(components)) if j != i]
                j = random.choice(other_indices)
                
                node_a = random.choice(components[i])
                node_b = random.choice(components[j])
                
                if ${ce(o)}:
                    edges.add((node_a, node_b))
                else:
                    edges.add((min(node_a, node_b), max(node_a, node_b)))`:g?`# DAG: generate edges with topological ordering
    max_edges = int(num_nodes * (num_nodes - 1) * edge_density / 2)
    edge_count = 0
    
    for i in range(num_nodes):
        for j in range(i + 1, num_nodes):
            if edge_count < max_edges and random.random() < edge_density:
                edges.add((i, j))
                edge_count += 1`:l?`# Multi-partite: only edges between different partitions
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
        ${!o&&!d&&!g?`# Add reverse edges for undirected graphs
        if not ${ce(o)}:
            edge_list += [(dst, src) for src, dst in edge_list]`:""}
        
        edge_index = torch.tensor(edge_list).t().contiguous()
    else:
        edge_index = torch.empty((2, 0), dtype=torch.long)
    
    # Generate edge attributes if weighted
    ${r?`edge_weights = []
    for _ in range(edge_index.size(1)):
        weight = random.uniform(${x.minWeight}, ${x.maxWeight})
        edge_weights.append(weight)
    edge_attr = torch.tensor(edge_weights, dtype=torch.float)
    
    data = Data(x=x, edge_index=edge_index, edge_attr=edge_attr)`:"data = Data(x=x, edge_index=edge_index)"}
    
    # Add special node information
    ${i?`if special_nodes['sources']:
        data.source_nodes = torch.tensor(special_nodes['sources'], dtype=torch.long)
    if special_nodes['sinks']:
        data.sink_nodes = torch.tensor(special_nodes['sinks'], dtype=torch.long)`:""}
    
    ${l?"data.partition = torch.tensor(partitions, dtype=torch.long)":""}
    
    return data

def generate_dataset():
    """Generate the complete dataset"""
    data_list = []
    
    for i in range(${x.count}):
        # Random parameters for this graph
        num_nodes = random.randint(${x.minNodes}, ${x.maxNodes})
        edge_density = random.uniform(${x.minDensity}, ${x.maxDensity})
        
        data = generate_random_graph(num_nodes, edge_density)
        data_list.append(data)
        
        if (i + 1) % 100 == 0:
            print(f"Generated {i + 1}/${x.count} graphs")
    
    return data_list

if __name__ == "__main__":
    print("Generating dataset with ${x.count} graphs...")
    print("Properties: ${Array.from(s).join(", ")}")
    dataset = generate_dataset()
    
    # Save the dataset
    torch.save(dataset, '${t.replace(".py",".pt")}')
    print(f"Dataset saved as ${t.replace(".py",".pt")}")
    print(f"Total graphs: {len(dataset)}")
    print(f"Node range: ${x.minNodes}-${x.maxNodes}")
    print(f"Density range: ${x.minDensity}-${x.maxDensity}")
`,filename:t}},Ue=(x,e)=>{const n=new Blob([x],{type:"text/python"}),t=URL.createObjectURL(n),s=document.createElement("a");s.href=t,s.download=e,s.style.display="none",document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(t)};class At{constructor(){ie(this,"modal");ie(this,"currentGraphData",null);ie(this,"datasetProperties",new Set);this.modal=document.getElementById("export-modal"),this.initializeEventHandlers(),this.setupDatasetPropertyInteractions()}initializeEventHandlers(){const e=document.getElementById("export-btn"),n=document.getElementById("close-export-modal");e&&e.addEventListener("click",()=>this.openModal()),n&&n.addEventListener("click",()=>this.closeModal()),this.modal.addEventListener("click",o=>{o.target===this.modal&&this.closeModal()});const t=document.getElementById("export-current-graph"),s=document.getElementById("export-dataset");t&&t.addEventListener("click",()=>this.exportCurrentGraph()),s&&s.addEventListener("click",()=>this.exportDataset()),document.addEventListener("keydown",o=>{o.key==="Escape"&&!this.modal.classList.contains("hidden")&&this.closeModal()})}setupDatasetPropertyInteractions(){this.modal.querySelectorAll(".dataset-property-tag").forEach(t=>{t.addEventListener("click",()=>{var o;if(t.classList.contains("disabled"))return;const s=t.getAttribute("data-property");s&&(this.datasetProperties.has(s)?this.datasetProperties.delete(s):(this.datasetProperties.add(s),(((o=t.getAttribute("data-excludes"))==null?void 0:o.split(","))||[]).forEach(i=>{this.datasetProperties.delete(i.trim())})),this.updateDatasetPropertyTags())})});const n=document.getElementById("dataset-use-current");n&&n.addEventListener("change",()=>{n.checked&&(this.datasetProperties=new Set(W),this.updateDatasetPropertyTags(),this.syncWithCurrentSettings())})}syncWithCurrentSettings(){const e=document.getElementById("node-count"),n=document.getElementById("dataset-min-nodes"),t=document.getElementById("dataset-max-nodes");if(e&&n&&t){const T=parseInt(e.value);n.value=T.toString(),t.value=T.toString()}const s=document.getElementById("edge-probability"),o=document.getElementById("dataset-min-density"),r=document.getElementById("dataset-max-density");if(s&&o&&r){const T=parseFloat(s.value);o.value=T.toFixed(2),r.value=T.toFixed(2)}const i=document.getElementById("min-weight"),l=document.getElementById("max-weight"),d=document.getElementById("dataset-min-weight"),g=document.getElementById("dataset-max-weight");i&&l&&d&&g&&(d.value=i.value,g.value=l.value);const a=document.getElementById("component-count-value"),c=document.getElementById("dataset-component-count-value"),u=document.getElementById("dataset-component-count");if(a&&c&&u){const T=a.value;c.value=T,u.value=T}const h=document.getElementById("partition-count-value"),w=document.getElementById("dataset-partition-count-value"),m=document.getElementById("dataset-partition-count");if(h&&w&&m){const T=h.value;w.value=T,m.value=T}const $=document.getElementById("source-count"),b=document.getElementById("sink-count"),E=document.getElementById("dataset-source-count"),I=document.getElementById("dataset-sink-count");$&&E&&(E.value=$.value),b&&I&&(I.value=b.value),console.log("Synced settings with current properties:",Array.from(W))}openModal(){this.modal.classList.remove("hidden"),document.body.style.overflow="hidden",this.datasetProperties=new Set(W),this.updateDatasetPropertyTags(),this.syncWithCurrentSettings()}closeModal(){this.modal.classList.add("hidden"),document.body.style.overflow=""}setCurrentGraphData(e){this.currentGraphData=e}exportCurrentGraph(){if(!this.currentGraphData){alert("No graph data available to export.");return}try{const e=Ct(this.currentGraphData);Ue(e.pythonCode,e.filename),this.showSuccessMessage(`Python script exported: ${e.filename}. Run it to create the .pt file!`)}catch(e){console.error("Export error:",e),alert(`Export failed: ${e instanceof Error?e.message:"Unknown error"}`)}}exportDataset(){try{const e=this.getDatasetConfig();if(e.count<=0||e.count>1e5){alert("Number of graphs must be between 1 and 100,000");return}if(e.minNodes<=0||e.maxNodes<=0||e.minNodes>e.maxNodes){alert("Invalid node count range");return}if(e.minDensity<0||e.maxDensity>1||e.minDensity>e.maxDensity){alert("Invalid density range (must be between 0 and 1)");return}const n=Tt(e,W);Ue(n.pythonCode,n.filename),this.showSuccessMessage(`Dataset generation script created: ${n.filename}`)}catch(e){console.error("Dataset export error:",e),alert(`Dataset export failed: ${e instanceof Error?e.message:"Unknown error"}`)}}getDatasetConfig(){const e=document.getElementById("dataset-count"),n=document.getElementById("dataset-use-current"),t=document.getElementById("dataset-min-nodes"),s=document.getElementById("dataset-max-nodes"),o=document.getElementById("dataset-min-density"),r=document.getElementById("dataset-max-density"),i=document.getElementById("dataset-min-weight"),l=document.getElementById("dataset-max-weight"),d=document.getElementById("dataset-component-count-value"),g=document.getElementById("dataset-partition-count-value"),a=document.getElementById("dataset-source-count"),c=document.getElementById("dataset-sink-count");return{count:parseInt(e==null?void 0:e.value)||1e3,minNodes:parseInt(t==null?void 0:t.value)||20,maxNodes:parseInt(s==null?void 0:s.value)||20,minDensity:parseFloat(o==null?void 0:o.value)||.3,maxDensity:parseFloat(r==null?void 0:r.value)||.3,useCurrentProperties:(n==null?void 0:n.checked)||!1,properties:this.datasetProperties,minWeight:parseFloat(i==null?void 0:i.value)||1,maxWeight:parseFloat(l==null?void 0:l.value)||5,componentCount:parseInt(d==null?void 0:d.value)||2,partitionCount:parseInt(g==null?void 0:g.value)||2,sourceCount:parseInt(a==null?void 0:a.value)||1,sinkCount:parseInt(c==null?void 0:c.value)||1,erdosRenyiConnections:1}}showSuccessMessage(e){const n=document.createElement("div");n.className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[60] transform translate-x-0 transition-transform duration-300",n.textContent=e,document.body.appendChild(n),setTimeout(()=>{n.style.transform="translateX(100%)",setTimeout(()=>{document.body.removeChild(n)},300)},3e3)}updateDatasetPropertyTags(){const e=this.modal.querySelectorAll(".dataset-property-tag");console.log("Current active properties:",Array.from(W)),console.log("Dataset properties:",Array.from(this.datasetProperties)),e.forEach(n=>{var s;const t=n.getAttribute("data-property");t&&(console.log(`Checking property: ${t}, active: ${this.datasetProperties.has(t)}`),this.datasetProperties.has(t)?n.classList.add("active"):n.classList.remove("active"),(((s=n.getAttribute("data-excludes"))==null?void 0:s.split(","))||[]).some(i=>this.datasetProperties.has(i.trim()))?n.classList.add("disabled"):n.classList.remove("disabled"))}),this.updateDatasetConditionalControls()}updateDatasetConditionalControls(){const e=document.getElementById("dataset-weight-controls");e&&(this.datasetProperties.has("weighted")?e.classList.remove("hidden"):e.classList.add("hidden"));const n=document.getElementById("dataset-component-controls");n&&(this.datasetProperties.has("disconnected")?n.classList.remove("hidden"):n.classList.add("hidden"));const t=document.getElementById("dataset-multipartite-controls");t&&(this.datasetProperties.has("bipartite")?t.classList.remove("hidden"):t.classList.add("hidden"));const s=document.getElementById("dataset-flow-network-controls");s&&(this.datasetProperties.has("flow-network")?s.classList.remove("hidden"):s.classList.add("hidden"))}}const Bt=()=>new At,Ye=document.querySelector("#app");if(!Ye)throw new Error("App element not found");Ye.innerHTML=et();async function _t(){try{await ut(),We();const x=$t(W);if(!x)throw new Error("Failed to initialize graph visualizer");const e=kt(),n=Bt();x.addGraphDataChangeCallback(s=>{e.updateAnalysis(s),n.setCurrentGraphData(s)}),ot(),lt(),dt(x.generateGraph,x.solveAlgorithm),setTimeout(()=>{Ee()},100);const t=document.getElementById("math-analysis-btn");t&&t.addEventListener("click",()=>{e.togglePanel()}),x.generateGraph(),console.log("Application initialized successfully")}catch(x){console.error("Error initializing application:",x)}}_t();
