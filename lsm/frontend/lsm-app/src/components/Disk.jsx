import { Component } from 'react';
import SSTable from './SSTable';
import './LSMTree.css';
import Level from './Level';

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
        this.levels = [new Level(), new Level(), new Level()];
    }

    addSSTable(nodes) {
        // If level 0 is full, activate compaction
        if(this.levels[0].sstableCount == 2)
            this.levels[1].addSSTable(this.levels[0].compact());

        // If level 1 became full from that, activate compaction
        if(this.levels[1].sstableCount > 2)
            this.levels[2].addSSTable(this.levels[1].compact());

        this.levels[0].addSSTable(nodes);
    }

    search(id) {
        let result = null;
        for(let i = 0; i < this.levels.length; i++) {
            result = this.levels[i].search(id);
            if(result != null) return result;
        }
        return result; // Return null if nothing was found
    }

    clear() {
        this.levels = [new Level(), new Level(), new Level()];
    }

    clearBloomFilterStatus() {
        for(let i = 0; i < this.levels.length; i++) this.levels[i].clearBloomFilterStatus();
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
                    {this.levels.map((level, index) => (
                        <div className="" key={index}>
                            <p>Level {index}</p>
                            <div className="level">
                                {level.sstables.map((sstable, sIndex) => (
                                    <SSTable 
                                        key={sIndex} 
                                        data={sstable.data}
                                        bf={sstable.bloomFilterStatus}
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