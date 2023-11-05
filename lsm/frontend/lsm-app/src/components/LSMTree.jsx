import React, { Component } from 'react';
import Memtable from './Memtable';
import Disk from './Disk';
import './LSMTree.css';

class LSMTree extends Component {
    constructor(props) {
        super(props);
        this.state = {currentIndex: props.currIndex};
        this.memtableRef = React.createRef(); // Maybe reference state of the memtable
    }

    // If the LSM-Tree component updates, reset index and clear memtable
    componentDidUpdate(prevProps) {
        if(prevProps.instructions !== this.props.instructions){
            this.setState({ currentIndex: 0 });
            this.memtableRef.current.clear();
        }
    }

    // Function to process instruction and do necessary tasks
    processInstruction = (instruction) => {
        const [operation, id, name] = instruction.split(' ');

        if(operation === "W") {
            console.log("Write:", id, name); // Testing
            this.memtableRef.current.insert(id, name);
        } else if(operation === "R") {
            const result = this.memtableRef.current.search(id);
            console.log("Read result:", result); // Testing
        }
    }

    // Function to perform instruction when the button is pressed
    doInstruction = () => {
        const {instructions} = this.props; // Access instructions from props
        const {currentIndex} = this.state; // Access index from state
        console.log("doing: ", currentIndex + 1, instructions.length)

        if(currentIndex < instructions.length) {
            this.processInstruction(instructions[currentIndex]);
            this.setState({currentIndex: currentIndex + 1}); // Update for LSM Tree
            this.props.setCurrIndex(this.props.currIndex + 1); // Update for App.jsx highlighting
        }
    }

    render() {
        return (
            <div className="lsm">
                <button onClick={this.doInstruction}>Do Next Instruction</button>
                <h1>→</h1>
                <Memtable ref={this.memtableRef} />
                <h1>→</h1>
                <Disk />
            </div>
        )
    }
}

export default LSMTree;