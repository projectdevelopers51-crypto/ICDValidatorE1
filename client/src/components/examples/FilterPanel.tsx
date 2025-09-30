import { useState } from 'react';
import { FilterPanel } from '../FilterPanel';

export default function FilterPanelExample() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8 max-w-md mx-auto">
      <FilterPanel 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClear={() => setSearchTerm('')}
      />
    </div>
  );
}
