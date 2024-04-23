import './styles.css'
import React, { useState } from 'react';
import Hamburger from '../Hamburger';
import RegisterForm from './registerForm';
import LoginForm from './loginForm';

export default function Modal({ close, formState, formFunction }) {

    return (
      <>
      <div className="modal">
      <div className="modal-container">
        <div className="modal-body">
          <span className='close' onClick={() => close()}>
            <Hamburger />
          </span>
          {formState ? 
          <LoginForm formFunction={formFunction} /> :
          <RegisterForm formFunction={formFunction} /> }
        </div>
      </div>
      </div>
      </>
    );
  }
  
