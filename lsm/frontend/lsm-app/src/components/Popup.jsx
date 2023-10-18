import './Popup.css';

function Popup(props) {
    return (props.trigger) ? (
        <div className="Popup">
            <div className="Popup-inner">
                <button className="Close-btn" onClick={() => props.setTrigger(false)}>X</button>
                <br/><br/>
                <div className = "Panel">{ props.children }</div>
            </div>
        </div>
    ) : "";
}

export default Popup;