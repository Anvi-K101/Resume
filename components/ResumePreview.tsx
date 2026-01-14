
import React from 'react';
import { ResumeData, ResumeStyle, ResumeLayout } from '../types';
import { FONT_SIZES } from '../constants';
import { ExternalLink, Globe, Link as LinkIcon } from 'lucide-react';

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

  const renderSectionHeader = (title: string, isSidebar: boolean = false) => (
    <h2 
      className={`font-bold uppercase tracking-widest border-b pb-1 mb-3 ${isSidebar ? 'text-[10px]' : size.h2}`} 
      style={{ borderColor: `${style.accentColor}40`, color: style.accentColor }}
    >
      {title}
    </h2>
  );

  const renderStandard = () => (
    <div className={`p-10 bg-white min-h-[1056px] print:min-h-0 print:p-6 shadow-sm print:shadow-none ${fontClass} ${size.base}`}>
      <header className="mb-6 border-b pb-4 border-gray-100">
        <h1 className={`${size.h1} font-bold tracking-tight mb-2`} style={{ color: style.accentColor }}>{personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="text-black font-medium">{personalInfo.linkedin}</span>}
        </div>
      </header>
      
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
                <div className="flex justify-between items-baseline">
                  <h3 className={`${size.h3} font-bold`} style={{ color: style.accentColor }}>{exp.position}</h3>
                  <span className="text-[11px] text-gray-500 font-bold uppercase tracking-tighter shrink-0 ml-4">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-gray-800 text-sm">{exp.company}</span>
                  <span className="text-[10px] text-gray-400">{exp.location}</span>
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
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                   <h3 className={`${size.h3} font-bold`} style={{ color: style.accentColor }}>{proj.name}</h3>
                   {proj.link && <span className="text-[10px] text-blue-600 italic truncate max-w-[250px]">{proj.link}</span>}
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8 mt-6">
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
            {renderSectionHeader("Skills")}
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
    <div className={`grid grid-cols-[280px_1fr] bg-white min-h-[1056px] print:min-h-0 shadow-sm print:shadow-none ${fontClass} ${size.base}`}>
      {/* Sidebar - Handles specific sections requested by user */}
      <aside className="bg-[#f9fafb] p-8 print:p-6 border-r border-gray-100 flex flex-col shrink-0 gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-4 tracking-tight leading-tight" style={{ color: style.accentColor }}>{personalInfo.fullName}</h1>
          <div className="space-y-2 text-[11px] text-gray-600">
            {personalInfo.email && <p className="break-all"><span className="font-bold text-black text-[9px] uppercase tracking-wider block">Email</span>{personalInfo.email}</p>}
            {personalInfo.phone && <p><span className="font-bold text-black text-[9px] uppercase tracking-wider block">Phone</span>{personalInfo.phone}</p>}
            {personalInfo.location && <p><span className="font-bold text-black text-[9px] uppercase tracking-wider block">Location</span>{personalInfo.location}</p>}
            {personalInfo.linkedin && <p className="break-all"><span className="font-bold text-black text-[9px] uppercase tracking-wider block">LinkedIn</span>{personalInfo.linkedin}</p>}
          </div>
        </div>

        {/* Projects in Sidebar as requested */}
        {projects.length > 0 && (
          <div className="print:break-inside-avoid">
            {renderSectionHeader("Projects", true)}
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="mb-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs font-bold text-gray-800">{proj.name}</p>
                    {proj.link && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500 leading-snug mb-1">{proj.description}</p>
                  {proj.link && (
                    <p className="text-[9px] text-blue-600/70 truncate italic font-medium">
                      {proj.link.replace(/^https?:\/\//, '')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Honours & Awards in Sidebar as requested */}
        {(awards?.length || 0) > 0 && (
          <div className="print:break-inside-avoid">
            {renderSectionHeader("Honours & Awards", true)}
            <ul className="space-y-3">
              {awards?.map((award, idx) => award.trim() && (
                <li key={idx} className="text-[10px] text-gray-700 leading-snug flex gap-2">
                   <div className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: style.accentColor }}></div>
                   <span>{award}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {education.length > 0 && (
          <div className="print:break-inside-avoid">
            {renderSectionHeader("Education", true)}
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-[11px] font-bold text-gray-800 leading-tight">{edu.institution}</p>
                  <p className="text-[10px] text-gray-500 italic">{edu.degree}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-tighter">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div className="print:break-inside-avoid">
            {renderSectionHeader("Expertise", true)}
            {skills.map((skill) => (
              <div key={skill.id} className="mb-3">
                <p className="text-[10px] font-bold text-gray-800 mb-0.5 uppercase tracking-tighter">{skill.category}</p>
                <p className="text-[10px] text-gray-500 leading-tight">{skill.items.join(', ')}</p>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Column - Experience and Profile */}
      <main className="p-10 print:p-8 flex flex-col min-h-full bg-white">
        {personalInfo.summary && (
          <section className="mb-8 print:break-inside-avoid">
            {renderSectionHeader("Executive Summary")}
            <p className="text-gray-700 leading-relaxed text-[13px]" style={textStyle}>{personalInfo.summary}</p>
          </section>
        )}

        <section className="mb-8 flex-1">
          {renderSectionHeader("Professional Experience")}
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="font-bold text-base leading-tight" style={{ color: style.accentColor }}>{exp.position}</h4>
                    <p className="text-sm text-gray-800 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 shrink-0 ml-4 uppercase tracking-tighter bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">{exp.startDate} – {exp.endDate}</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-gray-600 text-[13px]" style={textStyle}>
                  {exp.description.map((bullet, idx) => bullet.trim() && (
                    <li key={idx} className="print:break-inside-avoid pl-1">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {(certifications?.length || 0) > 0 && (
          <section className="print:break-inside-avoid pt-6 border-t border-gray-100 mt-4">
            {renderSectionHeader("Certifications")}
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {certifications?.map((cert, idx) => cert.trim() && (
                <div key={idx} className="text-[11px] text-gray-600 font-medium px-2 py-1 bg-gray-50 rounded border border-gray-100">
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
      style={{ minHeight: '1056px' }}
    >
      <div className="h-full">
        {style.layout === ResumeLayout.STANDARD && renderStandard()}
        {style.layout === ResumeLayout.SIDEBAR && renderSidebar()}
        {style.layout === ResumeLayout.MINIMAL && renderStandard()}
      </div>
    </div>
  );
};

export default ResumePreview;
