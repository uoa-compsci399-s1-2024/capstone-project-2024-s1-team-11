import React, { useState } from 'react';
import Modal from 'react-modal';
import './edit_profile_styles.css';

const EditProfileModal = ({ isOpen, onClose }) => {
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [selectingAvatar, setSelectingAvatar] = useState(false);

  const handleEditUsername = () => {
    setEditingUsername(true);
    setEditingEmail(false);
    setSelectingAvatar(false);
  };

  const handleEditEmail = () => {
    setEditingUsername(false);
    setEditingEmail(true);
    setSelectingAvatar(false);
  };

  const handleSelectAvatar = () => {
    setEditingUsername(false);
    setEditingEmail(false);
    setSelectingAvatar(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Profile Modal"
      className="edit-profile-modal" 
      overlayClassName="edit-profile-modal-overlay" 
    >
      <div className="edit-profile-modal-content"> 
        <h2 className="edit-profile-modal-title">Edit Profile</h2>
        <button className="edit-profile-modal-close" onClick={onClose}>x</button>
        
        <button className="edit-profile-modal-button" onClick={handleEditUsername}>Edit Username</button>
        <button className="edit-profile-modal-button" onClick={handleEditEmail}>Edit Email</button>
        <button className="edit-profile-modal-button" onClick={handleSelectAvatar}>Select Avatar</button>

        {editingUsername && (
          <form>
            <input className="edit-profile-modal-input" type="text" placeholder="Enter new username" />
            <button className="edit-profile-modal-save-button" type="submit">Save</button>
          </form>
        )}

        {editingEmail && (
          <form>
            <input className="edit-profile-modal-input" type="email" placeholder="Enter new email" />
            <button className="edit-profile-modal-save-button" type="submit">Save</button>
          </form>
        )}

        {selectingAvatar && (
          <div className="edit-profile-modal-avatar-selection">
            <p>Select your avatar:</p>
            <button className="edit-profile-modal-avatar-button">Avatar 1</button>
            <button className="edit-profile-modal-avatar-button">Avatar 2</button>
            <button className="edit-profile-modal-avatar-button">Avatar 3</button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EditProfileModal;
