import {RefObject, useRef, useState} from "react";
import {validatePassword} from "../../helperFunctions.tsx";

const UpdatePassword = () => {

    const passwordRef: RefObject<HTMLInputElement> = useRef(null)
    const newPasswordRef: RefObject<HTMLInputElement> = useRef(null)

    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [newPasswordError, setNewPasswordError] = useState<string | null>(null)
    const [passwordSuccessMessage, setPasswordSuccessMessage] = useState<string | null>(null)

    const updatePassword = async () => {

        setPasswordSuccessMessage(null)
        const password: string | undefined = passwordRef.current?.value || ''
        const newPassword: string | undefined = newPasswordRef.current?.value || ''

        const options: RequestInit = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({password, newPassword}),
        }

        const token = localStorage.getItem('token')

        if (token !== null) {
            options.headers = {
                ...options.headers,
                "authorization": token,
            }
        }

        try {
            const response = await fetch('http://localhost:8000/updatePassword', options)
            const data = await response.json()
            console.log(data)
            setPasswordSuccessMessage('Password updated successfully')

            setTimeout(() => {
                setPasswordSuccessMessage(null)
            }, 1000)


        } catch (error) {
            console.log(error)
        }

        if (passwordRef.current) {
            passwordRef.current.value = ''
        }

        if (newPasswordRef.current) {
            newPasswordRef.current.value = ''
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <input
                onBlur={() => validatePassword(passwordRef.current?.value, setPasswordError)}
                className="border-2 border-slate-400"
                ref={passwordRef}
                type="password" placeholder="current password"/>
            <div className="h-5">
                {passwordError &&
                    <div className="text-xs text-red-600">{passwordError}</div>
                }
            </div>
            <input
                onBlur={() => validatePassword(newPasswordRef.current?.value, setNewPasswordError)}
                className="border-2 border-slate-400"
                ref={newPasswordRef}
                type="password" placeholder="new password"/>
            <div className="h-5">

                {newPasswordError &&
                    <div className="text-xs text-red-600">{newPasswordError}</div>
                }

                {passwordSuccessMessage &&
                    <div className="text-xs text-green-600">{passwordSuccessMessage}\</div>

                }
            </div>
            <div
                onClick={updatePassword}
                className="cursor-pointer bg-slate-400">change password
            </div>
        </div>
    );
};

export default UpdatePassword;
