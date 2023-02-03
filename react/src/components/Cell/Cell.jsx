import { useState } from 'react';
import './Cell.css'

function Cell (props) {
    
    const [clicked, setClicked] = useState(false);
    
    function onceClicked() {
        if (!clicked) {
            setClicked(true);
            props.onClick();
        }
    }

    const cellWinner = props.win.includes(props['data-cell']) ? 'cell-winner' : '';

    return (
        <div className={"cell " + cellWinner} onClick={onceClicked}>
            <span>{props.piece}</span>
        </div>
    )
}

export default Cell