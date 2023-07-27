import React, { useState } from 'react';
import emailjs from 'emailjs-com';

function Contact() {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');

const handleNameChange = (e) => {
setName(e.target.value);
};

const handleEmailChange = (e) => {
setEmail(e.target.value);
};

const handleMessageChange = (e) => {
setMessage(e.target.value);
};

const handleSubmit = async (e) => {
e.preventDefault();

// Check if name, email, and message are not empty
if (!name.trim() || !email.trim() || !message.trim()) {
    console.error('Error: All fields are required');
    return;
}

// Your emailjs configuration
const serviceId = 'service_t4anc4h';
const templateId = 'template_a19flfm';
const userId = 'FSXQI4e91phNbkyNx'; // Replace with your actual user id (public key)

const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
};

try {
    const response = await emailjs.send(serviceId, templateId, templateParams, userId);
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
        <form onSubmit={handleSubmit}>
        <h1 className='enter'>Contact Us</h1>
        <input
            className='my-input'
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={handleNameChange}
            required
        />
        <input
            className='my-input'
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
            required
        />
        <textarea
            className='my-input'
            name='message'
            placeholder='Message'
            value={message}
            onChange={handleMessageChange}
            required
        />
        <button type='submit' className='my-button'>
            Send
        </button>
        </form>
    </div>
</div>
);
}

export default Contact;
