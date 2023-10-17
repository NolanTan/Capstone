import React, { useState, useEffect } from 'react'
import LoadPopup from './components/LoadPopup'
import Script from './components/Script'
import SavePopup from './components/SavePopup'
import SaveForm from './components/SaveForm'
import './App.css'

function App() {
  // UseState variables for managing script data and UI popups
  const[scriptsArray, setScriptsArray] = useState([]);
  const[scriptNum, setScriptNum] = useState(0);
  const[loadPopup, setLoadPopup] = useState(false);
  const[savePopup, setSavePopup] = useState(false);

  // Effect to fetch script data repeatedly using polling
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001');
        const data = await response.json();
        setScriptsArray(data);
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    };
  
    fetchData(); // Initial fetch
    const pollingInterval = setInterval(fetchData, 2000); // Poll every 2 seconds
    return () => clearInterval(pollingInterval); // Clear interval when the component unmounts
  }, []);

  return (
    <>
      <h1>
        Currently loaded: {scriptsArray[scriptNum] ? scriptsArray[scriptNum]["name"] : "..."}
      </h1>

      <h2>
        {scriptsArray[scriptNum] ? scriptsArray[scriptNum]["text"] : "Data Not Loaded"}
      </h2>

      <div className="card">
        <button onClick={() => setLoadPopup(true)}>Load Script</button>
      </div>

      <div className="card">
        <button onClick={() => setSavePopup(true)}>Save Script</button>
      </div>

      <LoadPopup trigger={loadPopup} setTrigger={setLoadPopup}>
        {scriptsArray.map(({ name, text }, index) => (
              <div key={name} onClick={() => setScriptNum(index)}>
                <Script name={name} text={text}/>
              </div>
        ))}
      </LoadPopup>

      <SavePopup trigger={savePopup} setTrigger={setSavePopup}>
          <SaveForm></SaveForm>
      </SavePopup>
    </>
  )
}

export default App