import Navbar from "../components/Navbar.tsx";
import Chats from "../components/messages/Chats.tsx";
import Messages from "../components/messages/Messages.tsx";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../hooks.tsx";

const MessagesPage = () => {

    const {selectedUserId} = useParams()
    const selectedChat = useAppSelector(state => state.chats.selectedChat)

    console.log('selectedUserId', selectedUserId)
    console.log('selectedChat', selectedChat)

    return (
        <div className="min-h-screen bg-slate-300">
            <Navbar/>
            <div className="flex h-full">
                <Chats/>

                {selectedChat || selectedUserId ?
                    <Messages
                        selectedUserId={selectedUserId}
                    />
                    :
                    null
                }

            </div>
        </div>
    );
};

export default MessagesPage;
