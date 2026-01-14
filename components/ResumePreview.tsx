
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

  // Professional vertical rhythm to fill 2-3 pages evenly
  const sectionMargin = `${style.sectionSpacing * 1.5}rem`;
  const contentLineHeight = style.lineSpacing;

  const renderSectionHeader = (title: string, isSidebar: boolean = false) => (
    <div className={`mb-4 flex items-center justify-between border-b-2 pb-1.5`} style={{ borderColor: `${style.accentColor}25` }}>
      <h2 
        className={`font-black uppercase tracking-[0.3em] ${isSidebar ? 'text-[10px]' : size.h2}`} 
        style={{ color: style.accentColor }}
      >
        {title}
      </h2>
    </div>
  );

  const renderStandard = () => (
    <div className={`p-16 bg-white min-h-[1123px] print:min-h-0 print:p-12 shadow-sm print:shadow-none ${fontClass} ${size.base}`}>
      <header className="mb-12 text-center border-b-4 pb-10 border-gray-50">
        <h1 className={`${size.h1} font-black tracking-tighter uppercase italic mb-5 leading-none`} style={{ color: style.accentColor, fontSize: '3rem' }}>
          {personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-[11px] font-bold text-gray-500 uppercase tracking-[0.3em]">
          {personalInfo.email && <span className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-black" /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-black" /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-black" /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-2.5 text-black"><Linkedin className="w-4 h-4" /> {personalInfo.linkedin}</span>}
        </div>
      </header>
      
      {personalInfo.summary && (
        <section style={{ marginBottom: sectionMargin }} className="print:break-inside-avoid">
          {renderSectionHeader("Professional Profile")}
          <p className="leading-relaxed font-medium text-gray-700 text-[14px] text-justify" style={{ lineHeight: contentLineHeight }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: sectionMargin }}>
          {renderSectionHeader("Professional Experience")}
          <div className="space-y-12">
            {experience.map((exp) => (
              <div key={exp.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className={`${size.h3} font-black uppercase tracking-tight text-lg`} style={{ color: style.accentColor }}>{exp.position}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                       <span className="font-bold text-gray-900 text-[15px]">{exp.company}</span>
                       <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                       <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">{exp.location}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 shrink-0">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <ul className="list-disc ml-6 space-y-3 text-[14px] text-gray-600 mt-5" style={{ lineHeight: contentLineHeight }}>
                  {exp.description.map((bullet, idx) => bullet.trim() && (
                    <li key={idx} className="pl-2">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-16 mt-12 pt-12 border-t-4 border-gray-50">
        <div className="space-y-12">
          {education.length > 0 && (
            <section className="print:break-inside-avoid">
              {renderSectionHeader("Education")}
              <div className="space-y-8">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-black text-gray-900 text-[15px] uppercase tracking-tight leading-tight">{edu.institution}</h3>
                    <p className="text-gray-500 font-bold text-[13px] mt-1">{edu.degree}</p>
                    <p className="text-[10px] text-gray-400 font-black uppercase mt-3">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
             <section className="print:break-inside-avoid">
                {renderSectionHeader("Certifications")}
                <ul className="space-y-4">
                   {certifications.map((cert, i) => (
                     <li key={i} className="text-[12px] font-bold text-gray-700 flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: style.accentColor }}></div>
                       {cert}
                     </li>
                   ))}
                </ul>
             </section>
          )}
        </div>

        <div className="space-y-12">
          {skills.length > 0 && (
            <section className="print:break-inside-avoid">
              {renderSectionHeader("Expertise")}
              <div className="space-y-8">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-xs">
                    <span className="font-black text-black block mb-3 uppercase tracking-[0.2em] text-[11px]" style={{ color: style.accentColor }}>{skill.category}</span>
                    <div className="flex flex-wrap gap-2">
                       {skill.items.map((item, idx) => (
                         <span key={idx} className="bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-100 font-bold text-[11px]">
                           {item}
                         </span>
                       ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {awards && awards.length > 0 && (
             <section className="print:break-inside-avoid">
                {renderSectionHeader("Accolades")}
                <ul className="space-y-4">
                   {awards.map((award, i) => (
                     <li key={i} className="text-[12px] font-bold text-gray-700 flex items-start gap-3">
                       <span className="text-lg leading-none" style={{ color: style.accentColor }}>★</span>
                       {award}
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
      className={`relative flex bg-white min-h-[1123px] print:min-h-0 shadow-sm print:shadow-none ${fontClass} ${size.base}`}
      style={{
        // Sidebar background gradient to ensure it fills all pages in PDF
        background: `linear-gradient(to right, #f8f9fa 0%, #f8f9fa 320px, #ffffff 320px, #ffffff 100%)`
      }}
    >
      <aside className="w-[320px] p-12 print:p-10 flex flex-col shrink-0 gap-12 z-10 relative">
        <div className="mb-6">
          <h1 className="text-4xl font-black mb-10 tracking-tighter leading-[0.85] uppercase italic" style={{ color: style.accentColor }}>
            {personalInfo.fullName.split(' ')[0]}<br/>
            <span className="opacity-70">{personalInfo.fullName.split(' ').slice(1).join(' ')}</span>
          </h1>
          <div className="space-y-6 text-[11px] text-gray-500 font-bold uppercase tracking-[0.3em]">
            {personalInfo.email && <div className="break-all flex flex-col gap-1.5"><span className="text-[9px] text-gray-400 font-black">Email</span><span className="text-black">{personalInfo.email}</span></div>}
            {personalInfo.phone && <div className="flex flex-col gap-1.5"><span className="text-[9px] text-gray-400 font-black">Contact</span><span className="text-black">{personalInfo.phone}</span></div>}
            {personalInfo.location && <div className="flex flex-col gap-1.5"><span className="text-[9px] text-gray-400 font-black">Location</span><span className="text-black">{personalInfo.location}</span></div>}
            {personalInfo.linkedin && <div className="break-all flex flex-col gap-1.5"><span className="text-[9px] text-gray-400 font-black">LinkedIn</span><span className="text-black border-b border-black/10 pb-1">{personalInfo.linkedin}</span></div>}
          </div>
        </div>

        {skills.length > 0 && (
          <div className="print:break-inside-avoid">
            {renderSectionHeader("Competencies", true)}
            <div className="space-y-8">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-[10px] font-black text-black mb-3 uppercase tracking-widest">{skill.category}</p>
                  <p className="text-[12px] text-gray-500 font-bold leading-relaxed">{skill.items.join(' • ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="print:break-inside-avoid">
            {renderSectionHeader("Education", true)}
            <div className="space-y-8">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-[13px] font-black text-gray-900 uppercase tracking-tight leading-tight">{edu.institution}</p>
                  <p className="text-[11px] text-gray-400 font-bold italic mt-1">{edu.degree}</p>
                  <p className="text-[10px] text-gray-400 font-black uppercase mt-3">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(awards?.length || 0) > 0 && (
          <div className="print:break-inside-avoid mt-auto pt-10 border-t border-gray-200">
            {renderSectionHeader("Recognition", true)}
            <ul className="space-y-5">
              {awards?.map((award, idx) => award.trim() && (
                <li key={idx} className="text-[11px] text-gray-600 font-bold leading-tight flex gap-4 items-start">
                   <div className="mt-1.5 w-2 h-2 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: style.accentColor }}></div>
                   <span>{award}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className="flex-1 p-16 print:p-12 flex flex-col min-h-full bg-white relative z-10 shadow-[-20px_0_40px_rgba(0,0,0,0.01)]">
        {personalInfo.summary && (
          <section className="mb-12 print:break-inside-avoid">
            {renderSectionHeader("Professional Objective")}
            <p className="text-gray-700 leading-relaxed text-[15px] font-medium text-justify" style={{ lineHeight: contentLineHeight }}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        <section className="mb-12 flex-1">
          {renderSectionHeader("Experience Portfolio")}
          <div className="space-y-12">
            {experience.map((exp) => (
              <div key={exp.id} className="print:break-inside-avoid">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-black text-xl uppercase tracking-tight leading-tight" style={{ color: style.accentColor }}>{exp.position}</h4>
                    <p className="text-[15px] text-gray-900 font-black mt-1">{exp.company}</p>
                  </div>
                  <span className="text-[11px] font-black text-gray-400 shrink-0 ml-8 uppercase tracking-[0.25em] bg-gray-50 px-5 py-2.5 rounded-2xl border border-gray-100">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <ul className="list-disc ml-6 space-y-3.5 text-gray-600 text-[14px] font-medium" style={{ lineHeight: contentLineHeight }}>
                  {exp.description.map((bullet, idx) => bullet.trim() && (
                    <li key={idx} className="print:break-inside-avoid pl-2">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {projects.length > 0 && (
          <section className="mb-12">
            {renderSectionHeader("Strategic Ventures")}
            <div className="grid grid-cols-2 gap-8">
              {projects.map((proj) => (
                <div key={proj.id} className="print:break-inside-avoid flex flex-col p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-black text-[14px] uppercase tracking-wider" style={{ color: style.accentColor }}>{proj.name}</h5>
                    {proj.link && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <p className="text-[13px] text-gray-500 font-medium leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {(certifications?.length || 0) > 0 && (
          <section className="print:break-inside-avoid pt-12 border-t-4 border-gray-50 mt-auto">
            {renderSectionHeader("Professional Credentials")}
            <div className="flex flex-wrap gap-5">
              {certifications?.map((cert, idx) => cert.trim() && (
                <div key={idx} className="text-[11px] text-gray-900 font-black uppercase tracking-widest px-6 py-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center gap-3">
                   <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: style.accentColor }}></div>
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
          /* Clamp total document height to roughly 3 pages worth of pixels */
          max-height: 3369px; 
          overflow: hidden;
          background: white;
        }
        section {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
          margin-bottom: ${sectionMargin};
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
          .relative.flex.bg-white {
            background-color: white !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;
