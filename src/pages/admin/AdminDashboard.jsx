import { useEffect,useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function AdminDashboard(){

const [stats,setStats] = useState({})

/* ✅ FIX ONLY HERE */
const baseURL =
window.location.hostname === "localhost"
? "http://localhost:5000"
: "https://eascbackend.onrender.com"

useEffect(()=>{

axios
.get(`${baseURL}/api/application/admin/stats`)
.then(res=>setStats(res.data))
.catch(err=>console.error(err))

},[])

const cards = [

{
title:"Students",
value:stats.students || 0,
color:"from-blue-500 to-blue-700",
link:"/admin/students"
},

{
title:"Staff",
value:stats.staff || 0,
color:"from-purple-500 to-purple-700",
link:"/admin/staff"
},

{
title:"Companies",
value:stats.companies || 0,
color:"from-green-500 to-green-700",
link:"/admin/companies"
},

{
title:"Applications",
value:stats.applications || 0,
color:"from-red-500 to-red-700",
link:"/admin/applications"
},

{
title:"Complaints",
value:stats.complaints || 0,
color:"from-orange-500 to-orange-700",
link:"/admin/complaints"
}

]

return(

<div className="p-10 min-h-screen bg-gray-100 dark:bg-gray-900">

{/* TITLE */}

<motion.h1
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="text-4xl font-bold mb-10 text-gray-800 dark:text-white"
>

Admin Dashboard

</motion.h1>


{/* STAT CARDS */}

<div className="grid md:grid-cols-5 gap-6 mb-12">

{cards.map((card,index)=>(

<motion.div
key={index}
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.1}}
whileHover={{scale:1.05}}
className={`bg-gradient-to-r ${card.color} text-white p-6 rounded-xl shadow-xl`}
>

<h2 className="text-lg opacity-80">

{card.title}

</h2>

<p className="text-4xl font-bold mt-2 mb-4">

{card.value}

</p>

<Link to={card.link}>

<button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded transition">

View

</button>

</Link>

</motion.div>

))}

</div>


{/* ANALYTICS SECTION */}

<div className="grid md:grid-cols-2 gap-8 mb-12">

{/* Placement Analytics */}

<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">

<h2 className="text-xl font-bold mb-6 text-gray-700 dark:text-white">

Placement Analytics

</h2>

<div className="space-y-4">

<div>
<p className="text-sm mb-1">Applications</p>
<div className="w-full bg-gray-200 h-3 rounded">
<div
className="bg-blue-500 h-3 rounded"
style={{width:"70%"}}
></div>
</div>
</div>

<div>
<p className="text-sm mb-1">Selected</p>
<div className="w-full bg-gray-200 h-3 rounded">
<div
className="bg-green-500 h-3 rounded"
style={{width:"40%"}}
></div>
</div>
</div>

<div>
<p className="text-sm mb-1">Rejected</p>
<div className="w-full bg-gray-200 h-3 rounded">
<div
className="bg-red-500 h-3 rounded"
style={{width:"30%"}}
></div>
</div>
</div>

</div>

</div>


{/* Department Stats */}

<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">

<h2 className="text-xl font-bold mb-6 text-gray-700 dark:text-white">

Department Placement

</h2>

<div className="space-y-4">

<div className="flex justify-between">
<span>CSE</span>
<span>80%</span>
</div>

<div className="w-full bg-gray-200 h-3 rounded mb-3">
<div className="bg-indigo-500 h-3 rounded w-[80%]"></div>
</div>


<div className="flex justify-between">
<span>BCA</span>
<span>65%</span>
</div>

<div className="w-full bg-gray-200 h-3 rounded mb-3">
<div className="bg-purple-500 h-3 rounded w-[65%]"></div>
</div>


<div className="flex justify-between">
<span>BBA</span>
<span>55%</span>
</div>

<div className="w-full bg-gray-200 h-3 rounded">
<div className="bg-pink-500 h-3 rounded w-[55%]"></div>
</div>

</div>

</div>

</div>


{/* BOTTOM SECTION */}

<div className="grid md:grid-cols-2 gap-8">

{/* Recent Activity */}

<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">

<h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">

Recent Activity

</h2>

<ul className="space-y-3 text-gray-600 dark:text-gray-300">

<li>📄 New application submitted</li>
<li>🏢 Company added</li>
<li>👨‍🎓 Student registered</li>
<li>⚠️ New complaint raised</li>

</ul>

</div>


{/* Quick Actions */}

<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">

<h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">

Quick Actions

</h2>

<div className="flex flex-wrap gap-4">

<Link to="/admin/students">
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:scale-105 transition">
Students
</button>
</Link>

<Link to="/admin/staff">
<button className="bg-purple-500 text-white px-4 py-2 rounded hover:scale-105 transition">
Staff
</button>
</Link>

<Link to="/admin/companies">
<button className="bg-green-500 text-white px-4 py-2 rounded hover:scale-105 transition">
Companies
</button>
</Link>

<Link to="/admin/applications">
<button className="bg-red-500 text-white px-4 py-2 rounded hover:scale-105 transition">
Applications
</button>
</Link>

</div>

</div>

</div>

</div>

)

}