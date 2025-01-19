import React from 'react'
import noUser from "../assets/svg/noUser.svg"

function EmptyState({ text }) {
    return (
        <div className='flex flex-col justify-center items-center   '>
            <div>
                <img src={noUser} alt="" />
            </div>
            <h1 className='text-2xl md:text-3xl lg:text-5xl font-rubik text-white font-bold text-center max-w-[745px] mx-auto'>
                {text}
            </h1>
        </div>
    )
}

export default EmptyState