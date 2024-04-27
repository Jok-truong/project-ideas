import axios from "axios";

export const signup = async <T>(dataForm: T) => {
  console.log(import.meta.env.VITE_BASE_URL, "@");

  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      dataForm
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const login = async <T>(dataForm: T) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      dataForm
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
