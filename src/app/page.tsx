import React from 'react';
import Image from 'next/image';

const SignIn: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Welcome to Our App</h1>
      <p>Please explore our features or sign in using the navbar.</p>
      <Image
        src='/logo.jpg'
        alt='Logo'
        width={300} 
        height={300} 
      />
    </div>
  );
};

export default SignIn;
