import SingleMessage from "./SingleMessage.tsx";
import SendMessageField from "./SendMessageField.tsx";
import {useAppSelector} from "../../hooks.tsx";


const Messages = () => {

    const selectedUser = useAppSelector(state => state.users.selectedUser)
    const selectedChat = useAppSelector(state => state.chats.selectedChat)
    const selectedChatMessages = selectedChat?.messages

    console.log('selectedChat', selectedChat)

    let messagesSortedByDate

    if (selectedChatMessages) {
        messagesSortedByDate =  [...selectedChatMessages].sort((objA, objB) => {
            return new Date(objB.createdAt!).getTime() - new Date(objA.createdAt!).getTime()
        })
    }


    console.log('selectedChatMessages', selectedChatMessages)
    console.log('messagesSortedByDate', messagesSortedByDate)


    return (
        <div className="w-3/4 p-2">
            <div className="font-semibold">{selectedUser?.username}</div>
            {messagesSortedByDate && messagesSortedByDate.map((message, i) => (
                <SingleMessage
                key={i}
                message={message}
                />
            ))}

            <SendMessageField/>
        </div>
    );
};

export default Messages;
