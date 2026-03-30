import {useEffect,useState} from "react"
import axios from "axios"

export default function StudentPlacement(){

const [applications,setApplications] = useState([])

const studentId = localStorage.getItem("studentId")

useEffect(()=>{

axios
.get(`http://localhost:5000/api/application/student/${studentId}`)
.then(res=>setApplications(res.data))

},[])

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-8">
My Placements
</h1>

{applications.map(app=>(

<div key={app._id}
className="bg-white shadow-xl rounded-xl p-8 mb-6 border-l-8 border-green-500">

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

<div className="grid grid-cols-3 gap-6 mt-6">

<div>
<p className="text-gray-500">Role</p>
<p className="font-semibold">{app.role}</p>
</div>

<div>
<p className="text-gray-500">Package</p>
<p className="font-semibold">{app.package}</p>
</div>

<div>
<p className="text-gray-500">Interview Date</p>
<p className="font-semibold">{app.interviewDate}</p>
</div>

</div>

</div>

):( 

<div>

<h2 className="font-semibold text-lg">
{app.company?.companyName}
</h2>

<p className="text-yellow-600 mt-2">
Application Status: {app.status}
</p>

</div>

)}

</div>

))}

</div>

)

}