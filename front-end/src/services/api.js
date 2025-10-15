import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const gameService = {
    // Obtener todos los juegos
    getAllGames: () => api.get('/api/games'),

    // Obtener un juego por ID
    getGameById: (id) => api.get(`/api/games/${id}`),

    // Crear un nuevo juego
    createGame: (gameData) => api.post('/games', gameData),

    // Actualizar un juego existente
    updateGame: (id, gameData) => api.put(`/games/${id}`, gameData),

    // Eliminar un juego
    deleteGame: (id) => api.delete(`/games/${id}`),
};

export default api;