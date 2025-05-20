import React from 'react';
import { Link } from 'react-router-dom';
import './ProductGrid.css';

const products = [
  {
    id: "term-insurance",
    title: "Term Life Insurance",
    icon: "☂️",
    banner: "Upto 15% Discount",
    description: "Protect your family's future"
  },
  {
    id: "health-insurance",
    title: "Health Insurance",
    icon: "❤️",
    banner: "FREE Home Visit",
    description: "Comprehensive health coverage"
  },
  {
    id: "investment-plans",
    title: "Investment Plans",
    icon: "📈",
    description: "Grow your wealth"
  },
  {
    id: "car-insurance",
    title: "Car Insurance",
    icon: "🚗",
    banner: "Upto 91% Discount",
    description: "Complete car protection"
  },
  {
    id: "bike-insurance",
    title: "2 Wheeler Insurance",
    icon: "🛵",
    banner: "Upto 85% Discount",
    description: "Protect your ride"
  },
  {
    id: "family-health",
    title: "Family Health Insurance",
    icon: "👨‍👩‍👧‍👦",
    banner: "Upto 25% Discount",
    description: "Cover your entire family"
  },
  {
    id: "travel-insurance",
    title: "Travel Insurance",
    icon: "✈️",
    banner: "Upto 25% Discount",
    description: "Travel worry-free"
  },
  {
    id: "women-term-insurance",
    title: "Term Insurance (Women)",
    icon: "👸",
    banner: "Upto 20% Cheaper",
    description: "Special plans for women"
  },
  {
    id: "term-return",
    title: "Term Plans with Return of Premium",
    icon: "💰",
    description: "Get your premiums back"
  },
  {
    id: "guaranteed-return",
    title: "Guaranteed Return Plans",
    icon: "🪙",
    description: "Secure your investments"
  },
  {
    id: "child-plans",
    title: "Child Savings Plans",
    icon: "🐷",
    banner: "Premium Waiver",
    description: "Secure your child's future"
  },
  {
    id: "retirement",
    title: "Retirement Plans",
    icon: "👴",
    description: "Plan for your retirement"
  },
  {
    id: "group-health",
    title: "Employee Group Health Insurance",
    icon: "👥",
    banner: "Upto 65% Discount",
    description: "Cover your employees"
  },
  {
    id: "home-insurance",
    title: "Home Insurance",
    icon: "🏠",
    banner: "Upto 25% Discount",
    description: "Protect your home"
  }
];

const ProductGrid = () => {
  return (
    <section className="product-grid-section">
      <div className="product-grid-container">
        <div className="product-grid">
          {products.map((product) => (
            <Link 
              to={`/products/${product.id}`} 
              key={product.id} 
              className="product-card"
            >
              <div className="product-icon">{product.icon}</div>
              {product.banner && (
                <div className="product-banner">{product.banner}</div>
              )}
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <span className="learn-more">Learn More →</span>
            </Link>
          ))}
        </div>
        <Link to="/products" className="view-all">View All Products</Link>
      </div>
    </section>
  );
};

export default ProductGrid; 