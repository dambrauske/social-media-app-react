import {Chat, User} from "../../interfaces.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import {setSelectedChat} from "../../features/chatSlice.tsx";
import {setSelectedUser} from "../../features/allUsersSlice.tsx";

type Props = {
    chat: Chat
}
const SingleChat = ({chat}: Props) => {

    const user = useAppSelector(state => state.user.user)
const dispatch = useAppDispatch()
    const [chatParticipant] = chat.participants.filter(participant => participant.username !== user?.username)
    const messages = chat.messages
    let lastMessage

    if (messages) {
        const messagesSortedByDate =  [...messages].sort((objA, objB) => {
            return new Date(objB.createdAt!).getTime() - new Date(objA.createdAt!).getTime()
        })
        lastMessage = messagesSortedByDate[0]
    }

    const selectChat = () => {
        dispatch(setSelectedChat(chat))
        dispatch(setSelectedUser(chatParticipant))
    }


    return (
        <div
            onClick={selectChat}
            className="flex gap-2 items-center p-2 w-full cursor-pointer">
            <div>
                <img className="w-10 h-10 rounded-full object-cover" src={chatParticipant?.image} alt=""/>
            </div>
            <div className="flex flex-col  w-full">
                <div className="font-semibold">{chatParticipant?.username}</div>
                <div>
                    <div className="text-sm">{lastMessage?.message}</div>
                    <div className="text-xs text-slate-400 text-right">{lastMessage?.createdAt}</div>
                </div>
            </div>

        </div>
    );
};

export default SingleChat;
