import {useDispatch} from "react-redux";
import {setAutoLogin} from "../features/userSlice.tsx";

const Autologin = () => {

    const dispatch = useDispatch()

    const handleAutologin = () => {
        const currentAutoLogin = localStorage.getItem('autoLogin')
        const newAutoLogin = currentAutoLogin === 'true' ? 'false' : 'true'
        localStorage.setItem('autoLogin', newAutoLogin)
        dispatch(setAutoLogin(newAutoLogin === 'true'))
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
