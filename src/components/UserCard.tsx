
const UserCard = ({user}) => {
    return (
        <div className="w-36 h-36 gap-2 bg-slate-100 rounded-xl flex flex-col justify-center items-center">
            <div className="w-20 h-20">
                <img className="w-20 h-20 object-cover rounded-full" src={user.image} alt=""/>
            </div>
            <div>{user.username}</div>
        </div>
    );
};

export default UserCard;
