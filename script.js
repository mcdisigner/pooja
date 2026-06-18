import { db } from './firebase-config.js';
import { collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const PRODUCTS_COLLECTION = 'products';

export const loadProducts = async () => {
    const snapshot = await getDocs(query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc')));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const saveProduct = async (product) => {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
        ...product,
        createdAt: new Date().toISOString()
    });
    return docRef.id;
};

export const deleteProduct = async (id) => {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
};

export const formatPrice = (price) => {
    return 'LKR ' + parseInt(price).toLocaleString();
};

export const subscribeToProducts = (callback) => {
    return onSnapshot(query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc')), (snapshot) => {
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(products);
    });
};