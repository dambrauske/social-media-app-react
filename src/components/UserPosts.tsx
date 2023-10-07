import {useAppSelector} from "../hooks.tsx";
import {Post} from "../features/userSlice.tsx";
import PostCard from "./PostCard.tsx";

const UserPosts = () => {

    const userPosts = useAppSelector(state => state.user.userPosts)

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
