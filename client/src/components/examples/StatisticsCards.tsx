import { StatisticsCards } from '../StatisticsCards';

export default function StatisticsCardsExample() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <StatisticsCards 
        totalViolations={24}
        validatedClaims={150}
        errorRate={16.0}
      />
    </div>
  );
}
