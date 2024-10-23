import React, { useState } from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import DetailsSection from '../components/DetailsSection/DetailsSection';
import SignInModal from '../components/SignInModal';
import SignUpModal from '../components/SignUpModal';

const HomePage = () => {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  return (
    <>
      <HeroSection
        openSignIn={() => setSignInOpen(true)}
        openSignUp={() => setSignUpOpen(true)}
      />
      <DetailsSection />

      {isSignInOpen && <SignInModal closeModal={() => setSignInOpen(false)} />}
      {isSignUpOpen && <SignUpModal closeModal={() => setSignUpOpen(false)} />}
    </>
  );
};

export default HomePage;
