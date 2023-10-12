import CommentSingle from "./CommentSingle.tsx";
import Comment from "./Comment.tsx";
import {useAppSelector} from "../hooks.tsx";


const Comments = () => {

    const comments = useAppSelector(state => state.posts.comments)
    console.log('comments', comments)


    return (
        <div className="flex flex-col bg-slate-200 rounded h-screen">
            <Comment/>
            <div className="overflow-y-auto custom-scrollbar rounded">
                {comments && comments.map((comment, i) => (
                    <CommentSingle
                        key={i}
                        comment={comment}
                    />
                ))}
            </div>


        </div>
    );
};


export default Comments;
