import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../../Utils/userSlice';
import { useNavigate } from 'react-router';
import bg from "../../assets/img/Signbg.png"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Loader from '../../components/Loader';
import Loading from '../../components/Loading';


const schema = z.object({
    emailId: z.string().email("Invalid email address").min(1, "email is required"),
    password: z.string().min(6, "Password must be at least 6 characters").max(20, "Password can't exceed 20 characters"),
});


function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });
    const [serverError, setServerError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // e.preventDefault();
        // console.log(data)
        setIsLoading(true); // Start loading
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/login`,
                data,
                {
                    withCredentials: true, // Allow cookies
                }
            );
            dispatch(addUser(res.data))
            navigate('/')

        } catch (err) {
            if (err.response && err.response.data) {
                setServerError(err.response.data); // Set server error message
            } else {
                setServerError("An unexpected error occurred. Please try again."); // Fallback error
            }
        } finally {
            setIsLoading(false); // End loading
        }
    }

    return (
        <section className='relative'
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",

            }}
        >
            {isLoading && <Loading />}

            <div className=' mx-auto px-4 sm:px-10 py-5 sm:py-10 h-svh flex justify-center items-center backdrop-blur-md'
            >
                <div className="rounded-[60px] relative w-full max-w-lg bg-white  px-6 py-10 md:py-20 md:px-10">
                    <div className="w-full space-y-16">
                        <div className="text-center space-y-3">
                            <h1 className="text-4xl font-bold font-rubik ">Sign in</h1>
                            <p className="m font-rubik text-sm md:text-base text-gray-500">Sign in below to access your account</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                            <div className="relative">
                                <input type="email" placeholder="Email Address" className=" peer mt-3 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none font-rubik text-base lg:text-lg text-black"   {...register('emailId')} />
                                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform font-rubik text-base lg:text-lg text-black opacity-70 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                                {errors.emailId && (
                                    <p className="text-red-500 text-xs md:text-sm text-center font-rubik">{errors.emailId.message}</p>
                                )}
                            </div>
                            <div className="relative ">
                                <input type="password"      {...register('password')} placeholder="Password" className="peer mt-3 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none font-rubik text-base lg:text-lg text-black" />
                                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform font-rubik text-base lg:text-lg text-black opacity-70 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                                {errors.password && (
                                    <p className="text-red-500 text-xs md:text-sm text-center font-rubik">{errors.password.message}</p>
                                )}
                            </div>
                            <div>
                                <button type='submit' className="w-full rounded-[20px] bg-black px-5 py-4 text-white  focus:outline-none text-lg lg:text-xl font-rubik font-bold">Sign in</button>
                                {serverError && (
                                    <p className="text-red-500 text-xs md:text-sm text-center font-rubik">{serverError}</p>
                                )}
                            </div>


                            <p className="text-center text-sm text-gray-500 font-rubik ">Don&#x27;t have an account yet?
                                <a href="/signup"
                                    className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">{" "}Sign
                                    up
                                </a>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login