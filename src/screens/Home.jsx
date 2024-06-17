import React,{useEffect,useState} from 'react'
import Topbar from "../components/Topbar.jsx"
import Question from "../components/Question.jsx"
import Left from "../components/Left.jsx"
import Sidebar from "../components/Sidebar.jsx"

import axios from "axios"
import { useSetRecoilState } from "recoil";
import {signinChecker,questionHolder,userData} from "../state/atoms.jsx";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Home = () => {
  const setSignedIn= useSetRecoilState(signinChecker)
  const setData= useSetRecoilState(questionHolder)
  const setUser = useSetRecoilState(userData)
  var [loading,setLoading]=useState(false)
   useEffect(() => {
     async function call(){
      setLoading(true)
      var data = await axios.get("http://localhost:3000/send/all")
      setData((data.data))
      // console.log(data.data)
      setLoading(false)
    }
    call()
     }
   , [])
   
 
  
  return (
    <div>
      <Topbar className="z-100"/>
      <div className="flex flex-row  items-center justify-center w-screen   z-0 absolute top-12">
        <div>
          <Left />
        </div>
        <div className="w-5/12 h-screen p-3 justify-center  flex">
        {loading?
        <div className="flex items-center justify-center h-screen w-5/12 p-3">
           <ClimbingBoxLoader
          color="black"
          size={40}
          
        />
        </div>
         :<Question/>
      }
         
        </div>
        <div className="w-1/12 h-screen ">
          <Sidebar/>
        </div>

      </div>
    </div>
  )
}

export default Home