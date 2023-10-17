import Navbar from "../components/Navbar.tsx";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import {setSelectedUser} from "../features/allUsersSlice.tsx";
import socket from "../socket.tsx";
import {Post} from "../interfaces.tsx";
import {setSelectedUserPosts} from "../features/postsSlice.tsx";
import PostCard from "../components/posts/PostCard.tsx";
import SendMessageToThisUserButton from "../components/messages/SendMessageToThisUserButton.tsx";


const ProfilePage = () => {

    const {userId} = useParams()

    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.user.token)
    const selectedUser = useAppSelector(state => state.users.selectedUser)
    const selectedUserPosts = useAppSelector(state => state.posts.selectedUserPosts)

    console.log('selectedUser', selectedUser)
    let selectedUserPostsSortedByDate

    if (selectedUserPosts) {
        selectedUserPostsSortedByDate =  [...selectedUserPosts].sort((objA, objB) => {
            return new Date(objB.date!).getTime() - new Date(objA.date!).getTime()
        })
    }

    useEffect(() => {

        socket().emit('getUserAndPosts', ({token, userId}))
        socket().on('UserAndPosts', (data) => {
            dispatch(setSelectedUser(data.user))
            dispatch(setSelectedUserPosts(data.posts))
            console.log('User', data)
        })

        return () => {
            socket().off('getUserAndPosts')
            socket().off('UserAndPosts')
        }

    }, [])

    return (
        <div>
            <Navbar/>

            <div className="flex flex-col md:flex-row gap-4 p-4 bg-slate-50">
                <div className="p-2 gap-4 flex flex-col items-start w-1/4">

                    <div className="flex flex-col items-center gap-2">
                        <div className="w-52 h-52">
                            <img className="w-full h-full object-cover rounded-full" src={selectedUser?.image} alt=""/>
                        </div>
                        <div className="font-bold text-lg tracking-wider">{selectedUser?.username}</div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <SendMessageToThisUserButton/>
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
                <div className="flex justify-center w-full mt-4">
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
                        {selectedUserPostsSortedByDate && selectedUserPostsSortedByDate.map((post: Post, i: number) => (
                            <PostCard
                                key={i}
                                post={post}
                            />
                        ))}

                    </div>
                </div>

            </div>
        </div>

    );
};

export default ProfilePage;
