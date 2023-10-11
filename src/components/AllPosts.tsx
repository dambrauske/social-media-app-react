import {useEffect} from "react";
import {Post, setUserPosts} from "../features/userSlice.tsx";
import {setAllPosts} from "../features/postsSlice.tsx";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import PostCard from "./PostCard.tsx";
import socket from "../socket.tsx";

const AllPosts = () => {

    const dispatch = useAppDispatch()
    const allPosts = useAppSelector(state => state.posts.posts)
    const username = useAppSelector(state => state.user.username)
    const token = useAppSelector(state => state.user.token)

    useEffect(() => {
        if (token === null) {
            throw new Error('Token not available')
        }

        socket().emit('fetchPosts', ({token}))
        socket().on('fetchedPosts', (data: Post[]) => {
            console.log('fetchedPosts', data)
            dispatch(setAllPosts(data))
            const userPosts = data.filter(post => post.username === username)
            dispatch(setUserPosts(userPosts))
        })
    }, [])


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
