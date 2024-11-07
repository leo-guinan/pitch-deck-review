import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, Check, MessageSquare } from 'lucide-react';
import { extractTextFromPDF } from '../lib/pdfUtils';

interface LeftPanelProps {
  onFileContent: (content: string) => void;
}

export default function LeftPanel({ onFileContent }: LeftPanelProps) {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'completed'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setUploadStatus('processing');
      
      try {
        const content = await extractTextFromPDF(file);
        onFileContent(content);
        setUploadStatus('completed');
      } catch (error) {
        console.error('Error processing PDF:', error);
        setUploadStatus('idle');
      }
    }
  }, [onFileContent]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    disabled: uploadStatus === 'completed'
  });

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowFeedbackModal(false);
    setFeedback('');
    setEmail('');
  };

  return (
    <div className="h-full bg-gray-900 p-6">
      <div className="text-white mb-8">
        <h2 className="text-xl font-semibold mb-2">Upload Pitch Deck</h2>
        <p className="text-gray-400 text-sm">Share your vision with Sarah</p>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-4 transition-colors ${
          isDragActive ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700 hover:border-purple-500'
        } ${uploadStatus === 'completed' ? 'bg-green-500/10 border-green-500 opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        {uploadStatus === 'completed' ? (
          <Check className="w-8 h-8 text-green-500" />
        ) : (
          <FileUp className="w-8 h-8 text-gray-400" />
        )}
        
        <div className="text-center">
          {uploadStatus === 'idle' && (
            <p className="text-gray-300">
              {isDragActive ? 'Drop your pitch deck here' : 'Drag & drop your pitch deck here'}
              <br />
              <span className="text-sm text-gray-400">or click to browse</span>
            </p>
          )}
          {uploadStatus === 'processing' && (
            <p className="text-purple-400">Processing your pitch deck...</p>
          )}
          {uploadStatus === 'completed' && (
            <p className="text-green-400">Continue your application in chat</p>
          )}
        </div>

        {selectedFile && (
          <p className="text-sm text-gray-400 truncate max-w-full">
            {selectedFile.name}
          </p>
        )}
      </div>

      {/* Floating Feedback Widget */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setShowFeedbackModal(true)}
          className="group relative bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <MessageSquare className="w-5 h-5 text-white" />
          <span className="absolute left-full ml-4 px-3 py-1.5 bg-white text-gray-800 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Share Feedback
          </span>
        </button>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full animate-slideUp">
            <h3 className="text-xl font-semibold text-white mb-4">Help Us Improve</h3>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  How can we make this better?
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full bg-gray-700 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={4}
                  placeholder="Share your thoughts..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="To receive updates about changes"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}