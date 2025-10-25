
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GroundingSource, Location } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface GeminiResponse {
  text: string;
  sources: GroundingSource[];
}

export const runQuery = async (prompt: string, location: Location | null): Promise<GeminiResponse> => {
  try {
    const model = 'gemini-2.5-flash';

    const requestPayload: any = {
      model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }, { googleMaps: {} }],
      },
    };

    if (location) {
      requestPayload.config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        },
      };
    }

    const response: GenerateContentResponse = await ai.models.generateContent(requestPayload);
    
    const text = response.text;

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks
      .map((chunk: any) => {
        if (chunk.web) {
          return { uri: chunk.web.uri, title: chunk.web.title };
        }
        if (chunk.maps) {
          return { uri: chunk.maps.uri, title: chunk.maps.title };
        }
        return null;
      })
      .filter((source: GroundingSource | null): source is GroundingSource => source !== null && !!source.uri && !!source.title);

    return { text, sources };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return { text: `An error occurred: ${error.message}`, sources: [] };
    }
    return { text: "An unknown error occurred.", sources: [] };
  }
};
