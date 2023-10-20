import {useAppSelector} from "../hooks.tsx";
import UpdateProfile from "../components/userProfileUpdates/UpdateProfile.tsx";
import Navbar from "../components/Navbar.tsx";
import UserPosts from "../components/posts/UserPosts.tsx";
import {useState} from "react";
import ProfileUpdateModal from "../components/modals/ProfileUpdateModal.tsx";

const UserPage = () => {

    const user = useAppSelector(state => state.user.user)
    const bio = useAppSelector(state => state.user.user?.bio)
    const [showProfileSettingsModal, setShowProfileSettingsModal] = useState<boolean>(false)


    return (
        <div className="min-h-screen bg-slate-50 ">
            <Navbar/>

            {
                showProfileSettingsModal &&
                <ProfileUpdateModal
                    setShowProfileSettingsModal={setShowProfileSettingsModal}/>
            }

            <div className="flex flex-col md:flex-row gap-4 p-4">
                <div className="p-2 gap-4 flex flex-col items-start w-1/4">

                    <div className="flex flex-col items-center gap-2 relative">
                        <div className="w-52 h-52">
                            <img className="w-full h-full object-cover rounded-full" src={user?.image} alt=""/>
                        </div>
                        <div className="font-bold text-lg tracking-wider">{user?.username}</div>
                        <div>Bio:{bio}</div>
                        <div
                            onClick={() => setShowProfileSettingsModal(true)}
                            className="absolute top-0 right-0 h-6 w-6 bg-slate-200  rounded-full flex justify-center items-center cursor-pointer">
                            <i className="fas fa-ellipsis-h"></i>
                        </div>
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
