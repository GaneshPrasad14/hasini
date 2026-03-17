const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const upload = require('../middleware/upload');

const mockProductsData = [
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

// Get all products
router.get('/', async (req, res) => {
    try {
        let products = [];
        
        // Try to fetch from DB if connected
        if (mongoose.connection.readyState === 1) {
            try {
                products = await Product.find();
                // Auto-seed if empty
                if (products.length === 0) {
                    await Product.insertMany(mockProductsData);
                    products = await Product.find();
                }
            } catch (dbErr) {
                console.error('Database query failed:', dbErr.message);
                // Fallback will happen below
            }
        }

        // If no products found or DB was down, use mock data
        if (products.length === 0) {
            console.log('Returning mock products as fallback');
            products = mockProductsData.map((p, i) => ({
                ...p,
                _id: `65f0${i}000000000000000000${i}`, // Mock MongoDB-like ID
                isMock: true
            }));
        }
        
        res.json(products);
    } catch (err) {
        console.error('CRITICAL ERROR in GET /api/products:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        let product = null;
        if (mongoose.connection.readyState === 1) {
            try {
                product = await Product.findById(req.params.id);
            } catch (e) {}
        }

        if (!product) {
            // Check mock products
            const mockIdx = mockProductsData.findIndex((p, i) => `65f0${i}000000000000000000${i}` === req.params.id);
            if (mockIdx !== -1) {
                product = { ...mockProductsData[mockIdx], _id: req.params.id };
            }
        }

        if (!product) return res.status(404).json({ msg: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add new product (Admin only)
router.post('/', auth, upload.array('images', 10), async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    try {
        console.log('Creating product...');
        console.log('Body:', req.body);
        console.log('Files count:', req.files ? req.files.length : 0);

        const productData = { ...req.body };
        
        // Convert numbers
        if (productData.price) productData.price = Number(productData.price);
        if (productData.stock) productData.stock = Number(productData.stock);

        if (req.files && req.files.length > 0) {
            const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
            productData.images = imageUrls;
            productData.image = imageUrls[0];
        }

        // Validate required fields manually for better logging
        const requiredFields = ['name', 'description', 'price', 'category', 'image'];
        const missing = requiredFields.filter(f => !productData[f]);
        if (missing.length > 0) {
            console.log('Missing fields:', missing);
            return res.status(400).json({ msg: `Missing required fields: ${missing.join(', ')}` });
        }

        const product = new Product(productData);
        await product.save();
        console.log('Product created successfully');
        res.json(product);
    } catch (err) {
        console.error('Create error:', err);
        res.status(500).json({ msg: err.message || 'Server Error' });
    }
});

// Update product (Admin only)
router.put('/:id', auth, upload.array('images', 10), async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    try {
        const updateData = { ...req.body };
        
        // Convert numbers
        if (updateData.price) updateData.price = Number(updateData.price);
        if (updateData.stock) updateData.stock = Number(updateData.stock);

        if (req.files && req.files.length > 0) {
            const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
            updateData.images = imageUrls;
            updateData.image = imageUrls[0];
        }

        console.log('Updating product:', req.params.id);
        const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        
        if (!product) {
            return res.status(404).json({ msg: 'Product not found in database. You might be trying to edit mock data.' });
        }
        
        res.json(product);
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ msg: err.message || 'Server Error' });
    }
});

// Delete product (Admin only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Product removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
