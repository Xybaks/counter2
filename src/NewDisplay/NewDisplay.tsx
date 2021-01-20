import s from "./NewDisplay.module.css";
import {Button} from "../Button/Button";
import React from "react";
import {OnDisplayValue} from "../OnDisplayValue/OnDisplayValue";
import {NumberInput} from "../NumberInput/NumberInput";


type NewDisplayType = {
    error: boolean
    minCount: number
    maxCount: number
    incReset: boolean
    presentCount: number
    setDisabled: boolean
    resetDisabled: boolean
    valuesEntered: boolean
    setDisplayCall: () => void
    setInitialValue: () => void
    setMinCountCallback: (minCount: number) => void
    setMaxCountCallback: (maxCount: number) => void
    setCounts: (minCount: number, maxCount: number) => void
    setPresentCountCallback: (presentCount: number) => void
}

export const NewDisplay: React.FC<NewDisplayType> = (props) => {

    const setPresentCountCallback = () => {
        props.setPresentCountCallback(props.presentCount)
    }
// при увеличении minCount
    let maxCountError = props.error && props.minCount > -1
    // handler нажатия на кнопку SET

    const setInitialValue = () => {
        props.setInitialValue()
    }
    const setCounts = () => {
        props.setCounts(props.minCount, props.maxCount)
    }
// return
    if (props.valuesEntered) {
        return (<div className={s.display}>
                <div className={s.valueDisplay}>
                    <NumberInput
                        title="max value"
                        error={maxCountError}
                        value={props.maxCount}
                        onChangeHandler={props.setMaxCountCallback}/>
                    <NumberInput
                        error={props.error}
                        title="min value"
                        value={props.minCount}
                        onChangeHandler={props.setMinCountCallback}/>
                </div>

                    <div className={s.button}>
                        <Button
                            buttonName="set"
                            onClickHandler={setCounts}
                            disabled={props.setDisabled}/>
                    </div>
            </div>
    )
    } else {
        return (<div className={s.display}>
                        <OnDisplayValue
                            presentCount={props.presentCount}
                            maxCount={props.maxCount}
                            valuesEntered={props.valuesEntered}
                        />
                <div className={s.button}>
                    <Button buttonName="Inc"
                            onClickHandler={setPresentCountCallback}
                            disabled={props.incReset}/>
                    <Button buttonName="reset"
                            onClickHandler={setInitialValue}
                            disabled={props.resetDisabled}/>
                    <Button buttonName="set"
                            onClickHandler={props.setDisplayCall}
                    />
                </div>
            </div>
        )
    }
}
