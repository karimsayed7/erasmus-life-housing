import { ai } from "@/lib/translate/gemini";

export async function translateToPortuguese(text: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
Translate the following text into Portuguese.

Rules:
- Return ONLY the translated text.
- Do not add quotes.
- Preserve the meaning.

Text:
${text}
`,
  });

  return response.text?.trim() ?? "";
}