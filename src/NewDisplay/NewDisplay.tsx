import s from "./NewDisplay.module.css";
import Button from "../Button/Button";
import React, {useCallback} from "react";
import OnDisplayValue from "../OnDisplayValue/OnDisplayValue";
import NumberInput from "../NumberInput/NumberInput";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/reduxStore/store";
import {
    CounterStateType, setDisplay, setInitialValue,
    setMaxCount, setMinCount, setPresentCount
} from "../state/counterReducer";


export const NewDisplay = () => {
// достаем наш state из редоксовского стора )(хуком useSelector)
    const state = useSelector<AppRootStateType, CounterStateType>(state => state.counterState)
// достаем наш  dispatch   из редоксовского стора (хуком useDispatch)
    const dispatch = useDispatch();
// отрисовка ошибки на поле ввода maxCount
    let maxCountError = state.error && (state.minCount > -1)
    // наши коллбэки, в которых вызываем диспатч с помощью ActionCreators
    const setPresentCountCallback = useCallback(() => {
        dispatch(setPresentCount(state.presentCount))
    }, [dispatch, state.presentCount])

    const setInitialValueCallback = useCallback(() => {
        dispatch(setInitialValue())
    }, [dispatch])

    const setCountsCallback = useCallback(() => {
        dispatch(setInitialValue())
        //вносим в локалсторадж значения при нажатии на  set
        try {
            localStorage.setItem("minCount", state.minCount.toString())
            localStorage.setItem("maxCount", state.maxCount.toString())
        } finally {
        }
    }, [dispatch, state.minCount, state.maxCount])

    const setMaxCountCallback = useCallback((value: number) => {
        dispatch(setMaxCount(value))
    }, [dispatch])

    const setMinCountCallback = useCallback((value: number) => {
        dispatch(setMinCount(value))
    }, [dispatch])

    const setDisplayCallback = useCallback(() => {
        dispatch(setDisplay())
    }, [dispatch])

    return (
        state.isValuesNotEntered
            ? //  return при уже  заданных значениях
            <div className={s.display}>
                <div className={s.valueDisplay}>
                    <NumberInput
                        title="max value"
                        error={maxCountError}
                        value={state.maxCount}
                        onChangeHandler={setMaxCountCallback}/>
                    <NumberInput
                        error={state.error}
                        title="min value"
                        value={state.minCount}
                        onChangeHandler={setMinCountCallback}/>
                </div>

                <div className={s.button}>
                    <Button
                        buttonName="set"
                        onClickHandler={setCountsCallback}
                        disabled={state.setDisabled}/>
                </div>
            </div>
            : //  return при вводе значений
            <div className={s.display}>
                <OnDisplayValue
                    presentCount={state.presentCount}
                    maxCount={state.maxCount}
                />
                <div className={s.button}>
                    <Button buttonName="Inc"
                            onClickHandler={setPresentCountCallback}
                            disabled={state.incReset}/>
                    <Button buttonName="reset"
                            onClickHandler={setInitialValueCallback}
                            disabled={state.resetDisabled}/>
                    <Button buttonName="set"
                            onClickHandler={setDisplayCallback}
                            disabled={state.setDisabled}
                    />
                </div>
            </div>
    )

}

