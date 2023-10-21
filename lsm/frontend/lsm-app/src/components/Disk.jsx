import { Component } from 'react';
import SSTable from './SSTable';
import './Disk.css';

class Disk extends Component {
    constructor() {
        super();
        this.sstables = [];
    }

    // Code to handle SSTables

    render() {
        return (
            <div className="disk">
                Disk
                <SSTable />
                {/* Show SSTables */}
            </div>
        )
    }
}

export default Disk;