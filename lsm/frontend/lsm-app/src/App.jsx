import React, { useState, useEffect } from 'react'
import Popup from './components/Popup'
import Script from './components/Script'
import SaveForm from './components/SaveForm'
import './App.css'

function App() {
  // UseState variables for managing script data and UI popups
  const[scriptsArray, setScriptsArray] = useState([]);
  const[scriptNum, setScriptNum] = useState(0);
  const[loadPopup, setLoadPopup] = useState(false);
  const[savePopup, setSavePopup] = useState(false);

  // Function that fetches data from backend
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001');
      const data = await response.json();
      setScriptsArray(data);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };

  // Effect to fetch script data
  useEffect(() => {  
    fetchData(); // Initial fetch
    // const pollingInterval = setInterval(fetchData, 30000); // Poll every 30 seconds
    // return () => clearInterval(pollingInterval); // Clear interval when the component unmounts
  }, []);

  return (
    <div className="app-container">

      <div className="left-pane">
        Work in progress
      </div>

      <div className="right-pane">
        <h3>
          Current script: {scriptsArray[scriptNum] ? scriptsArray[scriptNum]["name"] : "..."}
        </h3>

        <text>
          {scriptsArray[scriptNum] ? scriptsArray[scriptNum]["text"] : "Data Not Loaded"}
        </text>
      </div>

      <div className="bottom-pane">
        <div className="card">
          <button onClick={() => {setLoadPopup(true); fetchData();}}>Load Script</button>
        </div>

        <div className="card">
          <button onClick={() => setSavePopup(true)}>Save Script</button>
        </div>

        <Popup trigger={loadPopup} setTrigger={setLoadPopup}>
          {scriptsArray.map(({ name, text }, index) => (
                <div key={name} onClick={() => setScriptNum(index)}>
                  <Script name={name} text={text}/>
                </div>
          ))}
        </Popup>

        <Popup trigger={savePopup} setTrigger={setSavePopup}>
            <SaveForm/>
        </Popup>
      </div>
    </div>
  )
}

export default App