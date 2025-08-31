import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getChatResponse(message: string): Promise<string> {
  try {
    const systemPrompt = `You are a helpful career guidance AI assistant. Provide thoughtful, personalized career advice based on the user's questions. Keep responses conversational, encouraging, and practical. Focus on career development, skill building, industry insights, and educational pathways.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: message,
    });

    return response.text || "I'm sorry, I couldn't process your request at the moment. Please try again.";
  } catch (error) {
    console.error('Gemini API error:', error);
    return "I'm currently having trouble connecting to my knowledge base. Please try again in a moment.";
  }
}

export async function getCareerRecommendation(quizAnswers: any[]): Promise<string> {
  try {
    const answersText = quizAnswers.map((answer, index) => 
      `Question ${index + 1}: ${answer.text} (Stream: ${answer.stream})`
    ).join('\n');

    const prompt = `Based on these career assessment quiz answers, provide a detailed career recommendation and analysis:

${answersText}

Please provide:
1. A personalized career recommendation
2. Key strengths identified from the answers
3. Suggested career paths and specific job roles
4. Skills to develop for success in this field
5. Educational recommendations

Keep the response encouraging and actionable.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
    });

    return response.text || "Unable to generate career recommendation at this time.";
  } catch (error) {
    console.error('Gemini API error for career recommendation:', error);
    return "Unable to analyze your quiz results at the moment. Please try again later.";
  }
}
