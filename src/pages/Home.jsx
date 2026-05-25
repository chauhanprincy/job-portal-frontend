import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import { applyJob } from "../services/applicationService";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(null);
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchJobs();
    }
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      const response = await getAllJobs();
      setJobs(response.data || []);
    } catch (error) {
      console.error("Error fetching jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    setApplying(jobId);
    try {
      await applyJob(jobId);
      alert("Applied Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to apply. You might have already applied or there's an issue.");
    } finally {
      setApplying(null);
    }
  };

  return (
    <div className="dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Available Jobs</h2>
        {user?.role === 'Employer' && (
          <button onClick={() => navigate('/create-job')} className="btn-premium" style={{ width: 'auto' }}>
            + Post a New Job
          </button>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <p>Loading jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>No Jobs Found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Check back later for new opportunities.</p>
        </div>
      ) : (
        <div className="job-grid">
          {jobs.map((job) => (
            <div className="job-card" key={job.id}>
              <h3 className="job-title">{job.title}</h3>
              <div className="job-company">{job.company}</div>
              
              <div className="job-detail">
                {job.location}
              </div>

              <div className="job-footer">
                {user?.role === "JobSeeker" ? (
                  <button 
                    onClick={() => handleApply(job.id)} 
                    className="btn-premium"
                    disabled={applying === job.id}
                    style={{ opacity: applying === job.id ? 0.7 : 1 }}
                  >
                    {applying === job.id ? "Applying..." : "Apply Now"}
                  </button>
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', padding: '0.8rem 0' }}>
                    {user?.role === "Employer" ? "You are viewing this as an Employer" : "Login as JobSeeker to apply"}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
