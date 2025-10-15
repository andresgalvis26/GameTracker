const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Validar que las variables de entorno existan
if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: SUPABASE_URL y SUPABASE_ANON_KEY son requeridas');
    process.exit(1);
}

// Mensajes de log para depuración
console.log('🔧 Inicializando cliente de Supabase...');
console.log(`📍 URL: ${supabaseUrl}`);
console.log(`🔑 Key: ${supabaseKey.substring(0, 20)}...`);


const supabase = createClient(supabaseUrl, supabaseKey);

// Función para probar la conexión
const testConnection = async () => {
    try {
        console.log('🔍 Probando conexión con Supabase...');
        
        // Hacer una consulta simple para probar la conexión
        const { data, error } = await supabase
            .from('contacts') // Cambia 'games' por el nombre de una tabla que tengas
            .select('count', { count: 'exact', head: true });
        
        if (error) {
            console.error('❌ Error al conectar con Supabase:', error.message);
            return false;
        }
        
        console.log('✅ Conexión con Supabase exitosa');
        return true;
    } catch (error) {
        console.error('❌ Error inesperado al conectar con Supabase:', error.message);
        return false;
    }
};

module.exports = { supabase, testConnection };