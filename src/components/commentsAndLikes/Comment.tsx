import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import {updateSinglePost} from "../../features/postsSlice.tsx";
import socket from "../../socket.tsx";
import {useForm} from 'react-hook-form';
import {CommentForm} from "../../interfaces.tsx";

type Props = {
    postId: string | undefined
}
const Comment = ({postId}: Props) => {

    const user = useAppSelector(state => state.user.user)
    const token = useAppSelector(state => state.user.token)
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<CommentForm>()

    const onSubmit = async (data: CommentForm) => {
        const comment = data.comment

        if (token === null) {
            throw new Error('Token not available')
        }

        if (comment !== '') {
            socket().emit('addComment', ({token, postId, comment}))
            socket().on('post', (data) => {
                dispatch(updateSinglePost(data))
            })
            reset()
        }

        return () => {
            socket().off('addComment')
            socket().off('post')
        }
    }

    return (
        <div className="px-2 py-6 flex flex-col justify-center items-center rounded bg-slate-100">
            <div className="flex gap-2">
                <div className="w-10 h-10">
                    <img className="w-full h-full object-cover rounded-full" src={user?.image} alt=""/>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex">
                <textarea
                    id="comment"
                    {...register("comment")}
                    className="w-full p-2 border rounded-lg focus:outline-none resize-none custom-scrollbar"
                    placeholder="Write a comment..."
                    minLength={3}
                    maxLength={600}
                    rows={2}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            handleSubmit(onSubmit)()
                        }
                    }}
                />
                    <button
                        type="submit"
                        className="flex items-end justify-end cursor-pointer">
                        <div
                            className="flex p-1 w-6 h-6 justify-center items-center rounded-full hover:bg-slate-100 hover:text-slate-50">
                            <i className="far fa-paper-plane text-slate-400"></i>
                        </div>
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Comment;
