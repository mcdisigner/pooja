
document.addEventListener('DOMContentLoaded', () => {
    // Simple Auth Check (Simulated)
    const authOverlay = document.getElementById('auth-overlay');
    const authBtn = document.getElementById('auth-btn');
    const authInput = document.getElementById('auth-input');
    const adminPanel = document.getElementById('admin-panel');

    authBtn.addEventListener('click', () => {
        if (authInput.value === '1234') {
            authOverlay.classList.add('hidden');
            adminPanel.classList.remove('hidden');
            renderAdminList();
        } else {
            alert('Invalid PIN');
        }
    });

    // Form Handling
    const addForm = document.getElementById('add-product-form');
    
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newProduct = {
            title: document.getElementById('p-title').value,
            category: document.getElementById('p-category').value,
            price: document.getElementById('p-price').value,
            image: document.getElementById('p-image').value,
            description: document.getElementById('p-desc').value
        };

        const title = document.getElementById('p-title').value;
        if(!title) return;

        saveProduct(newProduct);
        alert('Product Added Successfully!');
        addForm.reset();
        renderAdminList();
    });

    // Render Admin List
    window.renderAdminList = () => {
        const list = document.getElementById('admin-product-list');
        const products = loadProducts();
        list.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-gray-50';
            row.innerHTML = `
                <td class="p-4">
                    <img src="${product.image}" class="w-12 h-12 object-cover rounded">
                </td>
                <td class="p-4 font-medium">${product.title}</td>
                <td class="p-4 text-gray-500">${product.category}</td>
                <td class="p-4 text-gray-500">${formatPrice(product.price)}</td>
                <td class="p-4">
                    <button onclick="handleDelete(${product.id})" class="text-red-500 hover:text-red-700">Delete</button>
                </td>
            `;
            list.appendChild(row);
        });
    };

    window.handleDelete = (id) => {
        if(confirm('Are you sure you want to delete this item?')) {
            deleteProduct(id);
            renderAdminList();
        }
    };
});
