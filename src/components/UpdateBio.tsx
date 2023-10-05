import {validateBio} from "../helperFunctions.tsx";
import {RefObject, useRef, useState} from "react";
import {useAppDispatch} from "../hooks.tsx";
import {setBio} from "../features/userSlice.tsx";

const UpdateBio = () => {

    const dispatch = useAppDispatch()


    const updateBio = async () => {
        setBioSuccessMessage(null)
        const updatedBio: string | undefined = bioRef.current?.value || ''

        console.log('updatedBio', updatedBio)

        const options: RequestInit = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({updatedBio}),
        }

        const token = localStorage.getItem('token')

        if (token !== null) {
            options.headers = {
                ...options.headers,
                "authorization": token,
            }
        }


        try {
            const response = await fetch('http://localhost:8000/updateBio', options)
            const data = await response.json()
            console.log(data)
            dispatch(setBio(data.data))
            setBioSuccessMessage('Bio updated successfully')

            setTimeout(() => {
                setBioSuccessMessage(null)
            }, 1000)

        } catch (error) {
            console.log(error)
        }

        if (bioRef.current) {
            bioRef.current.value = ''
        }
    }


    const bioRef: RefObject<HTMLInputElement> = useRef(null)
    const [bioError, setBioError] = useState<string | null>(null);
    const [bioSuccessMessage, setBioSuccessMessage] = useState<string | null>(null)

    return (
        <div className="flex flex-col gap-2">
            <input
                onBlur={() => validateBio(bioRef.current?.value, setBioError)}
                className="border-2 border-slate-400"
                ref={bioRef}
                type="text" placeholder="bio"/>
            <div className="h-5">
                {bioError &&
                    <div className="text-xs text-red-600">{bioError}</div>
                }

                {bioSuccessMessage &&
                    <div className="text-xs text-green-600">{bioSuccessMessage}</div>
                }
            </div>
            <div
                onClick={updateBio}
                className="cursor-pointer bg-slate-400">update bio
            </div>
        </div>
    );
};

export default UpdateBio;
