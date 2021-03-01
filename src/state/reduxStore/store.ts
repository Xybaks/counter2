
import {combineReducers, createStore} from "redux";
import {counterReducer} from "../counterReducer";

// да, можно и обойтис, т.к. 1 радюсер, но буду делать по уму
const rootReducer = combineReducers({
    counterState: counterReducer
})

// непосредственно создаём store
export const store = createStore(rootReducer);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

//  это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
