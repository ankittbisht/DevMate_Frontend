import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection, removeConnection } from '../../Utils/connectionSlice'

import maleSvg from "../../assets/svg/male.svg"
import johnImg from "../../assets/img/john.png"
import linkedin from "../../assets/svg/linkedin.svg"
import githubSvg from "../../assets/svg/github.svg"
import EmptyState from '../../components/EmptyState'
import crossIcon from "../../assets/svg/cross.svg"
import Loaderforcard from '../../components/Loaderforcard'

function Connection() {
    const arr = Array.from({ length: 5 }, (_, idx) => idx);
    const connection = useSelector((store) => store.connection)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const getConnections = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/connection`, { withCredentials: true })
            dispatch(addConnection(res.data.data));
            // console.log(res.data.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getConnections()
    }, [])


    const handleremoveConnection = async (_id) => {
        setLoading(true)
        try {
            const res = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/request/ignored/` + _id, {}, { withCredentials: true })
            dispatch(removeConnection(_id))
        } catch (err) {
            console.error(err)
        } finally{
            setLoading(false)
        }
    }

    // if (!connection) {
    //     return
    // }

    return (
        <div className='max-w-screen-2xl mx-auto px-4 sm:px-10 py-7 sm:py-14 bg-black space-y-14'>

            {!Array.isArray(connection) || connection.length === 0 ? (<EmptyState text="No friends in your repository yet? Time to push some connections!" />) :
                (
                    <>
                        <h1 className='text-3xl md:text-4xl lg:text-6xl font-rubik text-white font-bold text-center max-w-[745px] mx-auto'>
                            Your Engineering Squad
                        </h1>
                        <div className={` max-w-[950px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6`}>
                            {connection.map((item, i) => (
                                <div className='bg-[#141414] p-6 rounded-[60px] border-4 border-white border-opacity-20 max-w-[450px] space-y-9 mx-auto relative overflow-hidden    '>
                                    {loading && <Loaderforcard/>}
                                    <div className='imageBox rounded-[40px] border-2 border-white border-opacity-20 flex  flex-col justify-center relative bg-black pt-10 items-center '>
                                        <div className='rounded-full size-56 flex justify-center items-center overflow-hidden'>
                                            <img src={johnImg} className='object-cover size-56' alt="" />
                                        </div>
                                        <div className='absolute left-1/2 -translate-x-1/2 -bottom-[1px]'>
                                            <h2 className='text-white inline-block font-rubik text-base md:text-lg lg:text-xl font-medium  py-3 md:py-4 px-5 md;px-9 rounded-t-[20px] border-b-0 border-white text border-2 border-opacity-10 bg-[#141414] whitespace-nowrap'>
                                                Software Engineer
                                            </h2>

                                        </div>
                                        <button onClick={() => handleremoveConnection(item._id)} className='absolute top-6 left-6'>
                                            <img src={crossIcon} alt="" />
                                        </button>
                                        <div className='absolute top-6 right-6'>
                                            <img src={maleSvg} alt="" />
                                        </div>
                                    </div>
                                    <div className='contentBox '>
                                        <div className='flex justify-between items-center '>
                                            <h2 className=' text-white font-rubik font-bold text-xl md:text-2xl lg:text-[28px]'>{item.firstName} {item.lastName} </h2>
                                            <div className='flex gap-2'>
                                                <a href="http://" target="_blank" rel="noopener noreferrer">
                                                    <img src={linkedin} alt="" />
                                                </a>
                                                <a href="http://" target="_blank" rel="noopener noreferrer">
                                                    <img src={githubSvg} alt="" />
                                                </a>
                                            </div>
                                        </div>
                                        <div><h3 className='font-rubik text-white  text-sm md:text-base'>22 Years</h3></div>
                                        <p className='text-white font-rubik  text-xs md:text-sm'>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Connection