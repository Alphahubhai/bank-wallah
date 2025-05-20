import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Categories.css';

export default function Categories() {
  const { translate } = useLanguage();

  const categories = [
    {
      id: 'insurance',
      title: translate('insurance'),
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="M12 22v-6" />
          <path d="M12 8v6" />
          <path d="M9 11h6" />
        </svg>
      ),
      items: [
        { name: 'Health Insurance', path: '/insurance/health', color: '#2196F3' },
        { name: 'Term Life', path: '/insurance/term', color: '#4CAF50' },
        { name: 'Car Insurance', path: '/insurance/car', color: '#FFC107' },
        { name: 'Bike Insurance', path: '/insurance/bike', color: '#FF5722' },
        { name: 'Travel Insurance', path: '/insurance/travel', color: '#9C27B0' }
      ]
    },
    {
      id: 'loans',
      title: translate('loans'),
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      items: [
        { name: 'Personal Loan', path: '/loans/personal', color: '#E91E63' },
        { name: 'Home Loan', path: '/loans/home', color: '#3F51B5' },
        { name: 'Business Loan', path: '/loans/business', color: '#009688' },
        { name: 'Education Loan', path: '/loans/education', color: '#FF9800' }
      ]
    },
    {
      id: 'cards',
      title: translate('cards'),
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
      items: [
        { name: 'Rewards Cards', path: '/cards/rewards', color: '#F44336' },
        { name: 'Travel Cards', path: '/cards/travel', color: '#2196F3' },
        { name: 'Cashback Cards', path: '/cards/cashback', color: '#4CAF50' },
        { name: 'Business Cards', path: '/cards/business', color: '#FF9800' }
      ]
    },
    {
      id: 'investments',
      title: translate('investments'),
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 6l-9.5 9.5-5-5L1 18" />
          <path d="M17 6h6v6" />
        </svg>
      ),
      items: [
        { name: 'Mutual Funds', path: '/invest/mutual-funds', color: '#673AB7' },
        { name: 'Fixed Deposits', path: '/invest/fd', color: '#00BCD4' },
        { name: 'Stocks', path: '/invest/stocks', color: '#795548' },
        { name: 'Digital Gold', path: '/invest/gold', color: '#FFC107' }
      ]
    }
  ];

  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="section-title">{translate('categories')}</h2>
        
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-title">{category.title}</h3>
              </div>
              
              <div className="category-items">
                {category.items.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="category-item"
                    style={{'--item-color': item.color}}
                  >
                    <span className="item-dot"></span>
                    <span className="item-name">{item.name}</span>
                    <svg className="item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                ))}
              </div>
              
              <Link to={`/${category.id}`} className="view-all-link">
                View All
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 