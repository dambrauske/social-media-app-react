import './App.css'
import {Route, Routes, useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./hooks.tsx";
import {setBio, setImage, setUsername} from "./features/userSlice.tsx";
import PostsPage from "./pages/PostsPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import MessagesPage from "./pages/MessagesPage.tsx";

function App() {

    const autoLogin = useAppSelector(state => state.user.autoLogin)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    useEffect(() => {

        if (autoLogin) {

            const options: RequestInit = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: null,
            }

            const token = localStorage.getItem('token')

            if (token !== null) {
                options.headers = {
                    ...options.headers,
                    "authorization": token,
                }
            }

            fetch('http://localhost:8000/user', options)
                .then(res => res.json())
                .then(data => {
                    dispatch(setImage(data.data.image))
                    dispatch(setUsername(data.data.username))
                    dispatch(setBio(data.data.bio))
                })

        } else {
            navigate('/')
        }

    }, [])

  return (
    <div className="font-poppins">
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/posts' element={<PostsPage/>}/>
        <Route path='/users' element={<UsersPage/>}/>
        <Route path='/messages' element={<MessagesPage/>}/>
      </Routes>
    </div>
  )
}

export default App
