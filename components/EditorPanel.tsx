
import React from 'react';
import { 
  ResumeData, ResumeStyle, ResumeFont, ResumeLayout, Experience, Education, Skill, Project 
} from '../types';
import { ACCENT_COLORS } from '../constants';
import { 
  Type, 
  Settings, 
  Trash2, 
  Plus, 
  User, 
  Briefcase, 
  GraduationCap, 
  Zap, 
  Palette,
  Award,
  FolderRoot
} from 'lucide-react';

interface EditorPanelProps {
  data: ResumeData;
  setData: (data: ResumeData) => void;
  style: ResumeStyle;
  setStyle: (style: ResumeStyle) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ data, setData, style, setStyle }) => {
  const [activeTab, setActiveTab] = React.useState<'content' | 'design'>('content');

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    setData({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setData({
      ...data,
      experience: data.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    });
  };

  const removeExperience = (id: string) => {
    setData({ ...data, experience: data.experience.filter(e => e.id !== id) });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "New Role",
      location: "",
      startDate: "",
      endDate: "Present",
      description: ["Successfully led project initiatives...", "Improved team efficiency by..."]
    };
    setData({ ...data, experience: [newExp, ...data.experience] });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setData({
      ...data,
      education: data.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    });
  };

  const removeEducation = (id: string) => {
    setData({ ...data, education: data.education.filter(e => e.id !== id) });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: "New Institution",
      degree: "Degree / Program",
      location: "",
      startDate: "",
      endDate: ""
    };
    setData({ ...data, education: [newEdu, ...data.education] });
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setData({
      ...data,
      projects: data.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  const removeProject = (id: string) => {
    setData({ ...data, projects: data.projects.filter(p => p.id !== id) });
  };

  const addProject = () => {
    const newProj: Project = { id: `proj-${Date.now()}`, name: "Project Name", description: "Brief impact description", link: "" };
    setData({ ...data, projects: [...data.projects, newProj] });
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    setData({
      ...data,
      skills: data.skills.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const removeSkill = (id: string) => {
    setData({ ...data, skills: data.skills.filter(s => s.id !== id) });
  };

  const addSkill = () => {
    const newSkill: Skill = { id: `skill-${Date.now()}`, category: "Technical Category", items: ["Skill 1", "Skill 2"] };
    setData({ ...data, skills: [...data.skills, newSkill] });
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-[450px] shrink-0 overflow-hidden shadow-xl z-20">
      <div className="flex border-b border-gray-100 bg-gray-50/50">
        <button 
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'content' ? 'text-black border-b-2 border-black bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Type className="w-4 h-4" /> Content
        </button>
        <button 
          onClick={() => setActiveTab('design')}
          className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'design' ? 'text-black border-b-2 border-black bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Settings className="w-4 h-4" /> Style
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-12 scrollbar-hide bg-white">
        {activeTab === 'content' ? (
          <>
            <Section title="Profile Overview" icon={<User className="w-4 h-4" />}>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Full Name" value={data.personalInfo.fullName} onChange={v => updatePersonalInfo('fullName', v)} />
                <Input label="Email" value={data.personalInfo.email} onChange={v => updatePersonalInfo('email', v)} />
                <Input label="Phone" value={data.personalInfo.phone} onChange={v => updatePersonalInfo('phone', v)} />
                <Input label="Location" value={data.personalInfo.location} onChange={v => updatePersonalInfo('location', v)} />
                <Input label="LinkedIn" value={data.personalInfo.linkedin || ''} onChange={v => updatePersonalInfo('linkedin', v)} />
                <Input label="Website" value={data.personalInfo.website || ''} onChange={v => updatePersonalInfo('website', v)} />
              </div>
              <div className="mt-6">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Executive Summary (STAR Method Optimized)</label>
                <textarea 
                  className="w-full border-2 border-gray-100 rounded-xl p-4 text-sm focus:border-black focus:ring-0 outline-none transition-all min-h-[120px] bg-white text-black shadow-inner leading-relaxed"
                  value={data.personalInfo.summary}
                  onChange={e => updatePersonalInfo('summary', e.target.value)}
                />
              </div>
            </Section>

            <Section title="Work History" icon={<Briefcase className="w-4 h-4" />} onAdd={addExperience}>
              <div className="space-y-8">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="p-6 border-2 border-gray-50 rounded-2xl bg-gray-50/20 space-y-4 relative group hover:border-gray-200 transition-all shadow-sm">
                    <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Job Title" value={exp.position} onChange={v => updateExperience(exp.id, 'position', v)} />
                      <Input label="Company" value={exp.company} onChange={v => updateExperience(exp.id, 'company', v)} />
                      <Input label="Start Date" value={exp.startDate} onChange={v => updateExperience(exp.id, 'startDate', v)} />
                      <Input label="End Date" value={exp.endDate} onChange={v => updateExperience(exp.id, 'endDate', v)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Accomplishments (One per line)</label>
                      <textarea 
                        className="w-full border-2 border-gray-100 rounded-xl p-3 text-xs focus:border-black outline-none min-h-[140px] bg-white text-black shadow-inner leading-relaxed"
                        value={exp.description.join('\n')}
                        onChange={e => updateExperience(exp.id, 'description', e.target.value.split('\n'))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Featured Projects" icon={<FolderRoot className="w-4 h-4" />} onAdd={addProject}>
               <div className="space-y-6">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="p-5 border-2 border-gray-50 rounded-2xl bg-gray-50/20 space-y-4 relative group hover:border-gray-200 transition-all">
                    <button onClick={() => removeProject(proj.id)} className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Input label="Project Title" value={proj.name} onChange={v => updateProject(proj.id, 'name', v)} />
                    <Input label="Public Link" value={proj.link || ''} onChange={v => updateProject(proj.id, 'link', v)} />
                    <div className="mt-2">
                       <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Description & Outcomes</label>
                       <textarea 
                        className="w-full border-2 border-gray-100 rounded-xl p-3 text-xs focus:border-black outline-none min-h-[80px] bg-white text-black shadow-inner"
                        value={proj.description}
                        onChange={e => updateProject(proj.id, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Academic Background" icon={<GraduationCap className="w-4 h-4" />} onAdd={addEducation}>
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div key={edu.id} className="p-5 border-2 border-gray-50 rounded-2xl bg-gray-50/20 space-y-4 relative hover:border-gray-200 transition-all">
                    <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Input label="University / College" value={edu.institution} onChange={v => updateEducation(edu.id, 'institution', v)} />
                    <Input label="Degree Conferred" value={edu.degree} onChange={v => updateEducation(edu.id, 'degree', v)} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Start Date" value={edu.startDate} onChange={v => updateEducation(edu.id, 'startDate', v)} />
                      <Input label="Completion Date" value={edu.endDate} onChange={v => updateEducation(edu.id, 'endDate', v)} />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Expertise & Skills" icon={<Zap className="w-4 h-4" />} onAdd={addSkill}>
              <div className="space-y-6">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="p-5 border-2 border-gray-50 rounded-2xl bg-gray-50/20 relative flex gap-4 items-start hover:border-gray-200 transition-all">
                    <div className="flex-1 space-y-4">
                      <Input label="Skill Category" value={skill.category} onChange={v => updateSkill(skill.id, 'category', v)} />
                      <Input label="Proficiencies (comma separated)" value={skill.items.join(', ')} onChange={v => updateSkill(skill.id, 'items', v.split(',').map(i => i.trim()))} />
                    </div>
                    <button onClick={() => removeSkill(skill.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors mt-6">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Certificates & Recognition" icon={<Award className="w-4 h-4" />}>
              <div className="space-y-6">
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Honours & Professional Awards</label>
                    <textarea 
                      className="w-full border-2 border-gray-100 rounded-xl p-4 text-sm focus:border-black outline-none bg-white text-black min-h-[100px] shadow-inner"
                      placeholder="e.g. Employee of the Month, Dean's List..."
                      value={data.awards?.join('\n') || ''}
                      onChange={e => setData({ ...data, awards: e.target.value.split('\n').filter(l => l.trim() !== '') })}
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Industry Certifications</label>
                    <textarea 
                      className="w-full border-2 border-gray-100 rounded-xl p-4 text-sm focus:border-black outline-none bg-white text-black min-h-[100px] shadow-inner"
                      placeholder="e.g. AWS Solutions Architect, PMP..."
                      value={data.certifications?.join('\n') || ''}
                      onChange={e => setData({ ...data, certifications: e.target.value.split('\n').filter(l => l.trim() !== '') })}
                    />
                 </div>
              </div>
            </Section>
          </>
        ) : (
          <div className="space-y-12">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Palette className="w-4 h-4" /> Brand Signature Color
              </label>
              <div className="flex flex-wrap gap-4">
                {ACCENT_COLORS.map(c => (
                  <button 
                    key={c.value}
                    onClick={() => setStyle({ ...style, accentColor: c.value })}
                    className={`w-12 h-12 rounded-2xl border-4 transition-all transform hover:scale-110 shadow-lg ${style.accentColor === c.value ? 'border-black scale-105' : 'border-transparent'}`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Structural Layout</label>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: ResumeLayout.STANDARD, label: 'Standard Corporate', desc: 'Unified flow. Ideal for multi-page senior roles.' },
                  { id: ResumeLayout.SIDEBAR, label: 'Executive Sidebar', desc: 'Dense at-a-glance layout for high-impact skills.' },
                  { id: ResumeLayout.MINIMAL, label: 'Modern Minimal', desc: 'High white space, focuses on core typography.' }
                ].map(l => (
                  <button 
                    key={l.id}
                    onClick={() => setStyle({ ...style, layout: l.id })}
                    className={`flex items-center gap-5 p-5 rounded-2xl border-2 transition-all text-left ${style.layout === l.id ? 'border-black bg-black text-white shadow-xl' : 'border-gray-100 hover:border-gray-300 bg-white'}`}
                  >
                    <div className="flex-1">
                      <p className="font-black text-sm uppercase tracking-wider">{l.label}</p>
                      <p className={`text-xs mt-1 leading-relaxed ${style.layout === l.id ? 'text-gray-400' : 'text-gray-500'}`}>{l.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Typography & Scale</label>
              <div className="space-y-8">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: ResumeFont.SANS, label: 'Inter' },
                    { id: ResumeFont.SERIF, label: 'Libre' },
                    { id: ResumeFont.MONO, label: 'Roboto' }
                  ].map(f => (
                    <button 
                      key={f.id}
                      onClick={() => setStyle({ ...style, font: f.id })}
                      className={`py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl border-2 transition-all ${style.font === f.id ? 'border-black bg-black text-white shadow-lg' : 'border-gray-50 hover:border-gray-200 bg-white'}`}
                      style={{ fontFamily: f.id }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Document Font Size</span>
                  <div className="flex bg-white rounded-xl p-1.5 shadow-sm border border-gray-100">
                    {['small', 'medium', 'large'].map(s => (
                      <button 
                        key={s}
                        onClick={() => setStyle({ ...style, fontSize: s as any })}
                        className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${style.fontSize === s ? 'bg-black text-white' : 'text-gray-300 hover:text-gray-500'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Proportion Controls</label>
              <div className="space-y-10">
                <div>
                  <div className="flex justify-between mb-4 items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Vertical Density</span>
                    <span className="text-xs font-black bg-black text-white px-3 py-1 rounded-full">{style.sectionSpacing}x</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="4" step="0.5" 
                    value={style.sectionSpacing} 
                    onChange={e => setStyle({ ...style, sectionSpacing: parseFloat(e.target.value) })}
                    className="w-full accent-black cursor-pointer h-2 bg-gray-100 rounded-lg appearance-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; onAdd?: () => void }> = ({ title, icon, children, onAdd }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-4 text-black font-black uppercase tracking-[0.2em] text-[10px]">
        <div className="p-2.5 bg-gray-50 rounded-xl group-hover:bg-black group-hover:text-white transition-all shadow-sm">
          {icon}
        </div>
        {title}
      </div>
      {onAdd && (
        <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm active:scale-95">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      )}
    </div>
    {children}
  </div>
);

const Input: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type="text"
      className="w-full border-2 border-gray-50 rounded-xl px-4 py-3 text-sm focus:border-black outline-none transition-all bg-white text-black shadow-sm"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

export default EditorPanel;
