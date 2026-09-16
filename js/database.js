/**
 * RENTORA - Initial Fleet & Seed Database
 * Provides realistic pre-seeded data for cars, bookings, users, locations, and testimonials.
 */

const INITIAL_CARS = [
    {
        id: 'car-101',
        brand: 'BMW',
        model: 'M4 Competition Coupe',
        year: 2024,
        category: 'Sports',
        pricePerDay: 18500,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        seats: 4,
        mileage: '10.5 km/l',
        power: '503 hp',
        acceleration: '0-100 in 3.8s',
        topSpeed: '290 km/h',
        available: true,
        rating: 4.9,
        reviewCount: 48,
        popularity: 98,
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['M Sport Exhaust', 'Carbon Fiber Roof', 'Harman Kardon Sound', 'Head-Up Display', 'Wireless CarPlay', 'Adaptive Suspension', '360° Camera', 'Heated Sport Seats'],
        description: 'The BMW M4 Competition is an iconic track-capable thoroughbred engineered for supreme driving engagement. Featuring a TwinPower Turbo inline 6-cylinder engine delivering 503 hp, razor-sharp steering, and aggressive styling.',
        fuelPolicy: 'Full to Full - Return vehicle with the same fuel level as at pick-up.',
        deposit: 25000,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-102',
        brand: 'Mercedes-Benz',
        model: 'C-Class C300 Luxury',
        year: 2024,
        category: 'Luxury',
        pricePerDay: 9500,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        seats: 5,
        mileage: '14.5 km/l',
        power: '255 hp',
        acceleration: '0-100 in 5.9s',
        topSpeed: '250 km/h',
        available: true,
        rating: 4.8,
        reviewCount: 76,
        popularity: 94,
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['Panoramic Sunroof', 'Burmester 3D Surround', 'Ambient 64-Color Lighting', 'Active Brake Assist', 'Ventilated Front Seats', '11.9" MBUX Touchscreen', 'Wireless Charging'],
        description: 'The Mercedes-Benz C-Class exemplifies modern executive luxury. Quiet, exceptionally comfortable, and packed with cutting-edge German technology, making it the perfect vehicle for business meetings and weekend escapes.',
        fuelPolicy: 'Full to Full',
        deposit: 15000,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-103',
        brand: 'Tesla',
        model: 'Model 3 Long Range AWD',
        year: 2024,
        category: 'Electric',
        pricePerDay: 7200,
        fuelType: 'Electric',
        transmission: 'Automatic',
        seats: 5,
        mileage: '550 km Range',
        power: '425 hp',
        acceleration: '0-100 in 4.2s',
        topSpeed: '233 km/h',
        available: true,
        rating: 4.9,
        reviewCount: 112,
        popularity: 96,
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['Autopilot Capability', '15.4" Center Display', 'Premium Glass Roof', 'Supercharger Access', 'Heated Seats All Around', 'Sentry Mode Security', 'Navigation with Traffic'],
        description: 'Experience whisper-quiet EV performance and instant torque with the Tesla Model 3 Long Range. Includes complimentary access to supercharger networks and seamless smartphone keyless access.',
        fuelPolicy: 'Return with at least 20% battery charge.',
        deposit: 12000,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-104',
        brand: 'Porsche',
        model: '911 Carrera S',
        year: 2024,
        category: 'Sports',
        pricePerDay: 24000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        seats: 4,
        mileage: '9.5 km/l',
        power: '443 hp',
        acceleration: '0-100 in 3.5s',
        topSpeed: '308 km/h',
        available: true,
        rating: 5.0,
        reviewCount: 39,
        popularity: 99,
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['Sport Chrono Package', 'PASM Sport Suspension', 'Bose Surround System', 'Sport Exhaust System', 'Launch Control', 'Carbon Ceramic Brakes', 'Apple CarPlay'],
        description: 'The definitive sports car benchmark. The rear-engine layout and twin-turbo boxer-6 produce an exhilarating drive with extraordinary agility and timeless heritage.',
        fuelPolicy: 'Full to Full (98 Octane recommended)',
        deposit: 30000,
        freeCancellation: 'Free cancellation up to 48 hours before pick-up.'
    },
    {
        id: 'car-105',
        brand: 'Land Rover',
        model: 'Range Rover Velar Dynamic',
        year: 2024,
        category: 'SUV',
        pricePerDay: 14000,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        seats: 5,
        mileage: '13.5 km/l',
        power: '296 hp',
        acceleration: '0-100 in 6.7s',
        topSpeed: '230 km/h',
        available: true,
        rating: 4.8,
        reviewCount: 52,
        popularity: 91,
        image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['Terrain Response 2', 'Flush Deployable Door Handles', 'Meridian Sound System', 'Pivi Pro Dual Screen', 'Matrix LED Headlights', 'Electronic Air Suspension', '3D Surround Camera'],
        description: 'Avant-garde styling meets genuine go-anywhere capability. The Range Rover Velar turns heads in the city while conquering rough country terrain effortlessly.',
        fuelPolicy: 'Full to Full',
        deposit: 20000,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-106',
        brand: 'Audi',
        model: 'Q7 Quattro Technology',
        year: 2024,
        category: 'SUV',
        pricePerDay: 13500,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        seats: 7,
        mileage: '11.2 km/l',
        power: '335 hp',
        acceleration: '0-100 in 5.9s',
        topSpeed: '250 km/h',
        available: true,
        rating: 4.9,
        reviewCount: 64,
        popularity: 93,
        image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['7-Seater Cabin', 'Quattro All-Wheel Drive', 'Audi Virtual Cockpit Plus', 'Bang & Olufsen 3D Audio', 'Adaptive Air Suspension', 'Panoramic Glass Sunroof', 'Park Assist Plus'],
        description: 'The ultimate 7-seat luxury family cruiser. High ride height, generous luggage space, and unmatched Audi refinement make long journeys a serene experience.',
        fuelPolicy: 'Full to Full',
        deposit: 20000,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-107',
        brand: 'Hyundai',
        model: 'Ioniq 5 AWD EV',
        year: 2024,
        category: 'Electric',
        pricePerDay: 6800,
        fuelType: 'Electric',
        transmission: 'Automatic',
        seats: 5,
        mileage: '480 km Range',
        power: '305 hp',
        acceleration: '0-100 in 5.2s',
        topSpeed: '185 km/h',
        available: true,
        rating: 4.8,
        reviewCount: 42,
        popularity: 88,
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['800V Ultra-Fast Charging', 'Vehicle-to-Load (V2L)', 'Relaxation Comfort Seats', 'Parametric Pixel Lights', 'Augmented Reality HUD', 'Smart Cruise Control'],
        description: 'Award-winning futuristic retro design with spacious flat-floor cabin and ultra-fast 800-volt charging capability (10% to 80% in just 18 minutes).',
        fuelPolicy: 'Return with at least 20% battery.',
        deposit: 10000,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-108',
        brand: 'Toyota',
        model: 'Fortuner Legender 4x4',
        year: 2024,
        category: 'SUV',
        pricePerDay: 6500,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        seats: 7,
        mileage: '14.2 km/l',
        power: '204 hp',
        acceleration: '0-100 in 9.8s',
        topSpeed: '190 km/h',
        available: true,
        rating: 4.9,
        reviewCount: 138,
        popularity: 95,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['4x4 Off-Road Lock', 'Dual-Zone Climate Control', '11-Speaker JBL Audio', 'Wireless Charging', 'Ventilated Seats', 'Powered Tailgate', '7 Tough Airbags'],
        description: 'The king of Indian highways and rugged trails. Known worldwide for bulletproof reliability, commanding road presence, and supreme comfort for 7 passengers.',
        fuelPolicy: 'Full to Full',
        deposit: 10000,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-109',
        brand: 'Mahindra',
        model: 'Thar 4x4 Hard Top',
        year: 2024,
        category: 'SUV',
        pricePerDay: 3800,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        seats: 4,
        mileage: '13.5 km/l',
        power: '130 hp',
        acceleration: '0-100 in 11.2s',
        topSpeed: '155 km/h',
        available: true,
        rating: 4.8,
        reviewCount: 95,
        popularity: 92,
        image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['Shift-on-the-fly 4WD', 'Roll Cage Protection', 'Water-Resistant Dashboard', 'Touchscreen with Adventure Gauges', 'Roof Speakers', 'Hill Descent Assist'],
        description: 'Unleash your spirit of adventure. The Mahindra Thar is India’s favorite off-roader, built to tackle mountains, beaches, and rocky passes without breaking a sweat.',
        fuelPolicy: 'Full to Full',
        deposit: 6000,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-110',
        brand: 'Tata',
        model: 'Safari Dark Edition',
        year: 2024,
        category: 'SUV',
        pricePerDay: 4600,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        seats: 7,
        mileage: '16.1 km/l',
        power: '170 hp',
        acceleration: '0-100 in 10.5s',
        topSpeed: '180 km/h',
        available: true,
        rating: 4.7,
        reviewCount: 68,
        popularity: 89,
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['Level 2 ADAS', 'Panoramic Sunroof with Mood Lighting', 'JBL 10-Speaker Audio', 'Ventilated 1st & 2nd Row Seats', 'Electronic Parking Brake', 'Terrain Response Modes'],
        description: 'Imposing presence wrapped in stealth Oberon Black. The Tata Safari offers first-class captain seating, segment-best ride quality, and a 5-star GNCAP safety rating.',
        fuelPolicy: 'Full to Full',
        deposit: 7000,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-111',
        brand: 'Toyota',
        model: 'Camry Hybrid Luxury',
        year: 2024,
        category: 'Sedan',
        pricePerDay: 5500,
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        seats: 5,
        mileage: '23.8 km/l',
        power: '215 hp',
        acceleration: '0-100 in 8.3s',
        topSpeed: '200 km/h',
        available: true,
        rating: 4.9,
        reviewCount: 84,
        popularity: 90,
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['Self-Charging Hybrid Drive', 'Reclining Rear Seats', 'Rear Armrest Touch Controls', 'JBL 9-Speaker Audio', '9 Airbags', 'Heated & Cooled Seats'],
        description: 'The epitome of quiet sophistication and ultra-high fuel efficiency. Offers rear-seat luxury comparable to cars twice its price, powered by Toyota\'s bulletproof hybrid engine.',
        fuelPolicy: 'Full to Full',
        deposit: 8000,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-112',
        brand: 'Hyundai',
        model: 'Creta SX(O) Turbo',
        year: 2024,
        category: 'SUV',
        pricePerDay: 3400,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        seats: 5,
        mileage: '19.1 km/l',
        power: '115 hp',
        acceleration: '0-100 in 11.0s',
        topSpeed: '175 km/h',
        available: true,
        rating: 4.8,
        reviewCount: 145,
        popularity: 97,
        image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['Voice-Enabled Panoramic Sunroof', 'Bose Premium Audio', 'Ventilated Seats', '10.25" Dual Digital Screen', 'Blind-Spot View Monitor', 'Electronic Parking Brake'],
        description: 'India\'s most sought-after urban SUV. Packed with premium tech, punchy diesel performance, effortless automatic transmission, and incredible fuel economy.',
        fuelPolicy: 'Full to Full',
        deposit: 5000,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-113',
        brand: 'Honda',
        model: 'City ZX Elegant',
        year: 2024,
        category: 'Sedan',
        pricePerDay: 2800,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        seats: 5,
        mileage: '18.4 km/l',
        power: '121 hp',
        acceleration: '0-100 in 10.2s',
        topSpeed: '185 km/h',
        available: true,
        rating: 4.7,
        reviewCount: 110,
        popularity: 88,
        image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['Honda SENSING ADAS', 'Electric Sunroof', 'LaneWatch Camera', '8" Touchscreen with Apple CarPlay', 'Automatic Climate Control', 'Rear AC Vents'],
        description: 'A timeless benchmark among mid-size sedans. Generous legroom, silky-smooth i-VTEC petrol engine with CVT automatic, and proven family comfort.',
        fuelPolicy: 'Full to Full',
        deposit: 4000,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-114',
        brand: 'Hyundai',
        model: 'Verna Turbo SX(O)',
        year: 2024,
        category: 'Sedan',
        pricePerDay: 3200,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        seats: 5,
        mileage: '17.8 km/l',
        power: '160 hp',
        acceleration: '0-100 in 8.1s',
        topSpeed: '210 km/h',
        available: true,
        rating: 4.8,
        reviewCount: 82,
        popularity: 91,
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['160 hp Turbocharged Engine', 'Dual 10.25" Screens', 'Bose 8-Speaker Audio', 'Heated & Cooled Seats', 'Paddle Shifters', 'Fastback Silhouette'],
        description: 'Striking fastback styling, ferocious 160 hp turbocharged engine, 7-speed dual-clutch transmission, and sporty black interiors with red accents.',
        fuelPolicy: 'Full to Full',
        deposit: 5000,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-115',
        brand: 'Hyundai',
        model: 'i20 Asta(O)',
        year: 2024,
        category: 'Economy',
        pricePerDay: 1800,
        fuelType: 'Petrol',
        transmission: 'Manual',
        seats: 5,
        mileage: '21.0 km/l',
        power: '83 hp',
        acceleration: '0-100 in 12.5s',
        topSpeed: '165 km/h',
        available: true,
        rating: 4.6,
        reviewCount: 92,
        popularity: 86,
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['Electric Sunroof', '10.25" Touchscreen', 'Bose 7-Speaker Sound', 'Wireless Phone Charger', 'Rear Parking Camera', 'Air Purifier'],
        description: 'Premium hatchback offering unmatched cabin ergonomics, class-leading features, and light-footed city maneuverability at a very economical price.',
        fuelPolicy: 'Full to Full',
        deposit: 3000,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-116',
        brand: 'Maruti Suzuki',
        model: 'Swift ZXi Plus',
        year: 2024,
        category: 'Economy',
        pricePerDay: 1600,
        fuelType: 'Petrol',
        transmission: 'Manual',
        seats: 5,
        mileage: '24.8 km/l',
        power: '82 hp',
        acceleration: '0-100 in 12.8s',
        topSpeed: '165 km/h',
        available: true,
        rating: 4.7,
        reviewCount: 160,
        popularity: 94,
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['6 Airbags Standard', '9" SmartPlay Pro+ Touchscreen', 'Wireless Android Auto / CarPlay', 'Cruise Control', 'LED Projector Headlamps', 'Reverse Parking Sensors'],
        description: 'India\'s champion fuel saver. Nimble, incredibly easy to park in crowded city traffic, and reliable beyond measure with phenomenal 24.8 km/l mileage.',
        fuelPolicy: 'Full to Full',
        deposit: 2500,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-117',
        brand: 'Tata',
        model: 'Altroz XZ Plus Dark',
        year: 2024,
        category: 'Economy',
        pricePerDay: 1900,
        fuelType: 'Diesel',
        transmission: 'Manual',
        seats: 5,
        mileage: '23.6 km/l',
        power: '90 hp',
        acceleration: '0-100 in 12.0s',
        topSpeed: '170 km/h',
        available: true,
        rating: 4.7,
        reviewCount: 54,
        popularity: 82,
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['5-Star Global NCAP Safety', 'Harman 8-Speaker Audio', '90-Degree Opening Doors', 'Cruise Control', 'Cooled Glove Box', 'Rain Sensing Wipers'],
        description: 'Built like a tank with gold-standard 5-star crash safety. The torque-rich diesel engine makes highway overtaking effortless while delivering budget-friendly economy.',
        fuelPolicy: 'Full to Full',
        deposit: 3000,
        freeCancellation: 'Free cancellation up to 24 hours before pick-up.'
    },
    {
        id: 'car-118',
        brand: 'Ford',
        model: 'Mustang GT V8',
        year: 2023,
        category: 'Sports',
        pricePerDay: 16000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        seats: 4,
        mileage: '8.5 km/l',
        power: '450 hp',
        acceleration: '0-100 in 4.4s',
        topSpeed: '250 km/h',
        available: false,
        rating: 4.9,
        reviewCount: 71,
        popularity: 95,
        image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
        ],
        features: ['5.0L Coyote V8 Engine', 'Active Valve Performance Exhaust', 'Brembo 6-Piston Brakes', 'Track Apps with Line Lock', 'Shaker Pro Audio', 'Selectable Drive Modes'],
        description: 'Pure American muscle with an unmistakable thunderous V8 roar. A legendary head-turner combining raw straight-line power with iconic retro silhouette.',
        fuelPolicy: 'Full to Full',
        deposit: 25000,
        freeCancellation: 'Free cancellation up to 48 hours before pick-up.'
    }
];

const INITIAL_BOOKINGS = [
    {
        id: 'REN-2026-00125',
        carId: 'car-102',
        carBrand: 'Mercedes-Benz',
        carModel: 'C-Class C300 Luxury',
        carCategory: 'Luxury',
        carImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80',
        customerName: 'Rahul Sharma',
        customerEmail: 'customer@rentora.com',
        customerPhone: '+91 98765 43210',
        pickupLocation: 'Mumbai Airport Terminal 2',
        dropoffLocation: 'Mumbai Airport Terminal 2',
        pickupDate: '2026-09-15',
        pickupTime: '10:00',
        returnDate: '2026-09-18',
        returnTime: '18:00',
        rentalDays: 3,
        dailyRate: 9500,
        baseAmount: 28500,
        insuranceFee: 1500,
        taxesFee: 5130,
        totalAmount: 35130,
        status: 'Confirmed',
        createdAt: '2026-09-10T14:32:00.000Z',
        notes: 'Flight arriving at 09:30 AM. Need car prepared at VIP bay.'
    },
    {
        id: 'REN-2026-00124',
        carId: 'car-108',
        carBrand: 'Toyota',
        carModel: 'Fortuner Legender 4x4',
        carCategory: 'SUV',
        carImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
        customerName: 'Ananya Deshmukh',
        customerEmail: 'ananya.d@gmail.com',
        customerPhone: '+91 98220 11223',
        pickupLocation: 'Bangalore Kempegowda Airport (BLR)',
        dropoffLocation: 'Bangalore Kempegowda Airport (BLR)',
        pickupDate: '2026-09-12',
        pickupTime: '08:00',
        returnDate: '2026-09-16',
        returnTime: '20:00',
        rentalDays: 4,
        dailyRate: 6500,
        baseAmount: 26000,
        insuranceFee: 2000,
        taxesFee: 4680,
        totalAmount: 32680,
        status: 'Confirmed',
        createdAt: '2026-09-08T09:15:00.000Z',
        notes: 'Family road trip to Coorg. Request roof rack if available.'
    },
    {
        id: 'REN-2026-00123',
        carId: 'car-103',
        carBrand: 'Tesla',
        carModel: 'Model 3 Long Range AWD',
        carCategory: 'Electric',
        carImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80',
        customerName: 'Kunal Singhania',
        customerEmail: 'kunal.singh@venture.co',
        customerPhone: '+91 97110 54321',
        pickupLocation: 'Delhi IGI Airport Terminal 3',
        dropoffLocation: 'Gurgaon Cyber City Hub',
        pickupDate: '2026-09-02',
        pickupTime: '11:00',
        returnDate: '2026-09-04',
        returnTime: '19:00',
        rentalDays: 2,
        dailyRate: 7200,
        baseAmount: 14400,
        insuranceFee: 1000,
        taxesFee: 2592,
        totalAmount: 17992,
        status: 'Completed',
        createdAt: '2026-08-30T16:20:00.000Z',
        notes: 'Tech executive visit. Tesla mobile app key pairing required.'
    },
    {
        id: 'REN-2026-00122',
        carId: 'car-109',
        carBrand: 'Mahindra',
        carModel: 'Thar 4x4 Hard Top',
        carCategory: 'SUV',
        carImage: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80',
        customerName: 'Vikram Mehta',
        customerEmail: 'vikram.mehta@outlook.com',
        customerPhone: '+91 99300 88776',
        pickupLocation: 'Goa Dabolim Airport',
        dropoffLocation: 'Goa Mopa Airport',
        pickupDate: '2026-09-20',
        pickupTime: '12:00',
        returnDate: '2026-09-23',
        returnTime: '14:00',
        rentalDays: 3,
        dailyRate: 3800,
        baseAmount: 11400,
        insuranceFee: 1200,
        taxesFee: 2052,
        totalAmount: 14652,
        status: 'Pending',
        createdAt: '2026-09-11T09:40:00.000Z',
        notes: 'Holiday in North Goa. Require clean off-road tires.'
    }
];

const INITIAL_USERS = [
    {
        id: 'usr-admin-1',
        name: 'Rentora Fleet Administrator',
        email: 'admin@rentora.com',
        phone: '+91 98000 00000',
        role: 'admin',
        password: 'admin123',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        createdAt: '2025-01-01T00:00:00.000Z'
    },
    {
        id: 'usr-cust-1',
        name: 'Rahul Sharma',
        email: 'customer@rentora.com',
        phone: '+91 98765 43210',
        role: 'customer',
        password: 'rentora123',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        createdAt: '2025-06-15T00:00:00.000Z'
    }
];

const PICKUP_LOCATIONS = [
    'Mumbai Airport Terminal 2 (CSMIA)',
    'Mumbai Bandra Kurla Complex (BKC)',
    'Bangalore Kempegowda Airport (BLR)',
    'Bangalore Indiranagar Hub',
    'Delhi IGI Airport Terminal 3',
    'Gurgaon Cyber City Hub',
    'Hyderabad Rajiv Gandhi Airport (RGIA)',
    'Hyderabad Hitec City Hub',
    'Pune Lohegaon Airport & Koregaon Park',
    'Goa Dabolim Airport & North Goa Hub',
    'Chennai International Airport (MAA)'
];

const TESTIMONIALS = [
    {
        id: 1,
        name: 'Arjun Nambiar',
        role: 'Managing Director, Horizon Media',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        carRented: 'BMW M4 Competition',
        comment: 'Rentora redefined my perspective on car rentals in India. The BMW M4 was delivered spotless, paperwork took under 90 seconds, and the mechanical condition was pure perfection. Absolutely unmatched service.'
    },
    {
        id: 2,
        name: 'Priyanka Sen',
        role: 'Senior Product Architect',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        carRented: 'Tesla Model 3 Long Range',
        comment: 'Rented the Tesla for a scenic weekend trip to the hills. Clear pricing without hidden surge fees, seamless app integration, and 24/7 responsive concierge support. Rentora is now my default travel partner.'
    },
    {
        id: 3,
        name: 'Devendra Rathore',
        role: 'Automotive Journalist',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        carRented: 'Range Rover Velar',
        comment: 'As someone who reviews cars for a living, I have exacting standards. Rentora’s fleet quality, vehicle hygiene, and transparent booking policy exceed even the largest global brands. Outstanding execution.'
    }
];

// In-browser LocalStorage Database Engine
class LocalDB {
    constructor() {
        this.STORAGE_KEYS = {
            CARS: 'rentora_cars',
            BOOKINGS: 'rentora_bookings',
            USERS: 'rentora_users',
            CURRENT_USER: 'rentora_current_user',
            THEME: 'rentora_theme'
        };
        this.init();
    }

    init() {
        const CURRENT_FLEET_VERSION = 'rentora_v3_fixed_audi_q7';
        if (localStorage.getItem('rentora_fleet_version') !== CURRENT_FLEET_VERSION) {
            localStorage.setItem(this.STORAGE_KEYS.CARS, JSON.stringify(INITIAL_CARS));
            localStorage.setItem('rentora_fleet_version', CURRENT_FLEET_VERSION);
        } else if (!localStorage.getItem(this.STORAGE_KEYS.CARS)) {
            localStorage.setItem(this.STORAGE_KEYS.CARS, JSON.stringify(INITIAL_CARS));
        }
        if (!localStorage.getItem(this.STORAGE_KEYS.BOOKINGS)) {
            localStorage.setItem(this.STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
        }
        if (!localStorage.getItem(this.STORAGE_KEYS.USERS)) {
            localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
        }
    }

    // CARS CRUD
    getCars() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEYS.CARS);
            let cars = data ? JSON.parse(data) : INITIAL_CARS;
            // Immediate hotfix safeguard for Audi Q7 or any legacy stored image
            cars = cars.map(c => {
                if (c.id === 'car-106' && (!c.image || c.image.includes('1541348263662'))) {
                    c.image = 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80';
                    c.gallery = [
                        'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
                        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
                        'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80'
                    ];
                }
                return c;
            });
            return cars;
        } catch (e) {
            return INITIAL_CARS;
        }
    }

    getCarById(id) {
        const cars = this.getCars();
        return cars.find(c => c.id === id) || null;
    }

    saveCar(carData) {
        const cars = this.getCars();
        if (carData.id) {
            const idx = cars.findIndex(c => c.id === carData.id);
            if (idx >= 0) {
                cars[idx] = { ...cars[idx], ...carData };
            } else {
                cars.unshift(carData);
            }
        } else {
            carData.id = 'car-' + Date.now();
            cars.unshift(carData);
        }
        localStorage.setItem(this.STORAGE_KEYS.CARS, JSON.stringify(cars));
        return carData;
    }

    deleteCar(id) {
        let cars = this.getCars();
        cars = cars.filter(c => c.id !== id);
        localStorage.setItem(this.STORAGE_KEYS.CARS, JSON.stringify(cars));
        return true;
    }

    toggleCarAvailability(id) {
        const cars = this.getCars();
        const car = cars.find(c => c.id === id);
        if (car) {
            car.available = !car.available;
            localStorage.setItem(this.STORAGE_KEYS.CARS, JSON.stringify(cars));
            return car;
        }
        return null;
    }

    // BOOKINGS CRUD
    getBookings() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEYS.BOOKINGS);
            return data ? JSON.parse(data) : INITIAL_BOOKINGS;
        } catch (e) {
            return INITIAL_BOOKINGS;
        }
    }

    getBookingById(id) {
        const bookings = this.getBookings();
        return bookings.find(b => b.id === id) || null;
    }

    getUserBookings(email) {
        const bookings = this.getBookings();
        if (!email) return bookings;
        return bookings.filter(b => b.customerEmail.toLowerCase() === email.toLowerCase());
    }

    createBooking(bookingData) {
        const bookings = this.getBookings();
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const newBooking = {
            id: `REN-2026-${randomNum}`,
            status: 'Confirmed',
            createdAt: new Date().toISOString(),
            ...bookingData
        };
        bookings.unshift(newBooking);
        localStorage.setItem(this.STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

        // Optionally mark car as temporarily unavailable if desired
        return newBooking;
    }

    updateBookingStatus(id, newStatus) {
        const bookings = this.getBookings();
        const booking = bookings.find(b => b.id === id);
        if (booking) {
            booking.status = newStatus;
            localStorage.setItem(this.STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
            return booking;
        }
        return null;
    }

    cancelBooking(id) {
        return this.updateBookingStatus(id, 'Cancelled');
    }

    // USERS & AUTH
    getUsers() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEYS.USERS);
            return data ? JSON.parse(data) : INITIAL_USERS;
        } catch (e) {
            return INITIAL_USERS;
        }
    }

    authenticate(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (user) {
            const safeUser = { ...user };
            delete safeUser.password;
            localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
            return { success: true, user: safeUser };
        }
        return { success: false, message: 'Invalid email or password' };
    }

    register(userData) {
        const users = this.getUsers();
        const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
        if (existing) {
            return { success: false, message: 'An account with this email already exists.' };
        }
        const newUser = {
            id: 'usr-' + Date.now(),
            role: 'customer',
            createdAt: new Date().toISOString(),
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
            ...userData
        };
        users.push(newUser);
        localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users));

        const safeUser = { ...newUser };
        delete safeUser.password;
        localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
        return { success: true, user: safeUser };
    }

    getCurrentUser() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }

    logout() {
        localStorage.removeItem(this.STORAGE_KEYS.CURRENT_USER);
    }

    resetPassword(email, newPassword) {
        const users = this.getUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!user) {
            return { success: false, message: 'No registered user found with this email address.' };
        }
        if (!newPassword || newPassword.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters long.' };
        }
        user.password = newPassword;
        localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users));
        return { success: true, message: 'Password updated successfully! You can now log in.' };
    }

    changePassword(userId, currentPassword, newPassword) {
        const users = this.getUsers();
        const user = users.find(u => u.id === userId);
        if (!user) {
            return { success: false, message: 'User not found.' };
        }
        if (user.password !== currentPassword) {
            return { success: false, message: 'Current password is incorrect.' };
        }
        if (!newPassword || newPassword.length < 6) {
            return { success: false, message: 'New password must be at least 6 characters long.' };
        }
        user.password = newPassword;
        localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users));
        return { success: true, message: 'Password updated successfully!' };
    }

    updateProfile(userId, profileData) {
        const users = this.getUsers();
        const user = users.find(u => u.id === userId);
        if (!user) {
            return { success: false, message: 'User not found.' };
        }
        if (profileData.name) user.name = profileData.name;
        if (profileData.phone !== undefined) user.phone = profileData.phone;
        if (profileData.avatar) user.avatar = profileData.avatar;

        localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users));

        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.id === userId) {
            const updated = { ...currentUser, ...profileData };
            localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(updated));
        }

        return { success: true, message: 'Profile updated successfully!', user };
    }

    // ANALYTICS STATS FOR ADMIN
    getAdminStats() {
        const cars = this.getCars();
        const bookings = this.getBookings();
        const users = this.getUsers();

        const totalCars = cars.length;
        const availableCars = cars.filter(c => c.available).length;
        const totalBookings = bookings.length;
        const activeRentors = bookings.filter(b => b.status === 'Confirmed').length;
        const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
        const completedBookings = bookings.filter(b => b.status === 'Completed').length;
        
        const totalRevenue = bookings
            .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
            .reduce((acc, b) => acc + (b.totalAmount || 0), 0);

        // Group by category
        const categoryCounts = {};
        cars.forEach(c => {
            categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
        });

        // Group recent bookings for timeline
        const revenueByMonth = [
            { month: 'Apr', revenue: 145000 },
            { month: 'May', revenue: 182000 },
            { month: 'Jun', revenue: 224000 },
            { month: 'Jul', revenue: 268000 },
            { month: 'Aug', revenue: 312000 },
            { month: 'Sep', revenue: Math.max(345000, totalRevenue) }
        ];

        return {
            totalCars,
            availableCars,
            totalBookings,
            activeRentors,
            pendingBookings,
            completedBookings,
            totalRevenue,
            categoryCounts,
            revenueByMonth,
            totalCustomers: users.filter(u => u.role !== 'admin').length
        };
    }
}

// Global window attachment
window.RentoraDB = new LocalDB();
window.RENTORA_LOCATIONS = PICKUP_LOCATIONS;
window.RENTORA_TESTIMONIALS = TESTIMONIALS;
