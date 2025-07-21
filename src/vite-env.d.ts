/// <reference types="svelte" />
/// <reference types="vite/client" />

// src/vite-env.d.ts
declare module '*.csv' {
  const value: Array<{
    geo_level: string;
    geo_name: string;
    state_name: string;
    pct_black_alone: string;
    approval_fiscal_year: string;
    loan_type: string;
    number_of_loans: string;
    // Add other CSV columns here
  }>;
  export default value;
}
