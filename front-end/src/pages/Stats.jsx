import { useState, useEffect } from 'react';
import { gameService } from '../services/api';
import {
  Gamepad2,
  TrendingUp,
  BarChart3,
  PieChart,
  Clock,
  Star,
  Trophy,
  Target
} from 'lucide-react';

const Stats = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalGames: 0,
    totalHours: 0,
    averageRating: 0,
    platformStats: [],
    genreStats: [],
    monthlyStats: [],
    topRatedGames: []
  });

  useEffect(() => {
    fetchGamesAndCalculateStats();
  }, []);

  const fetchGamesAndCalculateStats = async () => {
    try {
      setLoading(true);
      const response = await gameService.getAllGames();
      const gamesData = response.data;
      setGames(gamesData);
      calculateDetailedStats(gamesData);
    } catch (err) {
      console.error('Error al cargar estadísticas:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateDetailedStats = (gamesData) => {
    // Estadísticas básicas
    const totalGames = gamesData.length;
    const totalHours = gamesData.reduce((sum, game) => sum + (game.hoursPlayed || 0), 0);
    const averageRating = totalGames > 0
      ? (gamesData.reduce((sum, game) => sum + game.rating, 0) / totalGames).toFixed(1)
      : 0;

    // Estadísticas por plataforma
    const platformCount = {};
    const platformHours = {};
    gamesData.forEach(game => {
      platformCount[game.platform] = (platformCount[game.platform] || 0) + 1;
      platformHours[game.platform] = (platformHours[game.platform] || 0) + (game.hoursPlayed || 0);
    });

    const platformStats = Object.keys(platformCount).map(platform => ({
      platform,
      count: platformCount[platform],
      hours: platformHours[platform],
      percentage: ((platformCount[platform] / totalGames) * 100).toFixed(1)
    })).sort((a, b) => b.count - a.count);

    // Estadísticas por género
    const genreCount = {};
    gamesData.forEach(game => {
      if (game.genre) {
        genreCount[game.genre] = (genreCount[game.genre] || 0) + 1;
      }
    });

    const genreStats = Object.keys(genreCount).map(genre => ({
      genre,
      count: genreCount[genre],
      percentage: ((genreCount[genre] / totalGames) * 100).toFixed(1)
    })).sort((a, b) => b.count - a.count);

    // Juegos mejor calificados
    const topRatedGames = [...gamesData]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);

    // Juegos por mes (últimos 6 meses)
    const monthlyStats = calculateMonthlyStats(gamesData);

    setStats({
      totalGames,
      totalHours,
      averageRating,
      platformStats,
      genreStats,
      topRatedGames,
      monthlyStats
    });
  };

  const calculateMonthlyStats = (gamesData) => {
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const monthlyCounts = {};

    gamesData.forEach(game => {
      const date = new Date(game.completedDate);
      const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      monthlyCounts[monthYear] = (monthlyCounts[monthYear] || 0) + 1;
    });

    return Object.keys(monthlyCounts).map(month => ({
      month,
      count: monthlyCounts[month]
    })).slice(-6);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <BarChart3 size={64} className="animate-bounce mx-auto text-purple-600 mb-4" />
          <p className="text-gray-600 text-xl">Calculando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <TrendingUp size={40} />
            Estadísticas Detalladas
          </h1>
          <p className="text-gray-600">
            Análisis completo de tu biblioteca de juegos
          </p>
        </div>

        {/* Resumen General */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <Gamepad2 size={32} />
              <div className="text-right">
                <p className="text-4xl font-bold">{stats.totalGames}</p>
                <p className="text-sm opacity-90">Juegos Completados</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <Clock size={32} />
              <div className="text-right">
                <p className="text-4xl font-bold">{stats.totalHours}</p>
                <p className="text-sm opacity-90">Horas Totales</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <Star size={32} />
              <div className="text-right">
                <p className="text-4xl font-bold">{stats.averageRating}</p>
                <p className="text-sm opacity-90">Rating Promedio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas por Plataforma */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Target size={28} />
            Distribución por Plataforma
          </h2>
          <div className="space-y-4">
            {stats.platformStats.map((stat, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-700">{stat.platform}</span>
                  <span className="text-gray-600">
                    {stat.count} juegos ({stat.percentage}%) · {stat.hours}h
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Estadísticas por Género */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <PieChart size={28} />
              Géneros Favoritos
            </h2>
            <div className="space-y-3">
              {stats.genreStats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{stat.genre}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">{stat.count} juegos</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {stat.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Juegos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Trophy size={28} />
              Top 5 Mejor Calificados
            </h2>
            <div className="space-y-3">
              {stats.topRatedGames.map((game, index) => (
                <div key={game.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{game.title}</p>
                    <p className="text-sm text-gray-600">{game.platform}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-800">{game.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actividad Mensual */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 size={28} />
            Actividad Mensual
          </h2>
          <div className="flex items-end gap-4 h-64">
            {stats.monthlyStats.map((stat, index) => (
              <div key={index} className="flex-1 flex flex-col items-center justify-end">
                <div
                  className="w-full bg-gradient-to-t from-purple-500 to-blue-500 rounded-t-lg transition-all duration-500 hover:opacity-80"
                  style={{ height: `${(stat.count / Math.max(...stats.monthlyStats.map(s => s.count))) * 100}%` }}
                >
                  <p className="text-white font-bold text-center pt-2">{stat.count}</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">{stat.month}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;