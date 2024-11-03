import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
   const[name,setname]= useState('')
    async function backendcall() {
        const responce=await axios.get('http://localhost:3000/api/vi/userinfo',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')?localStorage.getItem('token'):""}`
            }
        })
        const res=responce.data
        setname(res.email)
    }

    useEffect(()=>{
        backendcall();
    },[])
                      const nav=  useNavigate()

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                {name}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                 <button onClick={function () {
                  nav('/recharge')
                   
                    
                 }}> U</button>  
                </div>
            </div>
        </div>
    </div>
}