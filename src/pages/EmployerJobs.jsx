import { useEffect, useState } from "react";
import { getEmployerJobs } from "../services/jobService";
import { getApplicationByJob } from "../services/applicationService";

function EmployerJobs() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getEmployerJobs();
      setJobs(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplicationsByJob = async (jobId) => {
    try {
      const data = await getApplicationByJob(jobId);
      setApplications(data || []);
      setSelectedJob(jobId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 style={{ marginBottom: '1.5rem' }}>My Posted Jobs</h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <p>Loading your jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>No Jobs Posted</h3>
          <p style={{ color: 'var(--text-muted)' }}>Create a job to start seeing them here.</p>
        </div>
      ) : (
        <div className="job-grid">
          {jobs.map((job) => (
            <div className="job-card" key={job.id} style={{ border: selectedJob === job.id ? '1px solid var(--primary)' : '' }}>
              <h3 className="job-title">{job.title}</h3>
              <div className="job-company">{job.company}</div>
              <div className="job-detail">{job.location}</div>

              <div className="job-footer">
                <button
                  onClick={() => handleViewApplicationsByJob(job.id)}
                  className="btn-premium"
                  style={{ background: selectedJob === job.id ? 'var(--bg-secondary)' : '', border: selectedJob === job.id ? '1px solid var(--primary)' : '' }}
                >
                  {selectedJob === job.id ? "Viewing Applicants..." : "View Applications"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedJob && (
        <div style={{ marginTop: '4rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Applicants for Selected Job</h2>

          {applications.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: 'var(--text-muted)' }}>No applications received yet for this job.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {applications.map((app) => (
                <div key={app.id} className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                  <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{app.jobSeekerName}</h4>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.8rem' }}>{app.email}</div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <span style={{
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      background: app.status === 'Applied' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                      color: app.status === 'Applied' ? 'var(--primary)' : 'var(--success)'
                    }}>
                      Status: {app.status || 'Applied'}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {new Date(app.applicationDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EmployerJobs;
