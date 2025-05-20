import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero section-padding">
      <div className="container">
        <div className="hero-content animate-fade-in">
          <h1 className="hero-title">
            Secure Your Future with
            <span className="text-gradient"> BankWallah</span>
          </h1>
          <p className="hero-subtitle">
            Compare, choose, and apply for the best insurance plans tailored to your needs.
            Get instant quotes and expert advice.
          </p>
          <div className="hero-cta">
            <Link to="/compare-plans" className="btn btn-primary">
              Compare Plans
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Talk to Expert
            </Link>
          </div>
          
          <div className="hero-stats animate-slide-in">
            <div className="stat-item">
              <h3>10M+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Insurance Partners</p>
            </div>
            <div className="stat-item">
              <h3>₹500Cr+</h3>
              <p>Claims Settled</p>
            </div>
          </div>
        </div>

        <div className="hero-features animate-scale-in">
          <div className="feature">
            <div className="feature-icon">🛡️</div>
            <h3>Comprehensive Coverage</h3>
            <p>Get complete protection for you and your family</p>
          </div>
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <h3>Instant Policy</h3>
            <p>Get insured in minutes, not days</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Compare and get the best rates</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🤝</div>
            <h3>Expert Support</h3>
            <p>24/7 assistance for all your needs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 