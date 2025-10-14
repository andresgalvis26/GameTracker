import { useState, useEffect } from 'react';
import GameCard from './GameCard';
import { Search, Filter, SortAsc } from 'lucide-react';

const GameList = ({ games, onEdit, onDelete }) => {
  const [filteredGames, setFilteredGames] = useState(games);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Obtener plataformas únicas
  const platforms = ['all', ...new Set(games.map(game => game.platform))];

  useEffect(() => {
    let result = [...games];

    // Filtrar por búsqueda
    if (searchTerm) {
      result = result.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por plataforma
    if (filterPlatform !== 'all') {
      result = result.filter(game => game.platform === filterPlatform);
    }

    // Filtrar por calificación
    if (filterRating !== 'all') {
      result = result.filter(game => game.rating >= parseInt(filterRating));
    }

    // Ordenar
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.completedDate) - new Date(a.completedDate);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'hours':
          return (b.hoursPlayed || 0) - (a.hoursPlayed || 0);
        default:
          return 0;
      }
    });

    setFilteredGames(result);
  }, [games, searchTerm, filterPlatform, filterRating, sortBy]);

  return (
    <div className="w-full">
      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        {/* Búsqueda */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar juegos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Filter size={16} className="mr-2" />
              Plataforma
            </label>
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {platforms.map(platform => (
                <option key={platform} value={platform}>
                  {platform === 'all' ? 'Todas' : platform}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Filter size={16} className="mr-2" />
              Calificación mínima
            </label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas</option>
              <option value="5">⭐ 5 estrellas</option>
              <option value="4">⭐ 4+ estrellas</option>
              <option value="3">⭐ 3+ estrellas</option>
            </select>
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <SortAsc size={16} className="mr-2" />
              Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Fecha (más reciente)</option>
              <option value="title">Título (A-Z)</option>
              <option value="rating">Calificación (mayor)</option>
              <option value="hours">Horas jugadas (mayor)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="mb-4 text-gray-600">
        Mostrando {filteredGames.length} de {games.length} juegos
      </div>

      {/* Grid de juegos */}
      {filteredGames.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron juegos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map(game => (
            <GameCard
              key={game.id}
              game={game}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameList;