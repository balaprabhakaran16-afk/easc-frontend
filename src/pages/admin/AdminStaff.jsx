import {useEffect,useState} from "react"
import axios from "axios"
import { motion } from "framer-motion"

export default function AdminStaff(){

const [staff,setStaff] = useState([])
const [search,setSearch] = useState("")

/* ✅ FIX ONLY HERE */
const baseURL =
window.location.hostname === "localhost"
? "http://localhost:5000"
: "https://eascbackend.onrender.com"

useEffect(()=>{
fetchStaff()
},[])

const fetchStaff = ()=>{
axios.get(`${baseURL}/api/admin/staff`)
.then(res=>setStaff(res.data))
.catch(err=>console.log(err))
}

/* SEARCH FILTER */
const filteredStaff = staff.filter(s=>
s.name?.toLowerCase().includes(search.toLowerCase()) ||
s.email?.toLowerCase().includes(search.toLowerCase()) ||
s.department?.toLowerCase().includes(search.toLowerCase())
)

const totalStaff = staff.length

/* DEPARTMENT COUNT */
const deptMap = {}
staff.forEach(s=>{
deptMap[s.department] = (deptMap[s.department] || 0) + 1
})

return(

<div className="min-h-screen p-10 bg-[var(--bg)] text-[var(--text)]">

{/* TITLE */}

<motion.h1
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="text-4xl font-bold mb-10 text-[var(--primary)] dark:text-[var(--secondary)]"
>
Staff Management
</motion.h1>


{/* DASHBOARD CARDS */}

<div className="grid md:grid-cols-3 gap-6 mb-10">

<motion.div whileHover={{scale:1.05}}
className="p-6 rounded-xl shadow-lg bg-[var(--primary)] text-white"
>
<h2>Total Staff</h2>
<p className="text-3xl font-bold">{totalStaff}</p>
</motion.div>

{Object.entries(deptMap).slice(0,2).map(([dept,count],index)=>(
<motion.div
key={dept}
whileHover={{scale:1.05}}
className={`p-6 rounded-xl shadow-lg text-white ${
  index === 0
    ? "bg-[var(--accent)]"
    : "bg-[var(--secondary)]"
}`}
>
<h2>{dept}</h2>
<p className="text-3xl font-bold">{count}</p>
</motion.div>
))}

</div>


{/* SEARCH */}

<input
placeholder="Search staff..."
className="border p-3 rounded mb-6 w-72 bg-[var(--bg)] text-[var(--text)] dark:bg-gray-800 dark:text-[var(--text)]"
onChange={(e)=>setSearch(e.target.value)}
/>


{/* TABLE */}

<div className="overflow-x-auto backdrop-blur-lg bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-lg">

<table className="w-full text-sm">

<thead className="bg-[var(--primary)] text-white">

<tr>
<th className="p-3 border">Name</th>
<th className="p-3 border">Email</th>
<th className="p-3 border">Department</th>
</tr>

</thead>

<tbody>

{filteredStaff.map((s,index)=>(
<motion.tr
key={s._id}
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.05}}
className="text-center border hover:bg-[var(--secondary)]/20 dark:hover:bg-[var(--accent)]/30 transition"
>

<td className="p-3 font-semibold">
{s.name}
</td>

<td className="p-3">
{s.email}
</td>

<td className="p-3">
<span className="px-3 py-1 rounded-full bg-[var(--secondary)] text-[var(--text)] text-xs font-bold">
{s.department}
</span>
</td>

</motion.tr>
))}

</tbody>

</table>

</div>

</div>

)
}