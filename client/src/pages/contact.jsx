import Header from '../components/header';
import Footer from '../components/footer';
import TopImage from '../components/top-image';
import { useState } from 'react';
//import emailjs from 'emailjs-com';

const EMAILJS_PUBLIC_KEY = 'zyJ-DMEwPke6Q1WhF';
const TEMPLETE_ID = 'template_oy7kadr';
const SERVICE_ID = 'service_br0fx9k';
const USER_NAME = 'Math Rocks Team';


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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
    <>
      <Header />
        <main>
          <TopImage />
          <article className='side-padding'>
            <h1>Contact Us</h1>
            <p>If you want to know more about Maths Rocks, or have any questions, suggestions or comments for us, we would love to hear from you!</p>
            <form onSubmit={handleSubmit}>
              <label name="name">Your name
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </label> 
              <label name="email">Your email
                <input type="email" name="email" value={formData.email} onChange={handleChange}  />
                </label> 
              <label name="namessageme">Your message
                <textarea name="message" value={formData.message} onChange={handleChange}  ></textarea>
              </label>
              <button type="submit" className='btn'>Send Message</button>
            </form>
          </article>
        </main>
        <Footer />
    </>
  );
}
