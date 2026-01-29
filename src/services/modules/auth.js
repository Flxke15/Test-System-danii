import { axios } from "../configuration"

export default {
  login(payload) {
    return axios.post(`/api/auth/login`, payload)
  },

  logout() {
    return axios.post(`/api/auth/logout`)
  }
}