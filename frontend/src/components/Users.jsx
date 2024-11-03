import { useEffect, useState } from "react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([{
        firstname: "You",
        lastname: "yorself",
        _id: 1
    }]);
    const [filter,setfilter]=useState('');
    async function backendcalldash() {
        const responce=await axios.get(filter.length>0?`http://localhost:3000/api/vi/bulk?userquaries=${filter}`:'http://localhost:3000/api/vi/bulk',{
         headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
        });
        const res=responce.data
        setUsers(res.users);
    }
    
    useEffect(()=>{
     backendcalldash();
    },[filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>{
                setfilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
}

function User({user}) {
        const navigate=useNavigate();
function handlerfunc(){
    navigate(`/send?id=${user._id}&name=${user.firstname}`);
    return ()=>{}
}
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname.charAt(0)}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={handlerfunc}  label={"Send Money"} />
        </div>
    </div>
}