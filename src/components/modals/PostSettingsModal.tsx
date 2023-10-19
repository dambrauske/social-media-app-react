import {Post} from "../../features/userSlice.tsx";
import { MouseEvent } from "react";
import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import socket from "../../socket.tsx";
import {setAllPosts, setUserPosts} from "../../features/postsSlice.tsx";

type PostSettingsModalProps = {
    post: Post,
    setShowPostSettingsModal: (value: boolean) => void
};

const PostSettingsModal = ({ post, setShowPostSettingsModal }: PostSettingsModalProps) => {

    const username = useAppSelector(state => state.user?.user?.username)
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.user.token)

    const cancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setShowPostSettingsModal(false)
    }
    const deletePost = async (token: string | null, postId: string | null, e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        socket().emit('deletePost', ({token, postId}))
        socket().on('PostsUpdated', (data: Post[]) => {
            dispatch(setAllPosts(data))
            const userPosts = data.filter(post => post.user.username === username)
            console.log('userPosts',userPosts)
            dispatch(setUserPosts(userPosts))
        })
        setShowPostSettingsModal(false)
    }

    const update = () => {
        console.log('update clicked')
        // dispatch(setShowPostSettingsModal(true))
        setShowPostSettingsModal(false)
    }

    return (


            <div
                className="w-28 h-min bg-slate-100 rounded border flex flex-col border-slate-200 absolute top-5 right-5 text-xs z-50">

                <button
                    onClick={(e) => deletePost(token, post.id, e)}
                    className="hover:bg-slate-200 p-1">delete
                </button>

                {/*<button*/}
                {/*    onClick={update}*/}
                {/*    className="hover:bg-slate-200 p-1">edit*/}
                {/*</button>*/}

                <button
                    onClick={(e) => cancel(e)}
                    className="hover:bg-slate-200 p-1">cancel
                </button>
            </div>

    );
};

export default PostSettingsModal;
