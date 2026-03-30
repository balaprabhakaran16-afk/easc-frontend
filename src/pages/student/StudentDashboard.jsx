import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function StudentDashboard() {
  const [totalClasses, setTotalClasses] = useState("");
  const [present, setPresent] = useState("");
  const [percentage, setPercentage] = useState(null);

  // Dummy chart data (replace with real API data later)
  const monthlyAttendance = [
    { month: "Jan", percent: 80 },
    { month: "Feb", percent: 75 },
    { month: "Mar", percent: 85 },
    { month: "Apr", percent: 70 },
    { month: "May", percent: 90 }
  ];

  const placementStats = [
    { name: "Placed", value: 3 },
    { name: "Pending", value: 2 }
  ];

  const COLORS = ["#2F855A", "#E53E3E"];

  const calculateAttendance = () => {
    if (totalClasses === "" || present === "") {
      alert("Enter values");
      return;
    }
    const percent = ((present / totalClasses) * 100).toFixed(1);
    setPercentage(percent);
  };

  return (
    <div className="min-h-screen p-10 bg-[#FFFDF5] dark:bg-[#0F172A] text-[#1F2937] dark:text-[#F6E05E] transition-all duration-500">
      
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-[#2F855A] mb-10"
      >
        Student Dashboard
      </motion.h1>

      {/* Attendance Calculator */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md mb-10"
      >
        <h2 className="text-2xl font-semibold mb-4 text-[#F6E05E]">Attendance Calculator</h2>
        <input
          type="number"
          placeholder="Total Classes"
          value={totalClasses}
          onChange={(e) => setTotalClasses(e.target.value)}
          className="border p-3 mb-4 w-full rounded-lg bg-white dark:bg-gray-800 text-[#1F2937] dark:text-[#F6E05E]"
        />
        <input
          type="number"
          placeholder="Present Classes"
          value={present}
          onChange={(e) => setPresent(e.target.value)}
          className="border p-3 mb-4 w-full rounded-lg bg-white dark:bg-gray-800 text-[#1F2937] dark:text-[#F6E05E]"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={calculateAttendance}
          className="bg-[#2F855A] hover:bg-[#276749] text-white px-4 py-2 rounded-lg w-full transition"
        >
          Calculate
        </motion.button>
      </motion.div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {[
          { text: "View Companies 🏢", link: "/student/companies", bg: "bg-blue-600", hover: "hover:bg-blue-700" },
          { text: "My Applications 📄", link: "/student/myapplications", bg: "bg-purple-600", hover: "hover:bg-purple-700" },
          { text: "Submit Complaint ⚠️", link: "/student/complaint", bg: "bg-red-600", hover: "hover:bg-red-700" }
        ].map((btn, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link to={btn.link}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`${btn.bg} ${btn.hover} text-white px-6 py-4 rounded-2xl shadow-lg w-full transition`}
              >
                {btn.text}
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Placements Button */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-10 w-64">
        <Link to="/student/placements">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow-lg w-full transition"
          >
            My Placements 🎯
          </motion.button>
        </Link>
      </motion.div>

      {/* Attendance Result */}
      {percentage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-10"
        >
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg text-center">
            <h3 className="font-semibold mb-2">Total Classes</h3>
            <p className="text-2xl">{totalClasses}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg text-center">
            <h3 className="font-semibold mb-2">Present</h3>
            <p className="text-2xl text-green-500">{present}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg text-center">
            <h3 className="font-semibold mb-2">Attendance %</h3>
            <p className="text-2xl text-blue-500">{percentage}%</p>
          </div>
        </motion.div>
      )}

      {/* Attendance Message */}
      {percentage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-xl font-semibold mb-10"
        >
          {percentage >= 75 ? (
            <p className="text-green-600">✅ Enough attendance for semester</p>
          ) : (
            <p className="text-red-600">⚠️ You need to improve the attendance</p>
          )}
        </motion.div>
      )}

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold mb-4 text-[#F6E05E]">Monthly Attendance %</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyAttendance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="percent" stroke="#2F855A" strokeWidth={3} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg text-center">
          <h3 className="font-semibold mb-4 text-[#F6E05E]">Placement Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={placementStats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {placementStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}