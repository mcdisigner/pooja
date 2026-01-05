document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const productGrid = document.getElementById('product-grid');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const heroTitle = document.getElementById('hero-title');

    let allProducts = loadProducts();
    let currentCategory = 'all';

    // Mobile Menu Toggle
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Render Products
    const renderProducts = (category) => {
        productGrid.innerHTML = '';
        
        let filtered = allProducts;
        if (category !== 'all') {
            filtered = allProducts.filter(p => p.category === category);
        }

        if (filtered.length === 0) {
            productGrid.innerHTML = `
                <div class="col-span-full text-center py-20">
                    <p class="text-gray-500 text-xl">No cakes found in this category yet.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(product => {
            const card = document.createElement('div');
            card.className = 'group bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl';
            card.innerHTML = `
                <div class="relative h-64 overflow-hidden">
                    <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover transition duration-500 group-hover:scale-110">
                    <div class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition"></div>
                    <span class="absolute top-4 right-4 bg-white/90 backdrop-blur text-pink-600 font-bold px-3 py-1 rounded-full text-sm shadow-sm">
                        ${product.category.toUpperCase()}
                    </span>
                </div>
                <div class="p-6">
                    <h3 class="font-serif text-2xl text-gray-800 mb-2 truncate">${product.title}</h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2 h-10">${product.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xl font-bold text-pink-600">${formatPrice(product.price)}</span>
                        <button onclick="orderProduct('${product.title}')" class="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition">
                            Order Now
                        </button>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });
    };

    // Category Filtering
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update Active State
            categoryButtons.forEach(b => {
                b.classList.remove('bg-pink-600', 'text-white');
                b.classList.add('bg-white', 'text-gray-600');
            });
            e.target.classList.remove('bg-white', 'text-gray-600');
            e.target.classList.add('bg-pink-600', 'text-white');

            currentCategory = e.target.dataset.category;
            renderProducts(currentCategory);
        });
    });

    // Initial Render
    renderProducts('all');
});

// Order Function
function orderProduct(title) {
    // CONTACT NUMBER - SHOP OWNER (Change this to your number)
    const phoneNumber = "94724955460"; // Format: 947xxxxxxxxx (without +)

    const message = `Halo, Pooja Dream Paris! 🌸\n\nMata me cake eka order karanna ona: *${title}*\n\nPrice/Wisthara danaganna puluwanda?`;
    
    // Create WhatsApp Link
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open in new tab
    window.open(url, '_blank');
}
