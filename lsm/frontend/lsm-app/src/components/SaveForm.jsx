import React, { useState } from 'react';

/**
 * Functional component representing a form for saving data.
 * @returns {JSX.Element} JSX for rendering the SaveForm component.
 */
function SaveForm() {
    // UseState variables for form inputs and its response message
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [response, setResponse] = useState('');
    const [instructionsError, setInstructionsError] = useState(true);

    /**
     * Handles the event of value1 input changing.
     * @param {Event} e - The event object.
     */
    const handleValue1Change = (e) => {
        setValue1(e.target.value);
        setResponse('');
    }

    /**
     * Handles the event of value2 input changing. Checks the format of instructions.
     * @param {Event} e - The event object.
     */
    const handleValue2Change = (e) => {
        setValue2(e.target.value);
        checkInstructionsFormat(e.target.value);
        setResponse('');
    }

    /**
     * Checks the format of instructions using RegEx.
     * @param {string} input - The input value to check.
     */
    const checkInstructionsFormat = (input) => {
        const validFormat = /^(W \d+ [A-Za-z]+|R \d+)(, (W \d+ [A-Za-z]+|R \d+))*$/;
        if(validFormat.test(input)) setInstructionsError(false);
        else setInstructionsError(true);
    }

    /**
     * Event handler for form submission.
     * @param {Event} e - The event object.
     */    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default behavior for submit handling
        
        if (!value1.trim())
            setResponse('Error: Name text box cannot be empty');
        else if (instructionsError)
            setResponse('Error: Incorrect format in Instructions text box');
        else{
            // Send values in text boxes to the backend
            try {
                const response = await fetch('http://localhost:3001/saveData', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify({ value1, value2 }),
                });
                if (response.ok) setResponse('Data saved!');
                else setResponse('Error: Saving data went wrong');
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h4>Name:</h4>
            <textarea 
                style={{fontSize: '20px', width:'50%', resize: 'none'}} 
                rows="1"
                value={value1} 
                onChange={handleValue1Change} 
            />

            <h4>Instructions (ex: W 21 Nolan, R 21, W 45 Bob):</h4>
            <textarea 
                style={{fontSize: '16px', width:'100%', resize: 'none'}} 
                rows="6"  
                value={value2} 
                onChange={handleValue2Change} 
            />
            {instructionsError && <p style={{fontSize: 'small', margin: '0'}}>
                Warning: formatting error
            </p>}

            <br/><br/>
            <button type="submit">Submit</button>
        </form>
        <p>{response}</p>
        </>
    )
}

export default SaveForm;