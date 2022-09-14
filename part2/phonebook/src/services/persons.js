import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};
const create = async (newObject) => {
  try {
    const { data } = await axios.post(baseUrl, newObject);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const update = async (newObject) => {
  try {
    const { data } = await axios.put(`${baseUrl}/${newObject.id}`, newObject);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const destroy = async (id) => {
  try {
    return await axios.delete(`${baseUrl}/${id}`);
  } catch (e) {
    console.error(e);
  }
};

export default {
  getAll,
  create,
  update,
  destroy,
};
