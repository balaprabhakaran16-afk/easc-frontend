import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar(){

return(

<nav className="sticky top-0 z-50 flex justify-between items-center px-10 py-4 backdrop-blur-md bg-white/60 dark:bg-black/30 border-b border-gray-200 dark:border-gray-700 shadow-sm">

{/* Logo + Title */}
<div className="flex items-center gap-3">

<img src="/logo.webp" className="w-12"/>

<h1 className="text-xl font-bold text-[var(--primary)] dark:text-[var(--secondary)]">
EASC Portal
</h1>

</div>


{/* Menu */}
<div className="flex gap-6 items-center text-[var(--text)]">

<Link 
to="/" 
className="hover:text-[var(--primary)] dark:hover:text-[var(--secondary)] transition"
>
Home
</Link>

<Link to="/login">

<button className="btn-secondary hover:scale-105 transition">
Login
</button>

</Link>

<Link to="/register">

<button className="btn-primary hover:scale-105 transition">
Register
</button>

</Link>

<div className="ml-2 relative z-50">
<ThemeToggle/>
</div>

</div>

</nav>

)

}