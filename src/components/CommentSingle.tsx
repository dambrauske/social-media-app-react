import {Comment} from "../features/postsSlice.tsx";


type Props = {
    comment: Comment,
}

const CommentSingle = ({comment} : Props ) => {


    return (
        <div className="p-2 flex gap-2 rounded">
            <div className="w-10 h-10">
                <img className="w-full h-full rounded-full" src={comment.user.image} alt=""/>
            </div>

            <div className="flex flex-col">
                <div>{comment.username}</div>
                <div>{comment.comment}</div>
            </div>

        </div>
    );
};

export default CommentSingle;
