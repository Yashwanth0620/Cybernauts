import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AuthProvider } from "./AuthContext";

import Home from "./components/Home";
import Events from "./components/Events";
import Footer from "./components/Footer";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import NavBar from "./components/NavBar";
import Members from "./components/Members";
import "./App.css";
import AdminLogin from "./components/AdminLogin";
import AddEventForm from "./components/Admin/AddEventForm";
import EditEventForm from "./components/Admin/EditEventForm";
import AddBlogForm from "./components/Admin/AddBlogForm";
import AddMember from "./components/Admin/AddMember";
import AcademicYearModal from "./components/Admin/AcademicYearModal";
import MemberProfile from "./components/Admin/MemberProfile";
import ViewMembers from "./components/Admin/ViewMembers";

import PrivateRoute from "./components/Admin/PrivateRoute";
import SuperAdminProfile from "./components/Admin/SuperAdminProfile";
import ViewMemberImage from "./components/Admin/ViewMemberImage";
import AddContribute from "./components/Admin/AddContribute";

function App() {
  const location = useLocation();
  return (
    <div className="container">
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<Contact />} />

        {/* mixed pages */}
        <Route path="/members" element={<Members />} />
        <Route path="/events" element={<Events />} />
        <Route path="/blog" element={<Blog />} />

        {/* admin specific pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/add-event"
          element={<PrivateRoute element={<AddEventForm />} />}
        />
        <Route
          path="/admin/edit-event"
          element={<PrivateRoute element={<EditEventForm />} />}
        />
        <Route
          path="/admin/add-blog"
          element={<PrivateRoute element={<AddBlogForm />} />}
        />
        <Route
          path="/admin/add-member"
          element={<PrivateRoute element={<AddMember />} />}
        />
        <Route
          path="/admin/academicyearmodal"
          element={<PrivateRoute element={<AcademicYearModal />} />}
        />
        <Route
          path="/admin/view-members"
          element={<PrivateRoute element={<ViewMembers />} />}
        />
        <Route
          path="/admin/view-members/profile"
          element={<PrivateRoute element={<MemberProfile />} />}
        />
        <Route
          path="/superadmin"
          element={<PrivateRoute element={< SuperAdminProfile/>} />} />
       
      </Routes>
      <Footer />
    </div>
  );
}

function WrappedApp() {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
}

export default WrappedApp;
