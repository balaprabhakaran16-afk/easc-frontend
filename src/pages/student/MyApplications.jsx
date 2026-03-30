import { useEffect, useState } from "react";
import axios from "axios";

export default function MyApplications(){

const [applications,setApplications] = useState([])

const studentId = localStorage.getItem("studentId")

useEffect(()=>{
fetchApplications()
},[])

const fetchApplications = async()=>{

try{

const res = await axios.get(
`http://localhost:5000/api/companies/student/${studentId}`
)

setApplications(res.data)

}catch(err){

console.log(err)

}

}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-8">

My Applications

</h1>

{applications.length === 0 && (

<p>No applications yet</p>

)}

<div className="grid grid-cols-3 gap-6">

{applications.map((app)=>(

<div
key={app._id}
className="p-6 bg-white shadow rounded-xl"
>

<h2 className="text-xl font-bold">

{app.company?.companyName}

</h2>

<p className="mt-2">

Role: {app.company?.role}

</p>

<p>

Dept: {app.company?.eligibleDepartment}

</p>

<p className="mt-4 font-semibold">

Status:

<span
className={`ml-2
${app.status==="selected"?"text-green-600":""}
${app.status==="rejected"?"text-red-600":""}
${app.status==="applied"?"text-blue-600":""}
`}
>

{app.status}

</span>

</p>

</div>

))}

</div>

</div>

)

}