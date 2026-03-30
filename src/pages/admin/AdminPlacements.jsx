import {useEffect,useState} from "react"
import axios from "axios"
import { motion } from "framer-motion"

export default function AdminPlacements(){

const [apps,setApps] = useState([])
const [search,setSearch] = useState("")
const [filter,setFilter] = useState("all")

/* ✅ FIX ONLY HERE */
const baseURL =
window.location.hostname === "localhost"
? "http://localhost:5000"
: "https://eascbackend.onrender.com"

useEffect(()=>{
fetchApps()
},[])

const fetchApps = ()=>{

axios
.get(`${baseURL}/api/application/admin`)
.then(res=>setApps(res.data))
.catch(err=>console.error(err))

}

const updateStatus = async(id,status)=>{

try{

await axios.put(
`${baseURL}/api/application/status/${id}`,
{status}
)

fetchApps()

}catch(err){
console.error(err)
}

}


/* DASHBOARD STATS */

const total = apps.length
const selected = apps.filter(a=>a.status==="selected").length
const rejected = apps.filter(a=>a.status==="rejected").length
const pending = apps.filter(a=>a.status==="pending").length


/* SEARCH + FILTER */

const filteredApps = apps.filter(a=>{

const matchSearch =
a.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
a.company?.name?.toLowerCase().includes(search.toLowerCase())

const matchFilter =
filter==="all" || a.status===filter

return matchSearch && matchFilter

})

return(

<div className="min-h-screen p-10 bg-[var(--bg)] text-[var(--text)]">

{/* TITLE */}

<h1 className="text-4xl font-bold mb-10 text-[var(--primary)] dark:text-[var(--secondary)]">
Placement Management
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
placeholder="Search student or company..."
className="border p-3 rounded w-64 dark:bg-gray-800"
onChange={(e)=>setSearch(e.target.value)}
/>

<select
className="border p-3 rounded dark:bg-gray-800"
onChange={(e)=>setFilter(e.target.value)}
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
<th className="p-3 border">Email</th>
<th className="p-3 border">Company</th>
<th className="p-3 border">Status</th>
<th className="p-3 border">Action</th>

</tr>

</thead>

<tbody>

{filteredApps.map((a,index)=>(

<motion.tr
key={a._id}
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.03}}
className="border text-center hover:bg-gray-50 dark:hover:bg-gray-800"
>

<td className="p-3 font-semibold">
{a.student?.name}
</td>

<td className="p-3">
{a.student?.email}
</td>

<td className="p-3">
{a.company?.name}
</td>


{/* STATUS */}

<td>

<span className={`px-3 py-1 rounded-full text-xs font-bold

${a.status==="selected" && "bg-green-200 text-green-700"}
${a.status==="rejected" && "bg-red-200 text-red-700"}
${a.status==="pending" && "bg-yellow-200 text-yellow-700"}

`}>

{a.status}

</span>

</td>


{/* ACTION */}

<td className="space-x-2">

<button
onClick={()=>updateStatus(a._id,"selected")}
className="bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-1 rounded hover:scale-105 transition"
>

Select

</button>

<button
onClick={()=>updateStatus(a._id,"rejected")}
className="bg-gradient-to-r from-red-500 to-red-700 text-white px-3 py-1 rounded hover:scale-105 transition"
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