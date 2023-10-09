
const CommentSingle = () => {


    return (
        <div className="p-2 flex bg-slate-50 gap-2 rounded">
            <div className="w-10 h-10">
                {/*<img className="w-full h-full rounded-full" src={image} alt=""/>*/}
            </div>

            <div className="flex flex-col">
                <div>username</div>
                <div>Comment text</div>
            </div>

        </div>
    );
};

export default CommentSingle;
