import s from "./Button.module.css"
import React from "react";

type ButtonType ={
    buttonName:string
    onClickHandler: ()=>void
    disabled?:boolean;
    minCountGet?: number
    maxCountGet?: number
}


export const Button: React.FC<ButtonType> = (props)=>{
    return(
        <div>
       <button className={s.button} onClick={props.onClickHandler} disabled={props.disabled}>{props.buttonName} </button>
        </div>
    )
}