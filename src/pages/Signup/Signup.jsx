import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GenderCheckbox from './GenderCheckbox';
import useSignup from '../../hooks/useSignup';

const Signup = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign up for an account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div>
                        <label for="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input id="full_name" name="fullName" type="text" autocomplete="name" value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
                    </div>
                    <div>
                        <label for="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input id="username" name="username" type="text" autocomplete="username" value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
                    </div>
                    <div>
                        <label for="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input id="password" name="password" type="password" autocomplete="new-password" value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
                    </div>
                    <div>
                        <label for="confirm_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input id="confirm_password" name="confirmPassword" type="password" autocomplete="new-password" value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
                    </div>

                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                        </button>
                    </div>
                </form>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="font-medium text-green-600 hover:text-green-500">Sign in</Link>
                </p>
            </div>
        </div>

    )
}

export default Signup