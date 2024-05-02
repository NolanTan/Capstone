import { Component } from 'react';
import SSTable from './SSTable';
import './LSMTree.css';
import Level from './Level';

/** Tombstone marker. */
const TOMBSTONE = "~DELETED~";

/**
 * Class representing the Disk component.
 * 
 * @author Nolan Flinchum
 * @version 5/1/2024
 */
class Disk extends Component {
    /**
     * Set up the disk component data structure as a React component.
     */
    constructor() {
        super();
        this.levels = [new Level(), new Level(), new Level()];
    }

    /**
     * Adds a new SSTable to the disk component, activating compaction when necessary.
     * 
     * @param {Array} nodes - Array of nodes to add to the disk. 
     */
    addSSTable(nodes) {
        // If level 0 is full, activate compaction
        if(this.levels[0].sstableCount == 2)
            this.levels[1].addSSTable(this.levels[0].compact());

        // If level 1 became full from that, activate compaction
        if(this.levels[1].sstableCount > 2)
            this.levels[2].addSSTable(this.levels[1].compact());

        this.levels[0].addSSTable(nodes);
    }

    /**
     * Searches for an element with the specified id in the disk component.
     * 
     * @param {string} id - The id of the element to search for.
     * @returns {string|null} - The data associated with the id if found, otherwise null.
     */
    search(id) {
        let result = null;
        for(let i = 0; i < this.levels.length; i++) {
            result = this.levels[i].search(id);
            if(result != null) {
                if(result === TOMBSTONE) return null; // Data was deleted
                else return result; // Data found
            }
        }
        return result; // Return null if nothing was found
    }

    /**
     * Clears all levels in the disk component.
     */
    clear() {
        this.levels = [new Level(), new Level(), new Level()];
    }

    /**
     * Clears the bloom filter status of all levels in the disk component.
     */
    clearBloomFilterStatus() {
        for(let i = 0; i < this.levels.length; i++) this.levels[i].clearBloomFilterStatus();
    }

    /**
     * Renders the Disk component.
     * 
     * @returns {JSX.Element} - JSX for rendering the Disk component.
     */
    render() {
        return (
            <div className="disk-container">
                <h3>Disk:</h3>
                <div className="disk">
                    {this.levels.map((level, index) => (
                        <div className="" key={index}>
                            <p>Level {index}</p>
                            <div className="level">
                                {level.sstables.map((sstable, sIndex) => (
                                    <SSTable 
                                        key={sIndex} 
                                        data={sstable.data}
                                        bf={sstable.bloomFilterStatus}
                                        foundId={this.props.foundId}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Disk;