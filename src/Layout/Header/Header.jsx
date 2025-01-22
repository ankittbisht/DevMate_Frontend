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
import Loading from '../../components/Loading';
import { addFeed } from '../../Utils/feedSlice';


function Header() {
    const [menu, setMenu] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleMenu = () => {
        setMenu(!menu);
    }
    const handleLogout = async () => {
        setIsLoading(true)
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`, {}, { withCredentials: true });
            dispatch(removeUser());
            dispatch(addFeed(null))
            return navigate("/login")

        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false)
        }

        dispatch(addUser(null));
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
    const handleProfileClick = () => {
        navigate("/")

    };

    const handleConnectionClick = () => {
        navigate("/connection")

    };

    const handleRequestClick = () => {
        navigate("/request")

    };
    const menuItems = [
        { id: 4, label: "Logout", icon: logoutSvg, action: handleLogout },
        { id: 1, label: "Profile", icon: profileSvg, action: handleProfileClick },
        { id: 2, label: "Connection", icon: connectionSvg, action: handleConnectionClick },
        { id: 3, label: "Request", icon: requestSvg, action: handleRequestClick },

    ];



    return (
        <section className='bg-black'>
            {loading && <Loading />}
            <nav className='max-w-screen-2xl mx-auto px-4 sm:px-10 py-5 sm:py-10 flex  justify-between items-center'>
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
                    <div className='flex size-14 md:size-[70px] rounded-full border-[2px] bg-[#131212] border-white border-opacity-10 overflow-hidden'>
                        <img src={manSvg} alt="" />
                    </div>
                    <div>
                        <h2 className='font-rubik text-white text-sm leading-[4px]'>{user ? user.firstName : "John Doe"}</h2>
                        <span className='font-rubik text-white text-[10px] leading-[10px]'>{user ? user.emailId : "John@doe.com"}</span>
                    </div>
                    <button onClick={handleMenu} className={`duration-300  transition-all  ${menu ? "-rotate-180" : ""} `}>
                        <img src={dropwown} alt="" />
                    </button>
                    <div className={` ${menu ? "block" : "hidden"} absolute top-20  right-0 space-y-2`} >
                        {menuItems.map((item, idx) => (
                            <div onClick={() => {
                                item.action();
                                handleMenu();
                            }} className={` ${item.id !== 4 ? "lg:hidden" : ""} border-[2px] bg-[#131212] border-white border-opacity-10 py-3 md:py-4 px-5 flex  rounded-[50px] items-center gap-2 justify-center`}>
                                <img src={item.icon} alt="" className='size-5 md:size-auto' />
                                <h3 className=' font-rubik text-white text-xs md:text-sm cursor-pointer' >{item.label}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </section>
    )
}

export default Header