// The `@google/genai` package is Node-only. Avoid importing it at module
// initialization so the client bundle doesn't attempt to include Node APIs.
export async function chatWithPortfolio(message, history) {
  if (typeof window !== 'undefined') {
    // In the browser: this function should be proxied to a server endpoint.
    // For now, return a helpful message or throw so callers can handle it.
    throw new Error('chatWithPortfolio is not available in the browser. Call a server endpoint instead.');
  }

  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  const model = 'gemini-3-flash-preview';

  const systemInstruction = `
    You are the AI assistant for a professional portfolio. 
    Your goal is to answer questions about the portfolio owner's skills, projects, and professional background.
    
    Context about the owner:
    - Name: Jesse Amukowa
    - Role: Multi-disciplinary Tech Specialist (Frontend, Mobile, Design, Security, AI)
    - Skills: Frontend Development, Mobile App Development, Graphic Design, Cybersecurity (System Security), AI/ML, Data Science, Database Management, DevOps.
    - Tools: Git, Wireshark, Adobe Suite (Photoshop, Illustrator), Inkscape, Blender, Gemini API, Docker, Vercel, Figma, MS Office Suite, Linux.
    - Projects: 
      1. "Lumina Analytics": A real-time data visualization dashboard for SaaS metrics.
      2. "Nexus Chat": A collaborative workspace with AI-powered task management.
      3. "Aura": A minimalist meditation app with atmospheric soundscapes.
    - Experience: 5+ years in product development, previously at "TechFlow" and "Innovate Labs".
    - Achievements:
      1. 1st Place Winner at Global Cyber Security Hackathon (DefCon Global, 2024).
      2. Advanced Machine Learning Specialization Professional Certificate (DeepLearning.AI, 2023).
      3. Elite Frontend Architect Award (Tech Excellence Forum, 2023).
      4. AWS Certified Solutions Architect (2022).
    - Tone: Professional, helpful, concise, and slightly enthusiastic.
    
    If asked about something not in this context, politely state that you are specifically trained to answer questions about Alex's portfolio.
  `;

  const chat = ai.chats.create({
    model,
    config: { systemInstruction },
    history,
  });

  const response = await chat.sendMessage({ message });
  return response.text;
}
