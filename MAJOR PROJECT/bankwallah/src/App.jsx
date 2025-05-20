import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { useTheme } from './context/ThemeContext';
import './App.css';

// Placeholder components for other routes
const InsurancePage = () => <div className="page-container"><h1>Insurance</h1><p>Explore our range of insurance products for you and your family.</p></div>;
const LoansPage = () => <div className="page-container"><h1>Loans</h1><p>Find the best loan options with competitive interest rates.</p></div>;
const CardsPage = () => <div className="page-container"><h1>Credit Cards</h1><p>Compare and apply for credit cards that match your lifestyle.</p></div>;
const InvestPage = () => <div className="page-container"><h1>Investments</h1><p>Grow your wealth with our diverse investment options.</p></div>;
const ComparePage = () => <div className="page-container"><h1>Compare Plans</h1><p>Compare different financial products side by side.</p></div>;
const ClaimsPage = () => <div className="page-container"><h1>Claims</h1><p>Track and manage your insurance claims in one place.</p></div>;
const SupportPage = () => <div className="page-container"><h1>Customer Support</h1><p>We're here to help with any questions or concerns.</p></div>;
const SavedPage = () => <div className="page-container"><h1>Saved Plans</h1><p>View and manage your saved financial plans.</p></div>;
const LoginPage = () => <div className="page-container"><h1>Login / Sign Up</h1><p>Access your account or create a new one.</p></div>;

// Insurance subcategories
const HealthInsurance = () => <div className="page-container"><h1>Health Insurance</h1><p>Protect yourself and your family with comprehensive health coverage.</p></div>;
const TermInsurance = () => <div className="page-container"><h1>Term Life Insurance</h1><p>Secure your family's future with our term life insurance plans.</p></div>;
const CarInsurance = () => <div className="page-container"><h1>Car Insurance</h1><p>Get the best protection for your vehicle with our car insurance policies.</p></div>;
const BikeInsurance = () => <div className="page-container"><h1>Bike Insurance</h1><p>Comprehensive coverage for your two-wheeler at affordable premiums.</p></div>;
const InvestmentInsurance = () => <div className="page-container"><h1>Investment Insurance Plans</h1><p>Insurance plans that also help you grow your wealth over time.</p></div>;

// Loans subcategories
const PersonalLoan = () => <div className="page-container"><h1>Personal Loans</h1><p>Quick and hassle-free personal loans for your immediate financial needs.</p></div>;
const HomeLoan = () => <div className="page-container"><h1>Home Loans</h1><p>Realize your dream of owning a home with our affordable home loan options.</p></div>;
const BusinessLoan = () => <div className="page-container"><h1>Business Loans</h1><p>Fuel your business growth with our flexible business financing solutions.</p></div>;
const EducationLoan = () => <div className="page-container"><h1>Education Loans</h1><p>Invest in your future with education loans for higher studies in India and abroad.</p></div>;

// Cards subcategories
const CashbackCards = () => <div className="page-container"><h1>Cashback Credit Cards</h1><p>Earn cashback on your everyday spending with these credit cards.</p></div>;
const TravelCards = () => <div className="page-container"><h1>Travel Credit Cards</h1><p>Enjoy travel benefits and rewards with our premium travel credit cards.</p></div>;
const RewardsCards = () => <div className="page-container"><h1>Rewards Credit Cards</h1><p>Maximize your rewards points with these feature-rich credit cards.</p></div>;

// Investment subcategories
const FixedDeposits = () => <div className="page-container"><h1>Fixed Deposits</h1><p>Secure and guaranteed returns with our fixed deposit offerings.</p></div>;
const MutualFunds = () => <div className="page-container"><h1>Mutual Funds</h1><p>Build wealth through professionally managed mutual fund portfolios.</p></div>;
const Stocks = () => <div className="page-container"><h1>Stocks</h1><p>Invest in the stock market with our expert guidance and tools.</p></div>;

function App() {
  const { theme } = useTheme();

  return (
    <Router>
      <div className="app" data-theme={theme}>
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Main pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/loans" element={<LoansPage />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="/invest" element={<InvestPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/claims" element={<ClaimsPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Insurance subcategories */}
            <Route path="/insurance/health" element={<HealthInsurance />} />
            <Route path="/insurance/term" element={<TermInsurance />} />
            <Route path="/insurance/car" element={<CarInsurance />} />
            <Route path="/insurance/bike" element={<BikeInsurance />} />
            <Route path="/insurance/investment" element={<InvestmentInsurance />} />
            
            {/* Loans subcategories */}
            <Route path="/loans/personal" element={<PersonalLoan />} />
            <Route path="/loans/home" element={<HomeLoan />} />
            <Route path="/loans/business" element={<BusinessLoan />} />
            <Route path="/loans/education" element={<EducationLoan />} />
            
            {/* Cards subcategories */}
            <Route path="/cards/cashback" element={<CashbackCards />} />
            <Route path="/cards/travel" element={<TravelCards />} />
            <Route path="/cards/rewards" element={<RewardsCards />} />
            
            {/* Investment subcategories */}
            <Route path="/invest/fd" element={<FixedDeposits />} />
            <Route path="/invest/mutual-funds" element={<MutualFunds />} />
            <Route path="/invest/stocks" element={<Stocks />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
