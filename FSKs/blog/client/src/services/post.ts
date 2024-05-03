import axios from "axios";

export const createPost = async ({ token }: { token: string }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/posts`,
      {},
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSinglePost = async ({ slug }: { slug: string }) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/posts/${slug}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updatePost = async ({
  updatedData,
  slug,
  token,
}: {
  updatedData: FormData;
  slug: string;
  token: string;
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/posts/${slug}`,
      updatedData,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllPosts = async (searchKeyword = "", page = 1, limit = 10) => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/posts?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deletePost = async ({
  token,
  slug,
}: {
  token: string;
  slug: string;
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/posts/${slug}`,
      config
    );
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
