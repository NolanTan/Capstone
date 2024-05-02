import { Component } from 'react';
import './LSMTree.css';
import BloomFilter from './BloomFilter';

/** Size of the Bloom Filter */
const BIT_ARRAY_SIZE = 1000;


/**
 * A React component representing an SSTable.
 * 
 * @author Nolan Flinchum 
 * @version 5/1/2024
 */
class SSTable extends Component {
    /**
     * Set up the SSTable data structure as a React component.
     */
    constructor() {
        super();
        this.data = [];
        this.bloomFilter = new BloomFilter(BIT_ARRAY_SIZE);
        this.bloomFilterStatus = "";
    }

    /**
     * Inserts a key-value pair into the SSTable and sorts it by key.
     * 
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
     * 
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
     * 
     * @returns {JSX.Element} - JSX for rendering the SSTable.
     */
    render() {
        const { foundId } = this.props; // Get foundId from props
        return (       
            <div className="sstable-container">
                <div className="bf">
                    {this.props.bf}
                </div>
                <div className="sstable"> 
                    {this.props.data.map((item, index) => (
                        <div 
                            key={index}
                            className={`sstable-item
                                ${foundId === item.key && this.props.bf === "1" ? " found" : ""}`}
                        >
                            {item.key}: {item.value}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default SSTable;