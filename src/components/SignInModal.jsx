import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal/Modal';
import { signInUser } from '../services/api';
import { setToken } from './auth';

const SignInModal = ({ closeModal, setAppToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold error message

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInUser({ email, password }); // Call the signIn API function
      console.log(response.status);
      if (response.status === 200) {
        console.log("Sign In success:", response.data);
        setToken(response.data['token']);
        setAppToken(response.data['token']);
        localStorage.setItem('id', response.data['userId']);
        localStorage.setItem('user', response.data['user']);
        localStorage.setItem('username', response.data['user']['first_name']);
        navigate('/');
        closeModal();

      } else {
        setError(response.data);
      }
    } catch (error) {
      console.error("Sign In error:", error);
      setError("Failed to sign in. Please check your credentials and try again."); // Set error message
    }
  };

  const fields = [
    {
      label: 'Email Address',
      type: 'email',
      props: {
        value: email,
        onChange: (e) => setEmail(e.target.value),
      },
    },
    {
      label: 'Password',
      type: 'password',
      props: {
        value: password,
        onChange: (e) => setPassword(e.target.value),
      },
    },
  ];

  return (
    <Modal
      title="Sign In"
      fields={fields}
      error={error}
      handleSubmit={handleSubmit}
      closeModal={closeModal}
    />
  );
};

export default SignInModal;
