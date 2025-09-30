import { useState } from 'react';
import { FileUpload } from '../FileUpload';

export default function FileUploadExample() {
  const [fileName, setFileName] = useState<string>();

  const handleUpload = (data: any) => {
    console.log('File uploaded:', data);
    setFileName('test_invoice.json');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <FileUpload onFileUpload={handleUpload} fileName={fileName} />
    </div>
  );
}
