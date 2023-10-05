import {useAppSelector} from "../hooks.tsx";
import {useNavigate} from "react-router-dom";

const Navbar = () => {

    const username = useAppSelector(state => state.user.username)
    const image = useAppSelector(state => state.user.image)
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
                    className="flex gap-2 items-center cursor-pointer rounded">
                    <div className="w-10 h-10">
                        <img className="w-full h-full object-cover rounded-full" src={image} alt=""/>
                    </div>
                    <div className="flex flex-col items-start">
                        <div>{username}</div>
                    </div>
                </div>
                <div
                    onClick={() => navigate('/messages')}
                    className="cursor-pointer">messages</div>
                <div
                    onClick={() => navigate('/posts')}
                    className="cursor-pointer">posts</div>
                <div
                    onClick={() => navigate('/users')}
                    className="cursor-pointer">users</div>

            </div>

            <button
                className="bg-slate-200 px-3 py-1 rounded hover:bg-slate-300"
                onClick={logout}
            >Logout</button>
        </div>
    );
};

export default Navbar;
