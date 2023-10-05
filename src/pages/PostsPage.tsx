import Navbar from "../components/Navbar.tsx";
import {RefObject, useRef, useState} from "react";
import {validateImage, validateTitle} from "../helperFunctions.tsx";
import AllPosts from "../components/AllPosts.tsx";

const PostsPage = () => {

    const titleRef: RefObject<HTMLInputElement> = useRef(null)
    const imageRef: RefObject<HTMLInputElement> = useRef(null)
    const [imageError, setImageError] = useState<string | null>(null);
    const [titleError, setTitleError] = useState<string | null>(null);
    const [postSuccessMessage, setPostSuccessMessage] = useState<string | null>(null)

    const addPost = async () => {

        setPostSuccessMessage(null)

        const image = imageRef.current?.value
        const title = titleRef.current?.value

        const options: RequestInit = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({image, title}),
        }

        const token = localStorage.getItem('token')

        if (token !== null) {
            options.headers = {
                ...options.headers,
                "authorization": token,
            }
        }


        try {
            const response = await fetch('http://localhost:8000/addPost', options)
            const data = await response.json()
            console.log(data)
            setPostSuccessMessage('Post added successfully')

            setTimeout(() => {
                setPostSuccessMessage(null)
            }, 1000)

        } catch (error) {
            console.log(error)
        }

        if (imageRef.current) {
            imageRef.current.value = ''
        }
        if (titleRef.current) {
            titleRef.current.value = ''
        }


    }

    return (
        <div>
            <Navbar/>
            <div className="p-4 bg-slate-50">
                <div className="bg-slate-200 p-2 rounded flex flex-col w-1/3 gap-2">
                    <div>Create post</div>
                    <input
                        ref={titleRef}
                        onBlur={() => validateTitle(titleRef.current?.value, setTitleError)}
                        type="text" placeholder="title"/>

                    <div className="h-4">
                        {titleError &&
                            <div className="text-xs text-red-600">{titleError}</div>
                        }

                    </div>
                    <input
                        ref={imageRef}
                        onBlur={() => validateImage(imageRef.current?.value, setImageError)}
                        type="url" placeholder="image"/>

                    <div className="h-4">
                        {imageError &&
                            <div className="text-xs text-red-600">{imageError}</div>
                        }
                        {postSuccessMessage &&
                            <div className="text-xs text-green-600">{postSuccessMessage}</div>
                        }

                    </div>
                    <button
                        onClick={addPost}
                        className="bg-slate-300 p-1">create post
                    </button>
                </div>
                <AllPosts/>
            </div>


        </div>
    );
};

export default PostsPage;
