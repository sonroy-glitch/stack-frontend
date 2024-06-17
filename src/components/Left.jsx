import React from 'react'
import {useNavigate} from "react-router-dom"
import {signinChecker} from "../state/atoms.jsx"
import {useRecoilValue} from "recoil"
const Left = () => {
    const navigate =useNavigate()
    const signedIn=useRecoilValue(signinChecker)
    function user(){
     if(!signedIn){
      alert("You need to sign in to access the users page")
     }
     else{
      navigate("/user")
     }
    }
  return (
    <div>
        <div className=" w-48  h-screen  border-e border-slate-400 text-xl fixed left-72 top-12 p-5">
          <div onClick={()=>navigate("/")}className="mb-2 hover:cursor-pointer ">Home</div>
          <div className="mb-2 font-bold">PUBLIC</div>
          <div onClick={()=>navigate("/question")} className="hover:cursor-pointer mb-2 pl-3">Questions</div>
          <div className="mb-2 pl-3">Tags</div>
          <div className="mb-2 pl-3 hover:cursor-pointer" onClick={user}>Users</div>

        </div>
    </div>
  )
}

export default Left