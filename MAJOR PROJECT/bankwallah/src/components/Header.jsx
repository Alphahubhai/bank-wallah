import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const searchRef = useRef(null);
  const languageRef = useRef(null);
  const loginModalRef = useRef(null);

  // Mock search suggestions
  const searchSuggestions = [
    { id: 1, text: 'Health Insurance Plans', category: 'Insurance' },
    { id: 2, text: 'Term Life Insurance', category: 'Insurance' },
    { id: 3, text: 'Personal Loans', category: 'Loans' },
    { id: 4, text: 'Home Loan Calculator', category: 'Tools' },
    { id: 5, text: 'Best Cashback Credit Cards', category: 'Cards' },
    { id: 6, text: 'SBI Bank', category: 'Providers' },
    { id: 7, text: 'HDFC ERGO', category: 'Providers' },
  ];

  const languages = ['English', 'हिंदी', 'தமிழ்', 'తెలుగు', 'ಕನ್ನಡ', 'मराठी'];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (showSearchSuggestions) setShowSearchSuggestions(false);
    if (showLanguageDropdown) setShowLanguageDropdown(false);
    if (showLoginModal) setShowLoginModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      setShowSearchSuggestions(true);
    } else {
      setShowSearchSuggestions(false);
    }
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 0) {
      setShowSearchSuggestions(true);
    }
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    if (showSearchSuggestions) setShowSearchSuggestions(false);
    if (showLanguageDropdown) setShowLanguageDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchSuggestions(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
      if (loginModalRef.current && !loginModalRef.current.contains(event.target) && !event.target.classList.contains('login-button')) {
        setShowLoginModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          Bank<span>Wallah</span>
        </Link>

        <div className="search-container" ref={searchRef}>
          <input
            type="text"
            placeholder="Search plans, providers, or categories..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            className="search-input"
          />
          <button className="search-button" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          {showSearchSuggestions && (
            <div className="search-suggestions">
              {searchSuggestions
                .filter(item => 
                  item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(suggestion => (
                  <div key={suggestion.id} className="suggestion-item">
                    <span>{suggestion.text}</span>
                    <span className="suggestion-category">{suggestion.category}</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className={`nav-elements ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            </li>
            <li>
              <Link to="/insurance" className={location.pathname.includes('/insurance') ? 'active' : ''}>Insurance</Link>
            </li>
            <li>
              <Link to="/loans" className={location.pathname.includes('/loans') ? 'active' : ''}>Loans</Link>
            </li>
            <li>
              <Link to="/cards" className={location.pathname.includes('/cards') ? 'active' : ''}>Credit Cards</Link>
            </li>
            <li>
              <Link to="/invest" className={location.pathname.includes('/invest') ? 'active' : ''}>Investments</Link>
            </li>
            <li>
              <Link to="/compare" className={location.pathname === '/compare' ? 'active' : ''}>Compare</Link>
            </li>
            <li>
              <Link to="/claims" className={location.pathname === '/claims' ? 'active' : ''}>Claims</Link>
            </li>
            <li>
              <Link to="/support" className={location.pathname === '/support' ? 'active' : ''}>Support</Link>
            </li>
          </ul>
        </div>

        <div className="nav-actions">
          <div className="language-selector" ref={languageRef}>
            <button 
              className="language-button" 
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>{selectedLanguage}</span>
            </button>
            {showLanguageDropdown && (
              <div className="language-dropdown">
                {languages.map((language) => (
                  <div 
                    key={language} 
                    className={`language-option ${selectedLanguage === language ? 'selected' : ''}`}
                    onClick={() => handleLanguageSelect(language)}
                  >
                    {language}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          <Link to="/saved" className="saved-button" aria-label="Saved plans">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </Link>

          <div className="login-container" ref={loginModalRef}>
            <button className="login-button" onClick={toggleLoginModal}>Login</button>
            
            {showLoginModal && (
              <div className="login-modal">
                <div className="login-header">
                  <h3>Login / Sign Up</h3>
                  <button className="close-modal" onClick={toggleLoginModal}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <div className="login-options">
                  <button className="google-login">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M21.8,10.4h-8.5v3.3h4.8c-0.2,1.3-1.5,3.8-4.8,3.8c-2.9,0-5.3-2.4-5.3-5.3c0-3,2.4-5.3,5.3-5.3
                      c1.6,0,2.7,0.7,3.3,1.3l2.3-2.2C17.3,4.4,15.1,3,12.7,3C8.2,3,4.5,6.7,4.5,11.2c0,4.5,3.7,8.2,8.2,8.2
                      c4.7,0,7.9-3.3,7.9-8C20.6,10.8,21.8,10.4,21.8,10.4z" fill="#4285F4"/>
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                  <button className="email-login">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>Continue with Email</span>
                  </button>
                  <button className="phone-login">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>Continue with OTP</span>
                  </button>
                </div>
                <div className="login-footer">
                  <p>By continuing, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a></p>
                </div>
              </div>
            )}
          </div>

          <div className="menu-icon" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 