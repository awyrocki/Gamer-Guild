import React from 'react'

function Forgot() {
  return (
    <div className='my-body'>
    <div className='main'>
      <input type="checkbox" id="chk" aria-hidden="true" />
    <div className='forgot'>
        <form>
            <h1 className='enter'>Input your email</h1>
            <input className='my-input' type="email" name="email" placeholder="Email" required="" />
            <button className='my-button'>Send</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Forgot