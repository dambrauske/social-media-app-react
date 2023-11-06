import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import {Post} from "../../interfaces.tsx";
import PostCard from "./PostCard.tsx";
import {useEffect} from "react";
import {setSelectedUserPosts} from "../../features/postsSlice.tsx";

const SelectedUserPosts = () => {
    const selectedUserPosts = useAppSelector(state => state.posts.selectedUserPosts)
    const selectedUser = useAppSelector(state => state.users.selectedUser)
    const allPosts = useAppSelector(state => state.posts.posts)
    const dispatch = useAppDispatch()


    let selectedUserPostsSortedByDate
    if (selectedUserPosts) {
        selectedUserPostsSortedByDate =  [...selectedUserPosts].sort((objA, objB) => {
            return new Date(objB.createdAt!).getTime() - new Date(objA.createdAt!).getTime()
        })
    }

    useEffect(() => {
       const updatedSelectedUserPosts = allPosts?.filter(p => p.user._id === selectedUser?._id)
        dispatch(setSelectedUserPosts(updatedSelectedUserPosts))
    }, [allPosts])

    return (

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {selectedUserPostsSortedByDate && selectedUserPostsSortedByDate.map((post: Post) => (
                <PostCard
                    key={post._id}
                    post={post}
                />
            ))}
        </div>
    );
};

export default SelectedUserPosts;
