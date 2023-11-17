import { Component } from 'react';
import SSTable from './SSTable';
import './Disk.css';

class Disk extends Component {
    constructor() {
        super();
        this.sstables = [];
    }

    addSSTable(nodes) {
        const sstable = new SSTable();

        for(let i = 0; i < nodes.length; i++) 
            sstable.insert(nodes[i].key, nodes[i].value);

        this.sstables.push(sstable);
    }

    render() {
        return (
            <div className="disk">
                Disk
                {this.sstables.map((sstable, index) => (
                    <SSTable key={index} data={sstable.data} />
                ))}
            </div>
        )
    }
}

export default Disk;