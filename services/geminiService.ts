
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function translateToAnimalSound(text: string, animal: string): Promise<string> {
  const prompt = `
    You are an expert animal linguist. Your task is to translate the following human sentence into the sound of a specific animal. 
    The translation should be a creative, phonetic representation of how the animal might "say" the sentence, expressing its core sentiment. 
    Do not add any extra explanations, introductory text, or quotation marks. Only provide the raw animal sound translation.

    Human sentence: "${text}"
    Animal: "${animal}"

    Your translation:
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    // Using response.text is the direct and correct way to get the text.
    const translation = response.text.trim();
    if (!translation) {
      throw new Error("Received an empty translation from the API.");
    }
    return translation;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
}
