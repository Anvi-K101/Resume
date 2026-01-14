
import React from 'react';
import { ResumeData, ResumeStyle, ResumeLayout } from '../types';
import { FONT_SIZES } from '../constants';
import { ExternalLink } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  style: ResumeStyle;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, style }) => {
  const { personalInfo, experience, education, skills, awards, certifications, projects } = data;
  const fontClass = `font-['${style.font}',sans-serif]`;
  const size = FONT_SIZES[style.fontSize];

  const sectionStyle = {
    marginBottom: `${style.sectionSpacing * 0.7}rem`
  };

  const textStyle = {
    lineHeight: style.lineSpacing
  };

  const renderSectionHeader = (title: string, isSidebar: boolean = false) => (
    <h2 
      className={`font-bold uppercase tracking-widest border-b pb-1 mb-3 ${isSidebar ? 'text-[9px]' : size.h2}`} 
      style={{ borderColor: `${style.accentColor}40`, color: style.accentColor }}
    >
      {title}
    </h2>
  );

  const renderStandard = () => (
    <div className={`p-12 bg-white min-h-[1120px] print:min-h-0 print:p-8 shadow-sm print:shadow-none ${fontClass} ${size.base}`}>
      <header className="mb-8 border-b pb-6 border-gray-100">
        <h1 className={`${size.h1} font-bold tracking-tight mb-3`} style={{ color: style.accentColor }}>{personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-gray-600">
          {personalInfo.email && <span className="flex items-center gap-1 font-medium">{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1">{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <span className="text-gray-900 font-bold border-b border-gray-200">{personalInfo.linkedin}</span>
          )}
        </div>
      </header>
      
      {personalInfo.summary && (
        <section style={sectionStyle} className="print:break-inside-avoid">
          {renderSectionHeader("Professional Profile")}
          <p className="text-gray-700 leading-relaxed text-[13px]" style={textStyle}>{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={sectionStyle}>
          {renderSectionHeader("Work Experience")}
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="print:break-inside-avoid mb-2">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className={`${size.h3} font-bold`} style={{ color: style.accentColor }}>{exp.position}</h3>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter shrink-0 ml-4">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-semibold text-gray-800 text-[13px]">{exp.company}</span>
                  <span className="text-[10px] text-gray-400 italic">{exp.location}</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-gray-700 text-[12.5px]" style={textStyle}>
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
        <section style={sectionStyle}>
          {renderSectionHeader("Key Projects")}
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                   <h3 className={`${size.h3} font-bold`} style={{ color: style.accentColor }}>{proj.name}</h3>
                   {proj.link && (
                     <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline italic truncate max-w-[300px]">
                       {proj.link}
                     </a>
                   )}
                </div>
                <p className="text-gray-700 leading-relaxed text-[12.5px]">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-[1fr_250px] gap-10 mt-6 pt-6 border-t border-gray-50">
        <div>
          {education.length > 0 && (
            <section style={sectionStyle}>
              {renderSectionHeader("Education")}
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="print:break-inside-avoid">
                    <h3 className="font-bold text-gray-800 text-[13px]">{edu.institution}</h3>
                    <p className="text-gray-600 italic text-xs">{edu.degree}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mt-1">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div>
          {skills.length > 0 && (
            <section style={sectionStyle} className="print:break-inside-avoid">
              {renderSectionHeader("Skills")}
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-xs">
                    <span className="font-bold text-gray-900 block mb-1" style={{ color: style.accentColor }}>{skill.category}</span>
                    <span className="text-gray-600 leading-relaxed">{skill.items.join(', ')}</span>
                  </div>
                ))}
              </div>
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
        background: `linear-gradient(to right, #f8f9fa 0%, #f8f9fa 280px, #ffffff 280px, #ffffff 100%)`
      }}
    >
      {/* Sidebar Area */}
      <aside className="w-[280px] p-10 print:p-8 flex flex-col shrink-0 gap-8 z-10 relative">
        <div className="mb-4">
          <h1 className="text-2xl font-black mb-6 tracking-tight leading-[1.1]" style={{ color: style.accentColor }}>{personalInfo.fullName}</h1>
          <div className="space-y-4 text-[10.5px] text-gray-600">
            {personalInfo.email && <div className="break-all"><span className="font-bold text-black text-[9px] uppercase tracking-widest block mb-1">Email</span>{personalInfo.email}</div>}
            {personalInfo.phone && <div><span className="font-bold text-black text-[9px] uppercase tracking-widest block mb-1">Phone</span>{personalInfo.phone}</div>}
            {personalInfo.location && <div><span className="font-bold text-black text-[9px] uppercase tracking-widest block mb-1">Location</span>{personalInfo.location}</div>}
            {personalInfo.linkedin && <div className="break-all"><span className="font-bold text-black text-[9px] uppercase tracking-widest block mb-1">LinkedIn</span><span className="font-medium text-gray-900 border-b border-gray-200 pb-0.5">{personalInfo.linkedin}</span></div>}
            {personalInfo.website && <div className="break-all"><span className="font-bold text-black text-[9px] uppercase tracking-widest block mb-1">Portfolio</span><span className="text-blue-600 font-medium">{personalInfo.website}</span></div>}
          </div>
        </div>

        {projects.length > 0 && (
          <div className="print:break-inside-avoid">
            {renderSectionHeader("Projects", true)}
            <div className="space-y-5">
              {projects.map((proj) => (
                <div key={proj.id} className="mb-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-[11px] font-bold text-gray-900">{proj.name}</p>
                    {proj.link && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-600 leading-relaxed mb-2">{proj.description}</p>
                  {proj.link && (
                    <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-[9px] text-blue-600 block break-all italic font-semibold hover:underline bg-blue-50/50 p-1 px-1.5 rounded-md">
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {(awards?.length || 0) > 0 && (
          <div className="print:break-inside-avoid">
            {renderSectionHeader("Honors & Awards", true)}
            <ul className="space-y-3">
              {awards?.map((award, idx) => award.trim() && (
                <li key={idx} className="text-[10px] text-gray-700 leading-snug flex gap-2 items-start">
                   <div className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: style.accentColor }}></div>
                   <span className="font-medium">{award}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {skills.length > 0 && (
          <div className="print:break-inside-avoid">
            {renderSectionHeader("Expertise", true)}
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-[9px] font-bold text-black mb-1 uppercase tracking-widest">{skill.category}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{skill.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="print:break-inside-avoid mt-auto">
            {renderSectionHeader("Education", true)}
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-[11px] font-bold text-gray-900 leading-tight">{edu.institution}</p>
                  <p className="text-[10px] text-gray-500 italic mb-1">{edu.degree}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-12 print:p-10 flex flex-col min-h-full bg-white relative z-10 shadow-[-20px_0_40px_rgba(0,0,0,0.02)]">
        {personalInfo.summary && (
          <section className="mb-10 print:break-inside-avoid">
            {renderSectionHeader("Executive Summary")}
            <p className="text-gray-700 leading-relaxed text-[13.5px] font-medium" style={textStyle}>{personalInfo.summary}</p>
          </section>
        )}

        <section className="mb-10 flex-1">
          {renderSectionHeader("Professional History")}
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-base leading-tight" style={{ color: style.accentColor }}>{exp.position}</h4>
                    <p className="text-[13px] text-gray-800 font-bold mt-1">{exp.company}</p>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 shrink-0 ml-4 uppercase tracking-tighter bg-gray-50 px-2 py-1 rounded border border-gray-100">{exp.startDate} – {exp.endDate}</span>
                </div>
                <ul className="list-disc ml-5 space-y-1.5 text-gray-600 text-[13px]" style={textStyle}>
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
            {renderSectionHeader("Certifications")}
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {certifications?.map((cert, idx) => cert.trim() && (
                <div key={idx} className="text-[11px] text-gray-700 font-bold px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200/50 shadow-sm flex items-center gap-2">
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
      className="mx-auto bg-white shadow-2xl rounded-sm overflow-hidden w-full max-w-[816px] border border-gray-100 print:w-full print:max-w-none print:border-none print:rounded-none"
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
          max-height: 4480px;
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
