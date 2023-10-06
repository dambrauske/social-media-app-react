import {Post, setUserPosts} from "../features/userSlice.tsx";
import {setAllPosts, setPostUpdateModal} from "../features/postsSlice.tsx";
import {useAppDispatch} from "../hooks.tsx";

type PostSettingsModalProps = {
    post: Post,
    setShowPostSettingsModal: (value: boolean) => void
};

const PostSettingsModal = ({ post, setShowPostSettingsModal }: PostSettingsModalProps) => {

    const dispatch = useAppDispatch()
    const deletePost = async (postId: string) => {

        const options: RequestInit = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({postId}),
        }

        const token = localStorage.getItem('token')

        if (token !== null) {
            options.headers = {
                ...options.headers,
                "authorization": token,
            }
        }

        try {
            const response = await fetch('http://localhost:8000/deletePost', options)
            const data = await response.json()
            console.log(data)
            dispatch(setUserPosts(data.data.userPosts))
            dispatch(setAllPosts(data.data.allPosts))

        } catch (error) {
            console.log(error)
        }
    }

    const update = () => {
        console.log('update clicked')
        dispatch(setPostUpdateModal(true))
        setShowPostSettingsModal(false)
    }

    return (


            <div
                className="w-28 h-min bg-slate-100 rounded border flex flex-col border-slate-200 absolute top-5 right-5 text-xs z-50">

                <button
                    onClick={() => deletePost(post._id)}
                    className="hover:bg-slate-200 p-1">delete
                </button>

                {/*<button*/}
                {/*    onClick={update}*/}
                {/*    className="hover:bg-slate-200 p-1">edit*/}
                {/*</button>*/}

                <button
                    onClick={() => setShowPostSettingsModal(false)}
                    className="hover:bg-slate-200 p-1">cancel
                </button>
            </div>

    );
};

export default PostSettingsModal;
