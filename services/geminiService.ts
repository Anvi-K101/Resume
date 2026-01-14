
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

export const parseResumeFile = async (file: File): Promise<ResumeData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Convert file to base64
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64String = result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = () => reject(new Error("Failed to read the file. Please check permissions."));
  });

  // Using gemini-3-flash-preview for lower latency and better handling of large structured extractions
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              // Ensure we have a valid mime type, fallback to application/pdf
              mimeType: file.type || 'application/pdf',
              data: base64Data
            }
          },
          {
            text: `You are a precision resume extraction engine. Analyze the provided document and extract EVERY single detail. 

            CRITICAL:
            1. DO NOT omit any work history or education entries.
            2. Extract every bullet point as a string in the description array.
            3. Capture all certifications and awards.
            4. If personal details like LinkedIn or phone are present, include them.

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
    if (!jsonStr) {
      throw new Error("The AI returned an empty response. Please try again with a different file.");
    }

    const parsed = JSON.parse(jsonStr);
    
    // Safety check for ID generation and array types
    const addIds = (items: any[]) => (Array.isArray(items) ? items : []).map((item, idx) => ({ 
      ...item, 
      id: item.id || `item-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 5)}` 
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
    console.error("Gemini Parsing/Extraction Error:", e);
    
    // Specific error handling for common Gemini issues
    if (e.message?.includes("Rpc failed") || e.message?.includes("fetch")) {
      throw new Error("Connection failed: The file might be too large for the current network limits, or the service is temporarily unavailable. Try a smaller file or copy-pasting the text into a .txt file.");
    }
    
    throw new Error(e.message || "Failed to extract data. The document structure may be unsupported.");
  }
};
