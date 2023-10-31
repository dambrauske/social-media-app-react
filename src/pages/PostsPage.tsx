import Navbar from "../components/Navbar.tsx";
import AllPosts from "../components/posts/AllPosts.tsx";
import {useState, MouseEvent, useEffect} from "react";
import CreatePostModal from "../components/modals/CreatePostModal.tsx";
import {useAppSelector} from "../hooks.tsx";
import socket from "../socket.tsx";

const PostsPage = () => {

    const [showCreatePostModal, setShowCreatePostModal] = useState<boolean>(false)
    const token = useAppSelector(state => state.user.token)

    const showCreatePost = (e: MouseEvent<HTMLButtonElement>) => {
        setShowCreatePostModal(!showCreatePostModal)
        e.stopPropagation()
    }

    useEffect(() => {

        if (token === null) {
            throw new Error('Token not available')
        }
        socket().emit('getPosts', ({token}))

        return () => {
            socket().off('getPosts')
        }

    }, [])

    return (
        <div>
            <Navbar/>
            {
                showCreatePostModal &&
                <CreatePostModal
                    setShowCreatePostModal={setShowCreatePostModal}
                />
            }
            <div className="p-4 bg-slate-50 flex flex-col items-center justify-center min-h-screen">
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
