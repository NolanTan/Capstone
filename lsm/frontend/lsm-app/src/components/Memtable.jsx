import { Component } from 'react';
import SkipList from './SkipList';
import './Memtable.css';

class Memtable extends Component { 
    constructor() {
        super();
        this.memtable = new SkipList(); 
    }

    insert(id, name) {
        this.memtable.insert(id, name);
    }

    search(id) {
        return this.memtable.search(id);
    }

    render() {
        return (
            <div className="memtable">
                Memtable here
            </div>
        )
    }
}

export default Memtable;