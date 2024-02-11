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
        if(this.levels[0].sstableCount == 4) {
            this.levels[1].addSSTable(this.levels[0].compact());
        }

        // If level 1 became full from that, activate compaction
        if(this.levels[1].sstableCount > 4) {
            this.levels[2].addSSTable(this.levels[1].compact());
        }

        this.levels[0].addSSTable(nodes);

        console.log("DISK POV");
        console.log(this.levels[0]);
        console.log(this.levels[1]);
        console.log(this.levels[2]);
    }

    clear() {
        this.levels = [new Level(), new Level(), new Level()];
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
                        <Level key={index} levelNum={index} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Disk;