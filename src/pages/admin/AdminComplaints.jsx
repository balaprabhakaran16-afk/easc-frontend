import { useEffect,useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

export default function AdminComplaints(){

const [complaints,setComplaints] = useState([])
const [replies,setReplies] = useState({})
const [search,setSearch] = useState("")

useEffect(()=>{
fetchComplaints()
},[])

const fetchComplaints = ()=>{
axios.get("http://localhost:5000/api/complaints")
.then(res=>setComplaints(res.data))
}


/* HANDLE REPLY INPUT */

const handleReplyChange = (id,value)=>{
setReplies({...replies,[id]:value})
}


/* REPLY */

const replyComplaint = async(id)=>{

await axios.put(`http://localhost:5000/api/complaints/reply/${id}`,{
reply:replies[id]
})

setReplies({...replies,[id]:""})
fetchComplaints()

}


/* RESOLVE */

const resolveComplaint = async(id)=>{

await axios.put(`http://localhost:5000/api/complaints/status/${id}`,{
status:"resolved"
})

fetchComplaints()

}


/* SEARCH */

const filteredComplaints = complaints.filter(c =>
c.title.toLowerCase().includes(search.toLowerCase()) ||
c.message.toLowerCase().includes(search.toLowerCase())
)

return(

<div className="min-h-screen p-10 bg-[var(--bg)] text-[var(--text)]">

{/* TITLE */}

<motion.h1
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="text-4xl font-bold mb-8 text-[var(--primary)] dark:text-[var(--secondary)]"
>

Complaint Management

</motion.h1>


{/* SEARCH */}

<input
placeholder="Search complaints..."
className="border p-3 rounded mb-6 w-72 dark:bg-gray-800"
onChange={(e)=>setSearch(e.target.value)}
/>


{/* TABLE */}

<div className="overflow-x-auto backdrop-blur-lg bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-lg">

<table className="w-full text-sm">

<thead className="bg-gray-100 dark:bg-gray-800">

<tr>

<th className="p-3 border">Title</th>
<th className="p-3 border">Message</th>
<th className="p-3 border">Status</th>
<th className="p-3 border">Reply</th>
<th className="p-3 border">Action</th>

</tr>

</thead>

<tbody>

{filteredComplaints.map((c,index)=>(

<motion.tr
key={c._id}
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.05}}
className="border text-center hover:bg-gray-50 dark:hover:bg-gray-800"
>

<td className="p-3 font-semibold">
{c.title}
</td>

<td className="p-3">
{c.message}
</td>


{/* STATUS */}

<td>

<span className={`px-3 py-1 rounded-full text-xs font-bold

${c.status==="pending" && "bg-red-200 text-red-700"}
${c.status==="resolved" && "bg-green-200 text-green-700"}

`}>

{c.status}

</span>

</td>


{/* REPLY */}

<td className="space-x-2">

<input
type="text"
placeholder="Reply..."
value={replies[c._id] || ""}
onChange={(e)=>handleReplyChange(c._id,e.target.value)}
className="border p-2 rounded dark:bg-gray-800"
/>

<button
onClick={()=>replyComplaint(c._id)}
className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition hover:scale-105"
>

Reply

</button>

</td>


{/* RESOLVE */}

<td>

{c.status==="pending" && (

<button
onClick={()=>resolveComplaint(c._id)}
className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition hover:scale-105"
>

Resolve

</button>

)}

</td>

</motion.tr>

))}

</tbody>

</table>

</div>

</div>

)

}