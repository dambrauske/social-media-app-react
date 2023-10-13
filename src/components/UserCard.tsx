import {useNavigate} from "react-router-dom";
import {User} from "../interfaces.tsx";

type Props = {
    user: User
}
const UserCard = ({user}: Props) => {

    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/user/${user.id}`)}
            className="w-36 h-36 gap-2 bg-white rounded-xl flex flex-col justify-center items-center shadow">
            <div className="w-20 h-20">
                <img className="w-20 h-20 object-cover rounded-full" src={user.image} alt=""/>
            </div>
            <div>{user.username}</div>
        </div>
    );
};

export default UserCard;
