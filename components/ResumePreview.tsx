
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
    marginBottom: `${style.sectionSpacing}rem`
  };

  const textStyle = {
    lineHeight: style.lineSpacing
  };

  const renderHeader = () => (
    <header className="mb-6 border-b pb-4 border-gray-100">
      <h1 className={`${size.h1} font-bold tracking-tight mb-2`} style={{ color: style.accentColor }}>{personalInfo.fullName}</h1>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-600">
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.location && <span>{personalInfo.location}</span>}
        {personalInfo.linkedin && (
          <span className="text-black font-medium" style={{ color: style.accentColor }}>{personalInfo.linkedin}</span>
        )}
      </div>
    </header>
  );

  const renderSectionHeader = (title: string) => (
    <h2 className={`${size.h2} font-bold uppercase tracking-widest mb-3 border-b pb-1`} style={{ borderColor: `${style.accentColor}40`, color: style.accentColor }}>
      {title}
    </h2>
  );

  const renderStandard = () => (
    <div className={`p-10 bg-white min-h-[1056px] print:min-h-0 print:p-6 shadow-sm print:shadow-none ${fontClass} ${size.base}`}>
      {renderHeader()}
      
      {personalInfo.summary && (
        <section style={sectionStyle} className="print:break-inside-avoid">
          {renderSectionHeader("Profile")}
          <p className="text-gray-700 leading-relaxed" style={textStyle}>{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={sectionStyle}>
          {renderSectionHeader("Experience")}
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className={`${size.h3} font-bold`} style={{ color: style.accentColor }}>{exp.position}</h3>
                  <span className="text-[11px] text-gray-500 font-bold shrink-0 ml-4 uppercase tracking-tighter">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="font-semibold text-gray-800 text-sm">{exp.company}</span>
                  <span className="text-[11px] text-gray-400">{exp.location}</span>
                </div>
                <ul className="list-disc ml-5 space-y-0.5 text-gray-700" style={textStyle}>
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
          {renderSectionHeader("Projects")}
          <div className="grid grid-cols-1 gap-4">
            {projects.map((proj) => (
              <div key={proj.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                   <h3 className={`${size.h3} font-bold`} style={{ color: style.accentColor }}>{proj.name}</h3>
                   {proj.link && <span className="text-[11px] text-gray-400 italic truncate max-w-[200px]">{proj.link}</span>}
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {education.length > 0 && (
          <section style={sectionStyle}>
            {renderSectionHeader("Education")}
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="print:break-inside-avoid">
                  <h3 className="font-bold text-gray-800 text-sm">{edu.institution}</h3>
                  <p className="text-gray-600 italic text-xs">{edu.degree}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section style={sectionStyle} className="print:break-inside-avoid">
            {renderSectionHeader("Technical Skills")}
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-xs">
                  <span className="font-bold text-gray-800 block mb-0.5" style={{ color: style.accentColor }}>{skill.category}</span>
                  <span className="text-gray-600 leading-snug">{skill.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  const renderSidebar = () => (
    <div className={`grid grid-cols-[260px_1fr] bg-white min-h-[1056px] print:min-h-0 shadow-sm print:shadow-none ${fontClass} ${size.base}`}>
      <aside className="bg-gray-50 p-8 print:p-6 border-r border-gray-100 flex flex-col shrink-0">
        <div className="mb-8 print:mb-6">
          <h1 className="text-xl font-bold mb-4 tracking-tight leading-tight" style={{ color: style.accentColor }}>{personalInfo.fullName}</h1>
          <div className="space-y-3 text-[11px] text-gray-600">
            <p className="flex flex-col"><span className="font-bold text-black text-[9px] uppercase tracking-wider mb-0.5">Email</span>{personalInfo.email}</p>
            <p className="flex flex-col"><span className="font-bold text-black text-[9px] uppercase tracking-wider mb-0.5">Phone</span>{personalInfo.phone}</p>
            <p className="flex flex-col"><span className="font-bold text-black text-[9px] uppercase tracking-wider mb-0.5">Location</span>{personalInfo.location}</p>
            {personalInfo.linkedin && (
              <p className="flex flex-col"><span className="font-bold text-black text-[9px] uppercase tracking-wider mb-0.5">LinkedIn</span><span className="truncate">{personalInfo.linkedin}</span></p>
            )}
          </div>
        </div>

        {projects.length > 0 && (
          <div className="mb-8 print:break-inside-avoid">
            <h3 className="text-[10px] font-bold uppercase tracking-widest border-b border-gray-300 pb-1.5 mb-4" style={{ color: style.accentColor, borderColor: style.accentColor }}>Projects</h3>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="print:break-inside-avoid">
                  <p className="text-xs font-bold text-gray-800 mb-0.5 flex items-center gap-1">
                    {proj.name} 
                    {proj.link && <ExternalLink className="w-2 h-2 opacity-50" />}
                  </p>
                  <p className="text-[10px] text-gray-500 leading-tight mb-1">{proj.description}</p>
                  {proj.link && <p className="text-[9px] text-blue-600 hover:underline truncate opacity-70 italic">{proj.link}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {(awards?.length || 0) > 0 && (
          <div className="mb-8 print:break-inside-avoid">
            <h3 className="text-[10px] font-bold uppercase tracking-widest border-b border-gray-300 pb-1.5 mb-4" style={{ color: style.accentColor, borderColor: style.accentColor }}>Honours & Awards</h3>
            <ul className="space-y-2">
              {awards?.map((award, idx) => award.trim() && (
                <li key={idx} className="text-[10px] text-gray-700 leading-snug pl-2 border-l-2 border-gray-200">
                   {award}
                </li>
              ))}
            </ul>
          </div>
        )}

        {skills.length > 0 && (
          <div className="mb-8 print:break-inside-avoid">
            <h3 className="text-[10px] font-bold uppercase tracking-widest border-b border-gray-300 pb-1.5 mb-4" style={{ color: style.accentColor, borderColor: style.accentColor }}>Core Expertise</h3>
            {skills.map((skill) => (
              <div key={skill.id} className="mb-3">
                <p className="text-[10px] font-bold text-gray-800 mb-0.5">{skill.category}</p>
                <p className="text-[10px] text-gray-500 leading-tight">{skill.items.join(', ')}</p>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-6 print:break-inside-avoid">
            <h3 className="text-[10px] font-bold uppercase tracking-widest border-b border-gray-300 pb-1.5 mb-4" style={{ color: style.accentColor, borderColor: style.accentColor }}>Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <p className="text-[11px] font-bold text-gray-800 leading-tight">{edu.institution}</p>
                <p className="text-[10px] text-gray-500 italic">{edu.degree}</p>
                <p className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-tighter">{edu.startDate} – {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </aside>

      <main className="p-8 print:p-6 bg-white flex flex-col min-h-full">
        <section className="mb-8 print:break-inside-avoid">
          <h3 className="text-[10px] font-bold uppercase tracking-widest border-b-2 pb-1.5 mb-3 inline-block" style={{ borderColor: style.accentColor, color: style.accentColor }}>Executive Summary</h3>
          <p className="text-gray-700 leading-relaxed text-sm" style={textStyle}>{personalInfo.summary}</p>
        </section>

        <section className="mb-8 flex-1">
          <h3 className="text-[10px] font-bold uppercase tracking-widest border-b-2 pb-1.5 mb-4 inline-block" style={{ borderColor: style.accentColor, color: style.accentColor }}>Professional Experience</h3>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="font-bold text-base leading-tight" style={{ color: style.accentColor }}>{exp.position}</h4>
                    <p className="text-sm text-gray-700 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 shrink-0 ml-4 uppercase tracking-tighter bg-gray-50 px-2 py-0.5 rounded">{exp.startDate} – {exp.endDate}</span>
                </div>
                <ul className="list-disc ml-5 space-y-0.5 text-gray-600 text-[13px]" style={textStyle}>
                  {exp.description.map((bullet, idx) => bullet.trim() && (
                    <li key={idx} className="print:break-inside-avoid">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {(certifications?.length || 0) > 0 && (
          <section className="print:break-inside-avoid mt-auto pt-6 border-t border-gray-100">
            <h3 className="text-[10px] font-bold uppercase tracking-widest border-b-2 pb-1 mb-3 inline-block" style={{ borderColor: style.accentColor, color: style.accentColor }}>Certifications</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {certifications?.map((cert, idx) => cert.trim() && (
                <div key={idx} className="text-xs text-gray-700 font-medium flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-gray-300"></div>
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
    <div id="resume-document" className="mx-auto bg-white shadow-2xl rounded-sm overflow-hidden w-full max-w-[816px] border border-gray-100 print:w-full print:max-w-none print:border-none print:rounded-none">
      {style.layout === ResumeLayout.STANDARD && renderStandard()}
      {style.layout === ResumeLayout.SIDEBAR && renderSidebar()}
      {style.layout === ResumeLayout.MINIMAL && renderStandard()} 
    </div>
  );
};

export default ResumePreview;
