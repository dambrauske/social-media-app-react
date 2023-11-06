import {useNavigate} from "react-router-dom";
import Autologin from "../components/Autologin.tsx";
import {useAppDispatch} from "../hooks.tsx";
import { setToken, setUser} from "../features/userSlice.tsx";
import {useForm} from 'react-hook-form';
import {LoginForm} from "../interfaces.tsx";
import socket from "../socket.tsx";
import {useState} from "react";

const LoginPage = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<LoginForm>({
        mode: "onChange"
    })

    const onSubmit = async (data: LoginForm) => {
        setLoginErrorMessage(null)
        dispatch(setUser(undefined))

        const username = data.username
        const password = data.password

        const user = {
            username,
            password,
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }

        try {
            const response = await fetch('http://localhost:8000/login', options)
            const data = await response.json()
            if (data.error === false) {
                dispatch(setUser(data.data.user))
                dispatch(setToken(data.data.token))
                socket().emit('userLoggedIn', data.data.token)
                navigate('/profile')
            }
            if (data.error === true) {
                setLoginErrorMessage(data.message)
                setTimeout(() => {
                    reset()
                    setLoginErrorMessage(null)
                }, 3000)
            }

        } catch (error) {
            console.error(error)
        }
    }

    const navigateToRegister = () => {
        navigate('/register')
        localStorage.clear()
    }

    return (
        <div className="bg-cover bg-slate-50 h-screen flex justify-center items-center">
            <div className="flex flex-col gap-4 bg-slate-50 py-6 pt-10 rounded-xl w-96 items-center shadow-2xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col rounded justify-center items-center">
                    <input
                        id="username"
                        {...register("username", {
                            validate: (value) => {
                                if (value) {
                                    if (value.length < 4 || value.length > 20) {
                                        return "Username should be between 4 and 20 characters"
                                    }
                                } else return "Username cannot be blank"
                            },
                        })}
                        className="border bg-slate-50 border-slate-400 placeholder-slate-300 p-1 rounded outline-none"
                        type="text"
                        placeholder="username"/>
                    <div className="h-5 text-center">
                        {errors.username &&
                            <div className="text-xs text-red-600">{errors.username.message as string}</div>
                        }
                    </div>
                    <input
                        id="password"
                        {...register("password", {
                            validate: (value) => {
                                if (value) {
                                    if (value.length < 4 || value.length > 20) {
                                        return "Password should be between 4 and 20 characters"
                                    }
                                    if (!/[A-Z]/.test(value)) {
                                        return "Password should include at least one uppercase letter"
                                    }
                                } else return "Password cannot be blank"
                            },
                        })}
                        className="border border-slate-400 bg-slate-50 placeholder-slate-300 p-1 rounded outline-none"
                        type="password"
                        placeholder="password"/>
                    <div className="h-5 text-center mb-2">
                        {errors.password &&
                            <div className="text-xs text-red-600">{errors.password.message as string}</div>
                        }

                        {loginErrorMessage &&
                            <div className="text-xs text-red-600">{loginErrorMessage as string}</div>
                        }
                    </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-slate-50 font-bold uppercase rounded hover:bg-indigo-600 px-4 py-1">Login
                        </button>

                </form>

                <Autologin />

                    <div className="flex flex-col items-center">
                        <div>Don't have an account?</div>
                        <div
                            onClick={navigateToRegister}
                            className="text-blue-500 font-bold cursor-pointer hover:underline">Register
                        </div>
                    </div>

            </div>
        </div>
    );
};

export default LoginPage;
