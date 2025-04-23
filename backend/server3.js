const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { PromptTemplate } = require("@langchain/core/prompts");
const { RunnableSequence } = require("@langchain/core/runnables");

dotenv.config();

const app = express();
const PORT = 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY is missing. Please set it in the .env file.");
    process.exit(1);
}

// Use CORS middleware
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend access
    methods: ["GET", "POST"], // Allow specified HTTP methods
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Initialize Google Gemini AI Model
const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-pro",
    apiKey: GEMINI_API_KEY,
});

// Define the prompt template
const prompt = PromptTemplate.fromTemplate(
    "You are a helpful assistant. Please respond to the user queries.\nUser: {question}\nAI:"
);

// Create a runnable sequence (equivalent to LLMChain)
const chain = RunnableSequence.from([prompt, llm]);

// API Route for Chatbot
app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;
        console.log("POST Request body:", req.body); // Debug incoming request
        console.log("User Input:", message); // Debug user message
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const reply = await chain.invoke({ question: message });
        console.log("Chatbot Output:", reply); // Debug chatbot response

        res.json({ reply }); // Send response to frontend
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
