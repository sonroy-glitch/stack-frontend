import React,{useEffect,useState} from 'react'
import Topbar from "../components/Topbar.jsx"
import Home from "../components/Home.jsx"
import Left from "../components/Left.jsx"
import Render from "../components/Render.jsx"
import Sidebar from "../components/Sidebar.jsx"

import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useSetRecoilState } from "recoil";
import {signinChecker,questionHolder,userData} from "../state/atoms.jsx";
const Single = () => {
  

  
  
  return (
    <div >
      <Topbar className="z-10"/>
      <div className="z-1">
      <div className="flex flex-row  items-center justify-center w-screen  absolute top-12">
        <div>
            <Left/>
        </div>
        <div className="w-5/12 h-screen p-3">
            <Render/>
        </div>
        <div className="w-1/12 h-screen ">
          <Sidebar className="z-0"/>
        </div>

      </div>
      </div>
     
    </div>
  )
}

export default Single