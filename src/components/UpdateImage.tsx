import {validateImage} from "../helperFunctions.tsx";
import {RefObject, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import {updateUserImage} from "../features/userSlice.tsx";

const UpdateImage = () => {

    const imageRef: RefObject<HTMLInputElement> = useRef(null)
    const [imageError, setImageError] = useState<string | null>(null);
    const [imageSuccessMessage, setImageSuccessMessage] = useState<string | null>(null)
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.user.token)


    const updateImage = async (token: string | null, newImage: string | null) => {
        setImageSuccessMessage(null)
        dispatch(updateUserImage({token, newImage}))
        setImageSuccessMessage('Image updated successfully')

            setTimeout(() => {
                setImageSuccessMessage(null)
            }, 1000)

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
                onClick={() => updateImage(token, imageRef.current?.value ?? null)}
                className="cursor-pointer bg-slate-400">change picture
            </div>
        </div>
    );
};

export default UpdateImage;
