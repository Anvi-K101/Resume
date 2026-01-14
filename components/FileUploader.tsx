
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

interface FileUploaderProps {
  onFileProcessed: (file: File) => void;
  isProcessing: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileProcessed, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcess(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndProcess(e.target.files[0]);
    }
  };

  const validateAndProcess = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (validTypes.includes(file.type) || file.name.endsWith('.docx') || file.name.endsWith('.pdf') || file.name.endsWith('.txt')) {
      setError(null);
      onFileProcessed(file);
    } else {
      setError("Unsupported file format. Please upload PDF, DOCX, or TXT.");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div 
        className={`relative border-2 border-dashed rounded-xl p-10 transition-all duration-200 flex flex-col items-center justify-center text-center
          ${dragActive ? 'border-black bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'}
          ${isProcessing ? 'opacity-50 pointer-events-none' : 'opacity-100'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          id="file-upload" 
          className="hidden" 
          accept=".pdf,.docx,.txt"
          onChange={handleChange}
        />
        
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-gray-400 animate-spin mb-4" />
            <p className="text-lg font-medium text-gray-700">Analyzing your document...</p>
            <p className="text-sm text-gray-500 mt-1">Our AI is extracting your professional details.</p>
          </div>
        ) : (
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Upload className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Upload your LinkedIn PDF or Resume</h3>
            <p className="text-gray-500 mb-6 max-w-xs">Drag and drop your file here, or click to browse. Supports PDF, DOCX, and TXT.</p>
            <span className="px-6 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Select File
            </span>
          </label>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg border border-red-100">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'LinkedIn Profile', desc: 'Save as PDF' },
          { label: 'Existing CV', desc: 'Any format' },
          { label: 'Raw Experience', desc: 'Plain text notes' }
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-lg">
            <CheckCircle className="w-5 h-5 text-gray-300 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-800">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
