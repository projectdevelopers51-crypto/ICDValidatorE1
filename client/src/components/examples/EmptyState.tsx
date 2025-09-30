import { EmptyState } from '../EmptyState';

export default function EmptyStateExample() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">No Violations State</h3>
        <EmptyState type="no-violations" />
      </div>
      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold mb-4">No File State</h3>
        <EmptyState type="no-file" />
      </div>
    </div>
  );
}
