export interface Violation {
  invoiceId: string;
  icdCodes: [string, string];
  rule: string;
  explanation: string;
}

export interface Claim {
  ID: string;
  Diagnosis: Array<{
    Type: string;
    Code: string;
  }>;
}

export interface InvoiceData {
  Submission: {
    Claim: Claim[];
  };
}

export interface ExcludesRule {
  excludes_1: string[];
  explanation: string;
}

export type ExcludesRules = Record<string, ExcludesRule>;
