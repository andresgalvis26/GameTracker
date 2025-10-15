const http = require('http');

// Función helper para hacer peticiones HTTP
function makeRequest(options, data = null) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk.toString();
            });
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: body
                });
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

// Función para probar los endpoints
async function testEndpoints() {
    console.log('🚀 Iniciando pruebas de endpoints...\n');

    try {
        // Test 1: GET /api/games (lista vacía)
        console.log('📝 Test 1: GET /api/games (lista inicial)');
        const response1 = await makeRequest({
            hostname: '127.0.0.1',
            port: 3000,
            path: '/api/games',
            method: 'GET'
        });
        console.log(`Status: ${response1.statusCode}`);
        console.log(`Response: ${response1.body}\n`);

        // Test 2: POST /api/games (agregar juego)
        console.log('📝 Test 2: POST /api/games (agregar juego)');
        const gameData = {
            title: "The Legend of Zelda: Breath of the Wild",
            genre: "Adventure",
            completed: true
        };
        
        const response2 = await makeRequest({
            hostname: '127.0.0.1',
            port: 3000,
            path: '/api/games',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }, gameData);
        console.log(`Status: ${response2.statusCode}`);
        console.log(`Response: ${response2.body}\n`);

        // Test 3: POST /api/games (agregar otro juego)
        console.log('📝 Test 3: POST /api/games (agregar segundo juego)');
        const gameData2 = {
            title: "Super Mario Odyssey",
            genre: "Platform",
            completed: false
        };
        
        const response3 = await makeRequest({
            hostname: '127.0.0.1',
            port: 3000,
            path: '/api/games',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }, gameData2);
        console.log(`Status: ${response3.statusCode}`);
        console.log(`Response: ${response3.body}\n`);

        // Test 4: GET /api/games (verificar lista con juegos)
        console.log('📝 Test 4: GET /api/games (verificar lista final)');
        const response4 = await makeRequest({
            hostname: '127.0.0.1',
            port: 3000,
            path: '/api/games',
            method: 'GET'
        });
        console.log(`Status: ${response4.statusCode}`);
        console.log(`Response: ${response4.body}\n`);

        // Test 5: Probar endpoint raíz
        console.log('📝 Test 5: GET / (endpoint raíz)');
        const response5 = await makeRequest({
            hostname: '127.0.0.1',
            port: 3000,
            path: '/',
            method: 'GET'
        });
        console.log(`Status: ${response5.statusCode}`);
        console.log(`Response: ${response5.body}\n`);

        console.log('✅ Todas las pruebas completadas exitosamente!');

    } catch (error) {
        console.error('❌ Error durante las pruebas:', error.message);
    }
}

// Ejecutar las pruebas
testEndpoints();