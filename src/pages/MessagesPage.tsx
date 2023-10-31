import Navbar from "../components/Navbar.tsx";
import Chats from "../components/messages/Chats.tsx";
import Messages from "../components/messages/Messages.tsx";
import {useParams} from "react-router-dom";

const MessagesPage = () => {

    const {selectedUserId} = useParams()

    return (
        <div className="h-screen flex flex-col bg-slate-100">
            <Navbar/>
            <div className="grow flex overflow-hidden">
                <Chats/>
                {selectedUserId ?
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
