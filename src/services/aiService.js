import { GoogleGenAI } from "@google/genai";

// Load API key from localStorage
const getApiKey = () => localStorage.getItem("GEMINI_API_KEY") || "";

export const generateTaskVariants = async (context, mode = "title") => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API Key not found in local storage. Please set 'GEMINI_API_KEY'.");
  }

  const ai = new GoogleGenAI({ apiKey });

  if (!context) return [];
  
const modePrompts = {
  email: `
Generate 3 professional email drafts based on the provided context.
Each email should:
- Be clear, concise, and professionally written.
- Include a relevant subject line.
- Maintain a polite and business-appropriate tone.
- Use the context to understand the intent, stakeholders, and objective.
- Avoid unnecessary verbosity while still being complete.
Return the emails as structured drafts.
`,

  analysis: `
Generate 3 deep analytical insights derived from the provided context.
Each insight should:
- Identify key patterns, implications, or risks in the content.
- Provide structured reasoning rather than surface-level observations.
- Highlight actionable interpretations when possible.
- Be written clearly so that decision-makers can understand the insight quickly.
`,

  message: `
Generate 3 conversational messages based on the provided context.
Each message should:
- Sound natural and human-like.
- Be appropriate for chat platforms such as Slack, WhatsApp, or internal messaging tools.
- Preserve the intent of the original content while improving clarity and tone.
- Be concise and easy to read.
`,

  rephrase: `
Generate 3 alternative ways to rephrase the provided content.
Each version should:
- Preserve the original meaning and intent.
- Improve clarity, readability, and flow.
- Use slightly different wording and sentence structure.
- Avoid simply swapping synonyms.
`,

  title: `
Generate 3 clear and professional task titles based on the provided context.
Each title should:
- Capture the core objective or action required.
- Be concise but informative.
- Be suitable for task management systems such as Jira, Asana, or Notion.
- Avoid unnecessary filler words.
`,

  issue: `
Generate 3 clear and structured issue or bug descriptions from the context.
Each description should:
- Clearly explain the problem.
- Include the observed behavior and expected behavior if possible.
- Be suitable for a bug tracking or issue management system.
- Use precise and professional language.
`,

  conclusion: `
Generate 3 concise conclusions or summaries derived from the provided context.
Each conclusion should:
- Capture the most important takeaways.
- Be logically derived from the information provided.
- Be clear, professional, and easy to understand.
- Avoid repeating the entire content and instead focus on key outcomes.
`
};

  const currentPrompt = modePrompts[mode] || modePrompts.title;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: `Based on the following context, ${currentPrompt}
      Context: ${context}
      
      Format the output as a JSON array of exactly 3 strings, e.g., ["Variant 1", "Variant 2", "Variant 3"]. 
      Only return the JSON array, no other text.`,
    });

    const text = response.text;
    
    // Attempt to parse JSON
    try {
      const jsonMatch = text.match(/\[.*\]/s);
      const jsonStr = jsonMatch ? jsonMatch[0] : text;
      const parsed = JSON.parse(jsonStr);
      return Array.isArray(parsed) ? parsed.slice(0, 3) : [];
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", text);
      return text.split('\n').filter(line => line.trim()).slice(0, 3);
    }
  } catch (error) {
    console.error("Error generating task variants:", error);
    throw error;
  }
};
