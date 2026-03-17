const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('./models/Product');

dotenv.config({ path: path.join(__dirname, '.env') });

const mockProducts = [
    {
        name: "Burberry Aviator-Inspired", 
        price: 2500, 
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
        rating: 5.0, 
        reviews: 1, 
        category: "men", 
        frameType: "full-rim", 
        shape: "aviator",
        color: "Gold/Black", 
        description: "Luxurious Burberry aviator-inspired frames from the 88144 collection. Featuring a sophisticated gold and black design for a premium look.",
        colors: ["Gold/Black"],
        stock: 15
    },
    {
        name: "Fastrack Cold Glaze", 
        price: 2000, 
        image: "https://images.unsplash.com/photo-1511499767350-a1590fdb2ca1?q=80&w=800&auto=format&fit=crop",
        rating: 4.9, 
        reviews: 10, 
        category: "men", 
        frameType: "full-rim", 
        shape: "rectangular",
        color: "Navy Blue", 
        description: "Bold Design 2024 Collection from Fastrack. 'Cold Glaze' series featuring a modern rectangular silhouette in navy blue for a sharp, professional appearance.",
        colors: ["Navy Blue"],
        stock: 20
    },
    {
        name: "Ray-Ban Classic Optical", 
        price: 1700, 
        image: "https://images.unsplash.com/photo-1625591331159-f219f7fc9260?q=80&w=800&auto=format&fit=crop",
        rating: 4.8, 
        reviews: 5, 
        category: "men", 
        frameType: "full-rim", 
        shape: "rectangular",
        color: "Matte Blue", 
        description: "Ray-Ban RB6002 Classic Optical. Timeless rectangular silhouette in matte blue with gold accents, combining iconic style with modern optical clarity.",
        colors: ["Matte Blue"],
        stock: 12
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        await Product.deleteMany({}); // Optional: comment out if you want to keep existing
        await Product.insertMany(mockProducts);
        
        console.log('Seeded successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
