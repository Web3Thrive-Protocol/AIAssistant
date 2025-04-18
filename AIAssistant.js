import React, { useState } from "react";
import OpenAI from "openai";

export default function AIAssistant() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const client = new OpenAI({
        baseURL: "https://models.inference.ai.azure.com",
        apiKey: "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"
      });

      const aiResponse = await client.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userInput },
        ],
        model: "gpt-4o",
        temperature: 1,
        max_tokens: 4096,
      });

      setResponse(aiResponse.choices[0].message.content);
    } catch (err) {
      console.error("Error fetching AI response:", err);
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>AI Assistant</h1>
      <textarea
        value={userInput}
        onChange={handleInputChange}
        placeholder="Ask me anything..."
        rows="4"
        cols="50"
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Loading..." : "Ask"}
      </button>
      {response && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <strong>AI Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
