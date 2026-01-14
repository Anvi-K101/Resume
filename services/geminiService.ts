
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
    developer: "Optimize for Software Engineering roles. Group technical skills by stack. Focus on projects with github links, tech stacks, and technical problem-solving.",
    creator: "Optimize for Content Creation, Media, and Influencer roles. Emphasize social metrics and creative projects with links.",
    data: "Optimize for Data Science roles. Emphasize ML models, statistics, and technical projects with data-driven impact.",
    product: "Optimize for Product Management roles. Emphasize product lifecycle, metrics, and leadership projects.",
    marketing: "Optimize for Marketing and Growth roles. Focus on campaign performance and conversion-oriented projects.",
    sales: "Optimize for Sales and Account Management roles. Highlighting revenue growth and key accounts.",
    design: "Optimize for UI/UX and Creative roles. Focus on prototyping, design systems, and portfolio projects with links.",
    general: "A balanced professional approach suitable for corporate and diverse industry applications. Maintain standard professional hierarchy."
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
            text: `You are a precision resume extraction engine. Your task is to extract EVERY SINGLE piece of information from the document.
            
            TARGET CAREER FOCUS: ${focus.toUpperCase()}
            ${focusInstructions[focus]}

            STRICT EXTRACTION RULES:
            1. DO NOT summarize or skip any work experience. Extract all roles, dates, and locations.
            2. Extract EVERY bullet point from experience as separate strings.
            3. Capture all education history, certifications, and honors/awards.
            4. IMPORTANT: Identify any standalone projects (name, description, and link if available).
            5. In 'personalInfo.summary', write a professional summary (3 sentences) optimized for ${focus}.

            Return the response as a valid JSON object matching the requested schema.`
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
    const addIds = (items: any[]) => (Array.isArray(items) ? items : []).map((item, idx) => ({ 
      ...item, 
      id: item.id || `item-${Date.now()}-${idx}` 
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
