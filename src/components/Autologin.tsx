import {useDispatch} from "react-redux";
import {setAutoLogin} from "../features/userSlice.tsx";
import {ChangeEvent, useState} from "react";

const Autologin = () => {
    const dispatch = useDispatch()
    const [autoLoginValue, setAutoLoginValue] = useState(false);

    const autoLoginChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
        setAutoLoginValue(checked)
        localStorage.setItem('autoLogin', checked.toString())
        dispatch(setAutoLogin(checked))
    }

    return (
        <div className="flex gap-2">
            <label htmlFor="auto-login-checkbox">Stay logged in</label>
            <input
                id="auto-login-checkbox"
                value={autoLoginValue.toString()}
                onChange={autoLoginChanged}
                type="checkbox"/>

        </div>
    );
};

export default Autologin;
