
const LikesAndComments = () => {
    return (
        <div className="flex items-center gap-4">

            <div className="flex items-center gap-1">
                <i className="far fa-heart"></i>
                <div>30</div>
            </div>

            <div className="flex items-center gap-1">
                <i className="far fa-comment-dots"></i>
                <div>5</div>
            </div>

        </div>
    );
};

export default LikesAndComments;
