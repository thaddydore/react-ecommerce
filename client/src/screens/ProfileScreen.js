import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import Loader from '../component/Loader';
import { getUserDetails, updateUserProfile } from '../action/user';

const ProfileScreen = ({ history }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  console.log(user, userInfo)

  useEffect(() => {
    if (!userInfo) {
      history.push('/lgoin');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user]);

  const submit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) return setMessage('passwords do not match');

    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}

        <Form onSubmit={(e) => submit(e)}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder='Enter name' type='text' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control placeholder='Enter email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control placeholder='Enter password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control placeholder='Confirm password' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>


          <Button type='submit' variant='primary'>Update</Button>
        </Form>

      </Col>

      <Col md={9}><h2>My Order</h2></Col>
    </Row>
  );
};

export default ProfileScreen;
