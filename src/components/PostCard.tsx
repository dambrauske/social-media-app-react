import {Post, setBio, setImage, setToken, setUsername, setUserPosts} from "../features/userSlice.tsx";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import {setAllPosts} from "../features/postsSlice.tsx";
import {useEffect, useState} from "react";
import LikesAndComments from "./LikesAndComments.tsx";

type Props = {
    post: Post
}

const PostCard = ({post}: Props) => {

    const dispatch = useAppDispatch()
    const username = useAppSelector(state => state.user.username)
    const [userImage, setUserImage] = useState(undefined)

    const deletePost = async (postId: string) => {

        const options: RequestInit = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({postId}),
        }

        const token = localStorage.getItem('token')

        if (token !== null) {
            options.headers = {
                ...options.headers,
                "authorization": token,
            }
        }


        try {
            const response = await fetch('http://localhost:8000/deletePost', options)
            const data = await response.json()
            console.log(data)
            dispatch(setUserPosts(data.data.userPosts))
            dispatch(setAllPosts(data.data.allPosts))

        } catch (error) {
            console.log(error)
        }

    }

    const updatePost = async (postId: string) => {

        const options: RequestInit = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({postId}),
        }

        const token = localStorage.getItem('token')

        if (token !== null) {
            options.headers = {
                ...options.headers,
                "authorization": token,
            }
        }


        try {
            const response = await fetch('http://localhost:8000/deletePost', options)
            const data = await response.json()
            console.log(data)
            dispatch(setUserPosts(data.data.userPosts))
            dispatch(setAllPosts(data.data.allPosts))

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        const userId = post.userId
        console.log('userId', userId)

        const options: RequestInit = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({userId}),
        }

        const token = localStorage.getItem('token')

        if (token !== null) {
            options.headers = {
                ...options.headers,
                "authorization": token,
            }
        }

        fetch('http://localhost:8000/getUser', options)
            .then(res => res.json())
            .then(data => {
                setUserImage(data.data.image)
            })

    }, [])


    return (
        <div className="flex flex-col p-2 rounded bg-white gap-2 w-96 relative">

            <div className="w-full h-60">
                <img className="w-full h-full object-cover rounded" src={post.image} alt=""/>
            </div>

            <div className="flex justify-between p-2">
                <div className="flex items-center gap-2">
                    <div className="w-12 h-12">
                        <img className="w-full h-full rounded-full" src={userImage} alt=""/>
                    </div>
                    <div className="font-bold text-xl">{post.username}:</div>
                </div>

                <LikesAndComments/>

            </div>

            <div className="p-2">{post.title}</div>


            {post.username === username ?
                <div
                    onClick={() => deletePost(post._id)}
                    className="absolute top-0 right-0 h-6 w-6 bg-slate-200  rounded-full flex justify-center items-center cursor-pointer">
                    <i className="fas fa-ellipsis-h"></i>
                </div>

                :

                null

            }

            {/*{post.username === username ?*/}
            {/*    <div*/}
            {/*        onClick={() => updatePost(post._id)}*/}
            {/*        className="absolute top-0 right-0 bg-red-300 h-5 w-5 flex justify-center items-center cursor-pointer">*/}
            {/*        <i className="far fa-trash-alt"></i>*/}
            {/*    </div>*/}

            {/*    :*/}

            {/*    null*/}

            {/*}*/}


        </div>
    );
};

export default PostCard;
