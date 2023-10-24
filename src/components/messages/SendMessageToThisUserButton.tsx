import {useNavigate} from "react-router-dom";
import {User} from "../../interfaces.tsx";
import {MouseEvent} from "react";
import {useDispatch} from "react-redux";
import {setSelectedUser} from "../../features/allUsersSlice.tsx";

interface Props {
    user: User | undefined
}

const SendMessageToThisUserButton = ({user}: Props) => {
    const dispatch = useDispatch()
    const participantId = user?._id
    const navigate = useNavigate()

    console.log('participantId', participantId)
    console.log('user', user)

    const goToMessages = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(setSelectedUser(user))
        navigate(`/messages/${participantId}`)
    }

    return (
        <button
            onClick={(e) => goToMessages(e)}
            className="bg-slate-200 rounded p-1 flex gap-2 justify-center items-center hover:bg-blue-200">
            <i className="fas fa-paper-plane"></i>
            <div className="md:block hidden">Message</div>
        </button>
    );
};

export default SendMessageToThisUserButton;
