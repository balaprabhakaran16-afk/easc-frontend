import { useEffect, useState } from "react";
import API from "../../api/axios";
import { motion } from "framer-motion";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    companyName: "",
    role: "",
    eligibleDepartment: "",
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await API.get("/companies");
      setCompanies(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCompany = async (e) => {
    e.preventDefault();
    if (!form.companyName || !form.role) return;

    try {
      await API.post("/companies", form);
      setForm({ companyName: "", role: "", eligibleDepartment: "" });
      fetchCompanies();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCompany = async (id) => {
    if (!window.confirm("Delete this company?")) return;
    try {
      await API.delete(`/companies/${id}`);
      fetchCompanies();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-10 min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-8 text-[var(--primary)]">
        Manage Companies
      </h1>

      {/* ADD COMPANY FORM */}
      <motion.form
        onSubmit={addCompany}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-10 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-[var(--secondary)]">
          Add Company
        </h2>

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          className="border p-3 w-full mb-3 rounded-lg"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          className="border p-3 w-full mb-3 rounded-lg"
        />
        <input
          type="text"
          name="eligibleDepartment"
          placeholder="Eligible Department"
          value={form.eligibleDepartment}
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded-lg"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-[var(--primary)] hover:bg-[#276749] text-white px-4 py-2 rounded-lg w-full transition"
        >
          Add Company
        </motion.button>
      </motion.form>

      {/* COMPANY LIST */}
      {companies.length === 0 ? (
        <p className="text-gray-500">No companies added yet</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {companies.map((c, index) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold">
                  {c.companyName?.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-[var(--primary)]">
                  {c.companyName}
                </h2>
              </div>

              <p className="text-[var(--text)] mb-1">Role: {c.role}</p>
              <p className="text-[var(--text)] mb-4">
                Department: {c.eligibleDepartment || "-"}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => deleteCompany(c._id)}
                className="bg-[var(--secondary)] hover:bg-[#D6BC3E] text-black px-3 py-1 rounded transition"
              >
                Delete
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}