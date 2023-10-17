const SinglePostModal = () => {

    return (
        <div className={"relative flex justify-center items-start w-full h-full"}>
            <div
                className={"fixed top-0 left-0 right-0 w-full h-full backdrop-blur-sm bg-black bg-opacity-50 z-20"}>
            </div>
            <div>
                <div
                    className={"bg-slate-50 h-11/12 w-11/12 flex-col gap-4 absolute top-0 z-30 rounded"}>
                    <div>single post modal</div>
                </div>
            </div>

        </div>
    );
};

export default SinglePostModal;
