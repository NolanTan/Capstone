import { Component } from 'react';
import './SSTable.css';

class SSTable extends Component {
    constructor() {
        super();
        this.data = [];
    }

    // Insert ID and name into SSTable - sort by ID
    insert(key, value) {
        this.data.push({key, value});
        this.data.sort((a,b) => a.key - b.key);
    }

    // Get a name from an ID - return null if ID isn't in SSTable
    get(key){
        const entry = this.data.find(item => item.key === key);
        return entry ? entry.value : null;
    }

    render() {
        return (
            <div> {/* Style div to make SSTable look pretty */}
                SSTable holds data
                {/* Show data in SSTable */}
            </div>
        )
    }
}

export default SSTable;