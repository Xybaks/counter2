import s from "./Header.module.css";
import React from "react";
import {NewDisplay} from "../NewDisplay/NewDisplay";


export const Header = () => {
    return (
        <div>
            <h1> Counter v2</h1>
            <div className={s.displays}>
                <NewDisplay/>
            </div>
        </div>

    )
}
