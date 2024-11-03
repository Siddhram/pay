import { useEffect, useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
const [first,setfirst]=useState('');
const [lastname,setlastname]=useState('');
const [email,setemail]=useState('');
const [password,setpassword]=useState('');
const nav=useNavigate();
async function backendcall() {
  const responce=await axios.post('http://localhost:3000/api/vi/signin',{
    email:email,
    password:password
  });
  const res=responce.data;
  console.log(res);
  localStorage.setItem('token',res.token);
  nav('/dashboard');
  
}// function onclick(e) {
//   setfirst(e.target.value);
//   console.log(first);
  
// }
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onClick={(e)=>{
          setemail(e.target.value);
        }} placeholder="siddharam@gmail.com" label={"Email"} />
        <InputBox onClick={(e)=>{
          setpassword(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={backendcall} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}