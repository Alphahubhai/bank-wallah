import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages with simplified names and proper font families
const languages = {
  en: {
    name: 'English',
    code: 'en',
    fontFamily: 'var(--font-primary)'
  },
  hi: {
    name: 'हिंदी',
    code: 'hi',
    fontFamily: 'var(--font-hindi)'
  },
  bn: {
    name: 'বাংলা',
    code: 'bn',
    fontFamily: 'var(--font-bengali)'
  },
  te: {
    name: 'తెలుగు',
    code: 'te',
    fontFamily: 'var(--font-telugu)'
  },
  ta: {
    name: 'தமிழ்',
    code: 'ta',
    fontFamily: 'var(--font-tamil)'
  }
};

// Create the context
export const LanguageContext = createContext();

// Create translations object
const translations = {
  en: {
    // Navigation
    home: 'Home',
    insurance: 'Insurance',
    loans: 'Loans',
    cards: 'Credit Cards',
    investments: 'Investments',
    compare: 'Compare',
    claims: 'Claims',
    support: 'Support',
    login: 'Login',
    signUp: 'Sign Up',
    savedPlans: 'Saved Plans',
    
    // Home Page
    heroTitle: 'Find the Best Financial Plans in One Place',
    heroSubtitle: 'Compare, Buy, and Manage Insurance, Loans, and Investments',
    search: 'Search by name, provider, coverage, or type...',
    categories: 'Top Categories',
    featuredProviders: 'Featured Providers',
    whyChoose: 'Why Choose BankWallah',
    testimonials: 'What Our Customers Say',
    financialTips: 'Financial Tips & News',
    viewAll: 'View All Articles',
    
    // Insurance Types
    healthInsurance: 'Health Insurance',
    termInsurance: 'Term Life Insurance',
    carInsurance: 'Car Insurance',
    bikeInsurance: 'Bike Insurance',
    travelInsurance: 'Travel Insurance',
    investmentInsurance: 'Investment Plans',
    
    // Loan Types
    personalLoan: 'Personal Loan',
    homeLoan: 'Home Loan',
    businessLoan: 'Business Loan',
    educationLoan: 'Education Loan',
    
    // Card Types
    cashbackCards: 'Cashback Cards',
    travelCards: 'Travel Cards',
    rewardsCards: 'Rewards Cards',
    
    // Investment Types
    fixedDeposits: 'Fixed Deposits',
    mutualFunds: 'Mutual Funds',
    stocks: 'Stocks',
    
    // Benefits
    comparePlans: 'Compare Plans',
    compareDesc: 'Compare hundreds of plans side by side to find the best option for your needs.',
    buyOnline: 'Buy Online Instantly',
    buyDesc: 'Purchase policies, apply for loans, and get instant approvals without paperwork.',
    claimAssistance: '24/7 Claim Assistance',
    claimDesc: 'Our dedicated support team helps you navigate the claims process anytime, anywhere.',
    bestOffers: 'Best Offers & Discounts',
    offersDesc: 'Exclusive deals and discounts you won\'t find anywhere else, saving you time and money.',
    
    // Common Actions
    apply: 'Apply Now',
    learnMore: 'Learn More',
    getQuote: 'Get Quote',
    readMore: 'Read More',
    download: 'Download',
    
    // Footer
    quickLinks: 'Quick Links',
    products: 'Products',
    legal: 'Legal',
    aboutUs: 'About Us',
    careers: 'Careers',
    contactUs: 'Contact Us',
    faq: 'FAQs',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    appDownload: 'Download Our App',
    allRightsReserved: 'All Rights Reserved',
    premiumTitle: "Financial Clarity. Simplified."
  },
  
  hi: {
    // Navigation
    home: 'होम',
    insurance: 'बीमा',
    loans: 'लोन',
    cards: 'क्रेडिट कार्ड',
    investments: 'निवेश',
    compare: 'तुलना करें',
    claims: 'दावे',
    support: 'सहायता',
    login: 'लॉगिन',
    signUp: 'साइन अप',
    savedPlans: 'सेव किए गए प्लान',
    
    // Home Page
    heroTitle: 'सर्वश्रेष्ठ वित्तीय योजनाएं एक ही जगह पर खोजें',
    heroSubtitle: 'बीमा, ऋण और निवेश की तुलना करें, खरीदें और प्रबंधित करें',
    search: 'नाम, प्रदाता, कवरेज या प्रकार से खोजें...',
    categories: 'शीर्ष श्रेणियां',
    featuredProviders: 'प्रमुख प्रदाता',
    whyChoose: 'बैंकवाला को क्यों चुनें',
    testimonials: 'हमारे ग्राहक क्या कहते हैं',
    financialTips: 'वित्तीय सुझाव और समाचार',
    viewAll: 'सभी लेख देखें',
    
    // Insurance Types
    healthInsurance: 'स्वास्थ्य बीमा',
    termInsurance: 'टर्म लाइफ इंश्योरेंस',
    carInsurance: 'कार इंश्योरेंस',
    bikeInsurance: 'बाइक इंश्योरेंस',
    travelInsurance: 'यात्रा बीमा',
    investmentInsurance: 'निवेश योजनाएं',
    
    // Loan Types
    personalLoan: 'पर्सनल लोन',
    homeLoan: 'होम लोन',
    businessLoan: 'बिजनेस लोन',
    educationLoan: 'एजुकेशन लोन',
    
    // Card Types
    cashbackCards: 'कैशबैक कार्ड',
    travelCards: 'ट्रैवल कार्ड',
    rewardsCards: 'रिवॉर्ड्स कार्ड',
    
    // Investment Types
    fixedDeposits: 'फिक्स्ड डिपॉजिट',
    mutualFunds: 'म्यूचुअल फंड',
    stocks: 'स्टॉक्स',
    
    // Benefits
    comparePlans: 'प्लान्स की तुलना करें',
    compareDesc: 'अपनी आवश्यकताओं के लिए सर्वोत्तम विकल्प खोजने के लिए सैकड़ों योजनाओं की तुलना करें।',
    buyOnline: 'तुरंत ऑनलाइन खरीदें',
    buyDesc: 'बिना कागजी कार्रवाई के पॉलिसी खरीदें, लोन के लिए आवेदन करें और तुरंत मंजूरी प्राप्त करें।',
    claimAssistance: '24/7 दावा सहायता',
    claimDesc: 'हमारी समर्पित सपोर्ट टीम आपको किसी भी समय, कहीं भी दावा प्रक्रिया में मदद करती है।',
    bestOffers: 'बेस्ट ऑफर और डिस्काउंट',
    offersDesc: 'विशेष डील और डिस्काउंट जो आपको कहीं और नहीं मिलेंगे, जिससे आपका समय और पैसा बचेगा।',
    
    // Common Actions
    apply: 'अभी आवेदन करें',
    learnMore: 'और जानें',
    getQuote: 'कोट प्राप्त करें',
    readMore: 'और पढ़ें',
    download: 'डाउनलोड करें',
    
    // Footer
    quickLinks: 'त्वरित लिंक',
    products: 'उत्पाद',
    legal: 'कानूनी',
    aboutUs: 'हमारे बारे में',
    careers: 'करियर',
    contactUs: 'संपर्क करें',
    faq: 'अक्सर पूछे जाने वाले प्रश्न',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfUse: 'उपयोग की शर्तें',
    appDownload: 'हमारा ऐप डाउनलोड करें',
    allRightsReserved: 'सर्वाधिकार सुरक्षित'
  },
  
  bn: {
    // Navigation
    home: 'হোম',
    insurance: 'বীমা',
    loans: 'ঋণ',
    cards: 'ক্রেডিট কার্ড',
    investments: 'বিনিয়োগ',
    compare: 'তুলনা করুন',
    claims: 'দাবি',
    support: 'সহায়তা',
    login: 'লগইন',
    signUp: 'সাইন আপ',
    savedPlans: 'সংরক্ষিত পরিকল্পনা',
    
    // Home Page
    heroTitle: 'একটি জায়গায় সেরা আর্থিক পরিকল্পনা খুঁজুন',
    heroSubtitle: 'বীমা, ঋণ এবং বিনিয়োগের তুলনা করুন, কিনুন এবং পরিচালনা করুন',
    search: 'নাম, প্রদানকারী, কভারেজ, বা ধরন দ্বারা অনুসন্ধান করুন...',
    categories: 'শীর্ষ বিভাগ',
    featuredProviders: 'বৈশিষ্ট্যযুক্ত প্রদানকারীরা',
    whyChoose: 'কেন ব্যাঙ্কওয়ালা বেছে নেবেন',
    testimonials: 'আমাদের গ্রাহকরা কি বলেন',
    financialTips: 'আর্থিক টিপস এবং খবর',
    viewAll: 'সব আর্টিকেল দেখুন',
    
    // Insurance Types
    healthInsurance: 'স্বাস্থ্য বীমা',
    termInsurance: 'টার্ম লাইফ বীমা',
    carInsurance: 'গাড়ি বীমা',
    bikeInsurance: 'বাইক বীমা',
    travelInsurance: 'ভ্রমণ বীমা',
    investmentInsurance: 'বিনিয়োগ পরিকল্পনা',
    
    // Loan Types
    personalLoan: 'ব্যক্তিগত ঋণ',
    homeLoan: 'হোম লোন',
    businessLoan: 'ব্যবসায়িক ঋণ',
    educationLoan: 'শিক্ষা ঋণ',
    
    // Card Types
    cashbackCards: 'ক্যাশব্যাক কার্ড',
    travelCards: 'ভ্রমণ কার্ড',
    rewardsCards: 'রিওয়ার্ড কার্ড',
    
    // Investment Types
    fixedDeposits: 'স্থায়ী আমানত',
    mutualFunds: 'মিউচুয়াল ফান্ড',
    stocks: 'স্টক',
    
    // Benefits
    comparePlans: 'পরিকল্পনা তুলনা করুন',
    compareDesc: 'আপনার প্রয়োজনের জন্য সেরা বিকল্প খুঁজে পেতে শত শত পরিকল্পনা পাশাপাশি তুলনা করুন।',
    buyOnline: 'অনলাইনে তাৎক্ষণিক কিনুন',
    buyDesc: 'কাগজপত্র ছাড়াই পলিসি কিনুন, ঋণের জন্য আবেদন করুন এবং তাৎক্ষণিক অনুমোদন পান।',
    claimAssistance: '24/7 দাবি সহায়তা',
    claimDesc: 'আমাদের নিবেদিত সাপোর্ট টিম যেকোনো সময়, যেকোনো জায়গায় দাবি প্রক্রিয়ায় আপনাকে সাহায্য করে।',
    bestOffers: 'সেরা অফার এবং ছাড়',
    offersDesc: 'এক্সক্লুসিভ ডিল এবং ছাড় যা আপনি অন্য কোথাও পাবেন না, আপনার সময় এবং অর্থ বাঁচাবে।',
    
    // Common Actions
    apply: 'এখনই আবেদন করুন',
    learnMore: 'আরও জানুন',
    getQuote: 'কোট পান',
    readMore: 'আরো পড়ুন',
    download: 'ডাউনলোড করুন',
    
    // Footer
    quickLinks: 'দ্রুত লিঙ্ক',
    products: 'পণ্য',
    legal: 'আইনি',
    aboutUs: 'আমাদের সম্পর্কে',
    careers: 'কর্মসংস্থান',
    contactUs: 'যোগাযোগ করুন',
    faq: 'সাধারণ প্রশ্ন',
    privacyPolicy: 'গোপনীয়তা নীতি',
    termsOfUse: 'ব্যবহারের শর্তাবলী',
    appDownload: 'আমাদের অ্যাপ ডাউনলোড করুন',
    allRightsReserved: 'সমস্ত অধিকার সংরক্ষিত'
  },
  
  te: {
    // Navigation
    home: 'హోమ్',
    insurance: 'భీమా',
    loans: 'రుణాలు',
    cards: 'క్రెడిట్ కార్డులు',
    investments: 'పెట్టుబడులు',
    compare: 'పోల్చండి',
    claims: 'క్లెయిమ్స్',
    support: 'సపోర్ట్',
    login: 'లాగిన్',
    signUp: 'సైన్ అప్',
    savedPlans: 'సేవ్ చేసిన ప్లాన్లు',
    
    // Home Page
    heroTitle: 'ఒకే చోట ఉత్తమ ఆర్థిక ప్రణాళికలను కనుగొనండి',
    heroSubtitle: 'భీమా, రుణాలు మరియు పెట్టుబడులను పోల్చండి, కొనుగోలు చేయండి మరియు నిర్వహించండి',
    search: 'పేరు, ప్రొవైడర్, కవరేజ్ లేదా రకం ద్వారా శోధించండి...',
    categories: 'టాప్ కేటగిరీలు',
    featuredProviders: 'ఫీచర్డ్ ప్రొవైడర్లు',
    whyChoose: 'బ్యాంక్‌వాలాను ఎందుకు ఎంచుకోవాలి',
    testimonials: 'మా కస్టమర్లు ఏమి చెబుతున్నారు',
    financialTips: 'ఆర్థిక చిట్కాలు & వార్తలు',
    viewAll: 'అన్ని వ్యాసాలను చూడండి',
    
    // Complete Telugu translations for all sections
    // Insurance Types, Loan Types, Card Types, Investment Types, Benefits, etc.
    
    // Footer
    quickLinks: 'త్వరిత లింక్‌లు',
    products: 'ప్రొడక్ట్‌లు',
    legal: 'లీగల్',
    aboutUs: 'మా గురించి',
    careers: 'ఉద్యోగాలు',
    contactUs: 'సంప్రదించండి',
    faq: 'తరచుగా అడిగే ప్రశ్నలు',
    privacyPolicy: 'ప్రైవసీ పాలసీ',
    termsOfUse: 'వినియోగ నిబంధనలు',
    appDownload: 'మా యాప్‌ని డౌన్‌లోడ్ చేసుకోండి',
    allRightsReserved: 'అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి'
  },
  
  ta: {
    // Navigation
    home: 'முகப்பு',
    insurance: 'காப்பீடு',
    loans: 'கடன்கள்',
    cards: 'கிரெடிட் கார்டுகள்',
    investments: 'முதலீடுகள்',
    compare: 'ஒப்பிடுக',
    claims: 'உரிமைகோரல்கள்',
    support: 'ஆதரவு',
    login: 'உள்நுழைக',
    signUp: 'பதிவு செய்க',
    savedPlans: 'சேமித்த திட்டங்கள்',
    
    // Home Page
    heroTitle: 'சிறந்த நிதித் திட்டங்களை ஒரே இடத்தில் கண்டறியுங்கள்',
    heroSubtitle: 'காப்பீடு, கடன்கள் மற்றும் முதலீடுகளை ஒப்பிட்டு, வாங்கி, நிர்வகிக்கவும்',
    search: 'பெயர், வழங்குநர், காப்பீடு அல்லது வகை மூலம் தேடுங்கள்...',
    categories: 'முக்கிய வகைகள்',
    featuredProviders: 'சிறப்பு வழங்குநர்கள்',
    whyChoose: 'பாங்க்வாலாவை ஏன் தேர்வு செய்ய வேண்டும்',
    testimonials: 'எங்கள் வாடிக்கையாளர்கள் என்ன சொல்கிறார்கள்',
    financialTips: 'நிதி குறிப்புகள் & செய்திகள்',
    viewAll: 'அனைத்து கட்டுரைகளையும் பார்க்கவும்',
    
    // Complete Tamil translations for all sections
    // Insurance Types, Loan Types, Card Types, Investment Types, Benefits, etc.
    
    // Footer
    quickLinks: 'விரைவு இணைப்புகள்',
    products: 'தயாரிப்புகள்',
    legal: 'சட்டபூர்வமான',
    aboutUs: 'எங்களைப் பற்றி',
    careers: 'வேலைவாய்ப்புகள்',
    contactUs: 'தொடர்பு கொள்ளுங்கள்',
    faq: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    privacyPolicy: 'தனியுரிமைக் கொள்கை',
    termsOfUse: 'பயன்பாட்டு விதிமுறைகள்',
    appDownload: 'எங்கள் செயலியைப் பதிவிறக்குங்கள்',
    allRightsReserved: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை'
  }
};

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved && languages[saved] ? saved : 'en';
  });

  // Apply language to document
  useEffect(() => {
    // Set HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Set data-language attribute for CSS selectors
    document.documentElement.setAttribute('data-language', currentLanguage);
    
    // Store in localStorage
    localStorage.setItem('language', currentLanguage);
    
    // Apply font family based on language
    if (languages[currentLanguage] && languages[currentLanguage].fontFamily) {
      document.body.style.fontFamily = languages[currentLanguage].fontFamily;
    }
    
    // Log language change for debugging
    console.log(`Language changed to: ${currentLanguage}`);
    console.log(`Font family set to: ${languages[currentLanguage].fontFamily}`);
  }, [currentLanguage]);

  const translate = (key) => {
    // Check if the current language has this key
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      return translations[currentLanguage][key];
    }
    
    // Fallback to English
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    
    // If no translation exists, return the key itself
    return key;
  };

  const switchLanguage = (langCode) => {
    if (languages[langCode]) {
      setCurrentLanguage(langCode);
    }
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      languages,
      switchLanguage,
      translate
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 