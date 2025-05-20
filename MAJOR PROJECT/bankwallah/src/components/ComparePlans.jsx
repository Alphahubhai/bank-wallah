import React, { useState } from 'react';
import './ComparePlans.css';

const plans = {
  'term-insurance': [
    {
      name: "Essential Cover",
      company: "LIC",
      coverage: "₹50 Lakhs",
      premium: "₹500/month",
      features: [
        "Death Benefit",
        "Tax Benefits",
        "Low Premium",
        "No Maturity Benefit"
      ],
      rating: 4.5,
      bestFor: "Basic Protection"
    },
    {
      name: "Premium Shield",
      company: "HDFC Life",
      coverage: "₹1 Crore",
      premium: "₹1,000/month",
      features: [
        "Death Benefit",
        "Critical Illness Cover",
        "Accident Cover",
        "Tax Benefits"
      ],
      rating: 4.8,
      bestFor: "Comprehensive Coverage"
    },
    {
      name: "Elite Secure",
      company: "ICICI Prudential",
      coverage: "₹2 Crores",
      premium: "₹2,000/month",
      features: [
        "Death Benefit",
        "Critical Illness Cover",
        "Accident Cover",
        "Return of Premium"
      ],
      rating: 4.7,
      bestFor: "Premium Features"
    }
  ],
  'health-insurance': [
    {
      name: "Basic Health",
      company: "Star Health",
      coverage: "₹5 Lakhs",
      premium: "₹800/month",
      features: [
        "Hospitalization",
        "Pre & Post Care",
        "Ambulance Cover",
        "No Room Rent Limit"
      ],
      rating: 4.3,
      bestFor: "Individual Coverage"
    },
    {
      name: "Family Floater",
      company: "Max Bupa",
      coverage: "₹10 Lakhs",
      premium: "₹1,500/month",
      features: [
        "Family Coverage",
        "Maternity Benefits",
        "Critical Illness",
        "Annual Health Checkup"
      ],
      rating: 4.6,
      bestFor: "Family Protection"
    },
    {
      name: "Super Top-up",
      company: "Aditya Birla",
      coverage: "₹25 Lakhs",
      premium: "₹2,500/month",
      features: [
        "High Coverage",
        "Zero Room Rent",
        "Global Coverage",
        "Restore Benefit"
      ],
      rating: 4.9,
      bestFor: "Enhanced Protection"
    }
  ]
};

const ComparePlans = () => {
  const [selectedType, setSelectedType] = useState('term-insurance');
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [isComparing, setIsComparing] = useState(false);

  const handlePlanSelect = (plan) => {
    if (selectedPlans.includes(plan)) {
      setSelectedPlans(selectedPlans.filter(p => p !== plan));
    } else if (selectedPlans.length < 3) {
      setSelectedPlans([...selectedPlans, plan]);
    }
  };

  const startComparison = () => {
    if (selectedPlans.length >= 2) {
      setIsComparing(true);
    }
  };

  const resetComparison = () => {
    setIsComparing(false);
    setSelectedPlans([]);
  };

  return (
    <section className="compare-section">
      <div className="compare-container">
        <div className="compare-header animate-fade-in">
          <h1>Compare Insurance Plans</h1>
          <p>Select plans to compare and find the best coverage for your needs</p>
          
          <div className="insurance-type-toggle">
            <button 
              className={selectedType === 'term-insurance' ? 'active' : ''}
              onClick={() => {
                setSelectedType('term-insurance');
                resetComparison();
              }}
            >
              Term Insurance
            </button>
            <button 
              className={selectedType === 'health-insurance' ? 'active' : ''}
              onClick={() => {
                setSelectedType('health-insurance');
                resetComparison();
              }}
            >
              Health Insurance
            </button>
          </div>
        </div>

        {!isComparing ? (
          <div className="plans-grid animate-slide-in">
            {plans[selectedType].map((plan, index) => (
              <div 
                key={plan.name}
                className={`plan-card ${selectedPlans.includes(plan) ? 'selected' : ''}`}
                onClick={() => handlePlanSelect(plan)}
              >
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <span className="company">{plan.company}</span>
                </div>
                <div className="plan-price">
                  <h4>{plan.premium}</h4>
                  <span>Premium</span>
                </div>
                <div className="plan-coverage">
                  <h4>{plan.coverage}</h4>
                  <span>Coverage</span>
                </div>
                <div className="plan-rating">
                  <span className="stars">{'★'.repeat(Math.floor(plan.rating))}{'☆'.repeat(5-Math.floor(plan.rating))}</span>
                  <span className="rating-value">{plan.rating}/5</span>
                </div>
                <div className="plan-features">
                  <h4>Key Features</h4>
                  <ul>
                    {plan.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="plan-best-for">
                  <span>Best For:</span>
                  <strong>{plan.bestFor}</strong>
                </div>
                <div className="select-overlay">
                  <span>{selectedPlans.includes(plan) ? 'Selected' : 'Click to Select'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="comparison-table animate-slide-in">
            <div className="comparison-header">
              <h2>Plan Comparison</h2>
              <button className="reset-btn" onClick={resetComparison}>
                ← Back to Plans
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Features</th>
                  {selectedPlans.map(plan => (
                    <th key={plan.name}>{plan.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Company</td>
                  {selectedPlans.map(plan => (
                    <td key={plan.name}>{plan.company}</td>
                  ))}
                </tr>
                <tr>
                  <td>Premium</td>
                  {selectedPlans.map(plan => (
                    <td key={plan.name}>{plan.premium}</td>
                  ))}
                </tr>
                <tr>
                  <td>Coverage</td>
                  {selectedPlans.map(plan => (
                    <td key={plan.name}>{plan.coverage}</td>
                  ))}
                </tr>
                <tr>
                  <td>Rating</td>
                  {selectedPlans.map(plan => (
                    <td key={plan.name}>
                      <div className="table-rating">
                        <span className="stars">{'★'.repeat(Math.floor(plan.rating))}{'☆'.repeat(5-Math.floor(plan.rating))}</span>
                        <span className="rating-value">{plan.rating}/5</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Best For</td>
                  {selectedPlans.map(plan => (
                    <td key={plan.name}>{plan.bestFor}</td>
                  ))}
                </tr>
                <tr>
                  <td>Features</td>
                  {selectedPlans.map(plan => (
                    <td key={plan.name}>
                      <ul className="table-features">
                        {plan.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {!isComparing && selectedPlans.length >= 2 && (
          <button 
            className="compare-btn animate-fade-in"
            onClick={startComparison}
          >
            Compare Selected Plans
            <span className="btn-icon">→</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default ComparePlans; 