import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import {useState} from "react";
import {useForm} from 'react-hook-form';
import {UpdateProfileForm} from "../../interfaces.tsx";
import {updateUserPublicProfile} from "../../features/userSlice.tsx";

interface Props {
    setShowProfileSettingsModal: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const ProfileUpdateModal = ({setShowProfileSettingsModal}: Props) => {

        const user = useAppSelector(state => state.user.user)
        const [successMessage, setSuccessMessage] = useState<string | null>(null)
        const token = useAppSelector(state => state.user.token)
        const dispatch = useAppDispatch()

        console.log('user', user)

        const {
            register,
            handleSubmit,
            formState: {errors}
        } = useForm({
            mode: "onChange",
            defaultValues: {
                image: user?.image === 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' ? '' : user?.image,
                bio: user?.bio || '',
                password: '',
                newPassword: '',
            }
        })

        console.log('errors', errors)

        const onSubmit = async (data: UpdateProfileForm) => {
            setSuccessMessage(null)

            const image = data.image
            const bio = data.bio
            const password = data.password
            const newPassword = data.newPassword

            console.log('bio', bio)

            dispatch(updateUserPublicProfile({token, image, bio}))

            if (password !== '' && newPassword !== '') {
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
            }

            setSuccessMessage('Profile updated successfully')

            setTimeout(() => {
                setSuccessMessage(null)
            }, 1000)

            setTimeout(() => {
                setShowProfileSettingsModal(false)
            }, 1000)
        }


        return (
            <div className={"relative flex justify-center items-center"}>

                <div
                    className={"fixed top-0 left-0 right-0 w-screen h-screen backdrop-blur-sm bg-black bg-opacity-50 z-20"}></div>

                <div className={"bg-slate-50 w-[30rem] p-4 flex flex-col gap-2 absolute top-0 z-30 rounded"}>
                    <div
                        onClick={() => setShowProfileSettingsModal(false)}
                        className={"absolute top-0 right-0 w-8 h-8 flex justify-center items-center rounded hover:bg-slate-200 cursor-pointer hover:border-0"}>
                        <i className="fas fa-times text-xl"></i>
                    </div>

                    <div className="font-bold">Edit profile</div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4">
                        <div className="flex justify-center items-center">
                            <div className="flex flex-1 justify-center">
                                <img className="w-32 h-32 rounded-full object-cover" src={user?.image} alt=""/>
                            </div>
                            <div className="flex">
                                <div className="flex flex-col gap-2 flex-grow">
                                    <label>Profile picture</label>
                                    <input
                                        className="rounded bg-slate-50 border border-slate-400 p-2 text-xs w-64 outline-0"
                                        id="image"
                                        {...register("image", {
                                            validate: (value) => {
                                                if (value) {
                                                    try {
                                                        new URL(value)
                                                        return true
                                                    } catch (err) {
                                                        return "Image url is not valid"
                                                    }
                                                }
                                            }
                                        })}
                                        type="url"/>
                                    <div className="h-4">
                                        {errors.image && (
                                            <div className="text-xs text-red-600">{errors.image.message as string}</div>
                                        )}
                                    </div>
                                    <label>Bio</label>
                                    <textarea
                                        className="rounded bg-slate-50 border border-slate-400 p-2 text-xs outline-0 w-full"
                                        id="bio"
                                        {...register("bio", {
                                            maxLength: {
                                                value: 150,
                                                message: "Bio cannot be longer than 150 characters"
                                            }
                                        })}
                                        maxLength={150}
                                    />
                                    <div className="h-4">
                                        {errors.bio && (
                                            <div className="text-xs text-red-600">{errors.bio.message as string}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">Change password</div>

                        <div className="flex flex-col gap-2">
                            <div className="flex gap-8">
                                <label className="flex-1 text-right">Current password</label>
                                <div className="flex flex-1 flex-col">
                                    <input
                                        className="rounded flex-1 bg-slate-50 border border-slate-400 p-2 text-xs w-64 outline-0"
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
                                        type="password"/>
                                    <div className="h-6">
                                        {errors.password && (
                                            <div className="text-xs text-red-600">{errors.password.message as string}</div>
                                        )}
                                    </div>
                                </div>

                            </div>

                            <div className="flex gap-8">
                                <label className="flex-1  text-right">New password</label>
                                <div className="flex-1 flex-col">
                                    <input
                                        className="rounded  bg-slate-50 border border-slate-400 p-2 text-xs w-64 outline-0"
                                        id="newPassword"
                                        {...register("newPassword", {
                                            validate: (value, allValues) => {
                                                const password = allValues.password

                                                if ((!value && !password) || (value && password)) {
                                                    if (value) {
                                                        if (value.length < 4 || value.length > 20) {
                                                            return "Password should be between 4 and 20 characters";
                                                        }
                                                        if (!/[A-Z]/.test(value)) {
                                                            return "Password should include at least one uppercase letter"
                                                        } else return true
                                                    }
                                                }
                                            },
                                        })}
                                        type="password"/>
                                    <div className="h-6">
                                        {errors.newPassword && (
                                            <div
                                                className="text-xs text-red-600">{errors.newPassword.message as string}</div>
                                        )}
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
                            type="submit"
                            className="bg-slate-200 px-3 py-1 rounded hover:bg-slate-300 flex justify-center items-center gap-2">Save
                            changes
                        </button>
                    </form>

                </div>
            </div>
        );
    }
;

export default ProfileUpdateModal;
