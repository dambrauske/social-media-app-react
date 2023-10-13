import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import {Post, PostsInitialState} from "../interfaces.tsx";

export const postsSlice: Slice<PostsInitialState> = createSlice({
        name: "posts",
        initialState: {
            posts: undefined,
            userPosts: undefined,
            selectedUserPosts: undefined,
            singlePost: undefined,
            // selectedPost: undefined,
            comments: undefined,
            postUpdateModal: false,
        } as PostsInitialState,
        reducers: {
            setAllPosts: (state, action: PayloadAction<Post[]>) => {
                state.posts = action.payload
            },
            // setSelectedPost: (state, action: PayloadAction<Post>) => {
            //     state.selectedPost = action.payload
            // },
            setSelectedUserPosts: (state, action: PayloadAction<Post[]>) => {
                state.selectedUserPosts = action.payload
            },
            updateSinglePost: (state, action: PayloadAction<Post>) => {
                const updatedPost = action.payload
                const postId = updatedPost._id
                if (state.posts) {
                    const postIndex = state.posts.findIndex(post => post._id === postId)
                    if (postIndex !== -1) {
                        state.posts[postIndex] = updatedPost
                    }
                }
            },
            setSinglePost: (state, action: PayloadAction<Post>) => {
                state.singlePost = action.payload
            },
            setUserPosts: (state, action: PayloadAction<Post[] | undefined>) => {
                state.userPosts = action.payload
            },
            setComments: (state, action: PayloadAction<Comment[]>) => {
                state.comments = [...action.payload].sort((objA, objB) => {
                    const dateA = objA.date ? new Date(objA.date) : new Date(0); // Provide a default date or handle the case where date is undefined
                    const dateB = objB.date ? new Date(objB.date) : new Date(0);
                    return dateB.getTime() - dateA.getTime();
                });
            },
            setPostUpdateModal: (state, action: PayloadAction<boolean>) => {
                state.postUpdateModal = action.payload
            },
        },
    }
)
export const {
    setAllPosts,
    setPostUpdateModal,
    // setSelectedPost,
    setComments,
    setSinglePost,
    updateSinglePost,
    setUserPosts,
    setSelectedUserPosts
} = postsSlice.actions

export default postsSlice.reducer
