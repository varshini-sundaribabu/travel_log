import React from 'react';
import './Button.scss';

const Button = ({ text, onClickHandler }) => {
  return <button className="custom-button" onClick={onClickHandler}>{text}</button>;
};

export default Button;
