export interface Post {
    _id: string,
    user: string | User,
    date: string,
    image: string,
    title: string,
    comments: Comment [],
    likes: Like [],
}

export interface User {
    _id: string,
    username: string,
    email: string,
    image: string,
    bio: string,
    posts: Post[],
}

export interface Comment {
    user: User,
    post: Post,
    date: string | undefined,
    comment: string | undefined,
}

export interface Like {
    user: User,
    post: Post,
}

export interface UserInitialState {
    user: undefined | User,
    token: string | null,
    autoLogin: boolean,
    loadingState: 'idle' | 'loading' | 'error',
    loadingMessage: string | undefined,
}

export interface PostsInitialState {
    posts: Post[] | undefined,
    userPosts: Post[] | undefined,
    singlePost: Post | undefined,
    selectedPost: Post | undefined,
    comments: Comment [] | undefined,
    postUpdateModal: boolean,
}

export interface UsersInitialState {
    users: User[] | undefined,
    loadingState: 'idle' | 'loading' | 'error',
    loadingMessage: string | undefined,
}


