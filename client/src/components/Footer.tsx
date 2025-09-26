import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Real Estate Financing. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-primary text-sm">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500 max-w-3xl mx-auto text-center">
          <p>
            Disclaimer: This website is for informational purposes only and does not constitute an offer to lend. 
            All financing is subject to application, credit approval, and underwriting requirements.
            Rates, terms, and conditions are subject to change without notice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
