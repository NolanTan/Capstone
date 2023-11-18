import React, { Component } from 'react';
import Memtable from './Memtable';
import Disk from './Disk';
import './LSMTree.css';

const MEMTABLE_SIZE_LIMIT = 10;

class LSMTree extends Component {
    constructor(props) {
        super(props);
        this.state = {currentIndex: props.currIndex, commandResult: "Awaiting instructions"};
        this.memtableRef = React.createRef(); // Reference of the memtable
        this.diskRef = React.createRef(); // Reference of the disk
    }

    // If the LSM-Tree component updates, reset index and clear memtable
    componentDidUpdate(prevProps) {
        if(prevProps.instructions !== this.props.instructions){
            this.setState({ currentIndex: 0 , commandResult: "Awaiting instructions"});
            this.memtableRef.current.clear();
            this.diskRef.current.clear();
        }
    }

    // Function to process instruction and do necessary tasks
    processInstruction = (instruction) => {
        const [operation, id, name] = instruction.split(' ');

        if(operation === "W") {
            // Flushing
            if(this.memtableRef.current.size >= MEMTABLE_SIZE_LIMIT) {
                let nodes = this.memtableRef.current.memtable.getBaseLevel();
                this.diskRef.current.addSSTable(nodes); // Create SSTable with memtable data
                this.memtableRef.current.clear(); // Clear SkipList/Memtable for new data
            }

            // Insertion into Memtable
            this.memtableRef.current.insert(id, name);
            this.setState({ commandResult: `Welcome, ${name}` });

        } else if(operation === "R") {
            // TODO: "Tombstoning" maybe
            let result = this.memtableRef.current.search(id);

            // If not in Memtable, look in SSTables
            if(result === null)
                result = this.diskRef.current.search(id);

            if(result === null) // Result not found
                this.setState({ commandResult: `ID ${id} not found in LSM Tree` });
            else // Result found
                this.setState({ commandResult: `Read result of ${id}: ${result}` });
        }
    }

    // Function to perform instruction when the button is pressed
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