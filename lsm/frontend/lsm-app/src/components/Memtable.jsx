import { Component } from 'react';
import SkipList from './SkipList';
import './Memtable.css';

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

    // Clear memtable
    clear(){
        this.memtable.clear();
    }

    render() {
        // Displayed in memtable visualization
        const baseLevelNodes = this.memtable.getBaseLevel();

        // Printing all levels for bug fixing
        //const allLevels = this.memtable.getAllLevels();
        //console.log(allLevels) 

        return (
            <div className="memtable">
                <h3>Memtable:</h3>
                <div>
                    {baseLevelNodes.map((node, index) => (
                        <div key={index}>
                            {node.key} {node.value}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Memtable;