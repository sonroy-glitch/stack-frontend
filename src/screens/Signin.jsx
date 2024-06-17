import React,{useState,useEffect} from 'react'
import Topbar from "../components/Topbar.jsx"
import signin from "../assets/signin.png"
import {signinSchema} from "@sr1435/medium-common"
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import password from "../assets/show.svg"
import text from "../assets/hide.svg"
import {signinChecker} from "../state/atoms.jsx"
import {useSetRecoilState} from "recoil"
const Signup = () => {
  var timeout
  const [email,setEmail]=useState("")
  const [password1,setPassword1]=useState("")
  const [message,setMessage]=useState("")
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate()
  const [state,setState]=useState("password")
  const [image,setImage]=useState(password)
  const setSignedIn=useSetRecoilState(signinChecker)
  useEffect(() => {
    setTimeout(() => {
      setMessage("")
    }, 5000);
  }, [message])
  

  function emailDebouncing(e){
    clearTimeout(timeout)
    timeout=setTimeout(() => {
     setEmail(e)
    }, 1000);
   }function passwordDebouncing(e){
    clearTimeout(timeout)
    timeout=setTimeout(() => {
     setPassword1(e)
    }, 1000);
   }
   async function run (){
    setLoading(true)
    var check=  signinSchema.safeParse({
      email,
      password:password1
    })  
    if(!(check.success)){
      setMessage("Wrong format of email or password")
      setLoading(false)
    }
    else{
      try{
      var response=await axios.post("https://stack-backend-swart.vercel.app/auth/signin",{
        email,
        password:password1
      })
      if(response.status===200){
        var user= response.data.split("+")
        localStorage.setItem("auth",user[0])
        localStorage.setItem("tag",user[1])
        setSignedIn(true)
        setLoading(false)
         navigate("/")
      }
      else if(response.status===202){
        setMessage(response.data)
        setLoading(false)

      }
      }
      catch(err){
        setMessage("Error Occured")
        setLoading(false)
      }
    }
   }
  return (
    <div>
      <Topbar/>
      <div className="items-center justify-center w-screen h-screen flex flex-col text-3xl ">
        <img src={signin} className="h-12 mb-2"/>
        <div></div>
        <div className="flex flex-col shadow-xl p-7 bg-slate-200 rounded-xl">
        
         <p className="mb-3">Email</p>
         <input placeholder="jack@example.com"className="mb-3 rounded" onChange={(e)=>setEmail(e.target.value)}/>
         <p className="mb-3">Password</p>
         <div className="flex item-center">
         <input placeholder="********"className="mb-3 rounded" type={state} onChange={(e)=>passwordDebouncing(e.target.value)}/>
         <button onClick={()=>{
          if(state=="password"){
            setState("text")
            setImage(text)
          }
          else{
            setState("password")
            setImage(password)
          }
          }}>
          <img src={image} className="h-8 mb-2 ml-2"/>
         </button>
         </div>
         <button className="bg-blue-300 rounded mt-2 mb-1" onClick={run}>{
          loading?
          <ClipLoader
          color='red'
          size={25}
          />:`Log in`
        }</button>
         <p className="text-2xl font-light items-center">{message}</p>
        </div>
        <p>Don't have a account? <a href="/auth/signup" className="text-3xl text-blue-500" >signup</a></p>
      </div>
    </div>
  )
}

export default Signup