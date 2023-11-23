import { Component } from 'react';
import SkipList from './SkipList';
import './LSMTree.css';

class Memtable extends Component { 
    constructor() {
        super();
        this.memtable = new SkipList(); 
        this.size = 0;
    }

    // Insert data into Memtable/SkipList
    insert(id, name) {  
        this.memtable.insert(id, name);
        this.size++;
    }

    // Search for ID in Memtable/SkipList
    search(id) {
        return this.memtable.search(id);
    }

    // Update an existing ID in the Memtable
    update(id, newValue) {
        return this.memtable.update(id, newValue);
    }

    // Clear Memtable
    clear(){
        this.memtable.clear();
        this.size = 0;
    }

    render() {
        // Displayed in memtable visualization
        const baseLevelNodes = this.memtable.getBaseLevel();

        // Printing all levels for presentation maybe?
        console.log(this.memtable.getAllLevels());

        return (
            <div className="memtable-container">
                <h3>Memtable:</h3>
                <div className={this.size === 0 ? "" : "memtable"}>
                    {baseLevelNodes.map((node, index) => (
                        <div key={index} className="memtable-item">
                            {node.key}: {node.value}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Memtable;