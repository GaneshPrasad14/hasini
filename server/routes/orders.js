const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

// Place order
router.post('/', auth, async (req, res) => {
    try {
        const { items, totalAmount, address } = req.body;
        const newOrder = new Order({
            user: req.user.id,
            items,
            totalAmount,
            address
        });
        const order = await newOrder.save();
        
        // Send Email
        try {
            const user = await User.findById(req.user.id);
            await sendEmail({
                email: user.email,
                subject: 'Order Confirmation - Clear Vision Studio',
                message: `Thank you for your order! Your order ID is ${order._id}. Total amount: ₹${totalAmount}`
            });
        } catch (emailErr) {
            console.error('Email could not be sent', emailErr);
        }

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get logged in user's orders
router.get('/myorders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.product');
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all orders (Admin only)
router.get('/all', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    try {
        const orders = await Order.find().populate('user', 'name email').populate('items.product');
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update order status (Admin only)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' });
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get admin stats
router.get('/stats', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    try {
        const totalOrders = await Order.countDocuments();
        const orders = await Order.find();
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
        const pendingOrders = await Order.countDocuments({ status: 'pending' });
        
        res.json({
            totalOrders,
            totalRevenue,
            pendingOrders
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
