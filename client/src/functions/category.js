import axios from "axios";

export const getCategories = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API}/categories`
  );
};