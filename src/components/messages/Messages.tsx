import SingleMessage from "./SingleMessage.tsx";
import SendMessageField from "./SendMessageField.tsx";
import {useAppSelector} from "../../hooks.tsx";

interface Props {
    selectedUserId: string | undefined
}

const Messages = ({selectedUserId}: Props) => {

    const chats = useAppSelector(state => state.chats)
    const selectedChat = chats?.chats?.find(c => Boolean(c.participants.find(p => p._id === selectedUserId)))
    const selectedUser = useAppSelector(state => state.users.selectedUser)
    const selectedChatMessages = selectedChat?.messages


    let messagesSortedByDate
    if (selectedChatMessages) {
        messagesSortedByDate = [...selectedChatMessages].sort((objA, objB) => {
            return new Date(objB.createdAt!).getTime() - new Date(objA.createdAt!).getTime()
        })
    }

    return (
        <div className="bg-slate-50 md:w-3/4 grow flex flex-col h-full">
            <div className="font-semibold p-1">{selectedUser?.username}</div>
            <hr/>
            <div className="flex flex-col justify-between h-full overflow-auto">
                <div
                    className="overflow-y-auto custom-scrollbar flex grow overflow-x-hidden flex-col-reverse bg-slate-100 ">
                    {messagesSortedByDate && messagesSortedByDate.map((message, i) => (
                        <SingleMessage
                            key={i}
                            message={message}
                        />
                    ))}
                </div>
                <hr/>
                <SendMessageField/>
            </div>

        </div>
    );
};

export default Messages;
