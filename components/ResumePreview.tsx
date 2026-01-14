
import React from 'react';
import { ResumeData, ResumeStyle, ResumeLayout } from '../types';
import { FONT_SIZES } from '../constants';
import { ExternalLink, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  style: ResumeStyle;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, style }) => {
  const { personalInfo, experience, education, skills, awards, certifications, projects } = data;
  const fontClass = `font-['${style.font}',sans-serif]`;
  const size = FONT_SIZES[style.fontSize];

  // Optimized spacing for professional density and page-count control
  const sectionSpacing = `${style.sectionSpacing * 0.55}rem`;
  const contentSpacing = `${style.sectionSpacing * 0.4}rem`;

  const textStyle = {
    lineHeight: style.lineSpacing,
    color: '#374151' // slate-700
  };

  const renderSectionHeader = (title: string, isSidebar: boolean = false) => (
    <div className={`mb-3 border-b pb-1 flex items-center justify-between`} style={{ borderColor: `${style.accentColor}25` }}>
      <h2 
        className={`font-black uppercase tracking-[0.2em] ${isSidebar ? 'text-[9px]' : size.h2}`} 
        style={{ color: style.accentColor }}
      >
        {title}
      </h2>
    </div>
  );

  const renderStandard = () => (
    <div className={`p-10 bg-white min-h-[1120px] print:min-h-0 print:p-8 shadow-sm print:shadow-none ${fontClass} ${size.base}`}>
      <header className="mb-8 text-center border-b pb-6 border-gray-100">
        <h1 className={`${size.h1} font-black tracking-tighter uppercase italic mb-3`} style={{ color: style.accentColor }}>
          {personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          {personalInfo.email && <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1.5 text-black"><Linkedin className="w-3 h-3" /> {personalInfo.linkedin}</span>}
        </div>
      </header>
      
      {personalInfo.summary && (
        <section style={{ marginBottom: sectionSpacing }} className="print:break-inside-avoid">
          {renderSectionHeader("Executive Summary")}
          <p className="leading-relaxed text-[13px] font-medium" style={textStyle}>{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: sectionSpacing }}>
          {renderSectionHeader("Professional Experience")}
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`${size.h3} font-black uppercase tracking-tight`} style={{ color: style.accentColor }}>{exp.position}</h3>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-bold text-gray-900 text-[13px]">{exp.company}</span>
                  <span className="text-[10px] text-gray-400 italic font-medium">{exp.location}</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-[12.5px]" style={textStyle}>
                  {exp.description.map((bullet, idx) => bullet.trim() && (
                    <li key={idx} className="pl-1">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section style={{ marginBottom: sectionSpacing }}>
          {renderSectionHeader("Key Projects")}
          <div className="grid grid-cols-1 gap-4">
            {projects.map((proj) => (
              <div key={proj.id} className="print:break-inside-avoid p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                   <h3 className="font-black text-sm uppercase tracking-tight" style={{ color: style.accentColor }}>{proj.name}</h3>
                   {proj.link && (
                     <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-1">
                       View Project <ExternalLink className="w-2.5 h-2.5" />
                     </a>
                   )}
                </div>
                <p className="text-[12px] font-medium leading-relaxed" style={textStyle}>{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-10 mt-6 pt-6 border-t border-gray-50">
        {education.length > 0 && (
          <section className="print:break-inside-avoid">
            {renderSectionHeader("Education")}
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-black text-gray-900 text-[13px] uppercase tracking-tight">{edu.institution}</h3>
                  <p className="text-gray-500 font-bold text-xs italic">{edu.degree}</p>
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section className="print:break-inside-avoid">
            {renderSectionHeader("Expertise")}
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id} className="text-xs">
                  <span className="font-black text-black block mb-1 uppercase tracking-widest text-[10px]" style={{ color: style.accentColor }}>{skill.category}</span>
                  <span className="text-gray-600 font-medium leading-relaxed">{skill.items.join(' • ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  const renderSidebar = () => (
    <div 
      className={`relative flex bg-white min-h-[1120px] print:min-h-0 shadow-sm print:shadow-none ${fontClass} ${size.base}`}
      style={{
        // Persistent background for PDF generation across multiple pages
        background: `linear-gradient(to right, #f9fafb 0%, #f9fafb 280px, #ffffff 280px, #ffffff 100%)`
      }}
    >
      {/* Sidebar Section */}
      <aside className="w-[280px] p-10 print:p-8 flex flex-col shrink-0 gap-8 z-10 relative">
        <div className="mb-4">
          <h1 className="text-2xl font-black mb-6 tracking-tighter leading-none uppercase italic" style={{ color: style.accentColor }}>
            {personalInfo.fullName}
          </h1>
          <div className="space-y-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            {personalInfo.email && <div className="break-all flex flex-col gap-1"><span className="text-[8px] text-gray-400">Email</span><span className="text-black">{personalInfo.email}</span></div>}
            {personalInfo.phone && <div className="flex flex-col gap-1"><span className="text-[8px] text-gray-400">Phone</span><span className="text-black">{personalInfo.phone}</span></div>}
            {personalInfo.location && <div className="flex flex-col gap-1"><span className="text-[8px] text-gray-400">Location</span><span className="text-black">{personalInfo.location}</span></div>}
            {personalInfo.linkedin && <div className="break-all flex flex-col gap-1"><span className="text-[8px] text-gray-400">LinkedIn</span><span className="text-black border-b border-gray-200 pb-0.5">{personalInfo.linkedin}</span></div>}
            {personalInfo.website && <div className="break-all flex flex-col gap-1"><span className="text-[8px] text-gray-400">Portfolio</span><span className="text-blue-600 lowercase tracking-normal font-medium">{personalInfo.website}</span></div>}
          </div>
        </div>

        {projects.length > 0 && (
          <div className="print:break-inside-avoid">
            {renderSectionHeader("Portfolio", true)}
            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.id} className="mb-2">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <p className="text-[11px] font-black text-gray-900 uppercase tracking-tight">{proj.name}</p>
                    {proj.link && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-600 font-medium leading-relaxed mb-2">{proj.description}</p>
                  {proj.link && (
                    <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-[8px] text-blue-600 block break-all font-black uppercase tracking-tighter hover:underline bg-blue-50/50 p-1 px-1.5 rounded border border-blue-100/50">
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div className="print:break-inside-avoid">
            {renderSectionHeader("Expertise", true)}
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-[9px] font-black text-black mb-1.5 uppercase tracking-widest">{skill.category}</p>
                  <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{skill.items.join(' • ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(awards?.length || 0) > 0 && (
          <div className="print:break-inside-avoid">
            {renderSectionHeader("Honors", true)}
            <ul className="space-y-3">
              {awards?.map((award, idx) => award.trim() && (
                <li key={idx} className="text-[10px] text-gray-600 font-medium leading-tight flex gap-2 items-start">
                   <div className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: style.accentColor }}></div>
                   <span>{award}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {education.length > 0 && (
          <div className="print:break-inside-avoid mt-auto pt-6 border-t border-gray-100">
            {renderSectionHeader("Education", true)}
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-[11px] font-black text-gray-900 uppercase tracking-tight">{edu.institution}</p>
                  <p className="text-[9px] text-gray-400 font-bold italic mb-1">{edu.degree}</p>
                  <p className="text-[8px] text-gray-400 font-black uppercase tracking-tighter">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Body */}
      <main className="flex-1 p-12 print:p-10 flex flex-col min-h-full bg-white relative z-10">
        {personalInfo.summary && (
          <section className="mb-8 print:break-inside-avoid">
            {renderSectionHeader("Executive Synthesis")}
            <p className="text-gray-700 leading-relaxed text-[13.5px] font-medium" style={textStyle}>{personalInfo.summary}</p>
          </section>
        )}

        <section className="mb-8 flex-1">
          {renderSectionHeader("Career Trajectory")}
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-black text-base uppercase tracking-tight" style={{ color: style.accentColor }}>{exp.position}</h4>
                    <p className="text-[13px] text-gray-800 font-bold mt-0.5">{exp.company}</p>
                  </div>
                  <span className="text-[9px] font-black text-gray-400 shrink-0 ml-4 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded border border-gray-100">{exp.startDate} – {exp.endDate}</span>
                </div>
                <ul className="list-disc ml-5 space-y-1.5 text-gray-600 text-[12.5px] font-medium" style={textStyle}>
                  {exp.description.map((bullet, idx) => bullet.trim() && (
                    <li key={idx} className="print:break-inside-avoid pl-1">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {(certifications?.length || 0) > 0 && (
          <section className="print:break-inside-avoid pt-6 border-t border-gray-100 mt-6">
            {renderSectionHeader("Professional Credentials")}
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {certifications?.map((cert, idx) => cert.trim() && (
                <div key={idx} className="text-[10px] text-gray-900 font-black uppercase tracking-widest px-3 py-1.5 bg-gray-50/50 rounded-lg border border-gray-200/50 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: style.accentColor }}></div>
                   {cert}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );

  return (
    <div 
      id="resume-document" 
      className={`mx-auto bg-white shadow-2xl rounded-sm overflow-hidden w-full max-w-[816px] border border-gray-100 print:w-full print:max-w-none print:border-none print:rounded-none ${fontClass}`}
    >
      <div className="h-full">
        {style.layout === ResumeLayout.STANDARD && renderStandard()}
        {style.layout === ResumeLayout.SIDEBAR && renderSidebar()}
        {style.layout === ResumeLayout.MINIMAL && renderStandard()}
      </div>
      <style>{`
        #resume-document {
          position: relative;
          box-sizing: border-box;
          /* Ensure we don't bleed beyond reasonable page limits */
          max-height: 4400px;
          overflow: hidden;
        }
        section {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        li {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        @media print {
          #resume-document {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Fix for html2pdf to handle sidebar background correctly */
          .relative.flex.bg-white {
            background-color: transparent !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;
