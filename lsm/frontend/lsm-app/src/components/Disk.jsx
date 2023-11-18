import { Component } from 'react';
import SSTable from './SSTable';
import './LSMTree.css';

class Disk extends Component {
    constructor() {
        super();
        this.sstables = [];
    }

    addSSTable(nodes) {
        const sstable = new SSTable();

        for(let i = 0; i < nodes.length; i++) 
            sstable.insert(nodes[i].key, nodes[i].value);

        this.sstables.unshift(sstable);
    }

    search(id) {
        let result = null;
        for(let i = 0; i < this.sstables.length; i++) {
            result = this.sstables[i].get(id);
            if(result != null) return result;
        }

        return result; // Return null if nothing was found
    }

    clear() {
        this.sstables = [];
    }

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