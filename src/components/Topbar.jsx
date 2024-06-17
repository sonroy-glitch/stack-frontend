import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useRecoilState,useSetRecoilState } from "recoil";
import {signinChecker,userData} from "../state/atoms.jsx";
import axios from "axios"
const Topbar = () => {
  const navigate = useNavigate();
  const [signedIn,setSignedIn] = useRecoilState(signinChecker);
  const setUser= useSetRecoilState(userData)
  const [search,setSearch]=useState(true)
  var tag = localStorage.getItem("tag")
  useEffect(() => {
    async function call(){
      
      var auth = localStorage.getItem("auth")
      var verify= await axios.get("https://stack-backend-swart.vercel.app/verify",{
        headers:{auth}
      })
      // console.log(verify.data)
      if(verify.status===200){
        setUser(verify.data)
       localStorage.setItem("user",JSON.stringify(verify.data))
        setSignedIn(true)
        
        // localStorage.setItem("signin",true)
      }
      }
    call()
  }, [])
  function logout(){
   localStorage.removeItem("auth")
   localStorage.removeItem("tag")
   localStorage.removeItem("data")
   localStorage.removeItem("user")

    setSignedIn(false)
    localStorage.setItem("signin",false)

    navigate("/")
  }
  return (
    <div className="flex flex-row w-screen justify-around items-center p-0.5  text-3xl border-t-2 border-orange-700 z-100 fixed index-x-0 top-0 shadow">
      <div onClick={() => navigate("/")}>
        <img src={logo} className="h-9" />
      </div>
      <div>
        <p>About</p>
      </div>
      <div>
        <p>Products</p>
      </div>
      <div>
        <p>For Teams</p>
      </div>
      <div className="flex flex-row">
        <div><input placeholder="🔎Search..." className="border border-slate-500 " />
       </div>
        
        {
          signedIn ? 
          <div className="flex">
            <div className="ml-3 mr-3 flex rounded-full bg-blue-500 text-white border border-black-500 pl-2 pr-2">
            {tag}
            </div>
            <button className="text-xl border border-blue-400 rounded bg-blue-100 p-1" onClick={logout}>
              Logout
            </button>
          </div>
          : 
          <button
          className="border border-blue-300 "
          onClick={() => navigate("/auth/signin")}
        >
          Log in
          </button>
        }
          
        
      </div>
     
    </div>
  );
};

export default Topbar;
