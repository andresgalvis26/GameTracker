import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gameService } from '../services/api';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Star,
  Clock,
  Calendar,
  Gamepad2,
  Tag
} from 'lucide-react';

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchGameDetails();
  }, [id]);

  const fetchGameDetails = async () => {
    try {
      setLoading(true);
      const response = await gameService.getGameById(id);
      setGame(response.data);
    } catch (err) {
      console.error('Error al cargar detalles del juego:', err);
      // Redirigir si no se encuentra el juego
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    // Navegar a Home con el estado de edición
    navigate('/', { state: { editGame: game } });
  };

  const handleDelete = async () => {
    try {
      await gameService.deleteGame(id);
      navigate('/');
    } catch (err) {
      console.error('Error al eliminar juego:', err);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={24}
        className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Gamepad2 size={64} className="animate-bounce mx-auto text-purple-600 mb-4" />
          <p className="text-gray-600 text-xl">Cargando detalles...</p>
        </div>
      </div>
    );
  }

  if (!game) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Botón Volver */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver a la biblioteca
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header con imagen */}
          <div className="relative h-80 bg-gradient-to-br from-purple-500 to-blue-500">
            {game.cover ? (
              <img
                src={game.cover}
                alt={game.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white text-9xl font-bold">
                {game.title.charAt(0)}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-4xl font-bold text-white mb-2">{game.title}</h1>
              <div className="flex items-center gap-2">
                {renderStars(game.rating)}
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6">
            {/* Información Principal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Gamepad2 className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Plataforma</p>
                  <p className="text-lg font-semibold text-gray-800">{game.platform}</p>
                </div>
              </div>

              {game.genre && (
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <Tag className="text-purple-600" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Género</p>
                    <p className="text-lg font-semibold text-gray-800">{game.genre}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <Calendar className="text-green-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Completado</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(game.completedDate).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {game.hoursPlayed && (
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                  <Clock className="text-orange-600" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Tiempo de juego</p>
                    <p className="text-lg font-semibold text-gray-800">{game.hoursPlayed} horas</p>
                  </div>
                </div>
              )}
            </div>

            {/* Notas */}
            {game.notes && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Mis Comentarios</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{game.notes}</p>
                </div>
              </div>
            )}

            {/* Botones de Acción */}
            <div className="flex gap-4">
              <button
                onClick={handleEdit}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <Edit size={20} />
                Editar Juego
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <Trash2 size={20} />
                Eliminar
              </button>
            </div>
          </div>
        </div>

        {/* Modal de Confirmación de Eliminación */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                ¿Eliminar juego?
              </h3>
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que quieres eliminar "<strong>{game.title}</strong>"?
                Esta acción no se puede deshacer.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Sí, eliminar
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetails;