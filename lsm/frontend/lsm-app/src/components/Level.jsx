import { Component } from 'react';
import SSTable from './SSTable';
import './LSMTree.css';

class Level extends Component {
    constructor() {
        super();
        this.sstables = []; 
        this.sstableCount = 0; // Initialize SSTable count
    }

    /**
     * Adds an SSTable with provided nodes to the level.
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

    compact() { 
        let olderData = this.sstables.pop().getData();
        let newerData = this.sstables.pop().getData();
        this.sstableCount -= 2;

        let newerDataKeys = new Set(newerData.map(obj => obj.key));
        let dataToKeep = olderData.filter(obj => !newerDataKeys.has(obj.key));

        return dataToKeep.concat(newerData);
    }

    // render() {
    //     const { levelNum } = this.props; 
    //     console.log(`LEVEL ${levelNum} RENDERED`);
    //     console.log(this.sstables);
    //     return (
    //         <div className="level"> 
    //             <p>Level {levelNum}</p>
    //             {this.sstables.map((sstable, index) => (
    //                 <SSTable key={index} data={sstable.data} />
    //             ))}
    //         </div>
    //     )
    // }
}

export default Level;