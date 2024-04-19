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
          <p>Add the login form here...</p>
        </div>
      </div>
      </div>
      </>
    );
  }
  
