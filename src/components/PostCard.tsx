import {Post, setUserPosts} from "../features/userSlice.tsx";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import {setAllPosts} from "../features/postsSlice.tsx";

type Props = {
    post: Post
}

const PostCard = ({post}: Props) => {

    const dispatch = useAppDispatch()
    const username = useAppSelector(state => state.user.username)

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

    return (
        <div className="flex flex-col p-4 rounded bg-slate-300 gap-2 w-60 justify-center items-center relative">
            <div>{post.username}:</div>
            <div>{post.title}</div>
            <div className="w-40 h-40">
                <img className="w-full h-full object-cover" src={post.image} alt=""/>
            </div>

            {post.username === username ?
                <div
                    onClick={() => deletePost(post._id)}
                    className="absolute top-0 right-0 bg-red-300 h-5 w-5 flex justify-center items-center cursor-pointer">
                    <i className="far fa-trash-alt"></i>
                </div>

                :

                null

            }



        </div>
    );
};

export default PostCard;
