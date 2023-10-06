import LikesAndComments from "../components/LikesAndComments.tsx";
import PostSettingsModal from "../components/PostSettingsModal.tsx";
import {useParams} from "react-router-dom";

const SinglePostPage = () => {

    const { postId } = useParams()

        const options: RequestInit = {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            body: null,
        }

        const token = localStorage.getItem('token')

        if (token !== null) {
            options.headers = {
                ...options.headers,
                "authorization": token,
            }
        }

        fetch('http://localhost:8000/post' + postId, options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })



    return (
        <div className="flex flex-col bg-slate-50 p-4">

            <div className="flex flex-col p-2 rounded bg-white gap-2 w-96 relative">

                <div className="w-full h-60">
                    <img className="w-full h-full object-cover rounded" src={post.image} alt=""/>
                </div>

                <div className="flex justify-between p-2">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12">
                            <img className="w-full h-full rounded-full" src={userImage} alt=""/>
                        </div>
                        <div className="font-bold text-xl">{post.username}:</div>
                    </div>
                    <LikesAndComments/>
                </div>

                <div className="p-2">{post.title}</div>

                {post.username === username ?
                    <div
                        onClick={() => setShowPostSettingsModal(!showPostSettingsModal)}
                        className="absolute top-0 right-0 h-6 w-6 bg-slate-200  rounded-full flex justify-center items-center cursor-pointer">
                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                    :
                    null
                }

                {
                    showPostSettingsModal &&
                    <PostSettingsModal
                        post={post}
                        setShowPostSettingsModal={setShowPostSettingsModal}
                    />
                }

            </div>

        </div>
    );
};

export default SinglePostPage;
