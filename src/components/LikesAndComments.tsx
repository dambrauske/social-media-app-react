import {Post} from "../interfaces.tsx";
import {useNavigate} from "react-router-dom";
import {MouseEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import socket from "../socket.tsx";
import {updateSinglePost} from "../features/postsSlice.tsx";

type Props = {
    post: Post
}

const LikesAndComments = ({post}: Props) => {

    const navigate = useNavigate()
    const token = useAppSelector(state => state.user.token)
    const userId = useAppSelector(state => state.user?.user?.id)
    const dispatch = useAppDispatch()


    const likePost = (token: string | null, postId: string | null, e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        console.log('like post clicked')
        socket().emit('likePost', ({token, postId}))
    }

    useEffect(() => {
        socket().on('updatedPost', (data) => {
            console.log('updatedPost', data)
            dispatch(updateSinglePost(data))
        })
        return () => {
            socket().off('updatedPost')
        }
    }, [])


    const isPostLikedByUser = () => {
        return post?.likes.some(like => like.user === userId);

    }

    return (
        <div className="flex items-center gap-6 text-slate-500">

            <div
                onClick={(e) => likePost(token, post._id, e)}
                className="flex items-center gap-2">
                {
                    isPostLikedByUser() ?

                        <i className="fas fa-heart cursor-pointer"></i>
                        :
                        <i className="far fa-heart cursor-pointer"></i>

                }


                {post?.likes && post.likes.length > 0 ?
                    <div>{post.likes.length}</div>
                    :
                    <div>0</div>}
            </div>

            <div
                onClick={() => navigate(`/post/${post._id}`)}
                className="flex items-center gap-2">
                <i className="far fa-comment-dots"></i>
                {post?.comments && post.comments.length > 0 ?
                    <div>{post.comments.length}</div>
                    :
                    <div>0</div>}
            </div>

        </div>
    );
};

export default LikesAndComments;
