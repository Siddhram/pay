import { Heading } from "./components/Heading"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Routes,Route, useNavigate } from "react-router-dom"
import "./index.css"; 
import Dashboard from "./pages/Dashboard";
import { SendMoney } from "./pages/Sendmoney";
import Recharge from "./pages/Recharge";
function App() {


  return (
    <div>
    <Routes>
      {!localStorage.getItem('token')?<Route path='/' element={<Signup></Signup>}  >
             <Route path='/signup' element={<Signup></Signup>}/>
</Route>:localStorage.getItem('token').length>0?<Route path="/" element={<Dashboard/>}/>:    <Route path='/' element={<Signin></Signin>}  >
             <Route path='/signup' element={<Signup></Signup>}/>
</Route>
      }
       <Route path='/signup' element={<Signup></Signup>}/>
  <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/recharge" element={<Recharge/>}/>

      <Route path="/send" element={<SendMoney/>}/>
    </Routes>
      {/* <Heading/> */}
    </div>
  )
}

export default App
