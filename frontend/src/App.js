import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Events from "./components/Events"
import Footer from "./components/Footer";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import NavBar from "./components/NavBar";
import Members from "./components/Members"
import "./App.css";
import AdminLogin from "./components/AdminLogin";
import AddEventForm from "./components/Admin/AddEventForm";
import EditEventForm from "./components/Admin/EditEventForm";
import AddBlogForm from "./components/Admin/AddBlogForm";
import AddMember from "./components/Admin/AddMember";
import AcademicYearModal from "./components/Admin/AcademicYearModal";
import MemberProfile from "./components/Admin/MemberProfile";
import ViewMembers from "./components/Admin/ViewMembers";
function App() {
  const location = useLocation();
  return (
    <div className="container">
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/members" element={<Members  />} />
        
        <Route path="/events" element={<Events />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin/add-event" element={<AddEventForm />}></Route>
        <Route path="/admin/edit-event" element={<EditEventForm />}></Route>
        <Route path="/admin/add-blog" element={<AddBlogForm />}></Route>
         <Route path="/admin/add-member" element={<AddMember/>}></Route> 
         <Route path="/admin/academicyearmodal" element={<AcademicYearModal/>} />
         <Route path="/admin/Member-Profile" element={<MemberProfile/>} />
         <Route path="/admin/view-members" element={<ViewMembers/>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default WrappedApp;
