import axios from 'axios';

// Hardcode the API URL directly to avoid any issues with environment variables
const API_URL = 'https://character-generator-y9jf.onrender.com/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Log the API URL being used at startup
console.log('API URL hardcoded to:', API_URL);

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  // Force the base URL to be the hardcoded one
  config.baseURL = API_URL;
  
  console.log('Making request to:', config.url || '');
  console.log('Full URL:', API_URL + (config.url || ''));
  console.log('Method:', config.method || '');
  console.log('Headers:', config.headers);
  return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.statusText);
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
    console.log('Creating character with data:', data);
    const response = await axios.post(`${API_URL}/characters`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },
  
  // Get all characters
  getCharacters: async () => {
    console.log('Fetching all characters');
    const response = await axios.get(`${API_URL}/characters`);
    return response.data;
  },
  
  // Get character by ID
  getCharacterById: async (id: string) => {
    console.log('Fetching character with ID:', id);
    const response = await axios.get(`${API_URL}/characters/${id}`);
    return response.data;
  },
  
  // Update character
  updateCharacter: async (id: string, data: any) => {
    console.log('Updating character with ID:', id);
    const response = await axios.put(`${API_URL}/characters/${id}`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },
  
  // Delete character
  deleteCharacter: async (id: string) => {
    console.log('Deleting character with ID:', id);
    const response = await axios.delete(`${API_URL}/characters/${id}`);
    return response.data;
  }
};

// Image API
export const imageApi = {
  // Generate images for a character
  generateImages: async (characterId: string, count: number = 3) => {
    console.log('Generating images for character:', characterId);
    const response = await axios.post(`${API_URL}/images/generate/${characterId}`, { count }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },
  
  // Get images for a character
  getImagesByCharacterId: async (characterId: string) => {
    const response = await axios.get(`${API_URL}/images/character/${characterId}`);
    return response.data;
  },
  
  // Toggle favorite status
  toggleFavorite: async (imageId: string) => {
    const response = await axios.patch(`${API_URL}/images/${imageId}/favorite`);
    return response.data;
  },
  
  // Refine image
  refineImage: async (imageId: string, refinedPrompt: string) => {
    const response = await axios.post(`${API_URL}/images/${imageId}/refine`, { refinedPrompt }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  }
};

export default { characterApi, imageApi }; 