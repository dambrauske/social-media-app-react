import SingleComment from "./SingleComment.tsx";
import Comment from "./Comment.tsx";
import {Post} from "../../interfaces.tsx";

type Props = {
    post?: Post
}
const Comments = ({post}: Props) => {

    const postComments = post?.comments
    let commentsSortedByDate

    if (postComments) {
        commentsSortedByDate =  [...postComments].sort((objA, objB) => {
            return new Date(objB.createdAt!).getTime() - new Date(objA.createdAt!).getTime()
        })
    }

    return (
        <div className="flex flex-col bg-slate-200 rounded h-[25rem]">
            <Comment
                postId={post?._id}/>
            <div className="overflow-y-auto custom-scrollbar rounded">
                {commentsSortedByDate && commentsSortedByDate.map((comment, i) => (
                    <SingleComment
                        key={i}
                        comment={comment}
                    />
                ))}
            </div>


        </div>
    );
};


export default Comments;
