import { motion } from "framer-motion";

export default function Hero(){

return(

<div className="flex flex-col items-center justify-center h-[80vh] text-center bg-gradient-to-r from-collegeGreen to-collegeYellow">

<motion.h1
initial={{opacity:0,y:-50}}
animate={{opacity:1,y:0}}
transition={{duration:1}}
className="text-5xl font-bold text-white"
>

Erode Arts & Science College

</motion.h1>

<motion.p
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.5}}
className="mt-6 text-lg text-white"
>

Smart Campus Management Portal

</motion.p>

<motion.button
whileHover={{scale:1.1}}
className="mt-8 bg-collegePink text-white px-6 py-3 rounded-lg shadow-lg"
>

Explore Portal

</motion.button>

</div>

)

}