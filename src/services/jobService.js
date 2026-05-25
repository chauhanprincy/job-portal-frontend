import API from "../api/api";

export const getAllJobs = () => {
    return API.get("/Jobs/all");
};

export const applyJob = (jobId, token) => {
    return API.post(`/JobApplication/apply?jobId=${jobId}`, {}, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
};

//Create a new job posting
export const createJob = async(jobData) => {
    const token = localStorage.getItem("token");

    const response = await API.post("/Jobs", jobData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

//Get jobs posted by employer
export const getEmployerJobs = async() => {
    const token = localStorage.getItem("token");
    const response = await API.get("/Jobs/my-jobs", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

//Get applications for a specific job
export const getJobApplications = async(jobId) => {
    const response = await API.get(`/JobApplication/job/${jobId}/applications`);
    return response.data;
}

export default {
  getAllJobs
};