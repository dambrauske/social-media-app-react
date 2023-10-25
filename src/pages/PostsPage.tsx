import Navbar from "../components/Navbar.tsx";
import AllPosts from "../components/posts/AllPosts.tsx";
import {useState, MouseEvent} from "react";
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
                className="flex gap-2 items-center bg-slate-100 border hover:bg-slate-200 px-3 py-1 rounded">
                    <i className="fas fa-edit text-slate-700"></i>
                    <div>Create post</div>
                </button>
                <AllPosts/>
            </div>


        </div>
    );
};

export default PostsPage;
