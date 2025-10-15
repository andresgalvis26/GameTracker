require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { setGamesRoutes } = require('./routes/games');
const { testConnection } = require('./config/supabaseClient');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

setGamesRoutes(app);

app.get('/', (req, res) => {
    res.send('Welcome to the Games API!');
});

// Endpoint de health check
app.get('/health', async (req, res) => {
    try {
        const isConnected = await testConnection();
        
        res.json({
            status: 'OK',
            supabase: isConnected ? 'Connected' : 'Disconnected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            supabase: 'Error',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});



// Función para iniciar el servidor
const startServer = async () => {
    console.log('🚀 Iniciando servidor...');
    
    // Probar conexión con Supabase antes de iniciar el servidor
    const isConnected = await testConnection();
    
    if (!isConnected) {
        console.error('❌ No se pudo conectar con Supabase. Verifica tu configuración.');
        process.exit(1);
    }
    
    app.listen(PORT, () => {
        console.log(`✅ Server is running on http://localhost:${PORT}`);
        console.log(`📊 Supabase conectado correctamente`);
    });
};

// Iniciar el servidor
startServer().catch(error => {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
});