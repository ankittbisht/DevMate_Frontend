import React, { useEffect } from 'react'
import Usercard from '../../components/Usercard'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { addFeed } from '../../Utils/feedSlice';
import { Link, useLocation } from 'react-router';
import EmptyState from '../../components/EmptyState';

function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const location = useLocation();


  const getFeed = async () => {
    if (feed) return
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/feed`, { withCredentials: true })
      // console.log("at async await")

      // console.log(res.data.data)
      dispatch(addFeed(res.data.data))

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getFeed()
    // console.log("feed page useEffect")
  }, [feed, location.pathname])

  return (

    <section className='mx-auto max-w-screen-2xl px-4 sm:px-10 py-8 sm:py-16  bg-black overflow-hidden '>
      <div className='space-y-7 md:space-y-14'>

        {!Array.isArray(feed) || feed.length === 0 ? (
          <EmptyState text="Oops , No profile Found!" />
        ) : (<><h1 className='text-3xl md:text-4xl lg:text-6xl font-rubik text-white font-bold text-center max-w-[745px] mx-auto'>
          Collaborate or Pass? Your Call!</h1>
          <main className='relative max-w-4xl mx-auto'>
            <div className="absolute top-0 left-0 z-0 blur-sm -rotate-12">
              {Array.isArray(feed) && feed[1] && <Usercard user={feed[1]} />}
            </div>
            <div className='relative z-10'>
              {feed && (
                <Usercard user={feed[0]} />
              )}
            </div>
            <div className="absolute top-0 right-0 z-0 blur-sm rotate-12">
              {Array.isArray(feed) && feed[2] && <Usercard user={feed[2]} />}
            </div>
          </main></>)}

      </div>
    </section>
  )
}

export default Feed