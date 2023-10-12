import {Post} from "../features/userSlice.tsx";
import {useAppSelector} from "../hooks.tsx";
import {MouseEvent, useState} from "react";
import LikesAndComments from "./LikesAndComments.tsx";
import PostSettingsModal from "./PostSettingsModal.tsx";
import {useNavigate} from "react-router-dom";

type Props = {
    post: Post
}

const PostCard = ({ post }: Props) => {

    const username = useAppSelector(state => state.user?.user?.username)
    const [showPostSettingsModal, setShowPostSettingsModal] = useState<boolean>(false)
    const navigate = useNavigate()

    const showPostSettings = (e: MouseEvent<HTMLDivElement>) => {
        setShowPostSettingsModal(!showPostSettingsModal)
        e.stopPropagation()
    }

    return (

        <div
            onClick={() => navigate(`/post/${post._id}`)}
            className="flex flex-col p-2 rounded bg-white gap-2 w-96 relative">
            <div className="w-full h-60">
                <img className="w-full h-full object-cover rounded" src={post.image} alt=""/>
            </div>

            <div className="flex justify-between p-2">
                <div className="flex items-center gap-2">
                    <div className="w-12 h-12">
                        <img className="w-full h-full rounded-full" src={post.user.image} alt=""/>
                    </div>
                    <div className="font-bold text-xl">{post.user.username}:</div>
                </div>
                <LikesAndComments
                post={post}
                />
            </div>

            <div className="p-2">{post.title}</div>

            {post.user.username === username ?
                <div
                    onClick={(e)=> showPostSettings(e)}
                    className="absolute top-0 right-0 h-6 w-6 bg-slate-200  rounded-full flex justify-center items-center cursor-pointer">
                    <i className="fas fa-ellipsis-h"></i>
                </div>
                :
                null
            }

            {
                showPostSettingsModal &&
                <PostSettingsModal
                    post={post}
                    setShowPostSettingsModal={setShowPostSettingsModal}
                />
            }

        </div>
    );
};

export default PostCard;
