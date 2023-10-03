import {Link} from "react-router-dom";
import {RefObject, useRef, useState} from "react";
import {validateEmail, validatePassword, validatePassword2, validateUsername} from "../helperFunctions.tsx";

const Register = () => {

        const [userNameError, setUserNameError] = useState<string | null>(null);
        const [password1Error, setPassword1Error] = useState<string | null>(null)
        const [password2Error, setPassword2Error] = useState<string | null>(null)
        const [emailError, setEmailError] = useState<string | null>(null)

        const usernameRef: RefObject<HTMLInputElement> = useRef(null)
        const emailRef: RefObject<HTMLInputElement> = useRef(null)
        const password1Ref: RefObject<HTMLInputElement> = useRef(null)
        const password2Ref: RefObject<HTMLInputElement> = useRef(null)




        // @ts-ignore
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
                            className="border bg-slate-50 border-slate-400 placeholder-slate-300 p-1 rounded-l outline-none"
                            ref={emailRef}
                            onBlur={() => validateEmail(emailRef.current?.value, setEmailError)}
                            required={true}
                            type="email" placeholder="email"/>
                        <div className="h-5">
                            {emailError &&
                                <div className="text-xs text-red-600">{emailError}</div>
                            }
                        </div>
                        <input
                            className="border border-slate-400 bg-slate-50 placeholder-slate-300 p-1 rounded-l outline-none"
                            ref={password1Ref}
                            onBlur={() => validatePassword(password1Ref.current?.value, setPassword1Error)}
                            required={true}
                            type="password" placeholder="password"/>
                        <div className="h-5">
                            {password1Error &&
                                <div className="text-xs text-red-600">{password1Error}</div>
                            }
                        </div>
                        <input
                            className="border border-slate-400 bg-slate-50 placeholder-slate-300 p-1 rounded-l outline-none"
                            ref={password2Ref}
                            onBlur={() => validatePassword2(password1Ref.current?.value, password2Ref.current?.value, setPassword2Error)}
                            required={true}
                            type="password" placeholder="repeat password"/>
                        <div className="h-5">
                            {password2Error &&
                                <div className="text-xs text-red-600">{password2Error}</div>
                            }
                        </div>
                        <div className="flex flex-col gap-4 mt-4">
                            <button
                                className="bg-blue-500 text-slate-50 font-bold uppercase rounded hover:bg-purple-700 px-4 py-1">Register
                            </button>
                            <div className="flex flex-col items-center gap-2">
                                <div>Already have an account?</div>
                                <Link to="/" className="text-blue-500 font-bold">Login</Link>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
;

export default Register;
