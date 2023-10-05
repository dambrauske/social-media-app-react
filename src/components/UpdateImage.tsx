import {validateImage} from "../helperFunctions.tsx";
import {setImage} from "../features/userSlice.tsx";
import {RefObject, useRef, useState} from "react";
import {useAppDispatch} from "../hooks.tsx";

const UpdateImage = () => {

    const imageRef: RefObject<HTMLInputElement> = useRef(null)
    const dispatch = useAppDispatch()
    const [imageError, setImageError] = useState<string | null>(null);
    const [imageSuccessMessage, setImageSuccessMessage] = useState<string | null>(null)


    const updateImage = async () => {

        setImageSuccessMessage(null)
        const newImage: string | undefined = imageRef.current?.value || ''

        console.log('newImage', newImage)

        const options: RequestInit = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({newImage}),
        }

        const token = localStorage.getItem('token')

        if (token !== null) {
            options.headers = {
                ...options.headers,
                "authorization": token,
            }
        }


        try {
            const response = await fetch('http://localhost:8000/updateImage', options)
            const data = await response.json()
            console.log(data)
            dispatch(setImage(data.data))
            console.log('image', data.data)
            setImageSuccessMessage('Image updated successfully')

            setTimeout(() => {
                setImageSuccessMessage(null)
            }, 1000)

        } catch (error) {
            console.log(error)
        }

        if (imageRef.current) {
            imageRef.current.value = ''
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <input
                onBlur={() => validateImage(imageRef.current?.value, setImageError)}
                className="border-2 border-slate-400"
                ref={imageRef}
                type="url" placeholder="image url"/>
            <div className="h-5">
                {imageError &&
                    <div className="text-xs text-red-600">{imageError}</div>
                }

                {imageSuccessMessage &&
                    <div className="text-xs text-green-600">{imageSuccessMessage}</div>
                }
            </div>
            <div
                onClick={updateImage}
                className="cursor-pointer bg-slate-400">change picture
            </div>
        </div>
    );
};

export default UpdateImage;
