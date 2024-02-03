import React, { useState, useEffect } from 'react'
import Popup from './components/Popup'
import Script from './components/Script'
import SaveForm from './components/SaveForm'
import LSMTree from './components/LSMTree'
import './App.css'

/**
 * Main application component rendering the entire application.
 * Manages script data, UI popups, fetching data, and script instructions.
 * @returns {JSX.Element} The JSX representing the application layout.
 */
function App() {
  // UseState variables for managing script data and UI popups
  const[scriptsArray, setScriptsArray] = useState([]);
  const[scriptNum, setScriptNum] = useState(0);
  const[loadPopup, setLoadPopup] = useState(false);
  const[savePopup, setSavePopup] = useState(false);
  const[instructions, setInstructions] = useState([]);
  const[currIndex, setCurrIndex] = useState(0);

  /**
   * Fetches data from the backend API endpoint. Called at start and when loading scripts.
   */  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001');
      const data = await response.json();
      setScriptsArray(data);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };

  /**
   * Sends DELETE request to API endpoint.
   * 
   * @param {string} scriptName - The name of the script to be deleted.
   */
  const deleteData = async (scriptName) => {
    try {
      const response = await fetch(`http://localhost:3001/deleteData/${scriptName}`, {
        method: 'DELETE',
      });

      if (response.ok) fetchData(); // If deletion is successful, fetch updated scripts
      else console.error('Error deleting script:', response.statusText);
    } catch (error) {
      console.error('Error deleting script:', error);
    }
  };

  /**
   * Converts script text into an array of instructions.
   * @param {string} text - The script text to convert.
   * @returns {string[]} An array of script instructions.
   */
  const textToArray = (text) => {
    if(text) return text.split(',').map(value => value.trim());
    return [];
  }

  // Effect to initially fetch script data upon start up (when component mounts)
  useEffect(() => { fetchData(); }, []);

  // Effect to update instructions when scriptNum or scriptsArray changes
  useEffect(() => {
    setInstructions(textToArray(scriptsArray[scriptNum] ? scriptsArray[scriptNum]["text"] : "")); 
    setCurrIndex(0);
  }, [scriptNum, scriptsArray]);

  return (
    <div className="app-container">
      <div className="left-pane">
        {instructions.length > 0 ? (
          <LSMTree instructions={instructions} currIndex={currIndex} setCurrIndex={setCurrIndex}/>
        ) : (
          <div>
          <img src="../lsm-logo.png" alt="LSM-tree Simulator" style={{width: '700px'}}/>
          <h1>Please load a script to get started</h1>
          </div>
        )}
      </div>

      <div className="right-pane">
        <h3>
          Current script: {scriptsArray[scriptNum] ? scriptsArray[scriptNum]["name"] : "..."}
        </h3>

        <ol>
          {instructions.map((instruction, index) => (
            <li key={index} className={index === currIndex ? 'highlighted' : ''}>{instruction}</li>
          ))}
        </ol>
      </div>

      <div className="bottom-pane">
        <div className="card">
          <button onClick={() => {setLoadPopup(true); fetchData();}}>Load Script</button>
        </div>

        <div className="card">
          <button onClick={() => setSavePopup(true)}>Save Script</button>
        </div>

        <Popup trigger={loadPopup} setTrigger={setLoadPopup}>
          <div className="script-container">
            {scriptsArray.length > 0 ? (
              scriptsArray.map(({ name, text }, index) => (
                <div key={name} onClick={() => setScriptNum(index)}>
                  <Script name={name} text={text} onDelete={deleteData}/>
                </div>
              ))
            ) : (
              <h3>No scripts available...</h3>
            )}
          </div>
        </Popup>

        <Popup trigger={savePopup} setTrigger={setSavePopup}><SaveForm/></Popup>
      </div>
    </div>
  )
}

export default App