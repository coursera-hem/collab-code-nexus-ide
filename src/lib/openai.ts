
// OpenAI API client setup
// Note: In a production environment, API calls should be made through a backend service
// to avoid exposing the API key in client-side code

export const getAIResponse = async (prompt: string) => {
  // In a real app, this would be a server-side API call
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // API key should be stored in environment variables or backend
        // Using a proxy service is recommended for production
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      }),
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error with AI response:", error);
    return "Sorry, I couldn't process that request. Please try again.";
  }
};
