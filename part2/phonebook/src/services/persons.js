import axios from "axios";
const baseUrl = "/api/persons";

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};
const create = async (newObject) => {
  const { data } = await axios.post(baseUrl, newObject);
  return data;
};

const update = async (newObject) => {
  console.log("data frotned", newObject);
  const { data } = await axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return data;
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
