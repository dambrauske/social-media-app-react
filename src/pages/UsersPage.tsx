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
            <div className="p-4 gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {users && usersExceptCurrent?.map((user, i) => (
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
