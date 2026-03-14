/**
 * axios setup to use mock service
 */

import axios from 'axios'

const axiosServices = axios.create()

/* interceptor for http */
axiosServices.interceptors.response.use(
  response => response,
  error => {
    const responseData = (error.response && error.response.data) || 'Wrong Services'

    return Promise.reject(responseData)
  },
)

export default axiosServices
