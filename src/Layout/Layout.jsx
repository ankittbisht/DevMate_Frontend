import React, { useEffect } from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addUser } from '../Utils/userSlice'
import Loader from '../components/Loader'

function Layout() {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user)

    const fetchUser = async () => {

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
                withCredentials: true
            })
            dispatch(addUser(response.data))
        } catch (err) {
            console.log("naviagate to home page")
            if (err.status === 401) {
                return navigate('/')
            }
            console.error(err)
        }
    }

    useEffect(() => {
        //call fetchuser if there is no user in api store
        console.log("calling use effect in layout app")

        fetchUser();

    }, [location.pathname])

    return (
        <>
            <Header />
        
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout