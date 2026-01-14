
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
    developer: "Optimize for Software Engineering roles. Group technical skills by stack (e.g., Frontend, Backend, DevOps). Focus on tech stacks, GitHub, and technical problem-solving.",
    creator: "Optimize for Content Creation, Media, and Influencer roles. Emphasize social metrics, reach, engagement, platforms, and creative tools. Highlight portfolios and social handles.",
    data: "Optimize for Data Science and Analytics roles. Emphasize ML models, statistics, Python/R, SQL, and data-driven business impact. Highlight data visualization and modeling skills.",
    product: "Optimize for Product Management roles. Emphasize product roadmap, cross-functional leadership, user metrics, A/B testing, and strategy. Highlight stakeholder management.",
    marketing: "Optimize for Marketing and Growth roles. Focus on SEO/SEM, campaign performance, brand growth, ROI, and marketing automation tools. Highlight lead generation and analytics.",
    sales: "Optimize for Sales and Account Management roles. Highlighting targets, quotas, revenue growth, CRM tools (like Salesforce), and negotiation success.",
    design: "Optimize for UI/UX and Creative roles. Focus on user research, prototyping tools (Figma, Adobe), design systems, and visual impact. Ensure portfolio links are prominent.",
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
            text: `You are a precision resume extraction engine. Your task is to extract EVERY SINGLE piece of information from the document without exception.
            
            TARGET CAREER FOCUS: ${focus.toUpperCase()}
            ${focusInstructions[focus]}

            STRICT EXTRACTION RULES:
            1. DO NOT summarize or skip any work experience. Extract all roles, dates, and locations exactly.
            2. Extract EVERY bullet point from the experience sections as separate strings in the description array.
            3. Capture all education history, certifications, and honors/awards.
            4. In the 'personalInfo.summary', write a professional summary (3-4 sentences) highly optimized for the ${focus} career path, using ONLY the facts from the provided data.
            5. Ensure skills are categorized in a way that is relevant to the ${focus} industry.

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
      awards: Array.isArray(parsed.awards) ? parsed.awards : [],
      certifications: Array.isArray(parsed.certifications) ? parsed.certifications : [],
    };
  } catch (e: any) {
    console.error("Gemini Error:", e);
    throw new Error(e.message || "Failed to extract resume data.");
  }
};
