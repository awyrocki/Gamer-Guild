import React, { useState } from 'react';

const ForgotLink = () => {
const [userId, setUserId] = useState('');
const [newPassword, setNewPassword] = useState('');
const [message, setMessage] = useState('');

const handleUpdatePassword = async () => {
try {
    const response = await fetch(`/update/${userId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        password: newPassword,
    }),
    });

    const data = await response.json();

    setMessage(data.message);
} catch (error) {
    setMessage('Failed to update password. Please try again.');
}
};

return (
<div className='my-body'>
    <div className='main'>
    <form>
        <h2 className='enter'>Update Password by ID</h2>
        <label className='enter' htmlFor='userId'>
        User ID:
        </label>
        <input
        className='my-input'
        type='text'
        id='userId'
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        />
        <div className='main'>
        <label className='enter' htmlFor='newPassword'>
            New Password:
        </label>
        <input
            className='my-input'
            type='password'
            id='newPassword'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
        />
        <div className='main'>
            <button className='my-button' onClick={handleUpdatePassword}>
            Update Password
            </button>
        </div>
        {message && <div>{message}</div>}
        </div>
    </form>
    </div>
</div>
);
};

export default ForgotLink;
