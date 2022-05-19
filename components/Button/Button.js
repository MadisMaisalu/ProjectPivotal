import React from "react";
import './button.css';

function Button({disabled, id, click, title, name}) {
    return <button className="buttonClass" disabled={disabled} id={id} onClick={click} title={title}>{name} </button>
}

export default Button;