import SingleMessage from "./SingleMessage.tsx";
import SendMessageField from "./SendMessageField.tsx";
import {useAppSelector} from "../../hooks.tsx";


const Messages = () => {

    const selectedChat = useAppSelector(state => state.chats.selectedChat)
    const user = useAppSelector(state => state.user.user)
    const chatParticipant = selectedChat?.participants.filter(participant => participant.username !== user?.username)[0]
    const selectedChatMessages = selectedChat?.messages

    console.log('selectedChat', selectedChat)

    let messagesSortedByDate
    if (selectedChatMessages) {
        messagesSortedByDate =  [...selectedChatMessages].sort((objA, objB) => {
            return new Date(objB.createdAt!).getTime() - new Date(objA.createdAt!).getTime()
        })
    }

    // useEffect(()=>{
    //     return () => {
    //         clearMessages()
    //         clearSelectedUserWhatever()
    //     }
    // }, [])

    return (
        <div className="w-3/4 p-2">
            <div className="font-semibold">{chatParticipant?.username}</div>
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
