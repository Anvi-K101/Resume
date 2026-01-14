
import React from 'react';
import { ResumeData, ResumeStyle, ResumeLayout } from '../types';
import { FONT_SIZES } from '../constants';
import { ExternalLink, Mail, Phone, MapPin, Linkedin } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  style: ResumeStyle;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, style }) => {
  const { personalInfo, experience, education, skills, awards, certifications, projects } = data;
  const fontClass = `font-['${style.font}',sans-serif]`;
  const size = FONT_SIZES[style.fontSize];

  // Highly optimized spacing for professional density
  const sectionSpacing = `${style.sectionSpacing * 0.45}rem`;
  const itemSpacing = `${style.sectionSpacing * 0.25}rem`;

  const textStyle = {
    lineHeight: style.lineSpacing,
    color: '#374151'
  };

  const renderSectionHeader = (title: string, isSidebar: boolean = false) => (
    <div className={`mb-2 border-b pb-0.5`} style={{ borderColor: `${style.accentColor}30` }}>
      <h2 
        className={`font-black uppercase tracking-[0.15em] ${isSidebar ? 'text-[9px]' : size.h2}`} 
        style={{ color: style.accentColor }}
      >
        {title}
      </h2>
    </div>
  );

  const renderStandard = () => (
    <div className={`p-8 bg-white min-h-[1120px] print:min-h-0 print:p-6 shadow-sm print:shadow-none ${fontClass} ${size.base}`}>
      <header className="mb-6 text-center border-b pb-4 border-gray-100">
        <h1 className={`${size.h1} font-black tracking-tighter uppercase mb-2`} style={{ color: style.accentColor }}>
          {personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1 text-black"><Linkedin className="w-3 h-3" /> {personalInfo.linkedin}</span>}
        </div>
      </header>
      
      {personalInfo.summary && (
        <section style={{ marginBottom: sectionSpacing }} className="print:break-inside-avoid">
          {renderSectionHeader("Executive Summary")}
          <p className="leading-relaxed font-medium" style={textStyle}>{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: sectionSpacing }}>
          {renderSectionHeader("Professional History")}
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className={`${size.h3} font-black uppercase`} style={{ color: style.accentColor }}>{exp.position}</h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-gray-800">{exp.company}</span>
                  <span className="text-[9px] text-gray-400 font-medium uppercase">{exp.location}</span>
                </div>
                <ul className="list-disc ml-4 space-y-0.5" style={textStyle}>
                  {exp.description.map((bullet, idx) => bullet.trim() && (
                    <li key={idx} className="pl-1 text-gray-600">{bullet}</li>
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
          <div className="grid grid-cols-1 gap-3">
            {projects.map((proj) => (
              <div key={proj.id} className="print:break-inside-avoid p-3 bg-gray-50/50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-0.5">
                   <h3 className="font-black text-[12px] uppercase" style={{ color: style.accentColor }}>{proj.name}</h3>
                   {proj.link && (
                     <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-[9px] text-blue-600 font-black flex items-center gap-1 truncate max-w-[200px]">
                       {proj.link} <ExternalLink className="w-2.5 h-2.5" />
                     </a>
                   )}
                </div>
                <p className="text-[11px] font-medium leading-relaxed" style={textStyle}>{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8 mt-4 pt-4 border-t border-gray-50">
        {education.length > 0 && (
          <section className="print:break-inside-avoid">
            {renderSectionHeader("Education")}
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-black text-gray-900 uppercase tracking-tight text-[12px]">{edu.institution}</h3>
                  <p className="text-gray-500 font-bold text-[10px] italic">{edu.degree}</p>
                  <p className="text-[8px] text-gray-400 font-black uppercase mt-0.5">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section className="print:break-inside-avoid">
            {renderSectionHeader("Expertise")}
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-[11px]">
                  <span className="font-black text-black block mb-0.5 uppercase tracking-widest text-[9px]" style={{ color: style.accentColor }}>{skill.category}</span>
                  <span className="text-gray-600 font-medium">{skill.items.join(' • ')}</span>
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
        background: `linear-gradient(to right, #f8f9fa 0%, #f8f9fa 260px, #ffffff 260px, #ffffff 100%)`
      }}
    >
      <aside className="w-[260px] p-8 print:p-6 flex flex-col shrink-0 gap-6 z-10 relative">
        <div className="mb-2">
          <h1 className="text-xl font-black mb-4 tracking-tighter leading-none uppercase italic" style={{ color: style.accentColor }}>
            {personalInfo.fullName}
          </h1>
          <div className="space-y-3 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
            {personalInfo.email && <div className="break-all flex flex-col gap-0.5"><span className="text-[7px] text-gray-400">Email</span><span className="text-black">{personalInfo.email}</span></div>}
            {personalInfo.phone && <div className="flex flex-col gap-0.5"><span className="text-[7px] text-gray-400">Phone</span><span className="text-black">{personalInfo.phone}</span></div>}
            {personalInfo.location && <div className="flex flex-col gap-0.5"><span className="text-[7px] text-gray-400">Location</span><span className="text-black">{personalInfo.location}</span></div>}
            {personalInfo.linkedin && <div className="break-all flex flex-col gap-0.5"><span className="text-[7px] text-gray-400">LinkedIn</span><span className="text-black border-b border-gray-200 pb-0.5">{personalInfo.linkedin}</span></div>}
            {personalInfo.website && <div className="break-all flex flex-col gap-0.5"><span className="text-[7px] text-gray-400">Portfolio</span><span className="text-blue-600 lowercase tracking-normal font-medium">{personalInfo.website}</span></div>}
          </div>
        </div>

        {projects.length > 0 && (
          <div className="print:break-inside-avoid">
            {renderSectionHeader("Projects", true)}
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="mb-1">
                  <p className="text-[10px] font-black text-gray-900 uppercase mb-0.5">{proj.name}</p>
                  <p className="text-[9px] text-gray-600 font-medium leading-relaxed mb-1.5">{proj.description}</p>
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
            {renderSectionHeader("Skills", true)}
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-[8px] font-black text-black mb-1 uppercase tracking-widest">{skill.category}</p>
                  <p className="text-[9px] text-gray-500 font-medium leading-tight">{skill.items.join(' • ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="print:break-inside-avoid mt-auto pt-4 border-t border-gray-100">
            {renderSectionHeader("Education", true)}
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-[10px] font-black text-gray-900 uppercase">{edu.institution}</p>
                  <p className="text-[8px] text-gray-400 font-bold italic">{edu.degree}</p>
                  <p className="text-[7px] text-gray-400 font-black uppercase">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="flex-1 p-8 print:p-6 flex flex-col min-h-full bg-white relative z-10">
        {personalInfo.summary && (
          <section className="mb-6 print:break-inside-avoid">
            {renderSectionHeader("Executive Summary")}
            <p className="text-gray-700 leading-relaxed font-medium" style={textStyle}>{personalInfo.summary}</p>
          </section>
        )}

        <section className="mb-6 flex-1">
          {renderSectionHeader("Experience")}
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-black text-[13px] uppercase" style={{ color: style.accentColor }}>{exp.position}</h4>
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[12px] text-gray-800 font-bold">{exp.company}</p>
                <ul className="list-disc ml-4 space-y-0.5 mt-1" style={textStyle}>
                  {exp.description.map((bullet, idx) => bullet.trim() && (
                    <li key={idx} className="print:break-inside-avoid pl-1 text-[11px] font-medium text-gray-600">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {(certifications?.length || 0) > 0 && (
          <section className="print:break-inside-avoid pt-4 border-t border-gray-100 mt-4">
            {renderSectionHeader("Certifications")}
            <div className="flex flex-wrap gap-x-2 gap-y-1.5">
              {certifications?.map((cert, idx) => cert.trim() && (
                <div key={idx} className="text-[9px] text-gray-900 font-black uppercase tracking-widest px-2 py-1 bg-gray-50/50 rounded border border-gray-200/50 flex items-center gap-1.5">
                   <div className="w-1 h-1 rounded-full" style={{ backgroundColor: style.accentColor }}></div>
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
          /* Clamp height to roughly 3 pages of A4 (1123px per page) */
          max-height: 3370px;
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
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;
