import LikesAndComments from "../components/LikesAndComments.tsx";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import {useEffect} from "react";
import {setComments, setSelectedPost, setSinglePost} from "../features/postsSlice.tsx";
import Comments from "../components/Comments.tsx";
import Navbar from "../components/Navbar.tsx";
import socket from "../socket.tsx";


const SinglePostPage = () => {
    const { postId } = useParams()

    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.user.token)
    const post = useAppSelector(state => state.posts.singlePost)

    console.log('post', post)

    useEffect(() => {
        dispatch(setSelectedPost(postId))
        if (token === null) {
            throw new Error('Token not available')
        }

        socket().emit('fetchSinglePost', ({token, postId}))
        socket().on('fetchedSinglePost', (data) => {
            console.log('fetchedSinglePost', data)
            dispatch(setSinglePost(data.post))
            dispatch(setComments(data.postComments))
        })

        return () => {
            socket().off('fetchedSinglePost');
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

                    <div className="flex flex-col p-2 w-72 gap-4">
                        <div className="flex flex-col items-start gap-2">
                            <div className="font-bold text-xl">{post?.user.username}</div>
                            <div>{post?.title}</div>
                        </div>
                        <div className="self-end">
                            <LikesAndComments/>
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
