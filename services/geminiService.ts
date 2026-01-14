
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

export const parseResumeFile = async (file: File): Promise<ResumeData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Convert file to base64
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
  });

  // Using gemini-3-pro-preview for complex reasoning task (document parsing and structured extraction)
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: file.type || 'application/pdf',
            data: base64Data
          }
        },
        {
          text: `You are an expert recruitment assistant. Extract all professional details from this document and structure them into the provided JSON schema. 
          
          Guidelines:
          1. Professional Summary: Create a compelling 2-3 sentence summary if one isn't clearly provided.
          2. Experience: Extract job title, company, location, dates, and specifically convert descriptions into an array of clear, impact-oriented bullet points.
          3. Skills: Categorize skills (e.g., "Technical", "Soft Skills", "Tools").
          4. Education: Extract institution, degree, and dates.
          5. Certifications: List all professional certifications found.
          
          Return ONLY valid JSON. Do not include markdown formatting like \`\`\`json.`
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
            },
            required: ["fullName", "email", "summary"]
          },
          experience: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
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
                id: { type: Type.STRING },
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
                id: { type: Type.STRING },
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

  const jsonStr = response.text?.trim() || "{}";
  try {
    const parsed = JSON.parse(jsonStr);
    
    // Ensure IDs exist for React keys
    const addIds = (items: any[]) => items?.map((item, idx) => ({ ...item, id: item.id || `item-${Date.now()}-${idx}` })) || [];
    
    return {
      ...parsed,
      experience: addIds(parsed.experience),
      education: addIds(parsed.education),
      skills: addIds(parsed.skills),
    };
  } catch (e) {
    console.error("JSON Parse Error:", e, jsonStr);
    throw new Error("Failed to parse extracted resume data.");
  }
};
