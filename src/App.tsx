import './App.css'
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./hooks.tsx";
import {setImage, setUsername} from "./features/userSlice.tsx";
import Posts from "./pages/Posts.tsx";
import Users from "./pages/Users.tsx";
import Profile from "./pages/Profile.tsx";
import Messages from "./pages/Messages.tsx";

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
                })

        } else {
            navigate('/')
        }

    }, [])

  return (
    <div className="font-poppins">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/messages' element={<Messages/>}/>
      </Routes>
    </div>
  )
}

export default App
