/**
 * RENTORA - Main Application Controller
 * Handles hash routing, catalog filtering, 5-step booking flow, dynamic price calculation, auth, theme, and notifications.
 */

const app = {
    currentRoute: 'home',
    currentUser: null,
    cars: [],
    selectedCar: null,
    bookingDraft: {
        carId: null,
        pickupLocation: '',
        dropoffLocation: '',
        pickupDate: '',
        pickupTime: '10:00',
        returnDate: '',
        returnTime: '18:00',
        rentalDays: 3,
        dailyRate: 0,
        baseAmount: 0,
        insuranceFee: 1500,
        discountAmount: 0,
        taxesFee: 0,
        totalAmount: 0,
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        notes: ''
    },
    catalogFilters: {
        search: '',
        category: 'All',
        maxPrice: 30000,
        fuels: [],
        transmissions: [],
        seats: [],
        availableOnly: false,
        sortBy: 'popularity'
    },

    async init() {
        this.initTheme();
        this.checkSession();
        await this.loadFleet();
        this.setupEventListeners();
        this.setupRouter();
        this.populateLocationSelects();
        this.setDefaultDates();
        this.renderFeaturedCars();
        this.renderTestimonials();

        // Initial route dispatch
        const initialHash = window.location.hash.slice(1) || 'home';
        this.navigate(initialHash);
    },

    // ==========================================
    // THEME MANAGEMENT (Dark / Light)
    // ==========================================
    initTheme() {
        const savedTheme = localStorage.getItem('rentora_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    },

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('rentora_theme', newTheme);
        this.updateThemeIcon(newTheme);
        this.showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
        
        // Re-render admin charts if in admin
        if (this.currentRoute === 'admin' && window.adminApp) {
            window.adminApp.renderCharts();
        }
    },

    updateThemeIcon(theme) {
        const btn = document.getElementById('theme-toggle-btn');
        if (!btn) return;
        btn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    },

    // ==========================================
    // ROUTING SYSTEM
    // ==========================================
    setupRouter() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1) || 'home';
            this.navigate(hash);
        });
    },

    navigate(hash) {
        const parts = hash.split('/');
        const view = parts[0] || 'home';
        const param = parts[1] || null;

        // Hide all views
        document.querySelectorAll('.app-view').forEach(el => el.style.display = 'none');

        // Close mobile menu if open
        const drawer = document.getElementById('mobile-drawer');
        if (drawer) drawer.classList.remove('active');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.currentRoute = view;
        this.updateNavLinks(view);

        // Routing View Dispatch
        switch (view) {
            case 'home':
                document.getElementById('home-view').style.display = 'block';
                break;
            case 'cars':
                document.getElementById('cars-view').style.display = 'block';
                if (param) {
                    this.catalogFilters.category = decodeURIComponent(param);
                    this.updateCategoryChipsUI();
                }
                this.renderCatalog();
                break;
            case 'car-detail':
                document.getElementById('car-detail-view').style.display = 'block';
                if (param) this.renderCarDetail(param);
                break;
            case 'booking':
                document.getElementById('booking-view').style.display = 'block';
                if (param) this.setupBookingForCar(param);
                break;
            case 'confirmation':
                document.getElementById('confirmation-view').style.display = 'block';
                break;
            case 'my-bookings':
                document.getElementById('my-bookings-view').style.display = 'block';
                this.renderMyBookings();
                break;
            case 'about':
                document.getElementById('about-view').style.display = 'block';
                break;
            case 'contact':
                document.getElementById('contact-view').style.display = 'block';
                break;
            case 'admin':
                // Check if admin or prompt login
                if (!this.currentUser || this.currentUser.role !== 'admin') {
                    this.openAuthModal('admin');
                    this.showToast('Please log in as an administrator to access dashboard', 'info');
                    this.navigate('home');
                    return;
                }
                document.getElementById('admin-view').style.display = 'block';
                if (window.adminApp) window.adminApp.loadDashboard();
                break;
            default:
                document.getElementById('home-view').style.display = 'block';
                break;
        }
    },

    updateNavLinks(activeRoute) {
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href') || '';
            link.classList.toggle('active', href.includes(activeRoute));
        });
    },

    // ==========================================
    // DATA LOADING & SETUP
    // ==========================================
    async loadFleet() {
        this.cars = await window.api.getCars();
    },

    populateLocationSelects() {
        const locations = window.RENTORA_LOCATIONS || [];
        const selects = ['search-location', 'booking-pickup-loc', 'booking-dropoff-loc'];
        selects.forEach(id => {
            const select = document.getElementById(id);
            if (!select) return;
            select.innerHTML = '<option value="">Select Location...</option>' + 
                locations.map(loc => `<option value="${loc}">${loc}</option>`).join('');
        });

        // Set default location
        if (selects[0]) {
            const searchLoc = document.getElementById(selects[0]);
            if (searchLoc && searchLoc.options.length > 1) searchLoc.selectedIndex = 1;
        }
    },

    setDefaultDates() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const returnDay = new Date(today);
        returnDay.setDate(returnDay.getDate() + 4);

        const format = d => d.toISOString().split('T')[0];

        const pickDateEl = document.getElementById('search-pickup-date');
        const retDateEl = document.getElementById('search-return-date');
        if (pickDateEl) {
            pickDateEl.min = format(today);
            pickDateEl.value = format(tomorrow);
        }
        if (retDateEl) {
            retDateEl.min = format(tomorrow);
            retDateEl.value = format(returnDay);
        }

        const bPickEl = document.getElementById('booking-step2-pickup');
        const bRetEl = document.getElementById('booking-step2-return');
        if (bPickEl) {
            bPickEl.min = format(today);
            bPickEl.value = format(tomorrow);
        }
        if (bRetEl) {
            bRetEl.min = format(tomorrow);
            bRetEl.value = format(returnDay);
        }
    },

    // ==========================================
    // QUICK SEARCH WIDGET
    // ==========================================
    handleQuickSearch(e) {
        e.preventDefault();
        const location = document.getElementById('search-location').value;
        const pickupDate = document.getElementById('search-pickup-date').value;
        const returnDate = document.getElementById('search-return-date').value;
        const category = document.getElementById('search-category').value;

        if (!location) {
            this.showToast('Please select a pick-up location.', 'error');
            return;
        }
        if (!pickupDate || !returnDate) {
            this.showToast('Please select both pick-up and return dates.', 'error');
            return;
        }
        if (new Date(returnDate) <= new Date(pickupDate)) {
            this.showToast('Return date must be after pick-up date.', 'error');
            return;
        }

        this.bookingDraft.pickupLocation = location;
        this.bookingDraft.dropoffLocation = location;
        this.bookingDraft.pickupDate = pickupDate;
        this.bookingDraft.returnDate = returnDate;

        // Apply filters & navigate
        this.catalogFilters.category = category || 'All';
        this.updateCategoryChipsUI();
        window.location.hash = category && category !== 'All' ? `cars/${category}` : 'cars';
    },

    // ==========================================
    // CATALOG & FILTER ENGINE
    // ==========================================
    renderCatalog() {
        const grid = document.getElementById('catalog-cars-grid');
        const countEl = document.getElementById('catalog-results-count');
        if (!grid) return;

        let filtered = [...this.cars];

        // Search text
        if (this.catalogFilters.search) {
            const q = this.catalogFilters.search.toLowerCase();
            filtered = filtered.filter(c => 
                c.brand.toLowerCase().includes(q) || 
                c.model.toLowerCase().includes(q) ||
                `${c.brand} ${c.model}`.toLowerCase().includes(q)
            );
        }

        // Category
        if (this.catalogFilters.category && this.catalogFilters.category !== 'All') {
            filtered = filtered.filter(c => c.category.toLowerCase() === this.catalogFilters.category.toLowerCase());
        }

        // Price
        filtered = filtered.filter(c => c.pricePerDay <= this.catalogFilters.maxPrice);

        // Fuels
        if (this.catalogFilters.fuels.length > 0) {
            filtered = filtered.filter(c => this.catalogFilters.fuels.includes(c.fuelType));
        }

        // Transmissions
        if (this.catalogFilters.transmissions.length > 0) {
            filtered = filtered.filter(c => this.catalogFilters.transmissions.includes(c.transmission));
        }

        // Seats
        if (this.catalogFilters.seats.length > 0) {
            filtered = filtered.filter(c => {
                return this.catalogFilters.seats.some(s => {
                    if (s === '7+') return c.seats >= 7;
                    return c.seats === parseInt(s);
                });
            });
        }

        // Availability
        if (this.catalogFilters.availableOnly) {
            filtered = filtered.filter(c => c.available);
        }

        // Sorting
        if (this.catalogFilters.sortBy === 'price-asc') {
            filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
        } else if (this.catalogFilters.sortBy === 'price-desc') {
            filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
        } else if (this.catalogFilters.sortBy === 'newest') {
            filtered.sort((a, b) => b.year - a.year);
        } else {
            filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        }

        if (countEl) countEl.innerText = `${filtered.length} Vehicles Available`;

        grid.innerHTML = '';
        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-car-tunnel"></i>
                    <h3>No Vehicles Match Your Criteria</h3>
                    <p style="color: var(--text-secondary); margin: 0.8rem 0 1.5rem;">Try adjusting your filters or price range to explore other options.</p>
                    <button class="btn btn-primary" onclick="app.resetFilters()">Reset All Filters</button>
                </div>
            `;
            return;
        }

        filtered.forEach(car => {
            grid.appendChild(this.createCarCardElement(car));
        });
    },

    createCarCardElement(car) {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <div class="car-card-media" onclick="app.viewCarDetails('${car.id}')" style="cursor: pointer;">
                <img src="${car.image}" alt="${car.brand} ${car.model}" class="car-card-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80';">
                <span class="car-category-badge">${car.category}</span>
                <span class="car-avail-badge ${car.available ? 'available' : 'unavailable'}">
                    <span class="status-dot"></span> ${car.available ? 'Available' : 'Booked'}
                </span>
            </div>
            <div class="car-card-body">
                <div class="car-brand-model">
                    <div>
                        <h3 class="car-title">${car.brand} ${car.model}</h3>
                        <span class="car-year">${car.year} Model</span>
                    </div>
                </div>
                <div class="car-rating">
                    <i class="fa-solid fa-star"></i>
                    <span>${car.rating} (${car.reviewCount})</span>
                </div>
                <div class="car-specs-grid">
                    <div class="spec-item">
                        <i class="fa-solid fa-gas-pump"></i>
                        <span>${car.fuelType}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fa-solid fa-gear"></i>
                        <span>${car.transmission}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fa-solid fa-users"></i>
                        <span>${car.seats} Seats</span>
                    </div>
                </div>
                <div class="car-card-footer">
                    <div class="car-price-block">
                        <span class="car-price-value">₹${car.pricePerDay.toLocaleString('en-IN')}</span>
                        <span class="car-price-unit">per day (taxes extra)</span>
                    </div>
                    <div class="car-card-actions">
                        <button class="btn btn-secondary btn-sm" onclick="app.viewCarDetails('${car.id}')">Details</button>
                        <button class="btn btn-primary btn-sm" ${!car.available ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''} onclick="app.startBookingForCar('${car.id}')">
                            ${car.available ? 'Book Now' : 'Unavailable'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        return card;
    },

    renderFeaturedCars() {
        const container = document.getElementById('featured-cars-container');
        if (!container) return;
        const featured = this.cars.slice(0, 6);
        container.innerHTML = '';
        featured.forEach(car => {
            container.appendChild(this.createCarCardElement(car));
        });
    },

    resetFilters() {
        this.catalogFilters = {
            search: '',
            category: 'All',
            maxPrice: 30000,
            fuels: [],
            transmissions: [],
            seats: [],
            availableOnly: false,
            sortBy: 'popularity'
        };
        const searchInput = document.getElementById('catalog-search-input');
        if (searchInput) searchInput.value = '';
        const priceRange = document.getElementById('filter-price-range');
        if (priceRange) priceRange.value = 30000;
        const priceVal = document.getElementById('filter-price-val');
        if (priceVal) priceVal.innerText = '₹30,000';

        document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
        this.updateCategoryChipsUI();
        this.renderCatalog();
    },

    updateCategoryChipsUI() {
        document.querySelectorAll('.cat-chip').forEach(chip => {
            chip.classList.toggle('active', chip.dataset.cat.toLowerCase() === this.catalogFilters.category.toLowerCase());
        });
    },

    // ==========================================
    // CAR DETAILS VIEW
    // ==========================================
    async viewCarDetails(carId) {
        window.location.hash = `car-detail/${carId}`;
    },

    async renderCarDetail(carId) {
        const car = await window.api.getCarById(carId);
        if (!car) {
            this.showToast('Vehicle details not found', 'error');
            this.navigate('cars');
            return;
        }

        this.selectedCar = car;
        document.getElementById('detail-title').innerText = `${car.brand} ${car.model}`;
        document.getElementById('detail-category-badge').innerText = car.category;
        document.getElementById('detail-price-val').innerText = `₹${car.pricePerDay.toLocaleString('en-IN')}`;
        document.getElementById('detail-rating-txt').innerText = `${car.rating} (${car.reviewCount} customer reviews)`;
        document.getElementById('detail-desc').innerText = car.description;
        document.getElementById('detail-fuel-policy').innerText = car.fuelPolicy || 'Full to Full';
        document.getElementById('detail-deposit').innerText = `₹${(car.deposit || 10000).toLocaleString('en-IN')} (100% refundable upon vehicle return)`;

        // Gallery
        const mainImg = document.getElementById('detail-main-img');
        const thumbsWrap = document.getElementById('detail-thumbs-wrap');
        mainImg.onerror = function() {
            this.onerror = null;
            this.src = 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80';
        };
        mainImg.src = car.image;
        thumbsWrap.innerHTML = '';

        const images = car.gallery && car.gallery.length > 0 ? car.gallery : [car.image];
        images.forEach((imgUrl, idx) => {
            const thumb = document.createElement('div');
            thumb.className = `thumb-item ${idx === 0 ? 'active' : ''}`;
            thumb.innerHTML = `<img src="${imgUrl}" alt="${car.model} angle ${idx+1}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80';">`;
            thumb.onclick = () => {
                mainImg.src = imgUrl;
                document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            };
            thumbsWrap.appendChild(thumb);
        });

        // Spec Matrix
        document.getElementById('spec-power').innerText = car.power || '180 hp';
        document.getElementById('spec-accel').innerText = car.acceleration || '0-100 in 8s';
        document.getElementById('spec-speed').innerText = car.topSpeed || '210 km/h';
        document.getElementById('spec-mileage').innerText = car.mileage || '16 km/l';
        document.getElementById('spec-fuel').innerText = car.fuelType;
        document.getElementById('spec-trans').innerText = car.transmission;
        document.getElementById('spec-seats').innerText = `${car.seats} Seats`;

        // Features Checklist
        const featContainer = document.getElementById('detail-features-grid');
        featContainer.innerHTML = '';
        (car.features || []).forEach(f => {
            const featEl = document.createElement('div');
            featEl.className = 'feature-pill';
            featEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${f}</span>`;
            featContainer.appendChild(featEl);
        });

        // Live calculator inside detail card
        this.updateDetailQuote();
    },

    updateDetailQuote() {
        if (!this.selectedCar) return;
        const days = parseInt(document.getElementById('detail-calc-days').value) || 3;
        const daily = this.selectedCar.pricePerDay;
        const base = daily * days;
        const insurance = 500 * days;
        const taxes = Math.round((base + insurance) * 0.18);
        const total = base + insurance + taxes;

        document.getElementById('detail-calc-daily').innerText = `₹${daily.toLocaleString('en-IN')}`;
        document.getElementById('detail-calc-days-lbl').innerText = `${days} Days`;
        document.getElementById('detail-calc-base').innerText = `₹${base.toLocaleString('en-IN')}`;
        document.getElementById('detail-calc-insurance').innerText = `₹${insurance.toLocaleString('en-IN')}`;
        document.getElementById('detail-calc-taxes').innerText = `₹${taxes.toLocaleString('en-IN')}`;
        document.getElementById('detail-calc-total').innerText = `₹${total.toLocaleString('en-IN')}`;
    },

    // ==========================================
    // 5-STEP BOOKING WORKFLOW
    // ==========================================
    async startBookingForCar(carId) {
        const car = await window.api.getCarById(carId);
        if (!car) return;
        if (!car.available) {
            this.showToast('This vehicle is currently unavailable for booking.', 'error');
            return;
        }
        this.selectedCar = car;
        window.location.hash = `booking/${carId}`;
    },

    async setupBookingForCar(carId) {
        const car = await window.api.getCarById(carId);
        if (!car) return;
        this.selectedCar = car;
        this.bookingDraft.carId = car.id;
        this.bookingDraft.dailyRate = car.pricePerDay;

        // Auto-fill user information if logged in
        if (this.currentUser) {
            document.getElementById('booking-step3-name').value = this.currentUser.name || '';
            document.getElementById('booking-step3-email').value = this.currentUser.email || '';
            document.getElementById('booking-step3-phone').value = this.currentUser.phone || '';
        }

        // Update selected car banner in step 1
        const thumbEl = document.getElementById('booking-car-thumb');
        if (thumbEl) {
            thumbEl.onerror = function() {
                this.onerror = null;
                this.src = 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=600&q=80';
            };
            thumbEl.src = car.image;
        }
        document.getElementById('booking-car-title').innerText = `${car.brand} ${car.model}`;
        document.getElementById('booking-car-sub').innerText = `${car.year} • ${car.category} • ${car.fuelType} • ${car.transmission}`;
        document.getElementById('booking-car-rate').innerText = `₹${car.pricePerDay.toLocaleString('en-IN')} / day`;

        this.setBookingStep(1);
        this.calculateBookingTotal();
    },

    setBookingStep(stepNumber) {
        // Update Step Indicators
        for (let i = 1; i <= 4; i++) {
            const stepItem = document.getElementById(`wizard-step-item-${i}`);
            if (!stepItem) continue;
            stepItem.classList.remove('active', 'completed');
            if (i < stepNumber) stepItem.classList.add('completed');
            if (i === stepNumber) stepItem.classList.add('active');
        }

        // Show relevant form section
        for (let i = 1; i <= 4; i++) {
            const sec = document.getElementById(`booking-step-content-${i}`);
            if (sec) sec.style.display = i === stepNumber ? 'block' : 'none';
        }
    },

    nextBookingStep(currentStep) {
        if (currentStep === 1) {
            this.setBookingStep(2);
        } else if (currentStep === 2) {
            // Validate Dates & Locations
            const pickupLoc = document.getElementById('booking-pickup-loc').value;
            const dropoffLoc = document.getElementById('booking-dropoff-loc').value;
            const pDate = document.getElementById('booking-step2-pickup').value;
            const rDate = document.getElementById('booking-step2-return').value;

            if (!pickupLoc) {
                this.showToast('Please select a Pick-up Location', 'error');
                return;
            }
            if (!pDate || !rDate) {
                this.showToast('Please select both pick-up and return dates', 'error');
                return;
            }
            if (new Date(rDate) <= new Date(pDate)) {
                this.showToast('Return date must be strictly after pick-up date', 'error');
                return;
            }

            this.bookingDraft.pickupLocation = pickupLoc;
            this.bookingDraft.dropoffLocation = dropoffLoc || pickupLoc;
            this.bookingDraft.pickupDate = pDate;
            this.bookingDraft.returnDate = rDate;

            this.calculateBookingTotal();
            this.setBookingStep(3);
        } else if (currentStep === 3) {
            // Validate Customer Information
            const name = document.getElementById('booking-step3-name').value.trim();
            const email = document.getElementById('booking-step3-email').value.trim();
            const phone = document.getElementById('booking-step3-phone').value.trim();
            const notes = document.getElementById('booking-step3-notes').value.trim();

            if (!name) {
                this.showToast('Please enter your full name.', 'error');
                return;
            }
            if (!email || !email.includes('@')) {
                this.showToast('Please enter a valid email address.', 'error');
                return;
            }
            if (!phone || phone.length < 8) {
                this.showToast('Please enter a valid phone number.', 'error');
                return;
            }

            this.bookingDraft.customerName = name;
            this.bookingDraft.customerEmail = email;
            this.bookingDraft.customerPhone = phone;
            this.bookingDraft.notes = notes;

            this.updateSummaryScreen();
            this.setBookingStep(4);
        }
    },

    prevBookingStep(currentStep) {
        if (currentStep > 1) {
            this.setBookingStep(currentStep - 1);
        }
    },

    calculateBookingTotal() {
        if (!this.selectedCar) return;

        const pDate = new Date(this.bookingDraft.pickupDate || document.getElementById('booking-step2-pickup').value);
        const rDate = new Date(this.bookingDraft.returnDate || document.getElementById('booking-step2-return').value);

        const diffTime = Math.abs(rDate - pDate);
        let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (days < 1) days = 1;

        this.bookingDraft.rentalDays = days;
        this.bookingDraft.dailyRate = this.selectedCar.pricePerDay;
        this.bookingDraft.baseAmount = days * this.selectedCar.pricePerDay;
        this.bookingDraft.insuranceFee = 500 * days;
        this.bookingDraft.taxesFee = Math.round((this.bookingDraft.baseAmount + this.bookingDraft.insuranceFee) * 0.18);
        this.bookingDraft.totalAmount = this.bookingDraft.baseAmount + this.bookingDraft.insuranceFee + this.bookingDraft.taxesFee - this.bookingDraft.discountAmount;

        // Update live sticky summary in step wizard
        document.getElementById('summary-car-name').innerText = `${this.selectedCar.brand} ${this.selectedCar.model}`;
        document.getElementById('summary-rate-line').innerText = `₹${this.selectedCar.pricePerDay.toLocaleString('en-IN')} × ${days} Days`;
        document.getElementById('summary-base-val').innerText = `₹${this.bookingDraft.baseAmount.toLocaleString('en-IN')}`;
        document.getElementById('summary-insurance-val').innerText = `₹${this.bookingDraft.insuranceFee.toLocaleString('en-IN')}`;
        document.getElementById('summary-taxes-val').innerText = `₹${this.bookingDraft.taxesFee.toLocaleString('en-IN')}`;
        document.getElementById('summary-total-val').innerText = `₹${this.bookingDraft.totalAmount.toLocaleString('en-IN')}`;
    },

    applyPromoCode() {
        const input = document.getElementById('booking-promo-code');
        const code = input ? input.value.trim().toUpperCase() : '';
        if (code === 'RENTORA10') {
            this.bookingDraft.discountAmount = Math.round(this.bookingDraft.baseAmount * 0.1);
            this.calculateBookingTotal();
            this.showToast('Promo code applied! 10% discount subtracted.', 'success');
        } else {
            this.showToast('Invalid promo code. Try "RENTORA10"', 'error');
        }
    },

    updateSummaryScreen() {
        if (!this.selectedCar) return;
        document.getElementById('step4-car-title').innerText = `${this.selectedCar.brand} ${this.selectedCar.model} (${this.selectedCar.year})`;
        document.getElementById('step4-dates').innerText = `${this.bookingDraft.pickupDate} ➔ ${this.bookingDraft.returnDate} (${this.bookingDraft.rentalDays} Days)`;
        document.getElementById('step4-pickup').innerText = this.bookingDraft.pickupLocation;
        document.getElementById('step4-dropoff').innerText = this.bookingDraft.dropoffLocation;
        document.getElementById('step4-name').innerText = this.bookingDraft.customerName;
        document.getElementById('step4-contact').innerText = `${this.bookingDraft.customerEmail} | ${this.bookingDraft.customerPhone}`;
        document.getElementById('step4-total').innerText = `₹${this.bookingDraft.totalAmount.toLocaleString('en-IN')}`;
    },

    async confirmFinalBooking() {
        const confirmBtn = document.getElementById('btn-confirm-final-booking');
        if (confirmBtn) {
            confirmBtn.disabled = true;
            confirmBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Securing Reservation...';
        }

        const newBookingPayload = {
            carId: this.selectedCar.id,
            carBrand: this.selectedCar.brand,
            carModel: this.selectedCar.model,
            carCategory: this.selectedCar.category,
            carImage: this.selectedCar.image,
            customerName: this.bookingDraft.customerName,
            customerEmail: this.bookingDraft.customerEmail,
            customerPhone: this.bookingDraft.customerPhone,
            pickupLocation: this.bookingDraft.pickupLocation,
            dropoffLocation: this.bookingDraft.dropoffLocation,
            pickupDate: this.bookingDraft.pickupDate,
            pickupTime: this.bookingDraft.pickupTime,
            returnDate: this.bookingDraft.returnDate,
            returnTime: this.bookingDraft.returnTime,
            rentalDays: this.bookingDraft.rentalDays,
            dailyRate: this.bookingDraft.dailyRate,
            baseAmount: this.bookingDraft.baseAmount,
            insuranceFee: this.bookingDraft.insuranceFee,
            taxesFee: this.bookingDraft.taxesFee,
            totalAmount: this.bookingDraft.totalAmount,
            notes: this.bookingDraft.notes
        };

        const createdBooking = await window.api.createBooking(newBookingPayload);
        
        if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.innerHTML = '<i class="fa-solid fa-check"></i> Confirm Reservation';
        }

        this.showToast('Reservation created successfully!', 'success');
        this.renderConfirmationScreen(createdBooking);
        this.navigate('confirmation');
    },

    renderConfirmationScreen(booking) {
        document.getElementById('receipt-booking-id').innerText = booking.id;
        document.getElementById('receipt-customer-name').innerText = booking.customerName;
        document.getElementById('receipt-vehicle').innerText = `${booking.carBrand} ${booking.carModel}`;
        document.getElementById('receipt-pickup-loc').innerText = booking.pickupLocation;
        document.getElementById('receipt-dropoff-loc').innerText = booking.dropoffLocation;
        document.getElementById('receipt-pickup-date').innerText = `${booking.pickupDate} (${booking.pickupTime || '10:00'})`;
        document.getElementById('receipt-return-date').innerText = `${booking.returnDate} (${booking.returnTime || '18:00'})`;
        document.getElementById('receipt-duration').innerText = `${booking.rentalDays} Days`;
        document.getElementById('receipt-amount').innerText = `₹${booking.totalAmount.toLocaleString('en-IN')}`;
        document.getElementById('receipt-status').innerText = booking.status;
    },

    // ==========================================
    // MY BOOKINGS VIEW
    // ==========================================
    async renderMyBookings(filterStatus = 'All') {
        const listContainer = document.getElementById('my-bookings-list');
        if (!listContainer) return;

        const email = this.currentUser ? this.currentUser.email : 'customer@rentora.com';
        let bookings = await window.api.getUserBookings(email);

        if (filterStatus !== 'All') {
            bookings = bookings.filter(b => b.status.toLowerCase() === filterStatus.toLowerCase());
        }

        listContainer.innerHTML = '';
        if (bookings.length === 0) {
            listContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-calendar-xmark"></i>
                    <h3>No Bookings Found</h3>
                    <p style="color: var(--text-secondary); margin: 0.8rem 0 1.5rem;">You haven't made any car reservations matching this filter.</p>
                    <button class="btn btn-primary" onclick="app.navigate('cars')">Explore Available Cars</button>
                </div>
            `;
            return;
        }

        bookings.forEach(b => {
            const card = document.createElement('div');
            card.className = 'booking-item-card';
            card.innerHTML = `
                <div class="booking-thumb">
                    <img src="${b.carImage || 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=600&q=80'}" alt="${b.carBrand}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=600&q=80';">
                </div>
                <div>
                    <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.4rem;">
                        <span style="font-family: monospace; font-weight: 700; color: var(--accent-cyan); font-size: 0.95rem;">${b.id}</span>
                        <span class="status-badge ${b.status.toLowerCase()}">
                            <span class="status-dot"></span> ${b.status}
                        </span>
                    </div>
                    <h3 style="font-size: 1.3rem; margin-bottom: 0.4rem;">${b.carBrand} ${b.carModel}</h3>
                    <div style="font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.6rem;">
                        <span><i class="fa-regular fa-calendar"></i> ${b.pickupDate} to ${b.returnDate} (${b.rentalDays} Days)</span>
                        <span><i class="fa-solid fa-location-dot"></i> ${b.pickupLocation}</span>
                    </div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">Booked on ${new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                </div>
                <div style="text-align: right; display: flex; flex-direction: column; gap: 0.6rem;">
                    <div style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--text-primary);">
                        ₹${b.totalAmount.toLocaleString('en-IN')}
                    </div>
                    <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                        <button class="btn btn-secondary btn-sm" onclick="app.openBookingReceiptModal('${b.id}')">
                            <i class="fa-solid fa-receipt"></i> Voucher
                        </button>
                        ${b.status !== 'Cancelled' && b.status !== 'Completed' ? `
                            <button class="btn btn-outline btn-sm" onclick="app.cancelUserBooking('${b.id}')" style="color: var(--accent-rose); border-color: var(--accent-rose);">
                                Cancel
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
            listContainer.appendChild(card);
        });
    },

    async cancelUserBooking(id) {
        if (confirm('Are you sure you want to cancel this booking? Free cancellation policy applies.')) {
            await window.api.cancelBooking(id);
            this.showToast('Reservation cancelled successfully.', 'info');
            this.renderMyBookings();
        }
    },

    async openBookingReceiptModal(id) {
        const booking = await window.api.getBookingById(id);
        if (!booking) return;
        this.renderConfirmationScreen(booking);
        document.getElementById('receipt-modal').classList.add('active');
    },

    // ==========================================
    // AUTHENTICATION & DEMO ACCOUNTS
    // ==========================================
    checkSession() {
        this.currentUser = window.api.getCurrentUser();
        this.updateAuthUI();
    },

    updateAuthUI() {
        const authBtn = document.getElementById('nav-auth-btn');
        const adminLink = document.getElementById('nav-admin-link');
        const userMenu = document.getElementById('nav-user-menu');

        if (this.currentUser) {
            if (authBtn) authBtn.style.display = 'none';
            if (userMenu) {
                userMenu.style.display = 'flex';
                document.getElementById('nav-user-name').innerText = this.currentUser.name;
            }
            if (adminLink) {
                adminLink.style.display = this.currentUser.role === 'admin' ? 'block' : 'none';
            }
        } else {
            if (authBtn) authBtn.style.display = 'inline-flex';
            if (userMenu) userMenu.style.display = 'none';
            if (adminLink) adminLink.style.display = 'none';
        }
    },

    openAuthModal(defaultTab = 'signin') {
        const modal = document.getElementById('auth-modal');
        if (modal) modal.classList.add('active');
        this.showAuthTab(defaultTab);
    },

    showAuthTab(tab) {
        // Tab containers — IDs match what's in index.html
        const signinWrap = document.getElementById('login-form-wrap');
        const signupWrap = document.getElementById('signup-form-wrap');
        const resetWrap  = document.getElementById('reset-form-wrap');

        // Tab buttons
        const signinBtn = document.getElementById('tab-btn-signin');
        const signupBtn = document.getElementById('tab-btn-signup');

        // Hide all first
        if (signinWrap) signinWrap.style.display = 'none';
        if (signupWrap) signupWrap.style.display = 'none';
        if (resetWrap)  resetWrap.style.display  = 'none';

        // Reset tab button styles
        if (signinBtn) { signinBtn.classList.remove('btn-primary'); signinBtn.classList.add('btn-secondary'); }
        if (signupBtn) { signupBtn.classList.remove('btn-primary'); signupBtn.classList.add('btn-secondary'); }

        if (tab === 'signin') {
            if (signinWrap) signinWrap.style.display = 'block';
            if (signinBtn) { signinBtn.classList.add('btn-primary'); signinBtn.classList.remove('btn-secondary'); }
        } else if (tab === 'signup') {
            if (signupWrap) signupWrap.style.display = 'block';
            if (signupBtn) { signupBtn.classList.add('btn-primary'); signupBtn.classList.remove('btn-secondary'); }
        } else if (tab === 'reset') {
            if (resetWrap) resetWrap.style.display = 'block';
        }
    },

    openSettingsModal() {
        if (!this.currentUser) {
            this.openAuthModal('signin');
            return;
        }
        // Pre-fill profile fields
        const nameEl  = document.getElementById('settings-profile-name');
        const emailEl = document.getElementById('settings-profile-email');
        const phoneEl = document.getElementById('settings-profile-phone');
        if (nameEl)  nameEl.value  = this.currentUser.name  || '';
        if (emailEl) emailEl.value = this.currentUser.email || '';
        if (phoneEl) phoneEl.value = this.currentUser.phone || '';

        // Reset password fields
        ['settings-curr-pass','settings-new-pass','settings-confirm-pass'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });

        this.switchSettingsTab('profile');
        const modal = document.getElementById('settings-modal');
        if (modal) modal.classList.add('active');
    },

    switchSettingsTab(tab) {
        const profileTab  = document.getElementById('settings-tab-profile');
        const passwordTab = document.getElementById('settings-tab-password');
        const profileBtn  = document.getElementById('settings-tab-profile-btn');
        const passwordBtn = document.getElementById('settings-tab-password-btn');

        if (tab === 'profile') {
            if (profileTab)  profileTab.style.display  = 'block';
            if (passwordTab) passwordTab.style.display = 'none';
            if (profileBtn)  { profileBtn.classList.add('btn-primary');  profileBtn.classList.remove('btn-secondary'); }
            if (passwordBtn) { passwordBtn.classList.add('btn-secondary'); passwordBtn.classList.remove('btn-primary'); }
        } else {
            if (profileTab)  profileTab.style.display  = 'none';
            if (passwordTab) passwordTab.style.display = 'block';
            if (profileBtn)  { profileBtn.classList.add('btn-secondary');  profileBtn.classList.remove('btn-primary'); }
            if (passwordBtn) { passwordBtn.classList.add('btn-primary'); passwordBtn.classList.remove('btn-secondary'); }
        }
    },

    async handleProfileUpdate(e) {
        e.preventDefault();
        if (!this.currentUser) return;

        const name  = document.getElementById('settings-profile-name').value.trim();
        const phone = document.getElementById('settings-profile-phone').value.trim();

        if (!name) { this.showToast('Full name is required.', 'error'); return; }

        const result = await window.api.updateProfile(this.currentUser.email, { name, phone });
        if (result.success) {
            this.currentUser.name  = name;
            this.currentUser.phone = phone;
            this.updateAuthUI();
            this.showToast('Profile updated successfully!', 'success');
            this.closeModal('settings-modal');
        } else {
            this.showToast(result.message || 'Failed to update profile.', 'error');
        }
    },

    async handlePasswordChange(e) {
        e.preventDefault();
        if (!this.currentUser) return;

        const currPass    = document.getElementById('settings-curr-pass').value;
        const newPass     = document.getElementById('settings-new-pass').value;
        const confirmPass = document.getElementById('settings-confirm-pass').value;

        if (newPass.length < 6) {
            this.showToast('New password must be at least 6 characters.', 'error');
            return;
        }
        if (newPass !== confirmPass) {
            this.showToast('New passwords do not match.', 'error');
            return;
        }

        const result = await window.api.changePassword(this.currentUser.email, currPass, newPass);
        if (result.success) {
            ['settings-curr-pass','settings-new-pass','settings-confirm-pass'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
            this.showToast('Password updated successfully!', 'success');
            this.closeModal('settings-modal');
        } else {
            this.showToast(result.message || 'Current password is incorrect.', 'error');
        }
    },

    async handleResetPassword(e) {
        e.preventDefault();
        const email      = document.getElementById('reset-email').value.trim();
        const newPass    = document.getElementById('reset-new-password').value;
        const confirmPass = document.getElementById('reset-confirm-password').value;

        if (newPass.length < 6) {
            this.showToast('Password must be at least 6 characters.', 'error');
            return;
        }
        if (newPass !== confirmPass) {
            this.showToast('Passwords do not match.', 'error');
            return;
        }

        const result = await window.api.resetPassword(email, newPass);
        if (result.success) {
            this.showToast('Password reset successfully! Please sign in.', 'success');
            this.showAuthTab('signin');
            document.getElementById('login-email').value = email;
        } else {
            this.showToast(result.message || 'No account found with that email address.', 'error');
        }
    },

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    },

    fillDemoCredentials(role) {
        if (role === 'admin') {
            document.getElementById('login-email').value = 'admin@rentora.com';
            document.getElementById('login-password').value = 'admin123';
        } else {
            document.getElementById('login-email').value = 'customer@rentora.com';
            document.getElementById('login-password').value = 'rentora123';
        }
        this.showToast(`Autofilled demo ${role} credentials!`, 'info');
    },

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        const result = await window.api.login(email, password);
        if (result.success) {
            this.currentUser = result.user;
            this.updateAuthUI();
            this.closeModal('auth-modal');
            this.showToast(`Welcome back, ${this.currentUser.name}!`, 'success');

            if (this.currentUser.role === 'admin') {
                this.navigate('admin');
            }
        } else {
            this.showToast(result.message || 'Invalid login credentials', 'error');
        }
    },

    async handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const phone = document.getElementById('signup-phone').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;

        if (password !== confirm) {
            this.showToast('Passwords do not match.', 'error');
            return;
        }

        const result = await window.api.signup({ name, email, phone, password });
        if (result.success) {
            this.currentUser = result.user;
            this.updateAuthUI();
            this.closeModal('auth-modal');
            this.showToast(`Account created successfully! Welcome, ${this.currentUser.name}!`, 'success');
        } else {
            this.showToast(result.message || 'Failed to create account.', 'error');
        }
    },

    logout() {
        window.api.logout();
        this.currentUser = null;
        this.updateAuthUI();
        this.showToast('You have been logged out successfully.', 'info');
        this.navigate('home');
    },

    // ==========================================
    // TESTIMONIALS & REVIEWS
    // ==========================================
    renderTestimonials() {
        const grid = document.getElementById('testimonials-grid');
        if (!grid) return;
        const list = window.RENTORA_TESTIMONIALS || [];
        grid.innerHTML = '';
        list.forEach(t => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <div class="testimonial-rating">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <p class="testimonial-text">"${t.comment}"</p>
                <div class="testimonial-author">
                    <img src="${t.avatar}" alt="${t.name}" class="author-avatar">
                    <div>
                        <h4 style="font-size: 1rem;">${t.name}</h4>
                        <div style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 500;">Rented: ${t.carRented}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${t.role}</div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    },

    // ==========================================
    // TOAST NOTIFICATIONS
    // ==========================================
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icon = type === 'success' ? 'circle-check' : (type === 'error' ? 'circle-exclamation' : 'circle-info');
        toast.innerHTML = `
            <i class="fa-solid fa-${icon}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3600);
    },

    // ==========================================
    // EVENT LISTENERS BINDING
    // ==========================================
    setupEventListeners() {
        // Quick Search Form
        const searchForm = document.getElementById('hero-quick-search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => this.handleQuickSearch(e));
        }

        // Mobile Menu Drawer
        const menuBtn = document.getElementById('mobile-menu-btn');
        const drawer = document.getElementById('mobile-drawer');
        if (menuBtn && drawer) {
            menuBtn.addEventListener('click', () => {
                drawer.classList.toggle('active');
            });
        }

        // Theme Toggle
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }

        // Catalog Search Input (Debounced)
        const catalogSearch = document.getElementById('catalog-search-input');
        if (catalogSearch) {
            let timeout;
            catalogSearch.addEventListener('input', (e) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    this.catalogFilters.search = e.target.value.trim();
                    this.renderCatalog();
                }, 250);
            });
        }

        // Category Chips Click
        document.querySelectorAll('.cat-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                const cat = e.target.dataset.cat;
                this.catalogFilters.category = cat;
                this.updateCategoryChipsUI();
                this.renderCatalog();
            });
        });

        // Price Range Slider
        const priceRange = document.getElementById('filter-price-range');
        const priceVal = document.getElementById('filter-price-val');
        if (priceRange && priceVal) {
            priceRange.addEventListener('input', (e) => {
                const val = parseInt(e.target.value);
                priceVal.innerText = `₹${val.toLocaleString('en-IN')}`;
                this.catalogFilters.maxPrice = val;
                this.renderCatalog();
            });
        }

        // Sort By Select
        const sortSelect = document.getElementById('catalog-sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.catalogFilters.sortBy = e.target.value;
                this.renderCatalog();
            });
        }

        // Checkbox Filters (Fuels, Transmissions, Seats, Available)
        document.querySelectorAll('.filter-checkbox').forEach(cb => {
            cb.addEventListener('change', () => {
                const type = cb.dataset.type;
                const val = cb.value;
                if (type === 'fuel') {
                    if (cb.checked) this.catalogFilters.fuels.push(val);
                    else this.catalogFilters.fuels = this.catalogFilters.fuels.filter(f => f !== val);
                } else if (type === 'trans') {
                    if (cb.checked) this.catalogFilters.transmissions.push(val);
                    else this.catalogFilters.transmissions = this.catalogFilters.transmissions.filter(t => t !== val);
                } else if (type === 'seats') {
                    if (cb.checked) this.catalogFilters.seats.push(val);
                    else this.catalogFilters.seats = this.catalogFilters.seats.filter(s => s !== val);
                } else if (type === 'avail') {
                    this.catalogFilters.availableOnly = cb.checked;
                }
                this.renderCatalog();
            });
        });

        // Sticky Navbar Blur On Scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.navbar');
            if (nav) {
                if (window.scrollY > 30) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            }
        });

        // Contact Form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showToast('Thank you! Your message has been sent to our Rentora concierge team.', 'success');
                contactForm.reset();
            });
        }
    }
};

window.app = app;
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
