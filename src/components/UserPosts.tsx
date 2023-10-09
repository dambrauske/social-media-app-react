import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import {getUserPosts, Post} from "../features/userSlice.tsx";
import PostCard from "./PostCard.tsx";
import {useEffect} from "react";

const UserPosts = () => {

    const dispatch = useAppDispatch()
    const userPosts = useAppSelector(state => state.user.userPosts)
    const username = useAppSelector(state => state.user.username)
    const token = useAppSelector(state => state.user.token)


    useEffect(() => {
        dispatch(getUserPosts({token, username}))
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
