import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentLanguage, languages, switchLanguage, translate } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(e.target) && 
          !e.target.closest('.language-button')) {
        setLanguageMenuOpen(false);
      }
      
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target) && 
          !e.target.closest('.mobile-menu-button')) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  // Toggle mobile menu
  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
    setLanguageMenuOpen(false);
  };
  
  // Toggle language menu
  const toggleLanguageMenu = (e) => {
    e.stopPropagation();
    setLanguageMenuOpen(!languageMenuOpen);
    setMobileMenuOpen(false);
  };
  
  // Select language
  const handleLanguageSelect = (langCode, e) => {
    e.stopPropagation();
    switchLanguage(langCode);
    setLanguageMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="bank">Bank</span>
          <span className="wallah">Wallah</span>
        </Link>
        
        {/* Mobile Menu Button */}
        <div className="mobile-menu-button" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`} ref={mobileMenuRef}>
          <Link to="/" className="nav-link">{translate('home')}</Link>
          <Link to="/insurance" className="nav-link">{translate('insurance')}</Link>
          <Link to="/loans" className="nav-link">{translate('loans')}</Link>
          <Link to="/cards" className="nav-link">{translate('cards')}</Link>
          <Link to="/invest" className="nav-link">{translate('investments')}</Link>
          <Link to="/compare" className="nav-link">{translate('compare')}</Link>
          <Link to="/claims" className="nav-link">{translate('claims')}</Link>
          <Link to="/support" className="nav-link">{translate('support')}</Link>
        </div>
        
        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Language Selector */}
          <div className="language-selector">
            <button onClick={toggleLanguageMenu} className="language-button" aria-label="Change language">
              <svg className="globe-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span className="language-name">{languages[currentLanguage].name}</span>
              <svg className={`dropdown-icon ${languageMenuOpen ? 'active' : ''}`} width="10" height="6" viewBox="0 0 10 6">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            
            {languageMenuOpen && (
              <div className="language-dropdown" ref={languageMenuRef}>
                {Object.values(languages).map((lang) => (
                  <button 
                    key={lang.code} 
                    className={`language-option ${currentLanguage === lang.code ? 'active' : ''}`}
                    onClick={(e) => handleLanguageSelect(lang.code, e)}
                  >
                    <span className="language-name">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Theme Toggle */}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          
          {/* Saved Plans */}
          <Link to="/saved" className="saved-plans" aria-label="Saved Plans">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </Link>
          
          {/* Login/Sign Up Button */}
          <Link to="/login" className="login-button">
            {translate('login')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 