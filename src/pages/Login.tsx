import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div className="bg-cover bg-slate-50 h-screen flex justify-center items-center">
            <div className="flex flex-col gap-4 bg-slate-50 p-4 pt-10 rounded-xl w-96 items-center shadow-2xl">
                <div className="flex flex-col gap-6 p-4 rounded justify-center items-center">
                    <input
                        className="border bg-slate-50 border-slate-400 placeholder-slate-300 p-1 rounded-l outline-none"
                        // ref={usernameRef}
                        type="text" placeholder="username"/>
                    <input
                        className="border border-slate-400 bg-slate-50 placeholder-slate-300 p-1 rounded-l outline-none"
                        // ref={passwordRef}
                        type="password" placeholder="password"/>
                    <button
                        className="bg-blue-500 text-slate-50 font-bold uppercase rounded hover:bg-purple-700 px-4 py-1">Login
                    </button>
                    <div className="flex flex-col items-center gap-2">
                        <div>Don't have an account?</div>
                        <Link to="/register" className="text-blue-500 font-bold">Sign in</Link>
                    </div>


                    <div className="h-6 flex justify-center items-center text-center">
                        {/*{error &&*/}
                        {/*    <div*/}
                        {/*        className={"text-red-600"}*/}
                        {/*    >{error}</div>*/}
                        {/*}*/}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
