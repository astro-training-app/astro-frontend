// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"

// Helper function for handling API responses
async function handleResponse(response) {
  const contentType = response.headers.get("content-type")

  if (contentType && contentType.includes("application/json")) {
    const data = await response.json()

    if (!response.ok) {
      const error = data.message || response.statusText
      throw new Error(error)
    }

    return data
  }

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.text()
}

// Helper function for making API requests
async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token")

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const config = {
    ...options,
    headers,
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config)
    return await handleResponse(response)
  } catch (error) {
    console.error("API request error:", error)
    throw error
  }
}

// Auth API
export const authApi = {
  login: async (email, password) => {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },

  register: async (userData) => {
    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  logout: async () => {
    return request("/auth/logout", {
      method: "POST",
    })
  },

  getProfile: async () => {
    return request("/auth/profile")
  },

  updateProfile: async (profileData) => {
    return request("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    })
  },
}

// Clients API
export const clientsApi = {
  getClients: async (filters = {}) => {
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value)
      }
    })

    const query = queryParams.toString() ? `?${queryParams.toString()}` : ""
    return request(`/clients${query}`)
  },

  getClient: async (id) => {
    return request(`/clients/${id}`)
  },

  createClient: async (clientData) => {
    return request("/clients", {
      method: "POST",
      body: JSON.stringify(clientData),
    })
  },

  updateClient: async (id, clientData) => {
    return request(`/clients/${id}`, {
      method: "PUT",
      body: JSON.stringify(clientData),
    })
  },

  deleteClient: async (id) => {
    return request(`/clients/${id}`, {
      method: "DELETE",
    })
  },

  getMeasurements: async (clientId) => {
    return request(`/clients/${clientId}/measurements`)
  },

  addMeasurement: async (clientId, measurementData) => {
    return request(`/clients/${clientId}/measurements`, {
      method: "POST",
      body: JSON.stringify(measurementData),
    })
  },
}

// Coaches API
export const coachesApi = {
  getCoaches: async (filters = {}) => {
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value)
      }
    })

    const query = queryParams.toString() ? `?${queryParams.toString()}` : ""
    return request(`/coaches${query}`)
  },

  getCoach: async (id) => {
    return request(`/coaches/${id}`)
  },
}

// Partners API
export const partnersApi = {
  getPartners: async () => {
    return request("/partners")
  },
}

export default {
  auth: authApi,
  clients: clientsApi,
  coaches: coachesApi,
  partners: partnersApi,
}
