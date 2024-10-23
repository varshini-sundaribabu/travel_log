import React from 'react';
import Button from './../Button/Button';
import './HeroSection.scss';

const HeroSection = ({ openSignIn, openSignUp }) => {
  return (
    <section className="hero-section">
      <h1>Welcome to Travelogue</h1>
      <p>Create your personal travel journal and explore new places!</p>
      <div className="hero-buttons">
        <Button text="Get Started" onClickHandler={openSignUp} />
        <Button text="Sign In" onClickHandler={openSignIn} />
      </div>
    </section>
  );
};

export default HeroSection;
