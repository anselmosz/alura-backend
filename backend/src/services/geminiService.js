import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Inicialização do Cliente e do Modelo
// Cria uma instância do cliente GoogleGenerativeAI usando a chave API do Gemini
// obtida da variável de ambiente GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Obtém o modelo de linguagem Gemini 1.5-flash, que será utilizado para gerar as descrições
const model = genAI.getGenerativeAI({ model: "gemini-1.5-flash" });

export default async function gerarDescricaoComGemini(imageBuffer) {
  // 2. Definição do Prompt
  // Define um prompt básico para o modelo, solicitando uma descrição em português da imagem
  const prompt = "Gere uma descrição em português do brasil para a seguinte imagem";

  try {
    // 3. Preparação da Imagem
    // Converte o buffer da imagem para uma representação base64
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png", // Assumindo que a imagem é um PNG
      },
    };

    // 4. Chamada ao Modelo
    // Utiliza o modelo para gerar o texto, passando o prompt e a imagem como entrada
    const res = await model.generateContent([prompt, image]);

    // 5. Tratamento da Resposta
    // Extrai o texto gerado pela resposta do modelo e o retorna
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    // 6. Tratamento de Erros
    // Captura qualquer erro que possa ocorrer durante o processo e retorna uma mensagem de erro
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}
