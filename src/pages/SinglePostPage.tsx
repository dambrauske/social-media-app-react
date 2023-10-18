import LikesAndComments from "../components/commentsAndLikes/LikesAndComments.tsx";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import {useEffect} from "react";
import {setSelectedPost} from "../features/postsSlice.tsx";
import Comments from "../components/commentsAndLikes/Comments.tsx";
import Navbar from "../components/Navbar.tsx";
import socket from "../socket.tsx";
import {setSelectedUser} from "../features/allUsersSlice.tsx";
import SendMessageToThisUserButton from "../components/messages/SendMessageToThisUserButton.tsx";


const SinglePostPage = () => {
    const {postId} = useParams()
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.user.token)
    const post = useAppSelector(state => state.posts.selectedPost)

    console.log('selectedpost', post)

    useEffect(() => {

        if (token === null) {
            throw new Error('Token not available')
        }
        dispatch(setSelectedPost(undefined))

        socket().emit('getSinglePost', ({token, postId}))
        socket().on('singlePost', (data) => {
            console.log('singlePost', data)
            dispatch(setSelectedPost(data))
            dispatch(setSelectedUser(post?.user))
        })

        return () => {
            socket().off('getSinglePost')
            socket().off('singlePost')
        }
    }, [])

    return (
        <div>
            <Navbar/>
            <div className="bg-slate-50 p-4 flex min-h-screen justify-center">

                <div className="flex p-2 rounded bg-white gap-2 relative">
                    <div>
                        <div className="w-[32rem] h-[32rem]">
                            <img className="w-full h-full object-cover rounded" src={post?.image} alt=""/>
                        </div>
                    </div>

                    <div className="flex flex-col p-2 w-80 gap-4">
                        <div className="flex flex-col items-start gap-2">
                            <div className="font-bold text-xl">{post?.user.username}</div>
                            <SendMessageToThisUserButton
                            user={post?.user}
                            />
                            <div className="w-full overflow-hidden">
                                <div className="p-2 break-words">{post?.title}</div>
                            </div>
                        </div>
                        <div className="self-end">
                            <LikesAndComments
                                post={post}/>
                        </div>
                        <hr/>
                        <Comments/>
                    </div>


                    {/*{post.username === username ?*/}
                    {/*    <div*/}
                    {/*        onClick={() => setShowPostSettingsModal(!showPostSettingsModal)}*/}
                    {/*        className="absolute top-0 right-0 h-6 w-6 bg-slate-200  rounded-full flex justify-center items-center cursor-pointer">*/}
                    {/*        <i className="fas fa-ellipsis-h"></i>*/}
                    {/*    </div>*/}
                    {/*    :*/}
                    {/*    null*/}
                    {/*}*/}

                    {/*{*/}
                    {/*    showPostSettingsModal &&*/}
                    {/*    <PostSettingsModal*/}
                    {/*        post={post}*/}
                    {/*        setShowPostSettingsModal={setShowPostSettingsModal}*/}
                    {/*    />*/}
                    {/*}*/}

                </div>

            </div>
        </div>


    );
};

export default SinglePostPage;
