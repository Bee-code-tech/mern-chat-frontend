import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { auth, provider } from "./ConfigFirebase";
import { signInWithPopup } from "firebase/auth";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    // code for sign in with google
    const navigate = useNavigate()

    const handleClick = (e) => {
        // e.preventDefault();
        // signInWithPopup(auth, provider)
        //     .then((res) => {
        //         console.log(res, "userData")
        //         navigate('/')
        //     })
        //     .catch((err) => {
        //         console.error(err, "error")
        //     })
    }


    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((userData) => {
    //         console.log(userData)
    //         if (userData?.email) {
    //             navigate('/')
    //         }
    //     })
    //     return () => unsubscribe()
    // }, [])


    return (
        <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Welcome back
                    </h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-6">
                            <label for="username" >Username / email address</label>
                            <input id="username" name="username" type="text" autocomplete="username" required className="appearance-none rounded-none relative block w-full mt-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Username" value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label for="password" className="">Password</label>
                            <input id="password" name="password" type="password" autocomplete="current-password" required className="appearance-none mt-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    {/* <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                            <label for="remember_me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-green-600 hover:text-green-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div> */}

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                           

                            {loading ? <span className='loading loading-spinner '></span> : "Log in account"}

                        </button>
                    </div>
                </form>

               
{/* 
                <p className="mt-2 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">Sign up</Link>
                </p> */}
            </div>
        </div>

    )
}

export default Login