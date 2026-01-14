
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData, CareerFocus } from "../types";

export const parseResumeFile = async (file: File, focus: CareerFocus = 'general'): Promise<ResumeData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64String = result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = () => reject(new Error("Failed to read the file."));
  });

  const focusInstructions: Record<CareerFocus, string> = {
    developer: "Optimize for Software Engineering roles. Group technical skills by stack. Focus on projects with github links, tech stacks, and technical problem-solving. Use industry-standard tech keywords.",
    creator: "Optimize for Content Creation, Media, and Influencer roles. Emphasize social metrics, platform reach, and creative projects with links. Use dynamic, high-energy language.",
    data: "Optimize for Data Science roles. Emphasize ML models, statistics, and technical projects with data-driven impact. Highlight tools like Python, R, and SQL.",
    product: "Optimize for Product Management roles. Emphasize product lifecycle, metrics, and leadership projects. Focus on 'outcome over output'.",
    marketing: "Optimize for Marketing and Growth roles. Focus on campaign performance, conversion-oriented projects, and brand strategy.",
    sales: "Optimize for Sales and Account Management roles. Highlighting revenue growth, quota attainment, and key accounts.",
    design: "Optimize for UI/UX and Creative roles. Focus on prototyping, design systems, and portfolio projects with links. Highlight design thinking process.",
    general: "A balanced professional approach suitable for corporate and diverse industry applications. Maintain standard professional hierarchy and formal tone."
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: file.type || 'application/pdf',
              data: base64Data
            }
          },
          {
            text: `You are a world-class senior executive resume writer. Your task is to extract EVERY SINGLE detail from the attached document and reformat it for a high-impact professional resume.
            
            TARGET CAREER FOCUS: ${focus.toUpperCase()}
            ${focusInstructions[focus]}

            STRICT EXTRACTION AND EXPANSION RULES:
            1. COMPLETE EXTRACTION: Do not omit any employer, date, or role. If the document is long, ensure the output reflects that length (aiming for 2-3 pages worth of high-quality content if data is present).
            2. BULLET POINT EXPANSION: For each experience item, extract every bullet. If bullets are brief, expand them using the STAR method (Situation, Task, Action, Result) relevant to ${focus}, but stay true to the original facts.
            3. PROJECTS: Prioritize a dedicated 'projects' section. Capture project names, 2-sentence impact-driven descriptions, and any links.
            4. PROFESSIONAL SUMMARY: Write a compelling, 4-sentence professional summary at the start, tailored to the ${focus} role.
            5. SKILLS: Categorize skills logically (e.g., 'Languages', 'Tools', 'Frameworks').
            6. EDUCATION: Include institution, degree, location, and dates. Include GPA or Honors if visible.
            7. AWARDS & CERTIFICATIONS: Capture every single certification and honor mentioned.

            Structure the response as a valid JSON object matching the requested schema.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            personalInfo: {
              type: Type.OBJECT,
              properties: {
                fullName: { type: Type.STRING },
                email: { type: Type.STRING },
                phone: { type: Type.STRING },
                location: { type: Type.STRING },
                linkedin: { type: Type.STRING },
                website: { type: Type.STRING },
                summary: { type: Type.STRING },
              }
            },
            experience: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  company: { type: Type.STRING },
                  position: { type: Type.STRING },
                  location: { type: Type.STRING },
                  startDate: { type: Type.STRING },
                  endDate: { type: Type.STRING },
                  description: { type: Type.ARRAY, items: { type: Type.STRING } },
                }
              }
            },
            education: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  institution: { type: Type.STRING },
                  degree: { type: Type.STRING },
                  location: { type: Type.STRING },
                  startDate: { type: Type.STRING },
                  endDate: { type: Type.STRING },
                }
              }
            },
            skills: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  items: { type: Type.ARRAY, items: { type: Type.STRING } },
                }
              }
            },
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  link: { type: Type.STRING },
                }
              }
            },
            awards: { type: Type.ARRAY, items: { type: Type.STRING } },
            certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("Empty AI response.");

    const parsed = JSON.parse(jsonStr);
    
    const generateId = () => `item-${Math.random().toString(36).substr(2, 9)}`;
    const addIds = (items: any[]) => (Array.isArray(items) ? items : []).map((item) => ({ 
      ...item, 
      id: item.id || generateId()
    }));
    
    return {
      personalInfo: parsed.personalInfo || { fullName: "", email: "", phone: "", location: "", summary: "" },
      experience: addIds(parsed.experience),
      education: addIds(parsed.education),
      skills: addIds(parsed.skills),
      projects: addIds(parsed.projects),
      awards: Array.isArray(parsed.awards) ? parsed.awards : [],
      certifications: Array.isArray(parsed.certifications) ? parsed.certifications : [],
    };
  } catch (e: any) {
    console.error("Gemini Error:", e);
    throw new Error(e.message || "Failed to extract resume data.");
  }
};
