const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection - using hardcoded URI
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

const BlogSchema = new mongoose.Schema({
  name: String,
  place: String,
  text: String,
  videoUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", BlogSchema);

// Fetch all blog posts
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
});

// Add a new blog post
app.post("/blogs", async (req, res) => {
  try {
    const { name, place, text, videoUrl } = req.body;
    
    if (!name || !place || (!text && !videoUrl)) {
      return res.status(400).json({ message: "Name, place, and either text or videoUrl are required!" });
    }

    const newBlog = new Blog({ name, place, text, videoUrl });
    await newBlog.save();
    res.status(201).json({ message: "Blog added successfully!", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Error adding blog", error });
  }
});

// Delete a blog post
app.delete("/blogs/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
});

const PORT = 5009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));