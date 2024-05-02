import './Script.css';

/**
 * A functional component representing a script element.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.text - The text to be displayed in the icon.
 * @param {string} props.name - The name of the script displayed under the icon.
 * @returns {JSX.Element} - JSX for rendering the script component.
 */
function Script(props) {
    const handleDelete = () => {
        props.onDelete(props.name);
    }

    return (
        <div>
            <button className="script-button"> 
                <button className="delete-button" onClick={handleDelete}>x</button>
                <div className="text-file-icon">{props.text}</div>
                <div className="script-name">{props.name}</div>
            </button>
        </div>
    )
}

export default Script;