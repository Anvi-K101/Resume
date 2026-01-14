
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
        if (prev >= 99) return prev;
        const increment = prev < 40 ? 4 : (prev < 80 ? 1 : (prev < 95 ? 0.3 : 0.05));
        return Math.min(prev + increment, 99);
      });
    }, 100);
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
      }, 500);
    } catch (err: any) {
      clearInterval(intervalId);
      setError(err.message || "The AI engine encountered an issue while synthesizing your career data. Please try again or start with a blank canvas.");
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const startManually = () => {
    setData({
      personalInfo: { fullName: "Your Full Name", email: "", phone: "", location: "", summary: "" },
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

    // Optimized settings for High Fidelity Multi-Page Output
    const opt = {
      margin: 0,
      filename: `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume_ResuMaster.pdf`,
      image: { type: 'jpeg' as const, quality: 1.0 },
      html2canvas: { 
        scale: 3, // Premium sharpness for printing
        useCORS: true, 
        letterRendering: true,
        scrollY: 0,
        windowWidth: 816, // Pins to standard 8.5" width at 96dpi
        backgroundColor: '#ffffff',
        logging: false
      },
      jsPDF: { 
        unit: 'in' as const, 
        format: 'a4' as const, 
        orientation: 'portrait' as const, 
        compress: true,
        putOnlyUsedFonts: true
      },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'] as const,
        before: '.page-break-before'
      }
    };

    try {
      // Allow DOM to settle and images to be fully buffered
      await new Promise(resolve => setTimeout(resolve, 800));
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF Export failed:", err);
      alert("Elite synthesis failed during export. Please try using a different layout or font size.");
    } finally {
      setIsDownloading(false);
    }
  };

  const startOver = () => {
    if (window.confirm("Return to home? Current synthesis will be lost unless exported.")) {
      setView('upload');
      setData(INITIAL_RESUME_DATA);
      setError(null);
      setProgress(0);
      setIsProcessing(false);
    }
  };

  if (view === 'upload') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-between p-8 bg-[#fcfcfc] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]">
        <div className="max-w-4xl w-full flex-1 flex flex-col justify-center py-16">
          <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-black text-white rounded-[2.5rem] mb-8 shadow-2xl shadow-black/30 ring-8 ring-gray-100/50 transform hover:scale-105 transition-all cursor-default">
              <Briefcase className="w-12 h-12" />
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-gray-900 mb-6 uppercase italic">Career Engine Elite</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-bold tracking-tight px-4">
              Upload your history. Let the AI synthesize a high-performance, ATS-compliant multi-page resume.
            </p>
          </header>

          <div className="max-w-4xl mx-auto w-full mb-16 px-4">
             <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.5em] mb-8 text-center">I. Select Strategic Focus</label>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { id: 'general', label: 'Executive', icon: <User className="w-5 h-5" /> },
                  { id: 'developer', label: 'Engineering', icon: <Code className="w-5 h-5" /> },
                  { id: 'data', label: 'Data Science', icon: <Database className="w-5 h-5" /> },
                  { id: 'product', label: 'Product', icon: <Box className="w-5 h-5" /> },
                  { id: 'marketing', label: 'Marketing', icon: <TrendingUp className="w-5 h-5" /> },
                  { id: 'sales', label: 'Sales/BD', icon: <DollarSign className="w-5 h-5" /> },
                  { id: 'design', label: 'UI/UX Design', icon: <PenTool className="w-5 h-5" /> },
                  { id: 'creator', label: 'Media/Content', icon: <Play className="w-5 h-5" /> }
                ].map((focus) => (
                  <button
                    key={focus.id}
                    onClick={() => setCareerFocus(focus.id as CareerFocus)}
                    className={`flex flex-col items-center gap-3 p-5 rounded-[2rem] border-2 transition-all group relative overflow-hidden ${careerFocus === focus.id ? 'border-black bg-black text-white shadow-2xl scale-105 z-10' : 'border-gray-100 bg-white hover:border-gray-400 text-gray-400 hover:text-gray-900 shadow-sm'}`}
                  >
                    <div className={`p-3 rounded-xl transition-colors ${careerFocus === focus.id ? 'bg-white/10' : 'bg-gray-50 group-hover:bg-gray-100'}`}>
                      {focus.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{focus.label}</span>
                  </button>
                ))}
             </div>
          </div>

          <div className="relative px-4">
            <div className="mb-8 text-center">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.5em]">II. Initiate Document Scanning</label>
            </div>
            <FileUploader 
              onFileProcessed={handleFileProcessed} 
              isProcessing={isProcessing} 
              progress={progress}
            />
            
            {error && (
              <div className="mt-10 p-10 bg-red-50 border-2 border-red-100 rounded-[3rem] flex flex-col items-center text-center max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8">
                <AlertTriangle className="w-12 h-12 text-red-500 mb-6" />
                <h3 className="font-black uppercase tracking-widest text-red-900 mb-3 text-lg">Synthesis Interrupted</h3>
                <p className="text-red-700 text-base mb-10 font-medium leading-relaxed max-w-lg">{error}</p>
                <div className="flex gap-6">
                  <button onClick={startManually} className="px-10 py-5 bg-red-900 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-red-800 transition-all shadow-xl active:scale-95">Manual Entry</button>
                  <button onClick={() => setError(null)} className="px-10 py-5 bg-white border-2 border-red-100 text-red-900 font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-gray-50 transition-all shadow-md">Retry Scan</button>
                </div>
              </div>
            )}
            
            {!isProcessing && !error && (
               <div className="mt-12 text-center">
                  <button 
                    onClick={startManually}
                    className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-300 hover:text-black transition-all flex items-center justify-center gap-4 mx-auto group"
                  >
                    Bypass AI - Start Blank <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-2 transition-transform" />
                  </button>
               </div>
            )}
          </div>
        </div>
        <footer className="py-10 text-xs font-black tracking-[0.8em] text-gray-300 uppercase no-print flex flex-col items-center gap-6">
          <div className="h-px w-20 bg-gray-100 mb-2"></div>
          Precision Built by Anvi
        </footer>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#fafafa] font-['Inter',sans-serif]">
      {/* Dynamic Header */}
      <header className="h-24 bg-white border-b border-gray-100 flex items-center justify-between px-12 shrink-0 z-30 no-print shadow-sm">
        <div className="flex items-center gap-10">
          <button 
            onClick={startOver}
            className="group flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl text-gray-400 hover:text-black transition-all"
          >
            <ArrowLeft className="w-7 h-7 group-hover:-translate-x-1.5 transition-transform" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] hidden xl:inline">Return to Hub</span>
          </button>
          <div className="h-10 w-px bg-gray-100"></div>
          <h2 className="text-sm font-black tracking-[0.4em] uppercase flex items-center gap-5">
            <div className="bg-black text-white p-3 rounded-2xl shadow-xl shadow-black/20">
              <Briefcase className="w-5 h-5" />
            </div>
            Elite Resume Canvas
          </h2>
        </div>

        <div className="flex items-center gap-12">
          <div className="hidden lg:flex items-center gap-5 text-[11px] font-black text-gray-300 tracking-[0.3em] uppercase">
            <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.7)]"></span>
            Mode: {careerFocus.toUpperCase()} STRATEGY
          </div>
          <button 
            onClick={handleExportPDF}
            disabled={isDownloading}
            className={`flex items-center gap-4 bg-black text-white px-12 py-5 rounded-[1.5rem] text-[11px] font-black hover:bg-gray-800 transition-all shadow-2xl shadow-black/20 uppercase tracking-[0.3em] transform active:scale-95 ${isDownloading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {isDownloading ? (
              <><RefreshCw className="w-5 h-5 animate-spin" /> Slicing Pages...</>
            ) : (
              <><Download className="w-5 h-5" /> Export PDF</>
            )}
          </button>
        </div>
      </header>

      {/* Workspace */}
      <div className="flex-1 flex overflow-hidden">
        <div className="no-print h-full shadow-[20px_0_40px_-20px_rgba(0,0,0,0.05)] z-20">
          <EditorPanel 
            data={data} 
            setData={setData} 
            style={style} 
            setStyle={setStyle} 
          />
        </div>
        
        <div className="flex-1 overflow-y-auto bg-[#fafafa] p-16 xl:p-24 scrollbar-hide relative">
          <div className="max-w-[816px] mx-auto pb-48">
            <div className="mb-10 flex justify-between items-center text-[10px] text-gray-400 font-black uppercase tracking-[0.6em] px-8 no-print">
              <div className="flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                High-Fidelity Preview
              </div>
              <div className="flex items-center gap-4 text-black bg-white/50 px-4 py-2 rounded-full border border-gray-100 backdrop-blur-sm">
                <RefreshCw className="w-4 h-4 animate-spin-slow" />
                Live Sync Active
              </div>
            </div>
            
            <div className="relative group transition-all duration-700">
               <div className="absolute -inset-10 bg-black/[0.02] rounded-[4rem] blur-3xl group-hover:bg-black/[0.05] transition-all -z-10 no-print"></div>
               <div className="rounded-sm overflow-visible bg-white ring-1 ring-gray-100 shadow-xl">
                  <ResumePreview data={data} style={style} />
               </div>
            </div>

            <div className="mt-24 text-center text-gray-300 text-[11px] font-black uppercase tracking-[0.6em] no-print flex flex-col items-center gap-8">
               <div className="w-16 h-px bg-gray-200"></div>
               Elite Synthesis Engine • ResuMaster AI v2.5
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          html, body {
            height: auto;
            background: white !important;
            margin: 0;
            padding: 0;
            width: 100%;
          }
          .no-print { display: none !important; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        
        /* Custom styling for standard range inputs */
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: 4px solid #fff;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default App;
