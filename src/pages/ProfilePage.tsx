import {useAppSelector} from "../hooks.tsx";
import UpdateProfile from "../components/UpdateProfile.tsx";
import Navbar from "../components/Navbar.tsx";
import UserPosts from "../components/UserPosts.tsx";


const ProfilePage = () => {

    const user = useAppSelector(state => state.user.user)
    const bio = useAppSelector(state => state.user.user?.bio)


    return (
        <div>
            <Navbar/>

            <div className="flex justify-center p-4">
                <div className="p-4 gap-4 flex flex-col items-start w-ful w-1/2">

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

                <div className="w-1/2">
                    <UserPosts/>

                </div>

            </div>
        </div>


    );
};

export default ProfilePage;
