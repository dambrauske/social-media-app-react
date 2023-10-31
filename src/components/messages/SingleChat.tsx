import {Chat} from "../../interfaces.tsx";
import {useAppSelector} from "../../hooks.tsx";
import {formatDateFromTimestamp} from "../../helperFunctions.tsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setSelectedChat} from "../../features/chatSlice.tsx";

type Props = {
    chat: Chat,
}
const SingleChat = ({chat}: Props) => {

    const user = useAppSelector(state => state.user.user)
    const chatParticipant = chat.participants.filter(participant => participant.username !== user?.username)[0]
    const recipientId = chatParticipant._id
    const messages = chat.messages
    const navigate = useNavigate()
    const dispatch = useDispatch()

    let lastMessage

    if (messages) {
        const messagesSortedByDate = [...messages].sort((objA, objB) => {
            return new Date(objB.createdAt!).getTime() - new Date(objA.createdAt!).getTime()
        })
        lastMessage = messagesSortedByDate[0]
    }

    const selectChat = () => {
        console.warn('Set selected chat singlechat.tsx 59', chat)
        dispatch(setSelectedChat(chat))
        navigate(`/messages/${recipientId}`)
    }

    return (
        <div
            onClick={selectChat}
            className="flex gap-2 items-center p-2 cursor-pointer">
            <div className="flex justify-center items-center">
                <div className="w-10 h-10">
                    <img className="w-full h-full rounded-full object-cover" src={chatParticipant?.image} alt=""/>
                </div>
            </div>
            <div className="hidden md:flex md:flex-col w-5/6">
                <div className="font-semibold">{chatParticipant?.username}</div>
                <div>
                    <div className="text-sm whitespace-nowrap overflow-ellipsis overflow-hidden">{lastMessage?.message}</div>
                    <div className="text-xs text-slate-400 text-right">{formatDateFromTimestamp(lastMessage?.createdAt)}</div>
                </div>
            </div>

        </div>
    );
};

export default SingleChat;
