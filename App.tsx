
import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, ArrowLeft, Briefcase, AlertTriangle } from 'lucide-react';
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
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const simulateProgress = () => {
    setProgress(0);
    return setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) return prev;
        // Progress curve: fast start, slows down as it approaches 100
        const increment = prev < 30 ? 5 : (prev < 70 ? 1.5 : (prev < 90 ? 0.5 : 0.1));
        return Math.min(prev + increment, 98);
      });
    }, 150);
  };

  const handleFileProcessed = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setProgress(0);
    const intervalId = simulateProgress();
    
    try {
      const parsedData = await parseResumeFile(file);
      clearInterval(intervalId);
      setProgress(100);
      
      // Using a short delay to let the user see the "100%" state before transition
      setTimeout(() => {
        setData(parsedData);
        setView('editor');
        setIsProcessing(false);
      }, 400);
    } catch (err: any) {
      clearInterval(intervalId);
      console.error("Processing Error:", err);
      setError(err.message || "Something went wrong during analysis. Please try a different file.");
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const startManually = () => {
    setData({
      personalInfo: { fullName: "", email: "", phone: "", location: "", summary: "" },
      experience: [],
      education: [],
      skills: [],
      certifications: [],
      awards: []
    });
    setView('editor');
  };

  const handleExportPDF = () => {
    window.print();
  };

  const startOver = () => {
    if (window.confirm("Return to home? Unsaved changes will be lost.")) {
      setView('upload');
      setData(INITIAL_RESUME_DATA);
      setError(null);
      setProgress(0);
      setIsProcessing(false);
    }
  };

  if (view === 'upload') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-between p-6 bg-[#fcfcfc] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="max-w-4xl w-full flex-1 flex flex-col justify-center">
          <header className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-black text-white rounded-[2.5rem] mb-10 shadow-2xl shadow-black/20 ring-8 ring-gray-50/50">
              <Briefcase className="w-12 h-12" />
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-gray-900 mb-6 uppercase italic">Elite Career Engine</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-bold tracking-tight">
              AI-driven resume synthesis. We extract every professional milestone from your existing profile with surgical precision.
            </p>
          </header>

          <div className="relative">
            <FileUploader 
              onFileProcessed={handleFileProcessed} 
              isProcessing={isProcessing} 
              progress={progress}
            />
            
            {error && (
              <div className="mt-8 p-8 bg-red-50 border-2 border-red-100 rounded-[2.5rem] flex flex-col items-center text-center max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-6">
                <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="font-black uppercase tracking-widest text-red-900 mb-2">Analysis Failed</h3>
                <p className="text-red-700 text-sm mb-8 font-medium leading-relaxed">{error}</p>
                <div className="flex gap-4">
                  <button onClick={startManually} className="px-8 py-4 bg-red-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-red-800 transition-all shadow-lg">Start Manually</button>
                  <button onClick={() => setError(null)} className="px-8 py-4 bg-white border-2 border-red-100 text-red-900 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-gray-50 transition-all">Retry Upload</button>
                </div>
              </div>
            )}
            
            {!isProcessing && !error && (
               <div className="mt-10 text-center">
                  <button 
                    onClick={startManually}
                    className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 hover:text-black transition-all flex items-center justify-center gap-3 mx-auto group"
                  >
                    Start with a blank canvas <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            )}
          </div>

          <footer className="mt-24 pt-12 border-t border-gray-100 flex justify-center gap-20 text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] no-print">
            <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-black"></div>Zero Omission</div>
            <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-black"></div>Gemini Flash</div>
            <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-black"></div>ATS Ready</div>
          </footer>
        </div>
        <footer className="py-12 text-xs font-black tracking-[0.5em] text-gray-300 uppercase no-print flex flex-col items-center gap-4">
          <div className="h-px w-16 bg-gray-100 mb-4"></div>
          Made by Anvi
        </footer>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 font-['Inter',sans-serif]">
      {/* Header */}
      <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 shrink-0 z-30 no-print">
        <div className="flex items-center gap-8">
          <button 
            onClick={startOver}
            className="group flex items-center gap-3 p-3 hover:bg-gray-50 rounded-2xl text-gray-400 hover:text-black transition-all"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden md:inline">Exit Engine</span>
          </button>
          <div className="h-8 w-px bg-gray-100"></div>
          <h2 className="text-xs font-black tracking-[0.3em] uppercase flex items-center gap-4">
            <div className="bg-black text-white p-2.5 rounded-2xl shadow-2xl shadow-black/20">
              <Briefcase className="w-4 h-4" />
            </div>
            Elite Resume Canvas
          </h2>
        </div>

        <div className="flex items-center gap-10">
          <div className="hidden lg:flex items-center gap-4 text-[10px] font-black text-gray-300 tracking-[0.2em] uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]"></span>
            Analysis Complete
          </div>
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-3 bg-black text-white px-10 py-4 rounded-[1.25rem] text-[10px] font-black hover:bg-gray-800 transition-all shadow-2xl shadow-black/10 uppercase tracking-[0.2em] transform active:scale-95"
          >
            <Download className="w-4 h-4" /> Export Document
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="no-print h-full shadow-2xl z-20">
          <EditorPanel 
            data={data} 
            setData={setData} 
            style={style} 
            setStyle={setStyle} 
          />
        </div>
        
        <div className="flex-1 overflow-y-auto bg-gray-50 p-16 scrollbar-hide relative">
          <div className="max-w-[850px] mx-auto pb-32">
            <div className="mb-8 flex justify-between items-center text-[9px] text-gray-400 font-black uppercase tracking-[0.5em] px-6 no-print">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                Canvas Preview
              </div>
              <div className="flex items-center gap-3 text-black">
                <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                Auto-Updating
              </div>
            </div>
            
            <div className="relative group">
               <div className="absolute -inset-6 bg-black/[0.03] rounded-[3rem] blur-3xl group-hover:bg-black/[0.06] transition-all -z-10 no-print"></div>
               <ResumePreview data={data} style={style} />
            </div>

            <div className="mt-20 text-center text-gray-300 text-[10px] font-black uppercase tracking-[0.5em] no-print flex flex-col items-center gap-6">
               <div className="w-12 h-px bg-gray-200"></div>
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
            position: absolute; left: 0; top: 0; width: 100%;
            box-shadow: none !important; border: none !important;
            margin: 0 !important; padding: 0 !important;
          }
          .no-print { display: none !important; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </div>
  );
};

export default App;
