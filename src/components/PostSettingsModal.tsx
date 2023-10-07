import {Post} from "../features/userSlice.tsx";
import { MouseEvent } from "react";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import {deleteSinglePost} from "../features/postsSlice.tsx";

type PostSettingsModalProps = {
    post: Post,
    setShowPostSettingsModal: (value: boolean) => void
};

const PostSettingsModal = ({ post, setShowPostSettingsModal }: PostSettingsModalProps) => {

    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.user.token)

    const cancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setShowPostSettingsModal(false)
    }
    const deletePost = async (token: string | null, postId: string | null, e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(deleteSinglePost({token, postId}))
    }

    // const update = () => {
    //     console.log('update clicked')
    //     dispatch(setPostUpdateModal(true))
    //     setShowPostSettingsModal(false)
    // }

    return (


            <div
                className="w-28 h-min bg-slate-100 rounded border flex flex-col border-slate-200 absolute top-5 right-5 text-xs z-50">

                <button
                    onClick={(e) => deletePost(token, post._id, e)}
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
