import CommentSingle from "./CommentSingle.tsx";
import Comment from "./Comment.tsx";
import {useAppSelector} from "../hooks.tsx";

// type Props = {
//     post: Post
// }
const Comments = () => {

    const post = useAppSelector(state => state.posts.singlePost)


    console.log('post', post)

    return (
        <div className="flex flex-col bg-slate-200 rounded h-[25rem]">
            <Comment/>
            <div className="overflow-y-auto custom-scrollbar rounded">
                {post?.comments && post?.comments.map((comment, i) => (
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
