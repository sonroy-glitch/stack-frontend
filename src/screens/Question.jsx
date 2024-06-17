import React,{useEffect,useState} from 'react'
import Topbar from "../components/Topbar.jsx"
import Home from "../components/Home.jsx"
import Left from "../components/Left.jsx"
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Sidebar from "../components/Sidebar.jsx"

import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useSetRecoilState } from "recoil";
import {signinChecker,questionHolder,userData} from "../state/atoms.jsx";
const Question = () => {
  const setSignedIn= useSetRecoilState(signinChecker)
  const setData= useSetRecoilState(questionHolder)
  const setUser = useSetRecoilState(userData)
  const navigate=useNavigate()
  const[loading,setLoading]=useState(false)
 
    useEffect(() => {
      async function call(){
       setLoading(true)
       var data = await axios.get("https://stack-backend-swart.vercel.app/send/all")
       setData((data.data))
       // console.log(data.data)
       setLoading(false)
     }
     call()
      }
    , [])
  
  return (
    <div>
      <Topbar/>
      <div className="flex flex-row  items-center justify-center w-screen   absolute top-12">
        <div>
            <Left/>
        </div>
        <div className="w-5/12 h-screen p-3 justify-center  flex">
        {loading?
        <div className="flex items-center justify-center h-screen w-5/12 p-3">
           <ClimbingBoxLoader
          color="black"
          size={40}
          
        />
        </div>
         :<Home/>
      }
        </div>
        <div className="w-1/12 h-screen ">
          <Sidebar/>
        </div>

      </div>
    </div>
  )
}

export default Question