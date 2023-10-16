import {validateBio} from "../../helperFunctions.tsx";
import {RefObject, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import {updateUserBio} from "../../features/userSlice.tsx";

const UpdateBio = () => {

    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.user.token)
    const bioRef: RefObject<HTMLInputElement> = useRef(null)
    const [bioError, setBioError] = useState<string | null>(null);
    const [bioSuccessMessage, setBioSuccessMessage] = useState<string | null>(null)

    const updateBio = async (token: string | null, updatedBio: string | null) => {
        setBioSuccessMessage(null)
        dispatch(updateUserBio({token, updatedBio}))

        setBioSuccessMessage('Bio updated successfully')

        setTimeout(() => {
            setBioSuccessMessage(null)
        }, 1000)

        if (bioRef.current) {
            bioRef.current.value = ''
        }
    }

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
                onClick={() => updateBio(token, bioRef.current?.value ?? null)}
                className="cursor-pointer bg-slate-400">update bio
            </div>
        </div>
    );
};

export default UpdateBio;
