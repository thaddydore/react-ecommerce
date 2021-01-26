import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../component/FormContainer';
import CheckoutSteps from '../component/CheckoutSteps';
import { saveShippingAddress } from '../action/cart';

const ShippingScreen = ({ history }) => {

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={(e) => submit(e)}>

        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder='Enter Address' type='text' value={address} required onChange={(e) => setAddress(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control placeholder='Enter city' type='text' value={city} required onChange={(e) => setCity(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control placeholder='Enter postal code' type='text' value={postalCode} required onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control placeholder='Enter country' type='text' value={country} required onChange={(e) => setCountry(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Continue</Button>

      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
