import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Modal from './Modal/Modal';

const SignInModal = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In with", { email, password });
    navigate('/diaries'); // Redirect to Diary List page
    closeModal();
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

  return <Modal title="Sign In" fields={fields} handleSubmit={handleSubmit} closeModal={closeModal} />;
};

export default SignInModal;
