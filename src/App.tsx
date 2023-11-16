import './App.css'
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "./hooks.tsx";
import {setUser} from "./features/userSlice.tsx";
import PostsPage from "./pages/PostsPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import MessagesPage from "./pages/MessagesPage.tsx";
import SinglePostPage from "./pages/SinglePostPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import socket from "./socket.tsx";
import {Post} from "./interfaces.tsx";
import {setAllPosts, setUserPosts, updateSinglePost} from "./features/postsSlice.tsx";
import {addToUnreadMessages, setChats} from "./features/chatSlice.tsx";

function App() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const autoLoginValue = localStorage.getItem('autoLogin')
    const autoLogin = autoLoginValue ? JSON.parse(autoLoginValue) : null
    const token = localStorage.getItem('token')
    const user = useAppSelector(state => state.user.user)
    const username = useAppSelector(state => state.user?.user?.username)
    const [isLoading, setIsLoading] = useState<boolean>(true)


    useEffect( () => {
            if (autoLogin && token) {

                const options: RequestInit = {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: null,
                }

                if (token) {
                    options.headers = {
                        ...options.headers,
                        "authorization": token,
                    }
                }

                fetch('http://localhost:8000/user', options)
                    .then(res => res.json())
                    .then(data => {
                        dispatch(setUser(data.data))
                        setIsLoading(false)
                        if (location.pathname === "/") {
                            navigate('/profile')
                        }
                    })
                socket().emit('userLoggedIn', token)
            } else {
                setIsLoading(false)
                setTimeout(() => {
                    navigate('/login')
                }, 2_000)
            }

    }, [])

    useEffect(() => {
        if (token) {
            socket().emit('getPosts', ({token}))
        }
        socket().on('allPosts', (data: Post[]) => {
            dispatch(setAllPosts(data))
            const userPosts = data.filter(p => p.user.username === username)
            dispatch(setUserPosts(userPosts))
        })

        socket().on('allPostsWithNewPostAdded', (data: Post[]) => {
            dispatch(setAllPosts(data))
        })


        socket().on('messageReceiverChats', (data) => {
            dispatch(setChats(data.receiverChats))
            dispatch(addToUnreadMessages(data.newMessage))
        })

        socket().on('updatedPostAfterLike', (data) => {
            dispatch(updateSinglePost(data))
        })

        socket().on('postAfterNewComment', (data) => {
            dispatch(updateSinglePost(data))
        })

        socket().on('postsUpdatedAfterPostDeleted', (data: Post[]) => {
            dispatch(setAllPosts(data))
        })



        return () => {
            socket().off('allPostsWithNewPostAdded')
            socket().off('onlineUsers')
            socket().off('updatedPostAfterLike')
            socket().off('postsAfterNewComment')
            socket().off('postsUpdatedAfterPostDeleted')
            socket().off('allPostsWithNewPostAdded')
            socket().off('allPosts')
            socket().off('messageSenderChats')
        }
    }, [])


    return (
        <div className="font-poppins">
            <Routes>
                <Route path='/' element={autoLogin && user && location.pathname === "/" ? <Navigate to="/profile" /> : (isLoading && <h1>Loading...</h1>)}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/profile' element={<UserPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/posts' element={<PostsPage/>}/>
                <Route path='/users' element={<UsersPage/>}/>
                <Route path='/messages' element={<MessagesPage/>}/>
                <Route path='/messages/:selectedUserId' element={<MessagesPage/>}/>
                <Route path="/post/:postId" element={<SinglePostPage/>}/>
                <Route path="/user/:userId" element={<ProfilePage/>}/>
            </Routes>
        </div>
    )
}

export default App
