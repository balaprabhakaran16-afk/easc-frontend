import {useEffect,useState} from "react"
import API from "../../api/axios" // ✅ use API
import { motion } from "framer-motion"

export default function StudentPlacement(){

const [applications,setApplications] = useState([])

const studentId = localStorage.getItem("studentId")

useEffect(()=>{

fetchApplications()

},[])

const fetchApplications = async()=>{

try{

const res = await API.get(`/application/student/${studentId}`)

setApplications(res.data)

}catch(err){

console.log(err)

}

}

return(

<div className="p-10 min-h-screen bg-[var(--bg)] text-[var(--text)]">

<h1 className="text-3xl font-bold mb-8 text-[var(--primary)]">
My Placements
</h1>

{applications.length === 0 && (

<p className="text-gray-500">No placement updates yet</p>

)}

{applications.map((app,index)=>(

<motion.div
key={app._id}
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.05}}
className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 mb-6 border-l-8 border-green-500"
>

{app.status === "selected" ? (

<div>

<h2 className="text-2xl font-bold text-green-600 mb-2">
🎉 Congratulations!
</h2>

<p className="text-lg mb-4">
You are selected in
<span className="font-bold text-blue-600 ml-2">
{app.company?.companyName}
</span>
</p>

<div className="grid md:grid-cols-3 gap-6 mt-6">

<div>
<p className="text-gray-500">Role</p>
<p className="font-semibold">{app.role || "-"}</p>
</div>

<div>
<p className="text-gray-500">Package</p>
<p className="font-semibold">{app.package || "-"}</p>
</div>

<div>
<p className="text-gray-500">Interview Date</p>
<p className="font-semibold">{app.interviewDate || "-"}</p>
</div>

</div>

</div>

):( 

<div>

<h2 className="font-semibold text-lg text-[var(--text)]">
{app.company?.companyName}
</h2>

<p className={`mt-2 font-semibold
${app.status==="pending" && "text-yellow-500"}
${app.status==="rejected" && "text-red-500"}
`}>
Application Status: {app.status}
</p>

</div>

)}

</motion.div>

))}

</div>

)

}