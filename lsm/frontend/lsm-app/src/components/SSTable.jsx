import { Component } from 'react';
import './LSMTree.css';
import BloomFilter from './BloomFilter';

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
        this.bloomFilter = new BloomFilter(1000);
        this.bloomFilterStatus = "";
    }

    /**
     * Inserts a key-value pair into the SSTable and sorts it by key.
     * @param {string} key - The key to insert (ID).
     * @param {string} value - The value associated with the key (name).
     */
    insert(key, value) {
        this.data.push({key, value});
        this.data.sort((a,b) => a.key - b.key);
        this.bloomFilter.insert(key);
    }

    /**
     * Retrieves a value from the SSTable (using binary search) based on the given key.
     * @param {string} key - The key to search for.
     * @returns {string|null} The value associated with the key, or null if not found.
     */
    get(key){
        if(!this.bloomFilter.lookup(key)) {
            this.bloomFilterStatus = "0" ; // Key definitely not present
        } else {
            this.bloomFilterStatus = "1"; // Key might be present, so do binary search
            let start = 0, end = this.data.length - 1;
            while(start <= end) {
                const mid = Math.floor((start + end) / 2);
                if(parseInt(this.data[mid].key) === parseInt(key)) return this.data[mid].value;
                else if(parseInt(this.data[mid].key) < parseInt(key)) start = mid + 1;
                else end = mid - 1;
            }
        }
        
        return null;
    }

    /**
     * Renders the SSTable component. Displays the SSTable data passed as props.
     * @returns {JSX.Element} - JSX for rendering the SSTable.
     */
    render() {
        return (
            <div className="sstable-container">
                <div className="sstable"> 

                    <div className="sstable-item">
                        {this.props.bf}
                    </div>

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