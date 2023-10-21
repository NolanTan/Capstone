import { LinkedList } from './LinkedList';
import { Component } from 'react';
import './Memtable.css';

class Memtable extends Component { 
    constructor() {
        super();
        // Memtable currently using a linked list data structure
        this.memtable = new LinkedList(); 
    }

    insert(name, age) {
        this.memtable.append(name, age);
    }

    // Add read stuff later

    render() {
        return (
            <div className="memtable">
                Memtable here
            </div>
        )
    }
}

export default Memtable;