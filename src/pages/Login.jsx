import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/axios";

export default function Login() {

const navigate = useNavigate();

const [form, setForm] = useState({
email: "",
password: ""
});

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const login = async (e) => {

e.preventDefault();

try {

const res = await API.post("/auth/login", form);

alert("Login Successful ✅");

localStorage.setItem("token", res.data.token);
localStorage.setItem("role", res.data.role);

if (res.data.studentId) {
localStorage.setItem("studentId", res.data.studentId);
}

const ok = window.confirm("Login Successful. Go to dashboard?");

if (ok) {

if (res.data.role === "staff") navigate("/staff");
else if (res.data.role === "student") navigate("/student");
else if (res.data.role === "admin") navigate("/admin");

}

} catch (err) {

alert("Invalid Email or Password ❌");
console.log(err);

}

};

return (

<div className="min-h-screen flex items-center justify-center bg-[var(--bg)] text-[var(--text)] transition-all duration-500 px-4">

<motion.form
onSubmit={login}
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="w-full max-w-md backdrop-blur-lg bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl p-10 rounded-2xl"
>

<h2 className="text-3xl font-bold mb-6 text-center text-[var(--primary)] dark:text-[var(--secondary)]">
Login
</h2>

<input
name="email"
placeholder="Email"
onChange={handleChange}
className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-[var(--primary)]"
/>

<input
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 mb-6 rounded-lg outline-none focus:ring-2 focus:ring-[var(--primary)]"
/>

<button className="w-full bg-[var(--primary)] hover:opacity-90 text-white py-3 rounded-lg font-semibold transition transform hover:scale-105">
Login
</button>

<p className="text-center mt-6 text-sm">

Don't have an account?{" "}

<Link
to="/register"
className="text-[var(--primary)] dark:text-[var(--secondary)] font-semibold hover:underline"
>
Register
</Link>

</p>

</motion.form>

</div>

);

}