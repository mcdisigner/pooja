// Data Management
const loadProducts = () => {
    const stored = localStorage.getItem('pooja_products');
    if (stored) {
        return JSON.parse(stored);
    }
    // Initialize with default data if empty
    localStorage.setItem('pooja_products', JSON.stringify(initialProducts));
    return initialProducts;
};

const saveProduct = (product) => {
    const products = loadProducts();
    product.id = Date.now(); // Simple ID
    products.push(product);
    localStorage.setItem('pooja_products', JSON.stringify(products));
    return products;
};

const deleteProduct = (id) => {
    let products = loadProducts();
    products = products.filter(p => p.id != id);
    localStorage.setItem('pooja_products', JSON.stringify(products));
    return products;
};

const formatPrice = (price) => {
    return 'LKR ' + parseInt(price).toLocaleString();
};
