const { default: axiosInstance } = require(".");

// REGISTER USER
export const registerUser = async (payload) => {
   try {
      const response = await axiosInstance.post('/api/users/register', payload)
      return response.data
   } catch (error) {
      return error.response.data
   }
}

// LOGIN USER

export const loginUser = async (payload) => {
   try {
      const response = await axiosInstance.post('/api/users/login', payload)
      return response.data
   } catch (error) {
      return error.response.data
   }
}


// Get User Information

export const getUserInfo = async () => {
   try {
      const response = await axiosInstance.post('/api/users/get-user-info')
      return response.data
   } catch (error) {
      return error.response.data
   }
}