export const SET_MIN_COUNT = 'SET-MIN-COUNT'
export const SET_MAX_COUNT = 'SET-MAX-COUNT'
export const SET_PRESENT_COUNT = 'SET-PRESENT-COUNT'
export const SET_INITIAL_VALUE = 'SET-INITIAL-VALUE'
export const SET_DISPLAY = 'SET-DISPLAY'
export const SET_LOCALSTORAGE_COUNTS = 'SET-LOCALSTORAGE-COUNTS'

type CounterStateType = {
    minCount: number,
    maxCount: number,
    presentCount: number,
    valuesEntered: boolean,
    error: boolean,
    setDisabled: boolean,
    resetDisabled: boolean,
    incReset: boolean
}
export type ActionsTypes = setMinCountActionType | setMaxCountActionType | setPresentCountActionType
    | setInitialValueActionType | setDisplayActionType | setLocalStorageCountsActionType

//функция пролучения из локалстораджа значаний
const getCountsFromLocalStorage = () => {
    try {
        let minCountLS = Number(localStorage.getItem("minCount"))
        let maxCountLS = Number(localStorage.getItem("maxCount"))
        return {minCountLS: minCountLS, maxCountLS: maxCountLS}
    } catch {
        return {minCountLS: 0, maxCountLS: 5}
    }
}
// переменные из локалстораджа
let minCountLS = getCountsFromLocalStorage().minCountLS  //(Number(localStorage.getItem("minCount")))
let maxCountLS = getCountsFromLocalStorage().maxCountLS

const initialState = {
    minCount: minCountLS,  //(Number(localStorage.getItem("minCount")))
    maxCount: maxCountLS, //Number(localStorage.getItem("maxCount"))
    presentCount: 0,
    valuesEntered: false,
    error: false,
    setDisabled: true,
    resetDisabled: false,
    incReset: false
}


export const counterReducer = (state: CounterStateType = initialState, action: ActionsTypes): CounterStateType => {
    switch (action.type) {
        case SET_MIN_COUNT: {
            debugger
            if (
                action.minCount > Number.MAX_SAFE_INTEGER ||  //  проверка на   самое большое целое число JS
                action.minCount % 1 !== 0 ||   //проверка на то, что число целое ( можно было сделать через Number.isInteger(число))
                action.minCount < 0 || // проверка на то, что число больше нуля
                action.minCount >= state.maxCount
            ) {
                return {...state, error: true, minCount: action.minCount}
            } else return {...state, error: false, minCount: action.minCount, valuesEntered: true}
        }
        case SET_MAX_COUNT: {
            if (action.maxCount > Number.MAX_SAFE_INTEGER ||  //  проверка на   самое большое целое число JS
                action.maxCount % 1 !== 0 || //проверка на то, что число целое ( можно было сделать через Number.isInteger(число))
                action.maxCount < 0 || // проверка на то, что число больше нуля
                action.maxCount <= state.minCount  // проверка на то, что   введенное число число больше _mimCount
            ) {
                return {...state, error: true, maxCount: action.maxCount}
            } else {
                return {
                    ...state,
                    error: false,
                    maxCount: action.maxCount,
                    presentCount: state.minCount,
                    valuesEntered: true
                }
            }
        }
        case   SET_PRESENT_COUNT: {
            if (
                action.presentCount > Number.MAX_SAFE_INTEGER ||  //  проверка на   самое большое целое число JS
                action.presentCount % 1 !== 0 || //проверка на то, что число целое ( можно было сделать через Number.isInteger(число))
                action.presentCount < 0 || // проверка на то, что число больше нуля
                action.presentCount < state.minCount || // проверка на то, что   введенное число число больше _mimCount
                action.presentCount > state.maxCount
            ) {
                return {...state, presentCount: state.minCount}
            } else if (action.presentCount === state.maxCount - 1) {
                return {...state, presentCount: action.presentCount + 1}
            } else
                return {...state, presentCount: action.presentCount + 1}
        }
        case SET_INITIAL_VALUE: {
            return {...state, presentCount: state.minCount, valuesEntered: false}
        }
        case SET_DISPLAY: {
            return {...state, valuesEntered: true}
        }
        case SET_LOCALSTORAGE_COUNTS: {
            try {
                localStorage.setItem("minCount", action.minCount.toString())
                localStorage.setItem("maxCount", action.maxCount.toString())
            } finally {}
            return state
        }
        default:
            return state
    }

}

export const setMinCount = (minCount: number) => ({type: SET_MIN_COUNT, minCount} as const)
export const setMaxCount = (maxCount: number) => ({type: SET_MAX_COUNT, maxCount} as const)
export const setPresentCount = (presentCount: number) => ({type: SET_PRESENT_COUNT, presentCount} as const)
export const setInitialValue = () => ({type: SET_INITIAL_VALUE} as const)
export const setDisplay = () => ({type: SET_DISPLAY} as const)
export const setLocalStorageCounts = (minCount: number, maxCount: number) =>
    ({type: SET_LOCALSTORAGE_COUNTS, minCount, maxCount} as const)

type setMinCountActionType = ReturnType<typeof setMinCount>
type setMaxCountActionType = ReturnType<typeof setMaxCount>
type setPresentCountActionType = ReturnType<typeof setPresentCount>
type setInitialValueActionType = ReturnType<typeof setInitialValue>
type setDisplayActionType = ReturnType<typeof setDisplay>
type setLocalStorageCountsActionType = ReturnType<typeof setLocalStorageCounts>
