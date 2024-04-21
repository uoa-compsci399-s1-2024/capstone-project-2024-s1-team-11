import Header from '../components/header';
import Footer from '../components/footer';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import mathsRocksLogo from '/maths-rocks-logo.svg';
import useScreenSize from '../useScreenSize';

const EMAILJS_PUBLIC_KEY = 'zyJ-DMEwPke6Q1WhF';
const TEMPLETE_ID = 'template_oy7kadr';
const SERVICE_ID = 'service_br0fx9k';
const USER_NAME = 'Math Rocks Team';

const bgStyle = {
  width: '100%',
  height: '100vh',
  backgroundColor: '#06c49e',
  overflow: 'hidden'
}

const formContainerStyle = {
  width: '60vw',
  padding: '20px',
  border: '1px solid #000',
  margin: 'auto',
  marginTop: '120px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  position: 'relative',
  borderRadius: '12px',
  zIndex: 1
}

const bgImgStyle = {
  width: '100%',
  position: 'absolute',
  zIndex: 0,
  top: 0,
  left: 0,
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const inputStyle = {
  width: '80%',
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #d9d9d9',
  borderRadius: '2px',
  outline: 'none',
  transition: 'border-color 0.3s',
  marginTop: '15px'
}

const btnStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '6px',
  backgroundColor: '#1890ff',
  color: '#fff',
  cursor: 'pointer',
  outline: 'none',
  transition: 'background-color 0.3s',
  marginTop: '15px'
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { isMobile } = useScreenSize();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Send email using EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    emailjs.send(SERVICE_ID, TEMPLETE_ID, {
      to_name: USER_NAME,
      from_name: formData.name,
      message: formData.message,
      reply_to: formData.email
    })
      .then(result => {
        console.log('Email sent successfully', result.text);
        alert('Send email successfully');
      }, error => {
        console.error('Email sending failed', error.text);
      });
    // Clear form fields
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={bgStyle}>
      <Header />
      <img src={mathsRocksLogo} alt="" style={bgImgStyle} />
        <main style={{
          ...formContainerStyle,
          width: `${isMobile ? '90vw' : '60vw'}`,
          // padding: `${isMobile ? '80px' : '20px'}`
        }}>
          <h1>Contact Us</h1>
          <form onSubmit={handleSubmit} style={{
            ...formStyle,
            gap: `${isMobile ? '30px' : '0'}`
          }}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" style={inputStyle}/>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" style={inputStyle} />
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" style={inputStyle} ></textarea>
            <button type="submit" style={{...btnStyle, width: `${isMobile ? '80%' : 'auto'}`}}>Send Message</button>
          </form>
        </main>
        <Footer />
    </div>
  );
}
