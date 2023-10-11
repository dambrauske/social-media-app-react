import CommentSingle from "./CommentSingle.tsx";
import Comment from "./Comment.tsx";
import {useAppSelector} from "../hooks.tsx";


const Comments = () => {

    const comments = useAppSelector(state => state.posts.comments)


    return (
        <div className="flex flex-col bg-slate-200">
            <Comment/>
            {comments && comments.map((comment, i) => (
                <CommentSingle
                key={i}
                comment={comment}
                />
            ))}

        </div>
    );
};


export default Comments;
