import {useAppSelector} from "../../hooks.tsx";
import PostCard from "./PostCard.tsx";
import {Post} from "../../interfaces.tsx";
import SortingPosts from "./SortingPosts.tsx";

const AllPosts = () => {

    const allPosts = useAppSelector(state => state.posts.posts)

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
