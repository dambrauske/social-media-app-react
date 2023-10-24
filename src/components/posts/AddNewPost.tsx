import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import {setAllPosts, setUserPosts} from "../../features/postsSlice.tsx";
import socket from "../../socket.tsx";
import {Post, PostForm} from "../../interfaces.tsx";
import {useForm} from "react-hook-form";


const AddNewPost = () => {

    const [postSuccessMessage, setPostSuccessMessage] = useState<string | null>(null)
    const currentUserUsername = useAppSelector(state => state.user?.user?.username)
    const token = useAppSelector(state => state.user.token)
    const dispatch = useAppDispatch()


    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
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
        socket().on('sendAllPosts', (data: Post[]) => {
            console.log('sendAllPosts', data)
            dispatch(setAllPosts(data))
            const userPosts = data.filter(post => post.user.username === currentUserUsername)
            dispatch(setUserPosts(userPosts))
        })

        setPostSuccessMessage('Post added successfully')
        setTimeout(() => {
            setPostSuccessMessage(null)
        }, 1000)

        reset()

        return () => {
            socket().off('addPost')
            socket().off('sendAllPosts')
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-slate-200 p-2 rounded flex flex-col w-1/3 gap-2">
            <div>Create post</div>
            <textarea
                id="title"
                {...register("title")}
                className="outline-none rounded resize-none	custom-scrollbar p-1"
                maxLength={100}
                placeholder="title"/>
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
                        }
                    },
                })}
                className="outline-none rounded p-1"
                type="url"
                placeholder="image url"/>

            <div className="h-4">
                {errors.image &&
                    <div className="text-xs text-red-600">{errors.image.message as string}</div>
                }
                {postSuccessMessage &&
                    <div className="text-xs text-green-600">{postSuccessMessage}</div>
                }
            </div>
            <button
                type="submit"
                className="bg-slate-300 p-1 rounded">create post
            </button>
        </form>
    );
};

export default AddNewPost;
