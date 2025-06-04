// Information Panel Management

// Track currently selected edge and node for highlighting
export let selectedEdge: any = null;
export let selectedNode: any = null;

// Track dragging state for info panel
let isInfoPanelDragging = false;
let infoDragOffset = { x: 0, y: 0 };
let dragStarted = false;

export const initializeInfoPanel = (graph: any, resetGraphVisualization: () => void, activeProperties: Set<string>) => {
  const infoPanel = document.getElementById('info-panel') as HTMLElement;
  const infoTitle = document.getElementById('info-title') as HTMLElement;
  const infoContent = document.getElementById('info-content') as HTMLElement;
  const infoIcon = document.getElementById('info-icon') as HTMLElement;
  const closeInfoPanel = document.getElementById('close-info-panel') as HTMLButtonElement;

  if (!infoPanel || !infoTitle || !infoContent || !infoIcon) return;

  // Position info panel near an element
  const positionInfoPanel = (element: any) => {
    // For nodes, get their screen position
    if (element.x !== undefined && element.y !== undefined && element.z !== undefined) {
      // Node positioning - convert 3D coordinates to screen coordinates
      const coords = graph.graph2ScreenCoords(element.x, element.y, element.z);
      if (coords) {
        let left = coords.x + 20; // Offset from the node
        let top = coords.y - 100; // Position above the node
        
        // Ensure panel stays within viewport
        const panelWidth = 320; // w-80 in Tailwind
        const panelHeight = 200; // Approximate height
        
        if (left + panelWidth > window.innerWidth) {
          left = coords.x - panelWidth - 20; // Position to the left instead
        }
        if (top < 10) {
          top = coords.y + 20; // Position below if too high
        }
        if (top + panelHeight > window.innerHeight) {
          top = window.innerHeight - panelHeight - 10;
        }
        
        // Apply positioning
        infoPanel.style.left = `${Math.max(10, left)}px`;
        infoPanel.style.top = `${Math.max(10, top)}px`;
      } else {
        // Fallback positioning
        infoPanel.style.left = '50px';
        infoPanel.style.top = '50px';
      }
    } else {
      // Edge positioning - position in center for now (edges don't have direct coordinates)
      infoPanel.style.left = '50px';
      infoPanel.style.top = '50px';
    }
    
    // Remove right positioning if it was set
    infoPanel.style.right = 'auto';
  };

  // Show node information
  const showNodeInfo = (node: any) => {
    // Clear any selected edge highlighting when showing node info
    selectedEdge = null;
    // Store the selected node for highlighting
    selectedNode = node;
    
    // Update node highlighting - this needs to be handled by the caller
    // as it requires access to the graph instance and THREE.js objects
    
    // Reset edge colors to default
    resetGraphVisualization();
    
    // Update icon for node
    infoIcon.innerHTML = `
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="3"></circle>
    `;
    
    // Update title back to "Node Information"
    infoTitle.textContent = 'Node Information';
    
    // Update content - simplified to only show ID and special properties
    infoContent.innerHTML = `
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-gray-400 text-sm">Node ID:</span>
          <span class="text-white font-mono text-sm">${node.id}</span>
        </div>
        ${node.isSource ? '<div class="text-green-400 text-sm font-medium">Source Node</div>' : ''}
        ${node.isSink ? '<div class="text-red-400 text-sm font-medium">Sink Node</div>' : ''}
        ${node.isTerminal ? '<div class="text-yellow-400 text-sm font-medium">Terminal Node</div>' : ''}
      </div>
    `;
    
    // Position the panel near the node
    positionInfoPanel(node);
    
    // Show panel
    infoPanel.classList.remove('hidden');
  };

  // Show edge information
  const showEdgeInfo = (edge: any, currentGraphData: any) => {
    // Store the selected edge for highlighting
    selectedEdge = edge;
    
    // Clear any selected node highlighting when showing edge info
    selectedNode = null;
    
    // Update icon for edge
    infoIcon.innerHTML = `
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
    `;
    
    // Update title
    infoTitle.textContent = 'Edge Information';
    
    // Get source and target node IDs
    const sourceId = typeof edge.source === 'object' ? edge.source.id : edge.source;
    const targetId = typeof edge.target === 'object' ? edge.target.id : edge.target;
    
    // Determine if this is a directed edge
    const isDirected = edge.isDirected || activeProperties.has('directed') || currentGraphData.specialAttributes?.isFlowNetwork;
    
    // Choose appropriate connection notation
    const connectionSymbol = isDirected ? '→' : '—';
    const connectionLabel = isDirected ? 'Connection:' : 'Connection:';
    
    // Update content
    infoContent.innerHTML = `
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-gray-400 text-sm">${connectionLabel}</span>
          <span class="text-white font-mono text-sm">${sourceId} ${connectionSymbol} ${targetId}</span>
        </div>
        ${isDirected ? `
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Source:</span>
            <span class="text-white font-mono text-sm">${sourceId}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Target:</span>
            <span class="text-white font-mono text-sm">${targetId}</span>
          </div>
        ` : ''}
        ${edge.weight !== undefined ? `
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Weight:</span>
            <span class="text-white font-mono text-sm">${edge.weight}</span>
          </div>
        ` : ''}
        ${edge.capacity !== undefined ? `
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Capacity:</span>
            <span class="text-white font-mono text-sm">${edge.capacity}</span>
          </div>
        ` : ''}
        ${isDirected ? '<div class="text-blue-400 text-sm font-medium">Directed Edge</div>' : '<div class="text-purple-400 text-sm font-medium">Undirected Edge</div>'}
      </div>
    `;
    
    // Position the panel near the edge
    positionInfoPanel(edge);
    
    // Show panel
    infoPanel.classList.remove('hidden');
  };

  // Handle info panel close button functionality
  if (closeInfoPanel) {
    closeInfoPanel.addEventListener('click', () => {
      selectedEdge = null; // Clear selected edge highlighting
      selectedNode = null; // Clear selected node highlighting
      resetGraphVisualization(); // Reset graph to default state
      infoPanel.classList.add('hidden');
    });
  }

  // Click outside to close info panel
  document.addEventListener('click', (e) => {
    // Don't close if we just finished dragging
    if (isInfoPanelDragging) return;
    
    const target = e.target as HTMLElement;
    const clickedOnPanel = infoPanel.contains(target);
    
    // Close panel if clicked outside of it (anywhere, including graph area)
    if (!clickedOnPanel && !infoPanel.classList.contains('hidden')) {
      selectedEdge = null; // Clear selected edge highlighting
      selectedNode = null; // Clear selected node highlighting
      resetGraphVisualization(); // Reset graph to default state
      infoPanel.classList.add('hidden');
    }
  });

  // Make info panel draggable
  const infoHeader = infoPanel?.querySelector('.flex.items-center.justify-between') as HTMLElement;
  if (infoHeader) {
    // Add cursor pointer to indicate draggable
    infoHeader.style.cursor = 'move';
    
    infoHeader.addEventListener('mousedown', (e) => {
      dragStarted = true;
      
      // Get the current position from the computed style
      const currentLeft = parseInt(infoPanel.style.left) || 0;
      const currentTop = parseInt(infoPanel.style.top) || 0;
      
      // Calculate offset from mouse position to panel's current position
      infoDragOffset.x = e.clientX - currentLeft;
      infoDragOffset.y = e.clientY - currentTop;
      
      // Prevent text selection while dragging
      e.preventDefault();
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!dragStarted) return;
      
      // Start dragging only after the first move (prevents accidental drags)
      if (!isInfoPanelDragging) {
        isInfoPanelDragging = true;
      }
      
      const x = e.clientX - infoDragOffset.x;
      const y = e.clientY - infoDragOffset.y;
      
      // Keep panel within viewport bounds
      const maxX = window.innerWidth - infoPanel.offsetWidth;
      const maxY = window.innerHeight - infoPanel.offsetHeight;
      
      const clampedX = Math.max(0, Math.min(x, maxX));
      const clampedY = Math.max(0, Math.min(y, maxY));
      
      infoPanel.style.left = `${clampedX}px`;
      infoPanel.style.top = `${clampedY}px`;
      infoPanel.style.right = 'auto';
    });

    document.addEventListener('mouseup', () => {
      if (dragStarted) {
        dragStarted = false;
        document.body.style.userSelect = '';
        
        // Add a small delay before allowing click-to-close to prevent immediate closing
        if (isInfoPanelDragging) {
          setTimeout(() => {
            isInfoPanelDragging = false;
          }, 50);
        }
      }
    });
  }

  return { showNodeInfo, showEdgeInfo };
}; 