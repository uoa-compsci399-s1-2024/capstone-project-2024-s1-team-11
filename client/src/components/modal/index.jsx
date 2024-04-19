import './styles.css'
import React, { useState } from 'react';

export default function Modal({ onClose }) {
    const [modalOpen, setModalOpen] = useState(false)

    return (
      <div className="modal">
        <div>I'm a modal dialog</div>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }
  
