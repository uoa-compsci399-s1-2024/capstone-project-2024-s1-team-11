import './styles.css'
import React, { useState } from 'react';
import Hamburger from '../Hamburger';

export default function Modal({ close }) {

    return (
      <>
      <div className="modal">
      <div className="modal-container">
        <div className="modal-body">
          <span className='close' onClick={() => close()}>
            <Hamburger />
          </span>

          <section>          
            <h1>Sign in</h1>
            <form>
              <label>Username</label>
              <input type='text'></input>
              <p>Forgot username?</p>
              <label>Password</label>
              <input type='password'></input>
              <p>Forgot password?</p>
              <p>Insert captcha/I'm not a robot</p>
              <button type='submit' className='btn'>login</button>
            </form>
          </section>

          <section>
            <h2>New to Maths Rocks?</h2>
            <button  className='btn'>Create an account</button>
          </section>
        </div>
      </div>
      </div>
      </>
    );
  }
  
