// const http = require("http");
// const axios = require("axios");


// const GEMINI_API_KEY = "AIzaSyAclkYs6djTyM4MrsSCUrfbfgGOAN7mpas"; // Replace with your actual API key
// const PORT = 5000;

// const server = http.createServer(async (req, res) => {
//     if (req.method === "POST" && req.url === "/api/chat") {
//         let body = "";

//         // Collect request data
//         req.on("data", chunk => {
//             body += chunk.toString();
//         });

//         req.on("end", async () => {
//             try {
//                 const { message } = JSON.parse(body);
//                 if (!message) {
//                     res.writeHead(400, { "Content-Type": "application/json" });
//                     res.end(JSON.stringify({ error: "Message is required" }));
//                     return;
//                 }

//                 // Call the Gemini API
//                 const response = await axios.post(
//                     `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro/generateContent?key=${GEMINI_API_KEY}`,
//                     {
//                         contents: [
//                             {
//                                 role: "user",
//                                 parts: [{ text: message }],
//                             },
//                         ],
//                         generationConfig: { maxOutputTokens: 50 },
//                     }
//                 );

//                 res.writeHead(200, { "Content-Type": "application/json" });
//                 res.end(JSON.stringify({ reply: response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI." }));
//             } catch (error) {
//                 console.error("Error:", error.response?.data || error.message);
//                 res.writeHead(500, { "Content-Type": "application/json" });
//                 res.end(JSON.stringify({ error: "Server error" }));
//             }
//         });
//     } else {
//         res.writeHead(404, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Route not found" }));
//     }
// });

// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });




const http = require("http");
const axios = require("axios");

// Replace with your actual API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const PORT = 5000;

const server = http.createServer(async (req, res) => {
    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === "POST" && req.url === "/api/chat") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", async () => {
            try {
                const { message } = JSON.parse(body);
                if (!message) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Message is required" }));
                    return;
                }

                // Call the Gemini API
                const response = await axios.post(
                    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
                    {
                        contents: [
                            {
                                role: "user",
                                parts: [{ text: message }],
                            },
                        ],
                        generationConfig: { maxOutputTokens: 50 },
                    }
                );

                // Extract AI response safely
                const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ reply }));
            } catch (error) {
                console.error("Error:", error.response?.data || error.message);
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Server error", details: error.response?.data || error.message }));
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
