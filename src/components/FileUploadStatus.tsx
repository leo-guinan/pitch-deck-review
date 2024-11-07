import React from 'react';
import { CheckCircle, Loader, XCircle } from 'lucide-react';

interface FileUploadStatusProps {
  file: File | null;
  status: 'ready' | 'uploading' | 'success' | 'error';
  onUpload: () => void;
  onCancel: () => void;
}

export default function FileUploadStatus({ file, status, onUpload, onCancel }: FileUploadStatusProps) {
  if (!file) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {status === 'uploading' && <Loader className="w-5 h-5 text-blue-400 animate-spin" />}
          {status === 'success' && <CheckCircle className="w-5 h-5 text-green-400" />}
          {status === 'error' && <XCircle className="w-5 h-5 text-red-400" />}
          {status === 'ready' && <div className="w-5 h-5 rounded-full bg-gray-600" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-200 break-all line-clamp-2">
            {file.name}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>

      {status === 'ready' && (
        <div className="flex gap-2">
          <button
            onClick={onUpload}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Upload
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}