import React from 'react'
import "./styles/AdminLogin.css"

export default function AdminLogin() {
  return (
    <div className='admin-login'>
      <div className="login-form">
          <form>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your Email" required />

            <label htmlFor="password">Password:</label>
            <input type="password" id='password' placeholder='Enter your Password'/>

            <button type="submit" className="submit-btn">Login</button>
          </form>
        </div>
    </div>
  )
}
