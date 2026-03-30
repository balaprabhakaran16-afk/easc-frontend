import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";

export default function StaffDashboard() {
  const [staff, setStaff] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    assignedClass: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchStaff = async () => {
    try {
      const res = await API.get("/staff");
      setStaff(res.data || []);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const addStaff = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/staff", form);
      setForm({ name: "", email: "", department: "", assignedClass: "" });

      // Append new staff to state — avoids table flicker
      setStaff((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding staff:", err);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-[#FFFDF5] dark:bg-[#0F172A] text-[#1F2937] dark:text-[#F6E05E] transition-all duration-500">
      <h1 className="text-3xl font-bold mb-6 text-[#2F855A] dark:text-[#F6E05E]">
        Staff Dashboard
      </h1>

      {/* Add Staff Form */}
      <form onSubmit={addStaff} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md w-96 mb-10">
        <h2 className="text-xl mb-4 font-semibold">Add Staff</h2>

        {["name", "email", "department", "assignedClass"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded bg-[#FFFDF5] dark:bg-gray-800 dark:text-[#F6E05E]"
          />
        ))}

        <button className="bg-[#2F855A] text-white px-4 py-2 rounded w-full">
          Add Staff
        </button>
      </form>

      {/* Staff Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-900 p-5 rounded-lg shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#2F855A] text-white">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Department</th>
              <th className="p-2">Class</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s._id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-800">
                <td className="p-2">{s.name}</td>
                <td className="p-2">{s.email}</td>
                <td className="p-2">{s.department}</td>
                <td className="p-2">{s.assignedClass}</td>
                <td className="p-2">
                  <Link
                    to="/attendance"
                    className="bg-[#2F855A] text-white px-3 py-1 rounded"
                  >
                    Mark Attendance
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manage Companies */}
      <div className="p-10 mt-10">
        <Link to="/staff/companies">
          <div className="p-6 bg-green-500 text-white rounded-xl shadow-lg cursor-pointer">
            <h2 className="text-xl font-semibold">Manage Companies</h2>
            <p>Add companies and manage placements</p>
          </div>
        </Link>
      </div>
    </div>
  );
}