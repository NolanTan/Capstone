import './Script.css';

function Script(props) {
    return (
        <div className="script-container">
            <button className="script-button"> 
                <div className="text-file-icon">{props.text}</div>
                <div className="script-name">{props.name}</div>
            </button>
        </div>
    )
}

export default Script;