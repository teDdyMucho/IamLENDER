import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { FormValues } from '../types/form';
import { applicationFormSchema } from '../utils/validation';
import { CheckCircleIcon, LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

const WEBHOOK_URL = 'https://primary-production-56087.up.railway.app/webhook/i-am-lender';

const EnhancedApplicationForm: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const initialValues: FormValues = {
    email: '',
    fullName: '',
    phoneNumber: '',
    creditScore: '',
    experience: '',
    ownership: '',
    propertyAddress: '',
    propertyType: '',
    loanPurpose: 'Purchase',
    closingDate: null,
    purchasePrice: '',
    needsRehabFunding: false,
    downPayment: '',
    additionalReserves: '',
    investmentStrategy: 'Flip',
    projectType: 'Fix & Flip',
    rehabFundingNeeded: '',
    loanTerm: '',
    additionalInfo: '',
    consent: false,
  };

  const creditScoreOptions = [
    '760+', '740-759', '720-739', '700-719', '680-699', 
    '660-679', '640-659', '620-639', '600-619', '599 or Below'
  ];

  const propertyTypeOptions = [
    'SFR', '2–4 Unit Residential', '5–9 Unit Residential', 
    '10+ Unit Residential', 'Mixed-Use', 'Other'
  ];

  const loanTermOptions = [
    '3 months', '6 months', '9 months', '12 months', 
    '18 months', '24 months', '36 months', 'Other'
  ];

  const handleSubmit = async (values: FormValues) => {
    setSubmitStatus('submitting');
    setErrorMessage('');

    try {
      const response = await axios.post(WEBHOOK_URL, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSubmitStatus('success');
      } else {
        throw new Error('Unexpected response');
      }
    } catch (error) {
      setSubmitStatus('error');
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'Failed to submit application. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStepContent = (values: FormValues, setFieldValue: any) => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Personal Information</h3>
            
            <div>
              <label className="form-label">Full Name *</label>
              <Field
                name="fullName"
                type="text"
                className="input-field"
                placeholder="Enter your full name"
              />
              <ErrorMessage name="fullName" component="div" className="error-message" />
            </div>

            <div>
              <label className="form-label">Email Address *</label>
              <Field
                name="email"
                type="email"
                className="input-field"
                placeholder="your@email.com"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div>
              <label className="form-label">Phone Number *</label>
              <Field
                name="phoneNumber"
                type="tel"
                className="input-field"
                placeholder="(555) 123-4567"
              />
              <ErrorMessage name="phoneNumber" component="div" className="error-message" />
            </div>

            <div>
              <label className="form-label">Credit Score Range *</label>
              <Field as="select" name="creditScore" className="input-field">
                <option value="">Select your credit score range</option>
                {creditScoreOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Field>
              <ErrorMessage name="creditScore" component="div" className="error-message" />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Property Details</h3>
            
            <div>
              <label className="form-label">Property Address *</label>
              <Field
                name="propertyAddress"
                type="text"
                className="input-field"
                placeholder="123 Main St, City, State ZIP"
              />
              <ErrorMessage name="propertyAddress" component="div" className="error-message" />
            </div>

            <div>
              <label className="form-label">Property Type *</label>
              <Field as="select" name="propertyType" className="input-field">
                <option value="">Select property type</option>
                {propertyTypeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Field>
              <ErrorMessage name="propertyType" component="div" className="error-message" />
            </div>

            <div>
              <label className="form-label">Loan Purpose *</label>
              <div className="flex gap-4">
                <label className="flex items-center text-gray-300">
                  <Field
                    type="radio"
                    name="loanPurpose"
                    value="Purchase"
                    className="mr-2 text-secondary focus:ring-secondary"
                  />
                  Purchase
                </label>
                <label className="flex items-center text-gray-300">
                  <Field
                    type="radio"
                    name="loanPurpose"
                    value="Refinance"
                    className="mr-2 text-secondary focus:ring-secondary"
                  />
                  Refinance
                </label>
              </div>
            </div>

            <div>
              <label className="form-label">Closing Date</label>
              <DatePicker
                selected={values.closingDate}
                onChange={(date) => setFieldValue('closingDate', date)}
                className="input-field w-full"
                placeholderText="Select closing date"
                minDate={new Date()}
                dateFormat="MM/dd/yyyy"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Financial Information</h3>
            
            <div>
              <label className="form-label">Purchase Price *</label>
              <Field
                name="purchasePrice"
                type="text"
                className="input-field"
                placeholder="$500,000"
              />
              <ErrorMessage name="purchasePrice" component="div" className="error-message" />
            </div>

            <div>
              <label className="form-label">Down Payment *</label>
              <Field
                name="downPayment"
                type="text"
                className="input-field"
                placeholder="$100,000"
              />
              <ErrorMessage name="downPayment" component="div" className="error-message" />
            </div>

            <div>
              <label className="form-label">Additional Reserves</label>
              <Field
                name="additionalReserves"
                type="text"
                className="input-field"
                placeholder="$50,000"
              />
            </div>

            <div>
              <label className="form-label">Loan Term *</label>
              <Field as="select" name="loanTerm" className="input-field">
                <option value="">Select loan term</option>
                {loanTermOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Field>
              <ErrorMessage name="loanTerm" component="div" className="error-message" />
            </div>

            <div>
              <label className="flex items-center text-gray-300">
                <Field
                  type="checkbox"
                  name="needsRehabFunding"
                  className="mr-2 text-secondary focus:ring-secondary"
                />
                I need rehab funding
              </label>
            </div>

            {values.needsRehabFunding && (
              <div>
                <label className="form-label">Rehab Funding Needed</label>
                <Field
                  name="rehabFundingNeeded"
                  type="text"
                  className="input-field"
                  placeholder="$75,000"
                />
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Investment Strategy</h3>
            
            <div>
              <label className="form-label">Investment Strategy *</label>
              <div className="flex gap-4">
                <label className="flex items-center text-gray-300">
                  <Field
                    type="radio"
                    name="investmentStrategy"
                    value="Flip"
                    className="mr-2 text-secondary focus:ring-secondary"
                  />
                  Flip
                </label>
                <label className="flex items-center text-gray-300">
                  <Field
                    type="radio"
                    name="investmentStrategy"
                    value="Rent"
                    className="mr-2 text-secondary focus:ring-secondary"
                  />
                  Rent
                </label>
              </div>
            </div>

            <div>
              <label className="form-label">Real Estate Experience *</label>
              <Field
                name="experience"
                type="text"
                className="input-field"
                placeholder="5 years, 10 deals completed"
              />
              <ErrorMessage name="experience" component="div" className="error-message" />
            </div>

            <div>
              <label className="form-label">Additional Information</label>
              <Field
                as="textarea"
                name="additionalInfo"
                className="input-field min-h-[100px]"
                placeholder="Tell us more about your project..."
              />
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-700">
              <label className="flex items-start text-gray-300">
                <Field
                  type="checkbox"
                  name="consent"
                  className="mr-2 mt-1 text-secondary focus:ring-secondary"
                />
                <span className="text-sm">
                  I consent to receive transactional and marketing communications via email, SMS, and phone calls *
                </span>
              </label>
              <ErrorMessage name="consent" component="div" className="error-message" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-12">
        <CheckCircleIcon className="w-20 h-20 text-secondary mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Application Submitted!</h2>
        <p className="text-gray-300 mb-8">
          Thank you for your application. Our team will review it and contact you within 24-48 hours.
        </p>
        <button
          onClick={() => {
            setSubmitStatus('idle');
            setCurrentStep(1);
          }}
          className="btn-primary"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl bg-dark/40 md:bg-dark/60 backdrop-blur-sm border border-secondary/30 shadow-2xl shadow-black/40">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-white">Secure Application</h2>
          <span className="text-gray-400">Step {currentStep} of {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex justify-center gap-6 mb-6">
        <div className="flex items-center text-gray-400 text-sm">
          <LockClosedIcon className="w-4 h-4 mr-1 text-secondary" />
          SSL Secured
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <ShieldCheckIcon className="w-4 h-4 mr-1 text-secondary" />
          Bank-Level Encryption
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={applicationFormSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isValid, errors }) => (
          <Form className="space-y-6">
            {renderStepContent(values, setFieldValue)}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                >
                  <ChevronLeftIcon className="w-5 h-5 mr-2" />
                  Previous
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto flex items-center btn-primary"
                >
                  Next
                  <ChevronRightIcon className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isValid || submitStatus === 'submitting'}
                  className="ml-auto btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>

            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-300">
                {errorMessage}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EnhancedApplicationForm;
