import React from 'react'
import heroImg from "../../assets/img/HeroImg.png"
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import Feed from '../Feed/Feed'


function Home() {
  // Fetch the user object from the Redux store
  const user = useSelector((store) => store.user);

  // Determine the logged-in state based on the user object
  const isLoggedIn = user && user._id; // Check for a valid property like `id`
  

  return (
    <>
      {isLoggedIn ? <Feed /> : (
        < div className='mx-auto max-w-screen-2xl px-4 sm:px-10 py-5 sm:py-16 bg- bg-black ' >
          <div className='space-y-8'>
            <h1 className='text-3xl md:text-4xl lg:text-6xl font-rubik text-white font-bold text-center max-w-[745px] mx-auto'>Swipe Right on Your Next Great Collaboration</h1>
            <div className='flex gap-5 md:gap-8 font-rubik text-lg font-medium text-white justify-center'>
              <Link to="/signup">
                <button className='border-2 border-white  rounded-[20px] py-3 px-4 md:px-6 w-32 md:w-40'>Register</button>
              </Link>
              <Link to="/login">
                <button className='text-black rounded-[20px] bg-white py-3 px-4 md:px-6 w-32 md:w-40'>
                  Login
                </button>
              </Link>
            </div>
            <div className=''>
              <img src={heroImg} className='mx-auto' alt="" />
            </div>
          </div>
        </div >
      )
      }
    </>
  )
}

export default Home