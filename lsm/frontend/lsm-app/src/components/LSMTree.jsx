import React, { Component } from 'react';
import Memtable from './Memtable';
import Disk from './Disk';
import './LSMTree.css';

/** Max size of items in the memtable. */
const MEMTABLE_SIZE_LIMIT = 10;

/**
 * Class representing the LSM-tree component.
 * 
 * @author Nolan Flinchum
 * @version 12/5/2023
 */
class LSMTree extends Component {
    /**
     * Creates an instance of an LSM-tree
     * @param {object} props - The props object
     */
    constructor(props) {
        super(props);
        this.state = {currentIndex: props.currIndex, commandResult: "Awaiting instructions"};
        this.memtableRef = React.createRef(); // Reference of the memtable
        this.diskRef = React.createRef(); // Reference of the disk
    }

    /**
     * React lifecycle method. Resets index and clears everything if LSM-tree component updates.
     * @param {object} prevProps - The previous props of the component.
     */   
    componentDidUpdate(prevProps) {
        if(prevProps.instructions !== this.props.instructions){
            this.setState({ currentIndex: 0 , commandResult: "Awaiting instructions"});
            this.memtableRef.current.clear();
            this.diskRef.current.clear();
        }
    }

    /**
     * Processes an instruction and performs the necessary operations.
     * @param {string} instruction - The instruction to be processed.
     */
    processInstruction = (instruction) => {
        const [operation, id, name] = instruction.split(' ');

        if(operation === "W") {
            let result = this.memtableRef.current.search(id); // Check if key already exists

            if(result === null) { // ID does not exist -> write normally
                if(this.memtableRef.current.size >= MEMTABLE_SIZE_LIMIT) { // Flushing
                    let nodes = this.memtableRef.current.memtable.getBaseLevel();
                    this.diskRef.current.addSSTable(nodes); // Create SSTable with memtable data
                    this.memtableRef.current.clear(); // Clear SkipList/Memtable for new data
                }

                this.memtableRef.current.insert(id, name); // Insertion into Memtable
                this.setState({ commandResult: `Welcome, ${name}` });

            } else { // ID already exists -> update value 
                this.memtableRef.current.update(id, name); // Update with the most up-to-date name
                this.setState({ commandResult: `Updated ${id}: Welcome, ${name}` });
            }

        } else if(operation === "R") {
            let result = this.memtableRef.current.search(id);

            if(result === null) // If not in Memtable, look in SSTables
                result = this.diskRef.current.search(id);

            if(result === null) // Result not found
                this.setState({ commandResult: `ID ${id} not found in LSM Tree` });
            else // Result found
                this.setState({ commandResult: `Read result of ${id}: ${result}` });
        }
    }

    /**
     * Performs the next instruction from the list.
     */
    doInstruction = () => {
        const {instructions} = this.props; // Access instructions from props
        const {currentIndex} = this.state; // Access index from state

        if(currentIndex < instructions.length) {
            this.processInstruction(instructions[currentIndex]);
            this.setState({currentIndex: currentIndex + 1}); // Update for LSM Tree
            this.props.setCurrIndex(this.props.currIndex + 1); // Update for App.jsx highlighting
        } else {
            this.setState({ commandResult: "No more instructions" });
        }
    }

    /**
     * Renders the LSMTree component.
     * @returns {JSX.Element} - JSX for rendering the LSMTree component.
     */
    render() {
        return (
            <div className="lsm">
                <div className="user">
                    <button onClick={this.doInstruction}>Do Next Instruction</button>
                    <p>{this.state.commandResult}</p>
                </div>
                <h1>→</h1>
                <Memtable ref={this.memtableRef} />
                <h1>→</h1>
                <Disk ref={this.diskRef}/>
            </div>
        )
    }
}

export default LSMTree;