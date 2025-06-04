// Modal and Window Management

let isDragging = false;
let dragOffset = { x: 0, y: 0 };

export const initializeModalManager = () => {
  const advancedConfigBtn = document.getElementById('advanced-config-btn') as HTMLButtonElement;
  const advancedConfigWindow = document.getElementById('advanced-config-window') as HTMLElement;
  const closeAdvancedConfig = document.getElementById('close-advanced-config') as HTMLButtonElement;
  const cancelAdvancedConfig = document.getElementById('cancel-advanced-config') as HTMLButtonElement;
  const applyAdvancedConfig = document.getElementById('apply-advanced-config') as HTMLButtonElement;
  const windowHeader = document.getElementById('window-header');

  // Handle advanced config panel toggle
  if (advancedConfigBtn && advancedConfigWindow) {
    advancedConfigBtn.addEventListener('click', () => {
      // Position window near the button
      const buttonRect = advancedConfigBtn.getBoundingClientRect();
      const windowWidth = 320; // 80 * 4 (w-80 in Tailwind)
      const windowHeight = 400; // Approximate height
      
      // Calculate position (to the right and slightly above the button)
      let left = buttonRect.right + 10;
      let top = buttonRect.top - 80; // Spawn 80px higher than the button
      
      // Adjust if window would go off-screen
      if (left + windowWidth > window.innerWidth) {
        left = buttonRect.left - windowWidth - 10; // Position to the left instead
      }
      
      if (top + windowHeight > window.innerHeight) {
        top = window.innerHeight - windowHeight - 10; // Move up if needed
      }
      
      // Ensure minimum margins
      left = Math.max(10, left);
      top = Math.max(10, top);
      
      // Apply positioning
      advancedConfigWindow.style.left = `${left}px`;
      advancedConfigWindow.style.top = `${top}px`;
      advancedConfigWindow.style.right = 'auto';
      
      advancedConfigWindow.classList.remove('hidden');
    });
  }

  // Handle modal close buttons
  if (closeAdvancedConfig && advancedConfigWindow) {
    closeAdvancedConfig.addEventListener('click', () => {
      advancedConfigWindow.classList.add('hidden');
    });
  }

  if (cancelAdvancedConfig && advancedConfigWindow) {
    cancelAdvancedConfig.addEventListener('click', () => {
      advancedConfigWindow.classList.add('hidden');
    });
  }

  if (applyAdvancedConfig && advancedConfigWindow) {
    applyAdvancedConfig.addEventListener('click', () => {
      advancedConfigWindow.classList.add('hidden');
    });
  }

  // Make window draggable
  if (windowHeader && advancedConfigWindow) {
    windowHeader.addEventListener('mousedown', (e) => {
      isDragging = true;
      const rect = advancedConfigWindow.getBoundingClientRect();
      dragOffset.x = e.clientX - rect.left;
      dragOffset.y = e.clientY - rect.top;
      
      // Prevent text selection while dragging
      e.preventDefault();
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging || !advancedConfigWindow) return;
      
      const x = e.clientX - dragOffset.x;
      const y = e.clientY - dragOffset.y;
      
      // Keep window within viewport bounds
      const maxX = window.innerWidth - advancedConfigWindow.offsetWidth;
      const maxY = window.innerHeight - advancedConfigWindow.offsetHeight;
      
      const clampedX = Math.max(0, Math.min(x, maxX));
      const clampedY = Math.max(0, Math.min(y, maxY));
      
      advancedConfigWindow.style.left = `${clampedX}px`;
      advancedConfigWindow.style.top = `${clampedY}px`;
      advancedConfigWindow.style.right = 'auto'; // Remove right positioning
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.userSelect = '';
      }
    });
  }
}; 