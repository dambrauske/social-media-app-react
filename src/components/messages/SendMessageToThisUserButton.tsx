import {useNavigate} from "react-router-dom";
import {User} from "../../interfaces.tsx";

interface Props {
    user: User | undefined
}

const SendMessageToThisUserButton = ({user}: Props) => {

    console.log('user', user)

    const participantId = user?._id
    const navigate = useNavigate()

    return (
        <button
            onClick={() => navigate(`/messages/${participantId}`)}
            className="bg-slate-200 rounded p-1">
            Send Message
        </button>
    );
};

export default SendMessageToThisUserButton;
