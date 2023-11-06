import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import socket from "../socket.tsx";
import {addToUnreadMessages, setChats} from "../features/chatSlice.tsx";

const Navbar = () => {

    const user = useAppSelector(state => state.user.user)
    const unreadMessages = useAppSelector(state => state.chats.unreadMessages)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const logout = () => {
        navigate('/login')
        localStorage.clear()
    }

    useEffect(() => {

        socket().on('messageReceiverChats', (data) => {
            dispatch(setChats(data.receiverChats))
            dispatch(addToUnreadMessages(data.newMessage))
        })

        return () => {
            socket().off('messageReceiverChats')
        }
    })

    return (
        <div className="flex shrink-0 items-center justify-between px-4 py-2 bg-slate-200 gap-10">
            <div className="flex items-center justify-center gap-10">
                <div
                    onClick={() => navigate('/profile')}
                    className="flex gap-2 items-center cursor-pointer px-3 py-1 rounded hover:bg-slate-300">
                    <div className="w-6 h-6">
                        <img className="w-full h-full object-cover rounded-full" src={user?.image} alt=""/>
                    </div>
                    <div className="md:flex flex-col items-start hidden">
                        <div>{user?.username}</div>
                    </div>
                </div>
                <div
                    onClick={() => navigate('/messages')}
                    className="cursor-pointer px-3 py-1 rounded hover:bg-slate-300 flex justify-center items-center gap-2 relative">
                    <i className="fas fa-envelope text-slate-700"></i>
                    <div className="md:block hidden">messages</div>
                    {
                        unreadMessages.length > 0 &&
                        <div className="bg-red-500 text-slate-50 text-xs w-4 h-4 rounded-full flex justify-center items-center absolute -right-1 top-0">{unreadMessages.length}</div>
                    }
                </div>
                <div
                    onClick={() => navigate('/posts')}
                    className="cursor-pointer px-3 py-1 rounded hover:bg-slate-300 flex justify-center items-center gap-2">
                    <i className="fas fa-images text-slate-700"></i>
                    <div className="md:block hidden">posts</div>
                </div>
                <div
                    onClick={() => navigate('/users')}
                    className="cursor-pointer px-3 py-1 rounded hover:bg-slate-300 flex justify-center items-center gap-2">
                    <i className="fas fa-users text-slate-700"></i>
                    <div className="md:block hidden">users</div>
                </div>

            </div>

            <div className="bg-slate-200 px-3 py-1 rounded hover:bg-slate-300 flex justify-center items-center gap-2 cursor-pointer"
                onClick={logout}>
                <i className="fas fa-sign-out-alt text-slate-700"></i>
                <div className="md:block hidden">Logout</div>
            </div>
        </div>
    );
};

export default Navbar;
