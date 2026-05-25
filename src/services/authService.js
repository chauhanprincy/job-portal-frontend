import API from "../api/api";

export const registerUser = async (data) => {
  const response = await API.post("/Auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await API.post("/Auth/login", data);
  return response.data;
};
