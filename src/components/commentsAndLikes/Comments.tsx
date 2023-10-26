import SingleComment from "./SingleComment.tsx";
import Comment from "./Comment.tsx";
import {useAppSelector} from "../../hooks.tsx";

const Comments = () => {

    const post = useAppSelector(state => state.posts.selectedPost)
    const postComments = post?.comments

    let commentsSortedByDate

    if (postComments) {
        commentsSortedByDate =  [...postComments].sort((objA, objB) => {
            return new Date(objB.createdAt!).getTime() - new Date(objA.createdAt!).getTime()
        })
    }

    return (
        <div className="flex flex-col bg-slate-200 rounded h-[25rem]">
            <Comment/>
            <div className="overflow-y-auto custom-scrollbar rounded">
                {commentsSortedByDate && commentsSortedByDate.map((comment) => (
                    <SingleComment
                        key={comment._id}
                        comment={comment}
                    />
                ))}
            </div>


        </div>
    );
};


export default Comments;
