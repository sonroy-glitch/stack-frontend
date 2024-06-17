import React,{useEffect,useState} from 'react'
import Topbar from "../components/Topbar.jsx"
import Home from "../components/Home.jsx"
import Left from "../components/Left.jsx"
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Sidebar from "../components/Sidebar.jsx"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const User = () => {
 const navigate=useNavigate()
 const [data,setData]=useState(null)
 const auth =localStorage.getItem("auth")
    useEffect(() => {
      async function call(){
       
       var response = await axios.get("https://stack-backend-swart.vercel.app/api/send/user/all",{
        headers:{auth}
       })
       setData(response.data)
       
     }
     call()
      }
    , [])
  function userRedirect(e){
    var name=data[e].name
    navigate(`/user/${name}`)
  }
  return (
    <div>
      <Topbar />
      <div className="flex flex-row  items-center justify-center w-screen   absolute top-12">
        <div>
            <Left/>
        </div>
        <div className="w-6/12 h-screen p-3 justify-center  flex">
        {!data?
        <div className="flex items-center justify-center h-screen  p-3">
           <ClimbingBoxLoader
          color="black"
          size={40}
          
        />
        </div>
         :<div  className="flex flex-col w-11/12">
          <div className="mb-8 text-3xl font-bold">Users</div>
          <div className="flex flex-row w-11/12 mt-6 ">
          {data.map((item,index)=>{
            return(
              <div key={index} className="flex flex-row mr-16 mb-4  hover:cursor-pointer " data-id={index} onClick={(e)=>userRedirect(e.currentTarget.dataset.id)}>
                <div className="bg-gray-500 flex h-10 text-4xl p-3 rounded-full items-center justify-center">{item.name[0]}</div>
                <div className="text-2xl ml-2">{item.name}</div>
              </div>
            )
          })}
          </div>
          
         </div>
      }
        </div>
       

      </div>
    </div>
  )
}

export default User