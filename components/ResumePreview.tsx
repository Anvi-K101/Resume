
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

  const sectionSpacing = `${style.sectionSpacing * 0.75}rem`;

  const textStyle = {
    lineHeight: style.lineSpacing,
    color: '#374151'
  };

  const renderSectionHeader = (title: string, isSidebar: boolean = false) => (
    <div className={`mb-3 border-b pb-1`} style={{ borderColor: `${style.accentColor}30` }}>
      <h2 
        className={`font-black uppercase tracking-[0.15em] ${isSidebar ? 'text-[10px]' : size.h2}`} 
        style={{ color: style.accentColor }}
      >
        {title}
      </h2>
    </div>
  );

  const renderStandard = () => (
    <div className={`p-12 bg-white w-full shadow-sm print:shadow-none ${fontClass} ${size.base}`}>
      <header className="mb-8 text-center border-b pb-6 border-gray-100">
        <h1 className={`${size.h1} font-black tracking-tighter uppercase mb-2`} style={{ color: style.accentColor }}>
          {personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          {personalInfo.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1.5 text-black"><Linkedin className="w-3.5 h-3.5" /> {personalInfo.linkedin}</span>}
        </div>
      </header>
      
      {personalInfo.summary && (
        <section style={{ marginBottom: sectionSpacing }} className="page-section">
          {renderSectionHeader("Professional Summary")}
          <p className="leading-relaxed font-medium text-justify" style={textStyle}>{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: sectionSpacing }} className="page-section">
          {renderSectionHeader("Professional Experience")}
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="item-block">
                <div className="flex justify-between items-baseline">
                  <h3 className={`${size.h3} font-black uppercase`} style={{ color: style.accentColor }}>{exp.position}</h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="font-bold text-gray-800">{exp.company}</span>
                  <span className="text-[9px] text-gray-400 font-medium uppercase">{exp.location}</span>
                </div>
                <ul className="list-disc ml-5 space-y-1" style={textStyle}>
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
        <section style={{ marginBottom: sectionSpacing }} className="page-section">
          {renderSectionHeader("Notable Projects")}
          <div className="grid grid-cols-1 gap-4">
            {projects.map((proj) => (
              <div key={proj.id} className="item-block p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                   <h3 className="font-black text-[12px] uppercase" style={{ color: style.accentColor }}>{proj.name}</h3>
                   {proj.link && (
                     <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-[9px] text-blue-600 font-black flex items-center gap-1">
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

      <div className="grid grid-cols-2 gap-10 mt-6 pt-6 border-t border-gray-100 page-section">
        {education.length > 0 && (
          <div className="space-y-4">
            {renderSectionHeader("Education")}
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="item-block">
                  <h3 className="font-black text-gray-900 uppercase tracking-tight text-[12px]">{edu.institution}</h3>
                  <p className="text-gray-500 font-bold text-[10px] italic">{edu.degree}</p>
                  <p className="text-[8px] text-gray-400 font-black uppercase mt-1">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div className="space-y-4">
            {renderSectionHeader("Expertise")}
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id} className="item-block text-[11px]">
                  <span className="font-black text-black block mb-1 uppercase tracking-widest text-[9px]" style={{ color: style.accentColor }}>{skill.category}</span>
                  <span className="text-gray-600 font-medium">{skill.items.join(' • ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {(certifications?.length || 0) > 0 && (
          <section className="mt-8 pt-6 border-t border-gray-100 page-section">
            {renderSectionHeader("Certifications")}
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {certifications?.map((cert, idx) => cert.trim() && (
                <div key={idx} className="text-[10px] text-gray-900 font-black uppercase tracking-widest px-3 py-1.5 bg-gray-50 rounded border border-gray-100 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: style.accentColor }}></div>
                   {cert}
                </div>
              ))}
            </div>
          </section>
        )}
    </div>
  );

  const renderSidebar = () => (
    <div 
      className={`relative flex bg-white w-full shadow-sm print:shadow-none ${fontClass} ${size.base}`}
    >
      <aside className="w-[260px] p-8 print:p-6 flex flex-col shrink-0 gap-8 z-10 relative bg-[#f8f9fa] border-r border-gray-100">
        <div className="mb-2">
          <h1 className="text-2xl font-black mb-6 tracking-tighter leading-tight uppercase italic" style={{ color: style.accentColor }}>
            {personalInfo.fullName}
          </h1>
          <div className="space-y-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            {personalInfo.email && <div className="break-all flex flex-col gap-1"><span className="text-[7px] text-gray-400">Email</span><span className="text-black">{personalInfo.email}</span></div>}
            {personalInfo.phone && <div className="flex flex-col gap-1"><span className="text-[7px] text-gray-400">Phone</span><span className="text-black">{personalInfo.phone}</span></div>}
            {personalInfo.location && <div className="flex flex-col gap-1"><span className="text-[7px] text-gray-400">Location</span><span className="text-black">{personalInfo.location}</span></div>}
            {personalInfo.linkedin && <div className="break-all flex flex-col gap-1"><span className="text-[7px] text-gray-400">LinkedIn</span><span className="text-black border-b border-gray-200 pb-0.5">{personalInfo.linkedin}</span></div>}
            {personalInfo.website && <div className="break-all flex flex-col gap-1"><span className="text-[7px] text-gray-400">Portfolio</span><span className="text-blue-600 lowercase tracking-normal font-medium">{personalInfo.website}</span></div>}
          </div>
        </div>

        {skills.length > 0 && (
          <div className="page-section">
            {renderSectionHeader("Technical Skills", true)}
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id} className="item-block">
                  <p className="text-[8px] font-black text-black mb-1.5 uppercase tracking-widest">{skill.category}</p>
                  <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{skill.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="page-section">
            {renderSectionHeader("Education", true)}
            <div className="space-y-5">
              {education.map((edu) => (
                <div key={edu.id} className="item-block">
                  <p className="text-[11px] font-black text-gray-900 uppercase leading-tight">{edu.institution}</p>
                  <p className="text-[9px] text-gray-400 font-bold italic mt-1">{edu.degree}</p>
                  <p className="text-[8px] text-gray-400 font-black uppercase mt-1">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {awards && awards.length > 0 && (
          <div className="page-section mt-4 pt-4 border-t border-gray-200">
             {renderSectionHeader("Recognition", true)}
             <div className="space-y-3">
               {awards.map((award, i) => (
                 <p key={i} className="text-[10px] text-gray-600 font-medium italic">"{award}"</p>
               ))}
             </div>
          </div>
        )}
      </aside>

      <main className="flex-1 p-10 print:p-8 flex flex-col bg-white relative z-10 min-h-full">
        {personalInfo.summary && (
          <section className="mb-8 page-section">
            {renderSectionHeader("Professional Profile")}
            <p className="text-gray-700 leading-relaxed font-medium text-justify" style={textStyle}>{personalInfo.summary}</p>
          </section>
        )}

        <section className="mb-8 flex-1 page-section">
          {renderSectionHeader("Career Experience")}
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="item-block">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-black text-[14px] uppercase" style={{ color: style.accentColor }}>{exp.position}</h4>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[13px] text-gray-800 font-bold mb-2">{exp.company}</p>
                <ul className="list-disc ml-5 space-y-1.5" style={textStyle}>
                  {exp.description.map((bullet, idx) => bullet.trim() && (
                    <li key={idx} className="pl-1 text-[11px] font-medium text-gray-600">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {projects.length > 0 && (
          <section className="mb-8 page-section">
            {renderSectionHeader("Selected Projects")}
            <div className="space-y-5">
              {projects.map((proj) => (
                <div key={proj.id} className="item-block">
                  <div className="flex justify-between items-baseline mb-1">
                     <p className="text-[12px] font-black text-gray-900 uppercase">{proj.name}</p>
                     {proj.link && <span className="text-[8px] text-blue-600 font-black uppercase tracking-tight">{proj.link}</span>}
                  </div>
                  <p className="text-[11px] text-gray-600 font-medium leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {(certifications?.length || 0) > 0 && (
          <section className="page-section pt-6 border-t border-gray-100">
            {renderSectionHeader("Certifications")}
            <div className="flex flex-wrap gap-2">
              {certifications?.map((cert, idx) => cert.trim() && (
                <div key={idx} className="text-[9px] text-gray-900 font-black uppercase tracking-widest px-2.5 py-1 bg-gray-50 rounded border border-gray-100 flex items-center gap-1.5">
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
      className={`mx-auto bg-white shadow-2xl overflow-visible w-full max-w-[816px] print:w-full print:max-w-none print:shadow-none ${fontClass}`}
    >
      <div className="relative">
        {/* Visual Page Indicators (Editor only) */}
        <div className="no-print absolute top-[1123px] left-0 right-0 h-px bg-red-100 z-50 flex items-center justify-center opacity-40">
           <span className="bg-red-50 text-red-300 text-[8px] px-2 font-black uppercase tracking-widest">End of Page 1</span>
        </div>
        <div className="no-print absolute top-[2246px] left-0 right-0 h-px bg-red-100 z-50 flex items-center justify-center opacity-40">
           <span className="bg-red-50 text-red-300 text-[8px] px-2 font-black uppercase tracking-widest">End of Page 2</span>
        </div>

        {style.layout === ResumeLayout.STANDARD && renderStandard()}
        {style.layout === ResumeLayout.SIDEBAR && renderSidebar()}
        {style.layout === ResumeLayout.MINIMAL && renderStandard()}
      </div>

      <style>{`
        #resume-document {
          position: relative;
          box-sizing: border-box;
          min-height: 1123px; /* Ensure at least one full page */
        }
        .page-section {
          break-inside: avoid;
          page-break-inside: avoid;
          margin-bottom: ${sectionSpacing};
        }
        .item-block {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        li {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        @media print {
          #resume-document {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-shadow: none !important;
          }
          /* Fix for sidebar layout in PDF splitting */
          aside {
            height: 100% !important;
            min-height: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;
