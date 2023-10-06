// import {setUserPosts} from "../features/userSlice.tsx";
// import {setAllPosts} from "../features/postsSlice.tsx";
// import {useAppDispatch} from "../hooks.tsx";
//
// const PostUpdateModal = () => {
//
//     const dispatch = useAppDispatch()
//     const updatePost = async (postId: string) => {
//
//         const options: RequestInit = {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json",
//             },
//             body: JSON.stringify({postId}),
//         }
//
//         const token = localStorage.getItem('token')
//
//         if (token !== null) {
//             options.headers = {
//                 ...options.headers,
//                 "authorization": token,
//             }
//         }
//
//         try {
//             const response = await fetch('http://localhost:8000/updatePost', options)
//             const data = await response.json()
//             console.log(data)
//             dispatch(setUserPosts(data.data.userPosts))
//             dispatch(setAllPosts(data.data.allPosts))
//
//         } catch (error) {
//             console.log(error)
//         }
//     }
//
//
//     return (
//         <div className={"relative flex justify-center items-start"}>
//             <div
//                 className={"fixed top-0 left-0 right-0 w-full h-full backdrop-blur-sm bg-black bg-opacity-50 z-20"}>
//             </div>
//             <div
//                 className={"bg-slate-50 h-96 w-96  flex-col gap-4 absolute top-0 z-30 rounded"}>
//                 <button>Update</button>
//             </div>
//         </div>
//     );
// };
//
// export default PostUpdateModal;
