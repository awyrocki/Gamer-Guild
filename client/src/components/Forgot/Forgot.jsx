import React, { useState, useEffect } from 'react';
// import emailjs from '@emailjs/browser';
import emailjs from 'emailjs-com';


function Forgot() {
  const [email, setEmail] = useState('');
  setTimeout(() => localStorage.clear(), 30000)

  const handleSubmit = async () => {
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
      setTimeout(() => window.location = "http://localhost:3000/login", 500)
    } catch (error) {
      console.error('Error sending email:', error);
      // Add any error handling here (e.g., show an error message to the user)
    }
  };

  return (
    <div className='my-body'>
      <div className='main'>
        <div className='forgot'>
          <form type="/">
            <h1 className='enter'>Input your email</h1>
            <input
              className='my-input'
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button className='my-button' onClick={e => {
              e.preventDefault();
              handleSubmit()
            }}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
