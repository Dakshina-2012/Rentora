/**
 * RENTORA - Admin Dashboard Controller
 * Handles KPI stats, canvas-based charts, fleet management CRUD, booking lifecycle, and customer analytics.
 */

const adminApp = {
    currentTab: 'overview',
    editingCarId: null,

    init() {
        this.bindEvents();
    },

    async loadDashboard() {
        await this.renderKPIs();
        this.renderCharts();
        await this.renderFleetTable();
        await this.renderBookingsTable();
        await this.renderCustomersTable();
    },

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.admin-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Search fleet in admin
        const fleetSearch = document.getElementById('admin-fleet-search');
        if (fleetSearch) {
            fleetSearch.addEventListener('input', (e) => {
                this.renderFleetTable(e.target.value);
            });
        }

        // Search bookings in admin
        const bookingSearch = document.getElementById('admin-booking-search');
        if (bookingSearch) {
            bookingSearch.addEventListener('input', (e) => {
                this.renderBookingsTable(e.target.value);
            });
        }

        // Filter bookings by status in admin
        const bookingStatusFilter = document.getElementById('admin-booking-status-filter');
        if (bookingStatusFilter) {
            bookingStatusFilter.addEventListener('change', (e) => {
                this.renderBookingsTable('', e.target.value);
            });
        }

        // Car Modal Form Submit
        const carForm = document.getElementById('car-form');
        if (carForm) {
            carForm.addEventListener('submit', (e) => this.handleCarFormSubmit(e));
        }
    },

    switchTab(tabId) {
        this.currentTab = tabId;
        document.querySelectorAll('.admin-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });

        document.querySelectorAll('.admin-tab-content').forEach(c => {
            c.style.display = c.id === `admin-tab-${tabId}` ? 'block' : 'none';
        });

        if (tabId === 'overview') {
            this.renderCharts();
        }
    },

    async renderKPIs() {
        const stats = await window.api.getAdminStats();
        
        document.getElementById('kpi-total-cars').innerText = stats.totalCars;
        document.getElementById('kpi-available-cars').innerText = stats.availableCars;
        document.getElementById('kpi-total-bookings').innerText = stats.totalBookings;
        document.getElementById('kpi-active-rentals').innerText = stats.activeRentors;
        document.getElementById('kpi-revenue').innerText = `₹${stats.totalRevenue.toLocaleString('en-IN')}`;
        document.getElementById('kpi-pending-bookings').innerText = stats.pendingBookings;
    },

    renderCharts() {
        this.renderRevenueChart();
        this.renderCategoryChart();
    },

    renderRevenueChart() {
        const canvas = document.getElementById('revenue-chart-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        
        const width = canvas.parentElement.clientWidth - 40;
        const height = 240;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(dpr, dpr);

        const data = [
            { label: 'Apr', val: 145 },
            { label: 'May', val: 182 },
            { label: 'Jun', val: 224 },
            { label: 'Jul', val: 268 },
            { label: 'Aug', val: 312 },
            { label: 'Sep', val: 350 }
        ];

        ctx.clearRect(0, 0, width, height);

        const padding = { top: 30, right: 20, bottom: 40, left: 40 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;
        const maxVal = 400;

        // Draw horizontal grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.fillStyle = '#64748B';
        ctx.font = '11px Inter';

        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartH / 4) * i;
            const labelVal = Math.round(maxVal - (maxVal / 4) * i);
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
            ctx.fillText(`₹${labelVal}k`, 4, y + 4);
        }

        // Draw bars with gradients
        const barWidth = chartW / data.length - 24;
        data.forEach((item, idx) => {
            const x = padding.left + idx * (chartW / data.length) + 12;
            const barH = (item.val / maxVal) * chartH;
            const y = padding.top + chartH - barH;

            const grad = ctx.createLinearGradient(0, y, 0, y + barH);
            grad.addColorStop(0, '#2563EB');
            grad.addColorStop(1, 'rgba(6, 182, 212, 0.2)');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect ? ctx.roundRect(x, y, barWidth, barH, [6, 6, 0, 0]) : ctx.rect(x, y, barWidth, barH);
            ctx.fill();

            // Label
            ctx.fillStyle = '#94A3B8';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, x + barWidth / 2, height - 15);
            ctx.fillText(`₹${item.val}k`, x + barWidth / 2, y - 8);
        });
    },

    renderCategoryChart() {
        const canvas = document.getElementById('category-chart-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        const width = canvas.parentElement.clientWidth - 40;
        const height = 240;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(dpr, dpr);

        const categories = [
            { name: 'SUV', count: 6, color: '#2563EB' },
            { name: 'Sedan', count: 4, color: '#06B6D4' },
            { name: 'Luxury', count: 3, color: '#F59E0B' },
            { name: 'Sports', count: 3, color: '#F43F5E' },
            { name: 'Economy', count: 3, color: '#10B981' },
            { name: 'Electric', count: 2, color: '#8B5CF6' }
        ];

        const total = categories.reduce((sum, c) => sum + c.count, 0);
        let startAngle = -0.5 * Math.PI;

        const centerX = width / 2 - 50;
        const centerY = height / 2;
        const outerRadius = 80;
        const innerRadius = 50;

        ctx.clearRect(0, 0, width, height);

        categories.forEach(cat => {
            const sliceAngle = (cat.count / total) * 2 * Math.PI;
            ctx.beginPath();
            ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + sliceAngle);
            ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
            ctx.closePath();
            ctx.fillStyle = cat.color;
            ctx.fill();
            startAngle += sliceAngle;
        });

        // Center total text
        ctx.fillStyle = '#F8FAFC';
        ctx.font = 'bold 20px Outfit';
        ctx.textAlign = 'center';
        ctx.fillText(total, centerX, centerY + 2);
        ctx.font = '10px Inter';
        ctx.fillStyle = '#94A3B8';
        ctx.fillText('FLEET', centerX, centerY + 16);

        // Legend on the right
        ctx.textAlign = 'left';
        ctx.font = '11px Inter';
        categories.forEach((cat, idx) => {
            const legX = width - 110;
            const legY = 40 + idx * 28;

            ctx.fillStyle = cat.color;
            ctx.beginPath();
            ctx.arc(legX, legY - 3, 5, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = '#F8FAFC';
            ctx.fillText(`${cat.name} (${cat.count})`, legX + 12, legY);
        });
    },

    async renderFleetTable(searchTerm = '') {
        const tbody = document.getElementById('admin-fleet-tbody');
        if (!tbody) return;

        let cars = await window.api.getCars();
        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            cars = cars.filter(c => `${c.brand} ${c.model}`.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
        }

        tbody.innerHTML = '';
        if (cars.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">No matching vehicles in fleet.</td></tr>`;
            return;
        }

        cars.forEach(car => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 0.8rem;">
                        <img src="${car.image}" alt="${car.brand}" style="width: 50px; height: 36px; object-fit: cover; border-radius: 6px;" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=120&q=80';">
                        <div>
                            <div style="font-weight: 700; color: var(--text-primary);">${car.brand} ${car.model}</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">${car.year} • ${car.fuelType}</div>
                        </div>
                    </div>
                </td>
                <td><span class="chip" style="font-size: 0.75rem; padding: 0.2rem 0.6rem;">${car.category}</span></td>
                <td><strong>₹${car.pricePerDay.toLocaleString('en-IN')}</strong> / day</td>
                <td>${car.seats} Seats • ${car.transmission}</td>
                <td>
                    <span class="status-badge ${car.available ? 'completed' : 'cancelled'}">
                        <span class="status-dot"></span> ${car.available ? 'Available' : 'Booked/Maint.'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="adminApp.toggleCarStatus('${car.id}')" title="Toggle Availability">
                        <i class="fa-solid fa-arrows-rotate"></i>
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="adminApp.openEditCarModal('${car.id}')" title="Edit Vehicle">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="adminApp.deleteCar('${car.id}')" title="Delete Vehicle" style="color: var(--accent-rose);">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    async toggleCarStatus(id) {
        await window.api.toggleCarAvailability(id);
        window.app.showToast('Vehicle availability updated successfully', 'success');
        this.renderFleetTable();
        this.renderKPIs();
    },

    async deleteCar(id) {
        if (confirm('Are you sure you want to remove this vehicle from Rentora fleet?')) {
            await window.api.deleteCar(id);
            window.app.showToast('Vehicle deleted successfully', 'info');
            this.renderFleetTable();
            this.renderKPIs();
        }
    },

    openAddCarModal() {
        this.editingCarId = null;
        document.getElementById('car-modal-title').innerText = 'Add New Fleet Vehicle';
        document.getElementById('car-form').reset();
        document.getElementById('car-modal-id').value = '';
        document.getElementById('car-modal').classList.add('active');
    },

    async openEditCarModal(id) {
        this.editingCarId = id;
        const car = await window.api.getCarById(id);
        if (!car) return;

        document.getElementById('car-modal-title').innerText = `Edit: ${car.brand} ${car.model}`;
        document.getElementById('car-modal-id').value = car.id;
        document.getElementById('car-brand').value = car.brand;
        document.getElementById('car-model-name').value = car.model;
        document.getElementById('car-year').value = car.year;
        document.getElementById('car-category').value = car.category;
        document.getElementById('car-price').value = car.pricePerDay;
        document.getElementById('car-fuel').value = car.fuelType;
        document.getElementById('car-transmission').value = car.transmission;
        document.getElementById('car-seats').value = car.seats;
        document.getElementById('car-mileage').value = car.mileage;
        document.getElementById('car-image').value = car.image;
        document.getElementById('car-description').value = car.description || '';

        document.getElementById('car-modal').classList.add('active');
    },

    async handleCarFormSubmit(e) {
        e.preventDefault();
        const id = document.getElementById('car-modal-id').value;

        const carData = {
            id: id || undefined,
            brand: document.getElementById('car-brand').value.trim(),
            model: document.getElementById('car-model-name').value.trim(),
            year: parseInt(document.getElementById('car-year').value) || 2024,
            category: document.getElementById('car-category').value,
            pricePerDay: parseInt(document.getElementById('car-price').value) || 3000,
            fuelType: document.getElementById('car-fuel').value,
            transmission: document.getElementById('car-transmission').value,
            seats: parseInt(document.getElementById('car-seats').value) || 5,
            mileage: document.getElementById('car-mileage').value.trim() || '16 km/l',
            image: document.getElementById('car-image').value.trim() || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
            description: document.getElementById('car-description').value.trim() || 'Premium Rentora verified rental vehicle.',
            available: true
        };

        await window.api.saveCar(carData);
        document.getElementById('car-modal').classList.remove('active');
        window.app.showToast(id ? 'Vehicle updated successfully!' : 'New vehicle added to fleet!', 'success');
        
        await this.renderFleetTable();
        await this.renderKPIs();
        this.renderCharts();
    },

    async renderBookingsTable(searchTerm = '', statusFilter = 'All') {
        const tbody = document.getElementById('admin-bookings-tbody');
        if (!tbody) return;

        let bookings = await window.api.getBookings();

        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            bookings = bookings.filter(b => 
                b.id.toLowerCase().includes(q) || 
                b.customerName.toLowerCase().includes(q) ||
                `${b.carBrand} ${b.carModel}`.toLowerCase().includes(q)
            );
        }

        if (statusFilter && statusFilter !== 'All') {
            bookings = bookings.filter(b => b.status.toLowerCase() === statusFilter.toLowerCase());
        }

        tbody.innerHTML = '';
        if (bookings.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">No bookings found.</td></tr>`;
            return;
        }

        bookings.forEach(b => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong style="font-family: monospace; color: var(--accent-cyan);">${b.id}</strong></td>
                <td>
                    <div style="font-weight: 600;">${b.customerName}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${b.customerPhone || b.customerEmail}</div>
                </td>
                <td>
                    <div style="font-weight: 500;">${b.carBrand} ${b.carModel}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${b.pickupLocation.substring(0, 24)}...</div>
                </td>
                <td>
                    <div>${b.pickupDate} ➔ ${b.returnDate}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${b.rentalDays} Days</div>
                </td>
                <td><strong>₹${(b.totalAmount || 0).toLocaleString('en-IN')}</strong></td>
                <td>
                    <select class="form-control btn-sm" onchange="adminApp.updateBookingStatus('${b.id}', this.value)" style="width: auto; padding: 0.25rem 0.6rem; font-size: 0.8rem;">
                        <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="app.openBookingReceiptModal('${b.id}')" title="View Full Voucher">
                        <i class="fa-solid fa-file-invoice"></i> View
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    async updateBookingStatus(id, newStatus) {
        await window.api.updateBookingStatus(id, newStatus);
        window.app.showToast(`Booking ${id} status updated to ${newStatus}`, 'success');
        this.renderKPIs();
        this.renderBookingsTable();
    },

    async renderCustomersTable() {
        const tbody = document.getElementById('admin-customers-tbody');
        if (!tbody) return;

        const customers = await window.api.getCustomers();
        tbody.innerHTML = '';

        customers.forEach(cust => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 0.8rem;">
                        <img src="${cust.avatar}" alt="${cust.name}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;">
                        <div>
                            <div style="font-weight: 600;">${cust.name}</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">${cust.email}</div>
                        </div>
                    </div>
                </td>
                <td>${cust.phone || 'N/A'}</td>
                <td><strong>${cust.totalBookings}</strong> Bookings</td>
                <td>₹${cust.totalSpent.toLocaleString('en-IN')}</td>
                <td><span style="color: var(--accent-cyan); font-size: 0.85rem;">${cust.currentBooking}</span></td>
                <td><span class="status-badge completed"><span class="status-dot"></span> Active</span></td>
            `;
            tbody.appendChild(tr);
        });
    }
};

window.adminApp = adminApp;
