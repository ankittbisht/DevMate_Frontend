import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReviewRequest, removeReviewRequest } from '../../Utils/reviewRequestSlice';
import maleSvg from "../../assets/svg/male.svg"
import johnImg from "../../assets/img/john.png"
import linkedin from "../../assets/svg/linkedin.svg"
import githubSvg from "../../assets/svg/github.svg"
import acceptSvg from "../../assets/svg/accept.svg"
import rejectSvg from "../../assets/svg/reject.svg"
import EmptyState from '../../components/EmptyState';
import Loaderforcard from '../../components/Loaderforcard';


function ConnectionReq() {
    // const pendingRequest = Array.from({ length: 5 }, (_, idx) => idx);
    const [loader, setLoader] = useState(false)

    const pendingRequest = useSelector((store) => store.reviewRequest);
    const dispatch = useDispatch();

    const searchRequest = async () => {

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/request/received`, {
                withCredentials: true
            }
            )
            console.log(res.data.connectionRequest)
            dispatch(addReviewRequest(res.data.connectionRequest))

        } catch (err) {
            console.error(err)
        }
    }

    const reviewRequest = async (status, _id) => {
        setLoader(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/request/review/` + status + "/" + _id, {}, { withCredentials: true })
            dispatch(removeReviewRequest(_id))
        } catch {
            console.error(err)
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        searchRequest()
    }, [])


    return (
        <div className='max-w-screen-2xl mx-auto px-4 sm:px-10 py-7 sm:py-14 bg-black space-y-14'>
            {!Array.isArray(pendingRequest) || pendingRequest.length === 0 ? (<EmptyState text="No Pending Request!" />) : (<>
                <h1 className='text-3xl md:text-4xl lg:text-6xl font-rubik text-white font-bold text-center max-w-[745px] mx-auto'>

                    Review Match Requests
                </h1>
                <div className='flex flex-col gap-10 items-center'>
                    {pendingRequest.map((item, idex) => (
                        <div className='bg-[#141414] p-6 rounded-[60px] border-[4px] border-white border-opacity-20 max-w-4xl  flex flex-col  md:flex-row gap-11 relative'>
                            {loader && <Loaderforcard />}
                            <div className=' imageBox rounded-[40px] border-2 border-white border-opacity-20 flex  flex-col justify-center relative bg-black pt-10 md:px-10 lg:px-20 items-center '>
                                <div className='rounded-full size-56 flex justify-center items-center overflow-hidden'>
                                    <img src={johnImg} className='object-cover size-56' alt="" />
                                </div>
                                <div className='absolute left-1/2 -translate-x-1/2 -bottom-[1px]'>
                                    <h2 className='text-white inline-block font-rubik text-base md:text-lg lg:text-xl font-medium  py-3 md:py-4 px-5 md;px-9 rounded-t-[20px] border-b-0 border-white text border-2 border-opacity-10 bg-[#141414] whitespace-nowrap'>
                                        Software Engineer
                                    </h2>

                                </div>
                                <div className='absolute top-6 right-6'>
                                    <img src={maleSvg} alt="" />
                                </div>
                            </div>
                            <div className='contentBox  max-w-96 flex flex-col justify-between gap-7'>
                                <main >
                                    <div className='flex justify-between items-center '>
                                        <h2 className=' text-white font-rubik font-bold text-xl md:text-2xl lg:text-[28px]'>{item?.fromUserId?.firstName} {item?.fromUserId?.lastName}</h2>
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
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    </p>
                                </main>

                                <div className="flex gap-3 justify-center md:justify-start">
                                    <button className='py-3 md:py-4 px-5 md:px-9 flex gap-3 font-rubik text-base md:text-lg lg:text-xl rounded-[20px] bg-[#808080] text-white items-center' onClick={() => reviewRequest("rejected", item._id)}>
                                        <img src={rejectSvg} alt="" />
                                        Reject</button>
                                    <button className='py-3 md:py-4 px-5 md:px-9 flex gap-3 font-rubik  rounded-[20px] bg-white text-black  items-center text-base md:text-lg lg:text-xl' onClick={() => reviewRequest("accepted", item._id)} ><img src={acceptSvg} alt="" />
                                        Accept</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
            )}
        </div>
    )
}

export default ConnectionReq