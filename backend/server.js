import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import products from './data/products.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res, next) => {
	res.send('API is running...');
});

app.get('/api/products', (req, res, next) => {
	res.json(products);
});

app.get('/api/products/:id', (req, res, next) => {
	const product = products.find((p) => p._id === req.params.id);
	res.json(product);
});

const PORT = process.env.PORT || 8080;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
