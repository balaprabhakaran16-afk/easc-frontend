import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {

const navigate = useNavigate();

const [form, setForm] = useState({
name: "",
email: "",
password: "",
role: "student",
rollNo: "",
department: ""
});

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const register = async (e) => {

e.preventDefault();

try {

await API.post("/auth/register", form);

alert("Registered Successfully 🎉");

navigate("/login");

} catch (err) {

alert("Registration Failed");
console.log(err);

}

};

return (

<div className="min-h-screen flex items-center justify-center bg-[var(--bg)] text-[var(--text)] transition-all duration-500 px-4">

<motion.form
onSubmit={register}
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="w-full max-w-md backdrop-blur-lg bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl p-10 rounded-2xl"
>

<h2 className="text-3xl font-bold mb-6 text-center text-[var(--primary)] dark:text-[var(--secondary)]">
Register
</h2>

<input
name="name"
placeholder="Full Name"
value={form.name}
onChange={handleChange}
className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-[var(--primary)]"
/>

<select
name="role"
value={form.role}
onChange={handleChange}
className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-[var(--primary)]"
>
<option value="student">Student</option>
<option value="staff">Staff</option>
<option value="admin">Admin</option>
</select>

{/* Student Roll Number */}

{form.role === "student" && (

<input
name="rollNo"
placeholder="Roll Number"
value={form.rollNo}
onChange={handleChange}
className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-[var(--primary)]"
/>

)}

{/* Department */}

{(form.role === "student" || form.role === "staff") && (

<select
name="department"
value={form.department}
onChange={handleChange}
className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-[var(--primary)]"
>

<option value="">Select Department</option>
<option value="BSC-CS">BSC-CS</option>
<option value="BCA">BCA</option>
<option value="BBA">BBA</option>
<option value="MSC-CS">MSC-CS</option>
<option value="MCA">MCA</option>
<option value="IT">IT</option>
<option value="CT">CT</option>
<option value="BSC">BSC</option>

</select>

)}

<input
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-[var(--primary)]"
/>

<input
type="password"
name="password"
placeholder="Password"
value={form.password}
onChange={handleChange}
className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 mb-6 rounded-lg outline-none focus:ring-2 focus:ring-[var(--primary)]"
/>

<button className="w-full bg-[var(--primary)] hover:opacity-90 text-white py-3 rounded-lg font-semibold transition transform hover:scale-105">
Create Account
</button>

<p className="text-center mt-6 text-sm">

Already have an account?{" "}

<Link
to="/login"
className="text-[var(--primary)] dark:text-[var(--secondary)] font-semibold hover:underline"
>
Login
</Link>

</p>

</motion.form>

</div>

);

}