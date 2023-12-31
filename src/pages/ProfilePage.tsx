import Navbar from "../components/Navbar.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import {setSelectedUser} from "../features/allUsersSlice.tsx";
import socket from "../socket.tsx";
import {setSelectedUserPosts} from "../features/postsSlice.tsx";
import SendMessageToThisUserButton from "../components/messages/SendMessageToThisUserButton.tsx";
import SelectedUserPosts from "../components/posts/SelectedUserPosts.tsx";


const ProfilePage = () => {

    const {userId} = useParams()

    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.user.token)
    const selectedUser = useAppSelector(state => state.users.selectedUser)
    const [isLoading, setIsLoading] = useState<boolean>(true)


    useEffect(() => {
        dispatch(setSelectedUser(undefined))
        socket().emit('getUserAndPosts', ({token, userId}))
        socket().on('UserAndPosts', (data) => {
            dispatch(setSelectedUser(data.user))
            dispatch(setSelectedUserPosts(data.posts))
            setIsLoading(false)
        })

        return () => {
            socket().off('getUserAndPosts')
            socket().off('UserAndPosts')
        }

    }, [])


    if (isLoading) return null

    return (
        <div>
            <Navbar/>

            <div className="flex flex-col md:flex-row gap-4 p-4 bg-slate-50">

                <div className="p-2 gap-4 flex flex-col items-start">

                    <div className="flex flex-col items-center gap-2">
                        <div className="w-52 h-52">
                            <img className="w-full h-full object-cover rounded-full" src={selectedUser?.image} alt=""/>
                        </div>
                        <div className="font-bold text-lg tracking-wider">{selectedUser?.username}</div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <SendMessageToThisUserButton
                        user={selectedUser}/>
                        <div className="h-4">
                            {
                                selectedUser?.bio &&
                                <div className="flex gap-2">
                                    <div className="font-bold">Bio:</div>
                                    <div>{selectedUser?.bio}</div>
                                </div>
                            }
                        </div>
                        <div>Posts: {selectedUser?.posts.length}</div>
                    </div>
                </div>

                <div className="flex flex-grow justify-center">
                        <SelectedUserPosts/>

                </div>

            </div>
        </div>

    );
};

export default ProfilePage;
