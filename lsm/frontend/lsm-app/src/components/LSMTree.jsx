import { Component } from 'react';
import Memtable from './Memtable';
import Disk from './Disk';
import './LSMTree.css';

class LSMTree extends Component {

    // Some sort of code to handle data/instructions between memory and disk component

    render() {
        return (
            <div className="lsm">
                <h1>User →</h1>
                <Memtable />
                <h1>→</h1>
                <Disk />
            </div>
        )
    }
}

export default LSMTree;