import { ViolationsTable } from '../ViolationsTable';

export default function ViolationsTableExample() {
  const mockViolations = [
    {
      invoiceId: "INVXO4578290",
      icdCodes: ["E10.9", "R73.9"] as [string, string],
      rule: "E10.9 excludes R73.9",
      explanation: "E10.9 (Type 1 diabetes mellitus without complications) excludes R73.9 (Hyperglycemia, unspecified). E10.9 is a definitive diagnosis; R73.9 is a symptom. Coding both is redundant."
    },
    {
      invoiceId: "INVXO4583371",
      icdCodes: ["I10", "I15.9"] as [string, string],
      rule: "I10 excludes I15.9",
      explanation: "I10 (Essential hypertension) excludes I15.9 (Secondary hypertension, unspecified). These represent different types of hypertension and should not be coded together."
    },
    {
      invoiceId: "INVXO4589378",
      icdCodes: ["A04.7", "A05.1"] as [string, string],
      rule: "A04.7 excludes A05.1",
      explanation: "A04.7 (Enterocolitis due to Clostridium difficile) excludes A05.1 (Botulism food poisoning). These are distinct bacterial infections."
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <ViolationsTable violations={mockViolations} />
    </div>
  );
}
