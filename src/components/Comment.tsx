import {useAppSelector} from "../hooks.tsx";

const Comment = () => {

    const username = useAppSelector(state => state.user.username)
    const image = useAppSelector(state => state.user.image)

    return (
        <div className="p-2 flex gap-2 rounded">
            <div className="w-10 h-10">
                <img className="w-full h-full rounded-full" src={image} alt=""/>
            </div>

            <div className="flex">
                <textarea
                    className="w-full p-2 border rounded-lg focus:outline-none resize-none"
                    placeholder="Write a comment..."
                    rows="2"

                />
            </div>

        </div>
    );
};

export default Comment;
