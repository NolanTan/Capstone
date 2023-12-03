import { Component } from 'react';
import SSTable from './SSTable';
import './LSMTree.css';

/**
 * Class representing the Disk component.
 * 
 * @author Nolan Flinchum
 * @version 12/5/2023
 */
class Disk extends Component {
    /**
     * Set up the disk component data structure as a React component.
     */
    constructor() {
        super();
        this.sstables = [];
    }

    /**
     * Adds an SSTable with provided nodes to the disk.
     * @param {Array} nodes - Nodes to be added to the SSTable.
     */
    addSSTable(nodes) {
        const sstable = new SSTable();

        for(let i = 0; i < nodes.length; i++) 
            sstable.insert(nodes[i].key, nodes[i].value);

        this.sstables.unshift(sstable);
    }

    /**
     * Searches for an ID across the SSTables on the disk.
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
     * Clears all SSTables from the disk.
     */
    clear() {
        this.sstables = [];
    }

    /**
     * Renders the Disk component.
     * @returns {JSX.Element} - JSX for rendering the Disk component.
     */
    render() {
        return (
            <div className="disk-container">
                <h3>Disk:</h3>
                <div className="disk">
                    {this.sstables.map((sstable, index) => (
                        <SSTable key={index} data={sstable.data} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Disk;