import {Message} from "../../interfaces.tsx";
import {formatDateFromTimestamp} from "../../helperFunctions.tsx";

type Props = {
    message: Message,
}
const SingleMessage = ({message}: Props) => {

    return (
        <div className="flex items-center gap-1 p-2 w-1/2">
            <div>
                <img className="w-10 h-10 rounded-full object-cover" src={message.sentBy.image} alt=""/>
            </div>
            <div className="flex flex-col">
                <div className="bg-slate-100 rounded-xl p-2">{message.message}</div>
                <div className="text-xs text-right text-slate-400">{formatDateFromTimestamp(message.createdAt)}</div>
            </div>

        </div>
    );
};

export default SingleMessage;
