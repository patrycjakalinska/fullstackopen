import axios from "axios"
const baseUrl = "/api/users"

const getAll = async () => {
  const res = await axios.get(baseUrl)
  console.log("res from users.js", res)
  return res.data
}

export default {
  getAll,
}
