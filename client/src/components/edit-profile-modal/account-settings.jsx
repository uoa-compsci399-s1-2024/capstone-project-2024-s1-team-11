import {useState} from 'react';
import Cookies from 'js-cookie';
import API from '../../../api.js';
import './styles.css';
import {useNavigate} from "react-router-dom";


const AccountSettingsModal = ({ onClose }) => {
    const navigate = useNavigate();

    // Accessing user credentials stored in cookies.
    const user_id = Cookies.get("user_id");
    const username = Cookies.get("username");
    const signature = Cookies.get("signature");

    // States for changing email
    // User will be asked for password when changing email, for security reasons.
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');

    // States for changing password.
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRetype, setNewPasswordRetype] = useState('');

    // States for deleting account.
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    // Edit-Profile-Modal state.
    const [activeTab, setActiveTab] = useState('');

    // Error message from server's response.
    const [errorMessage, setErrorMessage] = useState({type: '', message: ''});

    // Handler for opening a modal for editing either alias, email, password, avatar.
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // Handler for submitting new email.
    const handleSubmitEmail = async () => {
        const data = {
            user_id: user_id,
            username: username,
            signature: signature,
            newEmail: newEmail,
            password: password
        };
        const response = await fetch(API + "/profile/setEmail", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (response.status === 201){
            window.location.reload();
        }else{
            setErrorMessage({
                type: 'email',
                message: (await response.json()).error
            });
        }
    }

    // Handler for submitting new password.
    const handleSubmitPassword = async () => {
        const data = {
            user_id: user_id,
            username: username,
            signature: signature,
            newEmail: newEmail,
            oldPassword: oldPassword,
            newPassword: newPassword,
            newPasswordRetype: newPasswordRetype
        };
        const response = await fetch(API + "/profile/setPassword", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (response.status === 201){
            window.location.reload();
        }else{
            setErrorMessage({
                type: 'password',
                message: (await response.json()).error
            });
        }
    }

    // Handler for submitting new password.
    const handleDeleteAccount= async () => {
        const data = {
            user_id: user_id,
            username: username,
            signature: signature,
            password: passwordConfirmation,
        };
        const response = await fetch(API + "/profile/deleteAccount", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (response.status === 201){
            Cookies.remove('username');
            Cookies.remove('user_id');
            Cookies.remove('signature');
            alert("Account has been deleted, farewell!");
            navigate("/");
        }else{
            setErrorMessage({
                type: 'password',
                message: (await response.json()).error
            });
        }
    }


    return (
        <section className='profile-modal-overlay'>
            <section className='profile-modal'>
                <h1>Edit Profile</h1>
                <button className="close-btn" onClick={onClose}>❌</button>
                <div className="tab-navigation">
                    <button
                        className={activeTab === 'email' ? 'active' : ''}
                        onClick={() => handleTabClick('email')}
                    >
                        ✏️Edit Email
                    </button>
                    <button
                        className={activeTab === 'password' ? 'active' : ''}
                        onClick={() => handleTabClick('password')}
                    >
                        🔐Change Password
                    </button>
                    <button
                        className={activeTab === 'delete' ? 'active' : ''}
                        onClick={() => handleTabClick('delete')}
                    >
                        🗑️Delete Account
                    </button>
                </div>
                <div className="tab-content">
                    {activeTab === 'email' && (
                        <form>
                            <label>New Email:</label>
                            <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
                            <label>Enter Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <button type="button" onClick={handleSubmitEmail}>Save</button>
                            {errorMessage.type==='email' && <p><span style={{color: "red"}}>{errorMessage.message}</span></p>}
                        </form>
                    )}
                    {activeTab === 'password' && (
                        <form>
                            <label>Old Password:</label>
                            <input type="password" value={oldPassword}
                                   onChange={(e) => setOldPassword(e.target.value)}/>

                            <label>New Password:</label>
                            <input type="password" value={newPassword}
                                   onChange={(e) => setNewPassword(e.target.value)}/>

                            <label>Re-enter New Password:</label>
                            <input type="password" value={newPasswordRetype}
                                   onChange={(e) => setNewPasswordRetype(e.target.value)}/>

                            <button type="button" onClick={handleSubmitPassword}>Save</button>
                            {errorMessage.type === 'password' &&
                                <p><span style={{color: "red"}}>{errorMessage.message}</span></p>}
                        </form>
                    )}
                    {activeTab === 'delete' && (
                        <form>
                            <h3>⚠️Warning!</h3>
                            <p>
                                <span style={{color: "red", fontSize: 16}}>
                                On deleting an account, all associated data will be deleted forever.<br></br>
                                    Enter your password if you wish to proceed.
                                </span>
                            </p>
                            <label>Enter password:</label>
                            <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                            <button type="button" onClick={handleDeleteAccount}>Delete Account</button>
                            {errorMessage.type==='password' && <p><span style={{color: "red"}}>{errorMessage.message}</span></p>}
                        </form>
                    )}
                </div>
            </section>
        </section>
    );
};

export default AccountSettingsModal;