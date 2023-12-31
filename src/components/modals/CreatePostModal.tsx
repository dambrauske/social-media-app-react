import {useState} from "react";
import {useAppSelector} from "../../hooks.tsx";
import {useForm} from "react-hook-form";
import {PostForm} from "../../interfaces.tsx";
import socket from "../../socket.tsx";

type Props = {
    setShowCreatePostModal: (value: boolean) => void
}
const CreatePostModal = ({setShowCreatePostModal}: Props) => {

    const [postSuccessMessage, setPostSuccessMessage] = useState<string | null>(null)
    const token = useAppSelector(state => state.user.token)


    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<PostForm>({
        mode: "onChange"
    })

    const onSubmit = async (data: PostForm) => {

        setPostSuccessMessage(null)

        const image = data.image
        const title = data.title

        if (token === null) {
            throw new Error('Token not available')
        }

        socket().emit('addPost', ({token, image, title}))
        setPostSuccessMessage('Post added successfully')
        setTimeout(() => {
            setPostSuccessMessage(null)
            setShowCreatePostModal(false)
        }, 1000)
        reset()


        return () => {
            socket().off('addPost')
        }
    }


    return (
        <div className={"relative flex justify-center"}>
            <div
                className={"fixed top-0 left-0 right-0 w-screen h-screen backdrop-blur-sm bg-black bg-opacity-50 z-20"}></div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-slate-50 top-0 p-4 rounded flex flex-col gap-4 absolute z-30 w-1/3">
                <div
                    onClick={() => setShowCreatePostModal(false)}
                    className={"absolute top-0 right-0 w-8 h-8 flex justify-center items-center rounded hover:bg-slate-300 cursor-pointer"}>
                    <i className="fas fa-times text-xl"></i>
                </div>
                <div>Create post</div>
                <div className="flex flex-col">
                    <input
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
                                } else return "Image url cannot be blank"
                            },
                        })}

                        className="outline-none border rounded p-1"
                        type="url"
                        placeholder="image url"/>

                    <div className="h-4">
                        {errors.image &&
                            <div className="text-xs text-red-600">{errors.image.message as string}</div>
                        }
                    </div>

                    <input
                        id="title"
                        {...register("title", {
                            validate: (value) => {
                                if (value) {
                                    if (value.length < 3 || value.length > 100) {
                                        return "Title should be between 3 and 100 characters"
                                    }
                                } else return "Title cannot be blank"
                            },
                        })}
                        className="outline-none border rounded resize-none	custom-scrollbar p-1"
                        maxLength={100}
                        minLength={3}
                        placeholder="title"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                handleSubmit(onSubmit)()
                            }
                        }}
                    />
                    <div className="h-4">
                        {errors.title &&
                            <div className="text-xs text-red-600">{errors.title.message as string}</div>
                        }
                    </div>


                    <div className="h-4">
                        {postSuccessMessage &&
                            <div className="text-xs text-green-600">{postSuccessMessage}</div>
                        }
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-slate-200 hover:bg-slate-300 p-1 rounded">create post
                </button>
            </form>

        </div>
    );
};

export default CreatePostModal;
