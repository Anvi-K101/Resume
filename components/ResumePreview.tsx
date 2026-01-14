
import React from 'react';
import { ResumeData, ResumeStyle, ResumeLayout } from '../types';
import { FONT_SIZES } from '../constants';

interface ResumePreviewProps {
  data: ResumeData;
  style: ResumeStyle;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, style }) => {
  const { personalInfo, experience, education, skills, awards, certifications } = data;
  const fontClass = `font-['${style.font}',sans-serif]`;
  const size = FONT_SIZES[style.fontSize];

  const sectionStyle = {
    marginBottom: `${style.sectionSpacing}rem`
  };

  const textStyle = {
    lineHeight: style.lineSpacing
  };

  const renderHeader = () => (
    <header className="mb-8 border-b pb-6 border-gray-100">
      <h1 className={`${size.h1} font-bold tracking-tight mb-2`} style={{ color: style.accentColor }}>{personalInfo.fullName}</h1>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.location && <span>{personalInfo.location}</span>}
        {personalInfo.linkedin && (
          <a href={`https://${personalInfo.linkedin}`} className="text-black hover:underline" style={{ color: style.accentColor }}>{personalInfo.linkedin}</a>
        )}
      </div>
    </header>
  );

  const renderSectionHeader = (title: string) => (
    <h2 className={`${size.h2} font-bold uppercase tracking-widest mb-4 border-b-2 pb-1`} style={{ borderColor: style.accentColor, color: style.accentColor }}>
      {title}
    </h2>
  );

  const renderStandard = () => (
    <div className={`p-12 bg-white min-h-[1056px] print:min-h-0 print:p-8 shadow-sm print:shadow-none ${fontClass} ${size.base}`}>
      {renderHeader()}
      
      {personalInfo.summary && (
        <section style={sectionStyle} className="print:break-inside-avoid">
          {renderSectionHeader("Professional Summary")}
          <p className="text-gray-700 leading-relaxed" style={textStyle}>{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={sectionStyle}>
          {renderSectionHeader("Experience")}
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`${size.h3} font-bold`} style={{ color: style.accentColor }}>{exp.position}</h3>
                  <span className="text-sm text-gray-500 font-medium shrink-0 ml-4">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-semibold text-gray-700">{exp.company}</span>
                  <span className="text-sm text-gray-500">{exp.location}</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-gray-700" style={textStyle}>
                  {exp.description.map((bullet, idx) => bullet.trim() && (
                    <li key={idx} className="print:break-inside-avoid">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section style={sectionStyle}>
          {renderSectionHeader("Education")}
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className={`${size.h3} font-bold`}>{edu.institution}</h3>
                  <span className="text-sm text-gray-500 shrink-0 ml-4">{edu.startDate} – {edu.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-700 italic">{edu.degree}</span>
                  <span className="text-sm text-gray-500">{edu.location}</span>
                </div>
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
              <div key={skill.id} className="grid grid-cols-[140px_1fr] gap-4 print:break-inside-avoid">
                <span className="font-bold text-gray-800" style={{ color: style.accentColor }}>{skill.category}:</span>
                <span className="text-gray-700">{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {(certifications?.length || 0) > 0 && (
        <section style={sectionStyle} className="print:break-inside-avoid">
          {renderSectionHeader("Certifications")}
          <ul className="list-disc ml-5 space-y-1 text-gray-700">
            {certifications?.map((cert, idx) => cert.trim() && <li key={idx} className="print:break-inside-avoid">{cert}</li>)}
          </ul>
        </section>
      )}
    </div>
  );

  const renderSidebar = () => (
    <div className={`grid grid-cols-[280px_1fr] bg-white min-h-[1056px] print:min-h-0 shadow-sm print:shadow-none ${fontClass} ${size.base}`}>
      <aside className="bg-gray-50 p-8 print:p-6 border-r border-gray-100 flex flex-col">
        <div className="mb-10 print:mb-6">
          <h1 className="text-2xl font-bold mb-4" style={{ color: style.accentColor }}>{personalInfo.fullName}</h1>
          <div className="space-y-3 text-sm text-gray-600">
            <p className="flex flex-col"><span className="font-bold text-black text-xs uppercase tracking-wider">Email</span>{personalInfo.email}</p>
            <p className="flex flex-col"><span className="font-bold text-black text-xs uppercase tracking-wider">Phone</span>{personalInfo.phone}</p>
            <p className="flex flex-col"><span className="font-bold text-black text-xs uppercase tracking-wider">Location</span>{personalInfo.location}</p>
          </div>
        </div>

        {skills.length > 0 && (
          <div className="mb-8 print:break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-gray-300 pb-2 mb-4" style={{ color: style.accentColor, borderColor: style.accentColor }}>Skills</h3>
            {skills.map((skill) => (
              <div key={skill.id} className="mb-4">
                <p className="text-xs font-bold text-gray-800 mb-1">{skill.category}</p>
                <p className="text-sm text-gray-600 leading-tight">{skill.items.join(', ')}</p>
              </div>
            ))}
          </div>
        )}

        {(certifications?.length || 0) > 0 && (
          <div className="mb-8 print:break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-gray-300 pb-2 mb-4" style={{ color: style.accentColor, borderColor: style.accentColor }}>Certifications</h3>
            <ul className="list-none space-y-2">
              {certifications?.map((cert, idx) => cert.trim() && (
                <li key={idx} className="text-[11px] text-gray-700 font-medium leading-snug">• {cert}</li>
              ))}
            </ul>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-8 print:break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-gray-300 pb-2 mb-4" style={{ color: style.accentColor, borderColor: style.accentColor }}>Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <p className="text-sm font-bold text-gray-800">{edu.institution}</p>
                <p className="text-xs text-gray-600 italic">{edu.degree}</p>
                <p className="text-[10px] text-gray-400">{edu.startDate} – {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </aside>

      <main className="p-10 print:p-8">
        <section className="mb-10 print:mb-6 print:break-inside-avoid">
          <h3 className="text-xs font-bold uppercase tracking-widest border-b-2 pb-2 mb-4 inline-block" style={{ borderColor: style.accentColor, color: style.accentColor }}>Profile</h3>
          <p className="text-gray-700 leading-relaxed" style={textStyle}>{personalInfo.summary}</p>
        </section>

        <section className="mb-10 print:mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest border-b-2 pb-2 mb-6 inline-block" style={{ borderColor: style.accentColor, color: style.accentColor }}>Professional Experience</h3>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-lg leading-tight" style={{ color: style.accentColor }}>{exp.position}</h4>
                    <p className="text-gray-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs font-bold text-gray-400 shrink-0 ml-4">{exp.startDate} – {exp.endDate}</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm" style={textStyle}>
                  {exp.description.map((bullet, idx) => bullet.trim() && (
                    <li key={idx} className="print:break-inside-avoid">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {(awards?.length || 0) > 0 && (
          <section className="print:break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-widest border-b-2 pb-2 mb-4 inline-block" style={{ borderColor: style.accentColor, color: style.accentColor }}>Honors & Awards</h3>
            <ul className="list-none space-y-2">
              {awards?.map((award, idx) => award.trim() && <li key={idx} className="text-sm text-gray-700 font-medium">• {award}</li>)}
            </ul>
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
