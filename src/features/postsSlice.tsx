import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import {Post, PostsInitialState, Comment} from "../interfaces.tsx";

export const postsSlice: Slice<PostsInitialState> = createSlice({
        name: "posts",
        initialState: {
            posts: undefined,
            userPosts: undefined,
            selectedUserPosts: undefined,
            selectedPost: undefined,
            comments: undefined,
            postUpdateModal: false,
        } as PostsInitialState,
        reducers: {
            setAllPosts: (state, action: PayloadAction<Post[]>) => {
                state.posts = action.payload
            },
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
                if (state.userPosts) {
                    const postIndex = state.userPosts.findIndex(post => post._id === postId)
                    if (postIndex !== -1) {
                        state.userPosts[postIndex] = updatedPost
                    }
                }
                if (state.selectedUserPosts) {
                    const postIndex = state.selectedUserPosts.findIndex(post => post._id === postId)
                    if (postIndex !== -1) {
                        state.selectedUserPosts[postIndex] = updatedPost
                    }
                }
            },
            setSelectedPost: (state, action: PayloadAction<Post>) => {
                state.selectedPost = action.payload
            },
            setUserPosts: (state, action: PayloadAction<Post[] | undefined>) => {
                state.userPosts = action.payload
            },
            setComments: (state, action: PayloadAction<Comment[]>) => {
                state.comments = [...action.payload].sort((objA, objB) => {
                    const dateA = objA.createdAt ? new Date(objA.createdAt) : new Date(0); // Provide a default date or handle the case where date is undefined
                    const dateB = objB.createdAt ? new Date(objB.createdAt) : new Date(0);
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
    setSelectedPost,
    setComments,
    updateSinglePost,
    setUserPosts,
    setSelectedUserPosts
} = postsSlice.actions

export default postsSlice.reducer
