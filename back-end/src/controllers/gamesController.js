const { supabase } = require('../config/supabaseClient');

class GamesController {
    // constructor() {
    //     this.games = [];
    // }

    async getAllGames(req, res) {
        try {
            console.log('🔍 Intentando obtener todos los juegos...');
            console.log('📍 Tabla: finished_videogames');
            
            const { data, error } = await supabase.from('finished_videogames').select('*');
            
            console.log('📊 Resultado de la consulta:');
            console.log('- Data:', data);
            console.log('- Error:', error);
            
            if (error) {
                console.error('❌ Error en la consulta:', error.message);
                return res.status(500).json({ error: error.message });
            }
            
            console.log(`✅ Se obtuvieron ${data ? data.length : 0} registros`);
            res.status(200).json(data);
        } catch (error) {
            console.error('❌ Error inesperado:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    // Método para probar diferentes nombres de tabla
    async testTables(req, res) {
        const possibleTables = ['contacts', 'games', 'contacts', 'game'];
        
        console.log('🧪 Probando diferentes nombres de tabla...');
        
        for (const tableName of possibleTables) {
            try {
                console.log(`🔍 Probando tabla: ${tableName}`);
                const { data, error } = await supabase.from(tableName).select('*');
                
                if (!error) {
                    console.log(`✅ Tabla ${tableName} existe y es accesible`);
                    console.log('- Data:', data);
                } else {
                    console.log(`❌ Error con tabla ${tableName}:`, error.message);
                }
            } catch (error) {
                console.log(`❌ Error inesperado con tabla ${tableName}:`, error.message);
            }
        }
        
        res.json({ message: 'Prueba de tablas completada. Revisa los logs del servidor.' });
    }

    addGame(req, res) {
        const { title, genre, completed } = req.body;
        const newGame = { title, genre, completed };
        this.games.push(newGame);
        res.status(201).json(newGame);
    }
}

module.exports = GamesController;