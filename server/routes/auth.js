const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../database');

// POST /api/auth/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const db = readDB();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const safeUser = { ...user };
    delete safeUser.password;
    res.json({ success: true, user: safeUser, token: 'rentora-session-token-' + Date.now() });
});

// POST /api/auth/signup
router.post('/signup', (req, res) => {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const db = readDB();
    const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
        return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const newUser = {
        id: 'usr-' + Date.now(),
        name,
        email,
        phone: phone || '',
        role: 'customer',
        password,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    writeDB(db);

    const safeUser = { ...newUser };
    delete safeUser.password;
    res.status(201).json({ success: true, user: safeUser, token: 'rentora-session-token-' + Date.now() });
});

// POST /api/auth/reset-password (Set new password via email)
router.post('/reset-password', (req, res) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
        return res.status(400).json({ error: 'Email and new password are required.' });
    }

    if (newPassword.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
    }

    const db = readDB();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
        return res.status(404).json({ error: 'No user account found with this email address.' });
    }

    user.password = newPassword;
    writeDB(db);

    res.json({ success: true, message: 'Password updated successfully! You can now log in.' });
});

// PUT /api/auth/change-password
router.put('/change-password', (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;
    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({ error: 'User ID, current password, and new password are required.' });
    }

    if (newPassword.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
    }

    const db = readDB();
    const user = db.users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    if (user.password !== currentPassword) {
        return res.status(401).json({ error: 'Current password is incorrect.' });
    }

    user.password = newPassword;
    writeDB(db);

    res.json({ success: true, message: 'Password changed successfully.' });
});

// PUT /api/auth/update-profile
router.put('/update-profile', (req, res) => {
    const { userId, name, phone, avatar } = req.body;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required.' });
    }

    const db = readDB();
    const user = db.users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (avatar) user.avatar = avatar;

    writeDB(db);

    const safeUser = { ...user };
    delete safeUser.password;
    res.json({ success: true, user: safeUser, message: 'Profile updated successfully.' });
});

module.exports = router;
