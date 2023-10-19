import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import {RefObject,  useRef} from "react";
import {setSelectedPost} from "../../features/postsSlice.tsx";
import socket from "../../socket.tsx";

const Comment = () => {

    const token = useAppSelector(state => state.user.token)
    const user = useAppSelector(state => state.user.user)
    const postId = useAppSelector(state => state.posts?.selectedPost?._id)
    const commentRef: RefObject<HTMLTextAreaElement> = useRef(null)
    const dispatch = useAppDispatch()


    const comment = () => {
        console.log('comment clicked')

        const text: string | undefined = commentRef.current?.value
        if (text && text.length > 0) {

            if (token === null) {
                throw new Error('Token not available')
            }
            socket().emit('addComment', ({token, postId, text}))

            socket().on('post', (data) => {
                console.log('post', data)
                dispatch(setSelectedPost(data))
            })

        }

        if (commentRef.current) {
            commentRef.current.value = ''
        }

        return () => {
            socket().off('postComments')
            socket().off('fetchedSinglePost')
        }


    }



    return (
        <div className="p-2 flex gap-2 rounded bg-slate-100">
            <div className="w-10 h-10">
                <img className="w-full h-full rounded-full" src={user?.image} alt=""/>
            </div>

            <div className="flex">
                <textarea
                    ref={commentRef}
                    className="w-full p-2 border rounded-lg focus:outline-none resize-none custom-scrollbar"
                    placeholder="Write a comment..."
                    rows={2}
                />
                <div
                    onClick={comment}
                    className="flex items-end justify-end cursor-pointer">
                    <div
                        className="flex p-1 w-6 h-6 justify-center items-center rounded-full hover:bg-slate-100 hover:text-slate-50">
                        <i className="far fa-paper-plane text-slate-400"></i>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Comment;
