import {useAppSelector} from "../hooks.tsx";
import UpdateProfile from "../components/userProfileUpdates/UpdateProfile.tsx";
import Navbar from "../components/Navbar.tsx";
import UserPosts from "../components/posts/UserPosts.tsx";


const UserPage = () => {

    const user = useAppSelector(state => state.user.user)
    const bio = useAppSelector(state => state.user.user?.bio)

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar/>

            <div className="flex flex-col md:flex-row gap-4 p-4">
                <div className="p-2 gap-4 flex flex-col items-start w-1/4">

                    <div className="flex flex-col items-center gap-2">
                        <div className="w-52 h-52">
                            <img className="w-full h-full object-cover rounded-full" src={user?.image} alt=""/>
                        </div>
                        <div className="font-bold text-lg tracking-wider">{user?.username}</div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="h-4">
                            {
                                bio &&
                                <div className="flex gap-2">
                                    <div className="font-bold">Bio:</div>
                                    <div>{bio}</div>
                                </div>
                            }

                        </div>
                            <UpdateProfile/>
                    </div>
                </div>
            <div className="flex justify-center w-full">

                <UserPosts/>
            </div>

            </div>
        </div>


    );
};

export default UserPage;
