import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getMyApplications();
      setApplications(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 style={{ marginBottom: '1.5rem' }}>My Applications</h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <p>Loading your applications...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>No Applications Yet</h3>
          <p style={{ color: 'var(--text-muted)' }}>You haven't applied to any jobs. Go to the dashboard to find opportunities!</p>
        </div>
      ) : (
        <div className="job-grid">
          {applications.map((app) => (
            <div key={app.id} className="job-card">
              <h3 className="job-title">{app.jobTitle}</h3>
              <div className="job-company">{app.company}</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                <span style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  background: app.status === 'Applied' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                  color: app.status === 'Applied' ? 'var(--primary)' : 'var(--success)'
                }}>
                  {app.status || 'Applied'}
                </span>

                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Applied: {new Date(app.applicationDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;
