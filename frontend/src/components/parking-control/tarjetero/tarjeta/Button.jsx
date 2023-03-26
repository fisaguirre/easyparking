import React from "react";
import "../styles/Cards.css"
//Componente para cambiar el color del button al presionarlo
export const Button = (props) => {
    //function Button(props) {
    return (
        <button
            type="button"
            className="Button"
            style={{ backgroundColor: props.backgroundColor }}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}

//export default Button;