import { Suspense, useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Select, Button } from 'antd'; // Ant Design components
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './page/Home';
import Page1 from './page/Page1';
import './App.scss'; // Styling file
import './funtion/i18';
import { detectUserLanguage } from './funtion/i18';
import Page2 from './page/Page2';

const { Option } = Select;

// Separate the Router-dependent part into a child component
function AppContent() {
  const { t } = useTranslation(); // Translation functions
  const location = useLocation(); // Get the current path

  const [language, setLanguage] = useState(detectUserLanguage()); // Current language state

  const handleLanguageChange = (value: string) => {
    setLanguage(value); // Update the state
    i18n.changeLanguage(value); // Change the app language
  };

  return (
    <div className="app-container">
      {/* Language Switcher */}
      <div className="language-switcher">
        <Select
          defaultValue={language}
          style={{ width: 120 }}
          onChange={handleLanguageChange}
          className="language-select"
        >
          <Option value="en">English</Option>
          <Option value="th">ภาษาไทย</Option>
        </Select>
      </div>

      {/* Conditional Home Button */}
      {location.pathname !== '/' && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <Link to="/">
            <Button type="default">{t('Home')}</Button>
          </Link>
        </div>
      )}

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card1" element={<Page1 />} />
        <Route path="/card2" element={<Page2 />}/>
        <Route path="/card3" element={<h1>{t('Card3Title')} Page</h1>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <AppContent />
      </Router>
    </Suspense>
  );
}

export default App;
