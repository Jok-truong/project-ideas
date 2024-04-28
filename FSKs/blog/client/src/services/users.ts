import axios from "axios";

export const signup = async <T>(dataForm: T) => {
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

export const getUserProfile = async ({ token }: { token: string }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/profile`,
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateProfile = async <T>({
  token,
  userData,
  userId,
}: {
  token: string;
  userData: T;
  userId: string;
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/users/updateProfile/${userId}`,
      userData,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateProfilePicture = async ({
  token,
  formData,
}: {
  token: string;
  formData: FormData;
}) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/users/updateProfilePicture`,
      formData,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
