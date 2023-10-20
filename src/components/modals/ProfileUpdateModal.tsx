import UpdateImage from "../userProfileUpdates/UpdateImage.tsx";
import UpdatePassword from "../userProfileUpdates/UpdatePassword.tsx";
import UpdateBio from "../userProfileUpdates/UpdateBio.tsx";
import {useAppSelector} from "../../hooks.tsx";
import {validateBio, validateImage, validatePassword} from "../../helperFunctions.tsx";
import {RefObject, useRef, useState} from "react";

const ProfileUpdateModal = () => {

    const user = useAppSelector(state => state.user.user)
    const imageRef: RefObject<HTMLInputElement> = useRef(null)
    const bioRef: RefObject<HTMLInputElement> = useRef(null)
    const passwordRef: RefObject<HTMLInputElement> = useRef(null)
    const newPasswordRef: RefObject<HTMLInputElement> = useRef(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)


    const updateProfile = () => {

    }

    return (
        <div className={"relative flex justify-center items-center"}>
            <div
                className={"fixed top-0 left-0 right-0 w-screen h-screen backdrop-blur-sm bg-black bg-opacity-50 z-20"}></div>

            <div className={"bg-slate-50 w-[35rem] p-4 flex flex-col gap-4 absolute top-0 z-30 rounded"}>

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
                                    // onBlur={() => validateImage(imageRef.current?.value, setErrorMessage)}
                                    className="rounded bg-slate-50 border border-slate-400 p-2 text-xs w-64 outline-0"
                                    defaultValue ={user?.image}
                                    ref={imageRef}
                                    type="url"/>
                                <div>Bio</div>
                                <input
                                    // onBlur={() => validateBio(bioRef.current?.value, setBioError)}
                                    className="rounded bg-slate-50 border border-slate-400 p-2 text-xs w-64 outline-0"
                                    ref={bioRef}
                                    defaultValue ={user?.bio || ''}
                                    type="text"/>
                            </div>
                        </div>
                    </div>


                    <div className="text-center mt-6">Change password</div>


                    <div className="flex flex-col gap-2">
                        <div className="flex gap-8">
                            <div className="flex-1 text-right">Current password</div>
                            <input
                                // onBlur={() => validatePassword(passwordRef.current?.value, setPasswordError)}
                                className="rounded flex-1 bg-slate-50 border border-slate-400 p-2 text-xs w-64 outline-0"
                                ref={passwordRef}
                                type="password"/>
                            <div className="h-5">
                                {/*{passwordError &&*/}
                                {/*    <div className="text-xs text-red-600">{passwordError}</div>*/}
                                {/*}*/}
                            </div>
                        </div>

                        <div className="flex gap-8">
                            <div className="flex-1 text-right">New password</div>
                            <input
                                // onBlur={() => validatePassword(newPasswordRef.current?.value, setNewPasswordError)}
                                className="rounded flex-1 bg-slate-50 border border-slate-400 p-2 text-xs w-64 outline-0"
                                ref={newPasswordRef}
                                type="password"/>
                            <div className="h-5">

                                {/*{newPasswordError &&*/}
                                {/*    <div className="text-xs text-red-600">{newPasswordError}</div>*/}
                                {/*}*/}

                                {/*{passwordSuccessMessage &&*/}
                                {/*    <div className="text-xs text-green-600">{passwordSuccessMessage}\</div>*/}

                                {/*}*/}
                            </div>

                        </div>

                    </div>

                </div>
                <div className="h-5">
                    {errorMessage &&
                        <div className="text-xs text-red-600">{errorMessage}</div>
                    }

                    {successMessage &&
                        <div className="text-xs text-green-600">{successMessage}</div>
                    }
                </div>
                <button className="bg-slate-200 px-3 py-1 rounded hover:bg-slate-300 flex justify-center items-center gap-2">Save changes</button>

            </div>
        </div>
    );
};

export default ProfileUpdateModal;
