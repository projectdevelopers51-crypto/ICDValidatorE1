import type { InvoiceData, ExcludesRules, Violation } from './types';

export function validateInvoice(
  invoiceData: InvoiceData,
  rules: ExcludesRules
): Violation[] {
  const violations: Violation[] = [];
  const claims = invoiceData.Submission?.Claim || [];

  for (const claim of claims) {
    const invoiceId = claim.ID;
    const diagnosisCodes = claim.Diagnosis?.map((d) => d.Code) || [];

    // Check all pairs of diagnosis codes
    for (let i = 0; i < diagnosisCodes.length; i++) {
      for (let j = i + 1; j < diagnosisCodes.length; j++) {
        const code1 = diagnosisCodes[i];
        const code2 = diagnosisCodes[j];

        // Check if code1 excludes code2
        if (rules[code1]?.excludes_1?.includes(code2)) {
          violations.push({
            invoiceId,
            icdCodes: [code1, code2],
            rule: `${code1} excludes ${code2}`,
            explanation: rules[code1].explanation,
          });
        }

        // Check if code2 excludes code1
        if (rules[code2]?.excludes_1?.includes(code1)) {
          violations.push({
            invoiceId,
            icdCodes: [code2, code1],
            rule: `${code2} excludes ${code1}`,
            explanation: rules[code2].explanation,
          });
        }
      }
    }
  }

  return violations;
}
