import {Message} from "../../interfaces.tsx";
import {formatDateFromTimestamp} from "../../helperFunctions.tsx";
import {useAppSelector} from "../../hooks.tsx";

type Props = {
    message: Message,
}
const SingleMessage = ({message}: Props) => {

    const userId = useAppSelector(state => state.user.user?._id)

    return (
        <div className={`flex content-start gap-1 mb-2 p-3 ${message.sentBy._id === userId ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="shrink-0 basis-10">
                <img className="w-10 h-10 rounded-full object-cover" src={message.sentBy.image} alt=""/>
            </div>
            <div className="flex flex-col grow-0 max-w-[50%] relative">
                <div className={`rounded-xl p-2 ${message.sentBy._id === userId ? 'bg-blue-300' : 'bg-slate-300'}`}>{message.message}</div>
                <div className="text-xs text-slate-400 w-28 absolute -bottom-4 left-1">{formatDateFromTimestamp(message.createdAt)}</div>
            </div>
        </div>
    );
};

export default SingleMessage;
