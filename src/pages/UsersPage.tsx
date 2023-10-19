import Navbar from "../components/Navbar.tsx";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import {useEffect} from "react";
import {fetchAllUsers} from "../features/allUsersSlice.tsx";
import UserCard from "../components/UserCard.tsx";

const UsersPage = () => {

    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state.users.users)
    const username = useAppSelector(state => state.user?.user?.username)
    const usersExceptCurrent = users?.filter(user => user.username !==username)
    const token = useAppSelector(state => state.user.token)

useEffect(() => {

    dispatch(fetchAllUsers(token))

}, [])


    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar/>
            <div className="flex flex-wrap gap-4 p-4 justify-center">
                {users && usersExceptCurrent?.map((user) => (
                    <UserCard
                        key={user._id}
                        user={user}
                    />
                ))}
            </div>


        </div>
    );
};

export default UsersPage;
