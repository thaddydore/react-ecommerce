import React, { useState, useEffect } from 'react';
import { Row, Col, } from 'react-bootstrap';
import axios from 'axios';

import Product from '../component/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    })()
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row >
        {products.map(product => (
          <Col sm='12' md='6' lg='4' xl='3' key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
