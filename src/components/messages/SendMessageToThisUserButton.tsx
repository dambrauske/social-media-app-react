import {useNavigate} from "react-router-dom";

const SendMessageToThisUserButton = () => {

    const navigate = useNavigate()

    return (
        <button
            onClick={() => navigate('/messages')}
            className="bg-slate-200 rounded p-1">
            Send Message
        </button>
    );
};

export default SendMessageToThisUserButton;
