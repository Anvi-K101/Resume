
import React, { useState } from 'react';
import { Upload, CheckCircle, Loader2, AlertCircle, FileText } from 'lucide-react';

interface FileUploaderProps {
  onFileProcessed: (file: File) => void;
  isProcessing: boolean;
  progress: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileProcessed, isProcessing, progress }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) validateAndProcess(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) validateAndProcess(e.target.files[0]);
  };

  const validateAndProcess = (file: File) => {
    const validExts = ['.pdf', '.docx', '.txt'];
    const fileName = file.name.toLowerCase();
    if (validExts.some(ext => fileName.endsWith(ext))) {
      setError(null);
      onFileProcessed(file);
    } else {
      setError("Please upload a PDF, DOCX, or TXT file.");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div 
        className={`relative border-2 border-dashed rounded-[2rem] p-12 transition-all duration-300 flex flex-col items-center justify-center text-center
          ${dragActive ? 'border-black bg-gray-50 scale-[1.02]' : 'border-gray-200 bg-white shadow-sm'}
          ${isProcessing ? 'pointer-events-none' : 'hover:border-gray-400 hover:shadow-md cursor-pointer'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input type="file" id="file-upload" className="hidden" accept=".pdf,.docx,.txt" onChange={handleChange} />
        
        {isProcessing ? (
          <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in duration-500">
            <div className="relative mb-6">
               <Loader2 className="w-16 h-16 text-black animate-spin opacity-10" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-black text-black">{Math.round(progress)}%</span>
               </div>
            </div>
            <h3 className="text-xl font-black uppercase tracking-widest text-gray-900 mb-2 italic">Scanning Document</h3>
            <p className="text-sm text-gray-500 font-medium mb-8">Capturing your career trajectory...</p>
            
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2 shadow-inner">
               <div 
                 className="h-full bg-black transition-all duration-300 ease-out"
                 style={{ width: `${progress}%` }}
               />
            </div>
            <div className="flex justify-between w-full text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
               <span>Reading Bits</span>
               <span>Extracting Data</span>
            </div>
          </div>
        ) : (
          <label htmlFor="file-upload" className="cursor-pointer w-full flex flex-col items-center">
            <div className="bg-black text-white p-5 rounded-3xl mb-6 shadow-xl shadow-black/10 transition-transform hover:scale-110">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2 uppercase italic tracking-tight">Drop your profile here</h3>
            <p className="text-gray-400 mb-8 max-w-xs text-sm font-medium">LinkedIn PDF, modern CV, or raw text files accepted.</p>
            <span className="px-10 py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-lg active:scale-95">
              Select File
            </span>
          </label>
        )}

        {error && (
          <div className="mt-6 flex items-center gap-3 text-red-600 bg-red-50 px-6 py-3 rounded-2xl border border-red-100 animate-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-wider">{error}</span>
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Deep Scanning', desc: 'Captures every role' },
          { label: 'Smart Parsing', desc: 'No detail left behind' },
          { label: 'Job Ready', desc: 'Immediate export' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
            <CheckCircle className="w-6 h-6 text-black mb-3" />
            <p className="text-xs font-black text-gray-900 uppercase tracking-widest mb-1">{item.label}</p>
            <p className="text-[10px] text-gray-400 font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
