// src/components/Forgot.js

import React, { useState } from 'react';

function Forgot() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Password reset email sent successfully
        // You can display a success message or redirect the user to a confirmation page
      } else {
        // Handle error - email not found, server error, etc.
        // You can display an error message to the user
      }
    } catch (error) {
      // Handle fetch error
    }
  };

  return (
    <div className='my-body'>
      <div className='main'>
        <div className='forgot'>
          <form onSubmit={handleSubmit}>
            <h1 className='enter'>Input your email</h1>
            <input
              className='my-input'
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={handleEmailChange}
              required
            />
            <button type='submit' className='my-button'>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
