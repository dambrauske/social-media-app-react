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
            className="w-36 h-28 gap-2 bg-white rounded-xl flex justify-center items-center shadow">
            <div className="w-12 h-12">
                <img className="w-12 h-12 object-cover rounded-full" src={user.image} alt=""/>
            </div>
            <div className="flex flex-col">
                <div>{user.username}</div>
                <SendMessageToThisUserButton
                    user={user}/>
            </div>
        </div>
    );
};

export default UserCard;
