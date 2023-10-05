import {useAppSelector} from "../hooks.tsx";
import UpdateProfile from "../components/UpdateProfile.tsx";
import Navbar from "../components/Navbar.tsx";


const Profile = () => {

    const username = useAppSelector(state => state.user.username)
    const image = useAppSelector(state => state.user.image)
    const bio = useAppSelector(state => state.user.bio)


        console.log('image', image)


    return (
        <div>
            <Navbar/>

            <div className="p-4 gap-4 flex flex-col items-start w-ful">

                <div className="flex flex-col items-center gap-2">
                    <div className="w-52 h-52">
                        <img className="w-full h-full object-cover rounded-full" src={image} alt=""/>
                    </div>
                    <div className="font-bold text-lg tracking-wider">{username}</div>
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
                    <div className="flex gap-4">
                        <div>Posts: 2</div>
                        <div>Likes: 2</div>
                    </div>
                    <UpdateProfile/>

                </div>
            </div>
        </div>


    );
};

export default Profile;
