import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameForm from '../components/GameForm';
import { gameService } from '../services/api';
import { CheckCircle, AlertCircle } from 'lucide-react';

const AddGame = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (gameData) => {
    try {
      setLoading(true);
      setError(null);

      await gameService.createGame(gameData);

      setSuccess(true);

      // Redirigir a Home después de 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      console.error('Error al agregar juego:', err);
      setError('No se pudo agregar el juego. Verifica tu conexión con el backend.');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Agregar Nuevo Juego
          </h1>
          <p className="text-gray-600">
            Registra un juego que hayas completado
          </p>
        </div>

        {/* Mensaje de Éxito */}
        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3">
            <CheckCircle size={24} />
            <div>
              <p className="font-semibold">¡Juego agregado exitosamente!</p>
              <p className="text-sm">Redirigiendo a la página principal...</p>
            </div>
          </div>
        )}

        {/* Mensaje de Error */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
            <AlertCircle size={24} />
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-700 hover:text-red-900"
            >
              ✕
            </button>
          </div>
        )}

        {/* Formulario */}
        {!success && (
          <GameForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default AddGame;