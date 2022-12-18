import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.put(
    `${baseUrl}/${newObject.id}`,
    {
      ...newObject,
      likes: newObject.likes + 1,
    },
    config
  )
  return res.data
}

const remove = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.delete(`${baseUrl}/${newObject.id}`, config)
  return res.data
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
}
