const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../database');

// GET /api/bookings (supports optional ?email=)
router.get('/', (req, res) => {
    const db = readDB();
    let bookings = [...db.bookings];
    const { email, status } = req.query;

    if (email) {
        bookings = bookings.filter(b => b.customerEmail.toLowerCase() === email.toLowerCase());
    }

    if (status && status !== 'All') {
        bookings = bookings.filter(b => b.status.toLowerCase() === status.toLowerCase());
    }

    res.json(bookings);
});

// GET /api/bookings/:id
router.get('/:id', (req, res) => {
    const db = readDB();
    const booking = db.bookings.find(b => b.id === req.params.id);
    if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
});

// POST /api/bookings (Create new booking)
router.post('/', (req, res) => {
    const db = readDB();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newBooking = {
        id: `REN-2026-${randomNum}`,
        status: req.body.status || 'Confirmed',
        createdAt: new Date().toISOString(),
        ...req.body
    };

    db.bookings.unshift(newBooking);
    writeDB(db);
    res.status(201).json(newBooking);
});

// PATCH /api/bookings/:id/status
router.patch('/:id/status', (req, res) => {
    const db = readDB();
    const booking = db.bookings.find(b => b.id === req.params.id);
    if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
    }

    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }

    booking.status = status;
    writeDB(db);
    res.json(booking);
});

module.exports = router;
