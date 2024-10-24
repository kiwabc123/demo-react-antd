import { Suspense, useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Select, Button } from 'antd'; 
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './page/Home';
import Page1 from './page/Page1';
import './App.scss'; 
import './funtion/i18';
import { detectUserLanguage } from './funtion/i18';
import Page2 from './page/Page2';

const { Option } = Select;


function AppContent() {
  const { t } = useTranslation(); 
  const location = useLocation(); 

  const [language, setLanguage] = useState(detectUserLanguage()); 

  const handleLanguageChange = (value: string) => {
    setLanguage(value); 
    i18n.changeLanguage(value); 
  };

  return (
    <div className="app-container" style={{ position: 'relative', padding: '20px' }}>
      <div style={{ position: 'absolute', top: 10, right: 20, display: 'flex',flexDirection:"row-reverse", alignItems: 'flex-end' }}>
        <Select
          defaultValue={language}
          style={{ width: 120 }}
          onChange={handleLanguageChange}
          className="language-select"
        >
          <Option value="en">English</Option>
          <Option value="th">ภาษาไทย</Option>
        </Select>
        {location.pathname !== '/' && (
          <Link to="/">
            <Button type="default">{t('Home')}</Button>
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card1" element={<Page1 />} />
        <Route path="/card2" element={<Page2 />} />
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
