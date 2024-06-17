import React,{useState} from "react";
import Topbar from "../components/Topbar.jsx";
import {z} from "zod"
import axios from "axios"
import {useNavigate} from "react-router-dom"
const Write = () => {
const [title,setTitle]=useState("");
const [description,setDescription]=useState("")
const [tags,setTags]=useState("")
const navigate =useNavigate()
const postSchema=z.object({
    title:z.string().min(1),
    description:z.string().min(10),
    tags:z.string().optional()
   })
async function run (){
  var token = localStorage.getItem("auth")
  if(token==null){
    alert("Please login first")
  }
  else{
    const check=postSchema.safeParse({
      title,
      description,
      tags
  })
  if(!check.success){
    alert("You need to enter a proper title and description")
  }
  else{
    var tag= tags.split(" ")
    const response=await axios.post("http://localhost:3000/api/question",{
      title,
      description,
      tags:tag
    },{
      headers:{auth:token}
    })
    if(response.status===200){
      navigate(`/question/${response.data.id}`)
      
    }
  }
  }
 
} 
  return (
    <div>
      <Topbar />
      <div className="flex flex-col  fixed top-12 bottom-40 w-screen bg-gray-300 items-center justify-center z-0">
        <div className="flex w-4/6 flex-col ">
          <p className="text-5xl font-bold mt-20 mb-12  ">Ask a public Question</p>

          <div className="bg-slate-50 p-3 z-10 rounded-xl">
            <div className="flex flex-col mb-7">
              <p className="text-2xl">Title</p>
              <p className=" text-md mb-1">
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <textarea placeholder="e.g Is there an R function for finding the index of an element in an vector?" className="p-2 rounded-md " onChange={(e)=>setTitle(e.target.value)}>{title}</textarea>
            </div>
            <div className="flex flex-col mb-7">
              <p className="text-2xl">Body</p>
              <p className=" text-md mb-1 "  >
                Include all the information someone would need to answer your
                question
              </p>
              <textarea className="p-2 rounded-md h-40" onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div className="flex flex-col mb-7">
              <p className="text-2xl">Tags</p>
              <p className=" text-md mb-1">Add up to 5 tags to describe what your question is about</p>
              <input placeholder="e.g. (xml typescript wordpress)" className="p-2 rounded-md " onChange={(e)=>setTags(e.target.value)}/>
            </div>
          </div>
          <div className="mt-8 mb-20   ">
          <button className="bg-blue-700 text-white p-2 rounded-md" onClick={run}>Add Question</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
