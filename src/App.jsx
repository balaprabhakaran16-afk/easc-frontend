import { BrowserRouter,Routes,Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import StaffDashboard from "./pages/staff/StaffDashboard";
import Attendance from "./pages/staff/Attendance"
import StudentDashboard from "./pages/student/StudentDashboard";
import Companies from "./pages/staff/Companies"
import StudentCompanies from "./pages/student/Companies";
import MyApplications from "./pages/student/MyApplications";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCompanies from "./pages/admin/Companies"
import AdminApplications from "./pages/admin/AdminApplications"
import AdminStudents from "./pages/admin/AdminStudents"
import AdminStaff from "./pages/admin/AdminStaff"
import AdminStudentProfile from "./pages/admin/AdminStudentProfile"
import StudentComplaint from "./pages/student/StudentComplaint";
import AdminComplaints from "./pages/admin/AdminComplaints"
import AdminPlacements from "./pages/admin/AdminPlacements"
import StudentPlacement from "./pages/student/StudentPlacement"


function App(){

 return(

 <BrowserRouter>

 <Routes>

 <Route path="/" element={<Home/>}/>

 <Route path="/login" element={<Login/>}/>

 <Route path="/register" element={<Register/>}/>
 <Route path="/staff" element={<StaffDashboard/>} />
 <Route path="/attendance" element={<Attendance/>}/>
 <Route path="/student" element={<StudentDashboard/>}/>
 <Route path="/staff/companies" element={<Companies/>}/>
 <Route path="/student/companies" element={<StudentCompanies />} />
 <Route path="/student/myapplications" element={<MyApplications/>}/>
 <Route path="/admin" element={<AdminDashboard/>}/>
 <Route path="/admin/companies" element={<AdminCompanies/>}/>
 <Route path="/admin/applications" element={<AdminApplications/>}/>
 <Route path="/admin/students" element={<AdminStudents/>}/>
 <Route path="/admin/staff" element={<AdminStaff/>}/>
 <Route path="/admin/student/:id" element={<AdminStudentProfile/>}/>
 <Route path="/student/complaint" element={<StudentComplaint/>}/>
 <Route path="/admin/complaints" element={<AdminComplaints/>}/>
 <Route path="/admin/placements" element={<AdminPlacements/>}/>
 <Route path="/student/placements" element={<StudentPlacement/>}/>

 <Route path="/student/dashboard" element={<StudentDashboard/>} />

 </Routes>

 </BrowserRouter>

 )

}

export default App