import React,{useEffect,useState} from 'react'
import Topbar from "../components/Topbar.jsx"
import Left from "../components/Left.jsx"
import {useParams} from "react-router-dom"
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import {signinChecker} from "../state/atoms.jsx"
import {useRecoilValue} from "recoil"
import axios from "axios"
const UserSingle = () => {
  const[data,setData]=useState(null)
  const signedIn =useRecoilValue(signinChecker)
  var {name}= useParams()
  const user = JSON.parse(localStorage.getItem("user"))
  var auth=localStorage.getItem('auth')
  useEffect(() => {
    async function call(){
      var response = await axios.get(`https://stack-backend-swart.vercel.app/api/send/user/${name}`,{
        headers:{auth}
       })
       setData(response.data)
    }
    call()
  }, [])
  
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
       :
       <div>
        <div>
          <div>
            <div>
              
            </div>
          </div>
          {(signedIn&&(name==user.name))?
          <div>Edit profile</div>
          :null


          }
        </div>
       </div>
    }
      </div>
     

    </div>
  </div>
  )
}

export default UserSingle