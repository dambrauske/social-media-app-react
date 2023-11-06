import LikesAndComments from "../components/commentsAndLikes/LikesAndComments.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import Comments from "../components/commentsAndLikes/Comments.tsx";
import Navbar from "../components/Navbar.tsx";
import SendMessageToThisUserButton from "../components/messages/SendMessageToThisUserButton.tsx";
import {useEffect, useState} from "react";
import socket from "../socket.tsx";
import {Post} from "../interfaces.tsx";
import {setAllPosts, setUserPosts} from "../features/postsSlice.tsx";


const SinglePostPage = () => {
    const {postId} = useParams()
    const user = useAppSelector(state => state.user.user)
    const posts = useAppSelector(state => state.posts.posts)
    const selectedPost = posts?.find(p => p._id === postId)
    const token = useAppSelector(state => state.user.token)
    const username = useAppSelector(state => state.user?.user?.username)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(true)


    useEffect(() => {

        if (token === null) {
            throw new Error('Token not available')
        }

        socket().emit('getPosts', ({token}))
        socket().on('allPosts', (data: Post[]) => {
            dispatch(setAllPosts(data))
            const userPosts = data.filter(post => post.user.username === username)
            dispatch(setUserPosts(userPosts))
            setIsLoading(false)
        })



        return () => {
            socket().off('getPosts')
            socket().off('allPosts')
        }

    }, [])

    useEffect(() => {
        const isPostAvailable = posts?.some(p => p._id === postId)
        if (!isPostAvailable) {
            navigate('/posts')
        }
    }, [posts])

    if (isLoading) return null

    return (
        <div>
            <Navbar/>
            <div className="bg-slate-50 p-4 flex min-h-screen justify-center">

                <div className="flex p-2 rounded bg-white gap-2 relative">
                    <div>
                        <div className="w-[32rem] h-[32rem]">
                            <img className="w-full h-full object-cover rounded" src={selectedPost?.image} alt=""/>
                        </div>
                    </div>

                    <div className="flex flex-col p-2 w-80 gap-4">
                        <div className="flex flex-col items-start gap-2">
                            <div className="font-bold text-xl">{selectedPost?.user.username}</div>
                            {
                                selectedPost?.user.username !== user?.username ?
                                    <SendMessageToThisUserButton
                                        user={selectedPost?.user}
                                    />
                                    :
                                     null

                            }

                            <div className="w-full overflow-hidden">
                                <div className="p-2 break-words">{selectedPost?.title}</div>
                            </div>
                        </div>
                        <div className="self-end">
                            <LikesAndComments
                                post={selectedPost}/>
                        </div>
                        <hr/>
                        <Comments
                            post={selectedPost}
                        />
                    </div>

                </div>

            </div>
        </div>


    );
};

export default SinglePostPage;
