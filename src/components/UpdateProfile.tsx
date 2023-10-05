import UpdateImage from "./UpdateImage.tsx";
import UpdatePassword from "./UpdatePassword.tsx";
import UpdateBio from "./UpdateBio.tsx";

const UpdateProfile = () => {

    return (
        <div className="flex flex-col gap-8">
            <UpdateImage/>
            <UpdatePassword/>
            <UpdateBio/>
        </div>
    );
};

export default UpdateProfile;
