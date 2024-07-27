import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/categories/Laptop/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProduct();
    }, [productId]);

    if (!product) return <p>Loading...</p>;

    return (
        <Container>
            <Card>
                <CardMedia
                    component="img"
                    alt={product.productName}
                    height="140"
                    image={`https://via.placeholder.com/150?text=${product.productName}`}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {product.productName}
                    </Typography>
                    <Typography variant="body1">
                        Price: ${product.price}
                    </Typography>
                    <Typography variant="body1">
                        Rating: {product.rating}
                    </Typography>
                    <Typography variant="body1">
                        Discount: {product.discount}%
                    </Typography>
                    <Typography variant="body1">
                        Availability: {product.availability}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductDetails;
