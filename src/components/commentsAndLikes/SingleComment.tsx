import {Comment} from "../../interfaces.tsx";
import {formatDateFromTimestamp} from "../../helperFunctions.tsx";


type Props = {
    comment: Comment,
}

const SingleComment = ({comment} : Props ) => {

    console.log('comment', comment)

    return (
            <div className="gap-1 p-1 flex border w-full">

                <div className="w-1/6 flex justify-center">
                    <img className="w-10 h-10 rounded-full object-cover" src={comment.user.image} alt=""/>
                </div>

                <div className="w-5/6 flex flex-col">

                    <div className="bg-slate-300 rounded-2xl p-2">
                        <div className="text-xs font-bold tracking-wider">
                            {comment.user.username}
                        </div>
                        <div className="w-full overflow-hidden">
                            <div className="text-sm break-words">
                                {comment.comment}
                            </div>
                        </div>
                    </div>
                    <div className="text-xs text-slate-500 text-right">{formatDateFromTimestamp(comment.createdAt)}</div>
                </div>


            </div>

    );
};

export default SingleComment;
