import React, {ChangeEvent} from "react";
import s from "./NumberInput.module.css";
type NumberInputType = {
    title: string
    value: number
    error:boolean
    onChangeHandler: (value: number) => void
}
export const NumberInput = (props: NumberInputType) => {
    const setMaxCount = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget) {
            props.onChangeHandler(Number(e.currentTarget.value))
        }
    }
    return (
        <div className={s.allNumberInput}>
            <div> {props.title}</div>
            <input className={props.error?s.inputError:s.input}
                type="number"
                value={props.value}
                onChange={setMaxCount}/>
        </div>
    )
}