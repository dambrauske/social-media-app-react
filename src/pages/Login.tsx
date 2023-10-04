import {Link} from "react-router-dom";
import {RefObject, useRef, useState} from "react";
import {validatePassword, validateUsername} from "../helperFunctions.tsx";
import Autologin from "../components/Autologin.tsx";


const Login = () => {

    const [userNameError, setUserNameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null)

    const usernameRef: RefObject<HTMLInputElement> = useRef(null)
    const passwordRef: RefObject<HTMLInputElement> = useRef(null)

    return (
        <div className="bg-cover bg-slate-50 h-screen flex justify-center items-center">
            <div className="flex flex-col gap-4 bg-slate-50 p-4 pt-10 rounded-xl w-96 items-center shadow-2xl">
                <div className="flex flex-col p-4 rounded justify-center items-center">
                    <input
                        className="border bg-slate-50 border-slate-400 placeholder-slate-300 p-1 rounded-l outline-none"
                        ref={usernameRef}
                        onBlur={() => validateUsername(usernameRef.current?.value, setUserNameError)}
                        required={true}
                        type="text" placeholder="username"/>
                    <div className="h-5">
                        {userNameError &&
                            <div className="text-xs text-red-600">{userNameError}</div>
                        }
                    </div>
                    <input
                        className="border border-slate-400 bg-slate-50 placeholder-slate-300 p-1 rounded-l outline-none"
                        ref={passwordRef}
                        onBlur={() => validatePassword(usernameRef.current?.value, setPasswordError)}
                        required={true}
                        type="password" placeholder="password"/>
                    <div className="h-5">
                        {passwordError &&
                            <div className="text-xs text-red-600">{passwordError}</div>
                        }
                    </div>

                    <Autologin/>

                    <div className="flex flex-col gap-4 mt-4">

                        <button
                            className="bg-blue-500 text-slate-50 font-bold uppercase rounded hover:bg-indigo-600 px-4 py-1">Login
                        </button>
                        <div className="flex flex-col items-center gap-2">
                            <div>Don't have an account?</div>
                            <Link to="/register" className="text-blue-500 font-bold">Sign in</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
