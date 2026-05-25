import { useState } from "react";
import { createJob } from "../services/jobService";
import { useNavigate } from "react-router-dom";

function CreateJob() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salary: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createJob(job);
      alert("Job created successfully!");
      navigate('/employer-jobs');
    } catch (error) {
      console.error(error);
      alert("Failed to create job.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-card auth-card" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="auth-header">
          <h2>Post a New Job</h2>
          <p>Fill out the details below to create a new job listing.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <input 
              className="premium-input" 
              name="title" 
              placeholder="Job Title" 
              value={job.title}
              onChange={handleChange} 
              required
            />
          </div>

          <div>
            <input 
              className="premium-input" 
              name="company" 
              placeholder="Company Name" 
              value={job.company}
              onChange={handleChange} 
              required
            />
          </div>

          <div>
            <textarea
              className="premium-input"
              name="description"
              placeholder="Job Description"
              value={job.description}
              onChange={handleChange}
              rows="4"
              required
              style={{ resize: 'vertical' }}
            />
          </div>

          <div>
            <input 
              className="premium-input" 
              name="location" 
              placeholder="Location (e.g., Remote, New York)" 
              value={job.location}
              onChange={handleChange} 
              required
            />
          </div>

          <div>
            <input 
              className="premium-input" 
              name="salary" 
              placeholder="Salary (e.g., $100k - $120k)" 
              value={job.salary}
              onChange={handleChange} 
            />
          </div>

          <button 
            type="submit" 
            className="btn-premium"
            disabled={isSubmitting}
            style={{ marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? "Posting Job..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
