import {useDispatch} from "react-redux";
import {useAppSelector} from "../hooks.tsx";
import {setAutoLogin} from "../features/userSlice.tsx";

const Autologin = () => {

    const dispatch = useDispatch()
    const autoLogin = useAppSelector(state => state.user.autoLogin)

    const handleAutologin = () => {
        const newAutoLogin = !autoLogin
        localStorage.setItem('autoLogin', newAutoLogin.toString())
        dispatch(setAutoLogin(newAutoLogin))
    }

    return (
        <label className="flex gap-2">
            <input
                onChange={handleAutologin}
                type="checkbox"/>
            Stay logged in
        </label>
    );
};

export default Autologin;
