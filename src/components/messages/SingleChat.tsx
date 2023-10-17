import {Chat} from "../../interfaces.tsx";
import {useAppSelector} from "../../hooks.tsx";
import {MouseEventHandler} from "react";
import {formatDateFromTimestamp} from "../../helperFunctions.tsx";

type Props = {
    chat: Chat,
    onClick: MouseEventHandler<HTMLDivElement>,
}
const SingleChat = ({chat, onClick}: Props) => {

    const user = useAppSelector(state => state.user.user)
    const [chatParticipant] = chat.participants.filter(participant => participant.username !== user?.username)
    const messages = chat.messages
    let lastMessage

    if (messages) {
        const messagesSortedByDate = [...messages].sort((objA, objB) => {
            return new Date(objB.createdAt!).getTime() - new Date(objA.createdAt!).getTime()
        })
        lastMessage = messagesSortedByDate[0]
    }


    return (
        <div
            onClick={onClick}
            className="flex gap-2 items-center p-2 w-full cursor-pointer">
            <div>
                <img className="w-10 h-10 rounded-full object-cover" src={chatParticipant?.image} alt=""/>
            </div>
            <div className="flex flex-col  w-full">
                <div className="font-semibold">{chatParticipant?.username}</div>
                <div>
                    <div className="text-sm">{lastMessage?.message}</div>
                    <div className="text-xs text-slate-400 text-right">{formatDateFromTimestamp(lastMessage?.createdAt)}</div>
                </div>
            </div>

        </div>
    );
};

export default SingleChat;
