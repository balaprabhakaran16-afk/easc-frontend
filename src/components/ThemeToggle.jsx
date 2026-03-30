import { useEffect, useState } from "react";

export default function ThemeToggle(){

const [dark,setDark] = useState(false)

useEffect(()=>{

const savedTheme = localStorage.getItem("theme")

if(savedTheme === "dark"){
document.documentElement.classList.add("dark")
setDark(true)
}

},[])

const toggleTheme = ()=>{

if(dark){
document.documentElement.classList.remove("dark")
localStorage.setItem("theme","light")
}else{
document.documentElement.classList.add("dark")
localStorage.setItem("theme","dark")
}

setDark(!dark)

}

return(

<button
onClick={toggleTheme}
className="relative z-20 px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 dark:text-white hover:scale-110 transition"
>
{dark ? "☀️" : "🌙"}
</button>

)

}