import {useEffect} from "react";
import {setAllPosts, setUserPosts} from "../../features/postsSlice.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import PostCard from "./PostCard.tsx";
import socket from "../../socket.tsx";
import {Post} from "../../interfaces.tsx";
import SortingPosts from "./SortingPosts.tsx";

const AllPosts = () => {

    const dispatch = useAppDispatch()
    const allPosts = useAppSelector(state => state.posts.posts)
    const username = useAppSelector(state => state.user?.user?.username)
    const token = useAppSelector(state => state.user.token)

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
        })

        return () => {
            socket().off('Posts')
        }

    }, [])


    return (
        <div className="flex items-center flex-col p-2">
            <SortingPosts/>
            <div className="p-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">

                {allPosts && allPosts.map((post: Post, i: number) => (
                    <PostCard
                        key={i}
                        post={post}
                    />
                ))}
            </div>
        </div>


    );
};

export default AllPosts;
