import './App.css'
import {Route, Routes, useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "./hooks.tsx";
import {setUser} from "./features/userSlice.tsx";
import PostsPage from "./pages/PostsPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import MessagesPage from "./pages/MessagesPage.tsx";
import SinglePostPage from "./pages/SinglePostPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

function App() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const autoLoginValue = localStorage.getItem('autoLogin')
    const autoLogin = autoLoginValue ? JSON.parse(autoLoginValue) : null
    const token = localStorage.getItem('token')

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

                    setTimeout(() => {

                        navigate('/profile')
                    }, 2_000)
                })
        } else {
            setTimeout(() => {

                navigate('/login')
            }, 2_000)

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
