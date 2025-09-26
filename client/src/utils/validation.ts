import * as Yup from 'yup';

export const phoneRegExp = /^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

export const applicationFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
  
  creditScore: Yup.string()
    .required('Credit score is required'),
  
  experience: Yup.string(),
  
  ownership: Yup.string(),
  
  propertyAddress: Yup.string()
    .required('Property address is required'),
  
  propertyType: Yup.string()
    .required('Property type is required'),
  
  loanPurpose: Yup.string()
    .required('Loan purpose is required'),
  
  closingDate: Yup.date()
    .nullable(),
  
  purchasePrice: Yup.string()
    .required('Purchase price is required')
    .test('is-number', 'Must be a valid number', value => {
      if (!value) return true;
      return !isNaN(Number(value.replace(/,/g, '')));
    }),
  
  needsRehabFunding: Yup.boolean(),
  
  downPayment: Yup.string()
    .test('is-number', 'Must be a valid number', value => {
      if (!value) return true;
      return !isNaN(Number(value.replace(/,/g, '')));
    }),
  
  additionalReserves: Yup.string()
    .test('is-number', 'Must be a valid number', value => {
      if (!value) return true;
      return !isNaN(Number(value.replace(/,/g, '')));
    }),
  
  investmentStrategy: Yup.string(),
  
  projectType: Yup.string(),
  
  rehabFundingNeeded: Yup.string()
    .test('is-number', 'Must be a valid number', value => {
      if (!value) return true;
      return !isNaN(Number(value.replace(/,/g, '')));
    }),
  
  loanTerm: Yup.string(),
  
  additionalInfo: Yup.string(),
  
  consentTransactional: Yup.boolean()
    .oneOf([true], 'You must consent to receive transactional messages'),
  
  consentMarketing: Yup.boolean(),
});
