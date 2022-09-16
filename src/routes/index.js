import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Register from "../pages/register";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default Routing;
