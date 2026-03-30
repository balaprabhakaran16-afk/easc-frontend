import { useEffect,useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

export default function AdminApplications(){

const [applications,setApplications] = useState([])
const [search,setSearch] = useState("")
const [statusFilter,setStatusFilter] = useState("all")

const [form,setForm] = useState({
role:"",
package:"",
interviewDate:""
})

useEffect(()=>{
fetchApplications()
},[])

const fetchApplications = async()=>{
const res = await axios.get("http://localhost:5000/api/application/all")
setApplications(res.data)
}

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const selectStudent = async(id)=>{
await axios.put(`http://localhost:5000/api/application/select/${id}`,{
role:form.role,
package:form.package,
interviewDate:form.interviewDate
})
fetchApplications()
}

const rejectStudent = async(id)=>{
await axios.put(`http://localhost:5000/api/application/reject/${id}`)
fetchApplications()
}

const total = applications.length
const selected = applications.filter(a=>a.status==="selected").length
const rejected = applications.filter(a=>a.status==="rejected").length
const pending = applications.filter(a=>a.status==="pending").length


/* SEARCH + FILTER */

const filteredApps = applications.filter(app=>{

const matchSearch =
app.fullName?.toLowerCase().includes(search.toLowerCase()) ||
app.company?.companyName?.toLowerCase().includes(search.toLowerCase())

const matchStatus =
statusFilter==="all" || app.status===statusFilter

return matchSearch && matchStatus

})

return(

<div className="min-h-screen p-10 bg-[var(--bg)] text-[var(--text)]">

{/* TITLE */}

<h1 className="text-4xl font-bold mb-10 text-[var(--primary)] dark:text-[var(--secondary)]">
Placement Dashboard
</h1>


{/* DASHBOARD CARDS */}

<div className="grid md:grid-cols-4 gap-6 mb-10">

<motion.div whileHover={{scale:1.05}}
className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-indigo-500 to-indigo-700 text-white">

<h2>Total Applications</h2>
<p className="text-3xl font-bold">{total}</p>

</motion.div>

<motion.div whileHover={{scale:1.05}}
className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-green-500 to-green-700 text-white">

<h2>Selected</h2>
<p className="text-3xl font-bold">{selected}</p>

</motion.div>

<motion.div whileHover={{scale:1.05}}
className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-white">

<h2>Pending</h2>
<p className="text-3xl font-bold">{pending}</p>

</motion.div>

<motion.div whileHover={{scale:1.05}}
className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-red-500 to-red-700 text-white">

<h2>Rejected</h2>
<p className="text-3xl font-bold">{rejected}</p>

</motion.div>

</div>


{/* SEARCH + FILTER */}

<div className="flex gap-4 mb-6">

<input
placeholder="Search student / company..."
className="border p-3 rounded w-64 dark:bg-gray-800"
onChange={(e)=>setSearch(e.target.value)}
/>

<select
className="border p-3 rounded dark:bg-gray-800"
onChange={(e)=>setStatusFilter(e.target.value)}
>

<option value="all">All</option>
<option value="selected">Selected</option>
<option value="pending">Pending</option>
<option value="rejected">Rejected</option>

</select>

</div>


{/* TABLE */}

<div className="overflow-x-auto backdrop-blur-lg bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-lg">

<table className="w-full text-sm">

<thead className="bg-gray-100 dark:bg-gray-800">

<tr>

<th className="p-3 border">Student</th>
<th className="p-3 border">Company</th>
<th className="p-3 border">Dept</th>
<th className="p-3 border">CGPA</th>
<th className="p-3 border">Resume</th>
<th className="p-3 border">Role</th>
<th className="p-3 border">Package</th>
<th className="p-3 border">Interview</th>
<th className="p-3 border">Status</th>
<th className="p-3 border">Action</th>

</tr>

</thead>

<tbody>

{filteredApps.map((app,index)=>(

<motion.tr
key={app._id}
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.03}}
className="hover:bg-gray-50 dark:hover:bg-gray-800"
>

<td className="p-3 border font-semibold">{app.fullName}</td>

<td className="p-3 border">{app.company?.companyName}</td>

<td className="p-3 border">{app.department}</td>

<td className="p-3 border">{app.cgpa}</td>

<td className="p-3 border">

<a
href={`http://localhost:5000/${app.resume}`}
target="_blank"
className="text-blue-500 hover:underline"
>

View Resume

</a>

</td>

<td className="p-3 border">

<input
type="text"
name="role"
placeholder="Role"
className="border p-2 rounded w-28 dark:bg-gray-800"
onChange={handleChange}
/>

</td>

<td className="p-3 border">

<input
type="text"
name="package"
placeholder="Package"
className="border p-2 rounded w-28 dark:bg-gray-800"
onChange={handleChange}
/>

</td>

<td className="p-3 border">

<input
type="date"
name="interviewDate"
className="border p-2 rounded dark:bg-gray-800"
onChange={handleChange}
/>

</td>

<td className="p-3 border">

<span className={`px-3 py-1 rounded-full text-xs font-bold

${app.status==="selected" && "bg-green-200 text-green-700"}
${app.status==="rejected" && "bg-red-200 text-red-700"}
${app.status==="pending" && "bg-yellow-200 text-yellow-700"}

`}>

{app.status}

</span>

</td>

<td className="p-3 border space-x-2">

<button
onClick={()=>selectStudent(app._id)}
className="bg-green-500 text-white px-3 py-1 rounded hover:scale-105 transition"
>

Select

</button>

<button
onClick={()=>rejectStudent(app._id)}
className="bg-red-500 text-white px-3 py-1 rounded hover:scale-105 transition"
>

Reject

</button>

</td>

</motion.tr>

))}

</tbody>

</table>

</div>

</div>

)

}