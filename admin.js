import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { loadProducts, saveProduct, deleteProduct, formatPrice, subscribeToProducts } from './script.js';

document.addEventListener('DOMContentLoaded', () => {
    const authOverlay = document.getElementById('auth-overlay');
    const authBtn = document.getElementById('auth-btn');
    const authEmail = document.getElementById('auth-email');
    const authPassword = document.getElementById('auth-password');
    const adminPanel = document.getElementById('admin-panel');
    const logoutBtn = document.getElementById('logout-btn');
    const addForm = document.getElementById('add-product-form');

    // Check auth state
    onAuthStateChanged(auth, (user) => {
        if (user) {
            authOverlay.classList.add('hidden');
            adminPanel.classList.remove('hidden');
            renderAdminList();
        } else {
            authOverlay.classList.remove('hidden');
            adminPanel.classList.add('hidden');
        }
    });

    // Login
    authBtn.addEventListener('click', async () => {
        const email = authEmail.value;
        const password = authPassword.value;
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            alert('Invalid credentials: ' + error.message);
        }
    });

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await signOut(auth);
        });
    }

    // Form Handling
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newProduct = {
            title: document.getElementById('p-title').value,
            category: document.getElementById('p-category').value,
            price: document.getElementById('p-price').value,
            image: document.getElementById('p-image').value,
            description: document.getElementById('p-desc').value
        };

        if (!newProduct.title) return;

        try {
            await saveProduct(newProduct);
            alert('Product Added Successfully!');
            addForm.reset();
        } catch (error) {
            alert('Error adding product: ' + error.message);
        }
    });

    // Render Admin List
    window.renderAdminList = () => {
        const list = document.getElementById('admin-product-list');
        subscribeToProducts((products) => {
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
                        <button onclick="handleDelete('${product.id}')" class="text-red-500 hover:text-red-700">Delete</button>
                    </td>
                `;
                list.appendChild(row);
            });
        });
    };

    window.handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteProduct(id);
            } catch (error) {
                alert('Error deleting product: ' + error.message);
            }
        }
    };
});