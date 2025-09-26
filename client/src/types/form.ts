export interface FormValues {
  email: string;
  fullName: string;
  phoneNumber: string;
  creditScore: string;
  experience: string;
  ownership: string;
  propertyAddress: string;
  propertyType: string;
  loanPurpose: 'Purchase' | 'Refinance';
  closingDate: Date | null;
  purchasePrice: string;
  needsRehabFunding: boolean;
  downPayment: string;
  additionalReserves: string;
  investmentStrategy: 'Flip' | 'Hold';
  projectType: 'Fix & Flip' | 'Ground Up Construction (GUC)';
  rehabFundingNeeded: string;
  loanTerm: string;
  additionalInfo: string;
  consentTransactional: boolean;
  consentMarketing: boolean;
}
