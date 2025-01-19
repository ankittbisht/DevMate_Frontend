import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../../Utils/userSlice';
import { useNavigate } from 'react-router';
import bg from "../../assets/img/Signbg.png"
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function Signup() {

    // Define Zod schema for validation
    const schema = z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        emailId: z.string().email("Invalid email address"),
        password: z.string()
            .min(6, "Password must be at least 6 characters long")
            .max(20, "Password cannot exceed 20 characters"),
    });

    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (data) => {
        try {

            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/signup`, data, {
                withCredentials: true
            });

            setErrorMessage(""); // Clear any previous error
            console.log(res.data); // Handle success response
            dispatch(addUser(res.data))
            navigate('/')
        } catch (err) {
            setErrorMessage(err.response?.data?.error || "Something went wrong!");

            console.error(err);
        } finally {
            reset();
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


            <div className='max-w-screen-2xl mx-auto px-4 sm:px-10 py-5 sm:py-10 h-svh backdrop-blur-md flex justify-center items-center '
            >
                <div className="rounded-[60px] relative w-full max-w-lg bg-white  px-6 py-10 md:py-10 md:px-10">
                    <div className="w-full space-y-12">
                        <div className="text-center space-y-3">
                            <h1 className="text-4xl font-bold font-rubik ">Sign Up</h1>
                            <p className="m font-rubik text-sm md:text-base text-gray-500">Sign up below to create your account</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                            <div className="relative">
                                <input type="text"

                                    required
                                    {...register("firstName")} placeholder="Email Address" className=" peer mt-3 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none font-rubik text-base lg:text-lg text-black" />
                                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform font-rubik text-base lg:text-lg text-black opacity-70 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">First Name</label>
                                {errors.firstName && (
                                    <p className="text-red-500 font-rubik text-xs md:text-sm">{errors.firstName.message}</p>
                                )}
                            </div>
                            <div className="relative">
                                <input type="text"

                                    required
                                    {...register("lastName")} placeholder="Email Address" className=" peer mt-3 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none font-rubik text-base lg:text-lg text-black" />
                                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform font-rubik text-base lg:text-lg text-black opacity-70 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Last Name</label>
                                {errors.lastName && (
                                    <p className="text-red-500 font-rubik text-xs md:text-sm">{errors.lastName.message}</p>
                                )}

                            </div>

                            <div className="relative">
                                <input
                                    type="email"
                                    {...register("emailId")} placeholder="Email Address" className=" peer mt-3 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none font-rubik text-base lg:text-lg text-black" />
                                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform font-rubik text-base lg:text-lg text-black opacity-70 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                                {errors.emailId && (
                                    <p className="text-red-500  text-xs font-rubik md:text-sm">{errors.emailId.message}</p>
                                )}
                            </div>
                            <div className="relative ">
                                <input type="password"
                                    {...register("password")}
                                    placeholder="Password" className="peer mt-3 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none font-rubik text-base lg:text-lg text-black" />
                                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform font-rubik text-base lg:text-lg text-black opacity-70 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                                {errors.password && (
                                    <p className="text-red-500  text-xs font-rubik md:text-sm">{errors.password.message}</p>
                                )}
                            </div>

                            <button type='submit' className="w-full rounded-[20px] bg-black px-5 py-4 text-white  focus:outline-none text-lg lg:text-xl font-rubik font-bold">Sign Up</button>

                            <p className="text-center text-sm text-gray-500 font-rubik ">Already have an account?
                                <a href="/login"
                                    className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">{" "}Sign
                                    in
                                </a>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Signup