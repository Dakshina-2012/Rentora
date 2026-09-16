/**
 * RENTORA - Unified API Client
 * Dual-Engine REST Adapter: Connects to Node.js/Express backend on port 5000 if available,
 * or automatically falls back to browser-persistent LocalDB with zero disruption.
 */

class RentoraAPI {
    constructor() {
        this.BASE_URL = 'http://localhost:5000/api';
        this.isBackendOnline = false;
        this.checkBackendHealth();
    }

    async checkBackendHealth() {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 1200);
            const res = await fetch(`${this.BASE_URL}/health`, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (res.ok) {
                this.isBackendOnline = true;
                console.log('%c[Rentora API] Connected to Express REST Backend Server on Port 5000', 'color: #10B981; font-weight: bold;');
                return true;
            }
        } catch (e) {
            this.isBackendOnline = false;
            console.log('%c[Rentora API] Express server offline. Operating in High-Performance LocalStorage Mode.', 'color: #3B82F6; font-weight: bold;');
        }
        return false;
    }

    // CARS API
    async getCars() {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/cars`);
                if (res.ok) return await res.json();
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for getCars');
            }
        }
        return window.RentoraDB.getCars();
    }

    async getCarById(id) {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/cars/${id}`);
                if (res.ok) return await res.json();
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for getCarById');
            }
        }
        return window.RentoraDB.getCarById(id);
    }

    async saveCar(carData) {
        if (this.isBackendOnline) {
            try {
                const url = carData.id ? `${this.BASE_URL}/cars/${carData.id}` : `${this.BASE_URL}/cars`;
                const method = carData.id ? 'PUT' : 'POST';
                const res = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(carData)
                });
                if (res.ok) return await res.json();
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for saveCar');
            }
        }
        return window.RentoraDB.saveCar(carData);
    }

    async deleteCar(id) {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/cars/${id}`, { method: 'DELETE' });
                if (res.ok) return await res.json();
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for deleteCar');
            }
        }
        return window.RentoraDB.deleteCar(id);
    }

    async toggleCarAvailability(id) {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/cars/${id}/toggle-availability`, { method: 'PATCH' });
                if (res.ok) return await res.json();
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for toggleCarAvailability');
            }
        }
        return window.RentoraDB.toggleCarAvailability(id);
    }

    // BOOKINGS API
    async getBookings() {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/bookings`);
                if (res.ok) return await res.json();
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for getBookings');
            }
        }
        return window.RentoraDB.getBookings();
    }

    async getUserBookings(email) {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/bookings?email=${encodeURIComponent(email)}`);
                if (res.ok) return await res.json();
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for getUserBookings');
            }
        }
        return window.RentoraDB.getUserBookings(email);
    }

    async getBookingById(id) {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/bookings/${id}`);
                if (res.ok) return await res.json();
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for getBookingById');
            }
        }
        return window.RentoraDB.getBookingById(id);
    }

    async createBooking(bookingData) {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/bookings`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookingData)
                });
                if (res.ok) return await res.json();
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for createBooking');
            }
        }
        return window.RentoraDB.createBooking(bookingData);
    }

    async updateBookingStatus(id, newStatus) {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/bookings/${id}/status`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus })
                });
                if (res.ok) return await res.json();
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for updateBookingStatus');
            }
        }
        return window.RentoraDB.updateBookingStatus(id, newStatus);
    }

    async cancelBooking(id) {
        return this.updateBookingStatus(id, 'Cancelled');
    }

    // AUTH API
    async login(email, password) {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                if (res.ok) return await res.json();
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for login');
            }
        }
        return window.RentoraDB.authenticate(email, password);
    }

    async signup(userData) {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/auth/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });
                if (res.ok) return await res.json();
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for signup');
            }
        }
        return window.RentoraDB.register(userData);
    }

    async resetPassword(email, newPassword) {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/auth/reset-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, newPassword })
                });
                if (res.ok) return await res.json();
                const err = await res.json();
                return { success: false, message: err.error || 'Failed to reset password.' };
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for resetPassword');
            }
        }
        return window.RentoraDB.resetPassword(email, newPassword);
    }

    async changePassword(userId, currentPassword, newPassword) {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/auth/change-password`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId, currentPassword, newPassword })
                });
                if (res.ok) return await res.json();
                const err = await res.json();
                return { success: false, message: err.error || 'Failed to change password.' };
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for changePassword');
            }
        }
        return window.RentoraDB.changePassword(userId, currentPassword, newPassword);
    }

    async updateProfile(userId, profileData) {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/auth/update-profile`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId, ...profileData })
                });
                if (res.ok) return await res.json();
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for updateProfile');
            }
        }
        return window.RentoraDB.updateProfile(userId, profileData);
    }

    getCurrentUser() {
        return window.RentoraDB.getCurrentUser();
    }

    logout() {
        window.RentoraDB.logout();
    }

    // ADMIN STATS API
    async getAdminStats() {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/admin/stats`);
                if (res.ok) return await res.json();
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for getAdminStats');
            }
        }
        return window.RentoraDB.getAdminStats();
    }

    async getCustomers() {
        if (this.isBackendOnline) {
            try {
                const res = await fetch(`${this.BASE_URL}/admin/customers`);
                if (res.ok) return await res.json();
            } catch (e) {
                console.warn('[API Fallback] Falling back to LocalDB for getCustomers');
            }
        }
        const users = window.RentoraDB.getUsers().filter(u => u.role !== 'admin');
        const bookings = window.RentoraDB.getBookings();
        return users.map(user => {
            const userBookings = bookings.filter(b => b.customerEmail.toLowerCase() === user.email.toLowerCase());
            const totalSpent = userBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
            const activeBooking = userBookings.find(b => b.status === 'Confirmed' || b.status === 'Pending');
            return {
                ...user,
                totalBookings: userBookings.length,
                totalSpent,
                currentBooking: activeBooking ? activeBooking.carBrand + ' ' + activeBooking.carModel : 'None',
                accountStatus: 'Active'
            };
        });
    }
}

window.api = new RentoraAPI();
