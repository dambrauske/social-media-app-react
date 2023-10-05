import Navbar from "../components/Navbar.tsx";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import {useEffect} from "react";
import {setUsers} from "../features/allUsersSlice.tsx";
import UserCard from "../components/UserCard.tsx";

const UsersPage = () => {

    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state.users.users)
    const username = useAppSelector(state => state.user.username)
    const usersExceptCurrent = users.filter(user => user.username !==username)

useEffect(() => {
    const options: RequestInit = {
        method: "GET",
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

    fetch('http://localhost:8000/users', options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch(setUsers(data.data))
        })

}, [])


    return (
        <div>
            <Navbar/>
            <div className="flex flex-wrap gap-4 p-4 justify-center">
                {users && usersExceptCurrent.map((user,i) => (
                    <UserCard
                        key={i}
                        user={user}
                    />
                ))}
            </div>


        </div>
    );
};

export default UsersPage;
