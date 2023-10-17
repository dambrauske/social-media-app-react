import Navbar from "../components/Navbar.tsx";
import AllPosts from "../components/posts/AllPosts.tsx";
import AddNewPost from "../components/posts/AddNewPost.tsx";

const PostsPage = () => {

    return (
        <div>
            <Navbar/>
            <div className="p-4 bg-slate-50 flex flex-col items-center justify-center">
                <AddNewPost/>
                <AllPosts/>
            </div>


        </div>
    );
};

export default PostsPage;
