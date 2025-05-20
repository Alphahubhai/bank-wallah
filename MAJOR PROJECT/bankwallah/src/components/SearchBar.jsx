import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './SearchBar.css';

const searchCategories = {
  insurance: ['Health Insurance', 'Term Life Insurance', 'Car Insurance', 'Bike Insurance', 'Travel Insurance'],
  loans: ['Personal Loan', 'Home Loan', 'Business Loan', 'Education Loan', 'Car Loan'],
  cards: ['Rewards Credit Card', 'Travel Credit Card', 'Cashback Credit Card', 'Business Credit Card'],
  investments: ['Mutual Funds', 'Fixed Deposits', 'Stocks', 'Digital Gold', 'SIP']
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const searchRef = useRef(null);
  const { translate } = useLanguage();

  const getSuggestions = (value) => {
    const inputValue = value.toLowerCase();
    const allSuggestions = [];

    Object.entries(searchCategories).forEach(([category, items]) => {
      items.forEach(item => {
        if (item.toLowerCase().includes(inputValue)) {
          allSuggestions.push({
            category,
            item,
            icon: getCategoryIcon(category)
          });
        }
      });
    });

    return allSuggestions;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      insurance: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
          <path d="M12 12h.01" />
        </svg>
      ),
      loans: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      cards: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
      investments: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 6l-9.5 9.5-5-5L1 18" />
          <path d="M17 6h6v6" />
        </svg>
      )
    };
    return icons[category];
  };

  useEffect(() => {
    if (query.length >= 2) {
      setSuggestions(getSuggestions(query));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => {
    setIsActive(true);
    if (query.length >= 2) {
      setSuggestions(getSuggestions(query));
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.item);
    setSuggestions([]);
    setIsActive(false);
    // Handle navigation or selection here
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder={translate('search')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
        />
        {query && (
          <button
            className="clear-button"
            onClick={() => {
              setQuery('');
              setSuggestions([]);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      
      {isActive && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSelect(suggestion)}
            >
              <span className="suggestion-icon">{suggestion.icon}</span>
              <div className="suggestion-content">
                <span className="suggestion-text">{suggestion.item}</span>
                <span className="suggestion-category">{suggestion.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 