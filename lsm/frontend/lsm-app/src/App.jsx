import React, { useState, useEffect } from 'react'
import Popup from './components/Popup'
import Script from './components/Script'
import SaveForm from './components/SaveForm'
import LSMTree from './components/LSMTree'
import './App.css'

function App() {
  // UseState variables for managing script data and UI popups
  const[scriptsArray, setScriptsArray] = useState([]);
  const[scriptNum, setScriptNum] = useState(0);
  const[loadPopup, setLoadPopup] = useState(false);
  const[savePopup, setSavePopup] = useState(false);

  // Function that fetches data from backend (called at start and when loading scripts)
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001');
      const data = await response.json();
      setScriptsArray(data);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };

  // Effect to initially fetch script data upon start up
  useEffect(() => { fetchData(); }, []);

  return (
    <div className="app-container">
      <div className="left-pane">
        <LSMTree />
      </div>

      <div className="right-pane">
        <h3>
          Current script: {scriptsArray[scriptNum] ? scriptsArray[scriptNum]["name"] : "..."}
        </h3>

        <p>
          {scriptsArray[scriptNum] ? scriptsArray[scriptNum]["text"] : "Data Not Loaded"}
        </p>
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
            {scriptsArray.map(({ name, text }, index) => (
                  <div key={name} onClick={() => setScriptNum(index)}>
                    <Script name={name} text={text}/>
                  </div>
            ))}
          </div>
        </Popup>

        <Popup trigger={savePopup} setTrigger={setSavePopup}><SaveForm/></Popup>
      </div>
    </div>
  )
}

export default App