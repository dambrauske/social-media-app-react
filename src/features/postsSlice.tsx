import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import {Post, PostsInitialState} from "../interfaces.tsx";

export const postsSlice: Slice<PostsInitialState> = createSlice({
        name: "posts",
        initialState: {
            posts: undefined,
            singlePost: undefined,
            selectedPost: undefined,
            comments: undefined,
            postUpdateModal: false,
        } as PostsInitialState,
        reducers: {
            setAllPosts: (state, action: PayloadAction<Post[]>) => {
                state.posts = action.payload
            },
            setSelectedPost: (state, action: PayloadAction<Post>) => {
                state.selectedPost = action.payload
            },
            setSinglePost: (state, action: PayloadAction<Post>) => {
                state.singlePost = action.payload
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
    setSelectedPost,
    setComments,
    setSinglePost,
} = postsSlice.actions

export default postsSlice.reducer
