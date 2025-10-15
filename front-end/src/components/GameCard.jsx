import { useState } from 'react';
import { Trash2, Edit, Star, Clock, Calendar } from 'lucide-react';

const GameCard = ({ game, onEdit, onDelete }) => {
  console.log('Rendering GameCard for:', game);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(game.id);
    setShowConfirm(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Imagen del juego */}
      <div className="relative h-48 bg-gradient-to-br from-purple-500 to-blue-500 overflow-hidden">
        {game.cover ? (
          <img
            src={game.url}
            alt={game.title_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white text-6xl font-bold">
            {game.title_name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
          {game.title_name}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          {renderStars(game.stars)}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-semibold mr-2">Plataforma:</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {game.platform}
            </span>
          </div>

          {game.genre && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-semibold mr-2">Género:</span>
              <span>{game.genre}</span>
            </div>
          )}

          {game.played_hours && (
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={14} className="mr-2" />
              <span>{game.played_hours} horas</span>
            </div>
          )}

          {game.finished_date && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={14} className="mr-2" />
              <span>Completado: {new Date(game.finished_date).toLocaleDateString('es-ES')}</span>
            </div>
          )}
        </div>

        {game.notes && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {game.notes}
          </p>
        )}

        {/* Botones de acción */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(game)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
          >
            <Edit size={16} />
            Editar
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-bold mb-2">¿Eliminar juego?</h3>
            <p className="text-gray-600 mb-4">
              ¿Estás seguro de que quieres eliminar "{game.title}"?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Eliminar
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCard;