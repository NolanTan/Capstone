import './Popup.css';

function LoadPopup(props) {
    return (props.trigger) ? (
        <div className="Popup">
            <div className="Popup-inner">
                <button className="Close-btn" onClick={() => props.setTrigger(false)}>X</button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default LoadPopup;