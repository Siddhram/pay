import { Link, useNavigate } from "react-router-dom";

export function BottomWarning({label, buttonText, to}) {
  const nav=useNavigate()
    return <div className="py-2 text-sm flex justify-center">
      <div>
        {label}
      </div>
      <button className="pointer underline pl-1 cursor-pointer" onClick={()=>{
        nav(to)
      }} >
        {buttonText}
      </button>
    </div>
}