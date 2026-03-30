import { useEffect, useState } from "react"
import axios from "axios"

export default function Companies(){

const [companies,setCompanies] = useState([])

const [form,setForm] = useState({
companyName:"",
role:"",
eligibleDepartment:""
})

const fetchCompanies = ()=>{

axios
.get("http://localhost:5000/api/companies")
.then(res=>setCompanies(res.data || []))
.catch(err=>console.log(err))

}

useEffect(()=>{
fetchCompanies()
},[])

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const addCompany = async ()=>{

if(!form.companyName || !form.role) return

await axios.post("http://localhost:5000/api/companies",form)

setForm({
companyName:"",
role:"",
eligibleDepartment:""
})

fetchCompanies()

}

const deleteCompany = async (id)=>{

if(!window.confirm("Delete this company?")) return

await axios.delete(`http://localhost:5000/api/companies/${id}`)

fetchCompanies()

}

return(

<div className="p-10 min-h-screen bg-[var(--bg)] text-[var(--text)]">

{/* TITLE */}

<h1 className="text-3xl font-bold mb-8 text-[var(--primary)]">
Manage Companies
</h1>


{/* ADD COMPANY FORM */}

<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full max-w-md mb-10">

<h2 className="text-lg font-semibold mb-4 text-[var(--secondary)]">
Add Company
</h2>

<input
name="companyName"
placeholder="Company Name"
value={form.companyName}
onChange={handleChange}
className="border p-2 w-full mb-3 rounded"
/>

<input
name="role"
placeholder="Role"
value={form.role}
onChange={handleChange}
className="border p-2 w-full mb-3 rounded"
/>

<input
name="eligibleDepartment"
placeholder="Department"
value={form.eligibleDepartment}
onChange={handleChange}
className="border p-2 w-full mb-4 rounded"
/>

<button
onClick={addCompany}
className="bg-[var(--primary)] hover:bg-[#276749] text-white px-4 py-2 rounded transition"
>
Add Company
</button>

</div>


{/* COMPANY LIST */}

{companies.length === 0 ? (
<p className="text-gray-500">No companies added yet</p>
) : (
<div className="grid md:grid-cols-3 gap-6">

{companies.map((c)=>{

const name = c?.companyName || "Company"
const role = c?.role || "-"
const dept = c?.eligibleDepartment || "-"

return(

<div
key={c._id}
className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
>

<div className="flex items-center gap-3 mb-3">

<div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold">
{name.charAt(0)}
</div>

<h2 className="text-xl font-bold text-[var(--primary)]">
{name}
</h2>

</div>

<p className="text-[var(--text)] mb-1">
Role : {role}
</p>

<p className="text-[var(--text)] mb-4">
Department : {dept}
</p>

<button
onClick={()=>deleteCompany(c._id)}
className="bg-[var(--secondary)] hover:bg-[#D6BC3E] text-black px-3 py-1 rounded transition"
>
Delete
</button>

</div>

)

})}

</div>
)}

</div>

)

}