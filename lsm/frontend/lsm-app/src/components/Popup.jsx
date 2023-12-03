import './Popup.css';

/**
 * Functional component representing a popup.
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.trigger - Boolean to show/hide the popup.
 * @param {Function} props.setTrigger - Function to set the trigger value.
 * @param {React.ReactNode} props.children - The content to be displayed inside the popup.
 * @returns {JSX.Element|null} JSX for rendering the Popup component or null if trigger is false.
 */
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