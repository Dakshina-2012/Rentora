const express = require('express');
const cors = require('cors');
const path = require('path');

const carsRouter = require('./routes/cars');
const bookingsRouter = require('./routes/bookings');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// API Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Rentora Car Rental Management API',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Mount Routes
app.use('/api/cars', carsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);

// Serve Frontend Static Files
const staticPath = path.join(__dirname, '..');
app.use(express.static(staticPath));

// Fallback for SPA routing if loaded through server
app.get('*', (req, res) => {
    // If not an api call, send index.html
    if (!req.path.startsWith('/api/')) {
        res.sendFile(path.join(staticPath, 'index.html'));
    } else {
        res.status(404).json({ error: 'Endpoint not found' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚗 Rentora Car Rental Management Server is LIVE!`);
    console.log(`🌐 Local URL: http://localhost:${PORT}`);
    console.log(`📡 API Endpoints: http://localhost:${PORT}/api/cars`);
    console.log(`=================================================`);
});
