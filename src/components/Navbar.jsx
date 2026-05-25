import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";

function Navbar() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const token = localStorage.getItem("token");
  if (!token) return null;

  return (
    <nav className="premium-navbar">
      <div className="nav-brand">
        <span className="brand-logo">Job Portal</span>
      </div>

      <div className="nav-links">
        {!user && (
          <>
            <Link to="/login" className="nav-item">Login</Link>
            <Link to="/register" className="nav-item">Register</Link>
          </>
        )}

        {user && user.role === "JobSeeker" && (
          <>
            <Link to="/" className="nav-item">Dashboard</Link>
            <Link to="/my-applications" className="nav-item">My Applications</Link>
            <button onClick={handleLogout} className="btn-premium" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', width: 'auto' }}>
              Logout
            </button>
          </>
        )}

        {user && user.role === "Employer" && (
          <>
            <Link to="/" className="nav-item">Dashboard</Link>
            <Link to="/employer-jobs" className="nav-item">My Jobs</Link>
            <button onClick={handleLogout} className="btn-premium" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', width: 'auto' }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
