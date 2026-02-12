
import { GoogleGenAI, Type } from "@google/genai";
import { Game, Player, AIInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getBowlingInsights(player: Player, games: Game[]): Promise<AIInsight[]> {
  const prompt = `
    Analyze the following bowling stats for ${player.name} at Plano Super Bowl.
    Current Average: ${player.average}
    Strike Rate: ${player.strikeRate}%
    Spare Rate: ${player.spareRate}%
    Recent Scores: ${games.map(g => g.score).join(', ')}

    Provide 3 specific, actionable coaching insights to help improve their game. 
    Focus on things like spare conversion consistency, strike pocket targeting, or psychological consistency.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              topic: { type: Type.STRING },
              recommendation: { type: Type.STRING },
              impactLevel: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
            },
            required: ['topic', 'recommendation', 'impactLevel'],
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Error:", error);
    return [
      { topic: "Spare Focus", recommendation: "Focus on converting the 7-pin and 10-pin spares which seem to be lowering your average.", impactLevel: "High" }
    ];
  }
}

export async function parseScoreSheet(imageBase64: string): Promise<Partial<Game>> {
  // This simulates the "LaneTalk" ability to "read" scores if no direct digital connection is available.
  const prompt = "Extract bowling scores from this image. Return the total score and frame details if possible.";
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: imageBase64, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          location: { type: Type.STRING },
          date: { type: Type.STRING }
        }
      }
    }
  });

  return JSON.parse(response.text || '{}');
}
