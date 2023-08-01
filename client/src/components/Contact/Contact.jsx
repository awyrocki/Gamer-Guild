import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css'

function Contact() {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');

const handleSubmit = async () => {


// Check if name, email, and message are not empty
if (!name.trim() || !email.trim() || !message.trim()) {
    console.error('Error: All fields are required');
    return;
}

// Your emailjs configuration
const serviceId = 'service_t4anc4h';
const templateId = 'template_a19flfm';
const userId = 'FSXQI4e91phNbkyNx'; 

const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
};

try {
    const response = await emailjs.send(serviceId, templateId, templateParams, userId);
    console.log('SUCCESS!', response.status, response.text);
    console.log('Email sent:', response);
    setTimeout(() => window.location = "http://localhost:3000/", 500)
} catch (error) {
    console.error('Error sending email:', error);
    
}
};

return (
<div className='mybody'>
    <div className='my-main'>
        <form onSubmit={handleSubmit}>
        <h1 className='my-enter'>Contact Us</h1>
        <input
            className='myinput'
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={e => {setName(e.target.value)}}
            required
        />
        <input
            className='myinput'
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={e => {setEmail(e.target.value)}}
            required
        />
        <textarea
            className='myinput'
            name='message'
            placeholder='Message'
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
        />
        <button  className='mybutton' onClick={e => {
            e.preventDefault();
            handleSubmit()
        }}>
            Send
        </button>
        </form>
    </div>
</div>
);
}

export default Contact;
