import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function gerarDescricaoComGemini(imageBuffer) {
  const prompt =
    "Gere uma única descrição em português do brasil para a seguinte imagem";

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Descrição não disponível.";
  } catch (erro) {
    console.error("Erro ao obter descrição:", erro.message, erro);
    throw new Error("Erro ao obter o descrição do Gemini.");
  }
}

export async function gerarAltTextComGemini(imageBuffer) {
    const prompt =
      "Gere um único Texto Alternativo (alt), bem curto e objetivo, em português do brasil para a seguinte imagem";
  
    try {
      const image = {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: "image/png",
        },
      };
      const res = await model.generateContent([prompt, image]);
      return res.response.text() || "Alt-text não disponível.";
    } catch (erro) {
      console.error("Erro ao obter alt-text:", erro.message, erro);
      throw new Error("Erro ao obter o alt-text do Gemini.");
    }
  }