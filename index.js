const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load environment variables from a .env file if it exists
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routes
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const itemRoutes = require('./routes/itemRoutes');
const orderChalanRoutes = require('./routes/orderRoutes');
const billRoutes = require('./routes/billRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const upload = require("./middleware/multer");

app.use('/uploads', express.static('public/images'));

app.use('/users', userRoutes);
app.use('/customers', customerRoutes);
app.use('/items', itemRoutes);
app.use('/orders', orderChalanRoutes);
app.use('/bills', billRoutes);
app.use('/payments', paymentRoutes);
app.use('/vendors', vendorRoutes);

app.post('/upload', upload.single('image'), (req, res) => {
    console.log('here',req.files)
    if (req.file) {
        res.status(200).json({
            message: 'Image uploaded successfully!',
            url: `/uploads/${req.file.filename}`
        });
    } else {
        console.log('Failed to upload image')
        res.status(400).json({
            message: 'Failed to upload image'
        });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the backend!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
