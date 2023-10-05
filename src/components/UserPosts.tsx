import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import {useEffect} from "react";
import {Post, setUserPosts} from "../features/userSlice.tsx";
import PostCard from "./PostCard.tsx";

const UserPosts = () => {

    const dispatch = useAppDispatch()
    const userPosts = useAppSelector(state => state.user.userPosts)

    useEffect(() => {

        const options: RequestInit = {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            body: null,
        }

        const token = localStorage.getItem('token')

        if (token !== null) {
            options.headers = {
                ...options.headers,
                "authorization": token,
            }
        }

        fetch('http://localhost:8000/userPosts', options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch(setUserPosts(data.data))
            })

    }, [])


    return (
        <div className="flex flex-wrap gap-4">

            {userPosts && userPosts.map((post: Post, i: number) => (
                <PostCard
                key={i}
                post={post}
                />
            ))}

        </div>
    );
};

export default UserPosts;
