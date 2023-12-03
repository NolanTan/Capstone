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
        let start = 0, end = this.data.length - 1;

        while(start <= end) {
            const mid = Math.floor((start + end) / 2);

            if(parseInt(this.data[mid].key) === parseInt(key)) return this.data[mid].value;
            else if(parseInt(this.data[mid].key) < parseInt(key)) start = mid + 1;
            else end = mid - 1;
        }

        return null;
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