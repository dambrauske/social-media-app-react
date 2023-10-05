import {useEffect} from "react";
import {Post} from "../features/userSlice.tsx";
import {setAllPosts} from "../features/postsSlice.tsx";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import PostCard from "./PostCard.tsx";

const AllPosts = () => {

    const dispatch = useAppDispatch()
    const allPosts = useAppSelector(state => state.posts.posts)


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

        fetch('http://localhost:8000/posts', options)
            .then(res => res.json())
            .then(data => {
                console.log('all posts', data)
                dispatch(setAllPosts(data.data))
            })

    }, [allPosts])



    return (
        <div className="p-4 flex flex-wrap gap-4 justify-center">

            {allPosts && allPosts.map((post: Post, i: number) => (
                <PostCard
                key={i}
                post={post}
                />
            ))}

        </div>
    );
};

export default AllPosts;
