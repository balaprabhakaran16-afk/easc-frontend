import { useEffect, useState } from "react";
import API from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendanceToday, setAttendanceToday] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("present");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
    fetchTodayAttendance();
    const interval = setInterval(fetchTodayAttendance, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching students");
    }
  };

  const fetchTodayAttendance = async () => {
    try {
      const res = await API.get("/attendance/today");
      setAttendanceToday(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching today's attendance");
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (id, status) => {
    try {
      if (!id) return toast.warning("Select a student first!");
      const res = await API.post("/attendance/mark", { studentId: id, status });
      toast.success(res.data.message);
      fetchTodayAttendance();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error marking attendance");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await markAttendance(studentId, status);
    setStudentId("");
  };

  const isMarked = (studentId) =>
    attendanceToday.some((a) => a.student._id === studentId);

  return (
    <div className="min-h-screen p-10 bg-[var(--bg)] text-[var(--text)]">
      <ToastContainer />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-[var(--primary)] dark:text-[var(--secondary)]"
      >
        Student Attendance
      </motion.h1>

      {/* Manual Attendance Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl mb-10 w-96"
      >
        <h2 className="text-xl font-semibold mb-4 text-[var(--secondary)]">
          Manual Attendance
        </h2>

        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full border p-3 mb-3 rounded-lg"
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.rollNo} - {s.name}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-3 mb-3 rounded-lg"
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-[var(--primary)] hover:bg-[#276749] text-white px-4 py-2 rounded-lg w-full transition"
        >
          Submit Attendance
        </motion.button>
      </motion.form>

      {/* Attendance Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <table className="w-full bg-white dark:bg-gray-900 shadow-lg rounded-2xl overflow-hidden">
            <thead className="bg-[var(--primary)] text-white">
              <tr>
                <th className="p-4">Roll No</th>
                <th className="p-4">Name</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, index) => {
                const marked = isMarked(s._id);
                const currentStatus = marked
                  ? attendanceToday.find((a) => a.student._id === s._id)?.status
                  : "Not Marked";

                return (
                  <motion.tr
                    key={s._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-center border-b hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    <td className="p-4">{s.rollNo}</td>
                    <td className="p-4">{s.name}</td>
                    <td
                      className={`p-4 font-semibold ${
                        currentStatus === "present"
                          ? "text-green-600"
                          : currentStatus === "absent"
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      {currentStatus}
                    </td>
                    <td className="p-4">
                      {!marked ? (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => markAttendance(s._id, "present")}
                            className="bg-green-500 text-white px-4 py-1 rounded-lg mr-2 transition"
                          >
                            Present
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => markAttendance(s._id, "absent")}
                            className="bg-red-500 text-white px-4 py-1 rounded-lg transition"
                          >
                            Absent
                          </motion.button>
                        </>
                      ) : (
                        <span className="text-gray-500">Marked</span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}