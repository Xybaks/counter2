export const SET_MIN_COUNT = 'SET-MIN-COUNT'
export const SET_MAX_COUNT = 'SET-MAX-COUNT'
export const SET_PRESENT_COUNT = 'SET-PRESENT-COUNT'
export const SET_INITIAL_VALUE = 'SET-INITIAL-VALUE'
export const SET_DISPLAY = 'SET-DISPLAY'
export const SET_LOCALSTORAGE_COUNTS = 'SET-LOCALSTORAGE-COUNTS'

export type CounterStateType = typeof initialState
export type ActionsTypes = setMinCountActionType | setMaxCountActionType | setPresentCountActionType
    | setInitialValueActionType | setDisplayActionType

//функция пролучения из локалстораджа значений с типизацией получаемого объекта
const getCountsFromLocalStorage = (): {minCountLS: number, maxCountLS: number } => {
    let minCountLS = 0
    let maxCountLS = 5
    // проверка, вдруг отключен localStorage у пользователя
    try {
        minCountLS = Number(localStorage.getItem("minCount"))
        maxCountLS = Number(localStorage.getItem("maxCount"))
       // эта проверка нужна, чтобы при вервом запуске не выдавало maxCountLS=0
        if (maxCountLS === 0) {
            maxCountLS = 5
        }
    } catch {
        // на всякий случай
        return {minCountLS: minCountLS, maxCountLS: maxCountLS}
    }
    return {minCountLS: minCountLS, maxCountLS: maxCountLS}
}

const initialState = {
    minCount: getCountsFromLocalStorage().minCountLS as number,
    maxCount: getCountsFromLocalStorage().maxCountLS as number,
    presentCount: 0,
    isValuesNotEntered: true, // заданы ли значения minCount/maxCount
    error: false,
    setDisabled: false,
    resetDisabled: false,
    incReset: false
}

export const counterReducer = (state: CounterStateType = initialState, action: ActionsTypes): CounterStateType => {
    switch (action.type) {
        //ввод минимаьлного значения счетчика
        case SET_MIN_COUNT: {
            if (
                action.minCount > Number.MAX_SAFE_INTEGER ||  //  проверка на   самое большое целое число JS
                action.minCount % 1 !== 0 ||   //проверка на то, что число целое ( можно было сделать через Number.isInteger(число))
                action.minCount < 0 || // проверка на то, что число больше нуля
                action.minCount >= state.maxCount
            ) {
                return {...state, error: true, minCount: action.minCount, setDisabled: true}
            } else return {...state, error: false, minCount: action.minCount, isValuesNotEntered: true, setDisabled: false}
        }
        //ввод максимального значения счетчика
        case SET_MAX_COUNT: {
            if (action.maxCount > Number.MAX_SAFE_INTEGER ||  //  проверка на   самое большое целое число JS
                action.maxCount % 1 !== 0 || //проверка на то, что число целое ( можно было сделать через Number.isInteger(число))
                action.maxCount < 0 || // проверка на то, что число больше нуля
                action.maxCount <= state.minCount  // проверка на то, что   введенное число число больше _mimCount
            ) {
                return {...state, error: true, maxCount: action.maxCount, setDisabled: true}
            } else {
                return {
                    ...state,
                    error: false,
                    maxCount: action.maxCount,
                    presentCount: state.minCount,
                    isValuesNotEntered: true,
                    setDisabled: false
                }
            }
        }
        //ввод текущего значения счетчика
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
                return {...state, incReset: true, presentCount: action.presentCount + 1}
            } else
                return {...state, presentCount: action.presentCount + 1}
        }
        //  ввод выбранных  минимального и максимаьлного значений счетчика
        case SET_INITIAL_VALUE: {
            return {...state, presentCount: state.minCount, isValuesNotEntered: false, incReset: false}
        }
        //выбор отображаемого дисплея (основной/ для становки значений)
        case SET_DISPLAY: {
            return {...state, isValuesNotEntered: true}
        }
        // добаление в localStorage
        default:
            return state
    }

}
// ActionCreators
export const setMinCount = (minCount: number) => ({type: SET_MIN_COUNT, minCount} as const)
export const setMaxCount = (maxCount: number) => ({type: SET_MAX_COUNT, maxCount} as const)
export const setPresentCount = (presentCount: number) => ({type: SET_PRESENT_COUNT, presentCount} as const)
export const setInitialValue = () => ({type: SET_INITIAL_VALUE} as const)
export const setDisplay = () => ({type: SET_DISPLAY} as const)


type setMinCountActionType = ReturnType<typeof setMinCount>
type setMaxCountActionType = ReturnType<typeof setMaxCount>
type setPresentCountActionType = ReturnType<typeof setPresentCount>
type setInitialValueActionType = ReturnType<typeof setInitialValue>
type setDisplayActionType = ReturnType<typeof setDisplay>

