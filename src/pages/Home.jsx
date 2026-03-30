import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-all duration-500 relative overflow-hidden">

      <Navbar />

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

        <div className="absolute top-24 left-20 w-72 h-72 bg-[var(--secondary)]/30 dark:bg-[var(--secondary)]/20 rounded-full blur-3xl animate-float"></div>

        <div className="absolute bottom-24 right-20 w-72 h-72 bg-[var(--accent)]/30 dark:bg-[var(--accent)]/20 rounded-full blur-3xl animate-float-slow"></div>

      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-[85vh] text-center px-6 relative z-10">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold text-[var(--primary)] dark:text-[var(--secondary)] mb-6"
        >
          Erode Arts & Science College
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mb-10"
        >
          Smart Campus Management Portal for Students, Staff and Administration
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-6 flex-wrap justify-center"
        >

          <button className="bg-[var(--primary)] hover:opacity-90 text-white px-8 py-3 rounded-xl shadow-lg transition transform hover:scale-110">
            Explore Portal
          </button>

          <button className="bg-[var(--accent)] hover:opacity-90 text-black dark:text-white px-8 py-3 rounded-xl shadow-lg transition transform hover:scale-110">
            Learn More
          </button>

        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >

          <div className="card">
            <h3 className="text-xl font-semibold mb-2">Student Portal</h3>
            <p className="text-sm opacity-80">
              Access attendance, assignments and campus updates easily.
            </p>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-2">Staff Dashboard</h3>
            <p className="text-sm opacity-80">
              Manage classes, attendance and academic reports.
            </p>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-2">Admin Control</h3>
            <p className="text-sm opacity-80">
              Complete campus management with analytics and monitoring.
            </p>
          </div>

        </motion.div>

      </div>

      {/* Animations */}
      <style>
        {`

        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }

        .animate-float{
          animation: float 6s ease-in-out infinite;
        }

        @keyframes floatSlow {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(40px); }
        }

        .animate-float-slow{
          animation: floatSlow 8s ease-in-out infinite;
        }

        `}
      </style>

    </div>
  );
}