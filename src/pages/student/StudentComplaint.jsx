import { useState } from "react";
import API from "../../api/axios"; // ✅ use API instance
import { useNavigate } from "react-router-dom";

export default function StudentComplaint(){

  const navigate = useNavigate();

  const [form,setForm] = useState({
    title:"",
    message:""
  });

  const studentId = localStorage.getItem("studentId");

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(!studentId){
      alert("Session expired. Please login again ❌");
      return;
    }

    try{

      await API.post("/complaints",{
        ...form,
        student:studentId
      }); // ✅ FIXED

      alert("Complaint submitted successfully ✅");

      navigate("/student/dashboard");

    }catch(err){

      console.log("SUBMIT ERROR:", err);

      alert("Error submitting complaint ❌");

    }

  };

  return(

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-96"
      >

        <h1 className="text-2xl font-bold mb-6">
          Submit Complaint
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Complaint Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <textarea
          name="message"
          placeholder="Write your complaint..."
          value={form.message}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          rows="4"
          required
        />

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700 transition"
        >
          Submit Complaint
        </button>

      </form>

    </div>

  );

}