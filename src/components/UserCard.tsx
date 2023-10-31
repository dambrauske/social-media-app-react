import {useNavigate} from "react-router-dom";
import {User} from "../interfaces.tsx";
import SendMessageToThisUserButton from "./messages/SendMessageToThisUserButton.tsx";

type Props = {
    user: User
}
const UserCard = ({user}: Props) => {

    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/user/${user._id}`)}
            className="gap-2 p-4 bg-white rounded-xl flex justify-center items-center shadow cursor-pointer">
            <div className="w-16 h-16">
                <img className="w-full h-full object-cover rounded-full" src={user.image} alt=""/>
            </div>
            <div className="flex flex-col gap-1">
                <div>{user.username}</div>
                <SendMessageToThisUserButton
                    user={user}/>
            </div>
        </div>
    );
};

export default UserCard;
