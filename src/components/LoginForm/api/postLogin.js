import { axiosDB } from "../../../api/axiosAPI";

export const postLogin = async (post) => {
  try {
    const data = await axiosDB.post("api/members/login", post);
    return data;
  } catch (error) {}
};


