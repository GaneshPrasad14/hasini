const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 7080;

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/seed', require('./routes/seed'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Mongoose configuration
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Connected to MongoDB Atlas');
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        console.log('Server will start in "Local Mode" with mock data.');
        mongoose.set('bufferCommands', false);
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} (Local Mode)`);
        });
    }
};

connectDB();

app.get('/', (req, res) => {
    res.send('Clear Vision Studio API is running');
});

// Multer error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ msg: 'File size too large. Max limit is 100MB.' });
        }
        return res.status(400).json({ msg: err.message });
    } else if (err) {
        return res.status(500).json({ msg: err.message || err });
    }
    next();
});
