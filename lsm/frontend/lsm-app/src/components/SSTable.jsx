import { Component } from 'react';
import './LSMTree.css';

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
            <div className="sstable-container">
                <div className="sstable"> 
                    {this.props.data.map((item, index) => (
                        <div key={index} className="sstable-item">
                            {item.key}: {item.value}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default SSTable;