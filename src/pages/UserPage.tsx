import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import Navbar from "../components/Navbar.tsx";
import UserPosts from "../components/posts/UserPosts.tsx";
import {useEffect, useState} from "react";
import ProfileUpdateModal from "../components/modals/ProfileUpdateModal.tsx";
import socket from "../socket.tsx";
import {Post} from "../interfaces.tsx";
import {setAllPosts, setUserPosts} from "../features/postsSlice.tsx";


const UserPage = () => {

    const user = useAppSelector(state => state.user.user)
    const bio = useAppSelector(state => state.user.user?.bio)
    const [showProfileSettingsModal, setShowProfileSettingsModal] = useState<boolean>(false)
    const token = useAppSelector(state => state.user.token)
    const dispatch = useAppDispatch()
    const [postsLoaded, setPostsLoaded] = useState<boolean>(false)

    console.log('user', user)

    useEffect(() => {

        if(!user) return
        if(postsLoaded) return

        dispatch(setUserPosts(undefined))

        if (token === null) {
            throw new Error('Token not available')
        }
        socket().emit('getPosts', ({token}))
        socket().on('allPosts', (data: Post[]) => {
            dispatch(setAllPosts(data))
            console.log('data from get posts', data)
            const userPosts = data.filter(p => p.user.username === user?.username)
            dispatch(setUserPosts(userPosts))
            setPostsLoaded(true)
        })

        return () => {
            socket().off('getPosts')
            socket().off('allPosts')
        }


    }, [user])


    return (
        <div className="min-h-screen bg-slate-50 ">
            <Navbar/>
            {
                showProfileSettingsModal &&
                <ProfileUpdateModal
                    setShowProfileSettingsModal={setShowProfileSettingsModal}/>
            }
            <div className="flex flex-col md:flex-row gap-4 p-4">

                <div className="p-2 gap-4 flex flex-col flex-shrink">
                    <div className="flex flex-col items-center gap-2 ">
                        <div className="w-52 h-52 relative">
                            <img className="w-full h-full object-cover rounded-full" src={user?.image} alt=""/>
                            <div
                                onClick={() => setShowProfileSettingsModal(true)}
                                className="absolute top-0 right-0 h-6 w-6 bg-slate-200  rounded-full flex justify-center items-center cursor-pointer">
                                <i className="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                        <div className="font-bold text-lg tracking-wider">{user?.username}</div>
                        {
                            bio &&
                            <div className="flex gap-2">
                                <div className="font-semibold">Bio:</div>
                                <div className="w-60 break-words">{bio}</div>
                            </div>
                        }
                    </div>
                </div>

                <div className="flex flex-grow justify-center">
                    { user &&
                        <UserPosts />
                    }
                </div>
            </div>
        </div>
    );
};

export default UserPage;
