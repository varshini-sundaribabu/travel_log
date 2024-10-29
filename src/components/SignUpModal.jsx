import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Modal from './Modal/Modal';
import { signUpUser } from '../services/api';
import { setToken } from './auth';

const SignUpModal = ({ closeModal }) => {
  const navigate = useNavigate(); // Hook for navigation

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // State to hold error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await signUpUser({
        first_name,
        last_name,
        gender,
        email,
        password,
      });
      setToken(response.data['token']);
      setAppToken(response.data['token']);
      localStorage.setItem('id', response.data['userId']);
      localStorage.setItem('user', response.data['user']);
      localStorage.setItem('username', response.data['user']['first_name']);
      navigate('/'); 

      closeModal(); // Close the modal on successful sign-up
    } catch (error) {
      console.error("Sign Up error:", error);
      setError(error.message); // Set error message
    }
  };

  const fields = [
    {
      label: 'First Name',
      type: 'text',
      props: {
        value: first_name,
        onChange: (e) => setFirstName(e.target.value),
      },
    },
    {
      label: 'Last Name',
      type: 'text',
      props: {
        value: last_name,
        onChange: (e) => setLastName(e.target.value),
      },
    },
    {
      label: 'Email',
      type: 'email',
      props: {
        value: email,
        onChange: (e) => setEmail(e.target.value),
      },
    },
    {
      label: 'Gender',
      type: 'select',
      placeholder: 'Select Gender',
      options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
      ],
      props: {
        value: gender,
        onChange: (e) => setGender(e.target.value),
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
    {
      label: 'Confirm Password',
      type: 'password',
      props: {
        value: confirmPassword,
        onChange: (e) => setConfirmPassword(e.target.value),
      },
    },
  ];

  return (
    <Modal
      title="Sign Up"
      fields={fields}
      error={error}
      handleSubmit={handleSubmit}
      closeModal={closeModal}
    />
  );
};

export default SignUpModal;
