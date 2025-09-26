import React from 'react';
import EnhancedApplicationForm from './components/EnhancedApplicationForm';
import './date-picker-styles.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      {/* Golden light animation effects */}
      <div className="golden-glow">
        <div className="light-ray"></div>
        <div className="light-ray"></div>
        <div className="light-ray"></div>
        <div className="gold-particle"></div>
        <div className="gold-particle"></div>
        <div className="gold-particle"></div>
        <div className="gold-particle"></div>
        <div className="gold-particle"></div>
        <div className="lens-flare"></div>
      </div>
      
      <main className="relative z-10 min-h-screen w-full flex items-start md:items-center justify-end px-4 md:px-8 py-8">
        <div className="w-full max-w-5xl flex justify-end">
          <EnhancedApplicationForm />
        </div>
      </main>
    </div>
  );
};

export default App;
