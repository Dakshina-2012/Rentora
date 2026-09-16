const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../database');

// GET /api/cars (supports ?search=, ?category=, ?fuel=, ?transmission=, ?sort=)
router.get('/', (req, res) => {
    const db = readDB();
    let cars = [...db.cars];

    const { search, category, fuel, transmission, minPrice, maxPrice, seats, available, sort } = req.query;

    if (search) {
        const q = search.toLowerCase();
        cars = cars.filter(c => 
            c.brand.toLowerCase().includes(q) || 
            c.model.toLowerCase().includes(q) ||
            `${c.brand} ${c.model}`.toLowerCase().includes(q)
        );
    }

    if (category && category !== 'All') {
        cars = cars.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }

    if (fuel && fuel !== 'All') {
        cars = cars.filter(c => c.fuelType.toLowerCase() === fuel.toLowerCase());
    }

    if (transmission && transmission !== 'All') {
        cars = cars.filter(c => c.transmission.toLowerCase() === transmission.toLowerCase());
    }

    if (seats && seats !== 'All') {
        if (seats === '7+') {
            cars = cars.filter(c => c.seats >= 7);
        } else {
            cars = cars.filter(c => c.seats === parseInt(seats));
        }
    }

    if (available !== undefined && available !== 'All') {
        const isAvail = available === 'true';
        cars = cars.filter(c => c.available === isAvail);
    }

    if (minPrice) {
        cars = cars.filter(c => c.pricePerDay >= parseInt(minPrice));
    }
    if (maxPrice) {
        cars = cars.filter(c => c.pricePerDay <= parseInt(maxPrice));
    }

    // Sorting
    if (sort === 'price-asc') {
        cars.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sort === 'price-desc') {
        cars.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sort === 'popularity') {
        cars.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else if (sort === 'newest') {
        cars.sort((a, b) => b.year - a.year);
    }

    res.json(cars);
});

// GET /api/cars/:id
router.get('/:id', (req, res) => {
    const db = readDB();
    const car = db.cars.find(c => c.id === req.params.id);
    if (!car) {
        return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
});

// POST /api/cars (Add car)
router.post('/', (req, res) => {
    const db = readDB();
    const newCar = {
        id: 'car-' + Date.now(),
        brand: req.body.brand || 'Rentora',
        model: req.body.model || 'Model',
        year: parseInt(req.body.year) || new Date().getFullYear(),
        category: req.body.category || 'Sedan',
        pricePerDay: parseInt(req.body.pricePerDay) || 3000,
        fuelType: req.body.fuelType || 'Petrol',
        transmission: req.body.transmission || 'Automatic',
        seats: parseInt(req.body.seats) || 5,
        mileage: req.body.mileage || '16 km/l',
        power: req.body.power || '150 hp',
        acceleration: req.body.acceleration || '0-100 in 9s',
        topSpeed: req.body.topSpeed || '180 km/h',
        available: req.body.available !== undefined ? Boolean(req.body.available) : true,
        rating: 4.8,
        reviewCount: 1,
        popularity: 85,
        image: req.body.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
        gallery: req.body.gallery || [req.body.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'],
        features: req.body.features || ['Air Conditioning', 'Bluetooth', 'GPS', 'Cruise Control'],
        description: req.body.description || 'Modern and reliable car offering exceptional comfort and efficiency.',
        fuelPolicy: req.body.fuelPolicy || 'Full to Full',
        deposit: req.body.deposit || 5000,
        freeCancellation: req.body.freeCancellation || 'Free cancellation up to 24 hours before pick-up.'
    };

    db.cars.unshift(newCar);
    writeDB(db);
    res.status(201).json(newCar);
});

// PUT /api/cars/:id (Edit car)
router.put('/:id', (req, res) => {
    const db = readDB();
    const idx = db.cars.findIndex(c => c.id === req.params.id);
    if (idx === -1) {
        return res.status(404).json({ error: 'Car not found' });
    }

    db.cars[idx] = {
        ...db.cars[idx],
        ...req.body,
        id: req.params.id
    };

    writeDB(db);
    res.json(db.cars[idx]);
});

// DELETE /api/cars/:id
router.delete('/:id', (req, res) => {
    const db = readDB();
    const initLen = db.cars.length;
    db.cars = db.cars.filter(c => c.id !== req.params.id);
    if (db.cars.length === initLen) {
        return res.status(404).json({ error: 'Car not found' });
    }
    writeDB(db);
    res.json({ success: true, message: 'Car deleted successfully' });
});

// PATCH /api/cars/:id/toggle-availability
router.patch('/:id/toggle-availability', (req, res) => {
    const db = readDB();
    const car = db.cars.find(c => c.id === req.params.id);
    if (!car) {
        return res.status(404).json({ error: 'Car not found' });
    }
    car.available = !car.available;
    writeDB(db);
    res.json(car);
});

module.exports = router;
