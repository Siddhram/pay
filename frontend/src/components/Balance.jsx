import axios from "axios";
import { useEffect, useState } from "react"

export const Balance = () => {
    const[bal,setBal]=useState(0);
    async function name() {
        const response=await axios.get('http://localhost:3000/api/balance',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        // const res=response.data
        if (response) {
                   setBal(response.data.balance); 
        }
        // console.log(response);
        
        // setBal(res.balance);
    }
     useEffect(()=>{
      name();
     },[bal])
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs             {bal>0?bal:0}

        </div>
    </div>
}