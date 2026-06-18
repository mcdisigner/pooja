import { db } from './firebase-config.js';
import { collection, getDocs, addDoc, query, limit } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const initialProducts = [
    {
        title: "Classic Royal Wedding Cake",
        category: "wedding",
        price: "15000",
        image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Three-tier elegant vanilla cake with floral decorations."
    },
    {
        title: "Chocolate Truffle Dream",
        category: "birthday",
        price: "4500",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Rich dark chocolate layers with truffle frosting."
    },
    {
        title: "Pink Rose Fantasy",
        category: "birthday",
        price: "5500",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Strawberry flavored cake with rose petal designs."
    },
    {
        title: "Custom Character Cake",
        category: "custom",
        price: "6000",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Customizable cartoon character cake for kids."
    },
    {
        title: "Gold Leaf Opera",
        category: "wedding",
        price: "18000",
        image: "https://images.unsplash.com/photo-1626803775151-61d756612fcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Luxurious almond sponge cake with coffee buttercream and gold leaf."
    },
    {
        title: "Berry Bliss Cheesecake",
        category: "birthday",
        price: "4800",
        image: "https://images.unsplash.com/photo-1567327613485-fbc7bf196198?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "New York style cheesecake topped with fresh mixed berries."
    }
];

async function seedDatabase() {
    try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(query(productsRef, limit(1)));
        
        if (snapshot.empty) {
            console.log('Seeding initial products...');
            for (const product of initialProducts) {
                await addDoc(productsRef, {
                    ...product,
                    createdAt: new Date().toISOString()
                });
            }
            console.log('Database seeded successfully!');
        } else {
            console.log('Database already has products, skipping seed.');
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase();