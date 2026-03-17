const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Admin = require('./models/Admin');

dotenv.config({ path: path.join(__dirname, '.env') });

async function checkAdmins() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        const admins = await Admin.find({});
        console.log('Admins found:', admins.map(a => a.username));
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkAdmins();
