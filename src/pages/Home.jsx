import { useState, useEffect } from 'react';
import GameList from '../components/GameList';
import GameForm from '../components/GameForm';
import {
  Gamepad2,
  Trophy,
  Clock,
  Star,
  TrendingUp,
  Calendar,
  Target,
  Award
} from 'lucide-react';

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [stats, setStats] = useState({
    totalGames: 0,
    totalHours: 0,
    averageRating: 0,
    thisMonthGames: 0,
    topPlatform: '',
    topGenre: '',
    fiveStarGames: 0
  });

  // Simulación de datos - Reemplazar con llamadas a tu API
  useEffect(() => {
    // Aquí llamarías a tu API: gameService.getAllGames()
    const mockGames = [
      {
        id: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        platform: "Nintendo Switch",
        genre: "Aventura",
        completedDate: "2024-09-15",
        rating: 5,
        hoursPlayed: 120,
        cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400",
        notes: "Obra maestra absoluta"
      },
      {
        id: 2,
        title: "God of War Ragnarök",
        platform: "PlayStation 5",
        genre: "Acción",
        completedDate: "2024-10-01",
        rating: 5,
        hoursPlayed: 45,
        cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400",
        notes: "Increíble historia y combate"
      },
      {
        id: 3,
        title: "Elden Ring",
        platform: "PC",
        genre: "RPG",
        completedDate: "2024-08-20",
        rating: 4,
        hoursPlayed: 95,
        cover: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400",
        notes: "Desafiante pero gratificante"
      }
    ];

    setGames(mockGames);
    calculateStats(mockGames);
    setLoading(false);
  }, []);

  const calculateStats = (gamesData) => {
    const totalGames = gamesData.length;
    const totalHours = gamesData.reduce((sum, game) => sum + (game.hoursPlayed || 0), 0);
    const averageRating = gamesData.reduce((sum, game) => sum + game.rating, 0) / totalGames;

    // Juegos completados este mes
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthGames = gamesData.filter(game => {
      const gameDate = new Date(game.completedDate);
      return gameDate.getMonth() === currentMonth && gameDate.getFullYear() === currentYear;
    }).length;

    // Plataforma más usada
    const platformCount = {};
    gamesData.forEach(game => {
      platformCount[game.platform] = (platformCount[game.platform] || 0) + 1;
    });
    const topPlatform = Object.keys(platformCount).reduce((a, b) =>
      platformCount[a] > platformCount[b] ? a : b, ''
    );

    // Género más jugado
    const genreCount = {};
    gamesData.forEach(game => {
      if (game.genre) {
        genreCount[game.genre] = (genreCount[game.genre] || 0) + 1;
      }
    });
    const topGenre = Object.keys(genreCount).reduce((a, b) =>
      genreCount[a] > genreCount[b] ? a : b, ''
    );

    // Juegos con 5 estrellas
    const fiveStarGames = gamesData.filter(game => game.rating === 5).length;

    setStats({
      totalGames,
      totalHours,
      averageRating: averageRating.toFixed(1),
      thisMonthGames,
      topPlatform,
      topGenre,
      fiveStarGames
    });
  };

  const handleAddGame = (gameData) => {
    // Aquí llamarías a tu API: gameService.createGame(gameData)
    const newGame = {
      ...gameData,
      id: Date.now() // En producción, el ID vendría del backend
    };

    const updatedGames = [...games, newGame];
    setGames(updatedGames);
    calculateStats(updatedGames);
    setShowForm(false);
  };

  const handleEditGame = (game) => {
    setEditingGame(game);
    setShowForm(true);
  };

  const handleUpdateGame = (gameData) => {
    // Aquí llamarías a tu API: gameService.updateGame(editingGame.id, gameData)
    const updatedGames = games.map(game =>
      game.id === editingGame.id ? { ...gameData, id: game.id } : game
    );

    setGames(updatedGames);
    calculateStats(updatedGames);
    setShowForm(false);
    setEditingGame(null);
  };

  const handleDeleteGame = (gameId) => {
    // Aquí llamarías a tu API: gameService.deleteGame(gameId)
    const updatedGames = games.filter(game => game.id !== gameId);
    setGames(updatedGames);
    calculateStats(updatedGames);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingGame(null);
  };

  const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
    <div className={`bg-gradient-to-br ${color} rounded-lg shadow-lg p-6 text-white transform hover:scale-105 transition-transform`}>
      <div className="flex items-center justify-between mb-2">
        <Icon size={32} className="opacity-80" />
        <div className="text-right">
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-sm opacity-90">{title}</p>
        </div>
      </div>
      {subtitle && (
        <p className="text-xs opacity-75 mt-2 border-t border-white border-opacity-20 pt-2">
          {subtitle}
        </p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Gamepad2 size={64} className="animate-bounce mx-auto text-purple-600 mb-4" />
          <p className="text-gray-600 text-xl">Cargando juegos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Mi Biblioteca de Juegos
          </h1>
          <p className="text-gray-600">
            Llevando un registro de los videojuegos que has completado.
          </p>
        </div>

        {/* Dashboard de Estadísticas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp size={28} />
            Estadísticas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              icon={Gamepad2}
              title="Juegos Completados"
              value={stats.totalGames}
              color="from-purple-500 to-purple-700"
            />

            <StatCard
              icon={Clock}
              title="Horas Jugadas"
              value={stats.totalHours}
              color="from-blue-500 to-blue-700"
            />

            <StatCard
              icon={Star}
              title="Rating Promedio"
              value={`${stats.averageRating} ⭐`}
              color="from-yellow-500 to-orange-600"
            />

            <StatCard
              icon={Calendar}
              title="Este Mes"
              value={stats.thisMonthGames}
              color="from-green-500 to-green-700"
              subtitle="juegos completados"
            />
          </div>

          {/* Estadísticas Adicionales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-2">
                <Target className="text-indigo-600" size={24} />
                <h3 className="font-semibold text-gray-800">Plataforma Favorita</h3>
              </div>
              <p className="text-2xl font-bold text-indigo-600">{stats.topPlatform || 'N/A'}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="text-pink-600" size={24} />
                <h3 className="font-semibold text-gray-800">Género Favorito</h3>
              </div>
              <p className="text-2xl font-bold text-pink-600">{stats.topGenre || 'N/A'}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-amber-600" size={24} />
                <h3 className="font-semibold text-gray-800">Obras Maestras</h3>
              </div>
              <p className="text-2xl font-bold text-amber-600">{stats.fiveStarGames} con 5 ⭐</p>
            </div>
          </div>
        </div>

        {/* Botón Agregar Juego */}
        {!showForm && (
          <div className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
            >
              <Gamepad2 size={24} />
              Agregar Nuevo Juego
            </button>
          </div>
        )}

        {/* Formulario */}
        {showForm && (
          <div className="mb-8">
            <GameForm
              game={editingGame}
              onSubmit={editingGame ? handleUpdateGame : handleAddGame}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {/* Lista de Juegos */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Trophy size={28} />
            Mis Juegos
          </h2>

          {games.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Gamepad2 size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No hay juegos registrados
              </h3>
              <p className="text-gray-500 mb-4">
                Comienza agregando tu primer juego completado
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Agregar mi primer juego
              </button>
            </div>
          ) : (
            <GameList
              games={games}
              onEdit={handleEditGame}
              onDelete={handleDeleteGame}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;