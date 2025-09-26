import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { FormValues } from '../types/form';
import { applicationFormSchema } from '../utils/validation';

// External webhook endpoint for form submissions
const WEBHOOK_URL = 'https://primary-production-56087.up.railway.app/webhook/i-am-lender';

const ApplicationForm: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

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
    consentTransactional: false,
    consentMarketing: false,
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
    'Less than 6 months', '6–12 months', '12–24 months', 'Longer'
  ];

  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: any) => {
    setSubmitStatus('submitting');
    setErrorMessage('');
    
    try {
      // Enrich payload with basic context
      const payload = {
        ...values,
        submittedAt: new Date().toISOString(),
        pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      };

      const response = await axios.post(WEBHOOK_URL, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.status >= 200 && response.status < 300) {
        setSubmitStatus('success');
        resetForm();
        window.scrollTo(0, 0);
      } else {
        throw new Error(response.data.message || 'Form submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="max-w-3xl mx-auto bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <svg className="w-16 h-16 text-success mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-lg text-gray-600 mb-6">
          Our team will review your application and reach out shortly.
        </p>
        <button 
          onClick={() => setSubmitStatus('idle')}
          className="btn-primary"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div id="application-form" className="max-w-3xl mx-auto bg-white/1 shadow-lg rounded-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Real Estate Financing Application
      </h2>
      
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <p className="font-medium">Submission Error</p>
          <p className="text-sm">{errorMessage || 'Please try again later.'}</p>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={applicationFormSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
          <Form className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-white/1 backdrop-blur-sm p-4 rounded-md mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <Field name="email" type="email" className="input-field" />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>

                <div>
                  <label htmlFor="fullName" className="form-label">Full Name *</label>
                  <Field name="fullName" type="text" className="input-field" />
                  <ErrorMessage name="fullName" component="div" className="error-message" />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="form-label">Phone Number *</label>
                  <Field name="phoneNumber" type="tel" className="input-field" />
                  <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                </div>

                <div>
                  <label htmlFor="creditScore" className="form-label">Credit Score *</label>
                  <Field as="select" name="creditScore" className="input-field">
                    <option value="">Select Credit Score Range</option>
                    {creditScoreOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="creditScore" component="div" className="error-message" />
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white/1 backdrop-blur-sm p-4 rounded-md mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Investment Experience</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="experience" className="form-label">
                    How many properties have you purchased, rehabbed, and sold/refinanced in the last 2–3 years?
                  </label>
                  <Field name="experience" type="text" className="input-field" />
                  <ErrorMessage name="experience" component="div" className="error-message" />
                </div>

                <div>
                  <label htmlFor="ownership" className="form-label">
                    How many investment properties have you owned for 12 out of the last 36 months?
                  </label>
                  <Field name="ownership" type="text" className="input-field" />
                  <ErrorMessage name="ownership" component="div" className="error-message" />
                </div>
              </div>
            </div>

            {/* Property Information Section */}
            <div className="bg-white/1 backdrop-blur-sm p-4 rounded-md mb-6 overflow-visible">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Property Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="propertyAddress" className="form-label">Subject Property Address *</label>
                  <Field name="propertyAddress" type="text" className="input-field" />
                  <ErrorMessage name="propertyAddress" component="div" className="error-message" />
                </div>

                <div>
                  <label htmlFor="propertyType" className="form-label">Property Type *</label>
                  <Field as="select" name="propertyType" className="input-field">
                    <option value="">Select Property Type</option>
                    {propertyTypeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="propertyType" component="div" className="error-message" />
                </div>

                <div>
                  <label className="form-label">Loan Purpose *</label>
                  <div className="flex space-x-4 mt-1">
                    <label className="inline-flex items-center">
                      <Field 
                        type="radio" 
                        name="loanPurpose" 
                        value="Purchase" 
                        className="form-radio h-4 w-4 text-primary" 
                      />
                      <span className="ml-2">Purchase</span>
                    </label>
                    <label className="inline-flex items-center">
                      <Field 
                        type="radio" 
                        name="loanPurpose" 
                        value="Refinance" 
                        className="form-radio h-4 w-4 text-primary" 
                      />
                      <span className="ml-2">Refinance</span>
                    </label>
                  </div>
                  <ErrorMessage name="loanPurpose" component="div" className="error-message" />
                </div>

                <div>
                  <label htmlFor="closingDate" className="form-label">Closing Date</label>
                  <div className="relative z-50">
                    <DatePicker
                      selected={values.closingDate}
                      onChange={(date) => setFieldValue('closingDate', date)}
                      className="input-field"
                      dateFormat="MM/dd/yyyy"
                      placeholderText="Select a date"
                      minDate={new Date()}
                      withPortal
                      portalId="date-picker-portal"
                    />
                  </div>
                  <ErrorMessage name="closingDate" component="div" className="error-message" />
                </div>

                <div>
                  <label htmlFor="purchasePrice" className="form-label">Purchase Price ($) *</label>
                  <Field name="purchasePrice" type="text" className="input-field" />
                  <ErrorMessage name="purchasePrice" component="div" className="error-message" />
                </div>
              </div>
            </div>

            {/* Funding Information Section */}
            <div className="bg-white/1 backdrop-blur-sm p-4 rounded-md mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Funding Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="form-label">Rehab/Construction Funding?</label>
                  <div className="flex space-x-4 mt-1">
                    <label className="inline-flex items-center">
                      <Field 
                        type="radio" 
                        name="needsRehabFunding" 
                        checked={values.needsRehabFunding === true}
                        onChange={() => setFieldValue('needsRehabFunding', true)}
                        className="form-radio h-4 w-4 text-primary" 
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <Field 
                        type="radio" 
                        name="needsRehabFunding" 
                        checked={values.needsRehabFunding === false}
                        onChange={() => setFieldValue('needsRehabFunding', false)}
                        className="form-radio h-4 w-4 text-primary" 
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="downPayment" className="form-label">Down Payment Available ($)</label>
                  <Field name="downPayment" type="text" className="input-field" />
                  <ErrorMessage name="downPayment" component="div" className="error-message" />
                </div>

                <div>
                  <label htmlFor="additionalReserves" className="form-label">
                    Additional Reserves ($)
                    <span className="text-xs text-gray-500 ml-1">(cash, stocks, retirement accounts, etc.)</span>
                  </label>
                  <Field name="additionalReserves" type="text" className="input-field" />
                  <ErrorMessage name="additionalReserves" component="div" className="error-message" />
                </div>

                <div>
                  <label className="form-label">Investment Strategy</label>
                  <div className="flex space-x-4 mt-1">
                    <label className="inline-flex items-center">
                      <Field 
                        type="radio" 
                        name="investmentStrategy" 
                        value="Flip" 
                        className="form-radio h-4 w-4 text-primary" 
                      />
                      <span className="ml-2">Flip</span>
                    </label>
                    <label className="inline-flex items-center">
                      <Field 
                        type="radio" 
                        name="investmentStrategy" 
                        value="Hold" 
                        className="form-radio h-4 w-4 text-primary" 
                      />
                      <span className="ml-2">Hold</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="form-label">Project Type</label>
                  <div className="flex space-x-4 mt-1">
                    <label className="inline-flex items-center">
                      <Field 
                        type="radio" 
                        name="projectType" 
                        value="Fix & Flip" 
                        className="form-radio h-4 w-4 text-primary" 
                      />
                      <span className="ml-2">Fix & Flip</span>
                    </label>
                    <label className="inline-flex items-center">
                      <Field 
                        type="radio" 
                        name="projectType" 
                        value="Ground Up Construction (GUC)" 
                        className="form-radio h-4 w-4 text-primary" 
                      />
                      <span className="ml-2">Ground Up Construction</span>
                    </label>
                  </div>
                </div>

                {values.needsRehabFunding && (
                  <div>
                    <label htmlFor="rehabFundingNeeded" className="form-label">Rehab/Construction Funding Needed ($)</label>
                    <Field name="rehabFundingNeeded" type="text" className="input-field" />
                    <ErrorMessage name="rehabFundingNeeded" component="div" className="error-message" />
                  </div>
                )}

                <div>
                  <label htmlFor="loanTerm" className="form-label">Loan Term</label>
                  <Field as="select" name="loanTerm" className="input-field">
                    <option value="">Select Loan Term</option>
                    {loanTermOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="loanTerm" component="div" className="error-message" />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="bg-white/1 backdrop-blur-sm p-4 rounded-md mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Information</h3>
              
              <div>
                <label htmlFor="additionalInfo" className="form-label">
                  Please provide any additional information that may be helpful
                </label>
                <Field 
                  as="textarea" 
                  name="additionalInfo" 
                  rows={4} 
                  className="input-field" 
                />
              </div>
            </div>

            {/* Consent Section */}
            <div className="bg-white/1 backdrop-blur-sm p-4 rounded-md mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Consent</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="inline-flex items-center">
                    <Field 
                      type="checkbox" 
                      name="consentTransactional" 
                      className="form-checkbox h-4 w-4 text-primary" 
                    />
                    <span className="ml-2">I agree to receive transactional messages. *</span>
                  </label>
                  <ErrorMessage name="consentTransactional" component="div" className="error-message" />
                </div>

                <div>
                  <label className="inline-flex items-center">
                    <Field 
                      type="checkbox" 
                      name="consentMarketing" 
                      className="form-checkbox h-4 w-4 text-primary" 
                    />
                    <span className="ml-2">I agree to receive marketing/promotional messages.</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-success text-lg py-3 px-8 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ApplicationForm;
