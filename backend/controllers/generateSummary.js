import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const generateAiSummary = async (req, res) => {
  try {
    const { prescription, patientName, disease } = req.body;

    if (!prescription) {
      return res.status(400).json({ success: false, message: "Missing prescription" });
    }

    const prompt = `
      Summarize and explain this doctor's prescription in simple language.
      Add short suggestions only 2 points + precautions only 2 bullet points.
      Based on the disease and prescription, in how many days patient can follow up.
      Patient: ${patientName}
      Disease: ${disease}
      Prescription: ${prescription}
    `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      success: true,
      summary: response.data.choices[0].message.content,
    });

  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: "AI summary generation failed" });
  }
};
