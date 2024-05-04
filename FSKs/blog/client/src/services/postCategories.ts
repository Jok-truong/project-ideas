import axios from "axios";

export const createCategory = async ({
  token,
  title,
}: {
  token: string;
  title: string;
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/post-categories`,
      { title },
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSingleCategory = async ({ slug }: { slug: string }) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/post-categories/${slug}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllCategories = async (
  searchKeyword = "",
  page = 1,
  limit = 10
) => {
  try {
    const { data, headers } = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/post-categories?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateCategory = async ({
  token,
  title,
  slug,
}: {
  token: string;
  title: string;
  slug: string;
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/post-categories/${slug}`,
      { title },
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteCategory = async ({
  slug,
  token,
}: {
  slug: string;
  token: string;
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/post-categories/${slug}`,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
