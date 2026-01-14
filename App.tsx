
import React, { useState } from 'react';
import { 
  Download, 
  RefreshCw, 
  ArrowLeft, 
  Briefcase, 
  AlertTriangle, 
  Code, 
  Play, 
  User, 
  Database, 
  Box, 
  TrendingUp, 
  DollarSign, 
  PenTool 
} from 'lucide-react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import FileUploader from './components/FileUploader';
import EditorPanel from './components/EditorPanel';
import ResumePreview from './components/ResumePreview';
import { ResumeData, ResumeStyle, CareerFocus } from './types';
import { INITIAL_RESUME_DATA, INITIAL_STYLE } from './constants';
import { parseResumeFile } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'upload' | 'editor'>('upload');
  const [careerFocus, setCareerFocus] = useState<CareerFocus>('general');
  const [data, setData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [style, setStyle] = useState<ResumeStyle>(INITIAL_STYLE);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const simulateProgress = () => {
    setProgress(0);
    return setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) return prev;
        const increment = prev < 30 ? 6 : (prev < 70 ? 2 : (prev < 90 ? 0.6 : 0.1));
        return Math.min(prev + increment, 98);
      });
    }, 120);
  };

  const handleFileProcessed = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setProgress(0);
    const intervalId = simulateProgress();
    
    try {
      const parsedData = await parseResumeFile(file, careerFocus);
      clearInterval(intervalId);
      setProgress(100);
      
      setTimeout(() => {
        setData(parsedData);
        setView('editor');
        setIsProcessing(false);
      }, 400);
    } catch (err: any) {
      clearInterval(intervalId);
      setError(err.message || "Something went wrong during analysis.");
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
      projects: [],
      certifications: [],
      awards: []
    });
    setView('editor');
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('resume-document');
    if (!element) return;

    setIsDownloading(true);

    // Ultra-high fidelity settings for a professional finish
    const opt = {
      margin: 0,
      filename: `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Professional_Resume.pdf`,
      image: { type: 'jpeg' as const, quality: 1.0 },
      html2canvas: { 
        scale: 3, // Very high scale for crisp typography and lines
        useCORS: true, 
        letterRendering: true,
        scrollY: 0,
        windowWidth: 816, // Pins rendering precisely to the resume container's width
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'in' as const, format: 'a4' as const, orientation: 'portrait' as const, compress: true },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] as const }
    };

    try {
      // 800ms delay ensures complex layouts and external font weights are fully rendered
      await new Promise(resolve => setTimeout(resolve, 800));
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Professional export failed. Please try again.");
    } finally {
      setIsDownloading(false);
    }
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
        <div className="max-w-4xl w-full flex-1 flex flex-col justify-center py-12">
          <header className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-black text-white rounded-[2rem] mb-6 shadow-2xl shadow-black/20 ring-8 ring-gray-50/50 transform hover:scale-105 transition-transform cursor-default">
              <Briefcase className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-4 uppercase italic">Elite Career Engine</h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed font-bold tracking-tight">
              AI-driven synthesis for high-performance resumes.
            </p>
          </header>

          <div className="max-w-3xl mx-auto w-full mb-12">
             <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-6 text-center">Step 1: Choose Your Career Path</label>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'general', label: 'General', icon: <User className="w-4 h-4" /> },
                  { id: 'developer', label: 'Software', icon: <Code className="w-4 h-4" /> },
                  { id: 'data', label: 'Data', icon: <Database className="w-4 h-4" /> },
                  { id: 'product', label: 'Product', icon: <Box className="w-4 h-4" /> },
                  { id: 'marketing', label: 'Marketing', icon: <TrendingUp className="w-4 h-4" /> },
                  { id: 'sales', label: 'Sales', icon: <DollarSign className="w-4 h-4" /> },
                  { id: 'design', label: 'Creative', icon: <PenTool className="w-4 h-4" /> },
                  { id: 'creator', label: 'Creator', icon: <Play className="w-4 h-4" /> }
                ].map((focus) => (
                  <button
                    key={focus.id}
                    onClick={() => setCareerFocus(focus.id as CareerFocus)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all group ${careerFocus === focus.id ? 'border-black bg-black text-white shadow-xl scale-105 z-10' : 'border-gray-100 bg-white hover:border-gray-300 text-gray-400 hover:text-gray-900'}`}
                  >
                    <div className={`p-2 rounded-lg transition-colors ${careerFocus === focus.id ? 'bg-white/10' : 'bg-gray-50 group-hover:bg-gray-100'}`}>
                      {focus.icon}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest">{focus.label}</span>
                  </button>
                ))}
             </div>
          </div>

          <div className="relative">
            <div className="mb-6 text-center">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Step 2: Upload Your History</label>
            </div>
            <FileUploader 
              onFileProcessed={handleFileProcessed} 
              isProcessing={isProcessing} 
              progress={progress}
            />
            
            {error && (
              <div className="mt-8 p-8 bg-red-50 border-2 border-red-100 rounded-[2.5rem] flex flex-col items-center text-center max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-6">
                <AlertTriangle className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="font-black uppercase tracking-widest text-red-900 mb-2">Analysis Failed</h3>
                <p className="text-red-700 text-sm mb-8 font-medium leading-relaxed">{error}</p>
                <div className="flex gap-4">
                  <button onClick={startManually} className="px-8 py-4 bg-red-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-red-800 transition-all shadow-lg">Start Manually</button>
                  <button onClick={() => setError(null)} className="px-8 py-4 bg-white border-2 border-red-100 text-red-900 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-gray-50 transition-all">Retry</button>
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

          <footer className="mt-20 pt-10 border-t border-gray-100 flex justify-center gap-16 text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] no-print">
            <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-black"></div>Full Data Capture</div>
            <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-black"></div>Role Optimized</div>
            <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-black"></div>ATS Compliant</div>
          </footer>
        </div>
        <footer className="py-8 text-xs font-black tracking-[0.5em] text-gray-300 uppercase no-print flex flex-col items-center gap-4">
          <div className="h-px w-12 bg-gray-100 mb-2"></div>
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
            Analysis: {careerFocus.toUpperCase()}
          </div>
          <button 
            onClick={handleExportPDF}
            disabled={isDownloading}
            className={`flex items-center gap-3 bg-black text-white px-10 py-4 rounded-[1.25rem] text-[10px] font-black hover:bg-gray-800 transition-all shadow-2xl shadow-black/10 uppercase tracking-[0.2em] transform active:scale-95 ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isDownloading ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /> Finalizing PDF...</>
            ) : (
              <><Download className="w-4 h-4" /> Download PDF</>
            )}
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
          @page {
            size: A4;
            margin: 0;
          }
          html, body {
            height: auto;
            background: white !important;
            margin: 0;
            padding: 0;
            width: 100%;
          }
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
