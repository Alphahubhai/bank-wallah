import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './HomePage.css';

// Comprehensive list of all services for search
const allServices = [
  // Insurance Products
  { id: 1, title: 'Health Insurance', type: 'insurance', icon: 'health', path: '/insurance/health' },
  { id: 2, title: 'Term Life Insurance', type: 'insurance', icon: 'term', path: '/insurance/term' },
  { id: 3, title: 'Car Insurance', type: 'insurance', icon: 'car', path: '/insurance/car' },
  { id: 4, title: 'Bike Insurance', type: 'insurance', icon: 'bike', path: '/insurance/bike' },
  { id: 5, title: 'Travel Insurance', type: 'insurance', icon: 'travel', path: '/insurance/travel' },
  { id: 6, title: 'Home Insurance', type: 'insurance', icon: 'home-insurance', path: '/insurance/home' },
  { id: 7, title: 'Critical Illness Insurance', type: 'insurance', icon: 'critical', path: '/insurance/critical-illness' },
  { id: 8, title: 'Senior Citizen Health Insurance', type: 'insurance', icon: 'senior', path: '/insurance/senior' },
  { id: 9, title: 'Group Health Insurance', type: 'insurance', icon: 'group', path: '/insurance/group' },
  { id: 10, title: 'Child Insurance Plans', type: 'insurance', icon: 'child', path: '/insurance/child' },
  
  // Loan Products
  { id: 11, title: 'Personal Loan', type: 'loan', icon: 'personal', path: '/loans/personal' },
  { id: 12, title: 'Home Loan', type: 'loan', icon: 'home', path: '/loans/home' },
  { id: 13, title: 'Business Loan', type: 'loan', icon: 'business', path: '/loans/business' },
  { id: 14, title: 'Education Loan', type: 'loan', icon: 'education', path: '/loans/education' },
  { id: 15, title: 'Car Loan', type: 'loan', icon: 'car-loan', path: '/loans/car' },
  { id: 16, title: 'Gold Loan', type: 'loan', icon: 'gold', path: '/loans/gold' },
  { id: 17, title: 'Loan Against Property', type: 'loan', icon: 'property', path: '/loans/property' },
  { id: 18, title: 'Loan Against Securities', type: 'loan', icon: 'securities', path: '/loans/securities' },
  { id: 19, title: 'Loan Against Fixed Deposit', type: 'loan', icon: 'fd', path: '/loans/fixed-deposit' },
  { id: 20, title: 'Microfinance Loan', type: 'loan', icon: 'micro', path: '/loans/microfinance' },
  
  // Credit Card Products
  { id: 21, title: 'Cashback Credit Cards', type: 'card', icon: 'cashback', path: '/cards/cashback' },
  { id: 22, title: 'Travel Credit Cards', type: 'card', icon: 'travel-card', path: '/cards/travel' },
  { id: 23, title: 'Rewards Credit Cards', type: 'card', icon: 'rewards', path: '/cards/rewards' },
  { id: 24, title: 'Fuel Credit Cards', type: 'card', icon: 'fuel', path: '/cards/fuel' },
  { id: 25, title: 'Shopping Credit Cards', type: 'card', icon: 'shopping', path: '/cards/shopping' },
  { id: 26, title: 'Business Credit Cards', type: 'card', icon: 'business-card', path: '/cards/business' },
  { id: 27, title: 'Student Credit Cards', type: 'card', icon: 'student', path: '/cards/student' },
  { id: 28, title: 'Secured Credit Cards', type: 'card', icon: 'secured', path: '/cards/secured' },
  { id: 29, title: 'Co-branded Credit Cards', type: 'card', icon: 'co-branded', path: '/cards/co-branded' },
  { id: 30, title: 'Premium Credit Cards', type: 'card', icon: 'premium', path: '/cards/premium' },
  
  // Investment Products
  { id: 31, title: 'Fixed Deposits', type: 'investment', icon: 'fixed-deposit', path: '/invest/fd' },
  { id: 32, title: 'Mutual Funds', type: 'investment', icon: 'mutual-fund', path: '/invest/mutual-funds' },
  { id: 33, title: 'Stocks', type: 'investment', icon: 'stock', path: '/invest/stocks' },
  { id: 34, title: 'Bonds', type: 'investment', icon: 'bond', path: '/invest/bonds' },
  { id: 35, title: 'Systematic Investment Plans (SIP)', type: 'investment', icon: 'sip', path: '/invest/sip' },
  { id: 36, title: 'Public Provident Fund (PPF)', type: 'investment', icon: 'ppf', path: '/invest/ppf' },
  { id: 37, title: 'National Pension System (NPS)', type: 'investment', icon: 'nps', path: '/invest/nps' },
  { id: 38, title: 'Unit Linked Insurance Plans (ULIP)', type: 'investment', icon: 'ulip', path: '/invest/ulip' },
  { id: 39, title: 'Real Estate Investment', type: 'investment', icon: 'real-estate', path: '/invest/real-estate' },
  { id: 40, title: 'Gold Investment', type: 'investment', icon: 'gold-invest', path: '/invest/gold' },
  
  // Other Financial Services
  { id: 41, title: 'Tax Planning', type: 'service', icon: 'tax', path: '/services/tax-planning' },
  { id: 42, title: 'Retirement Planning', type: 'service', icon: 'retirement', path: '/services/retirement' },
  { id: 43, title: 'Estate Planning', type: 'service', icon: 'estate', path: '/services/estate' },
  { id: 44, title: 'Financial Advisory', type: 'service', icon: 'advisory', path: '/services/advisory' },
  { id: 45, title: 'Wealth Management', type: 'service', icon: 'wealth', path: '/services/wealth' },
  { id: 46, title: 'Insurance Claims Assistance', type: 'service', icon: 'claims', path: '/claims' },
  { id: 47, title: 'Loan Refinancing', type: 'service', icon: 'refinance', path: '/services/refinance' },
  { id: 48, title: 'Debt Consolidation', type: 'service', icon: 'debt', path: '/services/debt-consolidation' },
  { id: 49, title: 'Credit Score Check', type: 'service', icon: 'credit-score', path: '/services/credit-score' },
  { id: 50, title: 'EMI Calculator', type: 'tool', icon: 'calculator', path: '/tools/emi-calculator' }
];

const HomePage = () => {
  const { translate } = useLanguage();
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter search results based on query
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query.length > 1) {
      const filteredResults = allServices.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.type.toLowerCase().includes(query)
      );
      setSearchResults(filteredResults);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchQuery]);

  // Get icon component based on service type
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'health':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        );
      case 'term':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        );
      case 'car':
      case 'car-loan':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="6" width="22" height="12" rx="2" ry="2" />
            <circle cx="6" cy="18" r="2" />
            <circle cx="18" cy="18" r="2" />
          </svg>
        );
      case 'bike':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5.5 17a2.5 2.5 0 1 0 0-5 2.5 2.5 0 1 0 0 5zM18.5 17a2.5 2.5 0 1 0 0-5 2.5 2.5 0 1 0 0 5z" />
            <path d="M15 7l-3 5.5L9 8l-5 4M11 13l3-4 2 3 5-7" />
          </svg>
        );
      case 'personal':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      case 'home':
      case 'home-insurance':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case 'cashback':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        );
      case 'fixed-deposit':
      case 'fd':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="12" y1="11" x2="12" y2="17" />
            <path d="M9 14h6" />
          </svg>
        );
      case 'mutual-fund':
      case 'stock':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        );
      // Default icon for other services
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        );
    }
  };

  const detectUserLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'en';
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="premium-title">{translate('premiumTitle')}</h1>
            <p>{translate('heroSubtitle')}</p>
            
            <div className="quick-access-tabs">
              <Link to="/insurance" className="quick-tab">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
                  <line x1="12" y1="10" x2="12" y2="16" />
                  <line x1="9" y1="13" x2="15" y2="13" />
                </svg>
                <span>{translate('insurance')}</span>
              </Link>
              <Link to="/loans" className="quick-tab">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                <span>{translate('loans')}</span>
              </Link>
              <Link to="/cards" className="quick-tab">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                <span>{translate('cards')}</span>
              </Link>
              <Link to="/invest" className="quick-tab">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                <span>{translate('investments')}</span>
              </Link>
            </div>
            
            <div className="search-bar">
              <div className="search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input 
                type="text" 
                placeholder={translate('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) {
                    setShowResults(true);
                  }
                }}
                onBlur={() => {
                  // Delay hiding to allow for clicking on results
                  setTimeout(() => setShowResults(false), 200);
                }}
              />
              {showResults && searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map(result => (
                    <Link 
                      key={result.id} 
                      to={result.path} 
                      className="search-result-item"
                      onClick={() => {
                        setShowResults(false);
                        setSearchQuery('');
                      }}
                    >
                      <div className={`result-icon ${result.icon}-icon`}>
                        {getIconComponent(result.icon)}
                      </div>
                      <div className="result-content">
                        <span className="result-title">{result.title}</span>
                        <span className="result-type">{result.type}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {showResults && searchResults.length === 0 && searchQuery.length > 1 && (
                <div className="search-results">
                  <div className="no-results">
                    <p>No results found for "{searchQuery}"</p>
                    <p>Try different keywords or browse categories</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories Section - Completely Revamped */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">{translate('categories')}</h2>
          
          <div className="categories-grid">
            {/* Insurance Category */}
            <div className="category-group">
              <h3 className="category-title">{translate('insurance')}</h3>
              <div className="category-items">
                <Link to="/insurance/health" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <span>{translate('healthInsurance')}</span>
                </Link>
                <Link to="/insurance/term" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18V5l12-2v13" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="16" r="3" />
                    </svg>
                  </div>
                  <span>{translate('termInsurance')}</span>
                </Link>
                <Link to="/insurance/car" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="6" width="22" height="12" rx="2" ry="2" />
                      <circle cx="6" cy="18" r="2" />
                      <circle cx="18" cy="18" r="2" />
                    </svg>
                  </div>
                  <span>{translate('carInsurance')}</span>
                </Link>
                <Link to="/insurance/bike" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5.5 17a2.5 2.5 0 1 0 0-5 2.5 2.5 0 1 0 0 5zM18.5 17a2.5 2.5 0 1 0 0-5 2.5 2.5 0 1 0 0 5z" />
                      <path d="M15 7l-3 5.5L9 8l-5 4M11 13l3-4 2 3 5-7" />
                    </svg>
                  </div>
                  <span>{translate('bikeInsurance')}</span>
                </Link>
              </div>
              <Link to="/insurance" className="view-all-link">
                {translate('viewAll')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            {/* Loans Category */}
            <div className="category-group">
              <h3 className="category-title">{translate('loans')}</h3>
              <div className="category-items">
                <Link to="/loans/personal" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <span>{translate('personalLoan')}</span>
                </Link>
                <Link to="/loans/home" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <span>{translate('homeLoan')}</span>
                </Link>
                <Link to="/loans/business" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <span>{translate('businessLoan')}</span>
                </Link>
                <Link to="/loans/education" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <span>{translate('educationLoan')}</span>
                </Link>
              </div>
              <Link to="/loans" className="view-all-link">
                {translate('viewAll')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            {/* Cards Category */}
            <div className="category-group">
              <h3 className="category-title">{translate('cards')}</h3>
              <div className="category-items">
                <Link to="/cards/cashback" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <span>{translate('cashbackCards')}</span>
                </Link>
                <Link to="/cards/travel" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.38 3.46L16 2L8 4L3.62 2.82a.5.5 0 0 0-.62.48v16.4a.5.5 0 0 0 .38.49L8 22l8-2l4.62 1.18a.5.5 0 0 0 .62-.48V3.94a.5.5 0 0 0-.62-.48z" />
                      <path d="M8 4v18" />
                      <path d="M16 2v18" />
                    </svg>
                  </div>
                  <span>{translate('travelCards')}</span>
                </Link>
                <Link to="/cards/rewards" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                  </div>
                  <span>{translate('rewardsCards')}</span>
                </Link>
                <Link to="/cards/fuel" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 22h12a2 2 0 0 0 2-2V7.5L12 2 3 7.5V20a2 2 0 0 0 2 2z" />
                      <path d="M14 2v6h6" />
                      <path d="M18 14v4h2v-4h-2z" />
                    </svg>
                  </div>
                  <span>Fuel Cards</span>
                </Link>
              </div>
              <Link to="/cards" className="view-all-link">
                {translate('viewAll')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            {/* Investments Category */}
            <div className="category-group">
              <h3 className="category-title">{translate('investments')}</h3>
              <div className="category-items">
                <Link to="/investments/fd" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z" />
                      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="12" y1="11" x2="12" y2="17" />
                      <path d="M9 14h6" />
                    </svg>
                  </div>
                  <span>{translate('fixedDeposits')}</span>
                </Link>
                <Link to="/investments/mutual-funds" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                  </div>
                  <span>{translate('mutualFunds')}</span>
                </Link>
                <Link to="/investments/stocks" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22V8" />
                      <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
                      <path d="M22 4L12 14 9 11 2 18" />
                    </svg>
                  </div>
                  <span>{translate('stocks')}</span>
                </Link>
                <Link to="/investments/sip" className="category-item">
                  <div className="category-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <span>SIP</span>
                </Link>
              </div>
              <Link to="/investments" className="view-all-link">
                {translate('viewAll')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Providers Section */}
      <section className="providers-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">{translate('featuredProviders')}</h2>
          <div className="providers-grid">
            <div className="provider-logo">
              <img src="https://via.placeholder.com/150x60?text=HDFC" alt="HDFC Bank" />
            </div>
            <div className="provider-logo">
              <img src="https://via.placeholder.com/150x60?text=SBI" alt="SBI" />
            </div>
            <div className="provider-logo">
              <img src="https://via.placeholder.com/150x60?text=ICICI" alt="ICICI" />
            </div>
            <div className="provider-logo">
              <img src="https://via.placeholder.com/150x60?text=Axis" alt="Axis Bank" />
            </div>
            <div className="provider-logo">
              <img src="https://via.placeholder.com/150x60?text=LIC" alt="LIC" />
            </div>
            <div className="provider-logo">
              <img src="https://via.placeholder.com/150x60?text=Bajaj" alt="Bajaj Allianz" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">{translate('whyChoose')}</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
              <h3>{translate('comparePlans')}</h3>
              <p>{translate('compareDesc')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3>{translate('buyOnline')}</h3>
              <p>{translate('buyOnlineDesc')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3>{translate('claimAssistance')}</h3>
              <p>{translate('claimAssistanceDesc')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3>{translate('bestOffers')}</h3>
              <p>{translate('bestOffersDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">{translate('testimonials')}</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">"{translate('testimonial1')}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://via.placeholder.com/50x50" alt="Customer" />
                </div>
                <div className="author-info">
                  <h4>{translate('testimonialAuthor1')}</h4>
                  <p>{translate('testimonialLocation1')}</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">"{translate('testimonial2')}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://via.placeholder.com/50x50" alt="Customer" />
                </div>
                <div className="author-info">
                  <h4>{translate('testimonialAuthor2')}</h4>
                  <p>{translate('testimonialLocation2')}</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★☆</div>
              <p className="testimonial-text">"{translate('testimonial3')}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://via.placeholder.com/50x50" alt="Customer" />
                </div>
                <div className="author-info">
                  <h4>{translate('testimonialAuthor3')}</h4>
                  <p>{translate('testimonialLocation3')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & News Section */}
      <section className="blog-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">{translate('financialTips')}</h2>
          <div className="blog-grid">
            <div className="blog-card">
              <div className="blog-image">
                <img src="https://via.placeholder.com/400x200" alt="Blog" />
              </div>
              <div className="blog-content">
                <div className="blog-category">{translate('insurance')}</div>
                <h3 className="blog-title">{translate('healthInsuranceGuide')}</h3>
                <p className="blog-excerpt">{translate('healthInsuranceGuideDesc')}</p>
                <Link to="/blog/health-insurance-guide" className="read-more">{translate('readMore')}</Link>
              </div>
            </div>
            <div className="blog-card">
              <div className="blog-image">
                <img src="https://via.placeholder.com/400x200" alt="Blog" />
              </div>
              <div className="blog-content">
                <div className="blog-category">{translate('investments')}</div>
                <h3 className="blog-title">{translate('mutualFundGuide')}</h3>
                <p className="blog-excerpt">{translate('mutualFundGuideDesc')}</p>
                <Link to="/blog/mutual-fund-guide" className="read-more">{translate('readMore')}</Link>
              </div>
            </div>
            <div className="blog-card">
              <div className="blog-image">
                <img src="https://via.placeholder.com/400x200" alt="Blog" />
              </div>
              <div className="blog-content">
                <div className="blog-category">{translate('tax')}</div>
                <h3 className="blog-title">{translate('taxBenefits')}</h3>
                <p className="blog-excerpt">{translate('taxBenefitsDesc')}</p>
                <Link to="/blog/tax-benefits" className="read-more">{translate('readMore')}</Link>
              </div>
            </div>
          </div>
          <div className="view-all-container">
            <Link to="/blog" className="view-all-button">{translate('viewAll')}</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">BankWallah</h3>
              <p>{translate('heroSubtitle')}</p>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">LinkedIn</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-title">{translate('quickLinks')}</h4>
              <ul className="footer-links">
                <li><Link to="/about">{translate('aboutUs')}</Link></li>
                <li><Link to="/careers">{translate('careers')}</Link></li>
                <li><Link to="/press">{translate('pressMedia')}</Link></li>
                <li><Link to="/partners">{translate('partnerWithUs')}</Link></li>
                <li><Link to="/sitemap">{translate('sitemap')}</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-title">{translate('products')}</h4>
              <ul className="footer-links">
                <li><Link to="/insurance">{translate('insurance')}</Link></li>
                <li><Link to="/loans">{translate('loans')}</Link></li>
                <li><Link to="/cards">{translate('cards')}</Link></li>
                <li><Link to="/invest">{translate('investments')}</Link></li>
                <li><Link to="/compare">{translate('compare')}</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-title">{translate('support')}</h4>
              <ul className="footer-links">
                <li><Link to="/contact">{translate('contactUs')}</Link></li>
                <li><Link to="/faq">{translate('faqs')}</Link></li>
                <li><Link to="/claims">{translate('claims')}</Link></li>
                <li><Link to="/support">{translate('customerSupport')}</Link></li>
                <li><Link to="/feedback">{translate('feedback')}</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-title">{translate('legal')}</h4>
              <ul className="footer-links">
                <li><Link to="/privacy">{translate('privacyPolicy')}</Link></li>
                <li><Link to="/terms">{translate('termsOfUse')}</Link></li>
                <li><Link to="/disclaimer">{translate('disclaimer')}</Link></li>
                <li><Link to="/security">{translate('security')}</Link></li>
                <li><Link to="/grievance">{translate('grievance')}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="app-download">
            <h4>{translate('appDownload')}</h4>
            <div className="app-buttons">
              <a href="#" className="app-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.6,13.3c0-0.2,0-0.4,0-0.6c0-0.2,0-0.4,0-0.6c0-0.2,0-0.5,0-0.7c0-0.1,0-0.2,0-0.3c0-0.4-0.1-0.8-0.1-1.1 l-0.1-0.1l-0.1-0.1L17,9.5L16.8,9c-0.2-0.3-0.5-0.6-0.8-0.9L15.7,8L15.3,7.9L14.9,7.6L14.4,7.4L14,7.1l-0.3-0.2 c-0.4-0.2-0.8-0.3-1.3-0.4c-0.2,0-0.5-0.1-0.7-0.1c-0.2,0-0.4,0-0.6,0c-0.1,0-0.1,0-0.2,0c-0.2,0-0.4,0-0.6,0.1 c-0.4,0.1-0.9,0.2-1.3,0.4l-0.3,0.1l-0.3,0.2L8,6.9L7.6,7.1L7.2,7.4L6.8,7.6L6.4,7.9L6.1,8L5.9,8.1C5.6,8.4,5.3,8.7,5.1,9L4.9,9.3 L4.8,9.5l-0.1,0.2l-0.1,0.2c-0.2,0.4-0.3,0.9-0.3,1.4c0,0.1,0,0.2,0,0.3c0,0.2,0,0.5,0,0.7c0,0.2,0,0.4,0,0.6c0,0.2,0,0.4,0,0.6 c0,0.2,0,0.3,0,0.5c0,0.1,0,0.2,0,0.3c0,0.2,0,0.4,0.1,0.5l0.1,0.3l0.1,0.3l0.2,0.3l0.2,0.3L5.2,17c0.1,0.1,0.2,0.2,0.3,0.3 c0.3,0.2,0.6,0.5,0.9,0.7L7,18.5c0.2,0.2,0.5,0.3,0.8,0.3c0.2,0.1,0.3,0.1,0.5,0.1c0.2,0,0.4,0,0.6,0c0.2,0,0.5-0.1,0.7-0.1 c0.3-0.1,0.5-0.2,0.8-0.3l0.3-0.1l0.3-0.1c0.2-0.1,0.4-0.2,0.6-0.3L12,18l0.3-0.1l0.3-0.1c0.3-0.1,0.5-0.2,0.8-0.3 c0.2-0.1,0.4-0.1,0.7-0.1c0.2,0,0.4,0,0.6,0c0.2,0,0.3,0,0.5,0.1c0.3,0.1,0.5,0.2,0.8,0.3l0.6,0.3l0.5,0.3l0.6,0.3 c0.3,0.2,0.6,0.5,0.9,0.7c0.1,0.1,0.2,0.2,0.3,0.3l0.1,0.1l0.2,0.3l0.2,0.3l0.1,0.3l0.1,0.3c0.1,0.2,0.1,0.4,0.1,0.5c0,0.1,0,0.2,0,0.3 c0,0.2,0,0.3,0,0.5h-3.6H14h-4H9H5.4c0-0.2,0-0.3,0-0.5c0-0.1,0-0.2,0-0.3c0-0.2,0-0.3,0.1-0.5l0.1-0.3l0.1-0.3l0.2-0.3l0.2-0.3 l0.1-0.1c0.1-0.1,0.2-0.2,0.3-0.3c0.3-0.2,0.6-0.5,0.9-0.7l0.6-0.3l0.5-0.3l0.6-0.3c0.2-0.1,0.5-0.2,0.8-0.3c0.1,0,0.3-0.1,0.5-0.1 c0.1,0,0.2,0,0.3,0h0.2h0.1c0.1,0,0.2,0,0.3,0c0.2,0,0.4,0.1,0.5,0.1c0.3,0.1,0.5,0.2,0.8,0.3l0.3,0.1l0.3,0.1l0.3,0.1l0.3,0.1 c0.2,0.1,0.4,0.2,0.6,0.3l0.3,0.1l0.3,0.1c0.3,0.1,0.5,0.2,0.8,0.3c0.2,0.1,0.5,0.1,0.7,0.1c0.2,0,0.4,0,0.6,0c0.2,0,0.3,0,0.5-0.1 c0.3-0.1,0.5-0.2,0.8-0.3l0.7-0.5c0.3-0.2,0.6-0.5,0.9-0.7c0.1-0.1,0.2-0.2,0.3-0.3l0.3-0.3l0.2-0.3l0.2-0.3l0.1-0.3l0.1-0.3 c0.1-0.2,0.1-0.4,0.1-0.5c0-0.1,0-0.2,0-0.3C17.6,13.6,17.6,13.5,17.6,13.3z" />
                </svg>
                <span>{translate('appStore')}</span>
              </a>
              <a href="#" className="app-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.5,3.5v17h17v-17H3.5z M19,19H5V5h14V19z M15.5,10.5v-3h-3v3h-3v3h3v3h3v-3h3v-3H15.5z" />
                </svg>
                <span>{translate('playStore')}</span>
              </a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2025 BankWallah. {translate('allRightsReserved')}</p>
            <p>{translate('bankWallahInsuranceWebAggregator')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 