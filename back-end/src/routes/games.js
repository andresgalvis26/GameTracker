const express = require('express');
const GamesController = require('../controllers/gamesController');

const router = express.Router();
const gamesController = new GamesController();

router.get('/', gamesController.getAllGames.bind(gamesController));
router.get('/test-tables', gamesController.testTables.bind(gamesController));
router.post('/', gamesController.addGame.bind(gamesController));

function setGamesRoutes(app) {
    app.use('/api/games', router);
    app.use('/api/test-tables', router); // Agregar esta línea

}

module.exports = { setGamesRoutes };