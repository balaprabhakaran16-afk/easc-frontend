import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function AdminStudents(){

const [students,setStudents] = useState([])
const [search,setSearch] = useState("")
const [department,setDepartment] = useState("")

useEffect(()=>{

axios
.get("http://localhost:5000/api/students")
.then(res=>{
setStudents(res.data || [])
})
.catch(err=>console.log(err))

},[])


const filteredStudents = students.filter((s)=>{

const name = s?.name || ""
const dept = s?.department || ""

return (
name.toLowerCase().includes(search.toLowerCase()) &&
(department === "" || dept === department)
)

})


return(

<div className="p-10 min-h-screen bg-[var(--bg)] text-[var(--text)]">

{/* TITLE */}

<h1 className="text-4xl font-bold mb-6 text-[var(--primary)]">
All Students
</h1>


{/* STATS */}

<div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center">

<p className="text-lg font-semibold text-[var(--text)]">
Total Students
</p>

<span className="text-2xl font-bold text-[var(--secondary)]">
{filteredStudents.length}
</span>

</div>


{/* FILTERS */}

<div className="flex flex-wrap gap-4 mb-6">

<input
type="text"
placeholder="Search student..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border p-2 rounded w-60"
/>

<select
value={department}
onChange={(e)=>setDepartment(e.target.value)}
className="border p-2 rounded"
>

<option value="">All Departments</option>
<option value="CSE">CSE</option>
<option value="BCA">BCA</option>
<option value="BBA">BBA</option>

</select>

</div>


{/* TABLE */}

<div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">

<table className="w-full">

<thead className="bg-[var(--primary)] text-white">

<tr>
<th className="p-4 text-left">Student</th>
<th>Email</th>
<th>Department</th>
<th>Profile</th>
</tr>

</thead>

<tbody>

{filteredStudents.length === 0 ? (

<tr>
<td colSpan="4" className="p-6 text-center text-gray-500">
No students found
</td>
</tr>

) : (

filteredStudents.map((s)=>{

const name = s?.name || "Unknown"
const email = s?.email || "-"
const dept = s?.department || "-"

return(

<tr
key={s._id}
className="border-b hover:bg-[var(--secondary)]/20 dark:hover:bg-[var(--accent)]/30 transition"
>

<td className="p-4 flex items-center gap-3">

<div className="w-9 h-9 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold">

{name.charAt(0)}

</div>

<span className="font-medium text-[var(--text)]">
{name}
</span>

</td>

<td className="text-[var(--text)]/80">
{email}
</td>

<td>

<span className="bg-[var(--secondary)] text-[var(--text)] px-3 py-1 rounded-full text-sm">
{dept}
</span>

</td>

<td>

<Link to={`/admin/student/${s._id}`}>

<button className="bg-[var(--primary)] hover:bg-[#276749] text-white px-4 py-2 rounded transition">
View Profile
</button>

</Link>

</td>

</tr>

)

})

)}

</tbody>

</table>

</div>

</div>

)

}