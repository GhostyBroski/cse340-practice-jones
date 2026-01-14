import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NODE_ENV = process.env.NODE_ENV || 'production';
const PORT = process.env.PORT || 3000;

const app = express();

/**
 * Configure Express middleware
 */
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

/**
 * Global template variables middleware
 * 
 * Makes common variables available to all EJS templates without having to pass
 * them individually from each route handler
 */
app.use((req, res, next) => {
    // Make NODE_ENV available to all templates
    res.locals.NODE_ENV = NODE_ENV.toLowerCase() || 'production';
    // Continue to the next middleware or route handler
    next();
});

/**
 * Routes
 */
app.get('/', (req, res) => {
    const links = { homepage: '/', about: '/about', products: '/products' };
    const title = 'Welcome Home';
    res.render('home', { title, links });
});
app.get('/about', (req, res) => {
    const links = { homepage: '/', about: '/about', products: '/products' };
    const title = 'About Me';
    res.render('about', { title, links });
});
app.get('/products', (req, res) => {
    const links = { homepage: '/', about: '/about', products: '/products' };
    const title = 'Our Products';
    res.render('products', { title, links });
});
app.get('/student', (req, res) => {
    const student = { name: 'Ash Jones', id: 920634983, email: 'jon22057@byui.edu', address: '156 W 4th S Rexburg, Idaho 83440' };
    const links = { homepage: '/', about: '/about', products: '/products' };
    const title = 'Student Info';
    res.render('student', { student, title, links });
});

if (NODE_ENV.includes('dev')) {
    const ws = await import('ws');
    try {
        const wsPort = parseInt(PORT) + 1;
        const wsServer = new ws.WebSocketServer({ port: wsPort });
        wsServer.on('listening', () => {
            console.log(`WebSocket server is running on port ${wsPort}`);
        });
        wsServer.on('error', (error) => {
            console.error('WebSocket server error:', error);
        });
    } catch (error) {
        console.error('Failed to start WebSocket server:', error);
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});