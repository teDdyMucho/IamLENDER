import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="bg-primary text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Apply for Real Estate Financing Today
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Fast, reliable funding for your next property investment.
          </p>
          <div className="mt-8">
            <a 
              href="#application-form" 
              className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300 inline-block"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
