import React, { useState } from 'react';

function SaveForm() {
    // UseState variables for form inputs and its response message
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [response, setResponse] = useState('');

    // Handles the event of value1 input changing
    const handleValue1Change = (e) => {
        setValue1(e.target.value);
        setResponse('');
    }

    // Handles the event of value2 input changing
    const handleValue2Change = (e) => {
        setValue2(e.target.value);
        setResponse('');
    }

    // Event handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default behavior for submit handling
        
        // Send values in text boxes to the backend
        try {
            const response = await fetch('http://localhost:3001/saveData', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({ value1, value2 }),
            });
            if (response.ok) setResponse('Data saved!');
            else setResponse('Error saving data.');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <br/>
                <input type="text" value={value1} onChange={handleValue1Change} />
                <br/>
            </label>

            <label>
                Instructions (ex: W Nolan 21,R Nolan 21,...):
                <br/>
                <input type="text" value={value2} onChange={handleValue2Change} />
                <br/>
            </label>

            <br/>
            <button type="submit">Submit</button>
        </form>
        <p>{response}</p>
        </>
    )
}

export default SaveForm;