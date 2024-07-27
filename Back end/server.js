const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock e-commerce data URL
const BASE_URL = 'http://20.244.56.144/test/companies';

// Helper function to fetch data from the e-commerce API
const fetchProducts = async (company, category, minPrice, maxPrice, top) => {
    try {
        const response = await axios.get(`${BASE_URL}/${company}/categories/${category}/products`, {
            params: { top, minPrice, maxPrice },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Get top products by category
app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { n = 10, minPrice = 0, maxPrice = 10000, page = 1, sortBy = 'price', order = 'asc' } = req.query;
    const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
    const products = [];

    try {
        for (const company of companies) {
            const companyProducts = await fetchProducts(company, categoryname, minPrice, maxPrice, n * page);
            products.push(...companyProducts);
        }

        // Sorting
        products.sort((a, b) => {
            const valA = a[sortBy];
            const valB = b[sortBy];
            if (order === 'asc') return valA - valB;
            return valB - valA;
        });

        // Paginate
        const start = (page - 1) * n;
        const end = start + n;
        res.json(products.slice(start, end));
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get product details
app.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;
    const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];

    try {
        for (const company of companies) {
            const companyProducts = await fetchProducts(company, categoryname, 0, 100000, 1000);
            const product = companyProducts.find(p => p.productId === productid);
            if (product) {
                return res.json(product);
            }
        }
        res.status(404).json({ error: 'Product not found' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
