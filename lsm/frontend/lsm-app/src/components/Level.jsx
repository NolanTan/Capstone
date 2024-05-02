import { Component } from 'react';
import SSTable from './SSTable';
import './LSMTree.css';

/**
 * Class representing a level in the LSM-tree.
 * 
 * @author Nolan Flinchum
 * @version 5/1/2024
 */
class Level extends Component {
    /**
     * Constructs a new Level instance.
     */
    constructor() {
        super();
        this.sstables = []; 
        this.sstableCount = 0; // Initialize SSTable count
    }

    /**
     * Adds an SSTable with provided nodes to the level.
     * 
     * @param {Array} nodes - Nodes to be added to the SSTable.
     */
    addSSTable(nodes) {
        const sstable = new SSTable();
        for(let i = 0; i < nodes.length; i++) 
            sstable.insert(nodes[i].key, nodes[i].value);
        this.sstables.unshift(sstable);
        this.sstableCount++;
    }

    /**
     * Searches for an ID across the SSTables on the disk.
     * 
     * @param {string} id - The ID to search for.
     * @returns {string|null} The value associated with the ID if found, otherwise null.
     */
    search(id) {
        let result = null;
        for(let i = 0; i < this.sstables.length; i++) {
            result = this.sstables[i].get(id);
            if(result != null) return result;
        }
        return result; // Return null if nothing was found
    }

    /**
     * "Compacts" the level by removing obsolete data.
     * 
     * @returns {Array} - The compacted data.
     */
    compact() { 
        let olderData = this.sstables.pop().data;
        let newerData = this.sstables.pop().data;
        this.sstableCount -= 2;

        // Only keep old data if key is not present in new data - obsolete data removed
        let newerDataKeys = new Set(newerData.map(obj => obj.key));
        let dataToKeep = olderData.filter(obj => !newerDataKeys.has(obj.key));

        return newerData.concat(dataToKeep);
    }

    /**
     * Clears the bloom filter status of all SSTables in the level.
     */
    clearBloomFilterStatus() {
        for(let i = 0; i < this.sstables.length; i++) this.sstables[i].bloomFilterStatus = "";
    }
}

export default Level;