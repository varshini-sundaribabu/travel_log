import React, { useState } from 'react';
import Modal from './Modal/Modal';

const SignUpModal = ({ closeModal }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up with", { firstName, lastName, dob, gender, password, confirmPassword });
    closeModal();
  };

  const fields = [
    {
      label: 'First Name',
      type: 'text',
      props: {
        value: firstName,
        onChange: (e) => setFirstName(e.target.value),
      },
    },
    {
      label: 'Last Name',
      type: 'text',
      props: {
        value: lastName,
        onChange: (e) => setLastName(e.target.value),
      },
    },
    {
      label: 'Date of Birth',
      type: 'date',
      props: {
        value: dob,
        onChange: (e) => setDob(e.target.value),
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

  return <Modal title="Sign Up" fields={fields} handleSubmit={handleSubmit} closeModal={closeModal} />;
};

export default SignUpModal;
