export interface Post {
    _id: string,
    username: string,
    userId: string,
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
    username: string | undefined,
    image: string | undefined,
    bio: string | undefined,
    token: string | null,
    autoLogin: boolean,
    userPosts: Post[] | undefined,
    loadingState: 'idle' | 'loading' | 'error',
    loadingMessage: string | undefined,
}

export interface PostsInitialState {
    posts: Post[] | undefined,
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


