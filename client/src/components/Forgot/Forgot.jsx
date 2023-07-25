import React, { useState, useEffect } from 'react';
// import emailjs from '@emailjs/browser';
import emailjs from 'emailjs-com';


function Forgot() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email)

    // Check if email is not empty
    if (!email.trim()) {
      console.error('Error: Email cannot be empty');
      return;
    }

    // Your emailjs configuration
    const serviceId = 'service_n7qwszk';
    const templateId = 'template_odu15c5';
    const userId = 'FSXQI4e91phNbkyNx'; // Replace with your actual user id (public key)

    const templateParams = {
      to_email: email,
    };

    try {
      console.log(templateParams)
      const response = await emailjs.send(serviceId, templateId, templateParams, userId) 
          console.log('SUCCESS!', response.status, response.text);
      console.log('Email sent:', response);
      // Add any success handling here (e.g., show a success message to the user)
    } catch (error) {
      console.error('Error sending email:', error);
      // Add any error handling here (e.g., show an error message to the user)
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
