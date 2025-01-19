import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userImg from "../../Utils/constant"
import axios from 'axios';
import { removeUser } from '../../Utils/userSlice';
import { Link, useNavigate } from 'react-router';
import homeSvg from "../../assets/svg/home.svg"
import profileSvg from "../../assets/svg/profile.svg"
import requestSvg from "../../assets/svg/requested.svg"
import connectionSvg from "../../assets/svg/connected.svg"
import manSvg from "../../assets/svg/Man.svg"
import dropwown from "../../assets/svg/dropdown.svg"
import logoutSvg from "../../assets/svg/logout.svg"


function Header() {
    const [menu, setMenu] = useState(false)
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleMenu = () => {
        setMenu(!menu);
    }
    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`, {}, { withCredentials: true });
            dispatch(removeUser());
            return navigate("/login")

        } catch (err) {
            console.error(err);
        }

        // dispatch(addUser(null));
    }
    const navLinks = [
        {
            id: 1,
            name: "Home",
            link: "/",
            icon: homeSvg
        },
        {
            id: 1,
            name: "Profile",
            link: "/",
            icon: profileSvg
        },
        {
            id: 1,
            name: "Request",
            link: "/request",
            icon: requestSvg
        },
        {
            id: 1,
            name: "Connection",
            link: "/connection",
            icon: connectionSvg
        },
    ]
    return (

        <nav className='max-w-screen-2xl mx-auto px-4 sm:px-10 py-5 sm:py-10 flex bg-black justify-between items-center'>
            <Link to="/">
                <h3 className="leading-none text-2xl md:text-4xl  font-borel  whitespace-nowrap text-white ">DevMate</h3>
            </Link>
            <div className='bg-[#131212] hidden lg:flex rounded-[50px] py-5 px-14  border-[2px] border-white border-opacity-10  gap-10 '>
                {navLinks.map((nav, idx) => (
                    <Link to={nav.link} className='flex flex-col items-center gap-1'>
                        <img src={nav.icon} alt="" />
                        <h2 className='text-white font-rubik text-base' >{nav.name}</h2>
                    </Link>
                ))}
            </div>
            <div className='bg-[#131212] flex gap-3 rounded-full justify-center items-center pr-5 b border-white border-opacity-10 border-l-0 border-[2px] relative'>
                <div className='flex size-[70px] rounded-full border-[2px] bg-[#131212] border-white border-opacity-10 overflow-hidden'>
                    <img src={manSvg} alt="" />
                </div>
                <div>
                    <h2 className='font-rubik text-white text-sm leading-[4px]'>{user ? user.firstName : "John Doe"}</h2>
                    <span className='font-rubik text-white text-[10px] leading-[10px]'>{user ? user.emailId : "John@doe.com"}</span>
                </div>
                <button onClick={handleMenu} className={`duration-300  transition-all  ${menu ? "-rotate-180" : ""} `}>
                    <img src={dropwown} alt="" />
                </button>
                <div className={` ${menu ? "block" : "hidden"} absolute -bottom-16 border-[2px] bg-[#131212] border-white border-opacity-10 py-4 px-5 right-0 flex  rounded-[50px] items-center gap-2`} >
                    {/* <h3 className='text-white text-xs'>{user ? user.firstName : "Guest"}</h3>

                        <h3 className='text-white text-xs'>{user ? user.emailId : "Guest"}</h3> */}

                    <img src={logoutSvg} alt="" />
                    <h3 className=' font-rubik text-white text-sm cursor-pointer' onClick={handleLogout}>Logout</h3>

                </div>
            </div>
        </nav>

    )
}

export default Header