import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Add your form submission logic here
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <h1 className="animate-slide-in">Get in Touch</h1>
          <p className="animate-slide-in-delay-1">
            Have questions about our insurance products? Our experts are here to help you.
          </p>
          
          <div className="contact-methods animate-slide-in-delay-2">
            <div className="contact-method">
              <div className="icon">📞</div>
              <div className="details">
                <h3>Call Us</h3>
                <p>1800-123-4567</p>
                <p>Mon-Sat 9AM to 6PM</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="icon">✉️</div>
              <div className="details">
                <h3>Email Us</h3>
                <p>support@bankwallah.com</p>
                <p>24/7 Support</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="icon">💬</div>
              <div className="details">
                <h3>Live Chat</h3>
                <p>Chat with our experts</p>
                <p>24/7 Available</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container animate-slide-in-delay-3">
          <form onSubmit={handleSubmit} className={submitted ? 'submitted' : ''}>
            <div className="form-success">Message sent successfully! 🎉</div>
            
            <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
              />
              <label htmlFor="name">Your Name</label>
            </div>

            <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
              />
              <label htmlFor="email">Email Address</label>
            </div>

            <div className={`form-group ${focusedField === 'phone' ? 'focused' : ''}`}>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                required
              />
              <label htmlFor="phone">Phone Number</label>
            </div>

            <div className={`form-group ${focusedField === 'subject' ? 'focused' : ''}`}>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
                required
              />
              <label htmlFor="subject">Subject</label>
            </div>

            <div className={`form-group ${focusedField === 'message' ? 'focused' : ''}`}>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
              ></textarea>
              <label htmlFor="message">Your Message</label>
            </div>

            <button type="submit" className="submit-btn">
              <span className="btn-text">Send Message</span>
              <span className="btn-icon">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 