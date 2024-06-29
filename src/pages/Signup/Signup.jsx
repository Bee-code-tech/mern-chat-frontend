import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GenderCheckbox from './GenderCheckbox';
import useSignup from '../../hooks/useSignup';

const Signup = () => {
    const [inputs, setInputs] = useState({
    
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
     
    });

    const { loading, signup } = useSignup();

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        await signup(inputs);
    };
    return (
        <div className="min-h-screen  overflow-y-auto flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-14 text-center text-3xl font-extrabold text-gray-900">
                        Create an account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                   
                    <div>
                        <label for="username" className="block text-lg font-medium text-gray-700">Username</label>
                        <input id="username" placeholder='Username' name="username" type="text" autocomplete="username" value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })} required className="appearance-none rounded-none mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
                    </div>
                    <div>
                        <label for="email" className="block text-lg font-medium text-gray-700">Email</label>
                        <input id="email" name="email" placeholder='Email' type="text" autocomplete="email" value={inputs.email}
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })} required className="appearance-none rounded-none  mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
                    </div>
                    <div>
                        <label for="password" className="block text-lg font-medium text-gray-700">Password</label>
                        <input id="password" name="password" placeholder='Password' type="password" autocomplete="new-password" value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })} required className="appearance-none rounded-none   mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
                    </div>
                    <div>
                        <label for="confirm_password" className="block text-lg font-medium text-gray-700">Confirm Password</label>
                        <input id="confirm_password" name="confirmPassword" placeholder='Confirm Password' type="password" autocomplete="new-password" value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} required className="appearance-none rounded-none  mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm rounded-b-md " />
                    </div>

                

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 border-b-md marker:">
                            {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                        </button>
                    </div>
                </form>
              
            </div>
        </div>

    )
}

export default Signup