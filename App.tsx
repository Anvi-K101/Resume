
import React, { useState } from 'react';
import { Download, RefreshCw, FileCheck, ArrowLeft, Briefcase, AlertTriangle, Loader2 } from 'lucide-react';
import FileUploader from './components/FileUploader';
import EditorPanel from './components/EditorPanel';
import ResumePreview from './components/ResumePreview';
import { ResumeData, ResumeStyle } from './types';
import { INITIAL_RESUME_DATA, INITIAL_STYLE } from './constants';
import { parseResumeFile } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'upload' | 'editor'>('upload');
  const [data, setData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [style, setStyle] = useState<ResumeStyle>(INITIAL_STYLE);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileProcessed = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    try {
      const parsedData = await parseResumeFile(file);
      setData(parsedData);
      setView('editor');
    } catch (error: any) {
      console.error("Failed to parse file:", error);
      setError("AI analysis failed. This can happen with large files or network issues. You can still create your resume manually by clicking 'Start Manually' below.");
    } finally {
      setIsProcessing(false);
    }
  };

  const startManually = () => {
    setData({
      ...INITIAL_RESUME_DATA,
      personalInfo: { ...INITIAL_RESUME_DATA.personalInfo, fullName: "Your Name", email: "email@example.com", summary: "Brief overview..." },
      experience: [],
      education: [],
      skills: [],
      certifications: []
    });
    setView('editor');
  };

  const handleExportPDF = () => {
    window.print();
  };

  const startOver = () => {
    if (window.confirm("Are you sure? All unsaved changes will be lost.")) {
      setView('upload');
      setData(INITIAL_RESUME_DATA);
      setError(null);
    }
  };

  if (view === 'upload') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-between p-6 bg-[#fcfcfc] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="max-w-4xl w-full flex-1 flex flex-col justify-center">
          <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-black text-white rounded-[2rem] mb-8 shadow-2xl shadow-black/20 ring-8 ring-gray-50">
              <Briefcase className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-6 uppercase italic">Elite Career Builder</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Turn your existing LinkedIn profile or CV into a high-performance, ATS-optimized resume in seconds.
            </p>
          </header>

          <div className="relative">
            <FileUploader onFileProcessed={handleFileProcessed} isProcessing={isProcessing} />
            
            {error && (
              <div className="mt-8 p-6 bg-red-50 border-2 border-red-100 rounded-2xl flex flex-col items-center text-center max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4">
                <AlertTriangle className="w-10 h-10 text-red-500 mb-3" />
                <h3 className="font-black uppercase tracking-widest text-red-900 mb-2">Extraction Error</h3>
                <p className="text-red-700 text-sm mb-6 font-medium leading-relaxed">{error}</p>
                <div className="flex gap-4">
                  <button 
                    onClick={startManually}
                    className="px-6 py-3 bg-red-100 text-red-900 font-black uppercase tracking-widest text-xs rounded-xl hover:bg-red-200 transition-all"
                  >
                    Start Manually
                  </button>
                  <button 
                    onClick={() => setError(null)}
                    className="px-6 py-3 bg-white border-2 border-red-100 text-red-900 font-black uppercase tracking-widest text-xs rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
            
            {!isProcessing && !error && (
               <div className="mt-8 text-center">
                  <button 
                    onClick={startManually}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 hover:text-black transition-all flex items-center justify-center gap-2 mx-auto"
                  >
                    Skip to manual editor <ArrowLeft className="w-3 h-3 rotate-180" />
                  </button>
               </div>
            )}
          </div>

          <footer className="mt-20 pt-12 border-t border-gray-100 flex justify-center gap-16 text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] no-print">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              ATS Optimized
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              Gemini 3.0 Pro
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              Corporate Ready
            </div>
          </footer>
        </div>
        <footer className="py-10 text-xs font-black tracking-[0.4em] text-gray-300 uppercase no-print flex flex-col items-center gap-4">
          <div className="h-px w-12 bg-gray-100 mb-4"></div>
          Made by Anvi
        </footer>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 font-['Inter',sans-serif]">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-30 no-print shadow-sm">
        <div className="flex items-center gap-6">
          <button 
            onClick={startOver}
            className="group flex items-center gap-2 p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-black transition-all"
            title="Return to home"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Exit</span>
          </button>
          <div className="h-6 w-px bg-gray-100"></div>
          <h2 className="text-xs font-black tracking-[0.2em] uppercase flex items-center gap-3">
            <div className="bg-black text-white p-1.5 rounded-lg shadow-lg shadow-black/10">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
            Elite Resume Canvas
          </h2>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-3 text-[10px] font-black text-gray-300 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
            Cloud Synced
          </div>
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-3 bg-black text-white px-8 py-3 rounded-xl text-xs font-black hover:bg-gray-800 transition-all shadow-xl shadow-black/10 uppercase tracking-widest transform active:scale-95"
          >
            <Download className="w-4 h-4" /> Save as PDF
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="no-print">
          <EditorPanel 
            data={data} 
            setData={setData} 
            style={style} 
            setStyle={setStyle} 
          />
        </div>
        
        <div className="flex-1 overflow-y-auto bg-gray-50 p-12 scrollbar-hide relative">
          <div className="max-w-[850px] mx-auto pb-20">
            <div className="mb-6 flex justify-between items-center text-[9px] text-gray-400 font-black uppercase tracking-[0.4em] px-4 no-print">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                Live View
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3 h-3 animate-spin-slow text-black" />
                Processing Updates
              </div>
            </div>
            
            <div className="relative group">
               <div className="absolute -inset-4 bg-black/5 rounded-2xl blur-2xl group-hover:bg-black/10 transition-all -z-10 no-print"></div>
               <ResumePreview data={data} style={style} />
            </div>

            <div className="mt-16 text-center text-gray-300 text-[10px] font-black uppercase tracking-[0.4em] no-print flex flex-col items-center gap-4">
               <div className="w-8 h-px bg-gray-200"></div>
               Made by Anvi • ResuMaster AI 2025
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; background: white !important; }
          #resume-document, #resume-document * { visibility: visible; }
          #resume-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print { display: none !important; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
