import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import PostCard from "./PostCard.tsx";
import {Post} from "../../interfaces.tsx";
import {useEffect, useState} from "react";
import socket from "../../socket.tsx";
import {setUserPosts} from "../../features/postsSlice.tsx";

const UserPosts = () => {

    const userPosts = useAppSelector(state => state.posts.userPosts)
    const dispatch = useAppDispatch()
    const username = useAppSelector(state => state.user?.user?.username)
    const token = useAppSelector(state => state.user.token)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {

        if (token === null) {
            throw new Error('Token not available')
        }

        dispatch(setUserPosts(undefined))

        socket().emit('getPosts', ({token}))
        socket().on('Posts', (data: Post[]) => {
            const userPosts = data.filter(post => post.user.username === username)
            console.log('userPosts',userPosts)
            dispatch(setUserPosts(userPosts))
            setIsLoading(false)
        })

        return () => {
            socket().off('Posts')
        }

    }, [])

    if (isLoading) return null

    return (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
            {userPosts && userPosts.map((post: Post) => (
                <PostCard
                key={post._id}
                post={post}
                />
            ))}

        </div>
    );
};

export default UserPosts;
