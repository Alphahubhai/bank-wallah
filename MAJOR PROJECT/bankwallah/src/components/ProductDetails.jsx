import React, { useState } from 'react';
import './ProductDetails.css';

const ProductDetails = ({ productType = 'term-insurance' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const productData = {
    'term-insurance': {
      title: "Term Life Insurance",
      tagline: "Secure your family's future with comprehensive coverage",
      overview: {
        description: "Term insurance is a pure life insurance product that provides financial protection to your family in case of your untimely demise during the policy term.",
        features: [
          "High Coverage at Affordable Premiums",
          "Tax Benefits under Section 80C",
          "Option to Add Riders",
          "Death Benefit Payout Options"
        ],
        benefits: [
          {
            title: "Large Coverage Amount",
            description: "Get coverage up to ₹1 Crore at premiums starting ₹500/month"
          },
          {
            title: "Multiple Payout Options",
            description: "Choose between lump sum, monthly income, or increasing income"
          },
          {
            title: "Additional Riders",
            description: "Enhance protection with critical illness, accidental death benefit riders"
          }
        ]
      },
      eligibility: {
        age: "18-65 years",
        term: "5-40 years",
        minCover: "₹25 Lakhs",
        maxCover: "No Limit",
        requirements: [
          "Age Proof",
          "Identity Proof",
          "Address Proof",
          "Income Proof",
          "Medical Tests (as applicable)"
        ]
      }
    }
  };

  const product = productData[productType];

  return (
    <div className="product-details">
      <div className="product-hero">
        <div className="container">
          <h1>{product.title}</h1>
          <p className="tagline">{product.tagline}</p>
          <div className="cta-group">
            <button className="cta-primary">Get Quote</button>
            <button className="cta-secondary">Compare Plans</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'eligibility' ? 'active' : ''}`}
            onClick={() => setActiveTab('eligibility')}
          >
            Eligibility
          </button>
          <button 
            className={`tab ${activeTab === 'claims' ? 'active' : ''}`}
            onClick={() => setActiveTab('claims')}
          >
            Claims Process
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview">
              <p className="description">{product.overview.description}</p>
              
              <div className="features-section">
                <h2>Key Features</h2>
                <ul className="features-list">
                  {product.overview.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="benefits-section">
                <h2>Benefits</h2>
                <div className="benefits-grid">
                  {product.overview.benefits.map((benefit, index) => (
                    <div key={index} className="benefit-card">
                      <h3>{benefit.title}</h3>
                      <p>{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="eligibility">
              <div className="eligibility-grid">
                <div className="eligibility-item">
                  <h3>Age</h3>
                  <p>{product.eligibility.age}</p>
                </div>
                <div className="eligibility-item">
                  <h3>Policy Term</h3>
                  <p>{product.eligibility.term}</p>
                </div>
                <div className="eligibility-item">
                  <h3>Minimum Cover</h3>
                  <p>{product.eligibility.minCover}</p>
                </div>
                <div className="eligibility-item">
                  <h3>Maximum Cover</h3>
                  <p>{product.eligibility.maxCover}</p>
                </div>
              </div>

              <div className="requirements-section">
                <h2>Required Documents</h2>
                <ul className="requirements-list">
                  {product.eligibility.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'claims' && (
            <div className="claims">
              <div className="claims-process">
                <h2>Claims Process</h2>
                <div className="steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <h3>Intimate Claim</h3>
                    <p>Notify us about the claim through our website, email, or call</p>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <h3>Submit Documents</h3>
                    <p>Submit all required documents for claim processing</p>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <h3>Verification</h3>
                    <p>Our team verifies the submitted documents</p>
                  </div>
                  <div className="step">
                    <div className="step-number">4</div>
                    <h3>Settlement</h3>
                    <p>Claim amount is transferred to the nominee's account</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 