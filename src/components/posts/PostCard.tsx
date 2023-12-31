import {useAppSelector} from "../../hooks.tsx";
import {MouseEvent, useState} from "react";
import LikesAndComments from "../commentsAndLikes/LikesAndComments.tsx";
import PostSettingsModal from "../modals/PostSettingsModal.tsx";
import {useNavigate} from "react-router-dom";
import {Post} from "../../interfaces.tsx";
import {formatDateFromTimestamp} from "../../helperFunctions.tsx";

type Props = {
    post: Post
}
const PostCard = ({post}: Props) => {

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
            className="flex flex-col p-2 rounded bg-white gap-2 relative lg:w-72 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="w-full h-60">
                <img className="w-full h-full object-cover rounded" src={post.image} alt=""/>
            </div>

            <div className="flex justify-between p-2">
                <div className="flex items-center gap-2">
                    <div className="w-12 h-12">
                        <img className="w-full h-full object-cover rounded-full" src={post.user.image} alt=""/>
                    </div>
                    <div>
                        <div className="font-bold text-xl">{post.user.username}:</div>
                        <div className="text-xs text-slate-400 mr-1">{formatDateFromTimestamp(post.createdAt)}</div>
                    </div>
                </div>
                <LikesAndComments
                    post={post}
                />
            </div>

            <div className="w-full overflow-hidden">
                <div className="p-2 break-words">{post.title}</div>
            </div>


            {post.user.username === username ?
                <div
                    onClick={(e) => showPostSettings(e)}
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
