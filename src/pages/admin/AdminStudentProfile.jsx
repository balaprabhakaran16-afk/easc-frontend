import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"

export default function AdminStudentProfile(){

const { id } = useParams()

const [student,setStudent] = useState(null)

useEffect(()=>{

axios
.get(`http://localhost:5000/api/students/profile/${id}`)
.then(res=>{
setStudent(res.data.student)
})
.catch(err=>{
console.log(err)
})

},[id])


if(!student){

return (
<div className="p-10">
<h1 className="text-xl">Loading Student Profile...</h1>
</div>
)

}

return(

<div className="min-h-screen p-10 bg-[var(--bg)] text-[var(--text)]">


{/* TITLE */}

<motion.h1
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="text-4xl font-bold mb-10 text-[var(--primary)] dark:text-[var(--secondary)]"
>

Student Profile

</motion.h1>


{/* PROFILE CARD */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="backdrop-blur-lg bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-lg p-8 max-w-xl"
>


{/* AVATAR */}

<div className="flex items-center gap-6 mb-6">

<div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">

{student.name?.charAt(0)}

</div>

<div>

<h2 className="text-2xl font-bold">
{student.name}
</h2>

<p className="text-gray-500 dark:text-gray-400">
{student.email}
</p>

</div>

</div>


{/* STUDENT DETAILS */}

<div className="space-y-3">

<p>
<b>Department:</b> {student.department}
</p>

<p>
<b>Roll Number:</b> {student.rollNo}
</p>

</div>

</motion.div>


{/* STATS CARDS */}

<div className="grid md:grid-cols-3 gap-6 mt-10">

<motion.div whileHover={{scale:1.05}}
className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-indigo-500 to-indigo-700 text-white">

<h2>Department</h2>
<p className="text-2xl font-bold">{student.department}</p>

</motion.div>

<motion.div whileHover={{scale:1.05}}
className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-green-500 to-green-700 text-white">

<h2>Roll Number</h2>
<p className="text-2xl font-bold">{student.rollNo}</p>

</motion.div>

<motion.div whileHover={{scale:1.05}}
className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white">

<h2>Email</h2>
<p className="text-sm break-all">{student.email}</p>

</motion.div>

</div>

</div>

)

}