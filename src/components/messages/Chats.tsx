import SingleChat from "./SingleChat.tsx";
import {useAppSelector} from "../../hooks.tsx";


const Chats = () => {

    const chats = useAppSelector(state => state.chats.chats)

    return (
        <div className="bg-slate-100 w-1/4 h-screen">
            <div>Chats</div>
            {chats && chats.map((chat, i) => (
                <SingleChat
                key={i}
                chat={chat}
                />
            ))}
        </div>
    );
};

export default Chats;
