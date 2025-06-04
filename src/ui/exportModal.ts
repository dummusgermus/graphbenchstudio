import type { GraphData } from '../algorithms/types';
import { exportToPt, generateDataset, downloadPythonFile } from '../utils/pygExporter';
import type { DatasetConfig } from '../utils/pygExporter';
import { activeProperties } from './uiState';

export class ExportModalManager {
  private modal: HTMLElement;
  private currentGraphData: GraphData | null = null;
  private datasetProperties: Set<string> = new Set();

  constructor() {
    this.modal = document.getElementById('export-modal')!;
    this.initializeEventHandlers();
    this.setupDatasetPropertyInteractions();
  }

  private initializeEventHandlers() {
    // Modal open/close handlers
    const exportBtn = document.getElementById('export-btn');
    const closeBtn = document.getElementById('close-export-modal');
    
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.openModal());
    }
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Click outside to close
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Export handlers
    const exportCurrentGraph = document.getElementById('export-current-graph');
    const exportDataset = document.getElementById('export-dataset');

    if (exportCurrentGraph) {
      exportCurrentGraph.addEventListener('click', () => this.exportCurrentGraph());
    }

    if (exportDataset) {
      exportDataset.addEventListener('click', () => this.exportDataset());
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this.closeModal();
      }
    });
  }

  private initializeDatasetProperties() {
    // Initialize dataset properties with current active properties
    this.datasetProperties = new Set(activeProperties);
    this.updateDatasetPropertyTags();
  }

  private updateDatasetPropertyTags() {
    const propertyTags = this.modal.querySelectorAll('.dataset-property-tag');
    
    console.log('Current active properties:', Array.from(activeProperties));
    console.log('Dataset properties:', Array.from(this.datasetProperties));
    
    propertyTags.forEach(tag => {
      const property = tag.getAttribute('data-property');
      if (property) {
        console.log(`Checking property: ${property}, active: ${this.datasetProperties.has(property)}`);
        
        if (this.datasetProperties.has(property)) {
          tag.classList.add('active');
        } else {
          tag.classList.remove('active');
        }
        
        // Handle exclusions
        const excludes = tag.getAttribute('data-excludes')?.split(',') || [];
        const hasExcludedProperty = excludes.some(excluded => this.datasetProperties.has(excluded.trim()));
        
        if (hasExcludedProperty) {
          tag.classList.add('disabled');
        } else {
          tag.classList.remove('disabled');
        }
      }
    });

    // Show/hide conditional controls
    this.updateDatasetConditionalControls();
  }

  private updateDatasetConditionalControls() {
    // Weight controls
    const weightControls = document.getElementById('dataset-weight-controls');
    if (weightControls) {
      if (this.datasetProperties.has('weighted')) {
        weightControls.classList.remove('hidden');
      } else {
        weightControls.classList.add('hidden');
      }
    }

    // Component controls
    const componentControls = document.getElementById('dataset-component-controls');
    if (componentControls) {
      if (this.datasetProperties.has('disconnected')) {
        componentControls.classList.remove('hidden');
      } else {
        componentControls.classList.add('hidden');
      }
    }

    // Multipartite controls
    const multipartiteControls = document.getElementById('dataset-multipartite-controls');
    if (multipartiteControls) {
      if (this.datasetProperties.has('bipartite')) {
        multipartiteControls.classList.remove('hidden');
      } else {
        multipartiteControls.classList.add('hidden');
      }
    }

    // Flow network controls
    const flowControls = document.getElementById('dataset-flow-network-controls');
    if (flowControls) {
      if (this.datasetProperties.has('flow-network')) {
        flowControls.classList.remove('hidden');
      } else {
        flowControls.classList.add('hidden');
      }
    }
  }

  private setupDatasetPropertyInteractions() {
    const propertyTags = this.modal.querySelectorAll('.dataset-property-tag');
    
    propertyTags.forEach(tag => {
      tag.addEventListener('click', () => {
        if (tag.classList.contains('disabled')) return;
        
        const property = tag.getAttribute('data-property');
        if (!property) return;

        if (this.datasetProperties.has(property)) {
          this.datasetProperties.delete(property);
        } else {
          this.datasetProperties.add(property);
          
          // Handle exclusions
          const excludes = tag.getAttribute('data-excludes')?.split(',') || [];
          excludes.forEach(excluded => {
            this.datasetProperties.delete(excluded.trim());
          });
        }

        this.updateDatasetPropertyTags();
      });
    });

    // Use current properties checkbox
    const useCurrentCheckbox = document.getElementById('dataset-use-current') as HTMLInputElement;
    if (useCurrentCheckbox) {
      useCurrentCheckbox.addEventListener('change', () => {
        if (useCurrentCheckbox.checked) {
          // Reset to current properties
          this.datasetProperties = new Set(activeProperties);
          this.updateDatasetPropertyTags();
          
          // Update input values from current settings
          this.syncWithCurrentSettings();
        }
      });
    }
  }

  private syncWithCurrentSettings() {
    // Sync node count - set min=max=current value
    const nodeCountInput = document.getElementById('node-count') as HTMLInputElement;
    const datasetMinNodes = document.getElementById('dataset-min-nodes') as HTMLInputElement;
    const datasetMaxNodes = document.getElementById('dataset-max-nodes') as HTMLInputElement;
    if (nodeCountInput && datasetMinNodes && datasetMaxNodes) {
      const currentNodes = parseInt(nodeCountInput.value);
      datasetMinNodes.value = currentNodes.toString();
      datasetMaxNodes.value = currentNodes.toString();
    }

    // Sync edge density - set min=max=current value
    const edgeProbInput = document.getElementById('edge-probability') as HTMLInputElement;
    const datasetMinDensity = document.getElementById('dataset-min-density') as HTMLInputElement;
    const datasetMaxDensity = document.getElementById('dataset-max-density') as HTMLInputElement;
    if (edgeProbInput && datasetMinDensity && datasetMaxDensity) {
      const currentDensity = parseFloat(edgeProbInput.value);
      datasetMinDensity.value = currentDensity.toFixed(2);
      datasetMaxDensity.value = currentDensity.toFixed(2);
    }

    // Sync weight ranges
    const minWeightInput = document.getElementById('min-weight') as HTMLInputElement;
    const maxWeightInput = document.getElementById('max-weight') as HTMLInputElement;
    const datasetMinWeight = document.getElementById('dataset-min-weight') as HTMLInputElement;
    const datasetMaxWeight = document.getElementById('dataset-max-weight') as HTMLInputElement;
    if (minWeightInput && maxWeightInput && datasetMinWeight && datasetMaxWeight) {
      datasetMinWeight.value = minWeightInput.value;
      datasetMaxWeight.value = maxWeightInput.value;
    }

    // Sync component count from current settings
    const componentCountValue = document.getElementById('component-count-value') as HTMLInputElement;
    const datasetComponentCountValue = document.getElementById('dataset-component-count-value') as HTMLInputElement;
    const datasetComponentCount = document.getElementById('dataset-component-count') as HTMLInputElement;
    if (componentCountValue && datasetComponentCountValue && datasetComponentCount) {
      const currentComponents = componentCountValue.value;
      datasetComponentCountValue.value = currentComponents;
      datasetComponentCount.value = currentComponents;
    }

    // Sync partition count from current settings
    const partitionCountValue = document.getElementById('partition-count-value') as HTMLInputElement;
    const datasetPartitionCountValue = document.getElementById('dataset-partition-count-value') as HTMLInputElement;
    const datasetPartitionCount = document.getElementById('dataset-partition-count') as HTMLInputElement;
    if (partitionCountValue && datasetPartitionCountValue && datasetPartitionCount) {
      const currentPartitions = partitionCountValue.value;
      datasetPartitionCountValue.value = currentPartitions;
      datasetPartitionCount.value = currentPartitions;
    }

    // Sync source/sink counts from current settings
    const sourceCountInput = document.getElementById('source-count') as HTMLInputElement;
    const sinkCountInput = document.getElementById('sink-count') as HTMLInputElement;
    const datasetSourceCount = document.getElementById('dataset-source-count') as HTMLInputElement;
    const datasetSinkCount = document.getElementById('dataset-sink-count') as HTMLInputElement;
    if (sourceCountInput && datasetSourceCount) {
      datasetSourceCount.value = sourceCountInput.value;
    }
    if (sinkCountInput && datasetSinkCount) {
      datasetSinkCount.value = sinkCountInput.value;
    }

    console.log('Synced settings with current properties:', Array.from(activeProperties));
  }

  public openModal() {
    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Always sync with current settings when opening the modal
    this.datasetProperties = new Set(activeProperties);
    this.updateDatasetPropertyTags();
    this.syncWithCurrentSettings();
  }

  public closeModal() {
    this.modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  public setCurrentGraphData(graphData: GraphData) {
    this.currentGraphData = graphData;
  }

  private exportCurrentGraph() {
    if (!this.currentGraphData) {
      alert('No graph data available to export.');
      return;
    }

    try {
      const exportData = exportToPt(this.currentGraphData);
      downloadPythonFile(exportData.pythonCode, exportData.filename);
      
      // Show success message
      this.showSuccessMessage(`Python script exported: ${exportData.filename}. Run it to create the .pt file!`);
    } catch (error) {
      console.error('Export error:', error);
      alert(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private exportDataset() {
    try {
      const config = this.getDatasetConfig();
      
      // Validate config
      if (config.count <= 0 || config.count > 100000) {
        alert('Number of graphs must be between 1 and 100,000');
        return;
      }
      
      if (config.minNodes <= 0 || config.maxNodes <= 0 || config.minNodes > config.maxNodes) {
        alert('Invalid node count range');
        return;
      }
      
      if (config.minDensity < 0 || config.maxDensity > 1 || config.minDensity > config.maxDensity) {
        alert('Invalid density range (must be between 0 and 1)');
        return;
      }

      const exportData = generateDataset(config, activeProperties);
      downloadPythonFile(exportData.pythonCode, exportData.filename);
      
      // Show success message
      this.showSuccessMessage(`Dataset generation script created: ${exportData.filename}`);
    } catch (error) {
      console.error('Dataset export error:', error);
      alert(`Dataset export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private getDatasetConfig(): DatasetConfig {
    const countInput = document.getElementById('dataset-count') as HTMLInputElement;
    const useCurrentCheckbox = document.getElementById('dataset-use-current') as HTMLInputElement;
    const minNodesInput = document.getElementById('dataset-min-nodes') as HTMLInputElement;
    const maxNodesInput = document.getElementById('dataset-max-nodes') as HTMLInputElement;
    const minDensityInput = document.getElementById('dataset-min-density') as HTMLInputElement;
    const maxDensityInput = document.getElementById('dataset-max-density') as HTMLInputElement;
    const minWeightInput = document.getElementById('dataset-min-weight') as HTMLInputElement;
    const maxWeightInput = document.getElementById('dataset-max-weight') as HTMLInputElement;
    const componentCountInput = document.getElementById('dataset-component-count-value') as HTMLInputElement;
    const partitionCountInput = document.getElementById('dataset-partition-count-value') as HTMLInputElement;
    const sourceCountInput = document.getElementById('dataset-source-count') as HTMLInputElement;
    const sinkCountInput = document.getElementById('dataset-sink-count') as HTMLInputElement;

    return {
      count: parseInt(countInput?.value) || 1000,
      minNodes: parseInt(minNodesInput?.value) || 20,
      maxNodes: parseInt(maxNodesInput?.value) || 20,
      minDensity: parseFloat(minDensityInput?.value) || 0.30,
      maxDensity: parseFloat(maxDensityInput?.value) || 0.30,
      useCurrentProperties: useCurrentCheckbox?.checked || false,
      properties: this.datasetProperties,
      minWeight: parseFloat(minWeightInput?.value) || 1,
      maxWeight: parseFloat(maxWeightInput?.value) || 5,
      componentCount: parseInt(componentCountInput?.value) || 2,
      partitionCount: parseInt(partitionCountInput?.value) || 2,
      sourceCount: parseInt(sourceCountInput?.value) || 1,
      sinkCount: parseInt(sinkCountInput?.value) || 1
    };
  }

  private showSuccessMessage(message: string) {
    // Create a temporary success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[60] transform translate-x-0 transition-transform duration-300';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

export const initializeExportModal = (): ExportModalManager => {
  return new ExportModalManager();
}; 