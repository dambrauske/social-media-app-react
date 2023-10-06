import {useEffect} from "react";
import {Post} from "../features/userSlice.tsx";
import {fetchAllPosts} from "../features/postsSlice.tsx";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import PostCard from "./PostCard.tsx";

const AllPosts = () => {

    const dispatch = useAppDispatch()
    const allPosts = useAppSelector(state => state.posts.posts)
    const token = useAppSelector(state => state.user.token)


    useEffect(() => {

        dispatch(fetchAllPosts(token))
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
