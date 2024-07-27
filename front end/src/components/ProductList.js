import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    // Removing unused state variables
    // const [category, setCategory] = useState('Laptop'); // Unused
    // const [n, setN] = useState(10); // Unused
    // const [page, setPage] = useState(1); // Unused

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch products with default values or from props, if needed
                const response = await axios.get('http://localhost:5000/products'); // Adjust endpoint as needed
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Top Products
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.productId}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={product.productName}
                                height="140"
                                image={`https://via.placeholder.com/150?text=${product.productName}`}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {product.productName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${product.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Rating: {product.rating}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Discount: {product.discount}%
                                </Typography>
                                <Button component={Link} to={`/products/${product.productId}`} variant="contained" color="primary">
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductList;
