import UpdateImage from "../userProfileUpdates/UpdateImage.tsx";
import UpdatePassword from "../userProfileUpdates/UpdatePassword.tsx";
import UpdateBio from "../userProfileUpdates/UpdateBio.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import {validateBio, validateImage, validatePassword} from "../../helperFunctions.tsx";
import {RefObject, useRef, useState} from "react";
import {updateUserBio, updateUserImage} from "../../features/userSlice.tsx";

interface Props {
    setShowProfileSettingsModal: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const ProfileUpdateModal = ({setShowProfileSettingsModal}: Props) => {

    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()

    const imageRef: RefObject<HTMLInputElement> = useRef(null)
    const bioRef: RefObject<HTMLInputElement> = useRef(null)
    const passwordRef: RefObject<HTMLInputElement> = useRef(null)
    const newPasswordRef: RefObject<HTMLInputElement> = useRef(null)

    const [imageError, setImageError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [newPasswordError, setNewPasswordError] = useState<string | null>(null)
    const [bioError, setBioError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)


    const updateProfile = async () => {
        const token = localStorage.getItem('token')

        const newImage = imageRef.current?.value || null
        const updatedBio = bioRef.current?.value || null
        const password = newPasswordRef.current?.value || null
        const newPassword = newPasswordRef.current?.value || null

        setSuccessMessage(null)

        if (imageError === null &&
            bioError === null &&
            passwordError === null &&
            newPasswordError === null) {

            dispatch(updateUserImage({token, newImage}))
            dispatch(updateUserBio({token, updatedBio}))


            const options: RequestInit = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({password, newPassword}),
            }


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
            } catch (error) {
                console.log(error)
            }

            setSuccessMessage('Profile updated successfully')

            setTimeout(() => {
                setSuccessMessage(null)
            }, 1000)

            setTimeout(() => {
                setShowProfileSettingsModal(false)
            }, 1000)


        }

    }

    return (
        <div className={"relative flex justify-center items-center"}>
            <div
                className={"fixed top-0 left-0 right-0 w-screen h-screen backdrop-blur-sm bg-black bg-opacity-50 z-20"}></div>

            <div className={"bg-slate-50 w-[35rem] p-4 flex flex-col gap-2 absolute top-0 z-30 rounded"}>

                <div className="font-bold">Edit profile</div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-grow justify-center items-center ">
                        <div className="flex flex-grow justify-center">
                            <img className="w-28 h-28 rounded-full" src={user?.image} alt=""/>
                        </div>
                        <div className="flex flex-grow items-end">
                            <div className="flex flex-col gap-2">
                                <div>Profile picture</div>
                                <input
                                    onBlur={() => validateImage(imageRef.current?.value, setImageError)}
                                    className="rounded bg-slate-50 border border-slate-400 p-2 text-xs w-64 outline-0"
                                    defaultValue={user?.image}
                                    ref={imageRef}
                                    type="url"/>
                                <div className="h-4">
                                    {imageError &&
                                        <div className="text-xs text-red-600">{imageError}</div>
                                    }
                                </div>
                                <div>Bio</div>
                                <input
                                    onBlur={() => validateBio(bioRef.current?.value, setBioError)}
                                    className="rounded bg-slate-50 border border-slate-400 p-2 text-xs w-64 outline-0"
                                    ref={bioRef}
                                    defaultValue={user?.bio || ''}
                                    type="text"/>
                                <div className="h-5">
                                    {bioError &&
                                        <div className="text-xs text-red-600">{bioError}</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="text-center">Change password</div>


                    <div className="flex flex-col gap-2">
                        <div className="flex gap-8">
                            <div className="flex-1 text-right">Current password</div>
                            <input
                                onBlur={() => validatePassword(passwordRef.current?.value, setPasswordError)}
                                className="rounded flex-1 bg-slate-50 border border-slate-400 p-2 text-xs w-64 outline-0"
                                ref={passwordRef}
                                type="password"/>
                            <div className="h-5">
                                {passwordError &&
                                    <div className="text-xs text-red-600">{passwordError}</div>
                                }
                            </div>
                        </div>

                        <div className="flex gap-8">
                            <div className="flex-1 text-right">New password</div>
                            <input
                                onBlur={() => validatePassword(newPasswordRef.current?.value, setNewPasswordError)}
                                className="rounded flex-1 bg-slate-50 border border-slate-400 p-2 text-xs w-64 outline-0"
                                ref={newPasswordRef}
                                type="password"/>
                            <div className="h-5">
                                {newPasswordError &&
                                    <div className="text-xs text-red-600">{newPasswordError}</div>
                                }
                            </div>
                        </div>
                    </div>

                </div>
                <div className="h-5">
                    {successMessage &&
                        <div className="text-xs text-green-600">{successMessage}</div>
                    }
                </div>
                <button
                    onClick={updateProfile}
                    className="bg-slate-200 px-3 py-1 rounded hover:bg-slate-300 flex justify-center items-center gap-2">Save
                    changes
                </button>

            </div>
        </div>
    );
};

export default ProfileUpdateModal;
