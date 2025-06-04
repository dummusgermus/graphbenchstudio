// Status message functionality

export const showStatusMessage = (message: string, type: 'success' | 'error' | 'warning') => {
  const statusEl = document.getElementById('status-message');
  if (!statusEl) return;
  
  statusEl.textContent = message;
  statusEl.className = `mt-3 p-2 rounded-lg text-xs ${
    type === 'success' ? 'bg-green-900/50 text-green-300 border border-green-700' :
    type === 'error' ? 'bg-red-900/50 text-red-300 border border-red-700' :
    'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
  }`;
  statusEl.classList.remove('hidden');
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    statusEl.classList.add('hidden');
  }, 5000);
}; 