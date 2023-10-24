import {useNavigate} from "react-router-dom";
import Autologin from "../components/Autologin.tsx";
import {useAppDispatch} from "../hooks.tsx";
import {setToken, setUser} from "../features/userSlice.tsx";
import {useForm} from "react-hook-form";
import {RegisterForm} from "../interfaces.tsx";

type NewUser = {
    username: string | undefined,
    email: string | undefined,
    password: string | undefined,
}

const RegisterPage = () => {

        const navigate = useNavigate()
        const dispatch = useAppDispatch()

        const {
            register,
            handleSubmit,
            watch,
            formState: {errors}
        } = useForm({
            mode: "onChange"
        })

        const onSubmit = async (data: RegisterForm) => {

            const username = data.username
            const email = data.email
            const password = data.password

            const newUser: NewUser = {
                username,
                email,
                password,
            }

            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newUser)
            }

            try {
                const response = await fetch('http://localhost:8000/register', options)
                const data = await response.json()
                console.log(data)
                dispatch(setUser(data.data.user))
                dispatch(setToken(data.data.token))
                navigate('/profile')
            } catch (error) {
                console.log(error)
            }
        }

        const navigateToLogin = () => {
            navigate('/')
            localStorage.clear()
        }


        return (
            <div className="bg-cover bg-slate-50 h-screen flex justify-center items-center">
                <div className="flex flex-col gap-4 bg-slate-50 py-4 pt-10 rounded-xl w-96 items-center shadow-2xl">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col p-4 rounded justify-center items-center">
                        <input
                            id="username"
                            {...register("username", {
                                validate: (value) => {
                                    if (value) {
                                        if (value.length < 4 || value.length > 20) {
                                            return "Username should be between 4 and 20 characters"
                                        } else return true
                                    }
                                },
                            })}
                            className="border bg-slate-50 border-slate-400 placeholder-slate-300 p-1 rounded-l outline-none"
                            type="text"
                            placeholder="username"/>
                        <div className="h-5 text-center">
                            {errors.username &&
                                <div className="text-xs text-red-600">{errors.username.message as string}</div>
                            }
                        </div>
                        <input
                            id="email"
                            {...register("email", {
                                validate: (value) => {
                                    if (value) {
                                        if (value.length < 0) {
                                            return "Email cannot be blank"
                                        }
                                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                                            return "Email is not valid"
                                        } else return true
                                    }
                                },
                            })}
                            className="border bg-slate-50 border-slate-400 placeholder-slate-300 p-1 rounded-l outline-none"
                            type="email"
                            placeholder="email"/>
                        <div className="h-5 text-center">
                            {errors.email &&
                                <div className="text-xs text-red-600">{errors.email.message as string}</div>
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
                                        } else return true
                                    }
                                },
                            })}
                            className="border border-slate-400 bg-slate-50 placeholder-slate-300 p-1 rounded-l outline-none"
                            type="text"
                            placeholder="password"/>
                        <div className="h-5 text-center">
                            {errors.password &&
                                <div className="text-xs text-red-600">{errors.password.message as string}</div>
                            }
                        </div>
                        <input
                            id="password2"
                            {...register("password2", {
                                validate: (value) => {
                                    if (value) {
                                        if (value.length < 4 || value.length > 20) {
                                            return "Password should be between 4 and 20 characters"
                                        }
                                        if (!/[A-Z]/.test(value)) {
                                            return "Password should include at least one uppercase letter"
                                        }
                                        if (value !== watch("password")) {
                                            return "Passwords should match"
                                        }
                                        else return true
                                    }
                                },
                            })}
                            className="border border-slate-400 bg-slate-50 placeholder-slate-300 p-1 rounded-l outline-none"
                            type="text" placeholder="repeat password"/>
                        <div className="h-5 text-center mb-2">
                            {errors.password2 &&
                                <div className="text-xs text-red-600">{errors.password2.message as string}</div>
                            }
                        </div>

                        <Autologin/>

                        <div className="flex flex-col gap-4 mt-4">
                            <button
                                type="submit"
                                className="bg-blue-500 text-slate-50 font-bold uppercase rounded hover:bg-indigo-600 px-4 py-1">
                                Register
                            </button>
                            <div className="flex flex-col items-center gap-2">
                                <div>Already have an account?</div>
                                <div
                                    onClick={navigateToLogin}
                                    className="text-blue-500 font-bold cursor-pointer">Login
                                </div>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        );
    }
;

export default RegisterPage;
