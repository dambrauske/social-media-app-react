import Navbar from "../components/Navbar.tsx";
import Chats from "../components/messages/Chats.tsx";
import Messages from "../components/messages/Messages.tsx";

const MessagesPage = () => {

    return (
        <div>
            <Navbar/>
            <div className="flex">
                <Chats/>
                <Messages/>
            </div>
        </div>
    );
};

export default MessagesPage;
