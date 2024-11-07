import React, { useState } from 'react';
import LeftPanel from './components/LeftPanel';
import ChatPanel from './components/ChatPanel';
import InvestorProfile from './components/InvestorProfile';

export default function App() {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [pdfContent, setPdfContent] = useState<string>('');

  const handleUploadSuccess = (content: string) => {
    setPdfContent(content);
    setUploadSuccess(true);
  };

  return (
    <div className="fixed inset-0 bg-gray-950 text-gray-100">
      <div className="h-full w-full grid grid-cols-[320px_1fr_380px]">
        <div className="h-full overflow-y-auto border-r border-gray-800/50">
          <LeftPanel onFileContent={handleUploadSuccess} />
        </div>
        <div className="h-full border-x border-gray-800/50">
          <ChatPanel uploadSuccess={uploadSuccess} pdfContent={pdfContent} />
        </div>
        <div className="h-full overflow-hidden border-l border-gray-800/50">
          <InvestorProfile />
        </div>
      </div>
    </div>
  );
}