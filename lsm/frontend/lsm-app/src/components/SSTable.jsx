import { Component } from 'react';
import './LSMTree.css';

/**
 * A React component representing an SSTable.
 * 
 * @author Nolan Flinchum 
 * @version 12/5/2023
 */
class SSTable extends Component {
    /**
     * Set up the SSTable data structure as a React component.
     */
    constructor() {
        super();
        this.data = [];
    }

    /**
     * Inserts a key-value pair into the SSTable and sorts it by key.
     * @param {string} key - The key to insert (ID).
     * @param {string} value - The value associated with the key (name).
     */
    insert(key, value) {
        this.data.push({key, value});
        this.data.sort((a,b) => a.key - b.key);
    }

    /**
     * Retrieves a value from the SSTable (using binary search) based on the given key.
     * @param {string} key - The key to search for.
     * @returns {string|null} The value associated with the key, or null if not found.
     */
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

    getData() {
        return this.data;
    }

    /**
     * Renders the SSTable component. Displays the SSTable data passed as props.
     * @returns {JSX.Element} - JSX for rendering the SSTable.
     */
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