import {useEffect, useState} from "react";
import {setAllPosts, setUserPosts} from "../../features/postsSlice.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import PostCard from "./PostCard.tsx";
import socket from "../../socket.tsx";
import {Post} from "../../interfaces.tsx";
import SortingPosts from "./SortingPosts.tsx";

const AllPosts = () => {

    const dispatch = useAppDispatch()
    const allPosts = useAppSelector(state => state.posts.posts)
    const token = useAppSelector(state => state.user.token)
    const username = useAppSelector(state => state.user?.user?.username)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {

        if (token === null) {
            throw new Error('Token not available')
        }

        socket().emit('getPosts', ({token}))
        socket().on('Posts', (data: Post[]) => {
            dispatch(setAllPosts(data))
            console.log('data from get posts', data)
            const userPosts = data.filter(post => post.user.username === username)
            dispatch(setUserPosts(userPosts))
            setIsLoading(false)
        })

        return () => {
            socket().off('getPosts')
            socket().off('Posts')
        }

    }, [])

    if (isLoading) return null

    return (
        <div className="flex items-center flex-col p-2">
            <SortingPosts/>
            <div className="p-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">

                {allPosts && allPosts.map((post: Post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                    />
                ))}
            </div>
        </div>


    );
};

export default AllPosts;
