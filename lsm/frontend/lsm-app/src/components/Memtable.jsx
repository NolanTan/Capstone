import { Component } from 'react';
import SkipList from './SkipList';
import './LSMTree.css';

/** Tombstone marker. */
const TOMBSTONE = "~DELETED~";

/**
 * Class representing the Memtable component.
 * 
 * @author Nolan Flinchum
 * @version 5/1/2024
 */
class Memtable extends Component { 
    /**
     * Constructor to set up the memtable's data structure and size.
     */
    constructor() {
        super();
        this.memtable = new SkipList(); 
        this.size = 0;
    }

    /**
     * Inserts data into the Memtable/SkipList.
     * 
     * @param {string} id - The ID to be inserted.
     * @param {string} name - The name associated with the ID.
     */    
    insert(id, name) {  
        this.memtable.insert(id, name);
        this.size++;
    }

    /**
     * Searches for an ID in the Memtable/SkipList.
     * 
     * @param {string} id - The ID to search for.
     * @returns {string|null} The value associated with the ID, or null if not found.
     */   
    search(id) {
        let result = this.memtable.search(id);
        if(result === TOMBSTONE) return null; // Data was deleted
        else return result; // Data found
    }

    /**
     * Updates an existing ID in the Memtable.
     * 
     * @param {string} id - The ID to update.
     * @param {string} newValue - The new value to assign to the ID.
     * @returns {boolean} - True if the ID was found and updated, false otherwise.
     */
    update(id, newValue) {
        return this.memtable.update(id, newValue);
    }

    /**
     * Clears the Memtable.
     */   
    clear(){
        this.memtable.clear();
        this.size = 0;
    }

    /**
     * Renders the Memtable component.
     * 
     * @returns {JSX.Element} - JSX for rendering the Memtable component.
     */
    render() {
        const baseLevelNodes = this.memtable.getBaseLevel(); // Displayed in memtable visualization
        const { foundId } = this.props; // Get foundId from props

        return (
            <div className="memtable-container">
                <h3>Memtable:</h3>
                <div className={this.size === 0 ? "" : "memtable"}>
                    {baseLevelNodes.map((node, index) => (
                        <div 
                            key={index} 
                            className={`memtable-item${foundId === node.key ? " found" : ""}`}
                        >
                            {node.key}: {node.value}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Memtable;