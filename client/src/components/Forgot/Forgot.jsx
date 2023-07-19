import React from 'react'

function Forgot() {
  return (
    <div className='main'>
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className='forgot'>
            <form>
                <h1 className='enter'>Input your email</h1>
                <input type="email" name="email" placeholder="Email" required="" />
                <button>Login</button>
            </form>

        </div>

    </div>
  )
}

export default Forgot