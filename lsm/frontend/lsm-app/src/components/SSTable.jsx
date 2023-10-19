import { Component } from 'react';
import './SSTable.css';

class SSTable extends Component {
    constructor() {
        super();
        this.data = {};
    }

    // Code to replicate SSTable data structure

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