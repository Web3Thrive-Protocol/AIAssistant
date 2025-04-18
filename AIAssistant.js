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
    if (loading) return; // Prevent multiple submissions
    if (!userInput.trim()) {
      alert("Please enter a question.");
      return;
    }

    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const client = new OpenAI({
        baseURL: "https://models.inference.ai.azure.com",
        apiKey: "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", // Use environment variable
        dangerouslyAllowBrowser: true,
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
      setResponse("An error occurred while fetching the AI response. Please check your internet connection or try again later.");
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
// Note: Make sure to replace the API key with a secure method of storing and accessing it, such as environment variables.
// Also, ensure that you have the OpenAI library installed and properly configured in your project.
// You can install it using npm or yarn:
// npm install openai
// or
// yarn add openai
// This code is a simple React component that allows users to ask questions to an AI assistant using OpenAI's API.
// It includes error handling, loading state management, and a user-friendly interface.
// The AI assistant responds to user queries and displays the response in a styled box.
// Make sure to test the component in your React application and adjust styles as needed.
