import {useAppSelector} from "../../hooks.tsx";
import PostCard from "./PostCard.tsx";
import {Post} from "../../interfaces.tsx";


const UserPosts = () => {

    const userPosts = useAppSelector(state => state.posts.userPosts)

    return (

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
