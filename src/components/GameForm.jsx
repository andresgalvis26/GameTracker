import { useState, useEffect } from 'react';
import { Star, Save, X } from 'lucide-react';

const GameForm = ({ game, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    genre: '',
    completedDate: '',
    rating: 3,
    hoursPlayed: '',
    cover: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (game) {
      setFormData({
        title: game.title || '',
        platform: game.platform || '',
        genre: game.genre || '',
        completedDate: game.completedDate || '',
        rating: game.rating || 3,
        hoursPlayed: game.hoursPlayed || '',
        cover: game.cover || '',
        notes: game.notes || ''
      });
    }
  }, [game]);

  const platforms = [
    'PlayStation 5',
    'PlayStation 4',
    'Xbox Series X/S',
    'Xbox One',
    'Nintendo Switch',
    'PC',
    'Steam Deck',
    'Mobile',
    'Otra'
  ];

  const genres = [
    'Acción',
    'Aventura',
    'RPG',
    'Estrategia',
    'Deportes',
    'Carreras',
    'Simulación',
    'Terror',
    'Puzzle',
    'Plataformas',
    'Shooter',
    'Fighting',
    'Otro'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }

    if (!formData.platform) {
      newErrors.platform = 'Selecciona una plataforma';
    }

    if (!formData.completedDate) {
      newErrors.completedDate = 'La fecha de finalización es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const dataToSubmit = {
        ...formData,
        hoursPlayed: formData.hoursPlayed ? parseInt(formData.hoursPlayed) : null
      };
      onSubmit(dataToSubmit);
    }
  };

  const renderStarRating = () => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingClick(star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              size={32}
              className={star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {game ? 'Editar Juego' : 'Agregar Nuevo Juego'}
      </h2>

      <div className="space-y-4">
        {/* Título */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Título del juego *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Ej: The Legend of Zelda: Breath of the Wild"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Plataforma y Género */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Plataforma *
            </label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.platform ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <option value="">Selecciona una plataforma</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
            {errors.platform && <p className="text-red-500 text-sm mt-1">{errors.platform}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Género
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona un género</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Fecha y Horas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha de finalización *
            </label>
            <input
              type="date"
              name="completedDate"
              value={formData.completedDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.completedDate ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.completedDate && <p className="text-red-500 text-sm mt-1">{errors.completedDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Horas jugadas
            </label>
            <input
              type="number"
              name="hoursPlayed"
              value={formData.hoursPlayed}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 50"
            />
          </div>
        </div>

        {/* Calificación */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Calificación *
          </label>
          {renderStarRating()}
        </div>

        {/* URL de la carátula */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            URL de la carátula
          </label>
          <input
            type="url"
            name="cover"
            value={formData.cover}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        {/* Notas */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Notas / Comentarios
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe tus comentarios sobre el juego..."
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          <Save size={20} />
          {game ? 'Guardar Cambios' : 'Agregar Juego'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          <X size={20} />
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default GameForm;