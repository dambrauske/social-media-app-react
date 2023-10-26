import './App.css'
import {Route, Routes, useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import {useEffect} from "react";
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
import {setAllPosts, setSelectedPost, setUserPosts, updateSinglePost} from "./features/postsSlice.tsx";

function App() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const autoLoginValue = localStorage.getItem('autoLogin')
    const autoLogin = autoLoginValue ? JSON.parse(autoLoginValue) : null
    const token = localStorage.getItem('token')
    const user = useAppSelector(state => state.user.user)
    const selectedPost = useAppSelector(state => state.posts.selectedPost)

    useEffect(() => {

        if (autoLogin) {
            const options: RequestInit = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: null,
            }

            if (token !== null) {
                options.headers = {
                    ...options.headers,
                    "authorization": token,
                }
            }

            fetch('http://localhost:8000/user', options)
                .then(res => res.json())
                .then(data => {
                    dispatch(setUser(data.data))
                })
        } else {
            setTimeout(() => {

                navigate('/login')
            }, 2_000)

        }
    }, [])

    useEffect(() => {
        socket().on('allPostsWithNewPostAdded', (data: Post[]) => {
            console.warn('allPostsWithNewPostAdded')
            dispatch(setAllPosts(data))
            const userPosts = data.filter(post => post.user.username === user?.username)
            dispatch(setUserPosts(userPosts))
        })

        socket().on('updatedPostAfterLike', (data) => {
            console.warn('updatedPostAfterLike')
            dispatch(updateSinglePost(data))
            if (selectedPost && selectedPost?._id === data._id) {
                dispatch(setSelectedPost(data))
            }
        })

        socket().on('postAfterNewComment', (data) => {
            console.warn('postAfterNewComment')
            dispatch(updateSinglePost(data))
            if (selectedPost && selectedPost?._id === data._id) {
                dispatch(setSelectedPost(data))
            }
        })

        socket().on('postsUpdatedAfterPostDeleted', (data: Post[]) => {
            console.warn('postsUpdatedAfterPostDeleted')
            dispatch(setAllPosts(data))
        })

        socket().on('allPostsWithNewPostAdded', (data: Post[]) => {
            console.warn('allPostsWithNewPostAdded')
            dispatch(setAllPosts(data))
            const userPosts = data.filter(post => post.user.username === user?.username)
            dispatch(setUserPosts(userPosts))
        })


        return () => {
            socket().off('allPostsWithNewPostAdded')
            socket().off('updatedPostAfterLike')
            socket().off('postsAfterNewComment')
            socket().off('postsUpdatedAfterPostDeleted')
            socket().off('allPostsWithNewPostAdded')
        }
    }, [])



    return (
        <div className="font-poppins">
            <Routes>
                <Route path='/' element={autoLogin ?<h1>Authenticating ...</h1> : <p>Redirecting to login...</p>}/>
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
