import type { InvoiceData, ExcludesRules, Violation } from './types';

// Get all parent codes for a given ICD code
// E.g., "E10.649" -> ["E10.649", "E10.64", "E10.6", "E10"]
function getCodeHierarchy(code: string): string[] {
  const parts = code.split('.');
  const hierarchy = [code]; // Include the code itself
  
  if (parts.length > 1) {
    const base = parts[0];
    const subcodes = parts[1];
    
    // Add progressively shorter subcodes
    for (let i = subcodes.length - 1; i > 0; i--) {
      hierarchy.push(`${base}.${subcodes.substring(0, i)}`);
    }
    
    // Add base code
    hierarchy.push(base);
  }
  
  return hierarchy;
}

// Check if code1 or any of its parents exclude code2 or any of its parents
function checkExclusion(
  code1: string,
  code2: string,
  rules: ExcludesRules
): { excludes: boolean; matchedRule: string; explanation: string } | null {
  const code1Hierarchy = getCodeHierarchy(code1);
  const code2Hierarchy = getCodeHierarchy(code2);
  
  // Check each level of code1 hierarchy
  for (const c1 of code1Hierarchy) {
    const rule = rules[c1];
    if (rule?.excludes_1) {
      // Check if any level of code2 is in the excludes list
      for (const c2 of code2Hierarchy) {
        if (rule.excludes_1.includes(c2)) {
          return {
            excludes: true,
            matchedRule: c1,
            explanation: rule.explanation
          };
        }
      }
    }
  }
  
  return null;
}

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

        // Check if code1 (or its parents) exclude code2 (or its parents)
        const exclusion1 = checkExclusion(code1, code2, rules);
        if (exclusion1) {
          violations.push({
            invoiceId,
            icdCodes: [code1, code2],
            rule: `${exclusion1.matchedRule} excludes ${code2}`,
            explanation: exclusion1.explanation,
          });
        }

        // Check if code2 (or its parents) exclude code1 (or its parents)
        const exclusion2 = checkExclusion(code2, code1, rules);
        if (exclusion2) {
          violations.push({
            invoiceId,
            icdCodes: [code2, code1],
            rule: `${exclusion2.matchedRule} excludes ${code1}`,
            explanation: exclusion2.explanation,
          });
        }
      }
    }
  }

  return violations;
}
