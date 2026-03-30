import { useEffect, useState } from "react";
import axios from "axios";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    cgpa: "",
    skills: "",
    resume: null
  });

  // =========================
  // FETCH COMPANIES
  // =========================
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/companies");
      setCompanies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // FORM INPUT HANDLERS
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFile = (e) => {
    setForm({
      ...form,
      resume: e.target.files[0]
    });
  };

  // =========================
  // SUBMIT APPLICATION
  // =========================
  const submitApplication = async (e) => {
    e.preventDefault();

    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      alert("Student ID not found. Please login again.");
      return;
    }

    try {
      const data = new FormData();
      data.append("studentId", studentId);
      data.append("companyId", selectedCompany);
      data.append("fullName", form.fullName);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("department", form.department);
      data.append("cgpa", form.cgpa);
      data.append("skills", form.skills);
      data.append("resume", form.resume);

      await axios.post(
        "http://localhost:5000/api/companies/apply",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Application Submitted 🎉");
      setSelectedCompany(null);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        department: "",
        cgpa: "",
        skills: "",
        resume: null
      });
    } catch (err) {
      console.log(err);
      alert("Application Failed ❌");
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Available Companies</h1>

      {/* Company List */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {companies.map((company) => (
          <div key={company._id} className="p-6 bg-white shadow rounded-xl">
            <h2 className="text-xl font-bold">{company.companyName}</h2>
            <p className="mt-2">Role: {company.role}</p>
            <p>Dept: {company.eligibleDepartment}</p>

            <button
              onClick={() => setSelectedCompany(company._id)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        ))}
      </div>

      {/* Application Form */}
      {selectedCompany && (
        <form
          onSubmit={submitApplication}
          className="bg-white p-6 rounded shadow w-96"
        >
          <h2 className="text-xl mb-4">Application Form</h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            value={form.fullName}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            required
            value={form.phone}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            required
            value={form.department}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
          />
          <input
            type="text"
            name="cgpa"
            placeholder="CGPA"
            required
            value={form.cgpa}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills"
            required
            value={form.skills}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
          />
          <input
            type="file"
            required
            onChange={handleFile}
            className="mb-3"
          />

          <button className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700">
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
}