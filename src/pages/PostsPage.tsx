import Navbar from "../components/Navbar.tsx";
import AllPosts from "../components/AllPosts.tsx";
import AddNewPost from "../components/AddNewPost.tsx";

const PostsPage = () => {

    return (
        <div>
            <Navbar/>
            <div className="p-4 bg-slate-50">
                <AddNewPost/>
                <AllPosts/>
            </div>


        </div>
    );
};

export default PostsPage;
