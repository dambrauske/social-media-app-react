import {validateImage, validateTitle} from "../helperFunctions.tsx";
import {RefObject, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import {Post, setUserPosts} from "../features/userSlice.tsx";
import {addPost, setAllPosts} from "../features/postsSlice.tsx";
import socket from "../socket.tsx";

const AddNewPost = () => {

    const titleRef: RefObject<HTMLInputElement> = useRef(null)
    const imageRef: RefObject<HTMLInputElement> = useRef(null)
    const [imageError, setImageError] = useState<string | null>(null);
    const [titleError, setTitleError] = useState<string | null>(null);
    const [postSuccessMessage, setPostSuccessMessage] = useState<string | null>(null)
    const dispatch = useAppDispatch()
    const allPosts = useAppSelector(state => state.posts.posts)
    const currentUserUsername = useAppSelector(state => state.user.username)
    const token = useAppSelector(state => state.user.token)

    const createPost = async (token: string | null,image: string | null, title: string | null) => {

        setPostSuccessMessage(null)

        if (token === null) {
            throw new Error('Token not available')
        }

        socket().emit('addPost', ({token, image, title}))
        socket().on('sendAllPosts', (data: Post[]) => {
            console.log('sendAllPosts', data)
            dispatch(setAllPosts(data))
            const userPosts = data.filter(post => post.username === currentUserUsername)
            dispatch(setUserPosts(userPosts))
        })

        setPostSuccessMessage('Post added successfully')
        setTimeout(() => {
            setPostSuccessMessage(null)
        }, 1000)


        if (imageRef.current) {
            imageRef.current.value = ''
        }
        if (titleRef.current) {
            titleRef.current.value = ''
        }
    }

    return (
        <div className="bg-slate-200 p-2 rounded flex flex-col w-1/3 gap-2">
            <div>Create post</div>
            <input
                ref={titleRef}
                onBlur={() => validateTitle(titleRef.current?.value, setTitleError)}
                type="text" placeholder="title"/>

            <div className="h-4">
                {titleError &&
                    <div className="text-xs text-red-600">{titleError}</div>
                }

            </div>
            <input
                ref={imageRef}
                onBlur={() => validateImage(imageRef.current?.value, setImageError)}
                type="url" placeholder="image"/>

            <div className="h-4">
                {imageError &&
                    <div className="text-xs text-red-600">{imageError}</div>
                }
                {postSuccessMessage &&
                    <div className="text-xs text-green-600">{postSuccessMessage}</div>
                }

            </div>
            <button
                onClick={() => createPost(token, imageRef.current?.value ?? null, titleRef.current?.value ?? null)}
                className="bg-slate-300 p-1">create post
            </button>
        </div>
    );
};

export default AddNewPost;
