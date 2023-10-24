import Navbar from "../components/Navbar.tsx";
import AllPosts from "../components/posts/AllPosts.tsx";
import AddNewPost from "../components/posts/AddNewPost.tsx";
import {useState, MouseEvent } from "react";
import PostSettingsModal from "../components/modals/PostSettingsModal.tsx";
import CreatePostModal from "../components/modals/CreatePostModal.tsx";

const PostsPage = () => {

    const [showCreatePostModal, setShowCreatePostModal] = useState<boolean>(false)

    const showCreatePost = (e: MouseEvent<HTMLButtonElement>) => {
        setShowCreatePostModal(!showCreatePostModal)
        e.stopPropagation()
    }

    return (
        <div>
            <Navbar/>
            {
                showCreatePostModal &&
                <CreatePostModal
                    setShowCreatePostModal={setShowCreatePostModal}
                />
            }
            <div className="p-4 bg-slate-50 flex flex-col items-center justify-center">
                <button
                onClick={(e) => showCreatePost(e)}
                >Add post</button>
                <AllPosts/>
            </div>


        </div>
    );
};

export default PostsPage;
