
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

  // Dynamic spacing adjusted for visual weight
  const sectionMargin = `${style.sectionSpacing * 0.8}rem`;
  const contentLineHeight = style.lineSpacing;

  const renderSectionHeader = (title: string, isSidebar: boolean = false) => (
    <div className={`mb-3 border-b-2 flex items-center justify-between pb-1`} style={{ borderColor: `${style.accentColor}20` }}>
      <h2 
        className={`font-black uppercase tracking-[0.2em] ${isSidebar ? 'text-[9px]' : size.h2}`} 
        style={{ color: style.accentColor }}
      >
        {title}
      </h2>
    </div>
  );

  const renderStandard = () => (
    <div className={`p-12 bg-white min-h-[1120px] print:min-h-0 print:p-8 shadow-sm print:shadow-none ${fontClass} ${size.base}`}>
      <header className="mb-10 text-center border-b-4 pb-8 border-gray-100">
        <h1 className={`${size.h1} font-black tracking-tighter uppercase italic mb-4`} style={{ color: style.accentColor }}>
          {personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] font-bold text-gray-500 uppercase tracking-[0.25em]">
          {personalInfo.email && <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-2 text-black"><Linkedin className="w-3.5 h-3.5" /> {personalInfo.linkedin}</span>}
        </div>
      </header>
      
      {personalInfo.summary && (
        <section style={{ marginBottom: sectionMargin }} className="print:break-inside-avoid">
          {renderSectionHeader("Executive Summary")}
          <p className="leading-relaxed font-medium text-gray-700 text-[13px]" style={{ lineHeight: contentLineHeight }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: sectionMargin }}>
          {renderSectionHeader("Professional Experience")}
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`${size.h3} font-black uppercase tracking-tight`} style={{ color: style.accentColor }}>{exp.position}</h3>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{exp.startDate} — {exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-3">
                  <span className="font-bold text-gray-900 text-[13px]">{exp.company}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{exp.location}</span>
                </div>
                <ul className="list-disc ml-5 space-y-2 text-[12.5px] text-gray-600" style={{ lineHeight: contentLineHeight }}>
                  {exp.description.map((bullet, idx) => bullet.trim() && (
                    <li key={idx} className="pl-1">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-12 mt-8 pt-8 border-t-2 border-gray-50">
        <div className="space-y-10">
          {education.length > 0 && (
            <section className="print:break-inside-avoid">
              {renderSectionHeader("Academic Foundation")}
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-black text-gray-900 text-[13px] uppercase tracking-tight">{edu.institution}</h3>
                    <p className="text-gray-500 font-bold text-xs italic mt-1">{edu.degree}</p>
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-2">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="print:break-inside-avoid">
              {renderSectionHeader("Technical Ventures")}
              <div className="space-y-6">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                       <h3 className="font-black text-xs uppercase tracking-widest" style={{ color: style.accentColor }}>{proj.name}</h3>
                       {proj.link && (
                         <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-[9px] text-blue-600 font-bold hover:underline flex items-center gap-1">
                           Link <ExternalLink className="w-2.5 h-2.5" />
                         </a>
                       )}
                    </div>
                    <p className="text-[11px] font-medium leading-relaxed text-gray-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-10">
          {skills.length > 0 && (
            <section className="print:break-inside-avoid">
              {renderSectionHeader("Core Expertise")}
              <div className="space-y-5">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-xs">
                    <span className="font-black text-black block mb-2 uppercase tracking-[0.2em] text-[10px]" style={{ color: style.accentColor }}>{skill.category}</span>
                    <span className="text-gray-600 font-medium leading-loose tracking-wide">{skill.items.join(' • ')}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
             <section className="print:break-inside-avoid">
                {renderSectionHeader("Credentials")}
                <ul className="space-y-3">
                   {certifications.map((cert, i) => (
                     <li key={i} className="text-[11px] font-bold text-gray-700 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: style.accentColor }}></div>
                       {cert}
                     </li>
                   ))}
                </ul>
             </section>
          )}
        </div>
      </div>
    </div>
  );

  const renderSidebar = () => (
    <div 
      className={`relative flex bg-white min-h-[1120px] print:min-h-0 shadow-sm print:shadow-none ${fontClass} ${size.base}`}
      style={{
        // Gradient ensures the sidebar background color persists on every page of the PDF
        background: `linear-gradient(to right, #f9fafb 0%, #f9fafb 280px, #ffffff 280px, #ffffff 100%)`
      }}
    >
      <aside className="w-[280px] p-10 print:p-8 flex flex-col shrink-0 gap-10 z-10 relative">
        <div className="mb-4">
          <h1 className="text-3xl font-black mb-8 tracking-tighter leading-none uppercase italic" style={{ color: style.accentColor }}>
            {personalInfo.fullName.split(' ')[0]}<br/>{personalInfo.fullName.split(' ').slice(1).join(' ')}
          </h1>
          <div className="space-y-5 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
            {personalInfo.email && <div className="break-all flex flex-col gap-1.5"><span className="text-[8px] text-gray-400 font-black">Email</span><span className="text-black">{personalInfo.email}</span></div>}
            {personalInfo.phone && <div className="flex flex-col gap-1.5"><span className="text-[8px] text-gray-400 font-black">Phone</span><span className="text-black">{personalInfo.phone}</span></div>}
            {personalInfo.location && <div className="flex flex-col gap-1.5"><span className="text-[8px] text-gray-400 font-black">Location</span><span className="text-black">{personalInfo.location}</span></div>}
            {personalInfo.linkedin && <div className="break-all flex flex-col gap-1.5"><span className="text-[8px] text-gray-400 font-black">LinkedIn</span><span className="text-black border-b border-gray-100 pb-1">{personalInfo.linkedin}</span></div>}
            {personalInfo.website && <div className="break-all flex flex-col gap-1.5"><span className="text-[8px] text-gray-400 font-black">Portfolio</span><span className="text-blue-600 lowercase tracking-normal font-bold">{personalInfo.website}</span></div>}
          </div>
        </div>

        {skills.length > 0 && (
          <div className="print:break-inside-avoid">
            {renderSectionHeader("Expertise", true)}
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-[9px] font-black text-black mb-2 uppercase tracking-widest">{skill.category}</p>
                  <p className="text-[10px] text-gray-500 font-bold leading-relaxed">{skill.items.join(' • ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="print:break-inside-avoid">
            {renderSectionHeader("Education", true)}
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-[11px] font-black text-gray-900 uppercase tracking-tight">{edu.institution}</p>
                  <p className="text-[9px] text-gray-400 font-bold italic mb-1">{edu.degree}</p>
                  <p className="text-[8px] text-gray-400 font-black uppercase tracking-tighter">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(awards?.length || 0) > 0 && (
          <div className="print:break-inside-avoid mt-auto pt-8 border-t border-gray-200">
            {renderSectionHeader("Recognitions", true)}
            <ul className="space-y-4">
              {awards?.map((award, idx) => award.trim() && (
                <li key={idx} className="text-[10px] text-gray-600 font-bold leading-tight flex gap-3 items-start">
                   <div className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: style.accentColor }}></div>
                   <span>{award}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className="flex-1 p-12 print:p-10 flex flex-col min-h-full bg-white relative z-10 shadow-[-20px_0_40px_rgba(0,0,0,0.02)]">
        {personalInfo.summary && (
          <section className="mb-10 print:break-inside-avoid">
            {renderSectionHeader("Career Synthesis")}
            <p className="text-gray-700 leading-relaxed text-[13.5px] font-medium" style={{ lineHeight: contentLineHeight }}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        <section className="mb-10 flex-1">
          {renderSectionHeader("Career Trajectory")}
          <div className="space-y-10">
            {experience.map((exp) => (
              <div key={exp.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-black text-base uppercase tracking-tight" style={{ color: style.accentColor }}>{exp.position}</h4>
                    <p className="text-[13px] text-gray-800 font-black mt-1">{exp.company}</p>
                  </div>
                  <span className="text-[9px] font-black text-gray-400 shrink-0 ml-6 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">{exp.startDate} — {exp.endDate}</span>
                </div>
                <ul className="list-disc ml-5 space-y-2 text-gray-600 text-[13px] font-medium" style={{ lineHeight: contentLineHeight }}>
                  {exp.description.map((bullet, idx) => bullet.trim() && (
                    <li key={idx} className="print:break-inside-avoid pl-1">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {projects.length > 0 && (
          <section className="mb-10">
            {renderSectionHeader("Notable Ventures")}
            <div className="grid grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="print:break-inside-avoid flex flex-col">
                  <div className="flex items-center justify-between mb-1.5">
                    <h5 className="font-black text-[12px] uppercase tracking-wider" style={{ color: style.accentColor }}>{proj.name}</h5>
                    {proj.link && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {(certifications?.length || 0) > 0 && (
          <section className="print:break-inside-avoid pt-8 border-t-2 border-gray-50 mt-auto">
            {renderSectionHeader("Professional Credentials")}
            <div className="flex flex-wrap gap-x-4 gap-y-3">
              {certifications?.map((cert, idx) => cert.trim() && (
                <div key={idx} className="text-[10px] text-gray-900 font-black uppercase tracking-widest px-3 py-2 bg-gray-50 rounded-xl border border-gray-200/50 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: style.accentColor }}></div>
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
          /* Clamp total document height to roughly 3.1 pages worth of pixels to prevent 4th page bleed */
          max-height: 3500px; 
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
        /* Ensure background colors/gradients show up in generated PDFs */
        @media print {
          #resume-document {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* This helps html2pdf handle transparency and stacking better */
          .relative.flex.bg-white {
            background-color: white !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;
