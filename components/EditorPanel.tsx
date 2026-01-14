
import React from 'react';
import { 
  ResumeData, ResumeStyle, ResumeFont, ResumeLayout, Experience, Education, Skill 
} from '../types';
import { ACCENT_COLORS } from '../constants';
import { 
  Type, 
  Layout, 
  Settings, 
  Trash2, 
  Plus, 
  User, 
  Briefcase, 
  GraduationCap, 
  Zap, 
  Palette,
  Award
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
      company: "New Company",
      position: "Position",
      location: "",
      startDate: "",
      endDate: "",
      description: ["Bullet point 1"]
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
      institution: "University",
      degree: "Degree",
      location: "",
      startDate: "",
      endDate: ""
    };
    setData({ ...data, education: [newEdu, ...data.education] });
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
    const newSkill: Skill = { id: `skill-${Date.now()}`, category: "Category", items: ["Skill"] };
    setData({ ...data, skills: [...data.skills, newSkill] });
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-[450px] shrink-0 overflow-hidden shadow-xl z-20">
      {/* Tabs */}
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
          <Settings className="w-4 h-4" /> Design
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-10 scrollbar-hide bg-white">
        {activeTab === 'content' ? (
          <>
            <Section title="Profile Overview" icon={<User className="w-4 h-4" />}>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Full Name" value={data.personalInfo.fullName} onChange={v => updatePersonalInfo('fullName', v)} />
                <Input label="Email Address" value={data.personalInfo.email} onChange={v => updatePersonalInfo('email', v)} />
                <Input label="Phone Number" value={data.personalInfo.phone} onChange={v => updatePersonalInfo('phone', v)} />
                <Input label="Current Location" value={data.personalInfo.location} onChange={v => updatePersonalInfo('location', v)} />
                <Input label="LinkedIn Profile" value={data.personalInfo.linkedin || ''} onChange={v => updatePersonalInfo('linkedin', v)} />
                <Input label="Portfolio / Website" value={data.personalInfo.website || ''} onChange={v => updatePersonalInfo('website', v)} />
              </div>
              <div className="mt-6">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Professional Summary</label>
                <textarea 
                  className="w-full border-2 border-gray-100 rounded-xl p-4 text-sm focus:border-black focus:ring-0 outline-none transition-all min-h-[120px] bg-white text-black shadow-inner"
                  value={data.personalInfo.summary}
                  onChange={e => updatePersonalInfo('summary', e.target.value)}
                  placeholder="Tell us about your career goals and expertise..."
                />
              </div>
            </Section>

            <Section title="Work History" icon={<Briefcase className="w-4 h-4" />} onAdd={addExperience}>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="p-5 border-2 border-gray-50 rounded-2xl bg-gray-50/30 space-y-4 relative group hover:border-gray-200 transition-all">
                    <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Job Title" value={exp.position} onChange={v => updateExperience(exp.id, 'position', v)} />
                      <Input label="Company Name" value={exp.company} onChange={v => updateExperience(exp.id, 'company', v)} />
                      <Input label="Start Date" value={exp.startDate} onChange={v => updateExperience(exp.id, 'startDate', v)} />
                      <Input label="End Date" value={exp.endDate} onChange={v => updateExperience(exp.id, 'endDate', v)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Key Achievements (One per line)</label>
                      <textarea 
                        className="w-full border-2 border-gray-100 rounded-xl p-3 text-xs focus:border-black outline-none min-h-[100px] bg-white text-black shadow-inner"
                        value={exp.description.join('\n')}
                        onChange={e => updateExperience(exp.id, 'description', e.target.value.split('\n'))}
                        placeholder="• Increased revenue by 20%..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Academic Background" icon={<GraduationCap className="w-4 h-4" />} onAdd={addEducation}>
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div key={edu.id} className="p-5 border-2 border-gray-50 rounded-2xl bg-gray-50/30 space-y-4 relative hover:border-gray-200 transition-all">
                    <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 p-1.5 text-gray-300 hover:text-red-500 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Input label="Institution Name" value={edu.institution} onChange={v => updateEducation(edu.id, 'institution', v)} />
                    <Input label="Degree / Major" value={edu.degree} onChange={v => updateEducation(edu.id, 'degree', v)} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Start" value={edu.startDate} onChange={v => updateEducation(edu.id, 'startDate', v)} />
                      <Input label="End" value={edu.endDate} onChange={v => updateEducation(edu.id, 'endDate', v)} />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Skillset" icon={<Zap className="w-4 h-4" />} onAdd={addSkill}>
              <div className="space-y-6">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="p-5 border-2 border-gray-50 rounded-2xl bg-gray-50/30 relative flex gap-4 items-start hover:border-gray-200 transition-all">
                    <div className="flex-1 space-y-4">
                      <Input label="Skill Category" value={skill.category} onChange={v => updateSkill(skill.id, 'category', v)} />
                      <Input label="Specific Skills (comma separated)" value={skill.items.join(', ')} onChange={v => updateSkill(skill.id, 'items', v.split(',').map(i => i.trim()))} />
                    </div>
                    <button onClick={() => removeSkill(skill.id)} className="p-1.5 text-gray-300 hover:text-red-500 transition-colors mt-6">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Certifications & Awards" icon={<Award className="w-4 h-4" />}>
              <div className="space-y-4">
                <p className="text-[10px] text-gray-400 font-medium italic">These will appear in the sidebar area if the layout supports it.</p>
                <textarea 
                  className="w-full border-2 border-gray-100 rounded-xl p-4 text-sm focus:border-black outline-none bg-white text-black min-h-[120px] shadow-inner"
                  value={data.certifications?.join('\n') || ''}
                  onChange={e => setData({ ...data, certifications: e.target.value.split('\n').filter(l => l.trim() !== '') })}
                  placeholder="AWS Solutions Architect&#10;Google Data Analytics&#10;Certified Scrum Master..."
                />
              </div>
            </Section>
          </>
        ) : (
          <div className="space-y-10">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Palette className="w-4 h-4" /> Brand Theme Color
              </label>
              <div className="flex flex-wrap gap-4">
                {ACCENT_COLORS.map(c => (
                  <button 
                    key={c.value}
                    onClick={() => setStyle({ ...style, accentColor: c.value })}
                    className={`w-10 h-10 rounded-xl border-4 transition-all transform hover:scale-110 shadow-sm ${style.accentColor === c.value ? 'border-black scale-105' : 'border-transparent'}`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
                <div className="relative group">
                   <input 
                    type="color" 
                    value={style.accentColor} 
                    onChange={e => setStyle({ ...style, accentColor: e.target.value })}
                    className="w-10 h-10 rounded-xl overflow-hidden border-2 border-gray-100 cursor-pointer p-0"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Resume Layout</label>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: ResumeLayout.STANDARD, label: 'Classic Corporate', desc: 'Single column, clean hierarchy.', icon: <Layout className="w-5 h-5" /> },
                  { id: ResumeLayout.SIDEBAR, label: 'Modern Executive', desc: 'Information sidebar for skills & awards.', icon: <Layout className="rotate-90 w-5 h-5" /> },
                  { id: ResumeLayout.MINIMAL, label: 'Tech Minimalist', desc: 'Focus on pure content and spacing.', icon: <Layout className="w-5 h-5" /> }
                ].map(l => (
                  <button 
                    key={l.id}
                    onClick={() => setStyle({ ...style, layout: l.id })}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${style.layout === l.id ? 'border-black bg-black text-white shadow-lg' : 'border-gray-100 hover:border-gray-300 bg-white'}`}
                  >
                    <div className={`${style.layout === l.id ? 'bg-gray-800' : 'bg-gray-50'} p-3 rounded-xl`}>{l.icon}</div>
                    <div>
                      <p className="font-black text-sm uppercase tracking-wider">{l.label}</p>
                      <p className={`text-xs ${style.layout === l.id ? 'text-gray-400' : 'text-gray-500'}`}>{l.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Typography Settings</label>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: ResumeFont.SANS, label: 'Sans-Serif' },
                    { id: ResumeFont.SERIF, label: 'Elegant Serif' },
                    { id: ResumeFont.MONO, label: 'Technical Mono' }
                  ].map(f => (
                    <button 
                      key={f.id}
                      onClick={() => setStyle({ ...style, font: f.id })}
                      className={`py-3 text-[10px] font-black uppercase tracking-widest rounded-xl border-2 transition-all ${style.font === f.id ? 'border-black bg-black text-white shadow-md' : 'border-gray-50 hover:border-gray-200 bg-white'}`}
                    >
                      {f.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Global Text Size</span>
                  <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-100">
                    {['small', 'medium', 'large'].map(s => (
                      <button 
                        key={s}
                        onClick={() => setStyle({ ...style, fontSize: s as any })}
                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${style.fontSize === s ? 'bg-black text-white' : 'text-gray-300 hover:text-gray-500'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Spacing Control</label>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-3 items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Line Height</span>
                    <span className="text-xs font-black bg-black text-white px-2 py-0.5 rounded">{style.lineSpacing}</span>
                  </div>
                  <input 
                    type="range" min="1" max="2" step="0.1" 
                    value={style.lineSpacing} 
                    onChange={e => setStyle({ ...style, lineSpacing: parseFloat(e.target.value) })}
                    className="w-full accent-black cursor-pointer h-1.5 bg-gray-100 rounded-lg appearance-none"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-3 items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Section Padding</span>
                    <span className="text-xs font-black bg-black text-white px-2 py-0.5 rounded">{style.sectionSpacing}</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="3" step="0.5" 
                    value={style.sectionSpacing} 
                    onChange={e => setStyle({ ...style, sectionSpacing: parseFloat(e.target.value) })}
                    className="w-full accent-black cursor-pointer h-1.5 bg-gray-100 rounded-lg appearance-none"
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
      <div className="flex items-center gap-3 text-black font-black uppercase tracking-[0.2em] text-[10px]">
        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-black group-hover:text-white transition-all">
          {icon}
        </div>
        {title}
      </div>
      {onAdd && (
        <button onClick={onAdd} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm">
          <Plus className="w-3 h-3" /> Add Item
        </button>
      )}
    </div>
    {children}
  </div>
);

const Input: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type="text"
      className="w-full border-2 border-gray-50 rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none transition-all bg-white text-black shadow-sm placeholder:text-gray-200"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={`Enter ${label.toLowerCase()}...`}
    />
  </div>
);

export default EditorPanel;
