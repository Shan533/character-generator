import axios from 'axios';

// Create axios instance with base URL from environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Request failed:', error.message);
    console.error('Error details:', error.response?.data);
    return Promise.reject(error);
  }
);

// Character API
export const characterApi = {
  // Create a new character
  createCharacter: async (data: any) => {
    const response = await api.post('/characters', data);
    return response.data;
  },
  
  // Get all characters
  getCharacters: async () => {
    const response = await api.get('/characters');
    return response.data;
  },
  
  // Get character by ID
  getCharacterById: async (id: string) => {
    const response = await api.get(`/characters/${id}`);
    return response.data;
  },
  
  // Update character
  updateCharacter: async (id: string, data: any) => {
    const response = await api.put(`/characters/${id}`, data);
    return response.data;
  },
  
  // Delete character
  deleteCharacter: async (id: string) => {
    const response = await api.delete(`/characters/${id}`);
    return response.data;
  }
};

// Image API
export const imageApi = {
  // Get all images
  getAllImages: async () => {
    const response = await api.get('/images');
    return response.data;
  },
  
  // Generate images for a character
  generateImages: async (characterId: string, count: number = 3) => {
    const response = await api.post(`/images/generate/${characterId}`, { count });
    return response.data;
  },
  
  // Get images for a character
  getImagesByCharacterId: async (characterId: string) => {
    const response = await api.get(`/images/character/${characterId}`);
    return response.data;
  },
  
  // Toggle favorite status
  toggleFavorite: async (imageId: string) => {
    const response = await api.patch(`/images/${imageId}/favorite`);
    return response.data;
  },
  
  // Refine image
  refineImage: async (imageId: string, refinedPrompt: string) => {
    const response = await api.post(`/images/${imageId}/refine`, { refinedPrompt });
    return response.data;
  }
};

export default { characterApi, imageApi }; 