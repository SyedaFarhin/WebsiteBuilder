import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function useGetCurrentUser() {
    const dispatch=useDispatch()
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
              const result=await axios.get(`${serverUrl}/api/user/me`,{withCredentials:true})
              dispatch(setUserData(result.data))
            } catch (error) {
                if (error.response?.status === 400 || error.response?.status === 401) return
                console.log(error)
            }
        }
        getCurrentUser()
    }, [])
}

export default useGetCurrentUser
