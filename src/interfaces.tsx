export interface Post {
    _id: string,
    user: User,
    createdAt: string,
    image: string,
    title: string,
    comments: Comment [],
    likes: Like [],
}

export interface User {
    _id: string,
    username: string,
    image: string,
    bio: string,
    posts: Post[],
}

export interface Comment {
    _id: string,
    user: User,
    post: Post,
    createdAt: string,
    comment: string | undefined,
}

export interface Like {
    user: string,
    post: Post,
    _id: string,
}

export interface Chat {
    _id: string,
    participants: User[],
    messages: Message[],
    createdAt: string,
}

export interface Message {
    _id: string,
    chat: Chat,
    participants: User[]
    sentBy: User,
    message: string,
    createdAt: string,
}

export interface UpdateProfileForm {
    image: string | null,
    bio: string | null,
    password: string | null,
    newPassword: string | null,
}

export interface LoginForm {
    username: string | undefined,
    password: string | undefined,
}

export interface PostForm {
    title: string | undefined,
    image: string | undefined,
}

export interface MessageForm {
    message: string | undefined,
}

export interface RegisterForm {
    username: string | undefined,
    email: string | undefined,
    password: string | undefined,
    password2: string | undefined,
}

export interface CommentForm {
    comment: string | null
}

export interface UserInitialState {
    user: undefined | User,
    token: string | null,
    autoLogin: boolean,
    loadingState: 'idle' | 'loading' | 'error',
    loadingMessage: string | undefined,
}

export interface ChatsInitialState {
    chats: Chat[] | undefined,
    selectedChat: Chat | undefined,
}

export interface PostsInitialState {
    posts: Post[] | undefined,
    userPosts: Post[] | undefined,
    selectedPost: Post | undefined,
    selectedUserPosts: Post[] | undefined,
    comments: Comment [] | undefined,
    postUpdateModal: boolean,
}

export interface UsersInitialState {
    users: User[] | undefined,
    selectedUser: User | undefined,
    loadingState: 'idle' | 'loading' | 'error',
    loadingMessage: string | undefined,
}


