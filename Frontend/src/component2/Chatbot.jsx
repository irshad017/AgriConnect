import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import 'tailwindcss/tailwind.css';

const apiKey = 'AIzaSyBU-Kax_hgms1QLa7eEjw7zv_Evm_JT2lE'; // Replace with your API key

const Chatbot = () => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageHistory]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userInput.trim() === "") return;

    setLoading(true); // Set loading to true while fetching

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "you are a farming chatbot give answers related to that only and in the language in which user asks you the question and try to give detailed answer everytime\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I'm ready to answer your farming questions! Ask me anything about crops, livestock, soil, weather, techniques, or anything else related to agriculture. I'll do my best to provide you with comprehensive and informative answers. 🌾 🐄 🌱  Let's get growing! \n"},
          ],
        },
      ],
    });

    try {
      const result = await chatSession.sendMessage(userInput);

      // Update message history
      setMessageHistory([...messageHistory,
        { role: "user", parts: [{ text: userInput }] },
        { role: "model", parts: [{ text: result.response.text() }] },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setLoading(false); // Stop loading when the response is received
    setUserInput(""); // Clear the input field
  };

  return (
    <div className=" min-h-screen bg-gray-300 flex flex-col justify-center items-center p-4">
      <div className="absolute top-32 bg-gray-100 rounded-lg shadow-lg p-6 m-10 max-w-4xl w-auto md:w-full sm:max-w-2xl sm:w-full">
        <h1 className=" text-2xl font-semibold text-gray-800 text-center mb-4">Agro-Chat</h1>

        {/* Input Box */}
        <form onSubmit={handleSubmit} className=" flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Ask me anything related to farming"
            value={userInput}
            onChange={handleInputChange}
            className="flex-grow border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg py-2 px-6 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          >
            Send
          </button>
        </form>

        {/* Chat History */}
        <div className="space-y-4 overflow-y-auto max-h-96">
          {messageHistory.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'model' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-4`}
            >
              <div
                className={`p-4 rounded-lg ${message.role === 'model' ? 'bg-blue-500 text-white max-w-[80%]' : 'bg-gray-200 text-gray-800 max-w-[50%]'}`}
              >
                <span className="block font-semibold capitalize">{message.role}:</span>
                {message.parts.map((part, partIndex) => (
                  <ReactMarkdown key={partIndex} className="mt-1">{part.text}</ReactMarkdown>
                ))}
              </div>
            </div>
          ))}

          {/* Skeleton Loader */}
          {loading && (
            <div className="flex flex-row-reverse items-start space-x-4 animate-pulse">
              <div className="p-4 rounded-lg bg-blue-500 text-white max-w-[70%]">
                <span className="block font-semibold capitalize">model:</span>
                <div className="mt-2 space-y-2">
                  <div className="h-2 bg-white bg-opacity-50 rounded"></div>
                  <div className="h-2 bg-white bg-opacity-50 rounded"></div>
                  <div className="h-2 bg-white bg-opacity-50 rounded"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;