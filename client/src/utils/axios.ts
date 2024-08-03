import a from "axios"
const BASE_URL = import.meta.env.DEV
  ? "http://127.0.0.1:8787/api/v1/"
  : "https://api.ajaymishra5277919886.workers.dev/api/v1/"

const axios = a.create({
  baseURL: BASE_URL
})

export default axios
