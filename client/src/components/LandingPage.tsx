import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ShieldCheckIcon, ClockIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { StarIcon, CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import EnhancedApplicationForm from './EnhancedApplicationForm';

const LandingPage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: '$50M+', label: 'Funded' },
    { value: '500+', label: 'Deals Closed' },
    { value: '7 Days', label: 'Average Approval' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  const features = [
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: 'Fast Funding',
      description: 'Get approved in as little as 24 hours with funding in 7 days or less.',
    },
    {
      icon: <CurrencyDollarIcon className="w-8 h-8" />,
      title: 'Flexible Terms',
      description: 'Customized loan structures tailored to your unique investment strategy.',
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: 'Expert Guidance',
      description: 'Work with seasoned professionals who understand real estate financing.',
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: 'Transparent Process',
      description: 'No hidden fees, clear terms, and straightforward communication.',
    },
  ];

  const testimonials = [
    {
      name: 'Michael Chen',
      role: 'Real Estate Developer',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: 'The speed and professionalism exceeded my expectations. Funded my project in just 5 days!',
      rating: 5,
    },
    {
      name: 'Sarah Williams',
      role: 'Property Investor',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote: 'Finally, a lender that understands the urgency of real estate deals. Highly recommended!',
      rating: 5,
    },
    {
      name: 'David Rodriguez',
      role: 'Portfolio Manager',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
      quote: 'Their flexible terms allowed me to structure deals that traditional banks wouldn\'t touch.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark via-dark-blue to-dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          />
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"
            style={{ transform: `translateY(${scrollY * -0.2}px)`, animationDelay: '1.5s' }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in font-display">
            Fund Your Vision.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
              Build Your Future.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up">
            Smart lending for ambitious investors. Fast approvals, flexible terms, and the trusted financing partner you deserve.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-4 bg-gradient-to-r from-secondary to-accent text-dark font-bold rounded-lg hover:shadow-2xl hover:shadow-secondary/50 transform hover:scale-105 transition-all duration-300"
            >
              Apply Now
              <ChevronRightIcon className="inline-block w-5 h-5 ml-2" />
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-secondary text-secondary font-bold rounded-lg hover:bg-secondary hover:text-dark transform hover:scale-105 transition-all duration-300">
              Check Your Eligibility
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 animate-fade-in">
            <div className="flex items-center text-gray-400">
              <LockClosedIcon className="w-5 h-5 mr-2 text-secondary" />
              SSL Secured
            </div>
            <div className="flex items-center text-gray-400">
              <CheckCircleIcon className="w-5 h-5 mr-2 text-secondary" />
              Trusted by 1,000+ Investors
            </div>
            <div className="flex items-center text-gray-400">
              <StarIcon className="w-5 h-5 mr-2 text-secondary" />
              4.9/5 Rating
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-secondary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-secondary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 bg-gradient-to-r from-dark-blue to-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transform hover:scale-110 transition-transform duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 font-display">
            Why Choose Us
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            We're not just another lender. We're your strategic partner in building wealth through real estate.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-dark-blue to-dark p-6 rounded-xl border border-gray-800 hover:border-secondary transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/20"
              >
                <div className="text-secondary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-dark to-dark-blue">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 font-display">
            How It Works
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Three simple steps to get your funding approved and in your hands.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary to-accent transform -translate-y-1/2" />
              
              <div className="grid md:grid-cols-3 gap-8 relative">
                {[
                  { step: '01', title: 'Apply', description: 'Submit your application online in minutes' },
                  { step: '02', title: 'Review', description: 'Our experts review and approve within 24-48 hours' },
                  { step: '03', title: 'Fund', description: 'Receive your funds in as little as 7 days' },
                ].map((item, index) => (
                  <div key={index} className="text-center relative">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center text-dark font-bold text-2xl mb-4 relative z-10 transform hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 font-display">
            Success Stories
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our satisfied clients.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-dark-blue to-dark p-6 rounded-xl border border-gray-800 hover:border-secondary transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 border-2 border-secondary"
                  />
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-secondary" />
                  ))}
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4 font-display">
            Ready to Get Started?
          </h2>
          <p className="text-dark/80 text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of successful investors who've transformed their vision into reality with our financing solutions.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 bg-dark text-secondary font-bold rounded-lg hover:bg-dark-blue hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Start Your Application
            <ChevronRightIcon className="inline-block w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Application Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-gradient-to-br from-dark-blue to-dark rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-secondary/30">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
            <EnhancedApplicationForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
