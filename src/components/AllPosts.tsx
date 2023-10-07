import {useEffect} from "react";
import {Post, setUserPosts} from "../features/userSlice.tsx";
import {fetchAllPosts} from "../features/postsSlice.tsx";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import PostCard from "./PostCard.tsx";

const AllPosts = () => {

    const dispatch = useAppDispatch()
    const allPosts = useAppSelector(state => state.posts.posts)
    const currentUserUsername = useAppSelector(state => state.user.username)
    const token = useAppSelector(state => state.user.token)


    useEffect(() => {
        dispatch(fetchAllPosts(token))
        const userPosts: Post[] | undefined = allPosts?.filter(post => post.username === currentUserUsername)
        dispatch(setUserPosts(userPosts))
        console.log('user posts:', userPosts)

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
