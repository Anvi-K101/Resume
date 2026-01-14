
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
    developer: "Optimize for Software Engineering roles. Group technical skills by stack. Focus on projects with github links, tech stacks, and technical problem-solving. Elaborate on complexity.",
    creator: "Optimize for Content Creation, Media, and Influencer roles. Emphasize social metrics, creative projects, brand collaborations, and community growth.",
    data: "Optimize for Data Science roles. Emphasize ML models, statistics, database management, and technical projects with quantifiable data-driven impact.",
    product: "Optimize for Product Management roles. Emphasize product lifecycle, stakeholder management, metrics, and leadership projects.",
    marketing: "Optimize for Marketing and Growth roles. Focus on campaign performance, ROI, conversion-oriented projects, and brand strategy.",
    sales: "Optimize for Sales and Account Management roles. Highlighting revenue growth, quota attainment, and key accounts.",
    design: "Optimize for UI/UX and Creative roles. Focus on prototyping, design systems, user research, and portfolio projects with visual context descriptions.",
    general: "A balanced professional approach suitable for corporate and diverse industry applications. Maintain standard professional hierarchy and clarity."
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
            text: `You are a precision resume extraction engine. Your goal is to convert a raw resume into a structured format that looks stunning and fills 2-3 pages if enough data exists.
            
            TARGET CAREER FOCUS: ${focus.toUpperCase()}
            ${focusInstructions[focus]}

            STRICT EXTRACTION AND ELABORATION RULES:
            1. DO NOT summarize. Extract EVERY SINGLE work experience, date, and detail.
            2. If bullet points are sparse, professionally expand them into substantial, impact-focused statements (e.g., 'Built a website' becomes 'Spearheaded the design and development of a responsive e-commerce platform using React, improving user retention by 15%').
            3. Ensure at least 4-6 detailed bullet points per major professional role to ensure the document has professional depth and fills the page space appropriately.
            4. Capture all education history, certifications, and honors/awards.
            5. Identify and detail standalone projects. If the source mentions projects inside a job, extract them as separate 'projects' entries if they are significant.
            6. In 'personalInfo.summary', write a powerful 4-5 sentence professional bio optimized for ${focus}.

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
