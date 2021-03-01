import s from "../NewDisplay/NewDisplay.module.css";
import React from "react";

type OnDisplayValueType = {
    presentCount: number
    maxCount: number
}


const OnDisplayValue:React.FC<OnDisplayValueType>=(props)=> {

    return (
      props.presentCount === props.maxCount
            ? <div className={s.valueDisplay}><div className={s.red}> {props.presentCount}</div></div>
            : <div className={s.valueDisplay}> {props.presentCount} </div>
    )
}
export default OnDisplayValue