import {useAppSelector} from "../hooks.tsx";
import {useNavigate} from "react-router-dom";

const Navbar = () => {

    const user = useAppSelector(state => state.user.user)
    const navigate = useNavigate()


    const logout = () => {
        navigate('/')
        localStorage.clear()
    }

    return (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-200 gap-10">
            <div className="flex items-center justify-center gap-10">
                <div
                    onClick={() => navigate('/profile')}
                    className="flex gap-2 items-center cursor-pointer px-3 py-1 rounded hover:bg-slate-300">
                    <div className="w-6 h-6">
                        <img className="w-full h-full object-cover rounded-full" src={user?.image} alt=""/>
                    </div>
                    <div className="flex flex-col items-start">
                        <div>{user?.username}</div>
                    </div>
                </div>
                <div
                    onClick={() => navigate('/messages')}
                    className="cursor-pointer px-3 py-1 rounded hover:bg-slate-300 flex justify-center items-center gap-2">
                    <i className="fas fa-envelope text-slate-700"></i>
                    <div>messages</div>
                </div>
                <div
                    onClick={() => navigate('/posts')}
                    className="cursor-pointer px-3 py-1 rounded hover:bg-slate-300 flex justify-center items-center gap-2">
                    <i className="fas fa-images text-slate-700"></i>
                    <div>posts</div>
                </div>
                <div
                    onClick={() => navigate('/users')}
                    className="cursor-pointer px-3 py-1 rounded hover:bg-slate-300 flex justify-center items-center gap-2">
                    <i className="fas fa-users text-slate-700"></i>
                    <div>users</div>
                </div>

            </div>

            <div className="bg-slate-200 px-3 py-1 rounded hover:bg-slate-300 flex justify-center items-center gap-2 cursor-pointer"
                onClick={logout}>
                <i className="fas fa-sign-out-alt text-slate-700"></i>
                <div>Logout</div>
            </div>
        </div>
    );
};

export default Navbar;
