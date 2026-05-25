import API from "../api/api";

export const applyJob = async (jobId) => {
    const token = localStorage.getItem("token");
    
    const response = await API.post("/JobApplication/apply/",{jobId: jobId},{
        headers:{
            Authorization: `Bearer ${token}`
        }, 
    });
    return response.data;
};

export const getMyApplications = async () => {
    const responce = await API.get("/JobApplication/my-applications");
    return responce.data;
}

//Employer can view applicants for a specific job
export const getApplicationByJob  = async (jobId) => {
    const responce = await API.get(`/JobApplication/job/${jobId}/applications`);
    return responce.data;
}
