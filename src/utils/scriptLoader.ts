// Script loader utility

// Create a simple script loader function
export function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
}

// Load scripts and initialize
export async function loadRequiredScripts(): Promise<void> {
  try {
    // Load scripts sequentially
    await loadScript('https://unpkg.com/three@0.158.0/build/three.min.js');
    await loadScript('https://unpkg.com/3d-force-graph@1.77.0/dist/3d-force-graph.min.js');
  } catch (error) {
    console.error('Error loading scripts:', error);
    throw error;
  }
} 