import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    console.log('Contact form submitted:', { name, email, company });
    setSubmitted(true);
    setEmail('');
    setName('');
    setCompany('');
  };

  return (
    <div className="App">
      <div className="hero-section">
        <div className="container">
          <div className="logo">
            <h1>FreightIQ</h1>
            <p className="tagline">Intelligent Freight Management</p>
          </div>
          
          <div className="main-content">
            <h2>Coming Soon</h2>
            <p className="description">
              Revolutionizing freight management with AI-powered insights, 
              real-time tracking, and intelligent cost optimization. 
              The future of logistics is here.
            </p>
            
            <div className="features">
              <div className="feature">
                <span className="feature-icon">🚢</span>
                <h3>ImportIQ</h3>
                <p>Smart landed cost calculation</p>
              </div>
              <div className="feature">
                <span className="feature-icon">📦</span>
                <h3>ExportIQ</h3>
                <p>Container load optimization</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <h3>DeliveryIQ</h3>
                <p>Route optimization & tracking</p>
              </div>
              <div className="feature">
                <span className="feature-icon">📊</span>
                <h3>ForecastIQ</h3>
                <p>Demand forecasting & analytics</p>
              </div>
            </div>

            {!submitted ? (
              <div className="contact-form">
                <h3>Get Early Access</h3>
                <p>Be the first to know when we launch</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="cta-button">
                    Get Notified
                  </button>
                </form>
              </div>
            ) : (
              <div className="success-message">
                <h3>🎉 Thank You!</h3>
                <p>We'll notify you as soon as FreightIQ launches.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="cta-button secondary"
                >
                  Add Another Contact
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 FreightIQ. All rights reserved.</p>
          <div className="footer-links">
            <a href="mailto:hello@freightiq.online">hello@freightiq.online</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
