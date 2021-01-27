import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../component/FormContainer';
import CheckoutSteps from '../component/CheckoutSteps';
import { savePaymentMethod } from '../action/cart';

const PaymentScreen = ({ history }) => {

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) { history.push('/shipping') };

  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={(e) => submit(e)}>

        <Form.Group controlId='address'>
          <Form.Label as='legend'>Select Method</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='Paypal or Credit card'
              id='Paypal'
              name='paymentMethod'
              value='Paypal'
              checked
              onClick={(e) => setPaymentMethod(e.target.value)}
            >

            </Form.Check>
          </Col>
        </Form.Group>


        <Button type='submit' variant='primary'>Continue</Button>

      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
