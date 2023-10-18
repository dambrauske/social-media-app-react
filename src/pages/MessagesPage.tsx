import Navbar from "../components/Navbar.tsx";
import Chats from "../components/messages/Chats.tsx";
import Messages from "../components/messages/Messages.tsx";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../hooks.tsx";

const MessagesPage = () => {

    const {selectedUserId} = useParams()
    const p = useParams()
    const selectedUser = useAppSelector(state => state.users.selectedUser)
    const selectedChat = useAppSelector(state => state.chats.selectedChat)
    console.log('params', p)
    console.log('selectedUser', selectedUser)


    return (
        <div>
            <Navbar/>
            <div className="flex">
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
