import React from 'react'
import "./loader.css"

function Loader() {
  return (
    <section className='bg-black'>
      <main className='mx-auto max-w-screen-2xl  px-4 sm:px-10 py-5 sm:py-16 flex justify-center items-center h-svh '>
        <div className="loader">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
          <div className="bar4"></div>
          <div className="bar5"></div>
          <div className="bar6"></div>
          <div className="bar7"></div>
          <div className="bar8"></div>
          <div className="bar9"></div>
          <div className="bar10"></div>
          <div className="bar11"></div>
          <div className="bar12"></div>
        </div>
      </main>
    </section>
  )
}

export default Loader