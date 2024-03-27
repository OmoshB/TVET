const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Define a schema and model for your database
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Product = mongoose.model('Product', productSchema);

// API endpoint to fetch products from the database
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Define schema and model for locations
const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true }
});

const Location = mongoose.model('Location', locationSchema);

// Define schema and model for departments
const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' }
});

const Department = mongoose.model('Department', departmentSchema);

// Define schema and model for orders
const orderSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  date: { type: Date, required: true },
  total_price: { type: Number, required: true }
});

const Order = mongoose.model('Order', orderSchema);

// Define schema and model for order items
const orderItemSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

// Define schema and model for customers
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Customer = mongoose.model('Customer', customerSchema);

// Define schema and model for staff
const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Staff = mongoose.model('Staff', staffSchema);

// Define schema and model for guests
const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const Guest = mongoose.model('Guest', guestSchema);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
